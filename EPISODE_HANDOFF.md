# Episode Handoff — Korea No Monarchy

**Cập nhật:** 04/10/2026  
**Workspace:** `/home/anhnt/Documents/Remotion`  
**Episode hiện tại:** Vì sao Hàn Quốc không phục hồi quân chủ sau Thế chiến II?  
**Composition:** `Korea-No-Monarchy-KO`  
**Trạng thái:** MP4 local đã có và upload Private ngày 04/10/2026; video DQ_yrVIAIz0. User tự thêm thumbnail và đổi visibility sau. Không render lại trong task upload.

## Đọc để tiếp tục

1. [MASTER_CHANNEL_BIBLE.md](./MASTER_CHANNEL_BIBLE.md)
2. [ANIMATION_DIRECTION_PLAYBOOK.md](./ANIMATION_DIRECTION_PLAYBOOK.md)
3. [README episode](./src/episodes/korea-no-monarchy/README.md), [QA](./src/episodes/korea-no-monarchy/planning/QA.md)
4. [Bản Việt](./src/episodes/korea-no-monarchy/planning/04b_vietnamese_review_script.md), [research](./src/episodes/korea-no-monarchy/planning/03_verified_research.md), [scene map](./src/episodes/korea-no-monarchy/planning/05_scene_map.json)

## Yêu cầu và quyết định

Người dùng đưa video local `H81yzdnxFGY`, yêu cầu tiếp tục theo workflow đã chốt. Giữ các chặng lớn của nguồn, viết original KO/VI với research riêng. Không copy footage, voice, nhạc hoặc trace nhân vật. Episode mới riêng, không thay Taiwan. User mặc định muốn localhost + lệnh render, không tự render sau chỉnh sửa.

Mạch: hook → Thanh/Nhật/Nga và Đại Hàn → 1905/1907/1910 mất quyền → giải phóng/chia đôi → 35 năm và người kế vị → 1919/1948 nền tảng cộng hòa → hai chính quyền/chiến tranh → hồi hương 1963 khác với quyền cai trị → nhiều yếu tố cùng tác động.

Sửa nguồn có research: occupation khác trusteeship; hoàng gia tồn tại nhưng mất quyền; Rhee được Quốc hội bầu, không giữ lời đùa mua chức từ Mỹ; không đánh đồng hoàng gia; Yi Un bị đưa sang Nhật từ nhỏ; hồi hương 1963 dưới thời Park khi bị bệnh. Kết luận là tổng hợp, không phải một nguyên nhân quyết định.

## Trạng thái và bằng chứng

- 1920×1080, 30fps, 11415 frame / 380.5s (6:21 làm tròn).
- 36 voice clips, 70 SentenceBoundary captions, 12 scene grammar. Không phải 36 bối cảnh độc lập.
- Voice `ko-KR-HyunsuMultilingualNeural`, +10%, -4Hz; preset riêng của episode.
- Episode-local fork của rig đã duyệt, thêm áo/mũ hoàng gia, hanbok, mũ Mỹ/Liên Xô. Shared ChannelWatermark mount một lần ở full/window composition.
- 13 ID nhóm nguồn; package đầy đủ theo Bible trong `planning/`, kèm SRT original.
- Lint/typecheck, media/timing/caption/hash checks pass; 224 file các bản Taiwan và branding giữ nguyên, có manifest baseline.
- Studio midpoint K01–K36 không có error; đã xem screenshot những grammar trọng điểm và các phase của phiếu. Không tuyên bố full native audio QA/retention review.
- Có thumbnail code-native `Korea-No-Monarchy-Thumbnail`; chưa xuất ảnh.
- @remotion/media 4.0.529 khai báo direct dependency (đã có node_modules). Không thay mã thư viện Remotion.
- Ba đường dẫn MP4 Taiwan ghi trong snapshot cũ bên dưới hiện không tồn tại khi kiểm tra. Task này không xóa chúng; không coi ghi chú cũ về output là trạng thái hiện tại.

## Hook visual v2 — 02/10/2026

Người dùng đánh giá opening hơi đơn điệu và yêu cầu sửa thử. Bản mới chỉ đổi hình K01/K02 trong `scenes/OpeningHook.tsx`, giữ voice, script, caption, duration và các scene tiếp theo.

- Frame 0–50: vua lớn giữa phòng triều kiến, quan hầu hai bên ở tầng nhỏ hơn, ngai và nội thất làm điểm nhìn trung tâm.
- Frame 51–148: match cut theo SentenceBoundary câu thứ hai; giữ tọa độ/ngai/góc máy, bỏ người và đổi ánh sáng để nói sự chuyển thời kỳ. Không dùng vua fade-out hoặc ngụ ý vua còn cai trị đến 1945.
- Frame 149–262: cut sang góc phòng chéo, ngai bên trái và câu hỏi bên phải, cột cửa tiền cảnh tạo chiều sâu. Không giữ bố cục chữ-trái/ngai-phải xuyên hook.
- Nội thất SVG tự dựng gồm dầm, khung cửa, bệ và sàn phối cảnh; symbolic reconstruction, không phải chính xác phòng triều kiến cụ thể.
- Lint/typecheck pass; browser kiểm tra frame 0/50/51/148/149/157/262/263 không có error. Xem screenshot cả ba nhịp; câu hỏi và mặt vua không bị đè.
- `planning/hook-v2-review.json` lưu bằng chứng mốc kiểm tra. Chưa có user approval bản visual mới.

## Nhạc nền original v1 — 02/10/2026

Người dùng đồng ý triển khai nhạc, nhấn mạnh tránh bản quyền bên khác. Đã tổng hợp nhạc không lời bằng `tools/generate_music.py`, không tải bài nhạc/sample/MIDI/soundfont/IR hoặc dùng soundtrack reference. Có 5 arrangement theo hook, đế quốc, chính quyền mới, chiến tranh, hồi hương; 1065 note events, dài 380.5 giây. Nguồn/hash trong `planning/music-provenance.json`, nốt trong `data/music-score.json`; MP3/source không bị Git ignore. WAV master ở `out/korea-no-monarchy/audio-master/`, ngoài public bundle.

`components/MusicBed.tsx` thay ambience cũ trong full/window compositions; `episode-bed.mp3` giữ trên disk nhưng không phát. Gain dưới narration 0.32, giữa đoạn 0.44, ramp 6 frame theo timing thật. Nhạc ngắt ở frame 51 khi cắt sang ngai trống, kết fade 2.8 giây. Không sửa voice/script/timing/visual hoặc Taiwan.

`tools/check_music.py` pass: SHA/duration khớp, nhạc thấp hơn voice 10.26–14.49 dB RMS/đoạn, peak bản cộng PCM dự kiến -6.14 dBFS, không clipping; giữa khoảng ngắt hook im lặng. Đây là decoded offline sum, không phải loudness MP4 cuối hoặc đánh giá nghe của người Hàn. Targeted ESLint/TypeScript pass. Studio hiện track **Original score · 5 chapters** và đúng asset; frame 51/263/3587/9061/9767/11390 không error, playback unmuted đã chạy. Log `planning/music-studio-review.json`, screenshot `out/korea-no-monarchy/qa/music-v1-studio.png`; preview paused frame 0.

Không đăng ký Content ID; bằng chứng nguồn gốc không bảo đảm hệ thống không nhận nhầm. Chưa render MP4. Cần người dùng nghe mức nhạc/âm sắc và review toàn bộ trước xuất. Nếu voice/chapter đổi, tạo lại score theo timeline mới rồi chạy package/music QA.

## Upload Private — 04/10/2026

Đã Save Private và xác nhận trong Content. Video https://youtu.be/DQ_yrVIAIz0 ; Details https://studio.youtube.com/video/DQ_yrVIAIz0/edit . File local đã có, 68,903,320 bytes, H264/AAC 1920×1080/30fps, 380.544 giây; không render lại. Title/mô tả Hàn, 11 chapter từ timing thật, 7 nguồn và 9 tags đã lưu. Korean video/title/description language, Education, Standard licence, not Made for Kids, không paid promotion; comments On/Basic đã xác nhận.

AI survey chọn No theo 4 dạng cụ thể của UI: giả lời/hành động người thật, sửa footage thực, dựng cảnh giống thật chưa xảy ra, nhạc AI là nội dung chính. Video là code/SVG minh họa, narrator không mạo danh người thật, nhạc tổng hợp chỉ là nền. Đây không phải khẳng định toàn pipeline không AI; mô tả ghi animation tái dựng/giọng tổng hợp/nhạc riêng. Giữ default remix/embedding.

Korean SRT upload with timing và subtitle editor báo published nhưng video vẫn Private. Copyright check complete: No issues found, chỉ kết quả hiện tại. Content xác nhận đúng title / 6:21 / Private / Uploaded 4 Oct 2026. HD ở 99%, Almost finished tại quan sát cuối, chưa xác nhận hoàn tất. Không upload custom thumbnail, không Public/Schedule, chưa thêm cards/end screen. Advanced verification vẫn cần để link nguồn bấm được.

Metadata/file/hash và kết quả trong planning/upload-metadata.json, UPLOAD_PACKAGE.md, upload-result.json. Bằng chứng out/korea-no-monarchy/upload/private-upload.png. User tự thêm thumbnail, chờ HD hoàn tất, review rồi đổi Public. Không đánh giá lại toàn bộ playback MP4 trong task upload.

User yêu cầu upload video hiện tại, trừ thumbnail, giữ Private. In-app browser chưa đăng nhập; dùng tab Chrome đã đăng nhập đúng kênh. Các ghi chú chưa export/upload ngày 02/10 dưới đây giữ để truy vết, không là trạng thái hiện tại.

## Preview và render

Studio đã mở tại [Korea-No-Monarchy-KO](http://localhost:3000/Korea-No-Monarchy-KO). Nếu server dừng: `npm run dev`. Có Opening và K01–K36 để review từng đoạn.

```bash
cd /home/anhnt/Documents/Remotion
npx remotion render src/index.ts Korea-No-Monarchy-KO out/korea-no-monarchy/korea-no-monarchy-ko-v1.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

Không chạy render cho tới khi người dùng yêu cầu. MP4 đã upload Private như cập nhật 04/10 ở trên; tiếp theo user tự thêm thumbnail và review trước Public.

## Prompt chuyển AI

> Đọc AGENTS.md, MASTER_CHANNEL_BIBLE.md, EPISODE_HANDOFF.md, ANIMATION_DIRECTION_PLAYBOOK.md, rồi README và QA của `src/episodes/korea-no-monarchy`. Xác minh file hiện tại trước khi sửa. Giữ các bản Taiwan, ưu tiên meaningful action/grammar/interaction, bám sườn và voice thật. Mặc định localhost + lệnh render, không render MP4/still tự động.

---

Ghi chú dưới đây là snapshot cũ của Taiwan. Không dùng runtime/QA/output trong snapshot như sự thật hiện tại nếu chưa kiểm tra lại. Chỉ giữ để truy vết quyết định và đường dẫn.

# Archived handoff — Taiwan After WW2

**Cập nhật:** 02/10/2026  
**Workspace:** `/home/anhnt/Documents/Remotion`  
**Episode:** Vì sao Nhật không thể giữ Đài Loan sau Thế chiến II?  
**Bản đang review:** Action V3  
**Trạng thái:** code và preview đã tạo; người dùng phản hồi “thấy có vẻ ổn”; chưa render V3, chưa có quyết định xuất bản.

## 1. Đọc trước khi tiếp tục

1. [AGENTS.md](./AGENTS.md)
2. [MASTER_CHANNEL_BIBLE.md](./MASTER_CHANNEL_BIBLE.md): thị trường Hàn Quốc, tiếng Hàn, bản Việt song song và quy tắc chung.
3. [ANIMATION_DIRECTION_PLAYBOOK.md](./ANIMATION_DIRECTION_PLAYBOOK.md): ý đồ dựng, lý do, bài học và workflow cho episode có rig.
4. [README V3](./src/episodes/taiwan-after-ww2-action-v3/README.md) và [QA V3](./src/episodes/taiwan-after-ww2-action-v3/planning/QA.md).

Chỉ dẫn mới nhất của người dùng có ưu tiên cao hơn trạng thái trong file. Các kết quả QA dưới đây là bằng chứng của lần làm V3 trước đó; nếu code đã đổi tiếp, kiểm tra phần liên quan và cập nhật lại.

## 2. Reference và nội dung

Video reference tồn tại tại:

```text
/home/anhnt/Downloads/YTSave_YouTube_Media_0cxMrCykadY_Why-wasn-t-Japan-allowed-to-keep-Taiwan-after-WW2-Short-Animated-Documentary_002_720p.mp4
```

Video nguồn giúp phân tích cấu trúc và chức năng cảnh. Không mặc định rằng toàn bộ reference đã được audit shot-by-shot; không gọi V3 là bản khớp từng frame nguồn.

Nội dung hiện tại: hook → Nhật bại trận và mất quyền kiểm soát → Đài Loan và 50 năm cai trị → Trung Hoa Dân Quốc tiếp quản hành chính → các tuyên bố/văn kiện và khác biệt giữa thủ tục → căng thẳng xã hội, nội chiến → chính sách Mỹ, Chiến tranh Triều Tiên và hạm đội → tái thiết Nhật → Hiệp ước San Francisco → quyền của Nhật bị từ bỏ và câu hỏi về tương lai Đài Loan.

Script/voice được giữ nguyên trong lần nâng V3. Nhiệm vụ vừa hoàn tất là cải thiện hình và diễn xuất, không viết lại nội dung. Phân biệt chính xác việc tiếp quản hành chính, Nhật từ bỏ quyền và vấn đề bên nhận; giữ mức độ chắc chắn đã ghi trong research. Kết hình dùng “tranh luận pháp lý–chính trị còn tồn tại”, tránh gắn một nhãn tuyệt đối rồi coi đó là kết luận được mọi bên thống nhất.

Tài liệu episode:

- [Research snapshot](./src/episodes/taiwan-after-ww2-action-v3/planning/03_verified_research.md)
- [Script Hàn](./src/episodes/taiwan-after-ww2-action-v3/planning/04a_korean_script.md)
- [Script Việt review](./src/episodes/taiwan-after-ww2-action-v3/planning/04b_vietnamese_review_script.md)

## 3. Các phiên bản — giữ riêng

| Bản | Code | Composition | Trạng thái |
| --- | --- | --- | --- |
| Action v2 | `src/episodes/taiwan-after-ww2/` | `TaiwanAfterWW2` | Đã có MP4; giữ nguyên để đối chiếu. |
| Staged | `src/episodes/taiwan-after-ww2-staged/` | `TaiwanAfterWW2-Staged` | Đã có MP4; hướng dựng thử riêng, giữ nguyên. |
| Action V3 | `src/episodes/taiwan-after-ww2-action-v3/` | `TaiwanAfterWW2-ActionV3` | Bản hiện tại trong localhost, chưa có MP4. |

MP4 cũ đã kiểm tra tồn tại khi cập nhật handoff:

```text
/home/anhnt/Documents/Remotion/out/taiwan-after-ww2/final/taiwan-after-ww2-ko-action-v2.mp4
/home/anhnt/Documents/Remotion/out/taiwan-after-ww2-staged/taiwan-after-ww2-staged-ko.mp4
```

Không sửa hai thư mục episode cũ hoặc đè MP4 cũ để nâng V3. `LegacyV2.tsx` trong thư mục V3 là snapshot riêng để giữ opening/visual cần tái sử dụng, không phải entry point của bản xuất V3. Root chỉ đăng ký thêm compositions.

## 4. V3 hiện có gì

- 1920 × 1080, 30 fps; 14.358 frame = 478,6 giây, khoảng 7:59.
- Opening 810 frame / 27 giây giữ từ V2; phần dựng mới bắt đầu ở 00:27.
- 37 clip voice giữ nguyên. Voice: `ko-KR-HyunsuMultilingualNeural`, rate `+10%`, pitch `-4Hz`; đây là preset episode, chưa phải voice mặc định cho toàn kênh.
- 80 câu trên toàn timeline; 74 câu sau opening được tổ chức thành 84 nhịp hình.
- 21 nhãn grammar/layout; không phải 84 bối cảnh độc lập hay 21 bộ asset độc lập.
- 14 micro-hook bằng chữ/hình lấy từ câu hỏi và bước ngoặt của voice hiện tại, có bản Việt.
- Action chính: trao/nhận, xử lý giấy tại quầy, viết/ký, kéo xe, nhóm họp, tiến/rút quân, dân rời cảnh, hạm đội, tuyến bản đồ và đóng hồ sơ.
- Nhạc nền sau opening hạ xuống 0,10; tiếng giấy gắn với tiếp xúc thay vì whoosh mọi cut.
- Màu và visual hồ sơ lịch sử được ưu tiên; camera chủ yếu cố định để hành động dẫn sự chú ý.

## 5. Vị trí code, rig, asset và bảng dựng

Tất cả đường dẫn dưới đây tính từ workspace:

| Chức năng | File / thư mục |
| --- | --- |
| Entry V3, cửa sổ preview, voice và sound cue | `src/episodes/taiwan-after-ww2-action-v3/ActionV3Video.tsx` |
| Chọn layout và hiển thị micro-hook | `src/episodes/taiwan-after-ww2-action-v3/scenes/BeatScene.tsx` |
| Rig SVG, arm joints, pose, prop, foreground hands | `src/episodes/taiwan-after-ww2-action-v3/components/StagePuppet.tsx` |
| Cast, vị trí và travel của actor | `src/episodes/taiwan-after-ww2-action-v3/components/Actor.tsx` |
| Background, bàn và ghế | `src/episodes/taiwan-after-ww2-action-v3/components/Space.tsx` |
| Hồ sơ, tay insert, giấy/bút, flag, label | `src/episodes/taiwan-after-ww2-action-v3/components/Objects.tsx` |
| Dàn cảnh hành động | `src/episodes/taiwan-after-ww2-action-v3/scenes/InteractionScenes.tsx`, `EnvironmentScenes.tsx`, `RecordScenes.tsx`, `StrategyScenes.tsx` |
| Rig/scene opening giữ từ V2 | `components/CharacterPuppet.tsx`, `scenes/Scene01Preview.tsx` trong thư mục V3 |
| Script ID → câu/clip → beat/frame/action/target | `src/episodes/taiwan-after-ww2-action-v3/data/beats.json` |
| Timing voice và caption | `src/episodes/taiwan-after-ww2-action-v3/data/full_timing.json`, `sentences.json`, `captions.json` |
| Micro-hook Hàn–Việt | `src/episodes/taiwan-after-ww2-action-v3/planning/micro_hooks.json` |
| Audio V3 độc lập | `public/episodes/taiwan-after-ww2-action-v3/audio/` |
| Đăng ký composition | `src/Root.tsx` |
| Tạo lại bảng dựng | `src/episodes/taiwan-after-ww2-action-v3/tools/build_beats.py` |
| Kiểm tra continuity/voice/caption/bảo toàn bản cũ | `src/episodes/taiwan-after-ww2-action-v3/tools/check_action_v3.py` |
| Hash của các phiên bản được giữ | `src/episodes/taiwan-after-ww2-action-v3/planning/preserved_versions.json` |

Nhân vật chính là code/SVG; không cần sửa thư viện Remotion. Project đang dùng Remotion 4.0.529. Không nâng dependency chỉ vì plugin có phiên bản khác; kỹ năng/plugin hướng dẫn workflow, còn code episode nằm trong project này.

## 6. Preview và lệnh kiểm tra

Nếu Studio chưa chạy:

```bash
cd /home/anhnt/Documents/Remotion
npm run dev
```

[Preview toàn bộ](http://localhost:3000/TaiwanAfterWW2-ActionV3)

| Preview | Vùng timeline episode |
| --- | --- |
| [First Minute](http://localhost:3000/Taiwan-ActionV3-First-Minute) | frame 810–3051; khoảng 00:27–01:42 |
| [Cairo–Handover](http://localhost:3000/Taiwan-ActionV3-Cairo-Handover) | frame 3052–5416; khoảng 01:42–03:01 |
| [Cold War](http://localhost:3000/Taiwan-ActionV3-Cold-War) | frame 8454–11101; khoảng 04:42–06:10 |

Cửa sổ preview dùng cùng timeline/voice với bản đầy đủ. `Taiwan-ActionV3-B…` là composition để xem từng beat hình, không có full audio pipeline.

Kiểm tra phù hợp khi sửa code:

```bash
cd /home/anhnt/Documents/Remotion
npm run lint
python3 src/episodes/taiwan-after-ww2-action-v3/tools/check_action_v3.py
```

`build_beats.py` sẽ ghi lại `beats.json` và `micro_hooks.json`; nếu sửa trực tiếp hai JSON này, cần đồng bộ generator trước khi chạy lại để tránh mất thay đổi.

## 7. Bằng chứng đã kiểm tra và giới hạn

Đã lưu trong QA V3:

- ESLint và TypeScript qua.
- Timeline sau opening liên tục, đủ câu; voice text/timing/thời lượng/hash giữ nguyên; caption đủ nguyên văn narration.
- 99 file của V2/Staged và các MP4 được giữ có hash không đổi ở lần kiểm tra.
- Seek 84 nhịp trong Studio không có error overlay; kiểm tra thêm 16 frame liên quan sau sửa rig/layer/đạo cụ.
- Playback cửa sổ Cairo–handover tiến từ frame 85 đến 2089, unmuted, không có error overlay.
- Review trực quan nhóm tương tác và các lỗi quan trọng: giấy đổi tay, tay kéo xe, bút/tay/giấy, lớp foreground trên bàn, SVG map/ship trên nền, tay không che tên hồ sơ.

Chưa kiểm chứng:

1. **Cắt nội câu:** 8 câu dài dùng timing ước lượng vì metadata chỉ có SentenceBoundary: `KO-004.2`, `KO-006.1`, `KO-013.2`, `KO-020.2`, `KO-022.2`, `KO-023.2`, `KO-029.3`, `KO-035.2`. Mốc cụ thể trong QA; cần nghe lại trước export, điều chỉnh nếu hình đi trước/sau ý thoại.
2. **Bản mã hóa:** chưa render V3; chưa kiểm tra chất lượng MP4, loudness sau xuất hoặc YouTube nén.
3. **Voice native và retention:** kiểm tra playback không chứng minh phát âm/cách diễn đạt native; chưa có số liệu khán giả để khẳng định giữ chân tốt hơn.

Các cảnh lịch sử/đạo cụ là minh họa dựng lại. Đường bờ Natural Earth phục vụ địa lý, không thể hiện biên giới lịch sử; văn kiện trên hình có nhãn tóm tắt/reconstruction.

## 8. Hành động tiếp theo khi được yêu cầu

Không có yêu cầu render đang chờ. Nhiệm vụ hiện tại là lưu tư duy và bàn giao ngữ cảnh.

Khi người dùng review tiếp: xác định beat/scene cụ thể, kiểm tra sản phẩm thực và sửa V3; giữ script/voice nếu chỉ sửa visual. Khi người dùng yêu cầu xuất: kiểm tra các mốc chưa sync trước, rồi dùng output mới dưới đây. Không tự render sau một yêu cầu sửa code hoặc dựng hoàn thiện.

```bash
cd /home/anhnt/Documents/Remotion
npx remotion render src/index.ts TaiwanAfterWW2-ActionV3 out/taiwan-after-ww2-action-v3/taiwan-after-ww2-ko-action-v3.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2
```

Đây là lệnh đã chuẩn bị, chưa chạy. Không gọi output này là file có sẵn nếu chưa xác nhận tồn tại sau export.

## 9. Prompt dùng khi đổi hội thoại hoặc AI

```text
Tiếp tục project /home/anhnt/Documents/Remotion.
Trước khi làm, đọc AGENTS.md, MASTER_CHANNEL_BIBLE.md,
ANIMATION_DIRECTION_PLAYBOOK.md và EPISODE_HANDOFF.md,
rồi đọc README/QA của bản episode đang được review.
Đối chiếu trạng thái trong tài liệu với file/code thực tế và yêu cầu mới nhất của tôi.
Hiện tại đang review TaiwanAfterWW2-ActionV3; giữ nguyên V2 và Staged.
Áp dụng tư duy action có mục đích, scene grammar và interaction đã ghi.
Sau sửa chỉ mở localhost và đưa lệnh render; chỉ chạy render khi tôi yêu cầu rõ.
Nhiệm vụ tiếp theo của tôi là: [điền yêu cầu].
```

AI khác không tự có filesystem của project thì gửi kèm các file liên quan. Không giả định nó đã nhớ hoặc đọc cuộc trò chuyện cũ.

### YouTube channel setup — 2026-10-02

Đang thiết lập kênh `기묘한 기록실` / `@strangearchivekr` trong YouTube Studio. Người dùng xác nhận cư trú tại Việt Nam; audience vẫn Hàn Quốc. Xem [CHANNEL_SETUP.md](./CHANNEL_SETUP.md) để biết cấu hình và mô tả Hàn–Việt chính xác.

Đã lưu Settings (Studio báo **Settings saved**), xác nhận Vietnam/keyword và audience Not Made for Kids. Sau đó người dùng yêu cầu hoàn thiện **chỉ kênh**, hoãn video/thumbnail/metadata và logo trong video cho tới khi review xong. Điện thoại đã được xác minh (YouTube báo **Phone number verified**, Studio báo **Features enabled**); không lưu số/OTP trong tài liệu.

Đã tạo avatar/banner gốc bằng standalone entry `src/channel-branding/index.tsx` (không sửa code episode), lint/typecheck qua, xuất PNG dưới `out/channel-branding/`. Avatar giữ nguyên; banner đầu được thay theo phản hồi bên dưới. Chi tiết và bản Việt trong CHANNEL_SETUP.md.

Người dùng thấy banner đầu nhàm, yêu cầu tạo lại. Bản mới dùng built-in image_gen, cảnh phòng hồ sơ minh họa có hai nhân vật hư cấu và ánh đèn/bản đồ. File hiện tại: `out/channel-branding/banner-illustrated-final.png` (2560×1440, dưới 6 MB). Người dùng duyệt **“Duyệt, Publish hồ sơ kênh”**. Đã Publish avatar, banner và mô tả; mở https://www.youtube.com/@strangearchivekr và xác nhận hình ảnh bằng mắt, toàn bộ mô tả Hàn trong About và quốc gia Vietnam. Setup kênh hoàn tất; screenshot `out/channel-branding/channel-published.jpg`. Prompt/source được lưu trong project; xem CHANNEL_SETUP.md.

File MP4 V3 hiện có `out/taiwan-after-ww2-action-v3/taiwan-after-ww2-ko-action-v3.mp4`, H.264/AAC, 1920×1080, 478.656 giây, được phát hiện trong filesystem (không render trong nhiệm vụ này). Chưa đánh giá lại bản mã hóa; QA cũ ghi “chưa export” không còn phản ánh sự tồn tại file. Không upload bất kỳ video hoặc thumbnail nào.

## 10. Quy tắc cập nhật bàn giao

### Logo chuẩn của kênh — 2026-10-02

Người dùng yêu cầu lưu logo đẹp ngoài thư mục bị Git ignore. Đã giữ mẫu hồ sơ/con dấu dấu hỏi đỏ cùng avatar kênh, lưu vector và PNG nền trong suốt tại `public/channel-branding/logo/`; hướng dẫn trong README cùng thư mục. `ArchiveMark` dùng SVG chuẩn này. Asset logo được thêm vào Git index, chưa commit. Chưa chèn logo vào video, chưa render MP4 và chưa thay đổi hồ sơ công khai trong nhiệm vụ này.

### Update tiếp theo — logo đã xuất hiện trong Action V3

Sau khi người dùng không thấy logo trong Studio, đã tích hợp `src/channel-branding/ChannelWatermark.tsx` vào ActionV3Video: góc trên phải, opacity 65%, xuyên timeline và preview cửa sổ; preview từng beat dùng cùng component. Header chừa chỗ và bỏ tên kênh lặp cạnh scene ID. Không đổi voice/script/timing, không render MP4. Lint/typecheck và continuity/preserved-file check qua. Đã thấy logo ở frame 0 và cảnh S09/S11 trên Chrome localhost; DOM xác nhận một watermark và ảnh tải thành công. Preview để frame 7032. Bằng chứng: `out/channel-branding/action-v3-watermark-preview.png`. MP4 có sẵn trước đó chưa chứa thay đổi này.

Sau một thay đổi đáng kể hoặc quyết định mới của người dùng, cập nhật ngày, bản đang dùng, status, file/composition/output, QA và điểm còn mở. Giữ phân biệt “đã làm”, “đã kiểm tra”, “người dùng phản hồi” và “chưa kiểm chứng”. Đưa bài học phương pháp vào playbook, quy tắc chung vào Master; không biến chi tiết của một episode thành luật cứng toàn kênh.

### Watermark độc lập + review ending — 2026-10-02

User chốt logo/tên phải dùng chung mọi video và yêu cầu sửa ngay V3. Đã đưa watermark ra khỏi header: top 112/right 58, logo 60%, tên 55%, nền trong suốt, props vị trí/opacity có thể dùng lại. Header chỉ còn scene ID ở mép phải. Quy tắc dùng chung nằm trong Master v1.8; source/asset ngoài thư mục bị Git ignore. Đã xem ending ở frame 13980 / 07:46: watermark không che hook, nhân vật hoặc caption. DOM xác nhận một overlay, SVG tải xong, opacity hai phần đúng. ESLint/TypeScript và continuity/voice/preserved check qua; không render MP4.

Ending hiện có câu hỏi mở trong KO-036 và dư âm trong KO-037, chưa có CTA/bridge/end screen. Không thay narration; review và đề xuất trong `src/episodes/taiwan-after-ww2-action-v3/planning/ENDING_REVIEW.md`. Chưa đủ benchmark 7–30 ngày để gọi một format là trend Hàn. Bằng chứng UI: `out/channel-branding/action-v3-independent-watermark-ending.png`. Lệnh render bản có logo vẫn xuất tên `taiwan-after-ww2-ko-action-v3-watermarked.mp4`.

### Hướng dẫn đăng video đầu tiên — 2026-10-02

User yêu cầu hướng dẫn setup đăng video đầu tiên, thay cho giới hạn trước đó chỉ setup kênh. Đã chuẩn bị `src/episodes/taiwan-after-ww2-action-v3/planning/UPLOAD_PACKAGE.md`: title/mô tả Hàn, bản Việt review, chapter theo clip timing thật, nguồn và quy trình Private → kiểm tra HD/Checks → Public/Schedule. Kiểm tra filesystem: chỉ có MP4 V3 cũ, chưa có bản `-watermarked.mp4`; chưa có thumbnail riêng V3 được xác nhận. Không render, không upload hoặc bấm Publish. UI/policy hướng dẫn đã đối chiếu YouTube Help hiện hành. AI survey cần đối chiếu asset thực tế; không mặc định mọi hoạt hình/AI assistance đều bắt buộc disclosure.

### Hoàn tất upload Private — 2026-10-02

User yêu cầu vào Studio hoàn tất upload, thumbnail bổ sung sau. Khi vào tab đã có bản upload của người dùng: `taiwan-after-ww2-ko.mp4`, video ID `f5XreL3qLxk`, title/mô tả khớp UPLOAD_PACKAGE. File hiện có trong `out/taiwan-after-ww2-action-v3/`, H.264/AAC 1920×1080, 478.656 giây; frame 07:46 xác nhận watermark độc lập mới. Các tên file MP4 trước đó không còn hiện trong thư mục lúc kiểm tra; không giả định đây là bản cũ chỉ vì tên khác.

Đã bổ sung 8 tags, xác nhận Korean/Education/Standard licence, không dành riêng trẻ em, comments On Basic; chọn không có paid promotion. AI survey hỏi ba dạng nội dung giả lập thực: giả lời/hành động người thật, sửa footage sự kiện/địa điểm thật, dựng cảnh giống thật chưa từng xảy ra. Chọn No cho ba dạng này vì hình là code/SVG hoạt hình phi hiện thực, narrator TTS không mạo danh người thật, nhạc nền tổng hợp procedural; đây không phải tuyên bố cả pipeline không dùng AI. Mô tả đã ghi animation và giọng tổng hợp. Giữ nguyên quyền Shorts remix đang bật; không thay đổi quyền trong nhiệm vụ này.

Checks báo **complete — No issues found**. Đã bấm Save ở Visibility với **Private**; danh sách Content xác nhận một video 7:59, Private, Uploaded ngày 2 Oct 2026 và All changes saved. Link https://youtu.be/f5XreL3qLxk. Bằng chứng `out/channel-branding/video-upload-private.png`; kiểm tra watermark từ MP4 `out/channel-branding/upload-file-watermark-check.png`. Không upload trùng, không render và không Publish/Public.

Còn lại: người dùng bổ sung thumbnail rồi review trước Public/Schedule. Chưa thêm end screen/cards hoặc SRT riêng. Studio báo cần Advanced verification để link nguồn trong mô tả có thể bấm được; chưa thực hiện verification mới. No issues found chỉ là kết quả kiểm tra hiện tại của YouTube, không phải bảo đảm tuyệt đối về bản quyền.

### Thumbnail đầu tiên — 2026-10-02

User yêu cầu tạo thumbnail để tự public. Đã dựng standalone bằng Remotion, tái dùng rig/Actor V3 và logo chuẩn, không sửa video. File final `public/channel-branding/thumbnails/taiwan-after-ww2-ko-v2.jpg` (không bị Git ignore), bản giao ở `out/taiwan-after-ww2-action-v3/thumbnail-ko-v2.jpg`, JPEG 1920×1080 khoảng 260 KB. V1 còn ở out; dùng V2 có outline Natural Earth 1:50m đúng tỷ lệ hơn. Headline `대만을 / 왜 못 지켰나?` (Đài Loan / Vì sao không giữ được?), nhân vật Nhật lo lắng, cờ Nhật, đảo đỏ, văn kiện tóm tắt quyền từ bỏ. Source/nguồn dữ liệu và bản Việt trong `src/episodes/taiwan-after-ww2-action-v3/thumbnail/README.md`.

Đã xuất still theo yêu cầu thumbnail, ESLint/TypeScript qua, xem ảnh final kiểm tra chữ/tay/logo/outline. Không dùng image_gen, không render MP4, chưa upload thumbnail, chưa đổi Private hoặc Publish. Người dùng có thể thêm ảnh ở Details → Thumbnail → Save, rồi tự Public sau review. Chưa có dữ liệu CTR để khẳng định hiệu quả.
