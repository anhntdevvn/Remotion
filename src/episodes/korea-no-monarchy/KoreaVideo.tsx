import React from 'react';
import {AbsoluteFill,Sequence,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {ChannelWatermark} from '../../channel-branding/ChannelWatermark';
import {Scene} from './scenes/Scene';
import timing from './data/timing.json';
import {C,KoreaBeat} from './types';
import {EPISODE_FRAMES} from './duration';
import {sentenceFrame} from './timing';
import {MusicBed} from './components/MusicBed';

export const koreaBeats=timing.beats as KoreaBeat[];
export type KoreaProps={startFrame?:number;windowFrames?:number};
export const KoreaVideo:React.FC<KoreaProps>=({startFrame=0,windowFrames=EPISODE_FRAMES})=>{
 const visible=koreaBeats.filter(b=>b.startFrame+b.durationInFrames>startFrame&&b.startFrame<startFrame+windowFrames);
 return <AbsoluteFill style={{background:C.ink}}>
  {visible.map(b=><Sequence key={b.id} from={b.startFrame-startFrame} durationInFrames={b.durationInFrames} name={`${b.id} · ${b.scriptId} · ${b.grammar}/${b.mode}`}>
   <Scene beat={b}/>
   <Sequence durationInFrames={b.voiceFrames}><Audio src={staticFile(b.file)} volume={1}/></Sequence>
   {['document','desk','ballot'].includes(b.grammar)&&<Sequence from={b.grammar==='ballot'?sentenceFrame(b,1)+109:35} durationInFrames={30}><Audio src={staticFile('episodes/korea-no-monarchy/audio/sfx/paper.wav')} volume={.065}/></Sequence>}
  </Sequence>)}
  <Sequence from={-startFrame} durationInFrames={EPISODE_FRAMES} name="Original score · 5 chapters">
   <MusicBed/>
  </Sequence>
  <ChannelWatermark/>
 </AbsoluteFill>;
};
