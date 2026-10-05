import os, math, wave
import numpy as np

ROOT_DIR = "/home/anhnt/Documents/Remotion"
AMBIENCE_DIR = os.path.join(ROOT_DIR, "public/episodes/skinwalker/ambience")
SFX_DIR = os.path.join(ROOT_DIR, "public/episodes/skinwalker/sfx")

os.makedirs(AMBIENCE_DIR, exist_ok=True)
os.makedirs(SFX_DIR, exist_ok=True)

SAMPLE_RATE = 44100

def write_wav(filepath, data, sr=SAMPLE_RATE):
    data = np.clip(data, -1.0, 1.0)
    int_data = (data * 32767).astype(np.int16)
    with wave.open(filepath, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(int_data.tobytes())

def lowpass_noise(n_samples, cutoff_hz, sr=SAMPLE_RATE):
    noise = np.random.normal(0, 1.0, n_samples)
    spec = np.fft.rfft(noise)
    freqs = np.fft.rfftfreq(n_samples, d=1.0 / sr)
    # 2nd order lowpass response
    spec *= 1.0 / (1.0 + (freqs / max(1.0, cutoff_hz)) ** 2)
    return np.fft.irfft(spec, n=n_samples)

def bandpass_noise(n_samples, low_hz, high_hz, sr=SAMPLE_RATE):
    noise = np.random.normal(0, 1.0, n_samples)
    spec = np.fft.rfft(noise)
    freqs = np.fft.rfftfreq(n_samples, d=1.0 / sr)
    # Bandpass filter
    gain = (freqs >= low_hz) & (freqs <= high_hz)
    spec *= gain
    return np.fft.irfft(spec, n=n_samples)

# --- Chapter Soundscapes (Distinct Soundscapes) ---

def make_hook_ambience():
    duration = 90.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Deep sub-drone 42Hz + 84Hz
    drone = 0.35 * np.sin(2 * np.pi * 42 * t) + 0.15 * np.sin(2 * np.pi * 84 * t)
    sub_mod = 0.7 + 0.3 * np.sin(2 * np.pi * 0.08 * t)
    drone *= sub_mod
    
    # Cold winter wind (lowpass 180Hz)
    wind_raw = lowpass_noise(n, 180.0)
    wind_mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.12 * t) * np.sin(2 * np.pi * 0.05 * t)
    wind = wind_raw * wind_mod * 0.35
    
    # Eerie high whistle
    whistle = 0.03 * np.sin(2 * np.pi * (580 + 35 * np.sin(2 * np.pi * 0.15 * t)) * t) * (wind_mod ** 2)
    return drone + wind + whistle

def make_intro_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Desert night drone 55Hz
    drone = (0.28 * np.sin(2 * np.pi * 55 * t) + 0.12 * np.sin(2 * np.pi * 110 * t)) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.04 * t))
    # Desert breeze (lowpass 250Hz)
    breeze = lowpass_noise(n, 250.0) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t)) * 0.25
    return drone + breeze

def make_utah_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Deep pine forest sub-drone 48Hz
    drone = (0.32 * np.sin(2 * np.pi * 48 * t) + 0.1 * np.sin(2 * np.pi * 72 * t))
    # Blizzard wind gust (lowpass 300Hz)
    blizzard = lowpass_noise(n, 300.0) * (0.4 + 0.6 * (np.sin(2 * np.pi * 0.09 * t) ** 2)) * 0.38
    # Distant resonant moan
    moan = 0.035 * np.sin(2 * np.pi * (180 + 20 * np.sin(2 * np.pi * 0.06 * t)) * t)
    return drone + blizzard + moan

def make_mexican_water_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Dry desert stillness pulse (60Hz)
    sub = 0.25 * np.sin(2 * np.pi * 60 * t) * (0.85 + 0.15 * np.sin(2 * np.pi * 0.03 * t))
    # Tense faint high shimmer (1750Hz)
    shimmer = 0.02 * np.sin(2 * np.pi * 1750 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.2 * t))
    # Gravel dust gust
    dust = lowpass_noise(n, 160.0) * (0.4 + 0.6 * np.sin(2 * np.pi * 0.05 * t)) * 0.22
    return sub + shimmer + dust

def make_snowplow_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Diesel hum (65Hz + 130Hz)
    engine = 0.26 * np.sin(2 * np.pi * 65 * t) + 0.14 * np.sin(2 * np.pi * 130 * t)
    # Cabin vibration
    vibe = lowpass_noise(n, 90.0) * 0.15
    # Mountain ridge blizzard wind
    wind = lowpass_noise(n, 350.0) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.11 * t)) * 0.35
    return engine + vibe + wind

def make_millers_creek_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # Decrepit house draft & sub 45Hz
    sub = 0.28 * np.sin(2 * np.pi * 45 * t) + 0.1 * np.sin(2 * np.pi * 90 * t)
    draft = lowpass_noise(n, 220.0) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t)) * 0.28
    resonance = 0.03 * np.sin(2 * np.pi * (240 + 15 * np.sin(2 * np.pi * 0.04 * t)) * t)
    return sub + draft + resonance

def make_epilogue_ambience():
    duration = 120.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    # D minor contemplation pad (D=73.4Hz, F=87.3Hz, A=110Hz)
    chord = (0.22 * np.sin(2 * np.pi * 73.41 * t) + 
             0.14 * np.sin(2 * np.pi * 87.31 * t) + 
             0.12 * np.sin(2 * np.pi * 110.0 * t))
    swell = 0.7 + 0.3 * np.sin(2 * np.pi * 0.05 * t)
    breeze = lowpass_noise(n, 200.0) * 0.18
    return (chord * swell) + breeze

# --- Specific Narrative SFX ---

def make_title_impact():
    duration = 3.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    freq = 60 * np.exp(-t * 2.5) + 30
    sub = np.sin(2 * np.pi * freq * t) * np.exp(-t * 1.2) * 0.8
    transient = np.random.normal(0, 0.3, n) * np.exp(-t * 30.0)
    return sub + transient

def make_glass_tap():
    duration = 3.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    signal = np.zeros_like(t)
    tap_times = [0.2, 0.45, 1.4, 1.65]
    for tap_t in tap_times:
        idx = int(tap_t * SAMPLE_RATE)
        burst_len = int(SAMPLE_RATE * 0.05)
        tb = np.linspace(0, 0.05, burst_len, endpoint=False)
        ping = np.sin(2 * np.pi * 2800 * tb) * np.exp(-tb * 80.0) * 0.5
        click = np.random.normal(0, 0.3, burst_len) * np.exp(-tb * 200.0)
        signal[idx : idx + burst_len] += (ping + click)
    return signal

def make_dog_bark_far():
    duration = 3.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    signal = np.zeros_like(t)
    bark_times = [0.2, 0.8, 1.6]
    for bt in bark_times:
        idx = int(bt * SAMPLE_RATE)
        bark_len = int(SAMPLE_RATE * 0.35)
        tb = np.linspace(0, 0.35, bark_len, endpoint=False)
        freq = 380 * np.exp(-tb * 6.0) + 180
        tone = np.sin(2 * np.pi * freq * tb) * np.exp(-tb * 7.0) * 0.4
        growl = np.random.normal(0, 0.15, bark_len) * np.exp(-tb * 9.0)
        signal[idx : idx + bark_len] += (tone + growl)
    return lowpass_noise(n, 500.0) * 0.2 + signal * 0.5

def make_heavy_thump():
    duration = 2.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    freq = 80 * np.exp(-t * 6.0) + 35
    thud = np.sin(2 * np.pi * freq * t) * np.exp(-t * 4.0) * 0.85
    impact = np.random.normal(0, 0.25, n) * np.exp(-t * 25.0)
    return thud + impact

def make_wall_scratch():
    duration = 3.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    noise = np.random.normal(0, 0.2, n)
    mod = (np.sin(2 * np.pi * 3.5 * t) ** 4) * np.exp(-t * 0.6)
    scrape = noise * mod * 0.7
    wood_res = 0.2 * np.sin(2 * np.pi * 520 * t) * mod
    return scrape + wood_res

def make_sync_footsteps():
    duration = 4.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    signal = np.zeros_like(t)
    step_times = [0.4, 1.4, 2.4, 3.4]
    for st in step_times:
        idx = int(st * SAMPLE_RATE)
        step_len = int(SAMPLE_RATE * 0.28)
        tb = np.linspace(0, 0.28, step_len, endpoint=False)
        crunch = np.random.normal(0, 0.35, step_len) * np.exp(-tb * 12.0)
        low_step = np.sin(2 * np.pi * 65 * tb) * np.exp(-tb * 18.0) * 0.5
        signal[idx : idx + step_len] += (crunch + low_step)
    return signal

def make_radio_static():
    duration = 2.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    click = np.zeros_like(t)
    click[int(0.1 * SAMPLE_RATE) : int(0.12 * SAMPLE_RATE)] = 0.6
    body_idx_start = int(0.12 * SAMPLE_RATE)
    body_idx_end = int(1.8 * SAMPLE_RATE)
    noise = np.random.normal(0, 0.25, body_idx_end - body_idx_start)
    signal = np.zeros_like(t)
    signal[body_idx_start:body_idx_end] = noise
    click[int(1.8 * SAMPLE_RATE) : int(1.83 * SAMPLE_RATE)] = 0.5
    return signal + click

def make_snowplow_brakes():
    duration = 3.5
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    air = np.random.normal(0, 0.3, n) * np.exp(-t * 2.5) * 0.8
    screech = 0.15 * np.sin(2 * np.pi * 1450 * t) * np.exp(-t * 1.8) * (0.6 + 0.4 * np.sin(2 * np.pi * 25 * t))
    clunk = 0.4 * np.sin(2 * np.pi * 50 * t) * np.exp(-t * 4.0)
    return air + screech + clunk

def make_shoulder_tap():
    duration = 2.0
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    rustle = np.random.normal(0, 0.2, n) * np.exp(-t * 6.0)
    drop = 0.5 * np.sin(2 * np.pi * 40 * t) * np.exp(-t * 3.0)
    return rustle + drop

def main():
    print("Synthesizing dedicated chapter soundscapes with fast FFT...")
    soundscapes = {
        "hook_ambience.wav": make_hook_ambience(),
        "intro_ambience.wav": make_intro_ambience(),
        "utah_ambience.wav": make_utah_ambience(),
        "mexican_water_ambience.wav": make_mexican_water_ambience(),
        "snowplow_ambience.wav": make_snowplow_ambience(),
        "millers_creek_ambience.wav": make_millers_creek_ambience(),
        "epilogue_ambience.wav": make_epilogue_ambience(),
    }
    for fname, data in soundscapes.items():
        p = os.path.join(AMBIENCE_DIR, fname)
        write_wav(p, data)
        print(f"  -> Generated {fname}")
        
    print("\nSynthesizing specific narrative SFX...")
    sfxs = {
        "sfx_title_impact.wav": make_title_impact(),
        "sfx_glass_tap.wav": make_glass_tap(),
        "sfx_dog_bark_far.wav": make_dog_bark_far(),
        "sfx_heavy_thump.wav": make_heavy_thump(),
        "sfx_wall_scratch.wav": make_wall_scratch(),
        "sfx_sync_footsteps.wav": make_sync_footsteps(),
        "sfx_radio_static.wav": make_radio_static(),
        "sfx_snowplow_brakes.wav": make_snowplow_brakes(),
        "sfx_shoulder_tap.wav": make_shoulder_tap(),
    }
    for fname, data in sfxs.items():
        p = os.path.join(SFX_DIR, fname)
        write_wav(p, data)
        print(f"  -> Generated {fname}")
        
    print("\nAll audio design assets successfully synthesized!")

if __name__ == "__main__":
    main()
