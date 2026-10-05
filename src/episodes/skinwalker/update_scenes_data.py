import json, os

ROOT_DIR = "/home/anhnt/Documents/Remotion"
DATA_DIR = os.path.join(ROOT_DIR, "src/episodes/skinwalker/data")
MANIFEST_PATH = os.path.join(DATA_DIR, "audio_manifest.json")
CAPTIONS_PATH = os.path.join(DATA_DIR, "captions.json")
OUT_TS_PATH = os.path.join(ROOT_DIR, "src/episodes/skinwalker/scenesData.ts")

def build_ts():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)
    with open(CAPTIONS_PATH, "r", encoding="utf-8") as f:
        captions = json.load(f)

    # Plate mappings for each scene
    scene_plates_config = {
        "scene0_hook": [
            {"src": "episodes/skinwalker/images/hook_cabin_glance.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/hook_window_figure.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/hook_radio_closeup.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/hook_footprints_creek.jpg", "panDirection": "zoom-out", "scaleStart": 1.05, "scaleEnd": 1.01},
        ],
        "scene1_intro": [
            {"src": "episodes/skinwalker/images/scene1_desert.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch1_map_fourcorners.jpg", "panDirection": "zoom-in", "scaleStart": 1.00, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/ch6_dusk_fade.jpg", "panDirection": "zoom-out", "scaleStart": 1.05, "scaleEnd": 1.01},
        ],
        "scene2_utah": [
            {"src": "episodes/skinwalker/images/cabin_winter.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/cabin_dog_porch.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch2_cabin_detail.jpg", "panDirection": "zoom-out", "scaleStart": 1.06, "scaleEnd": 1.01},
            {"src": "episodes/skinwalker/images/ch2_window_face_v2.png", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch2_field_figure_v2.png", "panDirection": "pan-right", "scaleStart": 1.02, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch2_frost_night.jpg", "panDirection": "zoom-out", "scaleStart": 1.05, "scaleEnd": 1.01},
        ],
        "scene3_mexican_water": [
            {"src": "episodes/skinwalker/images/scene3_window.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch3_yard_silhouette.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch3_synchronized_walk_v2.png", "panDirection": "pan-right", "scaleStart": 1.01, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/ch3_mexican_water_report.jpg", "panDirection": "zoom-in", "scaleStart": 1.00, "scaleEnd": 1.03},
        ],
        "scene4_snowplow": [
            {"src": "episodes/skinwalker/images/scene4_snowplow.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/scene4_road_figure.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch4_radio_call_v2.png", "panDirection": "pan-right", "scaleStart": 1.01, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/hook_radio_closeup.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch4_road_close.jpg", "panDirection": "zoom-out", "scaleStart": 1.06, "scaleEnd": 1.01},
            {"src": "episodes/skinwalker/images/ch4_footprints_to_cab_v2.png", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
        ],
        "scene5_millers_creek": [
            {"src": "episodes/skinwalker/images/scene5_farmhouse_exterior.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch5_red_coat_doorway_v2.png", "panDirection": "pan-right", "scaleStart": 1.01, "scaleEnd": 1.04},
            {"src": "episodes/skinwalker/images/scene5_abandoned_hallway.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.06},
            {"src": "episodes/skinwalker/images/ch5_shoulder_touch_v2.png", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch5_creek_frozen.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/scene6_snow_footprints.jpg", "panDirection": "zoom-out", "scaleStart": 1.05, "scaleEnd": 1.01},
        ],
        "scene6_conclusion": [
            {"src": "episodes/skinwalker/images/scene6_snow_footprints.jpg", "panDirection": "zoom-in", "scaleStart": 1.01, "scaleEnd": 1.05},
            {"src": "episodes/skinwalker/images/ch6_archival_summary.jpg", "panDirection": "zoom-in", "scaleStart": 1.00, "scaleEnd": 1.03},
            {"src": "episodes/skinwalker/images/ch6_dusk_fade.jpg", "panDirection": "zoom-out", "scaleStart": 1.06, "scaleEnd": 1.01},
        ],
    }

    # Generate TypeScript code
    lines = [
        "import { SceneData } from '../../types';",
        "",
        "export const SCENE_TRANSITION_FRAMES = 15;",
        "",
    ]

    var_names = {
        "scene0_hook": "SCENE_0_HOOK",
        "scene1_intro": "SCENE_1_PROLOGUE",
        "scene2_utah": "SCENE_2_UTAH_CABIN",
        "scene3_mexican_water": "SCENE_3_MEXICAN_WATER",
        "scene4_snowplow": "SCENE_4_SNOWPLOW_RIDGE",
        "scene5_millers_creek": "SCENE_5_MILLERS_CREEK",
        "scene6_conclusion": "SCENE_6_EPILOGUE",
    }

    total_duration_frames = 0

    for item in manifest:
        s_id = item["id"]
        var_name = var_names.get(s_id, f"SCENE_{s_id.upper()}")
        dur_frames = item["durationInFrames"]
        total_duration_frames += dur_frames
        
        # Plates with duration
        plates = scene_plates_config.get(s_id, [{"src": "episodes/skinwalker/images/scene1_desert.jpg", "panDirection": "zoom-in"}])
        num_plates = len(plates)
        plate_dur = dur_frames // num_plates
        remainder = dur_frames % num_plates
        
        plates_json = []
        for p_i, p in enumerate(plates):
            d = plate_dur + (remainder if p_i == num_plates - 1 else 0)
            p_entry = dict(p)
            p_entry["durationInFrames"] = d
            plates_json.append(p_entry)
            
        cues = captions.get(s_id, [])
        subs_json = []
        for c_i, c in enumerate(cues):
            subs_json.append({
                "id": f"{s_id}_sub_{c_i+1}",
                "startFrame": c["startFrame"],
                "endFrame": c["endFrame"],
                "text": c["text"],
            })
            
        date_marker = item.get("dateMarker", {})
        
        lines.append(f"export const {var_name}: SceneData = {{")
        lines.append(f"  id: '{s_id}',")
        lines.append(f"  title: {json.dumps(item['title'], ensure_ascii=False)},")
        lines.append(f"  startFrame: 0,")
        lines.append(f"  durationInFrames: {dur_frames},")
        lines.append(f"  voiceoverAudio: '{item['audioFile']}',")
        
        if date_marker.get("date"):
            lines.append(f"  dateMarker: {{")
            lines.append(f"    date: {json.dumps(date_marker['date'], ensure_ascii=False)},")
            lines.append(f"    location: {json.dumps(date_marker.get('location', ''), ensure_ascii=False)},")
            lines.append(f"    startFrame: 30,")
            lines.append(f"    durationInFrames: 140,")
            lines.append(f"  }},")
            
        lines.append(f"  images: {json.dumps(plates_json, ensure_ascii=False, indent=4)},")
        lines.append(f"  subtitles: {json.dumps(subs_json, ensure_ascii=False, indent=4)},")
        lines.append(f"}};")
        lines.append("")

    lines.append(f"export const FULL_EPISODE_DURATION_IN_FRAMES = {total_duration_frames} - (SCENE_TRANSITION_FRAMES * 6);")
    lines.append("")

    with open(OUT_TS_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"-> Generated {OUT_TS_PATH} with total duration {total_duration_frames} frames ({total_duration_frames/30:.1f}s, {total_duration_frames/1800:.1f} minutes)!")

if __name__ == "__main__":
    build_ts()
