import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {Actor} from '../components/Actor';
import {Set} from '../components/Set';
import {C,clamp,KoreaBeat} from '../types';
import {sentenceFrame} from '../timing';

export const StreetScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const war=beat.mode==='war';
 return <AbsoluteFill>
  <Set kind="street" war={war}/>
  {war&&<svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><g fill="#394341" opacity=".6"><path d="M100 530Q21 488 115 403Q74 322 163 284Q182 233 217 279Q304 312 227 385Q290 475 198 531Z"/><path d="M1685 566Q1632 498 1694 417Q1650 362 1712 297Q1831 299 1790 398Q1890 503 1810 566Z"/></g></svg>}
  {[0,1,2,3].map(i=><Actor key={i} role="civilian" x={war?1200+i*210:260+i*345} y={i%2?380:280} height={i%2?545:660} hair={i%2?'crop':'waves'} travel={war?-730:50} start={i*13} end={war?240+i*13:65+i*13} pose={war?'carry':f<70?'arms-raised':'explain-right'} prop={war?'box':'none'} expression={war?'concerned':'warm'} motionOffset={i+1}/>)}
  <div style={{position:'absolute',left:83,top:133,color:C.ink,fontSize:90,fontWeight:900}}>{war?'1950 · 한국전쟁':'1945 · 해방'}</div>
  <div style={{position:'absolute',left:war?103:790,top:war?299:231,color:war?C.cream:C.ink,background:war?'#192930CC':'#D7C7A7DD',fontSize:57,fontWeight:900,padding:'16px 24px',lineHeight:1.35}}>{war?<>생존과 전쟁<br/>그리고 분단</>:<>식민 지배의 끝<br/>새 정부는 아직 남은 문제</>}</div>
 </AbsoluteFill>;
};

export const PortraitScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame(); const marriage=sentenceFrame(beat,1);
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 25% 50%,#67694F,#1A3036 67%)'}}>
  <Actor role="yiun" x={460} y={145} height={800} pose={f<120?'neutral':'read'} prop={f<120?'none':'folder'} name="이은 · 영친왕"/>
  <div style={{position:'absolute',left:870,top:250,fontSize:78,fontWeight:900,color:C.cream}}>일본에 묶인 삶</div>
  <div style={{position:'absolute',left:880,top:430,width:850,padding:'22px 30px',background:C.cream,color:C.ink,fontSize:52,fontWeight:800}}>일본식 교육 · 일본 육군 복무</div>
  <div style={{position:'absolute',opacity:interpolate(f,[marriage,marriage+15],[0,1],clamp),left:880,top:630,width:850,padding:'22px 30px',background:C.paper,color:C.ink,fontSize:50,fontWeight:800}}>1920 · 이방자와 정략결혼</div>
 </AbsoluteFill>;
};

export const JourneyScene:React.FC<{beat:KoreaBeat}>=({beat})=>{
 const f=useCurrentFrame();const returnHome=beat.mode==='return';const escape=beat.mode==='uichin';const blocked=beat.mode==='blocked';
 const p=interpolate(f,[10,100],[0,1],clamp); const childStart=sentenceFrame(beat,1); const hostage=beat.mode==='hostage';
 return <AbsoluteFill>
  <Set kind={escape?'night':'street'}/>
  <div style={{position:'absolute',left:90,top:138,fontSize:82,fontWeight:900,color:escape?C.cream:C.ink}}>{returnHome?'1963 · 마침내 귀국':escape?'1919 · 의친왕 탈출 시도':blocked?'해방 뒤에도 막힌 귀국':f<childStart?'왕위 계승자 이은':'1907 · 어린 황태자의 일본행'}</div>
  {returnHome?<>
   {/* Return is depicted in a chair, not a triumphant walk: Yi Un was ill. */}
   <div style={{position:'absolute',left:430+250*p,top:225,width:530,height:650}}>
    <svg viewBox="0 0 530 650" style={{position:'absolute',inset:0}}><path d="M185 283V94H331V440H170V324" fill="#344850" stroke={C.ink} strokeWidth="13"/><path d="M139 322H183V450M325 320H383V446M197 447L173 582H360L350 443" fill="none" stroke="#A2B0AA" strokeWidth="13"/></svg>
    <Actor role="yiun-old" x={253} y={-12} height={630} seated pose="hands-behind"/>
    <svg viewBox="0 0 530 650" style={{position:'absolute',inset:0}}><circle cx="190" cy="490" r="108" fill="#243139" stroke="#B9B9A9" strokeWidth="10"/><circle cx="190" cy="490" r="83" fill="none" stroke="#6B7C7C" strokeWidth="6"/><path d="M190 403V577M103 490H277M128 428L252 552M128 552L252 428" stroke="#8D9992" strokeWidth="5"/><circle cx="386" cy="571" r="33" fill="#202E37" stroke="#B9B9A9" strokeWidth="9"/></svg>
   </div>
   <Actor role="bangja" x={355} y={277} height={660} travel={250} start={10} end={100} pose="carry" prop="folder"/>
   <div style={{position:'absolute',left:1275,top:439,color:C.ink,fontSize:65,fontWeight:900,lineHeight:1.4}}>가족의 귀환<br/><span style={{color:C.red,opacity:interpolate(f,[sentenceFrame(beat,1),sentenceFrame(beat,1)+15],[0,1],clamp)}}>왕정 복구는 아니다</span></div>
  </>:<>
   <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><path d="M1190 834V332H1760V834" fill={escape?'#456060':'#596F6C'} stroke={C.ink} strokeWidth="12"/><path d="M1250 806V395H1700V806" fill={escape?'#10232F':'#C2CDB5'}/><path d="M1146 326H1805V368H1146Z" fill="#4C4840" stroke={C.ink} strokeWidth="9"/></svg>
   <Actor role={escape?'uichin':blocked?'yiun':f<childStart?'yiun':'child'} x={520} y={blocked?287:escape?280:367} height={blocked?665:escape?665:540} travel={escape?520:390} start={hostage?childStart:12} end={hostage?childStart+88:100} pose="march" expression="concerned"/>
   {!blocked&&<Actor role="japan" x={1510} y={294} height={635} pose={escape?'rifle-ready':'hands-behind'} prop={escape?'rifle':'none'} expression="stern"/>}
   <div style={{position:'absolute',left:1240,top:441,width:420,fontSize:52,fontWeight:900,color:escape?C.cream:C.ink,textAlign:'center'}}>{escape?'상하이행 시도':blocked?'귀국 요청':f<childStart?'그의 삶은 어디에 있었나?':'일본으로'}</div>
   {(escape||blocked)&&<div style={{position:'absolute',left:1235,top:610,rotate:'-9deg',border:`8px solid ${C.red}`,background:'#E3D2ABEC',padding:'12px 23px',color:C.red,fontSize:65,fontWeight:900,opacity:p}}>{escape?'시도 실패':'귀국 좌절'}</div>}
  </>}
  <div style={{position:'absolute',left:90,bottom:145,color:escape?C.cream:C.ink,fontSize:28}}>경로와 동작은 설명용 재구성</div>
 </AbsoluteFill>;
};
