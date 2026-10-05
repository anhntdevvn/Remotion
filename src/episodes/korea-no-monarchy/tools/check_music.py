"""Decode actual media and audit the planned sum, not a video render."""
import hashlib,io,json,math,subprocess,wave
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[4];EP=ROOT/'src/episodes/korea-no-monarchy'
T=json.loads((EP/'data/timing.json').read_text());S=json.loads((EP/'data/music-score.json').read_text())
FF=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'; SR=32000;N=round(T['durationSec']*SR)
def read(path):
 raw=subprocess.check_output([str(FF),'-v','error','-i',str(path),'-f','wav','-acodec','pcm_s16le','-ar',str(SR),'-ac','2','-'])
 with wave.open(io.BytesIO(raw),'rb') as w:return np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,2).astype(np.float32)/32768
asset=ROOT/'public'/S['asset']; m=read(asset)[:N]
fail=[]
if len(m)!=N:fail.append('Score shorter than timeline')
if hashlib.sha256(asset.read_bytes()).hexdigest()!=S['sha256']:fail.append('Score hash differs')
if S['frames']!=T['durationInFrames']:fail.append('Timeline changed; regenerate score')
def gain(frame):
 p=S['ducking'];r=p['rampFrames'];
 for b in T['beats']:
  a=b['startFrame'];z=a+b['voiceFrames']
  if a-r<=frame<z+r:return float(np.interp(frame,[a-r,a,z,z+r],[p['betweenParagraphs'],p['duringNarration'],p['duringNarration'],p['betweenParagraphs']]))
 return p['betweenParagraphs']
gains=np.array([gain(f) for f in range(T['durationInFrames'])],dtype=np.float32)
# Browser callback changes once per video frame; match the frame-held render gain.
for f,g in enumerate(gains):m[round(f*SR/30):round((f+1)*SR/30)]*=g
summed=m.copy(); rows=[]
def db(x):return round(20*math.log10(max(float(x),1e-9)),2)
for b in T['beats']:
 voice=read(ROOT/'public'/b['file']);a=round(b['startFrame']*SR/30);z=min(N,a+len(voice));voice=voice[:z-a];summed[a:z]+=voice
 music_rms=np.sqrt(np.mean(m[a:z]**2));voice_rms=np.sqrt(np.mean(voice**2));rows.append({'id':b['id'],'voiceRmsDbFS':db(voice_rms),'musicRmsDbFS':db(music_rms),'musicBelowVoiceDb':round(db(voice_rms)-db(music_rms),2)})
 if b['grammar'] in ['document','desk','ballot']:
  if b['grammar']=='ballot':
   second=[c for c in T['captions'] if c['scriptId']==b['scriptId']][1];offset=math.ceil(second['startMs']*.03-b['startFrame'])+109
  else:offset=35
  fx=read(ROOT/'public/episodes/korea-no-monarchy/audio/sfx/paper.wav')[:SR]*.065
  x=round((b['startFrame']+offset)*SR/30);z=min(N,x+len(fx));summed[x:z]+=fx[:z-x]
peak=float(np.max(np.abs(summed)))
if peak>=1:fail.append('Planned sum clips')
pause=S['hookSilence']; a=round(pause['startSec']*SR);z=round((pause['startSec']+pause['durationSec'])*SR)
# Lossy codec can have small pre-echo; measure centre of intended breath, not edges.
silence_db=db(np.max(np.abs(m[a+int(.045*SR):z-int(.045*SR)])))
if silence_db>-50:fail.append('Hook music pause is not quiet enough')
report={'passed':not fail,'failures':fail,'musicSha256':S['sha256'],'notes':len(S['events']),'scoreSeconds':len(m)/SR,'hookMusicPausePeakDbFS':silence_db,'sumPeakDbFS':db(peak),'sumRmsDbFS':db(np.sqrt(np.mean(summed**2))),'minimumMusicBelowVoiceDb':min(r['musicBelowVoiceDb'] for r in rows),'maximumMusicBelowVoiceDb':max(r['musicBelowVoiceDb'] for r in rows),'rows':rows,'scope':'Decoded original score + actual TTS clips + paper SFX summed offline with frame-held gain. Not exported MP4 integrated loudness or human listening QA.'}
(EP/'planning/music-qa.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='rows'},indent=2))
raise SystemExit(1 if fail else 0)
