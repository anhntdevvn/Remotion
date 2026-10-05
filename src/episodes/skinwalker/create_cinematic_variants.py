import os
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT_DIR = "/home/anhnt/Documents/Remotion"
IMG_DIR = os.path.join(ROOT_DIR, "public/episodes/skinwalker/images")

def add_vignette(img, strength=0.6):
    w, h = img.size
    arr = np.array(img, dtype=np.float32)
    y, x = np.ogrid[:h, :w]
    cx, cy = w / 2.0, h / 2.0
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    vig = 1.0 - (dist / np.sqrt(2.0)) * strength
    vig = np.clip(vig, 0.2, 1.0)[:, :, np.newaxis]
    arr *= vig
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def make_variants():
    # 1. hook_radio_closeup from scene4_snowplow
    p_plow = os.path.join(IMG_DIR, "scene4_snowplow.jpg")
    if os.path.exists(p_plow):
        im = Image.open(p_plow)
        w, h = im.size
        # Crop to dashboard / radio area
        crop_box = (int(w * 0.15), int(h * 0.25), int(w * 0.85), int(h * 0.95))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        cropped = ImageEnhance.Contrast(cropped).enhance(1.25)
        cropped = add_vignette(cropped, 0.7)
        cropped.save(os.path.join(IMG_DIR, "hook_radio_closeup.jpg"), quality=95)
        print("-> Created hook_radio_closeup.jpg")

    # 2. hook_footprints_creek from scene6_snow_footprints
    p_fp = os.path.join(IMG_DIR, "scene6_snow_footprints.jpg")
    if os.path.exists(p_fp):
        im = Image.open(p_fp)
        w, h = im.size
        crop_box = (0, int(h * 0.2), w, int(h * 0.9))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        # Deepen blue twilight shadows
        enh = ImageEnhance.Color(cropped).enhance(0.7)
        enh = ImageEnhance.Contrast(enh).enhance(1.3)
        enh = add_vignette(enh, 0.65)
        enh.save(os.path.join(IMG_DIR, "hook_footprints_creek.jpg"), quality=95)
        print("-> Created hook_footprints_creek.jpg")

    # 3. ch2_cabin_detail from cabin_winter.jpg
    p_cab = os.path.join(IMG_DIR, "cabin_winter.jpg")
    if os.path.exists(p_cab):
        im = Image.open(p_cab)
        w, h = im.size
        crop_box = (int(w * 0.2), int(h * 0.15), int(w * 0.8), int(h * 0.85))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        cropped = ImageEnhance.Contrast(cropped).enhance(1.2)
        cropped = add_vignette(cropped, 0.6)
        cropped.save(os.path.join(IMG_DIR, "ch2_cabin_detail.jpg"), quality=95)
        print("-> Created ch2_cabin_detail.jpg")

    # 4. ch2_frost_night from scene3_window.jpg
    p_win = os.path.join(IMG_DIR, "scene3_window.jpg")
    if os.path.exists(p_win):
        im = Image.open(p_win)
        w, h = im.size
        crop_box = (int(w * 0.1), int(h * 0.1), int(w * 0.9), int(h * 0.9))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        # Cold cyan/blue tone
        arr = np.array(cropped, dtype=np.float32)
        arr[:, :, 0] *= 0.85 # reduce red
        arr[:, :, 2] *= 1.15 # boost blue
        tinted = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
        tinted = add_vignette(tinted, 0.75)
        tinted.save(os.path.join(IMG_DIR, "ch2_frost_night.jpg"), quality=95)
        print("-> Created ch2_frost_night.jpg")

    # 5. ch3_yard_silhouette from scene3_window.jpg
    if os.path.exists(p_win):
        im = Image.open(p_win)
        w, h = im.size
        # Zoom past window frame directly into gravel yard
        crop_box = (int(w * 0.35), int(h * 0.25), int(w * 0.65), int(h * 0.75))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        cropped = ImageEnhance.Contrast(cropped).enhance(1.35)
        cropped = add_vignette(cropped, 0.8)
        cropped.save(os.path.join(IMG_DIR, "ch3_yard_silhouette.jpg"), quality=95)
        print("-> Created ch3_yard_silhouette.jpg")

    # 6. ch4_road_close from scene4_road_figure.jpg
    p_road = os.path.join(IMG_DIR, "scene4_road_figure.jpg")
    if os.path.exists(p_road):
        im = Image.open(p_road)
        w, h = im.size
        crop_box = (int(w * 0.25), int(h * 0.2), int(w * 0.75), int(h * 0.8))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        cropped = ImageEnhance.Contrast(cropped).enhance(1.3)
        cropped = add_vignette(cropped, 0.75)
        cropped.save(os.path.join(IMG_DIR, "ch4_road_close.jpg"), quality=95)
        print("-> Created ch4_road_close.jpg")

    # 7. ch5_creek_frozen from scene5_farmhouse_exterior.jpg
    p_farm = os.path.join(IMG_DIR, "scene5_farmhouse_exterior.jpg")
    if os.path.exists(p_farm):
        im = Image.open(p_farm)
        w, h = im.size
        crop_box = (int(w * 0.1), int(h * 0.35), int(w * 0.9), int(h * 0.95))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        cropped = ImageEnhance.Contrast(cropped).enhance(1.2)
        cropped = add_vignette(cropped, 0.7)
        cropped.save(os.path.join(IMG_DIR, "ch5_creek_frozen.jpg"), quality=95)
        print("-> Created ch5_creek_frozen.jpg")

    # 8. ch6_dusk_fade from scene1_desert.jpg
    p_des = os.path.join(IMG_DIR, "scene1_desert.jpg")
    if os.path.exists(p_des):
        im = Image.open(p_des)
        w, h = im.size
        crop_box = (0, int(h * 0.1), w, int(h * 0.85))
        cropped = im.crop(crop_box).resize((1920, 1080), Image.BICUBIC)
        arr = np.array(cropped, dtype=np.float32)
        # Deep twilight indigo shift
        arr[:, :, 0] *= 0.8
        arr[:, :, 2] *= 1.2
        tinted = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
        tinted = ImageEnhance.Contrast(tinted).enhance(1.15)
        tinted = add_vignette(tinted, 0.8)
        tinted.save(os.path.join(IMG_DIR, "ch6_dusk_fade.jpg"), quality=95)
        print("-> Created ch6_dusk_fade.jpg")

if __name__ == "__main__":
    make_variants()
    print("All cinematic variants prepared!")
