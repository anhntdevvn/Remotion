import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {Actor} from '../components/Actor';
import {Set,Throne} from '../components/Set';
import {C,clamp,FONT,KoreaBeat} from '../types';
import {sentenceFrame} from '../timing';

export const ThroneScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();
 const isEnding=['answer','ending','return-not-rule'].includes(beat.mode);
 const reveal=sentenceFrame(beat,1);
 const kingOpacity=beat.mode==='hook'?interpolate(f,[Math.max(0,reveal-5),reveal+12],[1,0],clamp):0;
 const words=beat.mode==='hook'?['500년 왕조','해방 뒤, 빈 왕좌']:beat.mode==='question'?['왜 왕은','돌아오지 않았나?']:beat.mode==='rank'?['황실은 남았다','통치권은 사라졌다']:beat.mode==='return-not-rule'?['사람의 귀환','왕권의 귀환은 아니었다']:['되찾은 나라','돌아오지 않은 왕좌'];
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 72% 47%,#415850,#172B31 47%,#0B1823)'}}>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <path d="M1110 140H1810V990H1110Z" fill="#A9AF8B" opacity={interpolate(f,[0,65],[.05,.14],clamp)}/>
   <path d="M0 875H1920V1080H0Z" fill="#292D29"/>
   <path d="M1160 986L790 1080H1830L1780 985Z" fill="#C4AB69" opacity=".1"/>
   <g stroke="#D8C49A" opacity=".13" strokeWidth="4"><path d="M1220 121V902M1720 121V902M1090 210H1840M1090 300H1840"/></g>
  </svg>
  <Throne x={1450} y={230} width={490}/>
  {beat.mode==='hook'&&<div style={{opacity:kingOpacity}}><Actor role="gojong" x={1450} y={238} height={710} seated pose="hands-behind"/></div>}
  {isEnding&&<Actor role="yiun-old" x={325} y={495} height={540} seated pose="hands-behind"/>}
  <div style={{position:'absolute',left:isEnding?580:120,top:isEnding?360:310,maxWidth:isEnding?700:1000,fontFamily:FONT}}>
   <div style={{color:C.gold,fontWeight:900,fontSize:isEnding?64:92,letterSpacing:-3}}>{words[0]}</div>
   <div style={{color:C.cream,fontWeight:900,fontSize:isEnding?68:103,lineHeight:1.22,marginTop:20,opacity:beat.mode==='hook'?interpolate(f,[reveal,reveal+10],[0,1],clamp):1,whiteSpace:'pre-line',letterSpacing:-4}}>{words[1]}</div>
   <div style={{height:7,width:130,background:C.red,marginTop:35}}/>
  </div>
  {beat.mode==='rank'&&<div style={{position:'absolute',left:130,top:654,color:C.cream,fontSize:60,fontWeight:800}}>황제 → 이왕</div>}
  {beat.mode==='hook'&&<div style={{position:'absolute',left:130,top:647,color:C.paper,fontSize:43,opacity:interpolate(f,[reveal,reveal+10],[0,1],clamp)}}>1910년 국권 상실 → 1945년 해방</div>}
 </AbsoluteFill>;
};

export const PalaceScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const abdicate=beat.mode==='abdicate';const empire=beat.mode==='empire'; const transfer=sentenceFrame(beat,1);
 const p=interpolate(f,[35,125],[0,1],clamp);
 return <AbsoluteFill>
  <Set/>
  <Throne x={1130} y={290} width={385}/>
  <Actor role="gojong" x={abdicate?1130:1120} y={230} height={690} pose={abdicate?(f<transfer?'hold-document':'hands-behind'):(f<65?'hold-document':'explain-left')} seated={!abdicate} travel={abdicate?-480:0} start={transfer} end={transfer+90} name={abdicate?'고종 · 강제 퇴위':'고종'}/>
  {abdicate?<Actor role="sunjong" x={1620} y={260} height={670} travel={-490} start={transfer+5} end={transfer+90} pose="hold-document"/>:<>
   <Actor role="clerk" x={360} y={472} height={465} pose="read" prop="folder"/>
   <Actor role="clerk" x={650} y={485} height={450} facing="profile"/>
  </>}
  <div style={{position:'absolute',left:92,top:220,width:abdicate?440:undefined,whiteSpace:'pre-line',lineHeight:1.2,color:C.ink,fontSize:abdicate?72:empire?94:85,fontWeight:900,textShadow:'0 3px 0 #D4C9A3'}}>{empire?'1897 · 대한제국':abdicate?'1907\n강제 퇴위':'500년 넘게 이어진 왕실'}</div>
  {empire&&<div style={{position:'absolute',left:94,top:350,width:690,padding:'20px 25px',background:'#E7D5ABB8',fontSize:42,fontWeight:800,color:C.ink,opacity:p}}>자주국 선언 · 황제 중심의 개혁</div>}
  {abdicate&&<div style={{position:'absolute',left:95,top:445,width:360,padding:'17px 23px',whiteSpace:'pre-line',lineHeight:1.3,background:C.ink,color:C.cream,fontSize:38,fontWeight:800}}>{'헤이그 특사\n→ 일본의 퇴위 강요'}</div>}
 </AbsoluteFill>;
};

export const GateScene:React.FC<{beat:KoreaBeat}>=()=>{
 const f=useCurrentFrame();const close=interpolate(f,[20,130],[0,1],clamp);
 return <AbsoluteFill>
  <Set kind="palace"/>
  <Actor role="sunjong" x={845} y={310} height={570} travel={-380} start={12} end={104} pose="hands-behind"/>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <path d="M710 250H1320V843H710Z" fill="#1C302E" stroke={C.ink} strokeWidth="12"/>
   <g stroke="#38291F" strokeWidth="7" fill="#864933">
    <rect x={710-300*(1-close)} y="298" width="300" height="540"/>
    <rect x={1020+300*(1-close)} y="298" width="300" height="540"/>
   </g>
   <path d="M650 300Q780 260 853 189H1184Q1270 262 1384 300L1355 335H680Z" fill="#2F4140" stroke={C.ink} strokeWidth="9"/>
   <path d="M723 818H1307V880H723Z" fill="#B9AD8E" stroke={C.ink} strokeWidth="6"/>
  </svg>
  {[0,1,2].map(i=><Actor key={i} role="japan" x={1420+i*195} y={380-i*20} height={540+i*40} travel={-130} start={120+i*7} end={210+i*7} pose="march" motionOffset={i+1}/>)}
  <div style={{position:'absolute',left:95,top:192,color:C.ink,fontSize:102,fontWeight:900}}>1910</div>
  <div style={{position:'absolute',left:75,top:340,width:270,color:C.ink,fontSize:42,fontWeight:900,lineHeight:1.3}}>강제병합<br/>통치권을 잃은<br/>왕실</div>
 </AbsoluteFill>;
};
