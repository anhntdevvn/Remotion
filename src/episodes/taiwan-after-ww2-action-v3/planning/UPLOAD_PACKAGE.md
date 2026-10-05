# Đăng video đầu tiên — 기묘한 기록실

Cập nhật 02/10/2026. Đã hoàn tất upload trong Studio và lưu **Private**, chưa công khai. Video: https://youtu.be/f5XreL3qLxk — thumbnail riêng sẽ được người dùng bổ sung sau. Title, mô tả, chapters, nguồn và tags bên dưới đã lưu; Checks báo **No issues found**.

## 1. File để upload

File thực tế người dùng đã render và upload:

```text
/home/anhnt/Documents/Remotion/out/taiwan-after-ww2-action-v3/taiwan-after-ww2-ko.mp4
```

Đã kiểm tra: H.264/AAC, 1920×1080, 478.656 giây (Studio hiển thị 7:59); frame 07:46 có watermark độc lập mới. File `-watermarked.mp4` đề xuất trước đó không tồn tại; tên output do người dùng chọn không quyết định phiên bản nội dung. Không upload bản trùng hoặc render trong nhiệm vụ hoàn tất upload.

Lệnh xuất lại nếu cần sau này (chưa chạy trong nhiệm vụ upload):

```bash
cd /home/anhnt/Documents/Remotion
npx remotion render src/index.ts TaiwanAfterWW2-ActionV3 out/taiwan-after-ww2-action-v3/taiwan-after-ww2-ko-action-v3-watermarked.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

Sau render, mở MP4 kiểm tra mở đầu, phần giữa, đoạn kết và logo/voice. Preview code không tự thay đổi file MP4 cũ. Người dùng review các mốc chưa đồng bộ cấp từ trong QA trước khi public. Câu cuối KO-037 hiện nói 80 năm từ 1945; khi đăng năm 2026 cần cân nhắc diễn đạt “hơn tám thập kỷ” nếu chỉnh lại voice sau này. Không sửa voice trong bước hướng dẫn này.

## 2. Tiêu đề đề xuất

Copy chỉ dòng Hàn sau vào Title:

```text
일본은 왜 대만을 지킬 수 없었을까?
```

VI: Vì sao Nhật Bản không thể giữ Đài Loan?

Phương án khác, chưa cần dùng cùng lúc:

```text
50년간 지배한 대만, 일본은 왜 포기해야 했을까?
```

VI: Đài Loan từng dưới sự cai trị 50 năm, vì sao Nhật phải từ bỏ?

Không thêm tiêu đề tiếng Việt vào bản xuất bản Hàn. Đây là đề xuất biên tập, chưa có bằng chứng CTR.

## 3. Mô tả tiếng Hàn — copy toàn bộ khối này

```text
일본은 대만을 약 50년간 지배했습니다. 그런데 제2차 세계대전이 끝난 뒤, 왜 이 섬을 계속 보유할 수 없었을까요?

1895년 시모노세키 조약부터 1951년 샌프란시스코 평화조약까지, 전쟁과 외교의 흐름을 따라가 봅니다. 카이로 선언과 일본의 항복, 중화민국의 행정 인수, 중국 내전과 한국전쟁은 대만의 전후 처리에 어떤 영향을 미쳤을까요?

특히 일본이 권리를 포기한 것과, 조약이 어느 나라를 수령자로 명시했는지는 구분해 살펴봅니다. 확인된 사실과 법적·정치적 해석을 구분하는 역사 해설입니다.

이 영상은 애니메이션과 합성 음성으로 제작했습니다. 인물, 장면, 문서 이미지는 이해를 돕기 위한 재구성입니다.

챕터
00:00 일본은 왜 대만을 지키지 못했을까?
00:27 조약에 남은 질문
00:49 1895년과 일본의 대만 통치
01:41 카이로 선언과 항복 조건
02:35 일본 통치 종료와 행정 인수
03:00 행정과 평화조약의 차이
03:27 2·28 사건과 전후 갈등
04:16 중국 내전과 대만의 미래
05:22 한국전쟁과 미 제7함대
06:25 샌프란시스코 평화조약
07:23 일본이 대만을 지킬 수 없었던 이유

주요 참고자료
카이로 공동성명 — 미국 국무부 역사국
https://history.state.gov/historicaldocuments/frus1943CairoTehran/d343

일본 항복문서 — 미국 국립문서기록관리청
https://www.archives.gov/milestone-documents/surrender-of-japan

1950년 6월 27일 트루먼 성명 — 트루먼 대통령 도서관
https://www.trumanlibrary.gov/library/public-papers/173/statement-president-situation-korea

일본과의 평화조약 — 유엔 조약집
https://treaties.un.org/Pages/showDetails.aspx?objid=08000002801528c2

#세계사 #대만 #역사이야기
```

Chapters lấy từ `full_timing.json` theo 30 fps, không dùng timestamp 10:xx của script planning cũ. Mốc đầu 00:00, trên ba chapter, khoảng cách tối thiểu 10 giây. Khả năng hiển thị chapter còn tùy quyền Advanced features của kênh; đã xác minh điện thoại không đồng nghĩa đã xác nhận mọi Advanced feature.

### Bản Việt để review mô tả

Nhật Bản đã cai trị Đài Loan khoảng 50 năm. Vì sao sau Thế chiến II họ không thể tiếp tục giữ hòn đảo?

Video theo dòng chiến tranh và ngoại giao từ Hiệp ước Shimonoseki năm 1895 đến Hòa ước San Francisco năm 1951: Tuyên bố Cairo, Nhật đầu hàng, Trung Hoa Dân Quốc tiếp quản hành chính, nội chiến Trung Quốc và Chiến tranh Triều Tiên.

Phân biệt việc Nhật từ bỏ quyền với việc hiệp ước có chỉ định quốc gia tiếp nhận hay không; phân biệt dữ kiện với diễn giải pháp lý, chính trị. Video dùng hoạt hình và giọng tổng hợp; nhân vật, cảnh và hình văn kiện là minh họa dựng lại.

Chapter lần lượt: câu hỏi mở đầu; câu hỏi trong hiệp ước; năm 1895 và thời Nhật cai trị; Cairo/đầu hàng; chấm dứt cai trị và tiếp quản; hành chính khác hòa ước; 2/28 và xung đột hậu chiến; nội chiến và tương lai Đài Loan; Chiến tranh Triều Tiên/Đệ Thất Hạm đội; San Francisco; kết luận.

Nguồn trong mô tả lấy từ research của episode, không phải attribution của footage lấy từ một kênh khác.

## 4. Thumbnail riêng

Đã tạo thumbnail theo yêu cầu tiếp theo ngày 02/10/2026: `public/channel-branding/thumbnails/taiwan-after-ww2-ko-v2.jpg`, 1920×1080 JPEG dưới 2 MB. Dùng nhân vật rig V3, cờ Nhật, đảo Đài Loan đỏ, văn kiện minh họa và logo chuẩn. Chữ chính: `대만을 / 왜 못 지켰나?` — “Đài Loan / Vì sao không giữ được?”. Source và QA trong `../thumbnail/README.md`. Chưa upload thumbnail hoặc chuyển video sang Public; người dùng sẽ bổ sung trước công khai.

Định hướng đề xuất: một nhân vật Nhật + đảo Đài Loan màu đỏ + văn kiện từ bỏ quyền, tương phản navy/kem/đỏ, tránh nhồi chữ. Không dùng ảnh avatar một mình hoặc một frame đang giữa action làm thumbnail mặc định.

Chữ Hàn đề xuất:

```text
왜 못 지켰을까?
```

VI: Vì sao không giữ được?

Thiết kế khung 16:9, có thể làm 1920×1080 JPG/PNG dưới 2 MB để dùng thuận tiện trên cả máy tính và điện thoại. Đây là thông số làm asset đề xuất, không phải khẳng định giới hạn desktop hiện tại. YouTube hiện hướng dẫn desktop tối đa 50 MB, mobile 2 MB cho thumbnail video; xem nguồn bên dưới khi cần giới hạn cụ thể.

## 5. Các lựa chọn khi upload

Trong [YouTube Studio](https://studio.youtube.com/channel/UCGYWmOaXg2Y27qA_gBaZMiw): Create/Tạo → Upload videos/Tải video lên → chọn MP4 bản có watermark sau khi render.

| Mục | Thiết lập cho episode này |
| --- | --- |
| Title | Tiêu đề Hàn ở trên |
| Description | Khối mô tả Hàn ở trên |
| Thumbnail | Thumbnail riêng, bổ sung trước public |
| Audience | No, it's not made for kids / Không dành riêng cho trẻ em |
| Age restriction | Không giới hạn 18+ nếu bản cuối vẫn là minh họa hiện tại, không thêm nội dung gây sốc/đồ họa |
| Video language | Korean / Tiếng Hàn |
| Title and description language | Korean nếu giao diện có mục này |
| Category | Education / Giáo dục, giữ mặc định đã lưu |
| Licence | Standard YouTube licence |
| Recording location | Để trống; không khai Hàn Quốc chỉ để nhắm thị trường Hàn |
| Paid promotion | Không nếu thực tế không có tài trợ/đặt sản phẩm |
| Comments | On, Basic moderation |
| Visibility lần đầu | Private, kiểm tra bản xử lý xong trước |

Tag đề xuất (không phải phần quyết định phân phối):

```text
대만, 일본, 세계사, 샌프란시스코 평화조약, 카이로 선언, 한국전쟁, 역사 애니메이션, 기묘한 기록실
```

### AI use / Altered content

Đọc câu hỏi và điều kiện cụ thể của form, không chọn Yes chỉ vì dựng bằng Remotion hoặc có AI hỗ trợ viết. Theo hướng dẫn hiện hành, hoạt hình phi hiện thực và hỗ trợ script/title/thumbnail không tự bắt buộc disclosure. Cần disclosure khi giả giọng/hành vi người thật, tạo/sửa cảnh chân thực có thể bị hiểu là sự kiện thực, hoặc dùng nhạc AI-generated theo ví dụ của YouTube.

V3 có narration tổng hợp, hình hoạt hình/code và âm thanh của project; chưa audit đầy đủ mọi asset âm thanh/giấy phép trong bước hướng dẫn này. Mô tả đề xuất đã minh bạch việc dùng giọng tổng hợp. Đối chiếu nguồn nhạc/voice thực tế với yêu cầu trước khi chốt AI survey. Không coi việc khai AI là bảo đảm hoặc trở ngại mặc định cho phân phối/kiếm tiền.

### Video elements

- Nếu có file SRT Hàn riêng, thêm ở Add subtitles. Caption đã nằm trong hình không tự trở thành subtitle track bật/tắt được. Chưa tạo SRT mới trong bước này.
- Video đầu tiên chưa có đích xem tiếp đã chốt: không gắn thumbnail giả thành nút click. Có thể để end screen sau, hoặc thêm Subscribe nếu vị trí không che câu hỏi cuối; cấu hình phần click trong Studio.
- Không cần cards trỏ sang video chưa có.

## 6. Checks và công khai

1. Save Private. Chờ upload và xử lý 1080p xong, cùng bước Checks.
2. Mở link video Private bằng tài khoản chủ kênh; bật 1080p, kiểm tra đầu/giữa/cuối trên máy tính và điện thoại. Kiểm tra watermark, mức âm, chữ nhỏ, thumbnail và nguồn mô tả.
3. Nếu Checks có vấn đề, xem chi tiết trước khi công khai. Kết quả không có claim không chứng nhận toàn bộ quyền sử dụng và vẫn có thể thay đổi sau này.
4. Khi tự review xong, Content → chọn video → Visibility → Public hoặc Schedule → Save/Publish theo giao diện.

Không cần VPN hay đổi nơi cư trú sang Hàn Quốc. Dùng title/description/voice tiếng Hàn như định hướng kênh. Không có thiết lập đảm bảo chỉ phân phối ở Hàn.

Nếu muốn thử giờ đăng: 20:00 Hàn Quốc = 18:00 Việt Nam; đây chỉ là giờ thử nghiệm thuận tiện, không phải khung giờ đã được chứng minh tốt nhất cho kênh mới. Nhìn đúng timezone trong form Schedule. YouTube nói giờ đăng chưa được xác định là yếu tố ảnh hưởng hiệu quả dài hạn.

## Nguồn hướng dẫn đã kiểm tra 02/10/2026

- [Upload YouTube videos](https://support.google.com/youtube/answer/57407?hl=en)
- [Custom thumbnails](https://support.google.com/youtube/answer/72431?hl=en)
- [Video chapters](https://support.google.com/youtube/answer/9884579?hl=en)
- [Disclosing use of GenAI content](https://support.google.com/youtube/answer/14328491?co=GENIE.Platform%3DDesktop&hl=en)
- [End screens](https://support.google.com/youtube/answer/6388789?hl=en)
- [Publishing time and performance](https://support.google.com/youtube/answer/141805?hl=en)
