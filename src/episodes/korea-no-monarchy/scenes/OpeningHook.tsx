import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Actor} from '../components/Actor';
import {Throne} from '../components/Set';
import {C, clamp, KoreaBeat} from '../types';
import {sentenceFrame} from '../timing';

/** Same room and framing at the match cut; empty space carries the reversal. */
const AudienceHall: React.FC<{empty: boolean; angled?: boolean}> = ({empty, angled=false}) => (
 <AbsoluteFill style={{background:empty?'#1D302F':'#495749'}}>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <path d={angled?'M0 125L1290 210V790L0 1000Z':'M165 135H1755V847H165Z'} fill={empty?'#35473D':'#8A7A55'}/>
   <g stroke={empty?'#6C7058':'#C1A568'} strokeWidth="7">
    {[250,1480].map(x=><g key={x}><rect x={x} y="231" width="190" height="528" fill={empty?'#49635C':'#A7B6A0'}/>{[0,1,2,3,4].map(i=><path key={i} d={`M${x+20+i*38} 233V757`} strokeWidth="3"/>)}<path d={`M${x} 355H${x+190}M${x} 480H${x+190}M${x} 606H${x+190}`}/></g>)}
   </g>
   <path d="M0 850H1920V1080H0Z" fill={empty?'#3D4135':'#99876B'}/>
   <g stroke={empty?'#66664D':'#B7A67C'} strokeWidth="4"><path d="M960 845L300 1080M960 845L1620 1080M960 845L60 1080M960 845L1860 1080M0 957H1920M0 1040H1920"/></g>
   <path d={angled?'M375 745H845L1010 890H130L250 819Z':'M648 780H1272L1438 942H482L536 889H1384L1317 829H603Z'} fill={empty?'#69624B':'#B5A17A'} stroke="#26312B" strokeWidth="7"/>
   <path d="M0 104H1920V206H0Z" fill={empty?'#3A5348':'#506F59'} stroke="#182A2A" strokeWidth="10"/>
   <path d="M0 131H1920M0 182H1920" stroke={empty?'#827758':'#CFB174'} strokeWidth="10"/>
   {[70,310,550,790,1030,1270,1510,1750].map(x=><g key={x} stroke={empty?'#9A8660':'#DDC28A'} strokeWidth="4" fill="none"><path d={`M${x} 150q35-33 70 0q-35 34-70 0Z`}/><circle cx={x+35} cy="150" r="8"/></g>)}
   <g fill={empty?'#563D33':'#86533C'} stroke="#23312D" strokeWidth="10"><path d="M75 205H155V879H75Z M1765 205H1845V879H1765Z"/></g>
   <path d="M155 210H1765V826H155Z" fill="none" stroke="#C3B080" strokeWidth="3" opacity={empty?.25:.45}/>
   {empty&&<path d={angled?'M500 210H742L930 945H190Z':'M835 207H1085L1360 949H560Z'} fill="#E3D5AD" opacity=".08"/>}
   {angled&&<>
    <path d="M1275 212L1920 60V1080L1275 790Z" fill="#233B39"/>
    <path d="M1300 232L1795 135V866L1300 783Z" fill="#344D44" stroke="#776A50" strokeWidth="8"/>
    <path d="M1420 212V803M1580 181V830M1740 147V857M1300 403L1795 338M1300 582L1795 550M1300 730L1795 731" fill="none" stroke="#716F55" strokeWidth="5"/>
    <path d="M0 890L1275 790M1275 790L1530 1080" fill="none" stroke="#A29265" strokeWidth="5"/>
   </>}
  </svg>
 </AbsoluteFill>
);

export const OpeningHook: React.FC<{beat: KoreaBeat}> = ({beat}) => {
 const f=useCurrentFrame();
 const question=beat.mode==='question';
 const empty=question || f>=sentenceFrame(beat,1);
 return <AbsoluteFill>
  <AudienceHall empty={empty} angled={question}/>
  {question ? <>
   <Throne x={570} y={290} width={380}/>
   <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><path d="M0 100L180 138V1038L0 1080Z" fill="#132628"/><path d="M0 135L238 179L231 206L0 174Z" fill="#69543D"/><path d="M1838 0H1920V1080H1802Z" fill="#142A2C"/></svg>
   <div style={{position:'absolute',left:900,top:293,width:870,color:C.cream,fontWeight:900,fontSize:109,lineHeight:1.25,letterSpacing:-4,textShadow:'0 4px 0 #12282A',opacity:interpolate(f,[0,8],[0,1],clamp)}}>
    왜 한국은<br/><span style={{color:'#ECC37B'}}>왕정을</span><br/>되살리지 않았을까?
   </div>
   <div style={{position:'absolute',left:288,top:805,color:'#CFC3A0',fontSize:38,fontWeight:700}}>해방 뒤에도 비어 있던 왕좌</div>
  </> : <>
   <Throne x={960} y={140} width={575}/>
   {!empty&&<>
    <Actor role="gojong" x={960} y={165} height={795} seated pose="hands-behind" expression="stern"/>
    <Actor role="clerk" outfit="korean-prince" hair="crop" glasses={false} x={410} y={438} height={510} pose="hold-document" motionOffset={2}/>
    <Actor role="clerk" outfit="korean-prince" hair="crop" glasses={false} x={1500} y={438} height={510} pose="hands-behind" motionOffset={3}/>
   </>}
   <div style={{position:'absolute',left:185,top:empty?278:231,width:470,color:empty?C.cream:'#F2DFB2',fontSize:empty?103:115,fontWeight:900,lineHeight:1.08,letterSpacing:-5,textShadow:'0 4px 0 #293830'}}>{empty?<>1945<br/>해방</>:<>500년<br/>왕조</>}</div>
   {empty&&<div style={{position:'absolute',left:1354,top:456,color:C.cream,fontSize:79,fontWeight:900,lineHeight:1.35}}>그러나<br/><span style={{color:'#E4AF70'}}>빈 왕좌</span></div>}
  </>}
 </AbsoluteFill>;
};
