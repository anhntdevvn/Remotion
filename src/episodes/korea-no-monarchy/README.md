# Korea — Why no restored monarchy?

Episode mới, độc lập với Taiwan V2/Staged/V3. Trạng thái cập nhật 04/10/2026: MP4 local đã có; đã upload và Save Private, video ID DQ_yrVIAIz0. Chưa thêm custom thumbnail hoặc công khai. Xem planning/UPLOAD_PACKAGE.md và upload-result.json.

- 11415 frames / 380.5s, 1920×1080, 30fps.
- 36 đoạn Korean + bản Việt; 12 scene grammar; caption theo voice thật.
- Nhạc không lời tự tạo, 5 arrangement theo chương; không sample/recording bên thứ ba, có source score và provenance. Nhạc giảm dưới voice, ngắt tại cú cắt ngai trống; ambience cũ giữ file nhưng không phát.
- Voice `ko-KR-HyunsuMultilingualNeural`, rate `+10%`, pitch `-4Hz`.
- Reference có 173s nội dung chính. Bản mới giữ đủ các chặng và bổ sung 1919/1948/Yi Gang, không dịch nguyên transcript.
- Nguyên nhân kể dưới dạng tổng hợp nhiều yếu tố. Không đồng nhất hồi hương với đăng quang.

[Preview](http://localhost:3000/Korea-No-Monarchy-KO) · [Kịch bản Hàn](planning/04a_korean_script.md) · [Bản Việt](planning/04b_vietnamese_review_script.md) · [Research](planning/03_verified_research.md) · [Storyboard](planning/05_scene_map.json) · [QA](planning/QA.md) · [Render](12_remotion_render/README.md).

Hook visual v2: `scenes/OpeningHook.tsx`, chính diện vua/quan hầu → match cut ngai trống ở frame 51 → góc chéo đặt câu hỏi ở frame 149. Voice và duration giữ nguyên.

Source: `KoreaVideo.tsx` timeline/audio/watermark; `scenes/` 12 grammar; `components/StagePuppet.tsx` episode-local rig; `components/Actor.tsx` cast; `components/Set.tsx` original locations; `data/timing.json` measured timing. `tools/write_script.py` là nguồn script để tái tạo, không sửa riêng JSON rồi chạy lại script generator.

Research screenshots/transcript phục vụ phân tích nguồn, không đi vào timeline. Natural Earth coastline public domain; mọi nhân vật, background và narration dùng tài sản riêng. Illustrations are conceptual, not exact historical portraits/uniform reconstructions.
