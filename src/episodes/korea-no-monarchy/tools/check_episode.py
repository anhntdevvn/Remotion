"""Check measured media, caption/script correspondence and preserved episode hashes."""
import array,hashlib,io,json,math,re,subprocess,wave
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]; EP=ROOT/'src/episodes/korea-no-monarchy'
T=json.loads((EP/'data/timing.json').read_text()); script=json.loads((EP/'data/script.json').read_text()); sources=json.loads((EP/'planning/sources.json').read_text())
PROBE=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe'; FFMPEG=PROBE.with_name('ffmpeg')
fail=[]; warnings=[]; media=[];cursor=0
norm=lambda s:re.sub(r'\s+','',s)
for b,s in zip(T['beats'],script):
 if b['ko']!=s['ko'] or b['vi']!=s['vi']:fail.append('Outdated timeline '+b['id'])
 if b['startFrame']!=cursor:fail.append('Visual gap '+b['id'])
 cursor+=b['durationInFrames']; path=ROOT/'public'/b['file']
 if not path.exists():fail.append('Missing audio '+b['id']);continue
 if hashlib.sha256(path.read_bytes()).hexdigest()!=b['sha256']:fail.append('Audio changed '+b['id'])
 d=float(subprocess.check_output([str(PROBE),'-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True))
 if math.ceil(d*30)!=b['voiceFrames']:fail.append('Voice duration mismatch '+b['id'])
 caps=[c for c in T['captions'] if c['scriptId']==b['scriptId']]
 if norm(''.join(c['text'] for c in caps))!=norm(b['ko']):fail.append('Caption content mismatch '+b['id'])
 for c in caps:
  if c['endMs']<=c['startMs'] or c['startMs']<b['startFrame']/30*1000 or c['endMs']>(b['startFrame']+b['voiceFrames'])/30*1000+40:fail.append('Caption outside audio '+b['id'])
 if any(s not in sources for s in b['sources']):fail.append('Unresolved source '+b['id'])
 pcm=subprocess.check_output([str(FFMPEG),'-v','error','-i',str(path),'-f','wav','-acodec','pcm_s16le','-ac','1','-'],stderr=subprocess.PIPE)
 with wave.open(io.BytesIO(pcm),'rb') as w: samples=array.array('h',w.readframes(w.getnframes()))
 peak=max(abs(n) for n in samples)/32768;rms=math.sqrt(sum((n/32768)**2 for n in samples)/len(samples))
 if peak>=.999: warnings.append('Near clipping '+b['id'])
 media.append({'id':b['id'],'durationSec':d,'peakDbFS':round(20*math.log10(max(peak,1e-8)),2),'rmsDbFS':round(20*math.log10(max(rms,1e-8)),2),'decoded':True})
if len(T['beats'])!=len(script):fail.append('Script/timeline length mismatch')
if cursor!=T['durationInFrames']:fail.append('End mismatch')
for p in ['episodes/korea-no-monarchy/audio/episode-bed.mp3','episodes/korea-no-monarchy/audio/sfx/paper.wav','channel-branding/logo/archive-logo.svg']:
 if not (ROOT/'public'/p).exists():fail.append('Missing shared asset '+p)
bed=float(subprocess.check_output([str(PROBE),'-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(ROOT/'public/episodes/korea-no-monarchy/audio/episode-bed.mp3')],text=True))
if bed<T['durationSec']:fail.append('Bed too short')
preserved=json.loads((EP/'planning/preserved_versions.json').read_text());changed=[]
for p,h in preserved.items():
 path=ROOT/p
 if not path.exists() or hashlib.sha256(path.read_bytes()).hexdigest()!=h:changed.append(p)
if changed:fail.append('Earlier versions modified: '+', '.join(changed))
report={'passed':not fail,'failures':fail,'warnings':warnings,'beats':len(script),'frames':cursor,'seconds':cursor/30,'captions':len(T['captions']),'grammarCount':len(set(b['grammar'] for b in T['beats'])),'hookCompleteSeconds':(T['beats'][1]['startFrame']+T['beats'][1]['voiceFrames'])/30,'preservedFiles':len(preserved),'preservedChanges':changed,'media':media,'bedSeconds':bed,'limit':'Checks file integrity, decoded samples, measured timing and caption content. Does not judge native pronunciation or mixed listening quality.'}
(EP/'planning/check-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='media'},ensure_ascii=False,indent=2))
raise SystemExit(1 if fail else 0)
