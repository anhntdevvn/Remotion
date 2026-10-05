#!/usr/bin/env python3
"""Create a restrained, original documentary ambience bed for the full episode."""

import json
import math
import random
import struct
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
TIMING = json.loads((ROOT / "src/episodes/taiwan-after-ww2/data/full_timing.json").read_text())
DURATION = TIMING["durationSec"] + 2
RATE = 22050
OUT_DIR = ROOT / "public/episodes/taiwan-after-ww2/audio"
WAV = OUT_DIR / "episode_bed.wav"
MP3 = OUT_DIR / "episode_bed.mp3"
FFMPEG = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"

random.seed(1951)
phases = [0.0, 0.0, 0.0]
with wave.open(str(WAV), "wb") as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(RATE)
    for i in range(round(DURATION * RATE)):
        t = i / RATE
        chapter = min(8, int(t / max(1, DURATION / 9)))
        root = [46.25, 43.65, 49.0, 41.2, 46.25, 51.91, 43.65, 49.0, 46.25][chapter]
        pulse = 0.5 + 0.5 * math.sin(2 * math.pi * t / 8.0)
        chord = 0.0
        for n, ratio in enumerate((1.0, 1.5, 2.0)):
            phases[n] += 2 * math.pi * root * ratio / RATE
            chord += math.sin(phases[n]) * (0.46 / (n + 1))
        low = math.sin(2 * math.pi * (root / 2) * t) * 0.34
        air = (random.random() * 2 - 1) * 0.018
        slow_fade = min(1, t / 3, (DURATION - t) / 4)
        value = (chord * (0.45 + 0.18 * pulse) + low + air) * 0.20 * max(0, slow_fade)
        audio.writeframesraw(struct.pack("<h", max(-32767, min(32767, int(value * 32767)))))

subprocess.run([str(FFMPEG), "-y", "-i", str(WAV), "-codec:a", "libmp3lame", "-b:a", "112k", str(MP3)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
WAV.unlink()
print(MP3)
