"""Original episode score. Analytic oscillators only; no samples, MIDI imports or downloads.

Produces a non-looped stereo arrangement and an auditable note-event score.
Existing narration/visuals and the older ambience are never overwritten.
"""
import hashlib,json,math,subprocess,wave
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[4]; EP=ROOT/'src/episodes/korea-no-monarchy'
OUT=ROOT/'public/episodes/korea-no-monarchy/audio/music'; OUT.mkdir(exist_ok=True)
TIMING=json.loads((EP/'data/timing.json').read_text()); SR=32000
N=math.ceil(TIMING['durationSec']*SR); mix=np.zeros((N,2),dtype=np.float32)
rng=np.random.default_rng(19451963); events=[]
beats={b['id']:b['startFrame']/30 for b in TIMING['beats']}
# Related harmonic language, different instrumentation and rhythm across chapters.
CUES=[
 {'id':'hook','start':0,'end':beats['K03'],'bpm':68,'texture':'low strings, sparse felt piano; deliberate cut at empty throne'},
 {'id':'empire','start':beats['K03'],'end':beats['K14'],'bpm':76,'texture':'felt piano, warm low strings, restrained plucked ostinato'},
 {'id':'new-states','start':beats['K14'],'end':beats['K30'],'bpm':80,'texture':'quieter moving plucks, piano fragments, occasional low pulse'},
 {'id':'war','start':beats['K30'],'end':beats['K32'],'bpm':66,'texture':'low bowed pad and sparse pulse, melody recedes'},
 {'id':'return','start':beats['K32'],'end':TIMING['durationSec'],'bpm':64,'texture':'spacious piano, soft sustained strings; resolved final phrase'},
]
# Original three phrase shapes, not borrowed from a tune or a MIDI file.
PHRASES=[[(0,62),(1.5,69),(3,65),(5.5,64),(7,60)],[(.5,65),(2.5,64),(4,62),(6,57),(7.25,60)],[(0,57),(2,62),(3.5,64),(5,65),(7,62)]]
CHORDS=[[38,50,57,65],[34,46,53,62],[36,48,55,62],[33,45,52,60]]

def tone(note,dur,kind):
 t=np.arange(max(1,int(dur*SR)),dtype=np.float64)/SR
 hz=440*2**((note-69)/12)
 if kind=='piano':
  env=(1-np.exp(-t*160))*np.exp(-t/1.65)
  y=sum(a*np.sin(2*np.pi*hz*k*(1+.00035*k*k)*t)*np.exp(-t*k/.95) for k,a in [(1,1),(2,.28),(3,.13),(4,.05),(5,.018)])
  y=.78*y*env + .16*np.sin(2*np.pi*hz*t)*np.exp(-t/2.35)*(1-np.exp(-t*110))
 elif kind=='pluck':
  env=(1-np.exp(-t*220))*np.exp(-t/.32)
  y=env*(np.sin(2*np.pi*hz*t)+.22*np.sin(2*np.pi*hz*2*t)+.07*np.sin(2*np.pi*hz*3*t))
 elif kind=='strings':
  env=np.minimum(1,t/.85)*np.minimum(1,np.maximum(0,dur-t)/1.2)
  y=np.zeros_like(t)
  for delta in [-.0019,0,.0021]:
   phase=2*np.pi*hz*(1+delta)*t+.009*np.sin(2*np.pi*4.7*t)
   y+=(np.sin(phase)+.18*np.sin(2*phase)+.065*np.sin(3*phase))/3
  y*=env*(.91+.045*np.sin(2*np.pi*.17*t))
 else:
  y=np.sin(2*np.pi*(49*t+1.7*(1-np.exp(-18*t))))*np.exp(-t*9)*(1-np.exp(-180*t))
  noise=rng.normal(0,1,len(t));noise=np.convolve(noise,np.ones(19)/19,mode='same')
  y+=noise*np.exp(-t*22)*.07
 return y.astype(np.float32)

def add(cue,at,note,dur,kind,amp,pan=0):
 # Leave clean handoff at cue endings; pad tails fade rather than stop abruptly.
 if at>=cue['end']-.15:return
 dur=min(dur,cue['end']-at)
 y=tone(note,dur,kind)*amp
 endfade=min(len(y),int(.16*SR)); y[-endfade:]*=np.linspace(1,0,endfade)
 ix=max(0,round(at*SR)); length=min(len(y),N-ix)
 if length<=0:return
 l=math.sqrt((1-pan)/2);r=math.sqrt((1+pan)/2)
 mix[ix:ix+length,0]+=y[:length]*l;mix[ix:ix+length,1]+=y[:length]*r
 events.append({'cue':cue['id'],'timeSec':round(at,5),'noteMidi':note,'durationSec':round(dur,5),'instrument':kind,'amplitude':amp,'pan':pan})

for cue in CUES:
 step=60/cue['bpm'];bar=4*step;bars=math.ceil((cue['end']-cue['start'])/bar)
 for b in range(bars):
  at=cue['start']+b*bar; chord=CHORDS[(b//2)%4]
  for i,note in enumerate(chord[1:]):
   add(cue,at,note,bar*1.05,'strings',.08 if cue['id']=='return' else .105,(-.5+i*.5))
  if cue['id']=='war':
   add(cue,at,chord[0],bar,'strings',.15,-.1)
   if b%2==0:add(cue,at+.05,35,.8,'pulse',.14,0)
   continue
  if b%2==0:
   phrase=PHRASES[(b//2)%len(PHRASES)]
   # Small melodic changes between phrases; avoid a fixed repeating 4-note loop.
   for off,note in phrase:
    amp=.30 if cue['id']=='return' else .24
    add(cue,at+off*step,note,3.7,'piano',amp,-.2 if b%4==0 else .2)
  if cue['id'] in ['empire','new-states']:
   # Leave every fourth bar without ostinato as a musical breath.
   if b%4!=3:
    for j in range(4 if cue['id']=='empire' else 6):
     off=j*(step if cue['id']=='empire' else step*.5)+.45*step
     note=chord[1+j%3]+(12 if j%3==2 else 0)
     add(cue,at+off,note,.85,'pluck',.09 if cue['id']=='empire' else .075,-.42 if j%2==0 else .42)
   if cue['id']=='new-states' and b%4==0:add(cue,at+.02,35,.65,'pulse',.09,0)
  if cue['id']=='hook' and b==0:add(cue,at,38,bar*2,'strings',.14,0)
 # Crossfade instrumentation gently around chapter boundaries (the track never loops).
 a=max(0,round(cue['start']*SR));z=min(N,round(cue['end']*SR))
 fade=min(round(.8*SR),z-a)
 mix[a:a+fade]*=np.linspace(.45,1,fade)[:,None]
 mix[z-fade:z]*=np.linspace(1,.40,fade)[:,None]

# Short original room reflections. No sampled reverbs/impulses or soundfonts.
dry=mix.copy()
for delay,level in [(.097,.12),(.173,.095),(.281,.07),(.419,.052),(.617,.032)]:
 d=round(delay*SR);mix[d:,0]+=dry[:-d,1]*level;mix[d:,1]+=dry[:-d,0]*level
# Deliberate musical breath at the exact empty-throne match cut; also silences tails.
cut=math.ceil(TIMING['captions'][1]['startMs']*.03)
cut_sec=cut/30
for a,z,g0,g1 in [(cut_sec-.10,cut_sec,1,0),(cut_sec,cut_sec+.20,0,0),(cut_sec+.20,cut_sec+.48,0,1)]:
 i=max(0,round(a*SR));j=min(N,round(z*SR));mix[i:j]*=np.linspace(g0,g1,j-i)[:,None]
# Final cadence after the main explanatory phrase, no sudden end or endless loop.
final={'id':'cadence','start':TIMING['durationSec']-5.5,'end':TIMING['durationSec']}
for i,n in enumerate([50,57,62,65]):add(final,final['start']+i*.13,n,5.3-i*.13,'piano',.16,-.3+i*.2)
fade=min(N,int(2.8*SR));mix[-fade:]*=np.linspace(1,0,fade)[:,None]
mix[:int(.12*SR)]*=np.linspace(0,1,int(.12*SR))[:,None]
# Keep the score at a predictable peak; Remotion ducks this master underneath voice.
peak=float(np.max(np.abs(mix))); mix*=10**(-7/20)/max(peak,1e-8)
master=ROOT/'out/korea-no-monarchy/audio-master';master.mkdir(parents=True,exist_ok=True)
wav=master/'korea-original-score-v1.wav'
with wave.open(str(wav),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
mp3=OUT/'korea-original-score-v1.mp3'
subprocess.run([str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'),'-y','-v','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','192k',str(mp3)],check=True)
score={'version':1,'sampleRate':SR,'seed':19451963,'durationSec':TIMING['durationSec'],'frames':TIMING['durationInFrames'],'asset':'episodes/korea-no-monarchy/audio/music/'+mp3.name,'sha256':hashlib.sha256(mp3.read_bytes()).hexdigest(),'wavSha256':hashlib.sha256(wav.read_bytes()).hexdigest(),'masterWav':str(wav.relative_to(ROOT)),'origin':'New programmatic composition; analytic synthesis, no external recordings/samples/MIDI/soundfonts','thirdPartyMusic':False,'registeredWithContentId':False,'rightsNote':'Created locally for this channel. Source score and deterministic generator preserved. No promise about false-positive automated claims.','cueBoundaries':CUES,'hookSilence':{'frame':cut,'startSec':cut_sec,'durationSec':.20,'fadeOutSec':.10,'fadeInSec':.28},'peakDbFS':round(20*math.log10(float(np.max(np.abs(mix)))),2),'rmsDbFS':round(20*math.log10(float(np.sqrt(np.mean(mix**2)))),2),'ducking':{'duringNarration':.32,'betweenParagraphs':.44,'rampFrames':6},'events':events}
(EP/'data/music-score.json').write_text(json.dumps(score,ensure_ascii=False,indent=2)+'\n')
summary={k:v for k,v in score.items() if k!='events'}
(EP/'planning/music-provenance.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'asset':str(mp3),'events':len(events),'seconds':score['durationSec'],'peakDbFS':score['peakDbFS'],'rmsDbFS':score['rmsDbFS']},indent=2),flush=True)
