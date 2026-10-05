# Logo — 기묘한 기록실

Bộ nhận diện thiết kế riêng cho kênh: hồ sơ mở, giấy gấp góc và con dấu dấu hỏi đỏ. Giữ cùng hình với avatar đã Publish lên YouTube để nhận diện nhất quán.

## File chuẩn

- `archive-logo.svg`: bản vector gốc, nền trong suốt, không phụ thuộc font; nguồn duy nhất cho `ArchiveMark` trong `src/channel-branding/Branding.tsx`.
- `archive-logo.png`: PNG RGBA 1024 × 1024, nền trong suốt; dùng làm overlay trong video.
- `avatar.png`: avatar 1000 × 1000, nền navy với viền vàng, cùng bản đã Publish lên kênh.

Toàn bộ nằm trong `public/channel-branding/logo/`, không thuộc `out/` bị Git ignore. Lưu các file này cùng code trong Git; không dùng bản xuất dưới `out/` làm nguồn duy nhất.

## Màu nhận diện

| Màu | Hex |
| --- | --- |
| Navy | `#101C22` |
| Kem | `#F2E7CB` |
| Vàng | `#D1AE67` |
| Đỏ con dấu | `#BC443C` |

## Cách dùng

- Giữ nguyên tỷ lệ, không kéo méo hoặc thay đổi hình để phù hợp một episode.
- Logo dùng nét dày và hình đơn giản để giữ rõ khi thu nhỏ. Dùng avatar nền navy khi cần tương phản chắc chắn trên nền sáng.
- PNG lưu opacity gốc 100%. Khi chèn vào video, điều chỉnh opacity ở component; khởi điểm 0.65, kiểm tra trên cả nền sáng và tối trước khi chốt.
- SVG có khoảng thở quanh biểu tượng. Khi đặt kích thước overlay, tính phần biểu tượng thực tế, không chỉ kích thước canvas.
- Watermark đã gắn vào episode Action V3 và các preview cửa sổ/beat của V3. Các episode khác chỉ sử dụng khi được tích hợp riêng.

Component dùng lại: `src/channel-branding/ChannelWatermark.tsx`. Logo + tên kênh là lớp nền trong suốt độc lập ở vùng trên phải, nằm ngoài header. Opacity riêng: logo 0.60, tên 0.55. Props `top`/`right` cho phép tránh vùng nội dung quan trọng, `logoOpacity`/`nameOpacity` cho phép điều chỉnh có chủ ý. Chỉ mount một bản trên composition chính. Mọi episode mới của kênh phải tích hợp lớp này theo Master; không cần dùng cùng bố cục của V3.

## Xuất lại PNG

```bash
npx remotion still src/channel-branding/index.tsx Channel-Logo-Transparent public/channel-branding/logo/archive-logo.png --image-format=png --transparent
```

Nguồn là hình học SVG tự dựng trong project, không lấy artwork hoặc logo từ video reference. Đây là hồ sơ nguồn thiết kế; không phải chứng nhận đăng ký bản quyền hay nhãn hiệu.
