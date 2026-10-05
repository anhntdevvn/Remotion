"""Build the canonical long-form Vietnamese narration from the archived long cut."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
ARCHIVE = ROOT / "public/episodes/skinwalker/full_manifest.json"
OUTPUT = Path(__file__).with_name("master_script.json")


def tts_text(text: str) -> str:
    replacements = {
        "Utah": "U-ta", "Arizona": "A-ri-dô-na", "New Mexico": "Niu Mếch-xi-cô",
        "Colorado": "Cô-lô-ra-đô", "Diné": "Đi-nê", "Navajo": "Na-va-hô",
        "Hózhǫ́": "Hô-giô", "ánt'įįhnii": "an-tin-ni",
        "yee naaldlooshii": "yê na-đờ-lu-shi", "Mexican Water": "Mếch-xi-cân Oa-tơ",
        "Edward Nez": "Ét-uợt Nét", "Nez": "Nét", "Thomas": "Tó-mợt",
        "Evelyn": "E-vờ-lin", "Yazzie": "Yát-zi", "Monticello": "Mon-ti-xe-lô",
        "Blanding": "Bờ-len-đinh", "Jacob Thorne": "Giây-cợp Thon",
        "Thorne": "Thon", "Miller": "Mi-lờ", "Megan": "Me-gần",
        "Evan": "E-vần", "Hannah": "Ha-na",
    }
    for source, spoken in replacements.items():
        text = text.replace(source, spoken)
    return text


def scene(scene_id, title, marker, paragraphs):
    return {
        "id": scene_id,
        "title": title,
        "dateMarker": marker,
        "paragraphs": [
            {"displayText": p.strip(), "ttsText": tts_text(p.strip())}
            for p in paragraphs if p.strip()
        ],
    }


archive = {item["id"]: item for item in json.loads(ARCHIVE.read_text(encoding="utf-8"))}

hook = [
    "Trong một đêm tuyết rơi, một cậu bé chín tuổi nghe tiếng con chó của mình sủa từ ngoài bìa rừng. Điều bất thường là... con chó đang đứng ngay bên cạnh cậu.",
    "Nhiều năm sau, một tài xế xe cào tuyết nghe giọng cấp trên qua bộ đàm, cảnh báo về một chiếc xe gặp nạn phía trước. Sáng hôm sau, trạm điều hành xác nhận không hề có ai gọi cho ông.",
    "Ở một căn nhà hoang, một cô gái cảm thấy bàn tay đặt lên vai mình, rồi nhìn thấy một hình người đứng cuối hành lang. Cách đó hàng trăm cây số, một bé gái khác đi vào rừng vì nghe tiếng anh trai kêu cứu — trong khi người anh chưa từng rời khỏi nhà.",
    "Bốn lời kể. Bốn địa điểm cách biệt. Nhưng trong mỗi câu chuyện, thứ ẩn nấp ngoài bóng tối dường như đều biết chính xác giọng nói hoặc cử chỉ nào sẽ khiến con người bước ra khỏi vùng sáng.",
]

intro = archive["scene1_prologue"]["fullText"].split("\n\n")
utah = archive["scene2_utah_cabin"]["fullText"].split("\n\n")
mexican = archive["scene3_mexican_water"]["fullText"].split("\n\n")
snowplow = archive["scene4_snowplow_ridge"]["fullText"].split("\n\n")
millers = archive["scene5_millers_creek"]["fullText"].split("\n\n")
conclusion = archive["scene6_epilogue"]["fullText"].split("\n\n")

conclusion.insert(
    -1,
    "Khi xem lại bốn câu chuyện, cũng cần giữ một ranh giới quan trọng giữa trải nghiệm được kể lại và bằng chứng có thể kiểm tra độc lập. "
    "Phản ứng của một con chó, tiếng nói qua bộ đàm, dấu chân trên tuyết hay chuyển động nhìn thấy trong đêm đều có thể trở nên méo mó bởi thời tiết, khoảng cách và trí nhớ. "
    "Không hồ sơ nào trong số này tự nó chứng minh rằng cùng một thực thể đã xuất hiện ở cả bốn nơi. Sự tương đồng có thể đến từ cách con người ghi nhớ nỗi sợ, từ những mô-típ được truyền qua cộng đồng, hoặc từ một chuỗi trùng hợp mà chúng ta đang ghép lại sau sự kiện. "
    "Nhưng thái độ thận trọng ấy không khiến câu chuyện mất đi sức nặng. Trái lại, nó buộc chúng ta chú ý tới điều có thể xác nhận chắc chắn nhất: trong từng lời kể, người chứng kiến tin rằng họ đã nghe đúng giọng của một người thân quen, và chính sự quen thuộc ấy đã khiến nguy hiểm tiến lại gần hơn bất kỳ tiếng gầm rú nào.",
)

# Editorial corrections retained from the reviewed cut.
mexican[-1] = (
    "Bà Evelyn đứng chết lặng trong góc phòng, nhìn hai bóng hình đồng bộ ấy trong nhiều phút trước khi can đảm bước tới lay chồng dậy. "
    "Sau đêm đó, bà kể lại toàn bộ sự việc cho con gái và cho Edward Nez. Trong một lần quay lại căn nhà để kiểm tra, chính Nez cũng nhìn thấy ông Thomas rời giường trong trạng thái mộng du, bước chậm qua hành lang với đầu nghiêng sang một bên. "
    "Ông không nhìn thấy bóng người ngoài sân, nhưng lời quan sát trực tiếp ấy khiến câu chuyện của Evelyn khó bị gạt bỏ như một giấc mơ đơn lẻ. Khi đợt lạnh cuối năm tràn tới, những tiếng gõ, tiếng gọi và bước chân ngoài sân thưa dần rồi im bặt. "
    "Hồ sơ kiểm tra phúc lợi được khép lại mà không có kết luận chính thức; điều còn lại chỉ là lời kể của gia đình và câu hỏi vì sao hiện tượng chấm dứt đúng lúc thời tiết thay đổi."
)
millers[-1] = (
    "Thế nhưng, Evan suốt cả buổi chiều và đêm hôm đó chưa từng rời khỏi tầm mắt của cha mẹ, rồi luôn đi sát bên những người lớn trong đội tìm kiếm. Không ai trong gia đình tìm được lời giải thích cho giọng nói mà Hannah đã nghe. "
    "Căn nhà nông trại vẫn đứng bên bờ suối thêm vài năm trước khi bị phá bỏ do xuống cấp. Megan và Hannah về sau hiếm khi nhắc lại đêm ấy. Nếu lời kể của họ chính xác, điểm đáng sợ nhất không nằm ở hình dáng bóng người, mà ở việc một thứ trong rừng đã chọn đúng giọng nói có thể khiến một đứa trẻ tin tưởng và đi theo."
)

script = [
    scene("scene0_hook", "Cold Open: Những Kẻ Bắt Chước", {"date": "MÙA ĐÔNG TÂY NAM", "location": "Biên Giới Của Sự Im Lặng"}, hook),
    scene("scene1_intro", archive["scene1_prologue"]["title"], archive["scene1_prologue"]["dateMarker"], intro),
    scene("scene2_utah", archive["scene2_utah_cabin"]["title"], archive["scene2_utah_cabin"]["dateMarker"], utah),
    scene("scene3_mexican_water", archive["scene3_mexican_water"]["title"], archive["scene3_mexican_water"]["dateMarker"], mexican),
    scene("scene4_snowplow", archive["scene4_snowplow_ridge"]["title"], archive["scene4_snowplow_ridge"]["dateMarker"], snowplow),
    scene("scene5_millers_creek", archive["scene5_millers_creek"]["title"], archive["scene5_millers_creek"]["dateMarker"], millers),
    scene("scene6_conclusion", archive["scene6_epilogue"]["title"], archive["scene6_epilogue"]["dateMarker"], conclusion),
]

OUTPUT.write_text(json.dumps(script, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
word_count = sum(len(p["displayText"].split()) for s in script for p in s["paragraphs"])
print(f"Wrote {OUTPUT} with {word_count} words across {len(script)} scenes")
