"""Authoring data: original Korean narration, matching Vietnamese review and blocking."""
import json
from pathlib import Path

EP = Path(__file__).resolve().parents[1]
# ref seconds, chapter, grammar, mode, KO, VI, source IDs
ROWS = [
 (0, '해방, 그러나 빈 왕좌', 'throne', 'hook', '500년 왕조. 해방 뒤, 왕좌는 비었습니다.', 'Một vương triều hơn 500 năm. Sau giải phóng, ngai vàng vẫn trống.', ['R1','R3']),
 (12, '해방, 그러나 빈 왕좌', 'throne', 'question', '한국은 왜 왕정을 되살리지 않았을까요?', 'Vậy vì sao Hàn Quốc không phục hồi quân chủ?', ['R3','R8']),
 (0, '왕조가 잃은 것은 무엇인가', 'palace', 'dynasty', '조선에서 대한제국으로 이어진 왕실은 500년 넘게 나라를 다스렸습니다. 그러나 해방은 그 왕실의 복귀로 이어지지 않았습니다.', 'Hoàng gia từ thời Joseon đến Đế quốc Đại Hàn cai trị hơn 500 năm. Nhưng giải phóng không dẫn đến sự trở lại của hoàng gia trong vai trò cai trị.', ['R1','R2']),
 (20, '열강 사이의 대한제국', 'map', 'qing', '청일전쟁에서 일본이 승리하자, 조선에 대한 청의 영향력은 크게 약해졌습니다. 하지만 일본의 압력은 오히려 커졌죠.', 'Nhật thắng chiến tranh Thanh–Nhật khiến ảnh hưởng của Thanh tại Joseon suy giảm mạnh. Nhưng sức ép của Nhật lại tăng lên.', ['R2','R12']),
 (29, '열강 사이의 대한제국', 'palace', 'empire', '1897년, 고종은 대한제국을 선포했습니다. 주변 열강과 대등한 자주국임을 드러내고, 황제 중심의 개혁을 추진하려는 선택이었습니다.', 'Năm 1897, Gojong tuyên bố Đế quốc Đại Hàn. Đây là lựa chọn nhằm thể hiện vị thế tự chủ ngang hàng các cường quốc và thúc đẩy cải cách lấy hoàng đế làm trung tâm.', ['R2']),
 (37, '열강 사이의 대한제국', 'map', 'balance', '고종은 러시아를 비롯한 열강 사이의 균형을 이용해 일본을 견제하려 했습니다. 그러나 그 균형은 오래가지 못했습니다.', 'Gojong tìm cách dùng thế cân bằng giữa các cường quốc, trong đó có Nga, để kiềm chế Nhật. Nhưng thế cân bằng ấy không bền lâu.', ['R2']),
 (42, '열강 사이의 대한제국', 'map', 'russia', '1905년 러일전쟁에서 일본이 승리하면서, 대한제국이 기대던 외교적 여지는 더욱 좁아졌습니다.', 'Nhật thắng chiến tranh Nga–Nhật năm 1905 khiến không gian ngoại giao mà Đại Hàn trông cậy bị thu hẹp hơn nữa.', ['R2']),
 (45, '황제의 이름, 사라지는 권한', 'document', 'protectorate', '같은 해 일본은 을사늑약을 강요해 외교권을 빼앗았습니다. 황제의 이름은 남아 있어도, 나라의 결정권은 무너지고 있었습니다.', 'Cùng năm, Nhật ép ký Hiệp ước Eulsa và tước quyền ngoại giao. Danh vị hoàng đế còn tồn tại, nhưng quyền quyết định của đất nước đang sụp đổ.', ['R2','R4']),
 (55, '황제의 이름, 사라지는 권한', 'palace', 'abdicate', '고종은 헤이그에 특사를 보내 국권 침탈을 알리려 했습니다. 일본은 이를 빌미로 1907년 고종을 강제로 퇴위시켰습니다.', 'Gojong cử đặc phái viên đến La Haye nhằm tố cáo việc xâm đoạt chủ quyền. Nhật lấy đó làm cớ ép ông thoái vị năm 1907.', ['R4']),
 (59, '황제의 이름, 사라지는 권한', 'desk', 'sunjong', '순종이 뒤를 이었지만, 일본의 통감은 법령과 관리 임명까지 간섭했습니다. 황제가 바뀌었다고 주권이 돌아온 것은 아니었습니다.', 'Sunjong kế vị, nhưng Thống giám Nhật can thiệp cả pháp lệnh và bổ nhiệm quan chức. Thay hoàng đế không có nghĩa chủ quyền được trả lại.', ['R4']),
 (64, '1910년, 왕좌와 국가의 단절', 'gate', 'annex', '1910년 강제병합으로 대한제국은 끝났습니다. 일본의 식민 통치가 시작되면서 왕실은 독립국의 통치기관이 아니게 됐습니다.', 'Cưỡng ép sáp nhập năm 1910 kết thúc Đế quốc Đại Hàn. Khi chế độ thuộc địa Nhật bắt đầu, hoàng gia không còn là cơ quan cai trị của một nước độc lập.', ['R3','R4']),
 (69, '1910년, 왕좌와 국가의 단절', 'throne', 'rank', '그렇다고 황실 사람들이 사라진 것은 아닙니다. 순종은 황제에서 이왕으로 격하됐고, 왕실은 일본 지배체제 안에 놓였습니다.', 'Điều đó không có nghĩa các thành viên hoàng gia biến mất. Sunjong bị hạ từ hoàng đế xuống tước Lý vương; hoàng gia bị đặt trong hệ thống thống trị Nhật.', ['R3','R5']),
 (71, '왕실은 남았지만', 'archive', 'heir', '1926년 순종이 세상을 떠난 뒤에는 이복동생 이은, 영친왕이 그 지위를 이었습니다. 하지만 독립국의 황제가 된 것은 아니었죠.', 'Sau khi Sunjong qua đời năm 1926, em cùng cha khác mẹ Yi Un, tức Yeongchinwang, kế thừa địa vị ấy. Nhưng ông không trở thành hoàng đế của một nước độc lập.', ['R5']),
 (74, '1945년, 해방과 새로운 권력', 'street', 'liberation', '그리고 1945년, 일본이 패전했습니다. 한반도는 식민 지배에서 벗어났지만, 새 정부를 세우는 문제는 아직 남아 있었습니다.', 'Rồi năm 1945, Nhật bại trận. Bán đảo thoát khỏi chế độ thuộc địa, nhưng vấn đề thành lập chính phủ mới vẫn chưa được giải quyết.', ['R6']),
 (78, '1945년, 해방과 새로운 권력', 'map', 'division', '일본군의 항복을 접수하기 위해 북위 38도를 경계로 북쪽에는 소련군, 남쪽에는 미군이 들어왔습니다. 이 선은 곧 정치적 분단으로 이어졌습니다.', 'Để tiếp nhận sự đầu hàng của quân Nhật, quân Liên Xô vào phía bắc và quân Mỹ vào phía nam vĩ tuyến 38. Ranh giới này rồi dẫn đến chia cắt chính trị.', ['R6','R7']),
 (86, '점령과 신탁통치는 같은가', 'meeting', 'trusteeship', '미국과 소련, 영국과 중국이 참여하는 신탁통치 구상도 논의됐습니다. 하지만 네 나라가 실제로 한반도를 네 구역으로 나눠 통치한 것은 아닙니다.', 'Một phương án quản thác có Mỹ, Liên Xô, Anh và Trung Quốc tham gia cũng được thảo luận. Nhưng bốn nước không thực tế chia bán đảo thành bốn khu để cai trị.', ['R6']),
 (95, '점령과 신탁통치는 같은가', 'meeting', 'not-britain', '그러나 신탁통치 구상만으로 왕정 복구를 설명할 수는 없습니다. 더 중요한 질문은, 해방된 한국에서 누가 새 권력의 주체가 될 것인가였습니다.', 'Nhưng không thể chỉ dựa vào phương án quản thác để giải thích việc phục hồi quân chủ. Câu hỏi quan trọng hơn là ai sẽ nắm quyền lực mới tại Triều Tiên đã được giải phóng.', ['R6','R8','R9']),
 (103, '돌아올 왕, 돌아갈 체제', 'archive', 'gap', '1910년부터 1945년까지는 35년이 흘렀습니다. 옛 왕실의 통치체제와 해방 직후의 정치세력 사이에는 큰 단절이 있었습니다.', 'Từ 1910 đến 1945 là 35 năm. Có một sự đứt gãy lớn giữa hệ thống cai trị cũ của hoàng gia và các lực lượng chính trị ngay sau giải phóng.', ['R3','R6']),
 (119, '왕위 계승자의 딜레마', 'journey', 'hostage', '왕위 계승자 이은도 서울에서 독립운동을 이끌던 지도자는 아니었습니다. 그는 1907년, 어린 나이에 유학이라는 명목으로 일본에 보내졌습니다.', 'Người kế vị Yi Un cũng không phải lãnh đạo đang dẫn dắt phong trào độc lập tại Seoul. Năm 1907, ông bị đưa sang Nhật khi còn nhỏ dưới danh nghĩa du học.', ['R5']),
 (120, '왕위 계승자의 딜레마', 'portrait', 'military', '그곳에서 일본식 교육을 받았고, 일본 육군 장교로 복무했습니다. 1920년에는 일본 왕족 출신인 이방자와 정략결혼을 했습니다.', 'Tại đó ông được giáo dục theo Nhật và phục vụ như sĩ quan lục quân Nhật. Năm 1920, ông kết hôn chính trị với Yi Bangja, xuất thân từ hoàng tộc Nhật.', ['R5']),
 (124, '왕위 계승자의 딜레마', 'archive', 'legitimacy', '이런 이력은 해방된 나라의 왕으로 돌아오는 데 정치적 부담이 됐습니다. 다만 강제적인 환경을 빼고, 단순한 개인의 선택으로만 설명해서도 안 됩니다.', 'Lý lịch ấy là gánh nặng chính trị đối với việc trở về làm vua của đất nước được giải phóng. Nhưng cũng không nên bỏ qua hoàn cảnh cưỡng ép và quy tất cả thành lựa chọn cá nhân.', ['R5']),
 (115, '황실 전체를 하나로 볼 수 없다', 'journey', 'uichin', '황실 전체를 똑같이 볼 수도 없습니다. 의친왕 이강은 1919년 대동단과 함께 상하이로 탈출하려 했지만, 그 시도는 실패했습니다.', 'Cũng không thể đánh đồng cả hoàng gia. Năm 1919, Uichinwang Yi Gang cùng Daedongdan tìm cách trốn đến Thượng Hải, nhưng nỗ lực ấy thất bại.', ['R10']),
 (135, '복위가 유일한 독립의 길은 아니다', 'desk', 'restoration', '왕실을 되살리려는 생각 자체가 없었던 것은 아닙니다. 그러나 독립운동의 목표는 이미 왕조의 복구를 넘어, 새로운 국가의 형태로 넓어지고 있었습니다.', 'Không phải ý tưởng phục hồi hoàng gia hoàn toàn không tồn tại. Nhưng mục tiêu của phong trào độc lập đã mở rộng từ khôi phục vương triều sang hình thức của một quốc gia mới.', ['R10','R8']),
 (127, '1919년부터 준비된 공화국', 'document', 'charter', '1919년 대한민국 임시헌장은 첫 조항부터 민주공화제를 내세웠습니다. 왕이 아니라 국민을 새 나라의 주체로 삼는 길은, 해방 이전부터 준비되고 있었죠.', 'Điều đầu tiên của Hiến chương lâm thời Đại Hàn Dân Quốc năm 1919 đã đề ra chế độ cộng hòa dân chủ. Con đường lấy người dân thay cho vua làm chủ thể quốc gia đã được chuẩn bị trước giải phóng.', ['R8']),
 (127, '1948년, 남쪽의 선택', 'meeting', 'rhee', '해방 뒤 남쪽에서는 이승만이 반공 노선을 내세우며 정치적 영향력을 넓혔습니다. 왕실이 아닌 공화국 지도자를 중심으로 정부가 세워졌습니다.', 'Sau giải phóng, ở miền nam Syngman Rhee mở rộng ảnh hưởng chính trị với đường lối chống cộng. Chính phủ hình thành quanh lãnh đạo cộng hòa, thay vì hoàng gia.', ['R9','R11']),
 (131, '1948년, 남쪽의 선택', 'ballot', 'election', '이승만이 미국에 의해 곧바로 대통령으로 임명된 것은 아닙니다. 1948년 제헌국회가 헌법을 만들고, 국회의원들의 투표로 초대 대통령을 선출했습니다.', 'Rhee không được Mỹ trực tiếp bổ nhiệm làm tổng thống ngay lúc ấy. Năm 1948, Quốc hội lập hiến soạn hiến pháp và bầu tổng thống đầu tiên bằng lá phiếu của các nghị sĩ.', ['R9','R11']),
 (140, '1948년, 남쪽의 선택', 'document', 'constitution', '제헌헌법은 대한민국이 민주공화국이며, 주권은 국민에게 있다고 정했습니다. 새 국가의 법적 출발점에 세습 왕권은 들어 있지 않았습니다.', 'Hiến pháp lập hiến quy định Đại Hàn Dân Quốc là cộng hòa dân chủ và chủ quyền thuộc về nhân dân. Vương quyền thế tập không nằm trong nền tảng pháp lý của quốc gia mới.', ['R9']),
 (145, '공화국이라는 이름의 두 체제', 'meeting', 'north', '북쪽에서도 소련의 지원을 받은 김일성 중심의 체제가 세워졌습니다. 그 체제 역시 옛 왕조를 복구하는 방향으로 나아가지 않았습니다.', 'Ở miền bắc cũng hình thành hệ thống do Kim Il-sung đứng đầu, được Liên Xô hỗ trợ. Hệ thống này cũng không đi theo hướng khôi phục vương triều cũ.', ['R7']),
 (148, '공화국이라는 이름의 두 체제', 'map', 'two-states', '남북의 정치체제는 서로 달랐지만, 양쪽 모두 공화국을 내세웠습니다. 왕실을 불러와 권력을 맡기는 선택은 어느 쪽의 국가 수립에도 포함되지 않았습니다.', 'Hai hệ thống chính trị bắc–nam khác nhau, nhưng cả hai đều mang hình thức cộng hòa. Trao quyền cho hoàng gia không nằm trong quá trình lập quốc của bên nào.', ['R7','R9']),
 (155, '전쟁이 굳힌 현실', 'street', 'war', '1950년 한국전쟁이 시작되자, 정치의 중심은 생존과 전쟁, 그리고 분단으로 옮겨갔습니다. 옛 왕정을 되살리는 일은 더욱 멀어졌습니다.', 'Khi Chiến tranh Triều Tiên bắt đầu năm 1950, trọng tâm chính trị chuyển sang tồn vong, chiến tranh và chia cắt. Phục hồi quân chủ cũ càng trở nên xa vời.', ['R7']),
 (159, '전쟁이 굳힌 현실', 'archive', 'after-war', '1953년 정전 뒤에도 남북의 국가체제는 유지됐습니다. 왕조가 사라진 빈자리에 이미 정부와 헌법, 새로운 권력구조가 자리 잡고 있었습니다.', 'Sau đình chiến năm 1953, hai hệ thống nhà nước vẫn tồn tại. Chính phủ, hiến pháp và cơ cấu quyền lực mới đã hiện diện trong khoảng trống vương triều để lại.', ['R7','R9']),
 (160, '돌아온 사람, 돌아오지 않은 왕권', 'journey', 'blocked', '이은은 해방 뒤에도 곧바로 귀국하지 못했습니다. 일본과의 관계 단절과 국내 정치의 장벽 때문에 귀국은 오랫동안 좌절됐습니다.', 'Sau giải phóng, Yi Un không thể lập tức trở về. Quan hệ với Nhật bị cắt đứt và rào cản chính trị trong nước khiến việc hồi hương bị trì hoãn lâu dài.', ['R5']),
 (162, '돌아온 사람, 돌아오지 않은 왕권', 'journey', 'return', '마침내 1963년, 이은은 이방자와 함께 한국으로 돌아왔습니다. 박정희 정권 시기의 귀국이었고, 왕정이 복구된 것은 아니었습니다.', 'Cuối cùng, năm 1963, Yi Un cùng Yi Bangja trở về Hàn Quốc. Đây là cuộc hồi hương dưới thời chính quyền Park Chung-hee, không phải phục hồi quân chủ.', ['R5','R13']),
 (166, '돌아온 사람, 돌아오지 않은 왕권', 'throne', 'return-not-rule', '돌아온 것은 황실의 사람이었지, 황제의 권력은 아니었습니다. 가족의 귀환과 국가체제의 복원은 전혀 다른 일이었죠.', 'Người thuộc hoàng gia đã trở lại, chứ quyền lực hoàng đế thì không. Gia đình hồi hương và phục hồi chế độ nhà nước là hai việc hoàn toàn khác nhau.', ['R5','R9','R13']),
 (168, '왜 왕은 돌아오지 않았나', 'archive', 'answer', '한국이 왕정을 되살리지 않은 이유는 하나가 아닙니다. 식민 지배의 단절, 독립운동의 공화주의, 분단 뒤 형성된 새 권력들이 함께 작용했습니다.', 'Hàn Quốc không phục hồi quân chủ vì nhiều lý do cùng tác động: đứt gãy do thuộc địa, chủ nghĩa cộng hòa trong phong trào độc lập và các quyền lực mới hình thành sau chia cắt.', ['R3','R6','R8','R9']),
 (170, '왜 왕은 돌아오지 않았나', 'throne', 'ending', '해방은 나라를 되찾는 사건이었지만, 옛 왕좌를 되찾는 사건은 아니었습니다. 한국의 새 출발은 왕의 귀환이 아니라, 새로운 국가의 수립이었습니다.', 'Giải phóng là giành lại đất nước, nhưng không phải giành lại ngai vàng cũ. Khởi đầu mới của Hàn Quốc là lập nên quốc gia mới, thay vì vua trở về.', ['R8','R9']),
]

ACTION = {
 'throne': ('Ngai trống, hồ sơ vương quyền đóng lại; người hồi hương đi qua thay vì ngồi lên ngai', 'ngai / con dấu / hồ sơ', 'close → wide'),
 'palace': ('Hoàng đế đọc/ra chiếu, thay người trên ngai hoặc rời ghế khi quyền lực bị tước', 'chiếu / ngai / cửa cung', 'wide → medium'),
 'map': ('Tuyến ảnh hưởng, thế cân bằng hoặc hai vùng tô màu thay đổi theo lời', 'bán đảo / tuyến / vĩ tuyến 38', 'wide map'),
 'document': ('Giấy được đặt xuống, đánh dấu đúng điều khoản hoặc quyền bị tước', 'văn kiện / phần nhấn', 'insert'),
 'desk': ('Quan chức xử lý hồ sơ; giấy và tay cùng di chuyển, thư ký chờ kết quả', 'giấy / bút / quầy', 'medium interaction'),
 'gate': ('Cổng cung đóng; đoàn quân đi vào khung, hoàng gia rời vai trò cai trị', 'cổng / đoàn quân / hồ sơ', 'wide'),
 'archive': ('Mở ngăn hồ sơ, đổi trọng tâm theo thông tin / các lớp thời gian', 'hồ sơ / chân dung / mốc thời gian', 'insert → medium'),
 'street': ('Đám đông mừng giải phóng hoặc di chuyển cùng hành lý khi có chiến tranh', 'cờ / hành lý / không gian phố', 'wide → medium'),
 'meeting': ('Nhóm quanh bàn đọc / đưa giấy / thảo luận; quyết định nằm trên mặt bàn', 'bàn / văn kiện / người đối diện', 'group medium'),
 'journey': ('Người đi tới cửa xuất cảnh rồi dừng, hoặc cùng người thân đi qua khi trở về', 'cửa / tuyến hành trình / hành lý', 'wide → close'),
 'portrait': ('Cận nhân vật với các dấu mốc lý lịch, không diễn lời bịa cho người thật', 'chân dung minh họa / hai hồ sơ', 'close'),
 'ballot': ('Đại biểu đi đến, bỏ phiếu; kết quả hiện sau lá phiếu vào thùng', 'tay / phiếu / thùng', 'medium → insert'),
}

def main():
 beats=[]
 for i,(ref,ch,grammar,mode,ko,vi,sources) in enumerate(ROWS,1):
  action,target,shot=ACTION[grammar]
  beats.append(dict(id=f'K{i:02d}',scriptId=f'KO-{i:03d}',refStart=ref,chapter=ch,grammar=grammar,mode=mode,ko=ko,vi=vi,sources=sources,action=action,target=target,shot=shot))
 (EP/'data/script.json').write_text(json.dumps(beats,ensure_ascii=False,indent=2))
 for lang,label in [('ko','Korean narration'),('vi','Bản Việt review')]:
  body=f'# {label} — 왜 한국은 왕정을 되살리지 않았을까?\n\nOriginal rebuild, không dịch line-by-line. ID đồng bộ với storyboard và voice.\n\n'
  for b in beats: body+=f"## {b['scriptId']} · {b['id']} · {b['chapter']}\n\n{b[lang]}\n\n"
  (EP/'planning'/('04a_korean_script.md' if lang=='ko' else '04b_vietnamese_review_script.md')).write_text(body)
 print(len(beats),'narration beats;',sum(len(b['ko']) for b in beats),'KO characters')

if __name__=='__main__':main()
