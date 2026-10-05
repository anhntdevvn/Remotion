# Taiwan Action V3 — hành động phục vụ nội dung

V3 là bản độc lập để review, phát triển hướng hồ sơ lịch sử của Action v2. Bản V2, Staged và các MP4 cũ được giữ nguyên. Không sửa thư viện Remotion.

## Preview

Studio: http://localhost:3000/TaiwanAfterWW2-ActionV3

Nếu Studio chưa chạy, tại thư mục `/home/anhnt/Documents/Remotion`:

```bash
npm run dev
```

Các composition để review nhanh:

- `Taiwan-ActionV3-First-Minute`: 00:27–01:41, văn kiện, lịch sử thuộc địa và xe hàng.
- `Taiwan-ActionV3-Cairo-Handover`: 01:41–03:01, bàn họp, ký, chuyển hồ sơ và quầy nhận.
- `Taiwan-ActionV3-Cold-War`: 04:42–06:10, phương án chính sách, bán đảo Triều Tiên, hạm đội.
- `Taiwan-ActionV3-B…`: từng nhịp hình riêng, để chỉnh rig/bố cục; các composition này chỉ có hình.

## Thay đổi

Giữ opening 27 giây, 37 clip voice và thời lượng 478,6 giây. Phần sau opening có 84 nhịp hình theo câu thoại và 21 dạng dàn cảnh. Số này là nhịp dựng/layout, không phải 84 bối cảnh hoàn toàn khác nhau.

- Hành động có điểm đến: trao–nhận hồ sơ; đến quầy, đưa giấy, xử lý; bút và cổ tay cùng di chuyển trên giấy; người kéo xe đi cùng tay nắm.
- Quân sự: đội hình tiến/rút, hai lực lượng nội chiến, dân rời cảnh đàn áp; hình mang tính minh họa, không tái hiện một trận đánh có tọa độ cụ thể.
- Đổi grammar: họp ba người, quầy hành chính, ký có người chứng kiến, cảng/công trường, đội hình, bản đồ toàn màn, hạm đội, insert văn kiện, bàn phương án, ghế trống và đóng hồ sơ.
- 14 micro-hook bằng tiếng Hàn, có bản Việt ở `planning/micro_hooks.json`; lấy câu hỏi/bước ngoặt từ voice hiện có, không thêm lời thoại mới.
- Chữ chương thu gọn thành thanh trên; bỏ cách đặt graphic giữa và nhân vật hai mép ở mọi scene. Vẫn có cảnh đứng nói và cảnh thông tin tĩnh khi phù hợp.
- Bàn che đúng thân nhân vật; tay/bút được vẽ ở lớp trước. Âm giấy gắn lúc tiếp xúc, nhạc nền phần sau opening hạ xuống 0,10. Camera chủ yếu cố định; không zoom toàn cảnh lặp liên tục.

## Code và kiểm tra

### Logo kênh — 2026-10-02

Đã thêm logo hồ sơ + tên `기묘한 기록실` từ đầu đến cuối composition. Theo update tiếp theo, watermark nằm ngoài header, ở vùng trên phải (top 112/right 58 trong khung 1080p), nền trong suốt, opacity riêng 60% cho logo và 55% cho tên. Component dùng chung: `src/channel-branding/ChannelWatermark.tsx`; asset chuẩn trong `public/channel-branding/logo/` được Git theo dõi. Single-beat preview có cùng watermark, full/window preview chỉ mount một bản. Không sửa voice, script hoặc thời lượng. MP4 đã xuất trước thay đổi này không tự cập nhật; cần render lại sau khi người dùng duyệt.

Review đoạn kết và đề xuất CTA: `planning/ENDING_REVIEW.md`. Narration đã có câu hỏi mở, chưa thêm lời dẫn sang một video tiếp theo hoặc thay voice.

- `data/beats.json`: sentence/voice ID, frame, grammar, hành động, mục tiêu và micro-hook.
- `components/StagePuppet.tsx`: rig V3 độc lập; `Actor.tsx`: cast và đường di chuyển.
- `scenes/`: hành động, không gian và các layout.
- `planning/04b_vietnamese_review_script.md`: nội dung Việt song song; script/voice không đổi.
- `tools/build_beats.py`: tái tạo bảng dựng. 8 câu dài được tách thêm bằng tỷ lệ ước lượng; chưa có word alignment nên cần nghe lại các điểm cắt nội câu trong localhost.
- `tools/check_action_v3.py`: kiểm tra không có khoảng trống/chồng nhịp, đủ câu, voice đúng bản cũ, hash các phiên bản được giữ.
- `planning/QA.md`: phạm vi QA và giới hạn kiểm chứng.

## Lệnh render — người dùng tự chạy sau khi review

```bash
cd /home/anhnt/Documents/Remotion
npx remotion render src/index.ts TaiwanAfterWW2-ActionV3 out/taiwan-after-ww2-action-v3/taiwan-after-ww2-ko-action-v3-watermarked.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

Lệnh dùng tên output riêng cho bản có logo, giữ MP4 V3 đã xuất trước đó. Chưa chạy render bản có logo.

Địa lý dùng Natural Earth, đường bờ hiện đại dùng để giải thích vị trí, không biểu thị biên giới lịch sử. Các bản văn kiện trên hình là tóm tắt dựng lại, có ghi chú trên hình.
