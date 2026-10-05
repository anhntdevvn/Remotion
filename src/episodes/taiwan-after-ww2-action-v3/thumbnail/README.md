# Thumbnail tiếng Hàn — 02/10/2026

Final: `public/channel-branding/thumbnails/taiwan-after-ww2-ko-v2.jpg`.
Delivery copy: `out/taiwan-after-ww2-action-v3/thumbnail-ko-v2.jpg`.
1920×1080, JPEG, khoảng 260 KB, 16:9. V1 giữ ở out để đối chiếu; dùng V2 có đường bờ rõ hơn.

## Nội dung Hàn–Việt

- `대만을 / 왜 못 지켰나?`: Đài Loan / Vì sao không giữ được?
- `50년의 지배`: 50 năm cai trị.
- `평화조약`: Hiệp ước hòa bình.
- `권리 포기`: Từ bỏ quyền.

Headline đi cùng title `일본은 왜 대만을 지킬 수 없었을까?`; câu hỏi nói về Nhật không giữ được Đài Loan, không kết luận chủ quyền hiện tại thuộc ai. Văn kiện/con dấu là minh họa tóm tắt, không phải ảnh hiệp ước hoặc con dấu thật. Nhân vật Nhật là đại diện hư cấu dùng rig trong video, không phải chân dung một cá nhân lịch sử.

## Nguồn và triển khai

Dựng trực tiếp bằng Remotion/React/SVG, tái dùng Actor/StagePuppet V3 và logo chuẩn của kênh; không gọi image_gen và không sao chép thumbnail reference. Entry standalone không thay video, audio, metadata Studio hoặc trạng thái Private.

Đảo chính dùng Natural Earth 1:50m, 61 điểm, phép chiếu equirectangular cục bộ với cos(latitude) để giữ tỷ lệ. Source/projection lưu trong `taiwan-outline.json`. Nguồn dữ liệu: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson ; public domain theo https://www.naturalearthdata.com/about/terms-of-use/ . Không mô tả đường biên chính trị; không đưa các đảo xa bờ vào icon đảo chính.

Đã kiểm tra ESLint, TypeScript và xem ảnh xuất V2: chữ Hàn đúng, không bị cắt, tay liên tục, logo hiện, đảo không bị méo theo map coarse của episode. Chưa có dữ liệu CTR/A-B test. Thumbnail chưa upload vào Studio; người dùng yêu cầu tạo để tự public.

## Xuất lại

```bash
cd /home/anhnt/Documents/Remotion
npx remotion still src/episodes/taiwan-after-ww2-action-v3/thumbnail/index.tsx Taiwan-Thumbnail-KO out/taiwan-after-ww2-action-v3/thumbnail-ko-v2.jpg --image-format=jpeg --jpeg-quality=95
```

Không cần render lại MP4 để thay thumbnail.
