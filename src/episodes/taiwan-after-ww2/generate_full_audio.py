#!/usr/bin/env python3
"""Generate Korean narration and the frame-accurate full episode timeline."""

import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[3]
EPISODE = ROOT / "src/episodes/taiwan-after-ww2"
SCRIPT = EPISODE / "planning/04a_korean_script.md"
PUBLIC_AUDIO = ROOT / "public/episodes/taiwan-after-ww2/audio/narration"
DATA = EPISODE / "data"
FFPROBE = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu/ffprobe"
FPS = 30
VOICE = "ko-KR-HyunsuMultilingualNeural"
RATE = "+10%"
PITCH = "-4Hz"

SCENE_GROUPS = [
    ["KO-001"], ["KO-002"], ["KO-003"], ["KO-004", "KO-005"],
    ["KO-006", "KO-007"], ["KO-008", "KO-009"], ["KO-010", "KO-011"],
    ["KO-012", "KO-013"], ["KO-014", "KO-015"], ["KO-016", "KO-017"],
    ["KO-018", "KO-019"], ["KO-020", "KO-021"], ["KO-022", "KO-023"],
    ["KO-024"], ["KO-025", "KO-026"], ["KO-027", "KO-028"], ["KO-029"],
    ["KO-030", "KO-031"], ["KO-032", "KO-033", "KO-034"],
    ["KO-035", "KO-036"], ["KO-037"],
]


def parse_script() -> dict[str, str]:
    raw = SCRIPT.read_text(encoding="utf-8")
    matches = list(re.finditer(r"^### (KO-\d{3})[^\n]*\n\n", raw, re.M))
    result = {}
    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
        body = raw[match.end():end]
        body = re.split(r"\n## ", body, maxsplit=1)[0].strip()
        result[match.group(1)] = " ".join(line.strip() for line in body.splitlines() if line.strip())
    return result


def duration(path: Path) -> float:
    command = [str(FFPROBE), "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)]
    return float(subprocess.check_output(command, text=True).strip())


async def create_clip(key: str, text: str) -> None:
    output = PUBLIC_AUDIO / f"{key.lower()}.mp3"
    metadata = DATA / "narration_metadata" / f"{key.lower()}.jsonl"
    if output.exists() and output.stat().st_size > 1000:
        return
    communicator = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await communicator.save(str(output), str(metadata))


def sentence_captions(text: str, start_frame: int, duration_frames: int) -> list[dict]:
    sentences = [s.strip() for s in re.split(r"(?<=[.!?다요까죠])\s+", text) if s.strip()]
    if not sentences:
        sentences = [text]
    weights = [max(1, len(re.sub(r"\s", "", sentence))) for sentence in sentences]
    total = sum(weights)
    captions = []
    cursor = start_frame
    for index, (sentence, weight) in enumerate(zip(sentences, weights)):
        end = start_frame + duration_frames if index == len(sentences) - 1 else cursor + round(duration_frames * weight / total)
        captions.append({
            "text": sentence,
            "startMs": round(cursor / FPS * 1000),
            "endMs": round(end / FPS * 1000),
            "timestampMs": None,
            "confidence": None,
        })
        cursor = end
    return captions


async def main() -> None:
    texts = parse_script()
    PUBLIC_AUDIO.mkdir(parents=True, exist_ok=True)
    (DATA / "narration_metadata").mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(3)

    async def guarded(key: str, text: str) -> None:
        async with semaphore:
            await create_clip(key, text)

    await asyncio.gather(*(guarded(key, texts[key]) for key in texts if key != "KO-001"))

    clips = {}
    clips["KO-001"] = {
        "text": texts["KO-001"],
        "file": "episodes/taiwan-after-ww2/audio/s01_ko.mp3",
        "durationSec": duration(ROOT / "public/episodes/taiwan-after-ww2/audio/s01_ko.mp3"),
    }
    for key in texts:
        if key == "KO-001":
            continue
        path = PUBLIC_AUDIO / f"{key.lower()}.mp3"
        clips[key] = {
            "text": texts[key],
            "file": f"episodes/taiwan-after-ww2/audio/narration/{key.lower()}.mp3",
            "durationSec": duration(path),
        }

    scenes = []
    captions = []
    cursor = 0
    for scene_index, ids in enumerate(SCENE_GROUPS, start=1):
        scene_start = cursor
        if scene_index == 1:
            clip_start = 14
            clip_frames = round(clips["KO-001"]["durationSec"] * FPS)
            captions += sentence_captions(clips["KO-001"]["text"], clip_start, clip_frames)
            cursor = 810
        else:
            for id_index, key in enumerate(ids):
                clip_frames = round(clips[key]["durationSec"] * FPS)
                clips[key]["startFrame"] = cursor
                clips[key]["durationFrames"] = clip_frames
                captions += sentence_captions(clips[key]["text"], cursor, clip_frames)
                cursor += clip_frames
                if id_index < len(ids) - 1:
                    cursor += 9
            cursor += 14
        scenes.append({
            "id": f"S{scene_index:02d}",
            "narrationIds": ids,
            "startFrame": scene_start,
            "durationInFrames": cursor - scene_start,
        })

    timeline = {
        "fps": FPS,
        "voice": VOICE,
        "rate": RATE,
        "pitch": PITCH,
        "durationInFrames": cursor,
        "durationSec": round(cursor / FPS, 3),
        "clips": clips,
        "scenes": scenes,
        "captions": captions,
    }
    (DATA / "full_timing.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    (EPISODE / "fullTiming.ts").write_text(
        "// Generated by generate_full_audio.py\n"
        f"export const FULL_EPISODE_FRAMES = {cursor};\n"
        f"export const FULL_EPISODE_SECONDS = {cursor / FPS:.3f};\n",
        encoding="utf-8",
    )
    print(json.dumps({"clips": len(clips), "scenes": len(scenes), "frames": cursor, "seconds": round(cursor / FPS, 2)}, ensure_ascii=False))


if __name__ == "__main__":
    asyncio.run(main())
