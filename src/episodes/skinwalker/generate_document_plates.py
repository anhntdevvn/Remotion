import os, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT_DIR = "/home/anhnt/Documents/Remotion"
IMAGES_DIR = os.path.join(ROOT_DIR, "public/episodes/skinwalker/images")
os.makedirs(IMAGES_DIR, exist_ok=True)

FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"
FONT_MONO_BOLD = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"
FONT_SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_SANS_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

def add_film_grain_and_vignette(img, grain_strength=18, vignette_strength=0.7):
    w, h = img.size
    arr = np.array(img, dtype=np.float32)
    
    # Grain
    noise = np.random.normal(0, grain_strength, (h, w, 3))
    arr += noise
    
    # Vignette
    y, x = np.ogrid[:h, :w]
    cx, cy = w / 2.0, h / 2.0
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    vig = 1.0 - (dist / np.sqrt(2.0)) * vignette_strength
    vig = np.clip(vig, 0.2, 1.0)[:, :, np.newaxis]
    arr *= vig
    
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)

def create_four_corners_map():
    w, h = 1920, 1080
    # Dark topographical paper slate background
    img = Image.new("RGB", (w, h), (14, 18, 24))
    draw = ImageDraw.Draw(img)
    
    # Draw faint coordinate grid lines
    grid_color = (28, 36, 48)
    for x in range(100, w, 120):
        draw.line([(x, 60), (x, h - 60)], fill=grid_color, width=1)
    for y in range(60, h, 100):
        draw.line([(100, y), (w - 100, y)], fill=grid_color, width=1)
        
    # Draw Four Corners State Borders
    # Center intersection at (960, 540)
    cx, cy = 960, 540
    border_color = (65, 80, 105)
    dash_color = (120, 140, 170)
    
    # Vertical border (Utah/Arizona on left, Colorado/New Mexico on right)
    draw.line([(cx, 100), (cx, h - 100)], fill=dash_color, width=2)
    # Horizontal border (Utah/Colorado on top, Arizona/New Mexico on bottom)
    draw.line([(140, cy), (w - 140, cy)], fill=dash_color, width=2)
    
    # State Labels
    f_large = ImageFont.truetype(FONT_SANS_BOLD, 42)
    f_sub = ImageFont.truetype(FONT_SANS, 22)
    f_coord = ImageFont.truetype(FONT_MONO, 18)
    
    draw.text((cx - 380, cy - 260), "UTAH", fill=(95, 115, 145), font=f_large)
    draw.text((cx + 220, cy - 260), "COLORADO", fill=(95, 115, 145), font=f_large)
    draw.text((cx - 420, cy + 200), "ARIZONA", fill=(95, 115, 145), font=f_large)
    draw.text((cx + 180, cy + 200), "NEW MEXICO", fill=(95, 115, 145), font=f_large)
    
    # Diné Bikéyah Reservation Shaded Region
    res_box = [(cx - 500, cy - 80), (cx + 150, cy + 380)]
    draw.rectangle(res_box, outline=(180, 130, 70), width=2)
    draw.text((cx - 480, cy + 30), "DINÉ BIKÉYAH / NAVAJO NATION TERRITORY", fill=(210, 160, 90), font=f_sub)
    draw.text((cx - 480, cy + 60), "Established 1868 • 71,000 km² Semi-autonomous Sovereign Land", fill=(140, 110, 70), font=f_coord)
    
    # Incident Points with glowing rings
    points = [
        (cx - 360, cy - 170, 230, 280, "LỜI KỂ 1: NHÀ GỖ Ở UTAH (2010)", "Vị trí minh họa • Không phải tọa độ hiện trường"),
        (cx - 260, cy - 35, 1080, 395, "LỜI KỂ 3: ĐÈO MONTICELLO (2014)", "Khu vực tổng quát • Tuyến đường miền núi"),
        (cx - 230, cy + 205, 230, 790, "LỜI KỂ 2: MEXICAN WATER (1998)", "Khu vực tổng quát • Navajo Nation"),
        (cx + 170, cy + 165, 1210, 700, "LỜI KỂ 4: SUỐI MILLER (2015)", "Vị trí minh họa • Theo lời kể"),
    ]
    
    for px, py, label_x, label_y, label, subtext in points:
        # Amber marker
        draw.ellipse([(px - 8, py - 8), (px + 8, py + 8)], fill=(230, 90, 50))
        draw.ellipse([(px - 16, py - 16), (px + 16, py + 16)], outline=(210, 150, 70), width=2)
        # Callout line and box
        elbow_x = label_x - 12 if label_x > px else label_x + 330
        draw.line([(px, py), (elbow_x, label_y + 20), (label_x, label_y + 20)], fill=(180, 140, 80), width=1)
        draw.text((label_x, label_y), label, fill=(240, 220, 190), font=f_sub)
        draw.text((label_x, label_y + 34), subtext, fill=(160, 160, 170), font=f_coord)
        
    # Title Header
    f_title = ImageFont.truetype(FONT_SANS_BOLD, 36)
    draw.text((120, 80), "BẢN ĐỒ TÁI DỰNG // KHU VỰC FOUR CORNERS", fill=(210, 215, 225), font=f_title)
    draw.text((120, 130), "VỊ TRÍ CHỈ MANG TÍNH MINH HỌA • KHÔNG PHẢI HỒ SƠ ĐỊA LÝ CHÍNH THỨC", fill=(130, 140, 155), font=f_coord)
    
    # Legend in bottom right
    leg_x, leg_y = w - 480, h - 160
    draw.rectangle([(leg_x - 20, leg_y - 20), (w - 100, h - 60)], outline=(50, 65, 85), width=1)
    draw.text((leg_x, leg_y), "KÝ HIỆU BẢN ĐỒ", fill=(180, 190, 205), font=f_sub)
    draw.ellipse([(leg_x, leg_y + 36), (leg_x + 12, leg_y + 48)], fill=(230, 90, 50))
    draw.text((leg_x + 24, leg_y + 32), "Khu vực của lời kể", fill=(170, 175, 185), font=f_coord)
    draw.line([(leg_x, leg_y + 66), (leg_x + 16, leg_y + 66)], fill=(180, 130, 70), width=2)
    draw.text((leg_x + 24, leg_y + 58), "Diné Tribal Jurisdiction Boundary", fill=(170, 175, 185), font=f_coord)
    
    img = add_film_grain_and_vignette(img, grain_strength=14, vignette_strength=0.6)
    out_path = os.path.join(IMAGES_DIR, "ch1_map_fourcorners.jpg")
    img.save(out_path, quality=95)
    print("-> Generated ch1_map_fourcorners.jpg")

def create_police_incident_report():
    w, h = 1920, 1080
    # Dark desk wood / slate background
    img = Image.new("RGB", (w, h), (18, 16, 15))
    
    # Paper document in center (offset slightly for natural documentary look)
    doc_w, doc_h = 1050, 960
    doc_x, doc_y = 435, 60
    
    # Aged paper parchment base
    paper = Image.new("RGB", (doc_w, doc_h), (218, 208, 188))
    p_draw = ImageDraw.Draw(paper)
    
    f_head = ImageFont.truetype(FONT_MONO_BOLD, 22)
    f_sub = ImageFont.truetype(FONT_MONO_BOLD, 16)
    f_body = ImageFont.truetype(FONT_MONO, 15)
    f_stamp = ImageFont.truetype(FONT_SANS_BOLD, 20)
    
    # Header
    p_draw.text((60, 50), "TÁI DỰNG GHI CHÚ NHÂN CHỨNG", fill=(30, 30, 30), font=f_head)
    p_draw.text((60, 80), "MINH HỌA TỪ LỜI KỂ // KHÔNG PHẢI HỒ SƠ CẢNH SÁT", fill=(120, 30, 30), font=f_sub)
    p_draw.line([(60, 105), (doc_w - 60, 105)], fill=(40, 40, 40), width=2)
    
    p_draw.text((60, 120), "CHỦ ĐỀ:  MEXICAN WATER, 1998", fill=(40, 40, 40), font=f_sub)
    p_draw.text((580, 120), "LOẠI:  DRAMATIZED RECONSTRUCTION", fill=(40, 40, 40), font=f_sub)
    p_draw.text((60, 145), "NGƯỜI ĐƯỢC NHẮC TỚI:  EDWARD NEZ / GIA ĐÌNH YAZZIE", fill=(40, 40, 40), font=f_sub)
    p_draw.text((650, 145), "KẾT LUẬN: KHÔNG CÓ", fill=(40, 40, 40), font=f_sub)
    p_draw.line([(60, 170), (doc_w - 60, 170)], fill=(90, 90, 90), width=1)
    
    # Narrative Body
    lines = [
        "1. SUBJECT STATEMENT SUMMARY:",
        "Complainants Thomas and Evelyn Y. report repeated nighttime occurrences at",
        "isolated residence approximately 14 miles southwest of Mexican Water trading post.",
        "Phenomena consistently initiate between 01:00 and 03:30 hours.",
        "",
        "2. REPORTED PHENOMENOLOGY:",
        "- Rhythmic tapping reported on the exterior window glass.",
        "- Voices resembling Thomas and Evelyn's distant sister were reported outside.",
        "- Exterior footsteps appeared synchronized with Thomas's indoor movement.",
        "",
        "3. ACCOUNT ATTRIBUTED TO EDWARD NEZ:",
        "- Nez later observed Thomas walking indoors while apparently asleep.",
        "- No exterior figure was confirmed during that visit.",
        "- Reports became less frequent after colder weather arrived.",
        "",
        "4. CASE STATUS / DISPOSITION:",
        "- No independently verified physical evidence is presented in this film.",
        "- Disturbances reportedly subsided after the late-season cold.",
        "- Welfare inquiry ended without a formal conclusion.",
    ]
    
    y_pos = 195
    for l in lines:
        if l.startswith("1.") or l.startswith("2.") or l.startswith("3.") or l.startswith("4."):
            p_draw.text((60, y_pos), l, fill=(20, 20, 20), font=f_sub)
            y_pos += 26
        else:
            p_draw.text((60, y_pos), l, fill=(45, 45, 45), font=f_body)
            y_pos += 22
            
    # Red Official Stamp
    stamp_w, stamp_h = 420, 90
    stamp_img = Image.new("RGBA", (stamp_w, stamp_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(stamp_img)
    s_draw.rectangle([(5, 5), (stamp_w - 5, stamp_h - 5)], outline=(160, 30, 30, 210), width=4)
    s_draw.text((25, 18), "DRAMATIZED RECONSTRUCTION", fill=(160, 30, 30, 220), font=f_stamp)
    s_draw.text((45, 54), "NO FORMAL CONCLUSION REACHED", fill=(160, 30, 30, 200), font=f_sub)
    stamp_rot = stamp_img.rotate(8, expand=True, resample=Image.BICUBIC)
    
    paper.paste(stamp_rot, (doc_w - 520, doc_h - 220), stamp_rot)
    
    # Paste paper onto dark desk
    img.paste(paper, (doc_x, doc_y))
    img = add_film_grain_and_vignette(img, grain_strength=16, vignette_strength=0.7)
    
    out_path = os.path.join(IMAGES_DIR, "ch3_mexican_water_report.jpg")
    img.save(out_path, quality=95)
    print("-> Generated ch3_mexican_water_report.jpg")

def create_evidence_summary_board():
    w, h = 1920, 1080
    img = Image.new("RGB", (w, h), (12, 14, 18))
    draw = ImageDraw.Draw(img)
    
    # Title
    f_title = ImageFont.truetype(FONT_SANS_BOLD, 38)
    f_sub = ImageFont.truetype(FONT_SANS, 20)
    f_card = ImageFont.truetype(FONT_MONO_BOLD, 18)
    f_body = ImageFont.truetype(FONT_MONO, 14)
    
    draw.text((100, 70), "TỔNG HỢP BỐN LỜI KỂ", fill=(225, 230, 240), font=f_title)
    draw.text((100, 120), "TÁI DỰNG THEO NARRATION • KHÔNG PHẢI HỒ SƠ ĐIỀU TRA CHÍNH THỨC", fill=(140, 150, 170), font=f_sub)
    
    cards = [
        (100, 190, 390, 780, "01: NHÀ GỖ UTAH", "NĂM: 2010\n\nCHI TIẾT TRONG LỜI KỂ:\n• Tiếng sủa bắt chước chó nhà.\n• Tiếng va đập vào vách.\n• Gõ trên kính cửa sổ.\n• Giọng người thân từ bụi cây.\n• Vết chân dài trên tuyết.\n\nTRẠNG THÁI:\nKhông có xác minh độc lập được trình bày."),
        (520, 190, 390, 780, "02: MEXICAN WATER", "NĂM: 1998\n\nCHI TIẾT TRONG LỜI KỂ:\n• Gõ trên kính và gọi tên.\n• Bóng người ngoài sân.\n• Mộng du đồng bộ với bước chân.\n• Nez thấy Thomas mộng du.\n\nTRẠNG THÁI:\nKhép lại không kết luận chính thức."),
        (940, 190, 390, 780, "03: ĐÈO MONTICELLO", "NĂM: 2014\n\nCHI TIẾT TRONG LỜI KỂ:\n• Bộ đàm phát giọng người giám sát.\n• Bóng người trên đường.\n• Dấu chân có sải bước dài.\n• Phanh gấp trước khúc cua.\n\nTRẠNG THÁI:\nCa trực được kể lại; không có kết luận."),
        (1360, 190, 460, 780, "04: SUỐI MILLER", "NĂM: 2015\n\nCHI TIẾT TRONG LỜI KỂ:\n• Bé gái đi theo giọng anh trai.\n• Bóng trẻ em vào nhà hoang.\n• Bàn tay chạm vai Megan.\n• Hannah được tìm thấy bên suối.\n• Nhà bị phá do xuống cấp nhiều năm sau.\n\nTRẠNG THÁI:\nLời kể gia đình; không có kết luận."),
    ]
    
    for cx, cy, cw, ch_dim, c_title, c_text in cards:
        # Card background
        draw.rectangle([(cx, cy), (cx + cw, cy + ch_dim)], fill=(20, 25, 33), outline=(50, 65, 85), width=2)
        draw.rectangle([(cx, cy), (cx + cw, cy + 45)], fill=(32, 42, 58))
        draw.text((cx + 15, cy + 12), c_title, fill=(240, 220, 180), font=f_card)
        
        y_t = cy + 65
        for line in c_text.splitlines():
            if line.startswith("•") or line.startswith("EVIDENCE") or line.startswith("CORE"):
                draw.text((cx + 15, y_t), line, fill=(210, 190, 160), font=f_card)
            else:
                draw.text((cx + 15, y_t), line, fill=(160, 170, 185), font=f_body)
            y_t += 24
            
    img = add_film_grain_and_vignette(img, grain_strength=15, vignette_strength=0.6)
    out_path = os.path.join(IMAGES_DIR, "ch6_archival_summary.jpg")
    img.save(out_path, quality=95)
    print("-> Generated ch6_archival_summary.jpg")

if __name__ == "__main__":
    create_four_corners_map()
    create_police_incident_report()
    create_evidence_summary_board()
    print("All documentary graphic plates created successfully!")
