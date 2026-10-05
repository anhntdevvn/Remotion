#!/usr/bin/env python3
import math
import random
import struct
import wave
from pathlib import Path

RATE = 48000
OUT = Path(__file__).parents[3] / "public/episodes/taiwan-after-ww2/audio/sfx"
OUT.mkdir(parents=True, exist_ok=True)
random.seed(1945)


def save(name: str, samples: list[float]) -> None:
    peak = max(1.0, max(abs(x) for x in samples))
    pcm = b"".join(struct.pack("<h", int(max(-1, min(1, x / peak)) * 32767)) for x in samples)
    with wave.open(str(OUT / name), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes(pcm)


def impact(seconds: float = 1.4) -> list[float]:
    data = []
    for i in range(int(RATE * seconds)):
        t = i / RATE
        env = math.exp(-4.2 * t)
        low = math.sin(2 * math.pi * (56 - 14 * t) * t) * 0.78
        crack = (random.random() * 2 - 1) * math.exp(-35 * t) * 0.5
        data.append((low + crack) * env)
    return data


def whoosh(seconds: float = 0.8) -> list[float]:
    data = []
    previous = 0.0
    for i in range(int(RATE * seconds)):
        t = i / RATE
        x = random.random() * 2 - 1
        previous = previous * 0.92 + x * 0.08
        env = math.sin(math.pi * min(1, t / seconds)) ** 1.5
        data.append(previous * env * 1.8)
    return data


def paper(seconds: float = 0.65) -> list[float]:
    data = []
    previous = 0.0
    for i in range(int(RATE * seconds)):
        t = i / RATE
        x = random.random() * 2 - 1
        previous = previous * 0.65 + x * 0.35
        pulse = max(0, math.sin(math.pi * t / seconds))
        data.append(previous * pulse * 0.45)
    return data


save("impact.wav", impact())
save("whoosh.wav", whoosh())
save("paper.wav", paper())
save("stamp.wav", impact(0.48))

