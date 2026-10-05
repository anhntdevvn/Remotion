import asyncio
import json
from pathlib import Path

import edge_tts


ROOT = Path("/home/anhnt/Documents/Remotion")
OUT_DIR = ROOT / "public/episodes/taiwan-after-ww2/audio"
DATA_DIR = ROOT / "src/episodes/taiwan-after-ww2/data"
VOICE = "ko-KR-HyunsuMultilingualNeural"
RATE = "+10%"
PITCH = "-4Hz"
TEXT = (
    "일본은 대만을 50년간 지배했습니다. "
    "하지만 1945년, 모두 잃었습니다. "
    "왜 대만을 지키지 못했을까요? "
    "제2차 세계대전이 끝나자 일본 제국의 지배권은 무너졌습니다. "
    "그중 대만은 50년간 일본의 지배를 받았습니다. "
    "대만의 일본군은 중화민국에 항복했고, 섬의 행정도 중화민국 정부가 맡기 시작했습니다."
)


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    audio_path = OUT_DIR / "s01_ko.mp3"
    metadata_path = DATA_DIR / "s01_voice_metadata.jsonl"

    communicate = edge_tts.Communicate(
        TEXT,
        VOICE,
        rate=RATE,
        pitch=PITCH,
        boundary="SentenceBoundary",
    )
    await communicate.save(str(audio_path), str(metadata_path))

    config = {
        "id": "S01",
        "narrationId": "KO-001",
        "voice": VOICE,
        "rate": RATE,
        "pitch": PITCH,
        "text": TEXT,
        "audioFile": "episodes/taiwan-after-ww2/audio/s01_ko.mp3",
        "audioStartSec": 0.45,
    }
    (DATA_DIR / "s01_voice_config.json").write_text(
        json.dumps(config, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(audio_path)


if __name__ == "__main__":
    asyncio.run(main())
