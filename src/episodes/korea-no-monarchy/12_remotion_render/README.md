# Preview và lệnh render

```bash
cd /home/anhnt/Documents/Remotion
npm run dev
```

Mở http://localhost:3000/Korea-No-Monarchy-KO . Có Opening và K01–K36 để review nhanh từng đoạn. Không bật/render tự động.

Sau review:

```bash
npx remotion render src/index.ts Korea-No-Monarchy-KO out/korea-no-monarchy/korea-no-monarchy-ko-v1.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

Thumbnail chỉ khi được yêu cầu:

```bash
npx remotion still src/index.ts Korea-No-Monarchy-Thumbnail public/channel-branding/thumbnails/korea-no-monarchy-ko-v1.jpg --image-format=jpeg --frame=0
```

Tạo lại voice/timeline khi script đổi: `python3 src/episodes/korea-no-monarchy/tools/write_script.py` → `python3 src/episodes/korea-no-monarchy/tools/generate_audio.py` → `python3 src/episodes/korea-no-monarchy/tools/write_package.py`. Audio cache theo content + voice preset; không dùng timing cũ sau đổi script. Khi narration đổi thời lượng/chapter, tạo lại nhạc bằng `python3 src/episodes/korea-no-monarchy/tools/generate_music.py`, rồi package và `check_music.py`. Không chỉ giữ mốc nhạc cũ. `generate_bed.py` chỉ là ambience cũ không còn phát trong main.
