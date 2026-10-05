# QA — Korea No Monarchy, 02/10/2026

## Trạng thái

Cập nhật 04/10/2026: MP4 local đã có và upload Private theo yêu cầu; thumbnail custom chưa thêm. Các mục ngày 02/10 bên dưới là kiểm tra trước export, không là full QA bản mã hóa. Không có đánh giá retention thực hoặc chứng nhận 9/10.

## Kiểm tra kỹ thuật đã chạy

- `npx eslint src/episodes/korea-no-monarchy src/Root.tsx`: pass.
- `npx tsc --noEmit`: pass.
- `python3 src/episodes/korea-no-monarchy/tools/check_episode.py`: pass; 36 clip / 70 caption / 11415 frame / 380.5 giây.
- Audio decode PCM và ffprobe từng clip: pass; peak từ -5,77 đến -3,50 dBFS, RMS -18,71 đến -17,95 dBFS. Không phát hiện sample clipping. Chưa đo loudness của MP4/mix xuất cuối.
- Content caption khớp script, câu nằm trong thời lượng voice, timeline visual liên tục. Khoảng thở 8 frame/đoạn, kết 28 frame.
- Hook voice chốt câu hỏi ở 8,5 giây.
- Hash 224 file Taiwan/branding: không đổi. Root chỉ đăng ký thêm episode, dependency @remotion/media 4.0.529 được khai báo trực tiếp.
- Source/code/audio mới không bị git ignore. Không commit tự động.

## Preview thực tế

URL: http://localhost:3000/Korea-No-Monarchy-KO . Runtime midpoint đủ K01–K36 trả về không có error overlay; 12 screenshot scene trọng điểm đã xem. Log ở `studio-review.json`. Playback main đã chạy unmuted từ frame 0 đến khoảng frame 2627, không có console error ở thời điểm kiểm tra. Điều đó xác nhận playback, không chứng minh đã nghe đánh giá native toàn bộ video.

Đã sửa qua review: chữ không che mặt vua ở cảnh thoái vị/cổng; dòng chú thích không đè đầu đại biểu; nhãn quốc gia ở trên người; mũ Mỹ/Liên Xô có biểu trưng riêng; Yi Bangja dùng hanbok/búi tóc riêng; hồ sơ hôn nhân mở ở câu thứ hai; chuyển quyền trên ngai, câu hỏi quyền lực mới và kết quả lá phiếu chốt theo SentenceBoundary.

Hành động bỏ phiếu K26 kiểm tra local frame 146/186/210/259: đầu → giữa → chạm khe → kết quả. Phiếu đi cùng progress/cổ tay của đại biểu, sau đó rơi vào khe; kết quả sau khi vật biến mất trong thùng. Cổng K11 có foreground che phần thân ở giai đoạn đầu theo blocking, không mất rig. Hồi hương dùng người bệnh ngồi xe, không diễn đăng quang.

## Phạm vi còn cần review

- Người dùng xem toàn bộ để duyệt giọng/phát âm tên riêng, mức nhạc, nội dung Việt và nhịp kể. Chưa có native Korean human review.
- Reference audit dùng transcript và 26 sampled frames, không phải full real-time shot/audio review. Không gọi bản mới là frame-by-frame clone.
- Bản mới 380.5s dài hơn ~173s nội dung chính nguồn do bổ sung tư liệu 1919/1948/Yi Gang; cần duyệt nhịp chậm hơn nguồn. Không cắt thiếu nội dung chính để dựng cho dễ.
- Một số reveal trong cùng câu (như ba nhóm nguyên nhân cuối) dùng mốc chia theo nhịp; SentenceBoundary không xác nhận từng từ. Không tuyên bố sync từng từ.
- Cảnh hội nghị/cửa/cung điện là conceptual reconstruction đã ghi trên hình; phục trang minh họa, không exact historical costume reproduction.
- Sau review mới render/export, xem lại bản mã hóa và kiểm tra thumbnail trên điện thoại. File SRT đã tạo từ caption thật.

## Lệnh render sau duyệt

```bash
npx remotion render src/index.ts Korea-No-Monarchy-KO out/korea-no-monarchy/korea-no-monarchy-ko-v1.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

## Hook visual v2 — cập nhật sau user review

User yêu cầu sửa hook vì bố cục cũ đơn điệu. `OpeningHook.tsx` thay hình K01/K02: vua/quan hầu trong phòng → cùng góc ngai trống ở frame 51 → góc phòng chéo đặt câu hỏi ở frame 149. Chữ giảm, không còn timeline phụ ở opening. Voice, caption và thời lượng không đổi.

Lint targeted + TypeScript pass. Kiểm tra browser ở frame 0/50/51/148/149/157/262/263: không có error overlay; ảnh xem ở 0/51/100/195 cho thấy người/chữ và ngai rõ. Đây là QA riêng cho hook mới, không audit lại toàn bộ episode. Các ghi chú về hook fade-out của bản trước được thay thế bằng match cut. Chưa render video/still; screenshot là quan sát Studio. Chờ người dùng duyệt hình mới.

## Nhạc original v1 — 02/10/2026

- Tổng hợp từ mã riêng, không dùng nhạc/sample/MIDI/soundfont/IR tải ngoài. Nguồn/hash: `music-provenance.json`; nốt: `../data/music-score.json`; generator: `../tools/generate_music.py`.
- 5 arrangement, 1065 events, 380.5 giây. Main và preview window dùng `MusicBed`; ambience cũ còn file nhưng inactive. Narration/visual/timing không đổi.
- Targeted ESLint + TypeScript pass. `check_music.py` pass: duration/SHA, hook pause silence, voice lead 10.26–14.49 dB RMS/đoạn, decoded sum peak -6.14 dBFS. Xem `music-qa.json`; không phải đo MP4 cuối.
- Studio đúng music track/asset, frame 51/263/3587/9061/9767/11390 không overlay error, playback unmuted chạy. `music-studio-review.json` và screenshot Studio lưu bằng chứng; preview về frame 0.
- Chưa có full subjective listening/native human review hoặc guarantee Content ID. Chưa render MP4/still, chưa upload. Người dùng cần nghe duyệt nhạc trước xuất.

## Upload Private — 04/10/2026

Đã Save Private và xác nhận trong Content. Video https://youtu.be/DQ_yrVIAIz0 ; Details https://studio.youtube.com/video/DQ_yrVIAIz0/edit . File local đã có, 68,903,320 bytes, H264/AAC 1920×1080/30fps, 380.544 giây; không render lại. Title/mô tả Hàn, 11 chapter từ timing thật, 7 nguồn và 9 tags đã lưu. Korean video/title/description language, Education, Standard licence, not Made for Kids, không paid promotion; comments On/Basic đã xác nhận.

AI survey chọn No theo 4 dạng cụ thể của UI: giả lời/hành động người thật, sửa footage thực, dựng cảnh giống thật chưa xảy ra, nhạc AI là nội dung chính. Video là code/SVG minh họa, narrator không mạo danh người thật, nhạc tổng hợp chỉ là nền. Đây không phải khẳng định toàn pipeline không AI; mô tả ghi animation tái dựng/giọng tổng hợp/nhạc riêng. Giữ default remix/embedding.

Korean SRT upload with timing và subtitle editor báo published nhưng video vẫn Private. Copyright check complete: No issues found, chỉ kết quả hiện tại. Content xác nhận đúng title / 6:21 / Private / Uploaded 4 Oct 2026. HD ở 99%, Almost finished tại quan sát cuối, chưa xác nhận hoàn tất. Không upload custom thumbnail, không Public/Schedule, chưa thêm cards/end screen. Advanced verification vẫn cần để link nguồn bấm được.

Metadata/file/hash và kết quả trong planning/upload-metadata.json, UPLOAD_PACKAGE.md, upload-result.json. Bằng chứng out/korea-no-monarchy/upload/private-upload.png. User tự thêm thumbnail, chờ HD hoàn tất, review rồi đổi Public. Không đánh giá lại toàn bộ playback MP4 trong task upload.
