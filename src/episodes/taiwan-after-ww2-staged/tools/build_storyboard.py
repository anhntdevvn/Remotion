"""Rebuild the new episode's shot clock from existing TTS sentence boundaries.
No originals or narration assets are written by this script.
"""
from pathlib import Path
import json, urllib.request
ROOT = Path(__file__).resolve().parents[1]
sentences = json.loads((ROOT/'data/sentences.json').read_text())
# Each row maps one spoken sentence to a designed location, blocking, and visual beat.
# Fields: kind | on-screen locator | object wording | optional annotation / mode.
DESIGNS = '''
colony|1895–1945 · 대만|50년의 통치|hook
collapse|1945 · 일본의 패전|모두 잃었다|hook
question|왜 대만을 지키지 못했을까?||hook
collapse|1945 · 전쟁의 끝|제국의 지배권 붕괴|wide
colony|대만 · 50년의 식민 통치|1895 → 1945|wide
handover|1945 · 항복과 행정 인수|행정 서류|handover
archive|1951 · 평화조약|이상한 문장|close
archive|제2조 (b)|받는 나라: 명시하지 않음|missing
question|일본은 왜 계속 보유할 수 없었을까?||close
rewind|1895 → 1945 → 1951|전쟁 → 항복 → 평화조약|timeline
field|1894–1895 · 청일전쟁||march
map|조선을 둘러싼 경쟁|조선 · 청 · 일본|war1895
map|1895 · 시모노세키 조약|대만 · 펑후|cession
colony|1895–1945 · 일본 통치|50년|wide
port|식민 통치 · 기반 시설과 강압|철도 · 항만|infrastructure
colony|1945 · 식민지 대만|단순한 해외 기지가 아니었다|wide
office|패전 직전 · 일본|대만|japan
conference|전후 처리|결정권은 연합국으로|power
meeting|1943 · 카이로|루스벨트 · 처칠 · 장제스|leaders
meeting|동아시아의 전후 질서|전후 처리 논의|lean
archive|1943 · 카이로 공동성명|만주 · 포모사 · 펑후 → 중화민국|cairo
map|포모사 = 대만|대만 / FORMOSA|taiwan
archive|1945 · 포츠담 선언|카이로 선언 조건 이행|potsdam
signing|1945 · 일본 항복|포츠담 선언 수락|surrender
archive|전후 처리의 방향|카이로 → 포츠담 → 항복문서|three
collapse|제국의 영토 유지 불가|전쟁의 끝|wide
conference|항복 조건|대만 보유: 선택지에 없음|excluded
archive|1945 · 아직 미완의 평화조약|평화조약은 아직|pending
handover|일반명령 제1호|장제스에게 항복|surrender
administration|1945 · 중화민국의 행정 인수|행정 접수|queue
map|현실의 변화 · 문서는 더 천천히|행정 인수 ≠ 최종 조약|administration
comparison|서로 다른 세 절차||intro
comparison|항복 · 행정 · 평화조약|같은 절차가 아니다|three
observer|1946 · 미국 국무부|적절한 조약으로 공식화 필요 가능성|read
archive|통치는 시작 · 문서는 미완|아직 완성되지 않았다|pending
crowd|중화민국 · 승리와 회복|대만 귀환|celebrate
crowd|현지 주민의 현실|기대와 현실|concern
administration|행정 실패 · 부패 · 경제 혼란|길어진 줄|tension
curfew|1947 · 2·28 사건|탄압|curfew
observer|외부 관찰자의 시선|미국 국무부|read
options|정말 안정적인 해결책인가?|카이로의 약속?|question
office|일본에 돌려준다는 뜻은 아니었다|일본의 권리 회복: 아님|japan
options|중화민국의 통치 · 대만의 장래|앞으로 어떻게 처리할까?|future
field|중국 내전||civilwar
map|1949 · 중국 대륙과 대만|중화인민공화국 / 중화민국|retreat
absent|중국을 대표하는 정부는?|두 개의 주장|representation
absent|대표권 문제|중화인민공화국 / 중화민국|representation
map|서태평양의 전략 지형|대만의 위치|strategy
options|미국 내부의 검토|선택지|intro
options|검토된 방안|현상 유지 · 국제적 관리 · 군사 개입|three
options|어느 것도 간단하지 않았다|문제는 남았다|problems
options|주민 투표 · 군사 점령의 위험|반발 / 제국주의 논란|problems
map|아무것도 하지 않는다면?|전쟁 위험|risk
office|1950년 1월 · 트루먼 행정부|군사 원조 · 고문 제공 안 함|truman
office|중국 내전|직접 개입 회피|truman
map|계산을 바꾼 곳: 한반도|한반도|korea
korea|1950년 6월 25일|한국전쟁 발발|invasion
fleet|1950년 6월 27일 · 미 제7함대|대만 공격 저지|deploy
office|중화민국에도 요구|대륙 공격 작전 중단|roc
map|대만해협 전체의 확전 억제|양측 군사 행동 억제|freeze
map|한반도 → 동아시아|확전 차단|contain
map|서태평양 방어선|한국 · 일본 · 대만 · 필리핀|defense
rebuild|전후 일본|국가 재건|wide
office|대만을 되찾을 기회는 아니었다|대만 회복: 아님|japan
rebuild|점령 · 새 헌법 · 국가 재건|평화조약이 우선|workers
conference|1951 · 샌프란시스코|평화조약 체결|sign
conference|일본의 국제사회 복귀|평화조약|rejoin
absent|초대받지 못한 두 정부|중화민국 / 중화인민공화국|chairs
absent|합의되지 않은 대표권|어느 정부가 중국을 대표하는가?|dispute
archive|1951 · 제2조 (b)|짧은 조항|article
archive|일본의 권리 포기|모든 권리 · 권원 · 청구권을 포기한다|renounce
archive|받는 나라: 명시하지 않음|최종 귀속은 명시하지 않음|missing
options|그 뒤에 남은 논쟁|서로 다른 법적 · 정치적 해석|interpretation
office|일본에게는 빈칸이 아니었다|일본의 권리?|japan
archive|명시적 포기|일본의 권리를 남긴 조항이 아니다|renounce
summary|왜 일본은 대만을 지킬 수 없었을까?|세 가지 이유|intro
summary|패전 → 항복 조건 → 권리 포기|패전 / 항복 조건 / 평화조약|three
archive|1951년에 남은 모호함|일본의 소유 문제가 아니다|missing
ending|일본이 떠난 뒤의 질문|누가 대만의 미래를 결정할 것인가?|future
ending|끝나지 않은 질문|대만의 미래|end
'''.strip().splitlines()
assert len(DESIGNS) == len(sentences), (len(DESIGNS),len(sentences))
shots=[]
for i,(s,line) in enumerate(zip(sentences,DESIGNS)):
 kind,locator,label,mode=line.split('|')
 start=0 if i==0 else s['start']
 end=sentences[i+1]['start'] if i+1<len(sentences) else 14358
 shots.append(dict(id=f'S{i+1:03d}',sentenceId=s['id'],clipId=s['clipId'],start=start,duration=end-start,kind=kind,locator=locator,label=label,mode=mode))
# Long sentences change picture at phrase boundaries. These timings are explicitly
# storyboard estimates within a known sentence, not claimed word-level TTS alignment.
SPLITS={
 'KO-004.2':[(0,'field','조선을 둘러싼 경쟁','march'),(.58,'signing','1895 · 시모노세키 조약','cession')],
 'KO-006.1':[(0,'port','철도 · 항만 · 행정 체계 확장','infrastructure'),(.48,'curfew','강압 · 차별 · 저항 진압','colonial')],
 'KO-013.2':[(0,'map','1945 · 행정 인수','administration'),(.53,'archive','외교 문서 · 미완','pending')],
 'KO-020.2':[(0,'map','1949 · 중국 대륙','retreat'),(.64,'port','중화민국 정부의 대만 이동','retreat')],
 'KO-022.2':[(0,'options','현 상태 유지','statusquo'),(.34,'options','국제연합 관리 · 주민 투표','ballot'),(.69,'options','군사 개입','military')],
 'KO-023.2':[(0,'options','주민 투표 · 중국 양측의 반발','ballot-risk'),(.52,'options','군사 점령 · 제국주의 논란','military-risk')],
 'KO-025.2':[(0,'map','1950년 6월 25일 · 한반도','korea'),(.35,'korea','한국전쟁 발발','invasion')],
 'KO-029.3':[(0,'rebuild','연합국 점령 · 새 헌법','workers'),(.6,'conference','평화조약이 우선','priority')],
 'KO-035.2':[(0,'collapse','첫째: 패전','wide'),(.34,'signing','둘째: 항복 조건 수락','surrender'),(.69,'archive','셋째: 평화조약에서 권리 포기','renounce')]
}
expanded=[]
for shot in shots:
 parts=SPLITS.get(shot['sentenceId'])
 if not parts:expanded.append(shot);continue
 for i,(part,kind,locator,mode) in enumerate(parts):
  start=shot['start']+round(shot['duration']*part)
  end=shot['start']+round(shot['duration']*parts[i+1][0]) if i+1<len(parts) else shot['start']+shot['duration']
  expanded.append({**shot,'id':shot['id']+chr(97+i),'start':start,'duration':end-start,'kind':kind,'locator':locator,'mode':mode})
(ROOT/'data/storyboard.json').write_text(json.dumps(expanded,ensure_ascii=False,indent=2)+'\n')
# Captions use the published Remotion Caption JSON fields, sentence-level timing.
captions=[dict(text=s['text'],startMs=s['start']/30*1000,endMs=s['end']/30*1000,timestampMs=None,confidence=None) for s in sentences]
(ROOT/'data/captions.json').write_text(json.dumps(captions,ensure_ascii=False,indent=2)+'\n')
# Accurate geographic coastlines; country paths only used as land silhouettes.
# The episode does not imply that current admin borders are historical borders.
url='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
raw=json.load(urllib.request.urlopen(url))
features=[]
for feature in raw['features']:
 code=feature['properties']['ADM0_A3']
 if code not in ['CHN','TWN','JPN','KOR','PRK','PHL','VNM','RUS','MNG','LAO','THA','MMR','KHM','MYS','IDN']:continue
 geom=feature['geometry']; polys=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]
 paths=[]
 for poly in polys:
  for ring in poly:
   pts=[((lon-102)*35,(48-lat)*27) for lon,lat in ring]
   paths.append('M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'Z')
 features.append({'code':code,'path':' '.join(paths)})
(ROOT/'data/coastlines.json').write_text(json.dumps(features,separators=(',',':'))+'\n')
print(f'{len(expanded)} shots; {len(captions)} aligned sentences; {len(features)} geographic silhouettes')
