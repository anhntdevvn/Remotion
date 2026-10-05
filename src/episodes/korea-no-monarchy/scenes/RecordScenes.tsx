import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {Actor} from '../components/Actor';
import {C,clamp,KoreaBeat} from '../types';
import {sentenceFrame} from '../timing';

export const DocumentScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const p=interpolate(f,[15,65],[0,1],clamp);
 const charter=beat.mode==='charter';const constitution=beat.mode==='constitution';
 return <AbsoluteFill style={{background:'linear-gradient(120deg,#182D32,#364B45)'}}>
  <div style={{position:'absolute',left:130,top:225,width:1660,height:665,background:C.paper,boxShadow:'0 22px 34px #07101477',padding:'50px 65px',rotate:'-.7deg',boxSizing:'border-box'}}>
   <div style={{color:C.red,fontSize:36,fontWeight:900}}>{charter?'1919 · 대한민국 임시헌장':constitution?'1948 · 대한민국 제헌헌법':'1905 · 을사늑약'}</div>
   <div style={{color:C.ink,fontSize:90,fontWeight:900,marginTop:23}}>{charter||constitution?'왕이 아닌 국민':'외교권을 빼앗기다'}</div>
   <div style={{height:3,background:'#938267',margin:'30px 0'}}/>
   <div style={{fontSize:charter?75:65,lineHeight:1.4,fontWeight:900,color:C.ink,background:`linear-gradient(90deg,#D2AB58AA ${p*100}%,transparent ${p*100}%)`,padding:'8px 14px',width:charter?1260:1360}}>{charter?'제1조 · 대한민국은 민주공화제로 함.':constitution?'제1조 · 대한민국은 민주공화국이다.':'일본이 외교권을 장악 · 통감 설치'}</div>
   {constitution&&<div style={{fontSize:58,fontWeight:800,color:C.ink,marginTop:25}}>제2조 · 주권은 국민에게 있다.</div>}
   <div style={{position:'absolute',bottom:36,left:66,fontSize:27,color:'#665D4A'}}>핵심 조항 요약 · 설명용 재구성</div>
  </div>
 </AbsoluteFill>;
};

export const ArchiveScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const p=interpolate(f,[15,75],[0,1],clamp);
 const answers=beat.mode==='answer';const heir=beat.mode==='heir';const gap=beat.mode==='gap';const legacy=beat.mode==='legitimacy';
 const title=answers?'세 가지 변화가 겹쳤다':heir?'왕실의 계승 ≠ 국가의 통치':gap?'1910 → 1945 · 35년의 단절':legacy?'왕으로 돌아오기 어려운 이력':'이미 자리 잡은 국가체제';
 return <AbsoluteFill style={{background:'linear-gradient(130deg,#DCD0AE,#B3B098)'}}>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><g fill="#5B6153" stroke="#283A35" strokeWidth="7">{[0,1,2].map(i=><g key={i}><rect x="120" y={230+i*190} width="620" height="157" rx="5"/><rect x="290" y={270+i*190} width="265" height="65" fill="#CDBD91"/><path d={`M390 ${305+i*190}H455`} stroke="#525E51" strokeWidth="11"/></g>)}</g></svg>
  <div style={{position:'absolute',left:90,top:133,color:C.ink,fontSize:62,fontWeight:900}}>{title}</div>
  {answers?<>
   {['식민 지배로 끊어진 통치체제','독립운동의 공화주의','분단 뒤 형성된 새 권력'].map((t,i)=><div key={t} style={{position:'absolute',left:790,top:300+i*165,width:1000,padding:'22px 28px',background:i===2?C.ink:C.cream,color:i===2?C.cream:C.ink,fontSize:49,fontWeight:900,borderLeft:`10px solid ${C.red}`,opacity:interpolate(f,[sentenceFrame(beat,1)+i*70,sentenceFrame(beat,1)+i*70+18],[0,1],clamp)}}>{String(i+1).padStart(2,'0')} · {t}</div>)}
  </>:<>
   <div style={{position:'absolute',left:590+60*p,top:346,width:500,height:290,rotate:'-7deg',background:C.cream,border:`7px solid ${C.ink}`,boxShadow:'0 16px 30px #0004',padding:'25px 30px',boxSizing:'border-box'}}>
    <div style={{fontSize:49,fontWeight:900,color:C.ink}}>{heir?'1926 · 순종 사망':gap?'옛 왕실의 통치체제':legacy?'일본에 묶인 계승자':'1953 · 정전 이후'}</div>
    <div style={{fontSize:40,fontWeight:700,color:'#75664D',marginTop:28,lineHeight:1.5}}>{heir?'이은이 왕실 지위 계승':gap?'되돌릴 정부가 남아 있는가?':legacy?'강제 체류 · 교육 · 군 경력':'정부 · 헌법 · 권력구조'}</div>
   </div>
   <Actor role={heir?'yiun':legacy?'child':gap?'uichin':'rhee'} x={1470} y={235} height={690} pose={f<65?'read':'hands-behind'} prop={f<65?'folder':'none'} name={heir?'이은 · 영친왕':legacy?'정치적 부담과 강제적 환경':gap?'35년 뒤의 정치세력':'새 국가의 제도'}/>
  </>}
 </AbsoluteFill>;
};
