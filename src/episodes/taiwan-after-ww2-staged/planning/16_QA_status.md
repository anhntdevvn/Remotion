# QA — 2026-10-01

Trạng thái: code hoàn tất cho localhost review; chưa render.

## Đã xác nhận

- `npm run lint`: ESLint và TypeScript qua.
- Coverage liên tục 0–14358 frame, 91 shot, đủ 80 sentence ID.
- 37 voice snapshot có hash giống voice cũ; không viết lại nội dung.
- 67 file trong episode cũ có hash giữ nguyên.
- MP4 cũ `taiwan-after-ww2-ko-action-v2.mp4` giữ hash `ab45a992f8d0ff3e1f5da792615c1e7c39f8ff209cdab94c5ed2ee872ea33895`.
- Remotion Studio: seek tới frame giữa từng shot, 91 lần kiểm tra error overlay, không có lỗi runtime.
- Kiểm tra bằng mắt các mẫu mở đầu, handover, Cairo, bản đồ, cảng, signing và document cuối.
- Sửa theo kiểm tra visual: tay–rifle grip, folder đi cùng actor tiến tới điểm trao, tên trên mặt bàn, tay/bút ở lớp foreground của signing, lưng áo riêng, hướng mũi tên nhượng quyền.
- Playback cửa sổ Cairo đã tiến từ frame 0 tới 270; không thấy warning/error console. Đây là kiểm tra chạy được, không phải đánh giá âm thanh bằng tai.

## Chưa xác nhận

- Chưa xem/nghe liên tục cả 7:58.6; không chấm điểm production-ready.
- Chưa kiểm tra bằng mắt từng frame và từng pose kết hợp.
- 11 cut bổ sung trong câu dài vẫn dùng vị trí ước lượng theo mệnh đề; cần nghe để tinh chỉnh nếu lệch.
- Chưa xuất MP4 nên chưa đánh giá encode, chất lượng output hoặc loudness của bản xuất.

Review nên bắt đầu ở `Taiwan-Staged-Opening`; sau đó xem toàn `TaiwanAfterWW2-Staged` trước khi dùng lệnh render.
