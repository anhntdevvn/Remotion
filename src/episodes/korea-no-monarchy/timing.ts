import timing from './data/timing.json';
import {KoreaBeat} from './types';

/** Zero-based sentence index, measured from this beat's actual TTS boundaries. */
export const sentenceFrame=(beat:KoreaBeat,index:number)=>{
 const rows=timing.captions.filter(c=>c.scriptId===beat.scriptId);
 return rows[index]?Math.max(0,Math.ceil(rows[index].startMs*30/1000-beat.startFrame)):beat.voiceFrames;
};
