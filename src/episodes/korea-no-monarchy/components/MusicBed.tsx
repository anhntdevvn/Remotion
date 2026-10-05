import React from 'react';
import {Audio} from '@remotion/media';
import {staticFile,interpolate} from 'remotion';
import timing from '../data/timing.json';
import score from '../data/music-score.json';
import {clamp} from '../types';

/** Audio frame is global episode time inside the full-length score Sequence. */
export const musicVolumeAtFrame=(frame:number)=>{
 const {duringNarration,betweenParagraphs,rampFrames}=score.ducking;
 for(const beat of timing.beats){
  const start=beat.startFrame;const end=start+beat.voiceFrames;
  if(frame>=start-rampFrames && frame<end+rampFrames){
   return interpolate(frame,[start-rampFrames,start,end,end+rampFrames],
    [betweenParagraphs,duringNarration,duringNarration,betweenParagraphs],clamp);
  }
 }
 return betweenParagraphs;
};
export const MusicBed:React.FC=()=> <Audio src={staticFile(score.asset)} volume={musicVolumeAtFrame}/>;
