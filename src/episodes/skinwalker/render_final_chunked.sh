#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/anhnt/Documents/Remotion"
SEGMENT_DIR="$ROOT/out/skinwalker-render-segments"
OUTPUT="$ROOT/out/return-of-the-skinwalker-vi-final.mp4"
FFMPEG="$ROOT/node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
TOTAL_FRAMES=55117
CHUNK_FRAMES=6000

mkdir -p "$SEGMENT_DIR"

segment_index=0
start_frame=0
while (( start_frame < TOTAL_FRAMES )); do
  end_frame=$((start_frame + CHUNK_FRAMES - 1))
  if (( end_frame >= TOTAL_FRAMES )); then
    end_frame=$((TOTAL_FRAMES - 1))
  fi

  segment_file=$(printf "%s/segment-%03d.mp4" "$SEGMENT_DIR" "$segment_index")
  if [[ ! -s "$segment_file" ]]; then
    npx remotion render src/index.ts SkinwalkerDocumentary "$segment_file" \
      --frames="$start_frame-$end_frame" \
      --codec=h264 \
      --crf=19 \
      --audio-bitrate=320k \
      --concurrency=2 \
      --log=error
  fi

  segment_index=$((segment_index + 1))
  start_frame=$((end_frame + 1))
done

concat_file="$SEGMENT_DIR/concat.txt"
: > "$concat_file"
for segment_file in "$SEGMENT_DIR"/segment-*.mp4; do
  printf "file '%s'\n" "$segment_file" >> "$concat_file"
done

"$FFMPEG" -y -f concat -safe 0 -i "$concat_file" -c copy -movflags +faststart "$OUTPUT"
printf "Rendered final video: %s\n" "$OUTPUT"
