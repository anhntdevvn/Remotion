# Nghiên cứu cách kể bằng hình — trước khi sửa V3

## Phạm vi và bằng chứng

Ngày: 2026-10-01. Chỉ nghiên cứu; chưa sửa code hoặc render Remotion.

Đã đối chiếu code V2 và 16 frame lấy trực tiếp từ file reference cục bộ dài 529,16 giây, tại 00:03, 00:12, 00:24, 00:48, 01:15, 01:50, 02:25, 03:00, 03:40, 04:20, 05:05, 05:50, 06:35, 07:15, 07:55 và 08:30.

Contact sheet: `out/taiwan-after-ww2/reference-study/reference-contact.jpg`.

Đây là kiểm tra mẫu về bố cục và chức năng hình. Chưa phải phân tích liên tục toàn bộ action, transcript hoặc thống kê số shot/cut của reference. Không suy ra retention thực tế của kênh từ hình ảnh.

## Phát hiện

- 00:03: thành phố đổ nát là không gian của nhân vật; hai nhóm xuất hiện trực tiếp trong cảnh.
- 00:12: phòng làm việc có cờ và bản đồ trên giá; đạo cụ thuộc không gian, không phải card nổi giữa màn hình.
- 00:24: bảng chữ chiếm cảnh. Reference vẫn dùng cảnh không nhân vật để ngắt nhịp.
- 00:48 và 01:15: phòng lịch sử, trang phục và nhóm nhân vật cung cấp thông tin về quyền lực và thời đại.
- 01:50, 02:25, 05:05: bản đồ toàn khung hình; nhân vật chỉ được thêm khi có chức năng giải thích cụ thể.
- 03:00, 03:40: dùng lại phòng/cờ nhưng thay nhóm, đạo cụ và quan hệ nhân vật. Background lặp có mục đích.
- 04:20: sân có tường, cây và cột; hai nhóm trực tiếp đối diện nhau trong không gian.
- 05:50: background đơn giản vẫn hiệu quả khi nhóm nhân vật là chủ thể lớn của hình.
- 06:35: mặt tiền tòa nhà và nhóm người cho biết địa điểm diễn ra cuộc trao đổi.
- 07:15: bảng chuyển mục giúp chia nhịp.
- 07:55: phòng có sàn, tường và bảng cầm tay; tương tác và phản ứng trở thành nội dung của cảnh.

Điểm nổi bật là staging rõ và hình phục vụ từng ý. Không có bằng chứng rằng mọi cảnh phải chạy, cầm súng hoặc chuyển camera liên tục. Các frame mẫu cho thấy nhiều cảnh đứng nói và bố cục camera đơn giản.

## Vấn đề ở V2 hiện tại

`StoryScene` dùng cùng nền gradient, header, vùng graphic ở giữa và actor layer ở rìa cho gần như tất cả cảnh sau mở đầu. Thêm quân đội, march hoặc prop không thay đổi cấu trúc này.

Nhân vật thường là lớp phụ quanh infographic. Nhiều action không có mục tiêu tương tác trong không gian; đổi pose pass chưa đồng nghĩa với trao một hồ sơ thật giữa hai bàn tay. Đạo cụ cần gắn vào grip và có hand overlay đúng thứ tự lớp. Bản đồ hiện cũng quá sơ lược để làm chủ thể giải thích địa lý.

## Cách bám reference đề xuất

Học theo thứ tự narrative beat, chức năng shot, loại bối cảnh, vai trò nhân vật, nhịp xuất hiện đạo cụ và phản ứng. Thiết kế lại background, artwork, nhân vật, câu chữ và bố cục cụ thể cho kênh.

Không bắt đầu bằng việc bổ sung một background vào mọi infographic. Cần storyboard lại scene thành các shot:

`đoạn voice → ý đang nói → bối cảnh → nhân vật tham gia → hành động/đạo cụ → phản ứng → cut sang ý kế`

21 scene hiện tại là nhóm nội dung/chương, không phải giới hạn số shot. Mỗi nhóm có thể gồm nhiều shot ngắn theo câu thoại. Thời gian từng shot phải lấy từ voice hiện có, không đặt số giây cố định cho toàn bộ video.

### Ví dụ chuyển đổi

| Beat | Bối cảnh và staging đề xuất |
|---|---|
| 1895 | Quân đội/địa hình để giới thiệu chiến tranh, cut sang phòng ký hiệp ước, rồi map toàn màn hình cho việc chuyển giao |
| Cai trị thuộc địa | Đường phố, đường sắt hoặc cảng; nhân vật dân sự và nhà chức trách tương tác đúng beat |
| Cairo | Ba đại diện trong phòng họp, bàn và ghế thuộc phối cảnh; insert văn kiện khi cần giải thích |
| Bàn giao 1945 | Phòng tiếp nhận với bàn ở giữa; document di chuyển từ tay người giao sang tay người nhận |
| Nội chiến 1949 | Map giải thích phân chia và tuyến di chuyển; cut sang nhóm đại diện khi câu hỏi chuyển sang chính trị |
| Điều 2(b) | Cận văn kiện cho wording; trở lại phòng hội nghị để thể hiện chỗ trống và phản ứng |

Tránh hình gây thêm diễn giải lịch sử chưa có trong narration, như diễn một cuộc giao chiến cụ thể chỉ vì đoạn nói đến nội chiến hoặc dùng trang phục PRC để mặc định mô tả quân Bắc Triều Tiên.

## Trình tự trước khi triển khai

1. Phân tích liên tục reference và lập shot map có timestamp, mô tả action và chức năng từng shot.
2. Map shot chức năng sang các đoạn voice Hàn; giữ nội dung đã chốt.
3. Thiết kế một thư viện background SVG và rig hướng trước, nghiêng, quay lưng, ngồi; props có grip đúng.
4. Làm một đoạn thử có bối cảnh, nhân vật và cut; chủ kênh review trên localhost.
5. Sau khi duyệt ngôn ngữ hình mới, áp dụng cho toàn episode. Chỉ cung cấp lệnh render, trừ khi chủ kênh yêu cầu xuất.
