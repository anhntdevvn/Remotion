import asyncio, hashlib, json, os, re, subprocess

ROOT_DIR = "/home/anhnt/Documents/Remotion"
SCRIPT_PATH = os.path.join(ROOT_DIR, "src/episodes/skinwalker/data/master_script.json")
AUDIO_DIR = os.path.join(ROOT_DIR, "public/episodes/skinwalker/audio")
DATA_DIR = os.path.join(ROOT_DIR, "src/episodes/skinwalker/data")
TEMP_DIR = os.path.join(AUDIO_DIR, "temp")
FFMPEG = os.path.join(ROOT_DIR, "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg")
VOICE = "vi-VN-NamMinhNeural"
VOICE_RATE = "-20%"

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

import edge_tts

def get_audio_duration(file_path):
    cmd = [
        FFMPEG, "-i", file_path
    ]
    proc = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in proc.stderr.splitlines():
        if "Duration:" in line:
            m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", line)
            if m:
                h, m_, s = float(m.group(1)), float(m.group(2)), float(m.group(3))
                return h * 3600 + m_ * 60 + s
    return 0.0

def create_silence(duration, out_path):
    cmd = [
        FFMPEG, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(duration), out_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def split_sentence_into_cues(text, start_sec, duration_sec):
    words = text.strip().split()
    if len(words) <= 10:
        return [{
            "text": text.strip(),
            "startSec": round(start_sec, 3),
            "endSec": round(start_sec + duration_sec, 3),
            "startFrame": round(start_sec * 30),
            "endFrame": round((start_sec + duration_sec) * 30)
        }]
    
    target_chunk_size = 7
    num_chunks = max(2, round(len(words) / target_chunk_size))
    chunk_len = len(words) // num_chunks
    remainder = len(words) % num_chunks
    
    cues = []
    idx = 0
    total_chars = len(text.strip())
    accum_sec = start_sec
    
    for i in range(num_chunks):
        take = chunk_len + (1 if i < remainder else 0)
        chunk_words = words[idx : idx + take]
        idx += take
        chunk_text = " ".join(chunk_words)
        
        chunk_dur = duration_sec * (len(chunk_text) / max(1, total_chars))
        cues.append({
            "text": chunk_text,
            "startSec": round(accum_sec, 3),
            "endSec": round(accum_sec + chunk_dur, 3),
            "startFrame": round(accum_sec * 30),
            "endFrame": round((accum_sec + chunk_dur) * 30)
        })
        accum_sec += chunk_dur
        
    return cues

async def save_with_retry(comm_factory, audio_path, meta_path, max_retries=5):
    for attempt in range(max_retries):
        try:
            comm = comm_factory()
            await comm.save(audio_path, meta_path)
            # Verify file size > 0
            if os.path.exists(audio_path) and os.path.getsize(audio_path) > 1000:
                return
        except Exception as e:
            print(f"    [Retry {attempt+1}/{max_retries}] Error: {e}, retrying in 2s...")
            await asyncio.sleep(2.0)
    # Final attempt
    comm = comm_factory()
    await comm.save(audio_path, meta_path)

async def generate_scene_audio(scene_data, scene_idx):
    scene_id = scene_data["id"]
    print(f"\n--- Processing {scene_id} ({scene_data['title']}) ---")
    
    final_output = os.path.join(AUDIO_DIR, f"{scene_id}_vo.mp3")
    
    paragraphs = scene_data["paragraphs"]
    concat_list_file = os.path.join(TEMP_DIR, f"{scene_id}_concat.txt")
    silence_file = os.path.join(TEMP_DIR, "silence_0_8.mp3")
    scene_fingerprint = hashlib.sha256(
        json.dumps(
            {"scene": scene_data, "voice": VOICE, "rate": VOICE_RATE},
            ensure_ascii=False,
            sort_keys=True,
        ).encode("utf-8")
    ).hexdigest()
    fingerprint_path = os.path.join(TEMP_DIR, f"{scene_id}.sha256")
    previous_fingerprint = ""
    if os.path.exists(fingerprint_path):
        with open(fingerprint_path, "r", encoding="utf-8") as f:
            previous_fingerprint = f.read().strip()
    force_scene_regeneration = scene_fingerprint != previous_fingerprint

    create_silence(0.8, silence_file)
    
    concat_lines = []
    scene_cues = []
    current_scene_sec = 0.0
    
    need_synthesis = force_scene_regeneration or not os.path.exists(final_output)
    
    for p_idx, p in enumerate(paragraphs):
        p_audio = os.path.join(TEMP_DIR, f"{scene_id}_p{p_idx}.mp3")
        p_meta = os.path.join(TEMP_DIR, f"{scene_id}_p{p_idx}.json")
        
        # Check if already generated
        if force_scene_regeneration or not (os.path.exists(p_audio) and os.path.getsize(p_audio) > 1000 and os.path.exists(p_meta) and os.path.getsize(p_meta) > 10):
            print(f"  Synthesizing paragraph {p_idx+1}/{len(paragraphs)}...")
            await save_with_retry(lambda: edge_tts.Communicate(p["ttsText"], VOICE, rate=VOICE_RATE), p_audio, p_meta)
            await asyncio.sleep(0.5)
            
        p_dur = get_audio_duration(p_audio)
        
        # Read metadata sentences
        boundaries = []
        if os.path.exists(p_meta):
            with open(p_meta, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        try:
                            item = json.loads(line)
                            if item.get("type") == "SentenceBoundary":
                                boundaries.append(item)
                        except Exception:
                            pass
        
        # Split displayText into sentences
        disp_text = p["displayText"]
        disp_sents = [x.strip() for x in re.split(r'(?<=[.?!…])\s+', disp_text) if x.strip()]
        
        if len(disp_sents) == len(boundaries):
            for s_idx, b in enumerate(boundaries):
                sent_offset = b["offset"] / 10_000_000.0 # sec
                sent_dur = b["duration"] / 10_000_000.0   # sec
                sent_text = disp_sents[s_idx]
                cues = split_sentence_into_cues(sent_text, current_scene_sec + sent_offset, sent_dur)
                scene_cues.extend(cues)
        else:
            cues = split_sentence_into_cues(disp_text, current_scene_sec, p_dur)
            scene_cues.extend(cues)
            
        concat_lines.append(f"file '{p_audio}'\n")
        current_scene_sec += p_dur
        
        if p_idx < len(paragraphs) - 1:
            concat_lines.append(f"file '{silence_file}'\n")
            current_scene_sec += 0.8
            
    # Write concat list
    with open(concat_list_file, "w", encoding="utf-8") as f:
        f.writelines(concat_lines)
        
    if need_synthesis:
        cmd_concat = [
            FFMPEG, "-y", "-f", "concat", "-safe", "0",
            "-i", concat_list_file,
            "-af", "loudnorm=I=-17:TP=-1.5:LRA=11",
            final_output
        ]
        subprocess.run(cmd_concat, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        with open(fingerprint_path, "w", encoding="utf-8") as f:
            f.write(scene_fingerprint)
    
    final_dur = get_audio_duration(final_output)
    total_frames = round(final_dur * 30) + 90 # 3 sec breathing tail
    
    print(f"-> Finished {scene_id}: Duration {final_dur:.2f}s ({total_frames} frames), {len(scene_cues)} caption cues")
    
    return {
        "id": scene_id,
        "title": scene_data["title"],
        "dateMarker": scene_data.get("dateMarker", {}),
        "audioFile": f"episodes/skinwalker/audio/{scene_id}_vo.mp3",
        "audioDurationSec": round(final_dur, 2),
        "durationInFrames": total_frames,
        "cues": scene_cues
    }

async def main():
    with open(SCRIPT_PATH, "r", encoding="utf-8") as f:
        scenes = json.load(f)
        
    all_manifest = []
    all_captions = {}
    
    for idx, scene in enumerate(scenes):
        res = await generate_scene_audio(scene, idx)
        all_manifest.append({
            "id": res["id"],
            "title": res["title"],
            "dateMarker": res["dateMarker"],
            "audioFile": res["audioFile"],
            "audioDurationSec": res["audioDurationSec"],
            "durationInFrames": res["durationInFrames"]
        })
        all_captions[res["id"]] = res["cues"]
        
    # Save manifest and captions
    with open(os.path.join(DATA_DIR, "audio_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(all_manifest, f, ensure_ascii=False, indent=2)
        
    with open(os.path.join(DATA_DIR, "captions.json"), "w", encoding="utf-8") as f:
        json.dump(all_captions, f, ensure_ascii=False, indent=2)
        
    total_sec = sum(s["audioDurationSec"] for s in all_manifest)
    total_frames = sum(s["durationInFrames"] for s in all_manifest)
    print(f"\n==========================================")
    print(f"ALL SCENES GENERATED SUCCESSFULLY!")
    print(f"Total Video Narration Duration: {total_sec:.2f}s ({total_sec/60:.2f} minutes)")
    print(f"Total Video Duration with Breathers: {total_frames/30:.2f}s ({total_frames/1800:.2f} minutes)")
    print(f"Total Frames @ 30fps: {total_frames}")
    print(f"==========================================")

if __name__ == "__main__":
    asyncio.run(main())
