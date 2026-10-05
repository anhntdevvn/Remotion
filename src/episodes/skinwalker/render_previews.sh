#!/bin/bash
set -e

REMOTION_BIN="./node_modules/.bin/remotion"
OUT_DIR="public/episodes/skinwalker/previews"
mkdir -p "$OUT_DIR"

echo "=== 1. Rendering Still Previews ==="
$REMOTION_BIN still Skinwalker-Scene-0-Hook "$OUT_DIR/still_hook_porch.png" --frame=120 --overwrite
$REMOTION_BIN still Skinwalker-Scene-0-Hook "$OUT_DIR/still_hook_title.png" --frame=1150 --overwrite
$REMOTION_BIN still Skinwalker-Scene-1-Prologue "$OUT_DIR/still_ch1_map.png" --frame=1400 --overwrite
$REMOTION_BIN still Skinwalker-Scene-2-Utah-Cabin "$OUT_DIR/still_ch2_cabin.png" --frame=200 --overwrite
$REMOTION_BIN still Skinwalker-Scene-3-Mexican-Water "$OUT_DIR/still_ch3_police_report.png" --frame=2600 --overwrite
$REMOTION_BIN still Skinwalker-Scene-4-Snowplow "$OUT_DIR/still_ch4_road_figure.png" --frame=2000 --overwrite
$REMOTION_BIN still Skinwalker-Scene-5-Millers-Creek "$OUT_DIR/still_ch5_hallway.png" --frame=1200 --overwrite
$REMOTION_BIN still Skinwalker-Scene-6-Epilogue "$OUT_DIR/still_ch6_evidence_board.png" --frame=1800 --overwrite

echo "=== 2. Rendering 6 Chapter Video Previews (10-15s each) ==="
# Clip 1: Hook (First 450 frames / 15s)
$REMOTION_BIN render Skinwalker-Scene-0-Hook "$OUT_DIR/preview_0_hook.mp4" --frames=0-450 --overwrite

# Clip 2: Utah Cabin Window & Night (Frames 600-950 / ~11s)
$REMOTION_BIN render Skinwalker-Scene-2-Utah-Cabin "$OUT_DIR/preview_1_utah_window.mp4" --frames=600-950 --overwrite

# Clip 3: Mexican Water Police Report & Footsteps (Frames 2200-2550 / ~11s)
$REMOTION_BIN render Skinwalker-Scene-3-Mexican-Water "$OUT_DIR/preview_2_mexican_water.mp4" --frames=2200-2550 --overwrite

# Clip 4: Snowplow Radio & Brakes (Frames 1700-2050 / ~11s)
$REMOTION_BIN render Skinwalker-Scene-4-Snowplow "$OUT_DIR/preview_3_snowplow.mp4" --frames=1700-2050 --overwrite

# Clip 5: Miller's Creek Frozen Bank (Frames 1100-1450 / ~11s)
$REMOTION_BIN render Skinwalker-Scene-5-Millers-Creek "$OUT_DIR/preview_4_millers_creek.mp4" --frames=1100-1450 --overwrite

# Clip 6: Epilogue Evidence Board (Frames 1600-1950 / ~11s)
$REMOTION_BIN render Skinwalker-Scene-6-Epilogue "$OUT_DIR/preview_5_epilogue.mp4" --frames=1600-1950 --overwrite

echo "=== All preview stills and video clips rendered successfully! ==="
