import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {ThroneScene,PalaceScene,GateScene} from './PalaceScenes';
import {OpeningHook} from './OpeningHook';
import {MeetingScene,DeskScene,BallotScene} from './PoliticalScenes';
import {MapScene} from './MapScenes';
import {ArchiveScene,DocumentScene} from './RecordScenes';
import {StreetScene,JourneyScene,PortraitScene} from './LifeScenes';
import {C,FONT,KoreaBeat} from '../types';
import timing from '../data/timing.json';

const Content:React.FC<{beat:KoreaBeat}>=({beat})=>{
 if(beat.mode==='hook'||beat.mode==='question')return <OpeningHook beat={beat}/>;
 switch(beat.grammar){
  case 'throne':return <ThroneScene beat={beat}/>;
  case 'palace':return <PalaceScene beat={beat}/>;
  case 'gate':return <GateScene beat={beat}/>;
  case 'meeting':return <MeetingScene beat={beat}/>;
  case 'desk':return <DeskScene beat={beat}/>;
  case 'ballot':return <BallotScene beat={beat}/>;
  case 'map':return <MapScene beat={beat}/>;
  case 'document':return <DocumentScene beat={beat}/>;
  case 'street':return <StreetScene beat={beat}/>;
  case 'journey':return <JourneyScene beat={beat}/>;
  case 'portrait':return <PortraitScene beat={beat}/>;
  default:return <ArchiveScene beat={beat}/>;
 }
};
export const Scene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();
 const caption=timing.captions.find(c=>c.scriptId===beat.scriptId&&c.startMs<=(beat.startFrame+f)/30*1000&&c.endMs>(beat.startFrame+f)/30*1000);
 return <AbsoluteFill style={{background:C.ink,fontFamily:FONT,overflow:'hidden'}}>
  <Content beat={beat}/>
  <div style={{position:'absolute',inset:0,boxShadow:'inset 0 0 80px #07121A22',pointerEvents:'none'}}/>
  <div style={{position:'absolute',left:48,right:48,top:25,height:58,padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#101D23EA',borderBottom:`3px solid ${C.gold}`,color:C.cream}}>
   <span style={{fontWeight:800,fontSize:27,letterSpacing:.3}}>{beat.chapter}</span><span style={{fontSize:23,fontWeight:800,color:C.gold}}>왕정에서 공화국으로</span>
  </div>
  {caption&&<div style={{position:'absolute',left:125,right:125,bottom:29,display:'flex',justifyContent:'center'}}><div style={{maxWidth:1630,fontSize:42,fontWeight:800,lineHeight:1.4,textAlign:'center',color:'#F8F1DE',background:'#152025F2',borderTop:`4px solid ${C.gold}`,padding:'11px 25px',wordBreak:'keep-all'}}>{caption.text}</div></div>}
 </AbsoluteFill>;
};
