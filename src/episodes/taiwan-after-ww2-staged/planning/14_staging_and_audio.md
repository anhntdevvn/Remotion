# Staging mới và audio

## Những thay đổi có chủ đích

- Thay nền tối / infographic ở giữa bằng các không gian SVG: đường phố, thành phố đổ nát, cảng, địa hình, phòng họp, hội nghị và kho tài liệu.
- Nhân vật lớn, được đặt trong cảnh; luân phiên solo close-up, nhóm, đội hình, nhân vật ngồi, đi vào/ra, góc nghiêng và quay lưng.
- Trao hồ sơ: cả hai tiến tới điểm trao; object đi theo tay người giao, rồi gắn với tay người nhận. Không trượt độc lập qua khoảng trống giữa hai người đứng yên.
- Ký văn kiện: bàn tay và bút nằm trên lớp mặt bàn; thân dưới được che bằng desk mask. Không để mặt bàn che tay.
- Súng ở cảnh tiến quân, đàn áp và lựa chọn can thiệp quân sự; không thêm bắn súng vào cuộc họp ngoại giao.
- Gait chỉ chạy trong lúc nhân vật di chuyển từ điểm A tới B, dừng khi tới vị trí. Cảnh nói/giải thích vẫn được đứng hoặc ngồi bình thường.
- Không dựng mouth loop cho mọi actor theo giọng narration. Blink/breathing rất nhẹ còn được dùng.
- Map và document insert chiếm toàn cảnh khi chính chúng là nội dung đang giải thích.

## Voice và âm thanh

Giữ nguyên voice `ko-KR-HyunsuMultilingualNeural`, nội dung Hàn/Viet và các file mp3 đã chốt. Đây là bản thử staging, không thay narrator.

Bed cũ được sao chép, dùng volume 0.07 khi narration đang nói, 0.10 ở các khoảng nghỉ, fade đầu/cuối. Paper SFX mức 0.075–0.14 xuất hiện khi hồ sơ/văn kiện thao tác. Không dùng gunshot, tiếng đám đông hay câu thoại giả để ngụ ý có tư liệu hiện trường. Không tăng SFX ở mọi cut.

Chưa thực hiện nghe liên tục toàn bộ bản mới hoặc render đầu ra. Phải kiểm tra bằng tai khi review Studio, nhất là voice/bed và cửa sổ Cairo/Treaty. Volume callback/negative Sequence trong preview cần thử playback; timeline toàn video không trim voice.

## Kiểm tra tay và layer

1. Joint của arm và grip đều dùng `getArmJoints`; prop folder gắn đúng wrist theo pose pass.
2. Outfit detail vẽ trước prop, palm overlay vẽ sau prop.
3. SVG rig `overflow: visible`; khung shot vẫn cắt ngoài màn hình có chủ đích.
4. Seated không vẽ chân đứng; bàn che thân dưới. Riêng signing vẽ bàn trước rồi tay/bút trên mặt bàn.
5. Rifle-ready được đặt lại theo đường đi qua hai wrist, không giữ phép rotate -15 cũ làm bàn tay lệch khỏi thân súng.
6. Profile và back không dùng khuôn mặt trước; back cũng có lớp thân áo sau.

Các kiểm tra này giảm nguyên nhân đã gặp, không cam kết mọi pose/từng frame đã được kiểm tra bằng mắt.
