# MASTER CHANNEL BIBLE

**Version:** 1.8
**Status:** Approved  
**Production model:** Reference → Analyze → Rebuild → Localize → Render  
**Primary market:** South Korea  
**Publishing language:** Korean  
**Review language:** Vietnamese

Tài liệu này là nguồn quy tắc chính cho mọi video của kênh.

## 1. Định hướng kênh và thị trường

Kênh sản xuất video documentary kể chuyện dành cho khán giả Hàn Quốc. Video xuất bản dùng tiếng Hàn tự nhiên, ưu tiên cách diễn đạt native và ngữ cảnh quen thuộc với người Hàn; không dùng bản dịch máy cứng.

Format mặc định:

- faceless;
- sản xuất bằng AI kết hợp Remotion;
- thời lượng chủ yếu 8–15 phút, có thể dài hoặc ngắn hơn khi câu chuyện thực sự cần;
- narration kết hợp ảnh hoặc minh họa mới, tư liệu có quyền sử dụng, bản đồ, timeline, document visual, typography, ambience và sound design.

Các nhóm chủ đề ưu tiên:

- history;
- science;
- mystery;
- strange true stories.

Trong các nhóm trên, có thể khai thác:

- thảm họa và tai nạn có thật;
- sinh tồn và giải cứu;
- địa điểm nguy hiểm;
- những vụ việc kỳ lạ có đủ dữ kiện để nghiên cứu độc lập.

Remotion là hệ thống dựng và render chính.

Video reference nước ngoài được dùng để nghiên cứu ngôn ngữ sản xuất. Reference không phải nguồn để sao chép nội dung, script, tài sản hoặc thiết kế đặc trưng.

### 1.1. Nhận diện xuyên video

Mọi video xuất bản của `기묘한 기록실` dùng chung logo hồ sơ/con dấu dấu hỏi và tên kênh. Watermark là lớp nền trong suốt độc lập, không thuộc thanh tiêu đề, khung hồ sơ hoặc một scene grammar cụ thể; giữ hiện xuyên timeline kể cả opening và ending.

Nguồn chuẩn: `public/channel-branding/logo/`. Component dùng chung: `src/channel-branding/ChannelWatermark.tsx`. Logo và tên có opacity riêng; mặc định hiện tại 60% và 55%, không thêm nền/khung. Mặc định nằm ở vùng trên phải, tách khỏi header; có thể đổi tọa độ khi che chữ, khuôn mặt, thao tác hoặc thông tin cần đọc. Điều chỉnh nhận diện chung tại component này, không tự tạo một logo khác cho từng episode. Mỗi composition chỉ mount một watermark. Khi tạo episode mới, tích hợp component vào composition chính; việc lưu asset không tự thêm watermark vào video.

## 2. Nguyên tắc cốt lõi

Mỗi video có thể bắt đầu từ một video reference nước ngoài. AI phải nghiên cứu reference để hiểu:

- chủ đề và hook;
- cấu trúc câu chuyện và thứ tự thông tin;
- pacing và độ dài từng phần;
- kiểu narration;
- số lượng, chức năng và thời lượng scene;
- loại visual và cách sử dụng ảnh;
- chuyển cảnh, map, quote và document visual;
- music, ambience, silence và sound effects;
- thumbnail, title và CTA.

Sau đó AI phải **tái xây dựng video từ đầu dựa trên các nguyên tắc đã phân tích**.

Không sao chép video reference.

## 3. Đầu vào chuẩn

```text
REFERENCE_VIDEO
+
MASTER_CHANNEL_BIBLE
+
TARGET_MARKET = South Korea
+
TARGET_LANGUAGE = Korean
+
REVIEW_LANGUAGE = Vietnamese
```

## 4. Giai đoạn 1 — Reference analysis

### 4.1. Story structure

Phân tích cấu trúc có timestamp, ví dụ:

```text
00:00 Hook
00:25 Title
00:38 Context
02:05 First anomaly
04:10 Witness
06:20 Discovery
08:35 Main theory
10:15 Alternative theory
11:20 Ending
```

### 4.2. Scene map

Phân tích scene-by-scene:

```text
Scene 01
duration: 7 sec
type: illustration
purpose: hook

Scene 02
duration: 4 sec
type: title

Scene 03
duration: 9 sec
type: location establishing

Scene 04
duration: 12 sec
type: character illustration
```

### 4.3. Visual grammar

Xác định:

- shot duration;
- camera speed;
- zoom amount;
- pan direction;
- contrast;
- grain;
- lighting;
- composition;
- typography;
- map style;
- document style.

### 4.4. Narrative grammar

Phân tích:

- độ dài câu;
- tốc độ narration;
- cách mở mystery;
- thời điểm reveal thông tin;
- thời điểm đặt câu hỏi;
- thời điểm chuyển theory;
- cách kết thúc.

### 4.5. Audio grammar

Phân tích:

- music intensity;
- ambient layer;
- silence;
- transition SFX;
- specific SFX.

## 5. Giai đoạn 2 — Content reconstruction

AI không được dịch nguyên script hoặc dịch line-by-line. AI phải nghiên cứu chủ đề độc lập và viết một script tiếng Hàn mới.

Script mới phải giữ:

- logic câu chuyện;
- dữ kiện đã được xác minh;
- nhịp reveal;
- cấu trúc storytelling phù hợp.

Script phải:

- được viết lại hoàn toàn;
- tự nhiên như nội dung được viết trực tiếp cho người Hàn;
- có narration riêng;
- không giữ nguyên câu chữ;
- không phụ thuộc reference như nguồn duy nhất.

Mỗi script tiếng Hàn phải có một bản tiếng Việt song song để chủ kênh kiểm tra. Hai bản phải dùng cùng ID chương, scene và đoạn narration để có thể đối chiếu chính xác. Bản tiếng Hàn là bản chuẩn để tạo voice, caption và video xuất bản; bản tiếng Việt là bản review nội dung và phải giữ đúng ý nghĩa, mức độ chắc chắn và sắc thái của bản tiếng Hàn.

### 5.0. Hook mở đầu bắt buộc

Mọi video phải mở bằng một hook rõ ràng trong khoảng 5–10 giây đầu. Hook đi theo thứ tự:

```text
sự thật gây chú ý
→ nghịch lý hoặc thay đổi bất ngờ
→ câu hỏi chính của video
```

Hook phải nêu đúng câu hỏi mà phần còn lại của video sẽ giải đáp. Sau hook mới chuyển sang bối cảnh. Không mở bằng lời giới thiệu chung, danh sách dữ kiện hoặc visual đẹp nhưng thiếu câu hỏi kể chuyện.

Mạch nội dung sau hook phải tuyến tính: một ý dẫn sang ý tiếp theo, mỗi scene phục vụ trực tiếp câu hỏi chính và không chèn thông tin ngoài mạch chỉ để tăng thời lượng.

### 5.1. Bám sườn video reference

Khi nhiệm vụ là rebuild một video reference, bản mới được viết lại câu chữ nhưng không được tự ý lệch quá xa khỏi sườn nội dung nguồn.

Phải giữ, trừ khi research chứng minh reference sai hoặc thiếu căn cứ:

- câu hỏi trung tâm;
- các luận điểm và dữ kiện chính;
- quan hệ nguyên nhân–kết quả;
- thứ tự các chặng lớn của câu chuyện;
- chức năng của từng nhóm cảnh;
- hướng đi và kết luận chính của video.

Có thể gộp, tách, mở rộng hoặc rút gọn một đoạn để phù hợp tiếng Hàn và nhịp kể mới, nhưng phải lập mapping rõ ràng:

```text
REFERENCE TIMESTAMP
→ REFERENCE NARRATIVE BEAT
→ NEW SCRIPT ID
→ NEW SCENE ID
→ NEW VISUAL FUNCTION
```

Không được bỏ một khối thông tin quan trọng của reference chỉ để video dễ dựng. Chỉ loại bỏ nội dung khi nội dung đó sai, trùng lặp, không thể kiểm chứng hoặc không phù hợp với mục tiêu episode; lý do phải được ghi trong research hoặc scene map.

### 5.2. Đồng bộ narration và hình ảnh

Hình ảnh phải bám đúng nội dung narration đang được nói. Khi narration chuyển sang nhân vật, địa điểm, văn kiện, mốc thời gian hoặc luận điểm mới, visual cũng phải chuyển hoặc đưa tín hiệu tương ứng trong cùng nhịp dựng.

Quy tắc bắt buộc:

- không dùng một cảnh không liên quan chỉ để lấp thời lượng;
- không để narration kết thúc nhưng hình tiếp tục kéo dài nếu không có chủ ý về nhịp, cảm xúc hoặc âm thanh;
- không cho visual tiết lộ thông tin quan trọng quá sớm so với narration;
- không để visual đi chậm hơn narration đến mức người xem đang nhìn ý cũ trong khi voice đã sang ý mới;
- timing scene phải chốt theo voice thật, không ép voice vào timestamp ước tính;
- khoảng im lặng chỉ được dùng có chủ ý cho hook, reveal, chuyển chương hoặc kết luận và phải được ghi trong audio plan.

Mật độ lời có thể dày hoặc mỏng hơn reference, nhưng chức năng cảnh và thông tin đang được minh họa không được lệch đáng kể. Mỗi scene trong bản dựng cuối phải truy ngược được về script ID và narrative beat tương ứng.

## 6. Research và kiểm chứng

Reference chỉ giúp phát hiện câu chuyện và phân tích cách kể. Mọi dữ kiện quan trọng phải được kiểm tra lại bằng nguồn độc lập.

Khi tìm chủ đề và đánh giá cơ hội thị trường, ưu tiên keyword, kênh và video mới nhất, đặc biệt dữ liệu trong 7–30 ngày gần đây. Với thông tin factual, vẫn phải dùng nguồn gốc hoặc nguồn có thẩm quyền phù hợp; quy tắc 7–30 ngày áp dụng cho phát hiện xu hướng và benchmark, không thay thế việc kiểm chứng dữ kiện lịch sử hoặc khoa học.

Benchmark ưu tiên:

- kênh nhỏ và trung bình có video mới đạt view cao;
- tốc độ tăng view của video mới;
- tỷ lệ view so với subscriber;
- nhiều video gần đây cùng đạt kết quả tốt;
- format có thể tái tạo bền vững bằng AI và Remotion.

Không chọn benchmark chỉ dựa trên tổng subscriber hoặc tổng view lịch sử của kênh.

Cần lưu:

- nguồn cho tên, ngày tháng, địa điểm và con số;
- điểm còn tranh cãi hoặc chưa xác minh;
- phân biệt fact, testimony, allegation và theory;
- quyền sử dụng hoặc attribution của tư liệu;
- những chi tiết đã được điều chỉnh hoặc loại bỏ so với reference.

Không biến theory thành fact và không thêm chi tiết chỉ để tăng kịch tính.

## 7. Localization cho thị trường Hàn Quốc

Localization không chỉ là dịch. AI phải điều chỉnh cho người xem Hàn Quốc:

- cách giải thích địa danh;
- đơn vị đo;
- ngày tháng;
- background context;
- thuật ngữ;
- cách gọi nhân vật;
- level kính ngữ và nhịp câu phù hợp với narration;
- cách người Hàn tiếp nhận câu chuyện.

Ví dụ, thay vì dịch máy móc:

```text
The cabin was approximately three miles from the road.
```

Có thể chuyển thành câu tiếng Hàn tự nhiên, đồng thời ghi bản tiếng Việt tương ứng để review. Không giữ cấu trúc câu tiếng Anh nếu cách diễn đạt đó thiếu tự nhiên trong tiếng Hàn.

```text
KO: 오두막은 가장 가까운 도로에서도 약 5km 떨어진 깊은 숲속에 있었습니다.
VI: Căn nhà nằm sâu trong rừng, cách con đường gần nhất khoảng 5 km.
```

Title và thumbnail phải được phát triển theo gu click và thói quen đọc của người Hàn. Không bê nguyên cấu trúc title, mật độ chữ, typography hoặc cách giật hook của thị trường Mỹ sang bản Hàn. Thumbnail text, nếu có, phải ngắn, tự nhiên và dễ đọc trên mobile bằng tiếng Hàn.

## 8. Scene recreation

Mỗi scene reference phải được xem như một **function**, không phải một **asset to copy**.

Ví dụ:

```text
Reference: old photograph of forest
New version: original dark forest illustration with the same narrative purpose
```

```text
Reference: close-up photograph of a documented person
New version: original illustrated portrait based only on documented appearance
```

```text
Reference: map animation
New version: new Remotion map built from independently researched locations
```

AI phải hỏi: **“Scene này tồn tại để làm gì?”** thay vì **“Làm sao để giống y nguyên scene này?”**

Ví dụ:

```text
Reference scene:
snow-covered abandoned tent, slow push-in

Narrative purpose:
show the first physical evidence

New scene:
wide illustrated snowfield
→ tent silhouette
→ slow camera push
→ location label
```

Mục tiêu kể chuyện có thể tương đồng. Hình ảnh và cách triển khai phải mới.

## 9. Giới hạn tương đồng hình ảnh

Được học và tái áp dụng:

- mood;
- pacing;
- category of shot;
- information architecture;
- scene function;
- general documentary language.

Không tái tạo:

- exact composition;
- exact artwork hoặc footage;
- exact frame;
- exact text;
- exact thumbnail;
- exact graphic layout nếu có tính nhận diện cao;
- logo, watermark hoặc trade dress của reference.

## 10. Remotion rebuild

Sau reference analysis, mỗi scene phải đi qua hệ thống:

```text
reference_scene
→ scene_function
→ new_scene_design
→ Remotion component
→ new asset
```

Ví dụ:

```text
Reference:
Old newspaper image

Function:
Introduce public reporting

New implementation:
<DocumentScene />

Asset:
Newly generated newspaper-style visual

Text:
Facts from independently sourced reporting
```

### 10.1. Diễn xuất và blocking cho video dùng nhân vật rig

Phần này áp dụng bắt buộc cho episode sử dụng nhân vật animation rig. Chất lượng asset nhân vật không đủ để tạo ra một scene hấp dẫn; nhân vật phải **thực hiện hành động kể chuyện** và tương tác với không gian, đạo cụ hoặc nhân vật khác.

Không cấm lặp hoàn toàn. Cảnh cần giải thích, phát biểu hoặc dẫn chuyện vẫn có thể dùng nhân vật đứng nói nếu đó là cách kể rõ nhất. Tuy nhiên, loop và bố cục lặp chỉ được dùng có kiểm soát, với tỷ lệ thấp, và phải được xen kẽ bằng action, tương tác, thay đổi góc máy hoặc scene không nhân vật phù hợp với nội dung.

Không được để một công thức bố cục chiếm phần lớn video, đặc biệt:

- một nhân vật đứng bên trái và một nhân vật đứng bên phải;
- infographic hoặc document nằm giữa;
- nhân vật chỉ nhấp mắt, nói, chỉ tay hoặc cầm giấy;
- cùng một pose được giữ suốt toàn bộ scene;
- nhân vật xuất hiện như vật trang trí nhưng không tham gia vào narrative beat.

Mỗi scene có nhân vật rig phải xác định rõ:

```text
CHARACTER ROLE
STARTING POSITION
ACTION BEAT
INTERACTION TARGET
EMOTIONAL CHANGE
ENDING POSITION
CAMERA SHOT
PROP
```

Các nhóm action cần được phát triển và sử dụng phù hợp với nội dung:

- di chuyển: walk, march, run, approach, retreat, turn, sit, stand, kneel;
- quân sự: rifle-ready, rifle-lowered, rifle-sling, bayonet, spear, sword, salute, surrender, escort;
- văn kiện: read, sign, stamp, pass, receive, fold, point-at-document;
- ngoại giao: sit-at-table, lean-forward, argue, whisper, vote, exchange-folder;
- dân sự: queue, protest, carry-box, celebrate, hide, flee, observe;
- phản ứng: recoil, hesitate, look-back, confront, lower-head, surprise, relief.

Súng, giáo, kiếm và trang bị quân sự chỉ xuất hiện khi đúng bối cảnh lịch sử và đúng chức năng scene. Không thêm vũ khí ngẫu nhiên chỉ để tăng chuyển động. Ngược lại, khi narration mô tả chiến tranh, tiến quân, đàn áp, đầu hàng hoặc xung đột quân sự, cần ưu tiên action và đạo cụ phù hợp thay vì tiếp tục để nhân vật đứng nói.

Trong toàn video phải phối hợp nhiều kiểu blocking:

- một nhân vật cận cảnh;
- hai nhân vật tương tác trực tiếp;
- nhóm 3–7 nhân vật;
- đội hình hoặc đám đông có lớp foreground, midground và background;
- nhân vật đi vào hoặc rời khung hình;
- nhân vật thay đổi vị trí trong cùng scene;
- scene không nhân vật khi map, document hoặc object tự nó kể chuyện tốt hơn.

Camera phải thay đổi có chủ ý giữa wide, medium, close-up và insert. Không giữ toàn bộ episode ở một cỡ cảnh cố định. Action, camera và visual phải đổi theo narration beat, không chạy animation chỉ để làm khung hình bận hơn. Loop idle, blink, mouth và body sway được phép dùng để giữ nhân vật sống, nhưng không được coi là action chính và không được thay thế diễn xuất theo nội dung.

Trong một scene dài, nhân vật cần có nhiều action beat nối tiếp, ví dụ:

```text
đi vào khung hình
→ nhìn bản đồ
→ chỉ vị trí
→ trao văn kiện
→ phản ứng khi con dấu được đóng
```

Trước final render phải lập **action coverage check**:

- đếm số lần dùng từng pose và action;
- phát hiện bố cục trái–phải bị lặp;
- kiểm tra scene nào nhân vật không có chức năng kể chuyện;
- kiểm tra tay, cánh tay, vũ khí và đạo cụ không bị che, đứt hoặc xuyên qua cơ thể;
- kiểm tra action khớp đúng thời điểm narration;
- so sánh mật độ diễn xuất với reference ở cấp độ chức năng, không sao chép hoạt họa hoặc bố cục đặc trưng.

Nếu phần lớn scene vẫn chỉ là nhân vật đứng cạnh infographic, episode chưa đạt chuẩn final dù asset, voice và nội dung đã hoàn chỉnh.

### 10.2. Thứ tự cải thiện và tài liệu directing

Với episode dùng nhân vật rig, ưu tiên theo thứ tự đã chốt:

```text
action có ý nghĩa
→ giảm cảm giác slide
→ đa dạng scene grammar
→ micro-hook xuyên video
→ interaction giữa character–object–environment
→ polish transition, camera và effect
```

Micro-hook phải xuất phát từ câu hỏi, khoảng trống thông tin hoặc bước ngoặt thật trong script và được phát triển ở các beat tiếp theo. Không thêm dữ kiện chưa kiểm chứng để tạo hook. Số lượng micro-hook, scene và actor là lựa chọn theo episode, không phải chỉ tiêu cứng của kênh.

Phương pháp, lý do lựa chọn và bài học review được duy trì trong [ANIMATION_DIRECTION_PLAYBOOK.md](./ANIMATION_DIRECTION_PLAYBOOK.md). Phần directing này áp dụng cho format có rig; các format khác chọn visual grammar phù hợp riêng.

## 11. Reference-to-Remotion table

Mỗi episode phải có bảng:

```text
REFERENCE SCENE
PURPOSE
NEW SCENE
ASSET REQUIRED
COMPONENT
DURATION
AUDIO
```

Ví dụ:

```text
Reference scene: 00:45–00:54
Purpose: Introduce forest
New scene: Night forest establishing shot
Asset: forest_01.png
Component: AtmosphereScene
Duration: 9 sec
Audio: wind_low.wav
```

## 12. Prompt generation

AI phải viết prompt riêng cho từng asset cần tạo. Prompt phải mô tả nội dung, bố cục, ánh sáng, chất liệu, màu sắc, tỷ lệ khung hình và các điều cần loại trừ.

Không dùng tên kênh hoặc nghệ sĩ làm shortcut, ví dụ:

```text
create image like [channel name]
```

Thay bằng mô tả visual cụ thể:

```text
dark editorial documentary illustration,
dense pine forest at night,
single weak flashlight in the distance,
desaturated charcoal and muted blue palette,
deep shadows,
subtle fog,
hand-painted texture,
realistic proportions,
restrained lighting,
cinematic 16:9 composition,
no text
```

## 13. Full A–Z output

Mỗi video reference phải tạo ra package:

```text
01_reference_analysis.md
02_story_structure.md
03_verified_research.md
04a_korean_script.md
04b_vietnamese_review_script.md
05_scene_map.json
06_asset_manifest.json
07_image_prompts.json
08_audio_plan.json
09_episode.json
10_thumbnail_plan.md
11_title_options.md
12_remotion_render/
```

## 14. Master workflow

```text
SELECT REFERENCE
        ↓
WATCH / ANALYZE
        ↓
EXTRACT STRUCTURE
        ↓
EXTRACT SCENE FUNCTIONS
        ↓
RESEARCH ORIGINAL SUBJECT
        ↓
WRITE NEW KOREAN SCRIPT + PARALLEL VIETNAMESE REVIEW
        ↓
REBUILD STORYBOARD
        ↓
GENERATE NEW VISUAL PROMPTS
        ↓
CREATE NEW ASSETS
        ↓
GENERATE VOICE
        ↓
CREATE SOUND PLAN
        ↓
BUILD episode.json
        ↓
BUILD / EDIT REMOTION + CODE CHECKS
        ↓
LOCALHOST STUDIO PREVIEW + USER REVIEW
        ↓
COMPARE PACING WITH REFERENCE
        ↓
QA
        ↓
THUMBNAIL + TITLE
        ↓
RENDER COMMAND (USER RUNS OR EXPLICITLY REQUESTS RENDER)
        ↓
FINAL VIDEO
```

### 14.1. Preview trước, render khi được yêu cầu

Sau khi tạo hoặc sửa video, mặc định chỉ hoàn thiện code, chạy các kiểm tra phù hợp và cung cấp cách mở Remotion Studio trên localhost để chủ kênh kiểm tra trước. Kèm lệnh render chính xác cho composition và đường dẫn output để chủ kênh tự chạy.

Không tự động render MP4, clip preview hoặc bộ frame sau mỗi lần sửa. Chỉ chạy render khi chủ kênh yêu cầu rõ. Yêu cầu dựng hoàn thiện hoặc sửa video tự nó không được coi là yêu cầu xuất video. Nếu chưa render, phải ghi đúng trạng thái là đã sửa code và sẵn sàng preview, không gọi đó là bản xuất hoàn chỉnh.

## 15. Final quality test

### Story

Video mới có sức hấp dẫn và cấu trúc rõ ràng không?

### Pacing

Nhịp dựng có đạt mục tiêu của episode và tương đương mức hiệu quả đã phân tích từ reference không?

### Visual

Visual language có đúng mood trong khi asset và composition hoàn toàn mới không?

### Script

Script tiếng Hàn có phải nội dung mới, tự nhiên như người Hàn viết và không phải bản dịch line-by-line không? Bản tiếng Việt song song có khớp ý, dữ kiện, mức độ chắc chắn và ID đoạn với bản tiếng Hàn không?

### Research

Các facts quan trọng có được kiểm tra độc lập và ghi nguồn không?

### Remotion

Mỗi scene có được triển khai bằng component phù hợp, deterministic và render ổn định không?

### Localization

Người Hàn có hiểu câu chuyện mà không cần biết trước context nước ngoài không? Title, thumbnail và cách diễn đạt có phù hợp thị trường Hàn Quốc không?

### Rights

Mọi asset có nguồn gốc, quyền sử dụng hoặc attribution rõ ràng không?

## 16. Core rule

Mục tiêu của hệ thống không phải:

> COPY THE VIDEO.

Mục tiêu là:

> RECONSTRUCT THE PRODUCTION LOGIC.

Sau đó:

> REBUILD IT AS AN ORIGINAL KOREAN VIDEO FOR THE SOUTH KOREAN MARKET.

## 17. AI memory rule

Khi bắt đầu hội thoại mới hoặc chuyển AI, đọc Master và [EPISODE_HANDOFF.md](./EPISODE_HANDOFF.md), rồi đọc README/QA của episode hiện tại. Với video có rig, đọc thêm [ANIMATION_DIRECTION_PLAYBOOK.md](./ANIMATION_DIRECTION_PLAYBOOK.md). [AGENTS.md](./AGENTS.md) là điểm hướng dẫn đọc tài liệu cho agent trong workspace.

Master giữ quy tắc chung; playbook giữ phương pháp và lý do; handoff giữ trạng thái, đường dẫn và phần chưa kiểm chứng. Sau quyết định hoặc thay đổi đáng kể, cập nhật đúng tài liệu tương ứng. Không coi QA cũ là bằng chứng cho code đã thay đổi tiếp, và không biến thông số riêng của một episode thành luật toàn kênh.

Mọi AI làm việc trong dự án phải mặc định hiểu:

> Reference video = production blueprint.

Reference không phải source material để sao chép.

AI phải học:

- cấu trúc;
- pacing;
- storytelling;
- scene logic;
- production techniques.

Sau đó tạo:

> recent-market research + independently verified facts + new Korean script + parallel Vietnamese review script + new storyboard + new visuals + new Korean narration + new Remotion render.
