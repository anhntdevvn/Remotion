"""Original procedural ambience: not reference audio or generative AI music."""
import json,math,random,struct,subprocess,wave
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]
EP=ROOT/'src/episodes/korea-no-monarchy'
timing=json.loads((EP/'data/timing.json').read_text())
duration=timing['durationSec']+1
rate=22050
out=ROOT/'public/episodes/korea-no-monarchy/audio'
wav=out/'episode-bed.wav'
random.seed(1963)
with wave.open(str(wav),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate)
 for block in range(math.ceil(duration)):
  buf=bytearray()
  for n in range(rate):
   t=block+n/rate
   if t>=duration:break
   chord=sum(math.sin(t*math.tau*hz)*level for hz,level in [(55,.19),(82.4,.08),(110,.04)])
   pulse=.6+.15*math.sin(t*math.tau/11)
   fade=max(0,min(1,t/3,(duration-t)/4))
   v=(chord*pulse+(random.random()-.5)*.009)*fade
   buf+=struct.pack('<h',round(v*32767))
  w.writeframesraw(buf)
subprocess.run([str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'),'-y','-hide_banner','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','112k',str(out/'episode-bed.mp3')],check=True)
wav.unlink()
print(out/'episode-bed.mp3')
