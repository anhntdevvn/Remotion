import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../types';

const Mountain:React.FC=()=> <g>
 <path d="M0 670L235 530L399 614L690 340L978 579L1232 467L1520 574L1720 358L1920 571V880H0Z" fill="#566458"/>
 <path d="M0 727L220 643L499 758L763 572L990 738L1284 633L1531 784L1920 630V880H0Z" fill="#718075"/>
</g>;
export const Set:React.FC<{kind?:'palace'|'office'|'street'|'night';war?:boolean}>=({kind='palace',war=false})=><AbsoluteFill style={{background:kind==='night'?'#1B2E3A':kind==='office'?'#C8BC9D':'#ABC0B8'}}>
 <svg viewBox="0 0 1920 1080" width="100%" height="100%">
  {kind==='palace'||kind==='street'?<>
   <Mountain/>
   <g fill="#DEDAC6" opacity=".7"><path d="M80 291q31-63 91-38q48-64 93 7q81-5 85 44Z"/><path d="M1210 284q43-67 113-35q55-67 123 0q77-15 112 34Z"/></g>
   <path d="M0 812H1920V1080H0Z" fill={war?'#716C62':'#A6987E'}/>
   <path d="M0 960H1920M260 1080L681 813M1680 1080L1217 813" stroke="#766D58" strokeWidth="5"/>
   {kind==='palace'?<g stroke={C.ink} strokeWidth="6">
    <path d="M244 409H1655V811H244Z" fill="#BAA780"/>
    <path d="M190 420Q346 378 420 306H1505Q1590 380 1736 420L1666 449H258Z" fill="#334544"/>
    <path d="M223 413H1700M309 451H1603" stroke="#D1B06B" strokeWidth="11"/>
    {[310,580,850,1120,1390,1600].map(x=><g key={x}><path d={`M${x} 449V815`} stroke="#844334" strokeWidth="38"/><path d={`M${x-24} 813H${x+24}`} stroke="#D1BCA0" strokeWidth="55"/></g>)}
    {[400,680,970,1250].map(x=><g key={x}><rect x={x} y="487" width="160" height="320" fill="#E0D6B8"/>{[0,1,2,3].map(i=><path key={i} d={`M${x+20+i*37} 487V807`} stroke="#7D5C43" strokeWidth="4"/>)}<path d={`M${x} 570H${x+160}M${x} 663H${x+160}M${x} 753H${x+160}`} stroke="#7D5C43" strokeWidth="4"/></g>)}
    <path d="M240 817H1670L1734 854H178V839Z" fill="#BDB69D"/>
   </g>:<g fill={war?'#4D534E':'#6C7A6E'} stroke={C.ink} strokeWidth="5">
    <path d="M0 805V479H265V805M360 805V395H732V805M1370 805V426H1919V805"/>
    <path d="M-26 470L120 392L291 470Z M328 397L543 306L765 397Z M1335 427L1660 294L1948 427Z"/>
    <g stroke="#CFBD96" strokeWidth="7"><path d="M430 495H669M430 625H669M1440 535H1847M1440 665H1847"/></g>
   </g>}
  </>:<>
   <rect x="120" y="176" width="1680" height="655" fill={kind==='night'?'#273D45':'#B3A47F'} stroke="#71644D" strokeWidth="9"/>
   {[210,1350].map(x=><g key={x}><rect x={x} y="225" width="345" height="436" fill={kind==='night'?'#526871':'#819994'} stroke="#714B3C" strokeWidth="17"/><path d={`M${x+170} 225V661M${x} 439H${x+345}`} stroke="#DED3B3" strokeWidth="8"/></g>)}
   <path d="M0 831H1920V1080H0Z" fill="#5D5143"/>
   <path d="M0 959H1920M410 1080L740 831M1520 1080L1217 831" stroke="#403E34" strokeWidth="6"/>
  </>}
 </svg>
</AbsoluteFill>;

export const Throne:React.FC<{x?:number;y?:number;width?:number;empty?:boolean}>=({x=960,y=270,width=420,empty=true})=><svg viewBox="0 0 480 630" style={{position:'absolute',left:x-width/2,top:y,width,height:width*630/480}}>
 <g stroke="#18232A" strokeWidth="7">
  <path d="M35 628V37H445V628" fill="#446459"/>
  <circle cx="86" cy="91" r="26" fill="#C4523D"/><circle cx="391" cy="91" r="26" fill="#E6D5AC"/>
  <path d="M39 327L116 153L170 284L240 109L307 271L368 151L442 327" fill="#5F7468" stroke="#D4BE8F" strokeWidth="5"/>
  <path d="M41 416Q108 365 173 417T306 417T442 417M41 450Q111 401 180 449T313 449T442 449" fill="none" stroke="#A6B6A2" strokeWidth="7"/>
  <path d="M114 597V281Q120 228 170 228H310Q358 228 366 281V597" fill="#8F4033"/>
  <path d="M91 405H150V445H91V597M330 405H389V445H389V597M132 489H348V530H132Z" fill="#BC9654"/>
  <path d="M161 299H319V486H161Z" fill="#774B32" stroke="#D9BA70" strokeWidth="7"/>
  <circle cx="240" cy="373" r="43" fill="none" stroke="#D9BA70" strokeWidth="6"/>
  {empty&&<path d="M186 377Q239 334 294 377" fill="none" stroke="#D9BA70" strokeWidth="6"/>}
 </g>
</svg>;

export const Desk:React.FC<{x?:number;y?:number;width?:number}>=({x=320,y=740,width=1280})=><svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
 <g stroke={C.ink} strokeWidth="7"><path d={`M${x+90} ${y}V1080H${x+135}V${y}M${x+width-135} ${y}V1080H${x+width-90}V${y}`} fill="#323936"/><path d={`M${x} ${y}L${x+110} ${y-72}H${x+width-110}L${x+width} ${y}V${y+88}H${x}Z`} fill="#69523D"/><path d={`M${x} ${y}H${x+width}`} stroke={C.gold} strokeWidth="9"/></g>
</svg>;
