"""Regenerate production documents from the measured narration timeline."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]
EP=ROOT/'src/episodes/korea-no-monarchy'; P=EP/'planning'
t=json.loads((EP/'data/timing.json').read_text()); beats=t['beats']
def save(name,text): (P/name).write_text(text,encoding='utf-8')
def jsave(name,data): save(name,json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def tc(fr):
 s=round(fr/30);return f'{s//60:02d}:{s%60:02d}'
SOURCES={
 'R1':dict(title='Joseon annals / National Archives chronology',publisher='National Institute of Korean History; National Archives of Korea',urls=['https://sillok.history.go.kr/search/inspectionList.do','https://www.archives.go.kr/archivesdata/upFile/palgan/1310027668203.pdf'],supports='Joseon 1392; dynasty and empire lasted over five centuries.'),
 'R2':dict(title='대한제국의 성립과 광무개혁',publisher='National Institute of Korean History',urls=['https://contents.history.go.kr/front/ht/view.do?levelId=ht_003_0010','https://contents.history.go.kr/front/km/view.do?levelId=km_014_0070_0050_0010'],supports='1897 empire; Gojong reforms and diplomacy; Russo-Japanese War and 1905 loss of diplomatic rights.'),
 'R3':dict(title='순종실록 해제; 한일병합',publisher='National Institute of Korean History',urls=['https://sillok.history.go.kr/popup/haejae.do?id=kzb&sillokName=%EC%88%9C%EC%A2%85%EC%8B%A4%EB%A1%9D','https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n401800'],supports='1910 annexation ended the independent imperial state; Sunjong reduced to Yi Wang. Members of the family survived.'),
 'R4':dict(title='정미칠조약 and forced abdication',publisher='National Institute of Korean History',urls=['https://contents.history.go.kr/mobile/tg/view.do?ganada=&levelId=tg_004_1380&pageUnit=10&subjectCode=all&tabId=02','https://contents.history.go.kr/front/kc/printViewPopup.do?levelId=kc_i403100'],supports='Hague envoys, forced abdication in 1907, Resident-General intervention in laws and appointments.'),
 'R5':dict(title='이은 (李垠)',publisher='Academy of Korean Studies',urls=['https://encykorea.aks.ac.kr/Article/E0045473'],supports='1907 child hostage; Japanese education and military career; 1920 political marriage; succession to family rank in 1926; delayed return; ill at return under Park in 1963.'),
 'R6':dict(title='FRUS 1945: Korea occupation and trusteeship discussions',publisher='US Department of State, Office of the Historian',urls=['https://history.state.gov/historicaldocuments/frus1945v06/d812','https://history.state.gov/historicaldocuments/frus1945v07/d614','https://history.state.gov/historicaldocuments/frus1945v06/d801'],supports='Actual US/Soviet occupation; four-power trusteeship proposal including UK and China was distinct from occupation zones.'),
 'R7':dict(title='Korean conflict, armistice, Korea Divided',publisher='US National Archives; US Army Center of Military History',urls=['https://www.archives.gov/education/lessons/korean-conflict','https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state','https://history.army.mil/Research/Reference-Topics/Army-Campaigns/Brief-Summaries/Korean-War/','https://www.govinfo.gov/content/pkg/GOVPUB-D101-PURL-gpo38677/pdf/GOVPUB-D101-PURL-gpo38677.pdf'],supports='1945 division, 1948 states, Soviet backing of Kim, 1950 war and 1953 armistice.'),
 'R8':dict(title='대한민국 임시헌장 (1919)',publisher='Korean National Law Information Center; NIKH',urls=['https://law.go.kr/lsInfoP.do?lsiSeq=91873','https://contents.history.go.kr/mobile/ta/view.do?levelId=ta_h62_0040_0030_0020'],supports='Article 1 declared a democratic republic before liberation.'),
 'R9':dict(title='대한민국헌법: 1948 founding constitution',publisher='Korean National Law Information Center',urls=['https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=53081&viewCls=lsRvsDocInfoR'],supports='Articles 1 and 2: democratic republic and sovereignty vested in the people. Screen shows a marked summary, not a facsimile.'),
 'R10':dict(title='복벽주의; 대동단',publisher='NIKH; Academy of Korean Studies; National Archives of Korea',urls=['https://contents.history.go.kr/front/hm/view.do?levelId=hm_123_0112','https://encykorea.aks.ac.kr/Article/E0015979','https://www.archives.go.kr/next/common/archivedata/render.do?filePath=2F757046696c652F70616C67616E2F32303036303632383136343635313230332E706466'],supports='Restoration ideas existed; Yi Gang attempted escape with Daedongdan in 1919. Royal family should not be treated uniformly.'),
 'R11':dict(title='1948.7.20: election of the first president',publisher='National Election Commission Election Museum; US Department of State; AKS',urls=['https://museum.nec.go.kr/eng/eexh/eexh_1948_07_20.html','https://history.state.gov/historicaldocuments/frus1948v06/d860','https://history.state.gov/historicaldocuments/frus1948v06/d843','https://encykorea.aks.ac.kr/Article/E0044938'],supports='Rhee anti-communist politics; constituent National Assembly elected president 20 July 1948, not a direct American presidential appointment.'),
 'R12':dict(title='Treaty of Shimonoseki, Article 1',publisher='US Department of State; Japan Center for Asian Historical Records',urls=['https://history.state.gov/historicaldocuments/frus1895p1/d203','https://www.jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/smart/glossary/g004.html'],supports='Japan won Sino-Japanese War; Qing recognized Korean independence and relinquished tributary claims.'),
 'R13':dict(title='1963년 11월 22일 영친왕 귀국',publisher='National Archives of Korea',urls=['https://theme.archives.go.kr/next/daily/viewMain.do?selectDay=20121122'],supports='Yi Un returned from Japan in 1963; not a restoration of monarchy.'),
}
jsave('sources.json',SOURCES)
save('01_reference_analysis.md','''# Phân tích reference — Korea monarchy

Reference: `/home/anhnt/Videos/YTSave_YouTube_Media_H81yzdnxFGY_Why-didn-t-Korea-restore-its-monarchy-after-World-War-2-Short-Animated-Documenta_002_720p.mp4`.

## Bằng chứng và giới hạn

ffprobe: 205,148 giây; 1280×720; H264/AAC. Đã đọc toàn bộ transcript tiếng Anh có timestamp, kiểm tra 26 ảnh nguồn cách nhau 8 giây và contact sheet. Nội dung chính khoảng 00:00–02:53; 02:53–03:25 là patron outro. Đây là audit transcript + sampled frames, không phải xem/nghe từng frame hoặc đánh giá toàn bộ diễn xuất âm thanh theo thời gian thực. Transcript tự động có thể sai tên riêng; research độc lập quyết định cách viết.

Ảnh phân tích ở `out/korea-no-monarchy/reference-review/`, có thể xóa và trích lại từ reference. Chúng không nằm trong public/ và không được dùng trong composition xuất bản. Raw transcript lưu tại `planning/reference-transcript.json` chỉ phục vụ research.

## Các chặng lớn

| Nguồn | Ý và chức năng cảnh | Bản mới |
| --- | --- | --- |
| 00:00–00:20 | 500 năm, 1910/1945, câu hỏi vì sao không phục hồi | K01–K03: vua → ngai trống → câu hỏi |
| 00:20–00:55 | Thanh–Nhật, Đại Hàn, Nga, 1905, ngoại giao | K04–K08: bản đồ sức ép, cung điện, quyền ngoại giao |
| 00:55–01:14 | Gojong, Sunjong, 1910, 1926 | K09–K13: đổi người trên ngai, quầy pháp lệnh, cổng đóng, hồ sơ kế vị |
| 01:14–01:43 | Giải phóng, chia đôi, các cường quốc | K14–K17: đám đông, vĩ tuyến 38, nhóm bàn; phân biệt occupation/trusteeship |
| 01:43–02:07 | 35 năm, hoàng gia và Yi Un | K18–K24: hồ sơ, trẻ bị đưa sang Nhật, lý lịch; thêm Yi Gang/1919 để tránh đánh đồng |
| 02:07–02:35 | Rhee/Mỹ, chính quyền Bắc, quân chủ không trở lại | K25–K29: nhóm bàn, lá phiếu, hiến pháp, hai nước |
| 02:35–02:53 | Chiến tranh, hồi hương 1963, kết luận | K30–K36: dân sơ tán, cửa bị chặn, xe lăn, ba nguyên nhân, ngai trống |
| 02:53–03:25 | Patron outro | Bỏ vì thuộc kênh nguồn |

## Ngôn ngữ sản xuất học được

Nhân vật gọn, silhouette rõ; background định vị nơi chốn; cắt giữa wide group, đơn nhân vật, bản đồ và biển thông tin. Props giúp cụ thể hóa luận điểm. Học chức năng này, không trace hình/nhân vật, bố cục đặc trưng hay dùng tiếng nói/nhạc nguồn. Không bịa lời phát biểu cho nhân vật thật.

Bản mới 6:21 gần gấp đôi phần nội dung chính nguồn vì thêm nền tảng cộng hòa 1919/1948 và hoàn cảnh cưỡng ép của người kế vị. Đổi lại nhịp thông tin chậm hơn reference, cần người dùng review retention. Không cố kéo đủ 8–15 phút.
''')
research='''# Research độc lập và những điều chỉnh

Ngày nghiên cứu: 02/10/2026. Chỉ dùng cơ quan sử học, cơ quan lưu trữ, văn kiện và cơ sở học thuật chính thức. `sources.json` là manifest nguồn, script/scene map truy ngược theo ID R1–R13.

## Sửa so với reference

- 1910 là chấm dứt nhà nước Đại Hàn độc lập và quyền cai trị, không phải mọi thành viên hoàng gia biến mất.
- 1926 Yi Un kế thừa địa vị hoàng gia, không trở thành hoàng đế cai trị một nước độc lập. Không cần giữ chi tiết “không có con” để giải thích đoạn này.
- Hai khu tiếp nhận đầu hàng Mỹ/Liên Xô khác với đề xuất quản thác bốn cường quốc. Không dùng câu đùa Anh là nước quân chủ để làm nguyên nhân quyết định.
- Không giữ lời đùa Mỹ bổ nhiệm Rhee vì người này trả tiền; thay bằng bầu tổng thống tại Quốc hội ngày 20/7/1948.
- Không quy toàn bộ hoàng gia thành cộng tác viên. Yi Un bị đưa đi từ nhỏ, kết hôn chính trị; thêm Yi Gang năm 1919 như trường hợp khác.
- Không khẳng định bạo lực của Rhee là chiến dịch riêng nhằm triệt hạ người ủng hộ quân chủ khi chưa có chứng cứ cho quan hệ đó.
- Hồi hương năm 1963 xảy ra dưới thời Park, không phải “Rhee bỏ lệnh cấm năm 1963”. Yi Un bị bệnh; minh họa bằng xe lăn, không đi bộ đăng quang.
- Hiến chương 1919 và Hiến pháp 1948 là bổ sung có nguồn, giúp người Hàn hiểu nền tảng cộng hòa. Flashback có ghi rõ năm.
- 38° N là vĩ tuyến thật trên projection, không dùng đường biên Hàn–Triều hiện đại làm ranh giới năm 1945.

## Mức độ chắc chắn

Ngày tháng, văn kiện, người và trình tự là facts có nguồn. “Ba nhóm thay đổi cùng làm phục hồi quân chủ khó xảy ra”, “lý lịch là gánh nặng chính trị”, “chiến tranh đẩy phục hồi xa hơn” là tổng hợp giải thích của biên tập, không phải trích dẫn quyết định hay phát biểu của một cá nhân. Không coi một người/nước là nguyên nhân duy nhất. “Hai nước đều mang danh nghĩa cộng hòa” không hàm ý hai chế độ tương đương hoặc cùng dân chủ.

Hội nghị, cửa xuất cảnh, cảnh bị chặn và cung điện là minh họa khái niệm. Không giả làm footage chứng cứ hoặc phục dựng chính xác địa điểm, trang phục hay từng hành động. Không có lời thoại bịa gán cho người thật.

## Nguồn theo ID

'''
for k,v in SOURCES.items():
 research+=f"### {k} — {v['title']}\n\n{v['publisher']}. {v['supports']}\n\n"+'\n'.join(f'- [{v["title"]}]({u})' for u in v['urls'])+'\n\n'
save('03_verified_research.md',research)
structure='# Mạch kể và timing theo voice thật\n\nHook → đế quốc mất quyền → giải phóng/chia đôi → người kế vị → nền tảng cộng hòa → hai nhà nước/chiến tranh → hồi hương khác với phục hồi quân chủ → kết luận.\n\n'
last=''
for b in beats:
 if b['chapter']!=last:
  structure+=f"\n## {tc(b['startFrame'])} · {b['chapter']}\n\n";last=b['chapter']
 structure+=f"- {b['id']} / {b['scriptId']}: {tc(b['startFrame'])}–{tc(b['startFrame']+b['durationInFrames'])}; {b['grammar']}/{b['mode']}; nguồn từ ~{b['refStart']}s.\n"
structure+='\nMicro-hook: K02 câu hỏi chính; K10 thay vua ≠ chủ quyền; K12 hoàng gia tồn tại ≠ quyền cai trị; K17 ai là chủ thể quyền lực; K21 lý lịch và cưỡng ép; K24 cộng hòa có từ trước giải phóng; K26 bổ nhiệm hay bầu cử; K34 người trở về ≠ vương quyền. Chúng nằm trong voice hoặc reveal tại scene, không thêm câu hỏi vô căn cứ.\n'
save('02_story_structure.md',structure)
# Concrete blocking notes, distinct from generalized directing principles.
D={
 'hook':('gojong, attendant ×2','ngai/cung','Frame 0–50: vua lớn giữa cung, hai quan hầu thấp hơn. Frame 51–148: match cut cùng vị trí ngai, bỏ người và đổi ánh sáng, nhấn 1945/ngai trống.','Cắt biểu tượng qua hai thời kỳ; không minh họa vua đang cai trị tới 1945.'),
 'question':('none','phòng/ngai trống','Frame 149–262: đổi góc nhìn chéo, ngai lùi bên trái, câu hỏi ở phải; trụ cửa tiền cảnh tạo chiều sâu.','Giữ voice hiện tại, câu hỏi hoàn tất 8,5s; không đổi timeline.'),
 'dynasty':('gojong, clerk ×2','chiếu/ngai/cung','Vua giữ văn kiện rồi hướng tay về quan; nhóm theo tầng chiều sâu.','Quan nhỏ hơn vua; text không đè mặt.'),
 'empire':('gojong, clerk ×2','ngai/chiếu','Vua giải thích; tên năm và ý tự chủ được mở trên cung.','Không gán câu thoại cho vua.'),
 'abdicate':('gojong, sunjong','ngai','Gojong rời tâm; Sunjong tiến tới vị trí kế nhiệm.','Hoán đổi vị trí minh họa kế vị, không lễ thoái vị chính xác.'),
 'annex':('sunjong, japan ×3','cổng','Sunjong rời tâm; hai cánh cửa khép; nhóm quân đi vào.','Không thêm cảnh bắn súng ngoài dữ kiện.'),
 'sunjong':('sunjong, japan','pháp lệnh','Vua đọc hồ sơ, bên Nhật chỉ vào khu vực văn kiện, quyền hạn đặt ở bàn.','Ngồi sau quầy là occlusion có chủ đích, tay ở trên bàn.'),
 'election':('clerk, rhee','phiếu/thùng','Ở câu thứ hai đại biểu tiến tới, giữ phiếu ở cổ tay, thả xuống khe; kết quả sau khi phiếu rơi.','Không dùng bỏ phiếu phổ thông để minh họa bầu gián tiếp.'),
 'return':('yiun-old, bangja','xe lăn','Xe và người đi cùng tiến ngang; kết luận gia đình trở lại, không lên ngai.','Xe lăn vì người kế vị bị bệnh; không đi bộ ăn mừng.'),
 'hostage':('child, japan','cửa xuất cảnh','Trẻ đi tới cửa có người canh, không tự dẫn phong trào độc lập.','1907 flashback ghi rõ.'),
 'uichin':('uichin, japan','cửa/đường bị chặn','Yi Gang tiến tới cửa; lính canh cầm súng và dấu thất bại chỉ chức năng chặn đường.','Không tái dựng chính xác vụ bắt ở cửa cung hoặc lời đối thoại.'),
 'blocked':('yiun','cửa/đơn','Người tiến tới cửa nhưng không qua; dấu hồi hương bị chặn.','Không khẳng định một văn bản cấm cụ thể.'),
 'war':('civilian ×4','hành lý/phố','Đám đông mang thùng đi khỏi frame qua phố và khói.','Không thêm cảnh giao chiến giả.'),
 'liberation':('civilian ×4','phố','Nhóm giơ tay, sau đó đứng giải thích, chuyển động ngắn.','Lễ mừng khái niệm, không footage chứng cứ.'),
 'military':('yiun','hồ sơ lý lịch','Close-up sĩ quan; card hôn nhân mở đúng SentenceBoundary thứ hai.','1920, không gắn hôn nhân tại thời điểm giải phóng.'),
}
scene_map=[]
for b in beats:
 cast,target,action,limit=D.get(b['mode'],(b['grammar'],b['target'],b['action'],'Minh họa độc lập, không trace frame nguồn.'))
 scene_map.append({**b,'referenceMapping':{'startSec':b['refStart'],'function':b['chapter'],'newScript':b['scriptId'],'newScene':b['id']},'cast':cast,'interactionTarget':target,'blocking':action,'result':b['ko'],'historicalLimit':limit,'camera':'Hook: góc chính diện cận trung → match cut cùng khung → góc chéo rộng. Các scene khác: camera cố định; cut giữa grammar.','captionTiming':'Exact Edge TTS SentenceBoundary, global milliseconds.'})
jsave('05_scene_map.json',scene_map)
assets=[{'id':'rig','path':'components/StagePuppet.tsx','origin':'Episode-local fork of our approved Taiwan V3 rig','rights':'Original project code; no reference artwork','use':'All characters; extra royal outfits, Korean cap, distinct US/Soviet badges, hanbok'}, {'id':'sets','path':'components/Set.tsx','origin':'Original code-native SVG','rights':'Original geometry','use':'Palace, office, street/night, throne, desk; conceptual sets; OpeningHook.tsx has an original audience hall with beams/lattice/steps/perspective.'}, {'id':'map','path':'data/coastlines.json','origin':'Natural Earth 1:50m countries subset','rights':'Public domain: https://www.naturalearthdata.com/about/terms-of-use/','use':'Modern coastlines for explanatory map, actual 38th parallel masks','source':'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'}, {'id':'watermark','path':'../../channel-branding/ChannelWatermark.tsx','origin':'Existing channel-owned logo and name','rights':'Original project branding','use':'One independent overlay through full composition'}, {'id':'bed','path':'public/episodes/korea-no-monarchy/audio/episode-bed.mp3','origin':'tools/generate_bed.py','rights':'Original procedural ambience','use':'Older ambience preserved for comparison; inactive after original music score added'}, {'id':'paper-sfx','path':'public/episodes/korea-no-monarchy/audio/sfx/paper.wav','origin':'Original project procedural SFX','rights':'Own project asset','use':'Paper inserts and ballot drop; stamp.wav preserved but unused'}]
for b in beats: assets.append({'id':b['scriptId'],'path':'public/'+b['file'],'origin':'Edge TTS '+t['voice'],'sha256':b['sha256'],'durationSec':b['durationSec'],'rights':'Generated narration from our Korean script; check current service terms before commercial distribution','use':b['id']})
music=json.loads((EP/'planning/music-provenance.json').read_text()) if (EP/'planning/music-provenance.json').exists() else None
if music:
 assets.append({'id':'original-score-v1','path':'public/'+music['asset'],'sha256':music['sha256'],'origin':music['origin'],'rights':'Created locally for this episode; no third-party recording, MIDI, sample, soundfont or IR. Source and score retained. No Content ID registration.','use':'Full non-looping original instrumental score with five chapter arrangements and voice ducking','generator':'tools/generate_music.py','noteEvents':'data/music-score.json'})
jsave('06_asset_manifest.json',assets)
jsave('07_image_prompts.json',{'method':'code-native SVG, not generated raster','rasterPrompts':[], 'assetBriefs':[{'asset':'royal-rig','brief':'Independent flat vector puppet with jointed limbs. Yellow imperial robe, black Korean ikseongwan, restrained expression, gold/ink palette. No traced portrait or channel-specific face.'},{'asset':'palace','brief':'16:9 stylized Korean palace courtyard, original roof and lattice geometry; cloudy muted teal sky, mountain depth, tan stone ground. Leave a safe narrative text area and protect faces.'},{'asset':'office','brief':'16:9 period office with broad desk, windows and muted tan/olive tones. Keep hands and paper above desk; no reference-frame tracing.'},{'asset':'street','brief':'16:9 original Korean town silhouette and distant hills. Civilian group foreground; evacuation uses luggage and restrained smoke, no graphic injuries.'},{'asset':'map','brief':'Use Natural Earth public domain coastline geometry, combine Korea fills, no modern internal boundary. Color north/south at actual 38 degrees latitude; label explanatory modern coastlines.'}]})
audio_plan={'voice':t['voice'],'rate':t['rate'],'pitch':t['pitch'],'language':'ko-KR','narrationVolume':1,'bedVolume':0,'sfxVolume':.065,'captionSource':'Edge TTS SentenceBoundary','pausePolicy':'8 frames (267 ms) after each paragraph; final 28 frames (933 ms). No padding to arbitrary duration.','silence':'Music breath at frame 51: 100ms out, 200ms silence, 280ms in, timed to empty-throne cut.','mix':'New original stereo score in five arrangements; no looping single bed. Prior ambience preserved but inactive. Paper SFX stays at .065. Music volume lowered under each measured narration clip and lifted slightly between paragraphs.','reviewLimit':'Offline decoded planned-sum peak/RMS and browser playback checks. No assertion of integrated MP4 loudness, native pronunciation or completed human listening review.'}
if music:
 audio_plan.update(musicAsset=music['asset'],musicDucking=music['ducking'],musicOrigin=music['origin'],musicCues=music['cueBoundaries'],musicProvenance='planning/music-provenance.json',musicGenerator='tools/generate_music.py',musicQa='planning/music-qa.json')
jsave('08_audio_plan.json',audio_plan)
jsave('09_episode.json',{'episode':'korea-no-monarchy','titleKo':'해방 후 한국은 왜 왕정을 되살리지 않았을까?','channel':'기묘한 기록실','composition':'Korea-No-Monarchy-KO','width':1920,'height':1080,'fps':30,'durationInFrames':t['durationInFrames'],'durationSec':t['durationSec'],'scripts':len(beats),'sceneGrammars':len(set(b['grammar'] for b in beats)),'status':'Working Studio preview; not rendered/published','voice':t['voice'],'script':'data/script.json','timeline':'data/timing.json','sceneMap':'planning/05_scene_map.json','sources':'planning/sources.json','preview':'http://localhost:3000/Korea-No-Monarchy-KO','renderCommand':'npx remotion render src/index.ts Korea-No-Monarchy-KO out/korea-no-monarchy/korea-no-monarchy-ko-v1.mp4 --codec=h264 --crf=18 --audio-codec=aac --concurrency=2'})
save('10_thumbnail_plan.md','''# Thumbnail plan

Hướng độc lập: vua/hoàng gia bên trái, ngai trống bên phải; một luận điểm lớn, tương phản cream–ink–red. Chữ: `해방됐는데 / 왕정은 왜 없을까?`. Không dùng screenshot hoặc thumbnail reference, không bịa cảnh một người bị đuổi bằng súng. Có thể thử bản B dùng sơ đồ hai chính quyền và ngai giữa để nhấn nghịch lý.

Composition code-native `Korea-No-Monarchy-Thumbnail` đã chuẩn bị. Chưa xuất JPG vì người dùng yêu cầu preview trước, không tự render still. Khi duyệt video sẽ render thumbnail riêng rồi kiểm tra readability/mobile và upload. Không gọi thumbnail chưa render là file đã hoàn thành.
''')
save('11_title_options.md','''# Title options — chưa đăng

1. **해방 후 한국은 왜 왕정을 되살리지 않았을까?** — Vì sao sau giải phóng Hàn Quốc không phục hồi quân chủ? (ưu tiên)
2. 500년 왕조, 해방 뒤에도 왕좌가 비어 있었던 이유 — Vương triều 500 năm: vì sao ngai vẫn trống sau giải phóng?
3. 대한제국 황실은 왜 다시 나라를 다스리지 못했을까? — Vì sao hoàng gia Đại Hàn không thể cai trị lại?

Tránh câu “toàn bộ hoàng gia phản bội” hoặc “Mỹ cấm phục hồi vua” khi episode không chứng minh kết luận đó. Description khi đăng: tóm tắt câu hỏi, đánh dấu reconstruction, dẫn nguồn 1919/1948, lưu trữ Yi Un, tư liệu occupation/trusteeship. Không đăng lên Studio trong task này.
''')
# Export original captions for future manual YouTube upload, identical to the Studio captions.
def srt_time(ms):
 n=round(ms);return f'{n//3600000:02d}:{n//60000%60:02d}:{n//1000%60:02d},{n%1000:03d}'
save('korean-captions.srt','\n\n'.join(f"{i}\n{srt_time(c['startMs'])} --> {srt_time(c['endMs'])}\n{c['text']}" for i,c in enumerate(t['captions'],1))+'\n')
(EP/'12_remotion_render/README.md').write_text('''# Preview và lệnh render

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
''')
(EP/'README.md').write_text(f'''# Korea — Why no restored monarchy?

Episode mới, độc lập với Taiwan V2/Staged/V3. Trạng thái: code/voice/Studio preview; chưa render MP4 và chưa upload.

- {t['durationInFrames']} frames / {t['durationSec']:.1f}s, 1920×1080, 30fps.
- 36 đoạn Korean + bản Việt; 12 scene grammar; caption theo voice thật.
- Nhạc không lời tự tạo, 5 arrangement theo chương; không sample/recording bên thứ ba, có source score và provenance. Nhạc giảm dưới voice, ngắt tại cú cắt ngai trống; ambience cũ giữ file nhưng không phát.
- Voice `{t['voice']}`, rate `{t['rate']}`, pitch `{t['pitch']}`.
- Reference có 173s nội dung chính. Bản mới giữ đủ các chặng và bổ sung 1919/1948/Yi Gang, không dịch nguyên transcript.
- Nguyên nhân kể dưới dạng tổng hợp nhiều yếu tố. Không đồng nhất hồi hương với đăng quang.

[Preview](http://localhost:3000/Korea-No-Monarchy-KO) · [Kịch bản Hàn](planning/04a_korean_script.md) · [Bản Việt](planning/04b_vietnamese_review_script.md) · [Research](planning/03_verified_research.md) · [Storyboard](planning/05_scene_map.json) · [QA](planning/QA.md) · [Render](12_remotion_render/README.md).

Hook visual v2: `scenes/OpeningHook.tsx`, chính diện vua/quan hầu → match cut ngai trống ở frame 51 → góc chéo đặt câu hỏi ở frame 149. Voice và duration giữ nguyên.

Source: `KoreaVideo.tsx` timeline/audio/watermark; `scenes/` 12 grammar; `components/StagePuppet.tsx` episode-local rig; `components/Actor.tsx` cast; `components/Set.tsx` original locations; `data/timing.json` measured timing. `tools/write_script.py` là nguồn script để tái tạo, không sửa riêng JSON rồi chạy lại script generator.

Research screenshots/transcript phục vụ phân tích nguồn, không đi vào timeline. Natural Earth coastline public domain; mọi nhân vật, background và narration dùng tài sản riêng. Illustrations are conceptual, not exact historical portraits/uniform reconstructions.
''')
print('Production package written:',len(beats),'beats;',t['durationSec'],'sec')
