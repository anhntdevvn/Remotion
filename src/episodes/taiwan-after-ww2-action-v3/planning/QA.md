# Action V3 — QA trong localhost

Ngày kiểm tra: 02/10/2026. Không render MP4 hoặc still bằng Remotion.

## Bổ sung watermark — 2026-10-02

- ESLint phần code liên quan và TypeScript toàn project qua; continuity/voice/preserved-version check qua (37 clip voice, 99 file bảo toàn).
- Chrome localhost: thấy logo ở opening frame 0 và các cảnh S09/S11 nền be; header không trùng logo, caption vẫn nguyên.
- DOM xác nhận một watermark trên composition đầy đủ, opacity 0.65, SVG tải thành công. Preview đang để frame 7032 để người dùng kiểm tra.
- Bằng chứng: `out/channel-branding/action-v3-watermark-preview.png` và `action-v3-watermark-opening.png`.
- Chưa render lại MP4 sau gắn logo. Kiểm tra hình ở các mốc này không phải review lại toàn bộ episode.

## Đã kiểm tra

Update watermark độc lập: ở frame 13980, logo/tên nằm ngoài header, nền transparent; DOM xác nhận logo opacity 0.60, tên 0.55, đúng một bản và ảnh tải xong. ESLint/TypeScript và check_action_v3 qua sau sửa vị trí; voice/timeline/các bản trước được giữ. Screenshot: `out/channel-branding/action-v3-independent-watermark-ending.png`. Closing-hook review trong `ENDING_REVIEW.md`, chưa thay audio hay render lại MP4.

- `npm run lint`: ESLint và TypeScript đều qua.
- Continuity: 810–14358 liên tục, 84 nhịp hình, đủ 74 câu sau opening; cả timeline có 80 câu.
- 37 clip voice có text, thời điểm, thời lượng và SHA256 giống bản V2; caption hiển thị đủ nguyên văn narration.
- 99 file thuộc V2/Staged và các MP4 đã lưu có SHA256 không đổi.
- Studio: seek 84 nhịp, không có error overlay. Kiểm tra trực quan các nhóm họp/ký/trao hồ sơ/quầy/xe hàng/đội hình/bản đồ/hạm đội/phương án/lá phiếu/văn kiện/timeline/ghế trống/kết.
- Sau sửa lớp SVG/rig/đạo cụ: kiểm tra thêm 16 frame tại các tương tác, không có error overlay.
- Playback cửa sổ Cairo–handover: chạy từ frame 85 đến 2089, audio unmuted, không có error overlay. Đây là kiểm tra playback, không phải đánh giá phát âm native hoặc loudness của MP4.
- Sửa thứ tự lớp SVG bản đồ/hạm đội; phối hợp cổ tay–bút, chữ ký và mặt giấy; hand pass trước mặt bàn; phiếu và tay đi cùng nhau; tay chỉ hồ sơ không che tên hai chính phủ.

## Giới hạn cần review bằng tai và mắt

- 8 câu dài được chia theo tỷ lệ nội câu vì metadata TTS chỉ có SentenceBoundary. Điểm cắt nội câu chưa được xác nhận ở cấp từ. Các nhịp đó được liệt kê dưới đây để nghe lại; voice không bị cắt/chỉnh.
- Không tự chấm điểm production-ready hoặc khẳng định tăng retention khi chưa có số liệu người xem.
- Mô hình cảnh quân sự, bàn tiếp nhận, cuộc họp và các văn kiện là minh họa, không phải footage/chữ ký thực. Bản đồ dùng đường bờ Natural Earth để giải thích địa lý, không khẳng định biên giới lịch sử.
- Chưa chạy export nên chưa kiểm tra hình/âm thanh sau mã hóa hoặc YouTube nén.

## Các câu có cắt nội câu

- KO-004.2: 53.43s formation/1895 → 59.10s signing/shimonoseki
- KO-006.1: 72.60s industry/rail-port → 76.57s queue/coercion
- KO-013.2: 174.57s map/admin → 177.70s document/pending
- KO-020.2: 260.63s map/retreat → 265.77s industry/roc-arrives
- KO-022.2: 285.43s choices/statusquo → 288.17s choices/international → 290.90s choices/military
- KO-023.2: 296.37s ballot/risks → 300.20s choices/military-risk
- KO-029.3: 377.33s rebuild/priorities → 381.90s document/priorities
- KO-035.2: 447.83s formation/defeat → 451.27s signing/accept → 454.67s document/renounce
