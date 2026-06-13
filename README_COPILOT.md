# MRE Live Sales Copilot PRO

Echtzeit-KI-Telefoncoach: hört BEIDE Gesprächsseiten mit, transkribiert live,
trennt Sprecher und blendet dem Verkäufer die beste nächste Aussage ein.

```
┌─────────────────┬──────────────────────────┬────────────────┐
│  Live Transkript│       JETZT SAGEN        │  Phase         │
│                 │                          │  Einwand       │
│  Verkäufer (blau│  „Herr Müller, genau das │  Kundensignal  │
│  Kunde    (grün)│   ist der Punkt – …"     │  Nächster      │
│                 │                          │  Schritt       │
└─────────────────┴──────────────────────────┴────────────────┘
```

---

## 1  Voraussetzungen

| Was | Wo herunterladen |
|-----|-----------------|
| Python 3.10+ | python.org |
| VB-CABLE (**Windows**) | vb-audio.com/Cable |
| BlackHole (**Mac**) | existingcode.com/blackhole |
| Anthropic API Key | console.anthropic.com |

> **GPU empfohlen.** Whisper `large-v3` auf CPU ist sehr langsam (~15–40 s/Chunk).  
> Auf CPU: `WHISPER_MODEL=medium` (gutes Deutsch, ~3–8 s/Chunk) oder `small`.

---

## 2  Audio-Routing einrichten

### Windows (VB-CABLE)

```
Telefon-App                   VB-Cable                  Python
(3CX / sipgate / etc.)   ─►  [CABLE Input]  ─►  [CABLE Output] ─► Whisper "Kunde"

Mikrofon                                             Default Input ─► Whisper "Verkäufer"
```

Schritt für Schritt:

1. **VB-CABLE installieren** – Neustart erforderlich.
2. In deiner **Telefon-App** (z.B. 3CX, sipgate Softphone, Teams):  
   Einstellungen → Audio → **Ausgabe auf "VB-Cable Input"** stellen.
3. Python empfängt den Loopback unter `"CABLE Output"`.
4. Dein Mikrofon bleibt Standard-Input.
5. Umgebungsvariable setzen:
   ```powershell
   $env:LOOPBACK_DEVICE = "CABLE Output"
   ```

### Mac (BlackHole)

```
System-Audio  ─►  Multi-Output-Device ─► Lautsprecher
                                        └► BlackHole ─► Python "Kunde"
Mikrofon      ─►  Default Input        ─► Python "Verkäufer"
```

Schritt für Schritt:

1. **BlackHole 2ch installieren** (keine Neuinstallation nötig).
2. **Audio-MIDI-Setup** öffnen (Spotlight: `Audio MIDI Setup`).
3. Unten links **„+"** → **„Multi-Ausgabegerät erstellen"**.  
   Beide Haken setzen: **BlackHole 2ch** + **deine Lautsprecher/AirPods**.  
   Lautsprecher als Master-Gerät (Lautstärkeregelung).
4. **Systemeinstellungen → Ton → Ausgabe** →  **Multi-Ausgabegerät** wählen.
5. Python empfängt den Loopback unter `"BlackHole"`.
6. Umgebungsvariable:
   ```bash
   export LOOPBACK_DEVICE="BlackHole"
   ```

> **Tipp:** Mikrofon-Routing muss nichts geändert werden – Python nimmt den Standard-Input.

---

## 3  ANTHROPIC_API_KEY setzen

### Mac / Linux (Shell-Session)
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Mac / Linux (dauerhaft in ~/.zshrc oder ~/.bashrc)
```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

### Windows (PowerShell-Session)
```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### Windows (dauerhaft via Systemsteuerung)
```cmd
setx ANTHROPIC_API_KEY "sk-ant-..."
```
(Danach Terminal neu starten.)

---

## 4  Pakete installieren

```bash
pip install -r requirements.txt
```

Beim ersten Start lädt Whisper das Modell herunter (~1 GB für `medium`,
~3 GB für `large-v3`). Das passiert automatisch.

---

## 5  Audio-Geräte prüfen (optional)

```bash
python server.py --devices
```

Ausgabe zeigt alle verfügbaren Mikrofon/Loopback-Geräte mit Index und Name.
Der Index oder ein Namens-Substring kann als `LOOPBACK_DEVICE`/`MIC_DEVICE` gesetzt werden.

Beispiel-Ausgabe:
```
── Verfügbare Audio-Input-Geräte ────────────────────────────────────
  [ 0] MacBook Pro Mikrofon ◀ DEFAULT
  [ 1] BlackHole 2ch
  [ 2] USB-Headset Mikrofon
```

---

## 6  Starten

```bash
# Alle Variablen in einer Zeile (Mac/Linux):
ANTHROPIC_API_KEY="sk-ant-..." LOOPBACK_DEVICE="BlackHole" python server.py

# Windows PowerShell:
$env:ANTHROPIC_API_KEY="sk-ant-..."; $env:LOOPBACK_DEVICE="CABLE Output"; python server.py
```

Browser öffnen: **http://localhost:8000**

---

## 7  Umgebungsvariablen Übersicht

| Variable | Standard | Beschreibung |
|---|---|---|
| `ANTHROPIC_API_KEY` | – | **Pflicht.** API Key von console.anthropic.com |
| `LOOPBACK_DEVICE` | *(leer)* | Name/Index des Loopback-Geräts (VB-Cable/BlackHole) |
| `MIC_DEVICE` | *(leer = System-Default)* | Name/Index des Mikrofons |
| `WHISPER_MODEL` | `large-v3` | Whisper-Modell: `large-v3`, `medium`, `small` |

---

## 8  Dateistruktur

```
server.py          Python-Backend (FastAPI + WebSocket)
index.html         Browser-Frontend (kein Framework, Vanilla JS)
requirements.txt   Python-Abhängigkeiten
README_COPILOT.md  Diese Datei
```

---

## 9  Architektur

```
Mikrofon  ──►  sounddevice  ──►  AudioBuffer "Verkäufer" ──►┐
                                                              ├──► audio_queue
Loopback  ──►  sounddevice  ──►  AudioBuffer "Kunde"    ──►┘
                                                              │
                                              processing_task ◄──┘
                                                    │
                                    ┌───────────────┴──────────────┐
                                    ▼                               ▼
                             faster-whisper                  (nur Kunde)
                             Transkription                  Anthropic API
                                    │                               │
                                    └───────────────┬──────────────┘
                                                    ▼
                                           broadcast_queue
                                                    │
                                           WebSocket → Browser
```

---

## 10  Troubleshooting

**„Kein Loopback-Gerät gefunden"**  
→ `python server.py --devices` ausführen, Gerätename prüfen, `LOOPBACK_DEVICE` setzen.

**Transkription sehr langsam**  
→ `WHISPER_MODEL=medium` oder `small` setzen; GPU (NVIDIA CUDA) beschleunigt enorm.

**„ANTHROPIC_API_KEY nicht gesetzt"**  
→ Variable exportieren (Schritt 3) und Server neu starten.

**Kein Ton vom Telefon im Loopback**  
→ Sicherstellen dass die Telefon-App wirklich auf VB-Cable/BlackHole ausgibt.  
   Test: Loopback-Gerät als System-Ausgabe setzen und YouTube-Video spielen – hört Python es?

**Browser verbindet nicht**  
→ `http://localhost:8000` (nicht https); Firewall prüfen; Port mit `--port 8001` ändern.
