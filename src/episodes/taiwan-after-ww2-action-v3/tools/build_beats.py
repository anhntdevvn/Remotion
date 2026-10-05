from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
timing=json.loads((ROOT/'data/full_timing.json').read_text())
all_sentences=json.loads((ROOT/'data/sentences.json').read_text())
sentences=[s for s in all_sentences if s['start']>=810]
# Direction is attached to each spoken sentence before visual effects are added.
rows='''
document|mystery
 document|recipient
 portrait|question
 timeline|chronology
 formation|1895
 signing|shimonoseki
 map|cession
 industry|fifty-years
 industry|rail-port
 portrait|colony
 portrait|japan-loss
 closure|lost-decision
 meeting|introduce
 meeting|discuss
 document|cairo
 map|formosa
 document|potsdam
 signing|accept
 document|chain
 formation|defeat
 closure|excluded
 document|pending
 handover|surrender
 queue|administration
 map|admin
 procedure|question
 procedure|separate
 document|state-dept
 document|pending
 street|celebrate
 queue|disillusion
 queue|tension
 formation|repression
 portrait|observer
 debate|stability
 closure|not-japan
 debate|future
 formation|civilwar
 map|retreat
 debate|new-question
 debate|representation
 map|strategy
 choices|intro
 choices|options
 choices|no-simple-answer
 ballot|risks
 map|risk
 portrait|truman-aid
 closure|avoid-war
 map|korea-turn
 formation|korea
 fleet|seventh
 portrait|roc-stop
 map|freeze
 fleet|contain
 map|defense
 rebuild|japan
 closure|not-recovery
 rebuild|priorities
 hall|sign
 hall|rejoin
 empty-seats|absent
 debate|representation
 document|article
 document|renounce
 document|recipient
 debate|interpretations
 portrait|not-a-loophole
 document|renounce
 closure|three-reasons
 closure|recap
 document|not-japanese-ownership
 ending|future
 ending|open-record
'''.strip().splitlines()
assert len(rows)==len(sentences),(len(rows),len(sentences))
roles={
'document':('đọc / chỉ vào / đánh dấu văn kiện','văn kiện','insert'),
 'timeline':('Theo đường nối từng mốc','trình tự nguyên nhân','wide insert'),
 'formation':('đi vào / dừng / rút / dân rời khung','hướng di chuyển và quyền kiểm soát','wide group'),
 'industry':('kéo xe hàng / giám sát cảng','cảng và đường ray','wide environment'),
 'portrait':('đọc → nhìn mục tiêu → phản ứng','hồ sơ và câu hỏi của narration','medium/close'),
 'meeting':('ba người ngồi → trỏ giấy trên bàn → nhìn nhau','văn kiện chung','medium group'),
 'handover':('tiến lại → trao hồ sơ → nhận hồ sơ','cùng hồ sơ / wrist grip','medium interaction'),
 'signing':('tay giữ giấy → bút đi theo tay → ký','giấy trên bàn','hand insert + medium'),
 'queue':('tiến đến quầy → đưa giấy → chờ → clerk xử lý','quầy nhận hồ sơ','wide/medium'),
 'procedure':('military report / bàn nhận hồ sơ / hồ sơ treaty còn mở','ba thủ tục riêng','triptych insert'),
 'street':('nhóm chào và phản ứng khi tiếp quản','biểu tượng tiếp quản','wide group'),
 'debate':('đọc casefile → chỉ vào hai hồ sơ hoặc câu hỏi','luận điểm đang được hỏi','close object'),
 'map':('marker → tuyến → dừng hoặc đổi trọng tâm','địa lý tương ứng câu thoại','map close/wide'),
 'choices':('trượt từng hồ sơ sang vùng xem xét → đánh dấu rủi ro','phương án chính sách','tabletop insert'),
 'ballot':('tay đưa lá phiếu → dừng trước hòm → dấu hỏi','phương án được xét, chưa thực hiện','object insert'),
 'fleet':('tàu tiến vào eo biển / đứng giữa hai hướng','đường tiến công và ngăn mở rộng','wide maritime'),
 'rebuild':('worker kéo xe / inspector đọc hồ sơ','công trường và ưu tiên tái thiết','wide environment'),
 'hall':('đại diện đọc/ký → group chứng kiến','peace treaty','medium group'),
 'empty-seats':('máy quay cố định trên hai ghế trống và nameplate','sự vắng mặt của hai chính phủ','wide environment'),
 'closure':('hồ sơ đóng / nhãn đổi / ba ngăn đóng lần lượt','quyền giữ Đài Loan của Nhật','object + reaction'),
 'ending':('casefile còn mở / người xem xét hồ sơ','câu hỏi tương lai Đài Loan','close + wide')}
# Micro-hooks use questions already present in the existing narration, no invented facts.
hooks={
 'KO-002.1':('조약에 빈칸이 있다?','Hiệp ước có một chỗ trống?'),
 'KO-007.2':('누가 결정권을 쥐었을까?','Ai nắm quyền quyết định?'),
 'KO-012.1':('전쟁의 끝 ≠ 조약의 완성','Hết chiến tranh không đồng nghĩa hiệp ước hoàn tất'),
 'KO-014.1':('같은 절차일까?','Có phải cùng một thủ tục?'),
 'KO-016.2':('기대와 현실은 달랐다','Kỳ vọng và thực tế khác nhau'),
 'KO-018.2':('정말 안정적인 해법인가?','Có thực sự là giải pháp ổn định?'),
 'KO-021.1':('질문이 하나 더 생겼다','Xuất hiện thêm một câu hỏi'),
 'KO-023.1':('쉬운 선택지는 없었다','Không có lựa chọn dễ dàng'),
 'KO-025.1':('계산을 바꾼 곳은 한반도였다','Nơi làm thay đổi tính toán là bán đảo Triều Tiên'),
 'KO-029.2':('대만을 되찾을 기회였을까?','Có phải cơ hội lấy lại Đài Loan?'),
 'KO-031.1':('정작 두 정부는 없었다','Chính hai chính phủ lại không có mặt'),
 'KO-033.1':('받는 나라는 어디에?','Nước nhận ở đâu?'),
 'KO-034.1':('그렇다면 일본의 권리는?','Vậy quyền của Nhật thì sao?'),
 'KO-036.2':('다음 결정은 누가 내릴까?','Ai sẽ đưa ra quyết định tiếp theo?')}
clip_to_scene={cid:s for s in timing['scenes'] for cid in s['narrationIds']}
# Cut on clip onset for first sentences; remaining cuts use the exact sentence clock.
starts=[timing['clips'][s['clipId']]['startFrame'] if s['id'].endswith('.1') else s['start'] for s in sentences]
beats=[]
for i,(s,row,start) in enumerate(zip(sentences,rows,starts)):
 grammar,mode=row.strip().split('|');scene=clip_to_scene[s['clipId']]
 end=starts[i+1] if i+1<len(starts) else timing['durationInFrames']
 action,target,shot=roles[grammar];hook=hooks.get(s['id'])
 beats.append(dict(id=f'B{i+1:03d}',sceneId=scene['id'],sentenceId=s['id'],clipId=s['clipId'],start=start,duration=end-start,grammar=grammar,mode=mode,kicker=scene['id'],action=action,target=target,shot=shot,**({'hook':hook[0],'hookVi':hook[1]} if hook else {})))
# Long sentences contain different actions. Internal cuts are phrase estimates,
# not claimed word-level alignment; these are exposed for localhost review.
splits={
 'KO-004.2':[(0,'formation','1895'),(.59,'signing','shimonoseki')],
 'KO-006.1':[(0,'industry','rail-port'),(.48,'queue','coercion')],
 'KO-013.2':[(0,'map','admin'),(.52,'document','pending')],
 'KO-020.2':[(0,'map','retreat'),(.68,'industry','roc-arrives')],
 'KO-022.2':[(0,'choices','statusquo'),(.34,'choices','international'),(.68,'choices','military')],
 'KO-023.2':[(0,'ballot','risks'),(.53,'choices','military-risk')],
 'KO-029.3':[(0,'rebuild','priorities'),(.59,'document','priorities')],
 'KO-035.2':[(0,'formation','defeat'),(.34,'signing','accept'),(.68,'document','renounce')]
}
expanded=[]
for b in beats:
 parts=splits.get(b['sentenceId'])
 if not parts:expanded.append(b);continue
 for i,(ratio,grammar,mode) in enumerate(parts):
  start=b['start']+round(ratio*b['duration']);end=b['start']+round(parts[i+1][0]*b['duration']) if i+1<len(parts) else b['start']+b['duration']
  action,target,shot=roles[grammar]
  expanded.append({**b,'id':b['id']+chr(97+i),'start':start,'duration':end-start,'grammar':grammar,'mode':mode,'action':action,'target':target,'shot':shot})
(ROOT/'data/beats.json').write_text(json.dumps(expanded,ensure_ascii=False,indent=2)+'\n')
(ROOT/'planning/micro_hooks.json').write_text(json.dumps([{'scriptId':b['sentenceId'],'frame':b['start'],'ko':b['hook'],'vi':b['hookVi']} for b in expanded if b.get('hook')],ensure_ascii=False,indent=2)+'\n')
print(len(expanded),'beats after unchanged opening;',len(hooks),'micro-hooks;',len({b['grammar'] for b in expanded}),'grammars')
