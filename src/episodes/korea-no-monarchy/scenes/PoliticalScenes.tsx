import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {Actor,Role} from '../components/Actor';
import {Desk,Set} from '../components/Set';
import {C,clamp,FONT,KoreaBeat} from '../types';
import {sentenceFrame} from '../timing';

const Paper:React.FC<{x?:number;y?:number;text?:string}>=({x=840,y=665,text='새 정부 구상'})=><div style={{position:'absolute',left:x,top:y,width:560,height:95,background:C.cream,border:`4px solid ${C.ink}`,rotate:'-5deg',fontSize:37,fontWeight:800,display:'grid',placeItems:'center',color:C.ink}}>{text}</div>;

export const MeetingScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const trusteeship=['trusteeship','not-britain'].includes(beat.mode);const north=beat.mode==='north';
 const roles:Role[]=trusteeship?['us','soviet','clerk','clerk']:north?['kim','soviet','clerk']:['rhee','us','clerk'];
 const labels=trusteeship?['미국','소련','영국','중국']:north?['김일성','소련 측','행정 담당']:['이승만','미군정 측','행정 담당'];
 return <AbsoluteFill>
  <Set kind="office"/>
  {roles.map((role,i)=><Actor key={i} role={role} x={410+i*(trusteeship?350:550)} y={226+i%2*40} height={630} seated pose={i===0?(f<65?'read':'explain-right'):i===1?'point-left':'read'} prop={i===0?'folder':'none'} gaze={i===0?1:-1}/>)}
  {labels.map((label,i)=><div key={label} style={{position:'absolute',left:410+i*(trusteeship?350:550)-100,top:221,width:200,textAlign:'center',color:C.ink,fontSize:33,fontWeight:900}}>{label}</div>)}
  <Desk y={778}/>
  <Paper x={780} y={705} text={trusteeship?'4개국 신탁통치 구상':north?'북쪽의 새 체제':'남쪽의 새 정부'}/>
  <div style={{position:'absolute',left:74,top:125,color:C.ink,fontSize:58,fontWeight:900}}>{beat.mode==='not-britain'&&f>=sentenceFrame(beat,1)?'누가 새 권력의 주체인가?':trusteeship?'점령의 현실과 신탁통치의 구상':north?'왕조 복구가 아닌 새 권력':'반공 노선과 공화국 지도자'}</div>
  <div style={{position:'absolute',left:90,bottom:140,color:C.cream,fontSize:28}}>실제 회의 장면이 아닌 설명용 재구성</div>
 </AbsoluteFill>;
};

export const DeskScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const sunjong=beat.mode==='sunjong';
 return <AbsoluteFill>
  <Set kind="office"/>
  <Actor role={sunjong?'sunjong':'clerk'} x={620} y={212} height={675} seated pose={f<75?'read':sunjong?'hands-behind':'write'} prop={f<75?'folder':sunjong?'none':'pen'}/>
  <Actor role={sunjong?'japan':'uichin'} x={1270} y={234} height={690} pose={f<100?'hold-document':'point-left'}/>
  <Desk y={765}/>
  <Paper x={sunjong?800:565} y={686} text={sunjong?'법령 · 관리 임명':'복위인가, 새 국가인가?'}/>
  <div style={{position:'absolute',left:84,top:134,fontSize:62,fontWeight:900,color:C.ink}}>{sunjong?'황제는 바뀌었지만 주권은 돌아오지 않았다':'독립의 길이 하나였던 것은 아니다'}</div>
 </AbsoluteFill>;
};

export const BallotScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const begin=sentenceFrame(beat,1); const drop=begin+64; const done=drop+45; const p=interpolate(f,[drop,done],[0,1],clamp);
 return <AbsoluteFill>
  <Set kind="office"/>
  <Actor role="clerk" x={460} y={170} height={730} travel={455} start={begin} end={drop} pose={f<done?'pass-right':'neutral'}/>
  <Actor role="rhee" x={1440} y={224} height={710} pose="hands-behind" name="이승만"/>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <path d="M973 594H1243V840H973Z" fill="#647977" stroke={C.ink} strokeWidth="8"/>
   <path d="M939 594L1001 548H1214L1274 594Z" fill="#87958A" stroke={C.ink} strokeWidth="8"/>
   <path d="M1047 578H1188" stroke={C.ink} strokeWidth="10"/>
   {f<done&&<g transform={`translate(${623+interpolate(f,[begin,drop],[0,455],clamp)} 578)`}><rect x="0" y={-78*(1-p)} width="105" height={78*(1-p)} fill={C.cream} stroke={C.ink} strokeWidth="3"/></g>}
   <text x="1106" y="706" fill={C.cream} fontFamily={FONT} fontSize="54" fontWeight="900" textAnchor="middle">투표</text>
  </svg>
  <div style={{position:'absolute',left:75,top:118,color:C.ink,fontSize:79,lineHeight:1.1,fontWeight:900}}>{f<begin?'미국의 직접 임명?':'1948년 7월 20일'}</div>
  <div style={{position:'absolute',left:95,top:214,color:C.ink,fontSize:40,lineHeight:1.1,fontWeight:800}}>{f<begin?'그렇게 단순한 과정은 아니었다':'국회의원 투표로 대통령 선출'}</div>
  {f>done&&<div style={{position:'absolute',left:90,top:500,background:C.ink,color:C.cream,fontSize:55,fontWeight:900,padding:'16px 24px'}}>이승만 당선</div>}
 </AbsoluteFill>;
};
