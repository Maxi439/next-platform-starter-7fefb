#!/usr/bin/env python3
"""
MRE Live Sales Copilot PRO  ·  server.py

Audio-Routing (einmalig einrichten):
  Windows: VB-CABLE von vb-audio.com/Cable herunterladen & installieren.
           Telefon-App (3CX, sipgate, etc.) → Audio-Ausgabe auf "VB-Cable Input" stellen.
           Dieses Gerät erscheint dann als "CABLE Output" unter den Input-Geräten.
           LOOPBACK_DEVICE="CABLE Output" setzen (oder "VB-Cable").
  Mac:     BlackHole von existingcode.com/blackhole herunterladen & installieren.
           Audio-MIDI-Setup öffnen → Multi-Output-Device mit BlackHole + Lautsprecher.
           System-Audio-Ausgabe auf das Multi-Output-Device stellen.
           LOOPBACK_DEVICE="BlackHole" setzen.
  Beide:   Mikrofon läuft auf Standard-Input oder MIC_DEVICE.

Umgebungsvariablen:
  ANTHROPIC_API_KEY   – Pflicht; Anthropic API Key
  MIC_DEVICE          – Gerätename (Substring) oder Index des Mikros (leer = System-Default)
  LOOPBACK_DEVICE     – Gerätename (Substring) oder Index des Loopback-Geräts
  WHISPER_MODEL       – Whisper-Modell (Standard: large-v3 | schneller: medium oder small)
"""

import os
import sys
import json
import asyncio
import threading
import queue
import re
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional, List, Set

import numpy as np

# ─── Abhängigkeits-Prüfung ───────────────────────────────────────────────────

_missing: list = []
try:
    import sounddevice as sd
except ImportError:
    _missing.append("sounddevice       →  pip install sounddevice")

try:
    from faster_whisper import WhisperModel as _WhisperModel
except ImportError:
    _missing.append("faster-whisper    →  pip install faster-whisper")

try:
    import anthropic as _anthropic_lib
except ImportError:
    _missing.append("anthropic         →  pip install anthropic")

try:
    from fastapi import FastAPI, WebSocket, WebSocketDisconnect
    from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
    import uvicorn
except ImportError:
    _missing.append("fastapi/uvicorn   →  pip install fastapi 'uvicorn[standard]'")

if _missing:
    print("\n❌  Fehlende Pakete – bitte installieren:\n")
    for m in _missing:
        print(f"    {m}")
    print("\n    Oder alles auf einmal:  pip install -r requirements.txt\n")
    sys.exit(1)

from faster_whisper import WhisperModel
import anthropic as _anthropic_lib

# ─── Konfiguration ────────────────────────────────────────────────────────────

SAMPLE_RATE       = 16_000
CHUNK_SECONDS     = 3
CHUNK_SAMPLES     = SAMPLE_RATE * CHUNK_SECONDS
SILENCE_RMS       = 0.006          # Chunks leiser als dies werden übersprungen

WHISPER_MODEL_ID  = os.environ.get("WHISPER_MODEL", "large-v3")
WHISPER_LANG      = "de"
WHISPER_BEAM      = 5

ANTHROPIC_MODEL   = "claude-sonnet-4-6"
ANTHROPIC_TOKENS  = 1000
ANTHROPIC_KEY     = os.environ.get("ANTHROPIC_API_KEY", "")

MIC_DEVICE_CFG       = os.environ.get("MIC_DEVICE", "")
LOOPBACK_DEVICE_CFG  = os.environ.get("LOOPBACK_DEVICE", "")

HISTORY_TURNS     = 14    # Letzte N Zeilen werden an Anthropic gesendet

# ─── KI System-Prompt ─────────────────────────────────────────────────────────

SYSTEM_PROMPT = (
    "Du bist ein Spitzen-Closer für Kapitalanlage-Immobilien (DACH). "
    "Du hörst ein laufendes Telefongespräch mit. Souffliere dem Verkäufer "
    "in Echtzeit wortwörtlich die beste nächste Aussage. Nutze NLP, "
    "Einwandbehandlung (Reframe, Vorwegnahme, Bedingungsabschluss, Loss-Aversion) "
    "und Abschlusstechniken. Schreibe gesprochene Sätze, kein Coaching-Sprech. "
    "Nur JSON, kein weiterer Text."
)

COACH_SCHEMA = """\
{
  "phase":          "Eisbrecher|Bedarf|Pitch|Einwand|Abschluss",
  "kundensignal":   "was Kunde gerade will/blockt",
  "einwand":        "zu teuer|kein EK|keine Zeit|Bedenkzeit|Partner fragen|kein Vertrauen|null",
  "jetzt_sagen":    "die EINE beste Antwort, max 2 Sätze, wortwörtlich",
  "alternativen":   ["Variante 2", "Variante 3"],
  "naechster_schritt": "konkrete nächste Frage/Aktion",
  "warnung":        "falls Caller gerade Fehler macht, sonst null"
}"""

# ─── ConnectionManager ────────────────────────────────────────────────────────

class ConnectionManager:
    def __init__(self):
        self.active: Set[WebSocket] = set()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.add(ws)

    def disconnect(self, ws: WebSocket):
        self.active.discard(ws)

    async def broadcast(self, data: dict):
        msg = json.dumps(data, ensure_ascii=False)
        dead: Set[WebSocket] = set()
        for ws in list(self.active):
            try:
                await ws.send_text(msg)
            except Exception:
                dead.add(ws)
        self.active -= dead

# ─── Audio-Puffer ─────────────────────────────────────────────────────────────

class AudioBuffer:
    """Accumulates raw audio from sounddevice callback; emits full CHUNK_SAMPLES chunks."""

    def __init__(self, speaker_label: str, out_queue: "queue.Queue[tuple]"):
        self.label = speaker_label
        self._q = out_queue
        self._buf = np.empty(0, dtype=np.float32)
        self._lock = threading.Lock()

    def feed(self, indata: np.ndarray, _frames, _time, _status):
        mono = indata[:, 0] if indata.ndim > 1 else indata.ravel()
        with self._lock:
            self._buf = np.concatenate([self._buf, mono])
            while len(self._buf) >= CHUNK_SAMPLES:
                chunk = self._buf[:CHUNK_SAMPLES].copy()
                self._buf = self._buf[CHUNK_SAMPLES:]
                rms = float(np.sqrt(np.mean(chunk ** 2)))
                if rms > SILENCE_RMS:
                    try:
                        self._q.put_nowait((self.label, chunk))
                    except queue.Full:
                        pass  # Überlast: älteste Chunks verwerfen

# ─── Globaler Zustand ─────────────────────────────────────────────────────────

manager = ConnectionManager()
audio_queue: "queue.Queue[tuple]" = queue.Queue(maxsize=80)
broadcast_queue: Optional[asyncio.Queue] = None

whisper_model: Optional[WhisperModel] = None
anth_client: Optional[_anthropic_lib.AsyncAnthropic] = None
transcript_ctx: List[dict] = []   # [{speaker, text}, ...]
audio_streams: list = []           # sd.InputStream — müssen am Leben bleiben

# ─── Whisper (sync, läuft im ThreadPool-Executor) ────────────────────────────

def _transcribe(audio: np.ndarray) -> str:
    if whisper_model is None:
        return ""
    try:
        segments, _ = whisper_model.transcribe(
            audio,
            language=WHISPER_LANG,
            beam_size=WHISPER_BEAM,
            vad_filter=True,
            vad_parameters={"min_silence_duration_ms": 400},
        )
        return " ".join(s.text.strip() for s in segments).strip()
    except Exception as e:
        print(f"⚠️  Whisper-Fehler: {e}")
        return ""

# ─── Anthropic Coaching (async) ───────────────────────────────────────────────

async def _get_coaching(history: List[dict]) -> Optional[dict]:
    if not anth_client or not ANTHROPIC_KEY:
        return None
    lines = [f"{e['speaker']}: {e['text']}" for e in history[-HISTORY_TURNS:]]
    user_msg = (
        "Gesprächsverlauf (neuester Satz zuletzt):\n"
        + "\n".join(lines)
        + f"\n\nAntworte ausschließlich mit JSON nach diesem Schema:\n{COACH_SCHEMA}"
    )
    try:
        resp = await anth_client.messages.create(
            model=ANTHROPIC_MODEL,
            max_tokens=ANTHROPIC_TOKENS,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )
        raw = resp.content[0].text.strip()
        # JSON aus Antwort extrahieren (robust gegen Markdown-Code-Blöcke)
        match = re.search(r"\{[\s\S]*\}", raw)
        if match:
            return json.loads(match.group())
        print(f"⚠️  Kein JSON in Anthropic-Antwort: {raw[:200]}")
    except json.JSONDecodeError as e:
        print(f"⚠️  JSON-Parse-Fehler: {e}")
    except Exception as e:
        print(f"⚠️  Anthropic-Fehler: {e}")
    return None

# ─── Verarbeitungs-Task (asyncio) ─────────────────────────────────────────────

async def processing_task():
    """Reads (speaker, chunk) from audio_queue, transcribes, triggers coaching."""
    global transcript_ctx
    loop = asyncio.get_running_loop()
    print("▶  Verarbeitungs-Task gestartet")

    while True:
        # Blockierend lesen (max 1s) – im Executor damit Event Loop frei bleibt
        try:
            result = await loop.run_in_executor(
                None, lambda: audio_queue.get(block=True, timeout=1.0)
            )
        except queue.Empty:
            await asyncio.sleep(0)
            continue
        except asyncio.CancelledError:
            break

        speaker, chunk = result

        # Transkription im Executor (CPU-intensiv)
        try:
            text = await asyncio.wait_for(
                loop.run_in_executor(None, _transcribe, chunk),
                timeout=60.0,
            )
        except asyncio.TimeoutError:
            print("⚠️  Transkription Timeout – Chunk übersprungen")
            continue

        if not text:
            continue

        print(f"[{speaker}] {text}")

        # Transcript ans Frontend
        await broadcast_queue.put(
            {"type": "transcript", "speaker": speaker, "text": text}
        )

        # Kontext aktualisieren
        transcript_ctx.append({"speaker": speaker, "text": text})
        if len(transcript_ctx) > HISTORY_TURNS * 2:
            transcript_ctx = transcript_ctx[-HISTORY_TURNS:]

        # Coaching bei Kunden-Aussagen
        if speaker == "Kunde":
            await broadcast_queue.put({"type": "coach_loading", "loading": True})
            coaching = await _get_coaching(transcript_ctx)
            await broadcast_queue.put({"type": "coach_loading", "loading": False})
            if coaching:
                await broadcast_queue.put({"type": "coach", "data": coaching})

# ─── Broadcast-Task (asyncio) ─────────────────────────────────────────────────

async def broadcast_task():
    while True:
        msg = await broadcast_queue.get()
        await manager.broadcast(msg)

# ─── Hilfsfunktion: Audio-Gerät finden ───────────────────────────────────────

def _find_device_index(cfg: str) -> Optional[int]:
    """Returns device index by name-substring or int string. None = system default."""
    if not cfg:
        return None
    if cfg.lstrip("-").isdigit():
        return int(cfg)
    cfg_lower = cfg.lower()
    for i, dev in enumerate(sd.query_devices()):
        if cfg_lower in dev["name"].lower() and dev["max_input_channels"] > 0:
            return i
    return None

def _start_stream(device_cfg: str, speaker_label: str) -> bool:
    """Opens a sounddevice InputStream. Returns True on success."""
    idx = _find_device_index(device_cfg)
    buf = AudioBuffer(speaker_label, audio_queue)
    try:
        stream = sd.InputStream(
            device=idx,
            channels=1,
            samplerate=SAMPLE_RATE,
            dtype="float32",
            blocksize=int(SAMPLE_RATE * 0.1),  # 100ms-Blöcke
            callback=buf.feed,
        )
        stream.start()
        audio_streams.append(stream)
        dev_info = sd.query_devices(idx) if idx is not None else sd.query_devices(kind="input")
        print(f"🎙  {speaker_label:10s} → [{idx if idx is not None else 'default'}] {dev_info['name']}")
        return True
    except Exception as e:
        print(f"❌  Stream für '{speaker_label}' konnte nicht geöffnet werden: {e}")
        return False

# ─── Lifespan ─────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: "FastAPI"):
    global whisper_model, anth_client, broadcast_queue

    broadcast_queue = asyncio.Queue()
    loop = asyncio.get_running_loop()

    # API-Key prüfen
    if not ANTHROPIC_KEY:
        print("⚠️  ANTHROPIC_API_KEY nicht gesetzt – KI-Coaching deaktiviert!")
        print("    Setzen mit: export ANTHROPIC_API_KEY=sk-ant-...")
    else:
        anth_client = _anthropic_lib.AsyncAnthropic(api_key=ANTHROPIC_KEY)
        print(f"✅  Anthropic: {ANTHROPIC_MODEL}")

    # Whisper-Modell laden (kann beim ersten Start mehrere Minuten dauern → Download)
    print(f"⏳  Lade Whisper '{WHISPER_MODEL_ID}' … (erster Start = Download ~1-3 GB)")
    try:
        whisper_model = await loop.run_in_executor(
            None,
            lambda: WhisperModel(WHISPER_MODEL_ID, device="auto", compute_type="auto"),
        )
        print(f"✅  Whisper '{WHISPER_MODEL_ID}' geladen")
    except Exception as e:
        print(f"❌  Whisper-Ladefehler: {e}")
        print("    Tipp: pip install faster-whisper  oder  WHISPER_MODEL=medium setzen")

    # Audio-Streams starten
    print("\n── Audio-Geräte ─────────────────────────────────────────────────────")
    mic_ok = _start_stream(MIC_DEVICE_CFG, "Verkäufer")
    if not mic_ok:
        print("   Tipp: MIC_DEVICE=<Gerätename> setzen  (python server.py --devices für Liste)")

    loop_ok = _start_stream(LOOPBACK_DEVICE_CFG, "Kunde")
    if not loop_ok:
        print(
            "   Kein Loopback-Gerät gefunden.\n"
            "   → VB-Cable (Windows) / BlackHole (Mac) installieren\n"
            "   → LOOPBACK_DEVICE=\"CABLE Output\" oder \"BlackHole\" setzen\n"
            "   → Aktuell läuft nur 1 Mikrofon-Stream (Single-Stream-Modus)"
        )

    if not mic_ok and not loop_ok:
        print("\n❌  Kein Audio-Gerät geöffnet. Starte trotzdem (WebSocket aktiv).")

    # Background-Tasks
    proc = asyncio.create_task(processing_task(), name="processing")
    bcast = asyncio.create_task(broadcast_task(), name="broadcast")

    print("\n" + "─" * 68)
    print("  🚀  MRE Sales Copilot PRO  →  http://localhost:8000")
    print("      Verfügbare Geräte:          GET /api/devices")
    print("      Status:                     GET /api/status")
    print("─" * 68 + "\n")

    yield  # Server läuft hier

    # Cleanup
    proc.cancel()
    bcast.cancel()
    for s in audio_streams:
        try:
            s.stop()
            s.close()
        except Exception:
            pass
    print("\n👋  Server gestoppt")

# ─── FastAPI App ──────────────────────────────────────────────────────────────

app = FastAPI(title="MRE Sales Copilot PRO", lifespan=lifespan)

@app.get("/", response_class=HTMLResponse)
async def get_index():
    p = Path(__file__).parent / "index.html"
    if p.exists():
        return FileResponse(p, media_type="text/html")
    return HTMLResponse("<h1>index.html nicht gefunden – bitte im selben Ordner ablegen.</h1>", 404)

@app.get("/api/devices")
async def list_devices():
    """Listet alle verfügbaren Audio-Input-Geräte."""
    devs = []
    for i, d in enumerate(sd.query_devices()):
        if d["max_input_channels"] > 0:
            devs.append({
                "index": i,
                "name": d["name"],
                "channels": d["max_input_channels"],
                "sample_rate": int(d["default_samplerate"]),
            })
    return JSONResponse(devs)

@app.get("/api/status")
async def get_status():
    return {
        "whisper_model": WHISPER_MODEL_ID if whisper_model else None,
        "anthropic": bool(anth_client and ANTHROPIC_KEY),
        "streams": len(audio_streams),
        "clients": len(manager.active),
        "history_lines": len(transcript_ctx),
    }

@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await manager.connect(ws)
    # Sofort Status senden
    await ws.send_text(json.dumps({
        "type": "status",
        "whisper": whisper_model is not None,
        "anthropic": bool(anth_client and ANTHROPIC_KEY),
        "streams": len(audio_streams),
    }))
    try:
        while True:
            data = await ws.receive_text()
            if data == "reset":
                transcript_ctx.clear()
                await ws.send_text(json.dumps({"type": "reset_ok"}))
            # ping → pong (verhindert Timeout)
            elif data == "ping":
                await ws.send_text(json.dumps({"type": "pong"}))
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(ws)

# ─── CLI Entry Point ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="MRE Sales Copilot PRO")
    parser.add_argument("--devices", action="store_true", help="Zeigt verfügbare Audio-Geräte und beendet")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    if args.devices:
        print("\n── Verfügbare Audio-Input-Geräte ────────────────────────────────────")
        for i, d in enumerate(sd.query_devices()):
            if d["max_input_channels"] > 0:
                marker = " ◀ DEFAULT" if i == sd.default.device[0] else ""
                print(f"  [{i:2d}] {d['name']}{marker}")
        print()
        sys.exit(0)

    uvicorn.run(
        "server:app",
        host=args.host,
        port=args.port,
        log_level="info",
        reload=False,
    )
