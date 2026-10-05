import React,{useId} from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import coastlines from '../data/coastlines.json';
import {C,clamp,FONT,KoreaBeat} from '../types';
const xy=(lon:number,lat:number)=>[(lon-102)*35,(48-lat)*27];

export const MapScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const id=useId().replace(/:/g,'');
 const division=['division','two-states'].includes(beat.mode);
 const p=interpolate(f,[20,90],[0,1],clamp);
 const korean=coastlines.filter(c=>['KOR','PRK'].includes(c.code));
 const titles:Record<string,string[]>= {
  qing:['청일전쟁 이후','약해진 청의 영향력'],balance:['열강의 균형','러시아로 일본 견제'],russia:['1905 · 러일전쟁','좁아지는 외교적 여지'],division:['1945 · 북위 38도','항복 접수 → 정치적 분단'],'two-states':['1948 · 두 국가','서로 다른 두 공화국']
 };
 const text=titles[beat.mode]||titles.division;
 return <AbsoluteFill style={{background:'#203C49'}}>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><defs><pattern id={`${id}-grid`} width="90" height="90" patternUnits="userSpaceOnUse"><path d="M90 0H0V90" fill="none" stroke="#D6C798" strokeWidth="1"/></pattern></defs><rect width="1920" height="1080" fill={`url(#${id}-grid)`} opacity=".13"/></svg>
  <svg viewBox={division?'625 55 650 440':'60 -60 1500 1000'} style={{position:'absolute',left:division?785:675,top:division?229:220,width:division?1020:1170,height:division?680:720}}>
   <defs><clipPath id={`${id}-korea`}>{korean.map(c=><path key={c.code} d={c.path}/>)}</clipPath></defs>
   {coastlines.filter(c=>!['KOR','PRK'].includes(c.code)).map(c=><path key={c.code} d={c.path} fill="#8F987F" stroke="#495D55" strokeWidth="2"/>)}
   {korean.map(c=><path key={c.code} d={c.path} fill={division?'#D5CFB2':C.gold}/>)}
   {division&&<g clipPath={`url(#${id}-korea)`}>
    {/* These masks use the actual 38th parallel, not the modern DMZ. */}
    <rect x="700" y="0" width="410" height="270" fill="#AF5147" opacity={p}/>
    <rect x="700" y="270" width="410" height="330" fill="#D8CEAD" opacity={p}/>
   </g>}
   {!division&&<g fontFamily={FONT} fontWeight="800" fontSize="48" fill={C.ink}>
    <text x="365" y="195">청</text><text x="1030" y="-3">러시아</text><text x="1203" y="465">일본</text>
   </g>}
   {beat.mode==='balance'&&<g fill="none" stroke={C.cream} strokeWidth="9" strokeDasharray="14 10"><path d={`M1010 74Q928 154 ${875-30*p} ${250-25*p}`}/><path d={`M1150 346Q1007 400 ${927-25*p} ${310-20*p}`}/></g>}
   {beat.mode==='qing'&&<path d="M542 352Q680 263 837 260" stroke={C.cream} strokeWidth="7" fill="none" strokeDasharray="14 9" opacity={1-p*.8}/>}
   {beat.mode==='russia'&&<g><path d="M998-15L1134 51M1134-15L998 51" stroke={C.red} strokeWidth="17"/><path d="M1145 322Q1010 295 897 258" fill="none" stroke={C.red} strokeWidth="10"/><path d="M897 258L941 251L928 290Z" fill={C.red}/></g>}
   {division&&<>
    <path d={`M726 270H${726+325*p}`} fill="none" stroke={C.cream} strokeWidth="5" strokeDasharray="10 7"/>
    <text x="1025" y="265" fill={C.cream} fontSize="30" fontFamily={FONT} fontWeight="900">38° N</text>
    <text x="867" y="207" fill={C.cream} fontSize="35" fontFamily={FONT} fontWeight="900" textAnchor="middle">{beat.mode==='division'?'소련군':'북쪽'}</text>
    <text x="904" y="336" fill={C.ink} fontSize="31" fontFamily={FONT} fontWeight="900" textAnchor="middle">{beat.mode==='division'?'미군':'남쪽'}</text>
    <circle cx={xy(126.98,37.57)[0]} cy={xy(126.98,37.57)[1]} r="5" fill={C.ink}/>
    <text x="938" y="289" fill={C.cream} fontSize="23" fontFamily={FONT}>서울</text>
   </>}
  </svg>
  <div style={{position:'absolute',left:85,top:265,width:710,color:C.cream,fontFamily:FONT,fontWeight:900,fontSize:81,lineHeight:1.28,letterSpacing:-3}}>{text[0]}<br/><span style={{fontSize:61,color:C.gold}}>{text[1]}</span></div>
  {beat.mode==='two-states'&&<div style={{position:'absolute',left:100,top:598,width:575,fontSize:47,fontWeight:800,color:C.cream,lineHeight:1.5}}>다른 정치체제<br/>왕조 복구는 선택되지 않았다</div>}
  <div style={{position:'absolute',left:90,bottom:142,fontSize:28,color:'#DFDBC4'}}>현재 해안선 기반 설명 지도 · 현대 군사분계선을 표시한 것이 아님</div>
 </AbsoluteFill>;
};
