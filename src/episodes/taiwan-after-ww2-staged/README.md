# TaiwanAfterWW2-Staged — bản dựng độc lập

Bản thử ngôn ngữ hình mới cho episode Đài Loan. Code đã triển khai toàn bộ **7:58.6**, gồm **91 shot / 80 câu / 37 đoạn narration**. Trạng thái: localhost review; **chưa render MP4**.

## Hai phiên bản cùng tồn tại

- Bản giữ nguyên: `TaiwanAfterWW2`, thư mục `src/episodes/taiwan-after-ww2/`.
- Bản mới: `TaiwanAfterWW2-Staged`, thư mục này.
- Rig mới là một snapshot riêng, được mở rộng tại `components/StagePuppet.tsx`. Không import rig, scene hoặc timeline sống của bản cũ.
- Audio được sao chép sang `public/episodes/taiwan-after-ww2-staged/audio/`, không ghi đè thư mục audio cũ.
- Script Hàn / Việt và research đã chốt được giữ nguyên thành snapshot trong `planning/`.
- Root chỉ đăng ký thêm composition; ID bản cũ vẫn hoạt động.

## Preview

```bash
cd /home/anhnt/Documents/Remotion
npm run dev
```

- Toàn bộ: http://localhost:3000/TaiwanAfterWW2-Staged
- 49.7 giây đầu: http://localhost:3000/Taiwan-Staged-Opening
- Cairo: http://localhost:3000/Taiwan-Staged-Cairo
- Hội nghị và điều khoản: http://localhost:3000/Taiwan-Staged-Treaty

Folder `Staged-Shots` chứa 91 composition hình riêng để chỉnh từng shot; narration và caption được ghép tại timeline toàn video.

Ba đoạn ngắn là cửa sổ trên cùng timeline, có voice và caption; không phải video render khác. Khi localhost đã chạy thì mở URL trực tiếp.

## Render khi chủ kênh muốn xuất

```bash
npx remotion render src/index.ts TaiwanAfterWW2-Staged out/taiwan-after-ww2-staged/taiwan-after-ww2-staged-ko.mp4 --codec=h264 --crf=18 --concurrency=2
```

File đích nằm ở thư mục mới, không thay thế MP4 cũ. Concurrency 2 ưu tiên giảm RAM.

## Sửa tại đâu

| Thành phần | File |
|---|---|
| Timeline, audio và voice | `StagedVideo.tsx` |
| Shot theo câu thoại | `data/storyboard.json` |
| Bối cảnh, bàn, ghế, cờ | `components/World.tsx` |
| Rig, tay và điểm gắn đạo cụ | `components/StagePuppet.tsx` |
| Cast, di chuyển có điểm đầu/cuối | `components/Actor.tsx` |
| Cảnh đường phố, cảng, chiến tranh, dân sự | `scenes/StreetScenes.tsx` |
| Cairo, bàn giao, ký văn kiện, hội nghị | `scenes/DiplomacyScenes.tsx` |
| Bản đồ địa lý | `scenes/MapScene.tsx` |
| Cảnh văn kiện trên bàn | `scenes/DocumentScenes.tsx` |
| Các lựa chọn, kết luận | `scenes/DecisionScenes.tsx` |
| Hạm đội, minh họa chiến tranh Triều Tiên | `scenes/WarScenes.tsx` |

## Nguyên tắc và giới hạn

Học chức năng staging qua các mẫu reference đã xem: không gian có người, nhóm nhân vật lớn, đạo cụ nằm trong cảnh, cut sang map/document khi đúng ý. Không dựng lại từng frame hay dùng footage/artwork của reference. Phân tích reference trước đó là 16 frame mẫu, chưa phải shot audit liên tục toàn video; không gọi 91 shot này là bản sao timestamp của reference.

Mốc đầu/cuối câu lấy từ SentenceBoundary của voice thật. 11 cut bổ sung bên trong các câu dài dùng ước lượng theo mệnh đề, chưa có timestamp từng từ. Những điểm này cần nghe/xem trên localhost khi chủ kênh review. Cảnh giả định, quân đội minh họa, document tóm tắt và tranh luận đại diện được ghi rõ trong hình; không ngụ ý tái hiện chính xác một cuộc đối thoại hay chữ ký lịch sử.

Coastline sử dụng [Natural Earth](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/), dữ liệu [GeoJSON của Natural Earth](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson). Chỉ dùng hình đất liền/đảo phục vụ định vị; không khẳng định đường biên hiện nay là đường biên thời kỳ 1895–1951. Các điểm di chuyển và tuyến chiến lược là sơ đồ giải thích.

## Kiểm tra

```bash
npm run lint
python3 src/episodes/taiwan-after-ww2-staged/tools/check_episode.py
```

Kiểm tra hash đối chiếu các file bản cũ tại thời điểm tạo phiên bản mới; kiểm tra voice snapshot, coverage hình và mapping đủ 80 câu. Nó không thay thế QA bằng mắt, kiểm tra lịch sử hoặc nghe toàn bộ audio.
