#!/usr/bin/env python3
"""
MRE Live Sales Copilot PRO  ·  server.py

Audio-Routing (einmalig einrichten):
  Windows: VB-CABLE von vb-audio.com/Cable herunterladen & installieren.
           Telefon-App (3CX, sipgate, etc.) → Audio-Ausgabe auf "VB-Cable Input" stellen.
           Dieses Gerät erscheint dann als "CABLE Output" unter den Input-Geräten.
           LOOPBACK_DEVICE="CABLE Output" setzen (oder Namens-Substring reicht).
  Mac:     BlackHole von existingcode.com/blackhole herunterladen & installieren.
           Audio-MIDI-Setup öffnen → Multi-Output-Device mit BlackHole + Lautsprecher.
           System-Audio-Ausgabe auf das Multi-Output-Device stellen.
           LOOPBACK_DEVICE="BlackHole" setzen.
  Beide:   Mikrofon läuft auf Standard-Input oder MIC_DEVICE.

Umgebungsvariablen:
  ANTHROPIC_API_KEY   – Pflicht; Anthropic API Key
  MIC_DEVICE          – Gerätename (Substring) oder Index des Mikros (leer = System-Default)
  LOOPBACK_DEVICE     – Gerätename (Substring) oder Index des Loopback-Geräts (Pflicht!)
  WHISPER_MODEL       – Whisper-Modell (Standard: large-v3 | schneller auf CPU: medium)
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
    import faster_whisper as _fw  # noqa: F401  (nur Existenz prüfen)
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
SILENCE_RMS       = 0.006

WHISPER_MODEL_ID  = os.environ.get("WHISPER_MODEL", "large-v3")
WHISPER_LANG      = "de"
WHISPER_BEAM      = 5

ANTHROPIC_MODEL   = "claude-sonnet-4-6"
ANTHROPIC_TOKENS  = 1000
ANTHROPIC_KEY     = os.environ.get("ANTHROPIC_API_KEY", "")

MIC_DEVICE_CFG       = os.environ.get("MIC_DEVICE", "")
LOOPBACK_DEVICE_CFG  = os.environ.get("LOOPBACK_DEVICE", "")

HISTORY_TURNS     = 14

# Demo-Modus: --demo Flag oder DEMO=1 Env-Variable (kein Audio nötig)
DEMO_MODE = "--demo" in sys.argv or os.environ.get("DEMO", "") == "1"

# Realistisches Kapitalanlage-Gespräch (alle Phasen + Einwände)
DEMO_SCRIPT = [
    ("Verkäufer", "Guten Tag, Herr Müller! Hier spricht Max Weber von MRE Immobilien. Sie hatten sich bei uns zu Kapitalanlage-Immobilien informiert – passt das kurz?"),
    ("Kunde",     "Ja, ich hatte da was angefragt. Bin aber ehrlich gesagt noch skeptisch ob das wirklich was für mich ist."),
    ("Verkäufer", "Das ist ein gesunder Ansatz. Was hat Sie ursprünglich dazu bewogen, sich zu informieren?"),
    ("Kunde",     "Ich höre überall dass man mit Immobilien Vermögen aufbauen kann – aber ich habe keine Ahnung davon und auch kaum Zeit mich da reinzufuchsen."),
    ("Verkäufer", "Genau für solche Situationen sind wir da. Sie müssen kein Experte sein, das übernehmen wir komplett für Sie."),
    ("Kunde",     "Klingt gut. Aber wie viel Eigenkapital brauche ich denn? Ich habe nicht unendlich viel Geld zur Verfügung."),
    ("Verkäufer", "Das hängt vom Objekt ab – in der Regel 10 bis 20 Prozent. Was steht bei Ihnen ungefähr bereit?"),
    ("Kunde",     "Vielleicht 15.000 Euro. Aber ich bin nicht sicher ob das reicht – das klingt eigentlich zu wenig für eine Immobilie."),
    ("Verkäufer", "15.000 Euro sind ein solider Einstieg für bestimmte Objektklassen. Dazu gibt es noch Förderprogramme."),
    ("Kunde",     "Und was kostet mich das monatlich? Ich habe laufende Kosten und kann mir keine zusätzliche finanzielle Belastung leisten."),
    ("Verkäufer", "Die Mieteinnahmen decken die Finanzierungsrate – im Idealfall zahlt der Mieter Ihre Immobilie komplett ab."),
    ("Kunde",     "Das klingt interessant. Aber ich muss das ehrlich gesagt erst mit meiner Frau besprechen bevor ich irgendetwas unterschreibe."),
    ("Verkäufer", "Natürlich, das ist absolut verständlich."),
    ("Kunde",     "Ja, ich melde mich dann in ein paar Wochen. Im Moment ist es bei der Arbeit sehr stressig – ich habe gerade wirklich keine Zeit dafür."),
    ("Verkäufer", "Selbstverständlich, kein Druck. Ich schicke Ihnen erst mal Unterlagen rüber."),
    ("Kunde",     "Noch eine Frage – wie sicher ist das wirklich? Ich habe gelesen dass Immobilienpreise auch fallen können. Was passiert wenn ich dann auf den Kosten sitzen bleibe?"),
    ("Verkäufer", "Das ist eine sehr berechtigte Frage."),
    ("Kunde",     "Ich weiß nicht. Das klingt alles gut aber ich habe generell kein Vertrauen in Finanzprodukte, nach allem was man in den Medien hört."),
]

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
  "phase":             "Eisbrecher|Bedarf|Pitch|Einwand|Abschluss",
  "kundensignal":      "was Kunde gerade will/blockt",
  "einwand":           "zu teuer|kein EK|keine Zeit|Bedenkzeit|Partner fragen|kein Vertrauen|null",
  "jetzt_sagen":       "die EINE beste Antwort, max 2 Sätze, wortwörtlich",
  "alternativen":      ["Variante 2", "Variante 3"],
  "naechster_schritt": "konkrete nächste Frage/Aktion",
  "warnung":           "falls Caller gerade Fehler macht, sonst null"
}"""

# ─── Sentinel für "Gerät konfiguriert aber nicht gefunden" ──────────────────
# FIX Bug 1+2+3: Unterschied zwischen "" (kein Config) und "name not found"

_DEVICE_NOT_FOUND = object()

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
                        pass

# ─── Globaler Zustand ─────────────────────────────────────────────────────────

manager = ConnectionManager()
audio_queue: "queue.Queue[tuple]" = queue.Queue(maxsize=80)
broadcast_queue: Optional[asyncio.Queue] = None

whisper_model: Optional[WhisperModel] = None
anth_client: Optional[_anthropic_lib.AsyncAnthropic] = None
transcript_ctx: List[dict] = []
audio_streams: list = []

# FIX Bug 2: Coaching läuft als Background-Task; dieses Flag verhindert parallele API-Calls
_coaching_active: bool = False

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
        match = re.search(r"\{[\s\S]*\}", raw)
        if match:
            return json.loads(match.group())
        print(f"⚠️  Kein JSON in Anthropic-Antwort: {raw[:200]}")
    except json.JSONDecodeError as e:
        print(f"⚠️  JSON-Parse-Fehler: {e}")
    except Exception as e:
        print(f"⚠️  Anthropic-Fehler: {e}")
    return None

# FIX Bug 2: Coaching als eigenständiger Background-Task – blockiert Transkription nicht mehr

async def _coaching_task(history: List[dict]) -> None:
    """Runs Anthropic coaching in background so processing_task stays unblocked."""
    global _coaching_active
    if _coaching_active:
        return  # vorheriger Coaching-Call läuft noch – überspringen
    _coaching_active = True
    try:
        await broadcast_queue.put({"type": "coach_loading", "loading": True})
        coaching = await _get_coaching(history)
        await broadcast_queue.put({"type": "coach_loading", "loading": False})
        if coaching:
            await broadcast_queue.put({"type": "coach", "data": coaching})
    except Exception as e:
        print(f"⚠️  Coaching-Task-Fehler: {e}")
    finally:
        _coaching_active = False

# ─── Verarbeitungs-Task (asyncio) ─────────────────────────────────────────────

async def processing_task() -> None:
    """Reads (speaker, chunk) from audio_queue, transcribes, triggers coaching."""
    global transcript_ctx
    loop = asyncio.get_running_loop()
    print("▶  Verarbeitungs-Task gestartet")

    while True:
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

        await broadcast_queue.put(
            {"type": "transcript", "speaker": speaker, "text": text}
        )

        transcript_ctx.append({"speaker": speaker, "text": text})
        if len(transcript_ctx) > HISTORY_TURNS * 2:
            transcript_ctx = transcript_ctx[-HISTORY_TURNS:]

        # FIX Bug 2: create_task statt await → Transkription läuft weiter während KI antwortet
        if speaker == "Kunde":
            asyncio.create_task(
                _coaching_task(list(transcript_ctx)),  # Snapshot des aktuellen Kontexts
                name="coaching",
            )

# ─── Broadcast-Task (asyncio) ─────────────────────────────────────────────────

async def broadcast_task() -> None:
    while True:
        msg = await broadcast_queue.get()
        await manager.broadcast(msg)

# ─── Demo-Task (kein Audio/Whisper nötig) ────────────────────────────────────

async def demo_task() -> None:
    """Feeds DEMO_SCRIPT directly into the pipeline. No audio hardware required."""
    global transcript_ctx
    print("🎭  Demo-Modus: simuliere Kapitalanlage-Gespräch …")
    await asyncio.sleep(2.5)  # kurze Pause damit Browser verbinden kann

    for speaker, text in DEMO_SCRIPT:
        await broadcast_queue.put({"type": "transcript", "speaker": speaker, "text": text})
        transcript_ctx.append({"speaker": speaker, "text": text})
        print(f"[DEMO][{speaker}] {text[:70]}")

        if speaker == "Kunde":
            asyncio.create_task(_coaching_task(list(transcript_ctx)), name="coaching")
            await asyncio.sleep(9)   # Zeit zum Lesen + KI-Call
        else:
            await asyncio.sleep(3.5)

    print("🎭  Demo-Gespräch beendet – Browser offen lassen, Coaching sichtbar")

# ─── Audio-Gerät finden ───────────────────────────────────────────────────────

def _find_device_index(cfg: str):
    """
    Returns:
      None             – cfg is empty → use system default (intentional)
      int              – device index found by name-substring or explicit index
      _DEVICE_NOT_FOUND – cfg given but no matching input device found
    """
    # FIX Bug 1+3: leerer String ≠ "nicht gefunden"
    if not cfg:
        return None
    if cfg.lstrip("-").isdigit():
        return int(cfg)
    cfg_lower = cfg.lower()
    for i, dev in enumerate(sd.query_devices()):
        if cfg_lower in dev["name"].lower() and dev["max_input_channels"] > 0:
            return i
    return _DEVICE_NOT_FOUND


def _start_stream(device_cfg: str, speaker_label: str, require_explicit: bool = False) -> bool:
    """
    Opens a sounddevice InputStream.

    require_explicit=True: empty device_cfg is treated as failure (used for Loopback/Kunde).
    require_explicit=False: empty device_cfg falls back to system default (used for Mic/Verkäufer).
    """
    # FIX Bug 1: Loopback braucht explizites Gerät; leer = nicht konfiguriert
    if not device_cfg:
        if require_explicit:
            print(
                f"⚠️  LOOPBACK_DEVICE nicht gesetzt – kein '{speaker_label}'-Stream gestartet.\n"
                "    Setze LOOPBACK_DEVICE=<Gerätename>  (python server.py --devices für Liste)"
            )
            return False
        idx = None  # MIC: system default ist OK
    else:
        idx = _find_device_index(device_cfg)
        # FIX Bug 2+3: nicht gefunden → klar melden, NICHT auf Default fallen
        if idx is _DEVICE_NOT_FOUND:
            print(
                f"❌  Gerät '{device_cfg}' nicht unter Input-Geräten gefunden.\n"
                f"    Verfügbare Geräte:  python server.py --devices"
            )
            return False

    buf = AudioBuffer(speaker_label, audio_queue)
    try:
        stream = sd.InputStream(
            device=idx,
            channels=1,
            samplerate=SAMPLE_RATE,
            dtype="float32",
            blocksize=int(SAMPLE_RATE * 0.1),
            callback=buf.feed,
        )
        stream.start()
        audio_streams.append(stream)
        dev_info = (
            sd.query_devices(idx) if idx is not None
            else sd.query_devices(kind="input")
        )
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

    if not ANTHROPIC_KEY:
        print("⚠️  ANTHROPIC_API_KEY nicht gesetzt – KI-Coaching deaktiviert!")
        print("    Setzen mit: export ANTHROPIC_API_KEY=sk-ant-...")
    else:
        anth_client = _anthropic_lib.AsyncAnthropic(api_key=ANTHROPIC_KEY)
        print(f"✅  Anthropic: {ANTHROPIC_MODEL}")

    print(f"⏳  Lade Whisper '{WHISPER_MODEL_ID}' … (erster Start = Download ~1–3 GB)")
    try:
        whisper_model = await loop.run_in_executor(
            None,
            lambda: WhisperModel(WHISPER_MODEL_ID, device="auto", compute_type="auto"),
        )
        print(f"✅  Whisper '{WHISPER_MODEL_ID}' geladen")
    except Exception as e:
        print(f"❌  Whisper-Ladefehler: {e}")
        print("    Tipp: WHISPER_MODEL=medium setzen für schnelleren Download/Start")

    if DEMO_MODE:
        print("\n🎭  Demo-Modus aktiv – kein Audio-Gerät nötig")
        print("   Gespräch startet automatisch nach Browser-Verbindung\n")
    else:
        print("\n── Audio-Geräte ─────────────────────────────────────────────────────")
        mic_ok = _start_stream(MIC_DEVICE_CFG, "Verkäufer", require_explicit=False)
        if not mic_ok:
            print("   Tipp: MIC_DEVICE=<Gerätename> setzen")

        loop_ok = _start_stream(LOOPBACK_DEVICE_CFG, "Kunde", require_explicit=True)
        if not loop_ok:
            print(
                "   → VB-Cable (Windows) / BlackHole (Mac) installieren\n"
                "   → LOOPBACK_DEVICE=\"CABLE Output\" oder \"BlackHole\" setzen\n"
                "   → Single-Stream-Modus: nur Mikrofon aktiv, kein KI-Coaching"
            )

    proc  = asyncio.create_task(processing_task(), name="processing")
    bcast = asyncio.create_task(broadcast_task(),   name="broadcast")
    if DEMO_MODE:
        asyncio.create_task(demo_task(), name="demo")

    print("\n" + "─" * 68)
    print("  🚀  MRE Sales Copilot PRO  →  http://localhost:8000")
    print("      Verfügbare Geräte:          GET /api/devices")
    print("      Status:                     GET /api/status")
    print("─" * 68 + "\n")

    yield  # Server läuft hier

    # FIX Bug 6: Tasks canceln UND auf sauberes Ende warten
    proc.cancel()
    bcast.cancel()
    await asyncio.gather(proc, bcast, return_exceptions=True)

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
    return HTMLResponse(
        "<h1>index.html nicht gefunden – bitte im selben Ordner ablegen.</h1>", 404
    )

@app.get("/api/devices")
async def list_devices():
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
    parser.add_argument("--devices", action="store_true",
                        help="Zeigt verfügbare Audio-Geräte und beendet")
    parser.add_argument("--demo", action="store_true",
                        help="Demo-Modus: simuliertes Gespräch, kein Audio nötig")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    if args.devices:
        print("\n── Verfügbare Audio-Input-Geräte ────────────────────────────────────")
        # FIX Bug 4: sd.default.device kann int oder Tupel sein
        default_dev = sd.default.device
        default_in = default_dev[0] if isinstance(default_dev, (list, tuple)) else default_dev
        for i, d in enumerate(sd.query_devices()):
            if d["max_input_channels"] > 0:
                marker = " ◀ DEFAULT" if i == default_in else ""
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
