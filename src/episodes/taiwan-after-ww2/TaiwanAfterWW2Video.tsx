import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, interpolate, Sequence, Series, staticFile, useCurrentFrame} from 'remotion';
import timing from './data/full_timing.json';
import {CharacterPuppet, type CharacterPose, type CharacterProp, type CharacterPuppetProps} from './components/CharacterPuppet';
import {Scene01Preview} from './scenes/Scene01Preview';

const C = {ink: '#101820', cream: '#F1E6CC', paper: '#E2D2AD', red: '#B83D38', gold: '#D5AD55', blue: '#294B70', teal: '#3C6865', olive: '#59624B'};
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
type SceneKind = 'blank'|'timeline'|'treaty'|'colony'|'conference'|'chain'|'handover'|'layers'|'unrest'|'reframe'|'split'|'options'|'truman'|'korea'|'defense'|'japan'|'hall'|'article'|'reasons'|'archive';
type ActorMotion = 'static'|'enter-left'|'enter-right'|'march-right'|'march-left'|'advance'|'retreat'|'recoil';
type Actor = Pick<CharacterPuppetProps, 'outfit'|'hair'|'hat'|'expression'|'pose'|'glasses'|'moustache'|'gaze'|'prop'> & {
  side: 'left'|'right'|'center';
  scale?: number;
  delay?: number;
  motion?: ActorMotion;
  pose2?: CharacterPose;
  prop2?: CharacterProp;
  actionAt?: number;
  x?: number;
  xTo?: number;
  bottom?: number;
  speaking?: boolean;
};
type SceneConfig = {id: string; kind: SceneKind; kicker: string; title: string; subtitle: string; accent?: string; actors: Actor[]};

const scenes: SceneConfig[] = [
  {id:'S02',kind:'blank',kicker:'1951 · 샌프란시스코',title:'받는 나라가 없다',subtitle:'일본은 포기했다. 하지만 누구에게?',actors:[{side:'left',outfit:'dark-suit',hair:'side-part',expression:'surprised',pose:'hold-document',pose2:'pass-right',prop2:'folder',actionAt:118,gaze:1,speaking:true},{side:'right',outfit:'light-suit',hair:'silver',glasses:true,expression:'concerned',pose:'explain-left',pose2:'pass-left',actionAt:118,gaze:-1}]},
  {id:'S03',kind:'timeline',kicker:'사건 기록 · 1895–1951',title:'한 줄이 아닌 56년의 순서',subtitle:'전쟁 · 항복 · 행정 · 조약',actors:[{side:'right',outfit:'dark-suit',hair:'side-part',expression:'stern',pose:'point-left',gaze:-1}]},
  {id:'S04',kind:'treaty',kicker:'1895 · 시모노세키',title:'청은 대만을 할양했다',subtitle:'청일전쟁의 패배가 만든 법적 이전',actors:[{side:'left',x:-220,xTo:290,bottom:-20,scale:.68,motion:'march-right',outfit:'japanese-soldier',hair:'crop',hat:'field-khaki',expression:'stern',pose:'march',prop:'rifle',gaze:1},{side:'left',x:30,xTo:470,bottom:-25,scale:.62,delay:18,motion:'march-right',outfit:'japanese-soldier',hair:'crop',hat:'field-khaki',expression:'stern',pose:'march',prop:'rifle',gaze:1},{side:'right',x:1370,xTo:1170,bottom:-20,scale:.62,motion:'advance',outfit:'civilian',hair:'crop',expression:'stern',pose:'spear-ready',prop:'spear',gaze:-1},{side:'right',x:1630,outfit:'light-suit',hair:'waves',expression:'concerned',pose:'hold-document',pose2:'pass-left',actionAt:390,gaze:-1}]},
  {id:'S05',kind:'colony',kicker:'1895–1945 · 식민 통치',title:'철도와 항만, 그리고 강압',subtitle:'50년 동안 깊어진 제국의 지배',actors:[{side:'left',x:-180,xTo:300,bottom:-20,scale:.68,motion:'march-right',outfit:'japanese-soldier',hair:'crop',hat:'field-khaki',expression:'stern',pose:'march',prop:'rifle',gaze:1},{side:'right',x:1580,xTo:1370,bottom:-30,scale:.84,motion:'advance',outfit:'japanese-officer',hair:'slick',hat:'officer-khaki',expression:'stern',pose:'rifle-ready',prop:'rifle',pose2:'point-left',actionAt:470,gaze:-1},{side:'right',x:1280,bottom:-20,scale:.7,outfit:'civilian',hair:'side-part',expression:'concerned',pose:'neutral',pose2:'arms-raised',prop2:'placard',actionAt:320,gaze:-1}]},
  {id:'S06',kind:'conference',kicker:'1943 · 카이로',title:'전쟁 중 먼저 정해진 방향',subtitle:'루스벨트 · 처칠 · 장제스',actors:[{side:'left',outfit:'dark-suit',hair:'silver',glasses:true,expression:'stern',pose:'explain-right',pose2:'pass-right',prop2:'folder',actionAt:390,gaze:1},{side:'center',outfit:'light-suit',hair:'bald',moustache:true,expression:'neutral',pose:'hold-document',pose2:'pass-left',actionAt:390,gaze:0},{side:'right',outfit:'dark-suit',hair:'slick',expression:'stern',pose:'explain-left',pose2:'hold-document',actionAt:540,gaze:-1}]},
  {id:'S07',kind:'chain',kicker:'1943 → 1945',title:'카이로 · 포츠담 · 항복문서',subtitle:'대만을 계속 보유한다는 선택지는 없었다',actors:[{side:'left',x:-180,xTo:170,bottom:-15,scale:.68,motion:'march-right',outfit:'japanese-soldier',hair:'crop',hat:'field-khaki',expression:'stern',pose:'march',prop:'rifle',pose2:'rifle-ready',actionAt:390,gaze:1},{side:'right',outfit:'japanese-officer',hair:'slick',hat:'officer-khaki',expression:'concerned',pose:'spear-ready',prop:'sword',pose2:'hands-behind',actionAt:520,gaze:-1}]},
  {id:'S08',kind:'handover',kicker:'1945 · 일반명령 제1호',title:'행정권이 먼저 도착했다',subtitle:'일본군 항복 → 중화민국의 행정 시작',actors:[{side:'left',x:80,bottom:-5,scale:.72,outfit:'japanese-soldier',hair:'crop',hat:'field-khaki',expression:'concerned',pose:'rifle-ready',prop:'rifle',pose2:'arms-raised',actionAt:440,gaze:1},{side:'left',x:320,outfit:'japanese-officer',hair:'slick',hat:'officer-khaki',expression:'concerned',pose:'hold-document',pose2:'pass-right',prop2:'folder',actionAt:330,gaze:1},{side:'right',x:1300,outfit:'roc-officer',hair:'slick',hat:'officer-olive',expression:'stern',pose:'explain-left',pose2:'pass-left',actionAt:330,gaze:-1},{side:'right',x:1600,bottom:-5,scale:.72,outfit:'roc-soldier',hair:'crop',hat:'field-olive',expression:'stern',pose:'rifle-ready',prop:'rifle',gaze:-1}]},
  {id:'S09',kind:'layers',kicker:'서로 다른 세 절차',title:'항복 ≠ 행정 ≠ 최종 조약',subtitle:'통치는 시작됐지만 법률 문서는 미완성이었다',actors:[{side:'right',outfit:'dark-suit',hair:'silver',glasses:true,expression:'concerned',pose:'point-left',gaze:-1}]},
  {id:'S10',kind:'unrest',kicker:'1945–1947 · 전후 대만',title:'귀환의 기대가 혼란으로',subtitle:'행정 실패 · 부패 · 경제 위기 · 2·28 사건',actors:[{side:'left',x:20,bottom:-15,scale:.68,motion:'advance',xTo:210,outfit:'civilian',hair:'waves',expression:'concerned',pose:'arms-raised',prop:'placard',gaze:1},{side:'left',x:260,bottom:-25,scale:.61,delay:12,motion:'advance',xTo:410,outfit:'civilian',hair:'side-part',expression:'stern',pose:'arms-raised',prop:'placard',gaze:1},{side:'right',x:1370,bottom:-25,scale:.8,motion:'advance',xTo:1180,outfit:'roc-officer',hair:'slick',hat:'officer-olive',expression:'stern',pose:'rifle-ready',prop:'rifle',pose2:'rifle-aim-left',actionAt:430,gaze:-1},{side:'right',x:1630,bottom:-20,scale:.68,motion:'advance',xTo:1430,outfit:'roc-soldier',hair:'crop',hat:'field-olive',expression:'stern',pose:'march',prop:'rifle',gaze:-1}]},
  {id:'S11',kind:'reframe',kicker:'질문의 변화',title:'일본의 권리는 이미 논점 밖',subtitle:'이제 질문은 대만의 장래였다',actors:[{side:'left',outfit:'dark-suit',hair:'side-part',expression:'stern',pose:'point-right',gaze:1},{side:'right',outfit:'civilian',hair:'waves',expression:'concerned',pose:'hold-document',gaze:-1}]},
  {id:'S12',kind:'split',kicker:'1949 · 중국 내전',title:'두 정부, 하나의 중국 대표권',subtitle:'중화인민공화국은 대륙에, 중화민국은 대만에',actors:[{side:'left',x:-180,xTo:230,bottom:-10,scale:.72,motion:'march-right',outfit:'prc-officer',hair:'crop',expression:'stern',pose:'march',prop:'rifle',pose2:'rifle-aim-right',actionAt:420,gaze:1},{side:'left',x:80,xTo:390,bottom:-25,scale:.62,delay:15,motion:'march-right',outfit:'prc-officer',hair:'crop',expression:'stern',pose:'march',prop:'rifle',gaze:1},{side:'right',x:1700,xTo:1390,bottom:-10,scale:.72,motion:'march-left',outfit:'roc-soldier',hair:'crop',hat:'field-olive',expression:'stern',pose:'march',prop:'rifle',pose2:'rifle-aim-left',actionAt:420,gaze:-1},{side:'right',x:1460,xTo:1270,bottom:-25,scale:.62,delay:15,motion:'march-left',outfit:'roc-soldier',hair:'crop',hat:'field-olive',expression:'stern',pose:'march',prop:'rifle',gaze:-1}]},
  {id:'S13',kind:'options',kicker:'워싱턴의 선택지',title:'어느 방안도 단순하지 않았다',subtitle:'현상 유지 · 국제 관리 · 군사 개입',actors:[{side:'right',outfit:'dark-suit',hair:'silver',glasses:true,expression:'concerned',pose:'hold-document',gaze:-1}]},
  {id:'S14',kind:'truman',kicker:'1950년 1월 5일',title:'미국은 개입을 피하려 했다',subtitle:'군사 원조 OFF · 군사 고문 OFF',actors:[{side:'left',outfit:'dark-suit',hair:'silver',glasses:true,expression:'stern',pose:'explain-right',gaze:1}]},
  {id:'S15',kind:'korea',kicker:'1950년 6월 25일',title:'계산을 바꾼 한국전쟁',subtitle:'이틀 뒤, 제7함대가 대만해협으로 향했다',actors:[{side:'left',x:-220,xTo:320,bottom:-5,scale:.74,motion:'march-right',outfit:'prc-officer',hair:'crop',expression:'stern',pose:'march',prop:'rifle',pose2:'rifle-aim-right',actionAt:360,gaze:1},{side:'left',x:20,xTo:470,bottom:-25,scale:.62,delay:12,motion:'march-right',outfit:'prc-officer',hair:'crop',expression:'stern',pose:'march',prop:'rifle',gaze:1},{side:'right',x:1580,bottom:-30,scale:.86,motion:'recoil',outfit:'us-officer',hair:'crop',expression:'stern',pose:'point-left',pose2:'rifle-ready',prop2:'rifle',actionAt:380,gaze:-1}]},
  {id:'S16',kind:'defense',kicker:'서태평양 방어선',title:'대만해협을 얼려 버리다',subtitle:'한국 · 일본 · 대만 · 필리핀',actors:[{side:'right',outfit:'us-officer',hair:'crop',expression:'stern',pose:'point-left',gaze:-1}]},
  {id:'S17',kind:'japan',kicker:'점령 아래의 일본',title:'대만을 되찾을 위치가 아니었다',subtitle:'새 헌법 · 국가 재건 · 평화조약',actors:[{side:'left',x:-180,xTo:270,bottom:-10,scale:.7,motion:'march-right',outfit:'civilian',hair:'side-part',expression:'concerned',pose:'march',prop:'box',gaze:1},{side:'right',outfit:'dark-suit',hair:'side-part',expression:'concerned',pose:'hold-document',pose2:'pass-left',prop2:'folder',actionAt:250,gaze:-1},{side:'right',x:1310,bottom:-20,scale:.66,outfit:'japanese-officer',hair:'slick',expression:'concerned',pose:'hands-behind',gaze:-1}]},
  {id:'S18',kind:'hall',kicker:'1951 · 샌프란시스코',title:'두 개의 빈 중국 좌석',subtitle:'중화민국도 중화인민공화국도 회의에 없었다',actors:[{side:'left',x:45,bottom:-20,scale:.67,outfit:'dark-suit',hair:'silver',glasses:true,expression:'stern',pose:'hold-document',pose2:'pass-right',prop2:'folder',actionAt:320,gaze:1},{side:'left',x:285,bottom:-165,scale:.58,outfit:'light-suit',hair:'waves',expression:'neutral',pose:'explain-right',gaze:1},{side:'right',x:1420,bottom:-165,scale:.58,outfit:'dark-suit',hair:'slick',expression:'neutral',pose:'explain-left',gaze:-1},{side:'right',x:1640,bottom:-20,scale:.67,outfit:'dark-suit',hair:'side-part',expression:'stern',pose:'hold-document',pose2:'pass-left',actionAt:320,gaze:-1}]},
  {id:'S19',kind:'article',kicker:'평화조약 제2조 b항',title:'모든 권리·권원·청구권을 포기한다',subtitle:'받는 나라는 없었지만 일본의 권리는 0이 됐다',actors:[{side:'right',outfit:'dark-suit',hair:'side-part',expression:'stern',pose:'point-left',gaze:-1}]},
  {id:'S20',kind:'reasons',kicker:'왜 일본은 지킬 수 없었나',title:'패배 · 항복 조건 · 권리 포기',subtitle:'세 개의 문이 차례로 닫혔다',actors:[{side:'left',x:90,bottom:-25,scale:.82,motion:'retreat',xTo:-70,outfit:'japanese-officer',hair:'slick',hat:'officer-khaki',expression:'concerned',pose:'spear-ready',prop:'sword',pose2:'arms-raised',actionAt:350,gaze:1},{side:'right',outfit:'dark-suit',hair:'silver',glasses:true,expression:'stern',pose:'hold-document',pose2:'pass-left',prop2:'folder',actionAt:350,gaze:-1}]},
  {id:'S21',kind:'archive',kicker:'기묘한 기록실 · 기록 001',title:'남은 질문은 대만의 미래',subtitle:'80년이 지난 지금도 끝나지 않은 문장',actors:[{side:'right',outfit:'dark-suit',hair:'side-part',expression:'concerned',pose:'hold-document',gaze:-1}]},
];

const fade = (frame: number, duration: number) => interpolate(frame, [0, 12, Math.max(14, duration - 12), duration], [0, 1, 1, 0], clamp);

const TaiwanIcon: React.FC<{color?: string; style?: React.CSSProperties}> = ({color = C.red, style}) => <svg viewBox="0 0 210 350" style={style}><path d="M132 13C163 25 183 59 180 94C177 133 157 168 143 199C126 236 111 276 81 319C66 340 45 344 35 328C23 309 36 277 47 251C61 216 68 177 75 140C83 99 92 57 111 28C118 18 124 14 132 13Z" fill={color} stroke={C.ink} strokeWidth="8"/><circle cx="25" cy="225" r="7" fill={C.gold}/><circle cx="12" cy="239" r="4" fill={C.gold}/></svg>;

const Document: React.FC<{title: string; lines?: string[]; stamp?: string; style?: React.CSSProperties}> = ({title, lines = [], stamp, style}) => <div style={{width: 500, minHeight: 300, background: C.paper, border: `8px solid ${C.ink}`, boxShadow: '0 26px 50px rgba(0,0,0,.3)', padding: '34px 38px', color: C.ink, fontFamily: 'Noto Sans CJK KR, sans-serif', ...style}}><div style={{fontSize: 18, letterSpacing: 4, color: C.red, fontWeight: 900}}>OFFICIAL RECORD</div><div style={{fontFamily: 'serif', fontSize: 42, fontWeight: 900, marginTop: 12}}>{title}</div><div style={{height: 4, background: '#807965', margin: '20px 0'}}/>{lines.map((line, i) => <div key={line} style={{fontSize: 23, lineHeight: 1.5, opacity: .82, fontWeight: i === 0 ? 800 : 500}}>{line}</div>)}{stamp ? <div style={{position:'absolute',right:30,bottom:24,border:`6px solid ${C.red}`,color:C.red,padding:'8px 12px',fontSize:23,fontWeight:950,rotate:'-8deg'}}>{stamp}</div>:null}</div>;

const Flag: React.FC<{type: 'japan'|'roc'|'prc'|'usa'; style?: React.CSSProperties}> = ({type, style}) => <div style={{width: 170, height: 105, border: `5px solid ${C.ink}`, background: type === 'japan' ? '#F3EEE2' : type === 'roc' ? '#D34843' : type === 'prc' ? '#C83C37' : '#E9E4D8', position: 'relative', boxShadow: '0 12px 20px rgba(0,0,0,.2)', ...style}}>{type === 'japan' && <div style={{position:'absolute',width:55,height:55,borderRadius:60,background:C.red,left:53,top:22}}/>}{type === 'roc' && <div style={{position:'absolute',left:0,top:0,width:73,height:55,background:C.blue,color:'#F4DC77',display:'grid',placeItems:'center',fontSize:31}}>☀</div>}{type === 'prc' && <div style={{color:'#F6D65D',fontSize:40,paddingLeft:14}}>★</div>}{type === 'usa' && <><div style={{height:45,width:70,background:C.blue}}/><div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(#B83D38 0 8px,#EEE7D8 8px 16px)',zIndex:-1}}/></>}</div>;

const DossierCards: React.FC<{kind: SceneKind; frame: number}> = ({kind, frame}) => {
  const rise = (i: number) => interpolate(frame, [10 + i * 10, 28 + i * 10], [70, 0], {...clamp, easing: ease});
  const opacity = (i: number) => interpolate(frame, [8 + i * 9, 22 + i * 9], [0, 1], clamp);
  const card = (label: string, detail: string, i: number, color = C.red) => <div key={label} style={{width:260,height:170,background:C.paper,border:`6px solid ${C.ink}`,padding:'22px 24px',translate:`0 ${rise(i)}px`,opacity:opacity(i),boxShadow:'0 22px 28px rgba(0,0,0,.25)',fontFamily:'Noto Sans CJK KR, sans-serif'}}><div style={{fontSize:18,color,fontWeight:950,letterSpacing:2}}>{label}</div><div style={{fontSize:31,fontWeight:950,marginTop:14,lineHeight:1.15}}>{detail}</div></div>;
  if (kind === 'timeline') return <div style={{display:'flex',gap:22,alignItems:'center'}}>{['1895','1943','1945','1950','1951'].map((year,i)=><React.Fragment key={year}>{card(year,['시모노세키','카이로','항복','한국전쟁','평화조약'][i],i,i===4?C.gold:C.red)}{i<4?<div style={{width:32,height:5,background:C.gold,opacity:opacity(i)}}/>:null}</React.Fragment>)}</div>;
  if (kind === 'chain') return <div style={{display:'flex',gap:28,alignItems:'center'}}>{card('1943','카이로 공동성명',0)}<div style={{fontSize:60,color:C.gold}}>→</div>{card('1945','포츠담 선언',1)}<div style={{fontSize:60,color:C.gold}}>→</div>{card('1945','일본 항복문서',2)}</div>;
  if (kind === 'layers') return <div style={{display:'flex',gap:32}}>{card('1','군사 항복 ✓',0,C.teal)}{card('2','행정 인수 ✓',1,C.teal)}{card('3','평화조약 …',2,C.red)}</div>;
  if (kind === 'options') return <div style={{display:'flex',gap:32}}>{card('선택 1','현 상태 인정',0,C.teal)}{card('선택 2','UN·주민 투표',1,C.gold)}{card('선택 3','군사 개입',2,C.red)}</div>;
  if (kind === 'reasons') return <div style={{display:'flex',gap:32}}>{card('첫째','전쟁 패배',0,C.red)}{card('둘째','항복 조건 수용',1,C.red)}{card('셋째','조약에서 포기',2,C.red)}</div>;
  return null;
};

const MapGraphic: React.FC<{kind: SceneKind; frame: number}> = ({kind, frame}) => {
  const draw = interpolate(frame, [12, 62], [0, 1], clamp);
  const mapFill = kind === 'split' ? '#61705A' : '#746F5E';
  return <svg viewBox="0 0 940 550" style={{width:940,height:550,filter:'drop-shadow(0 24px 30px rgba(0,0,0,.24))'}}>
    <rect x="0" y="0" width="940" height="550" rx="18" fill="#B9C3BE" stroke={C.ink} strokeWidth="8"/>
    <path d="M110 90L270 42L420 78L535 48L665 92L630 180L552 228L500 315L390 345L320 288L205 300L150 225Z" fill={mapFill} stroke={C.ink} strokeWidth="6"/>
    <path d="M705 115L770 80L810 126L785 220L735 280L700 225Z" fill="#8A846E" stroke={C.ink} strokeWidth="6"/>
    <path d="M586 195Q620 240 598 300Q574 346 566 405" fill="none" stroke={C.ink} strokeWidth="16" strokeLinecap="round"/>
    <path d="M542 360C565 370 575 402 564 425C551 450 540 475 514 503C495 522 478 510 488 480C502 444 507 402 520 375Z" fill={C.red} stroke={C.ink} strokeWidth="6"/>
    {kind === 'treaty' && <path d="M260 190Q430 300 515 397" fill="none" stroke={C.gold} strokeWidth="12" strokeDasharray={`${draw*440} 500`} markerEnd="url(#arrow)"/>}
    {kind === 'split' && <><rect x="185" y="125" width="230" height="90" rx="12" fill={C.red}/><text x="300" y="182" textAnchor="middle" fill={C.cream} fontSize="34" fontWeight="900">중화인민공화국</text><rect x="628" y="375" width="220" height="90" rx="12" fill={C.blue}/><text x="738" y="430" textAnchor="middle" fill={C.cream} fontSize="34" fontWeight="900">중화민국</text></>}
    {kind === 'korea' && <><path d="M600 155L588 292" stroke={C.red} strokeWidth="16" strokeDasharray={`${draw*180} 190`}/><path d="M588 292l-26-35m26 35 28-35" stroke={C.red} strokeWidth="16"/><path d="M850 470Q720 390 568 414" fill="none" stroke={C.blue} strokeWidth="14" strokeDasharray={`${draw*450} 470`}/><text x="650" y="105" fill={C.ink} fontSize="34" fontWeight="900">한반도</text></>}
    {kind === 'defense' && <><path d="M594 188L760 160L548 416L700 510" fill="none" stroke={C.gold} strokeWidth="14" strokeDasharray={`${draw*650} 680`}/>{[[594,188,'한국'],[760,160,'일본'],[548,416,'대만'],[700,510,'필리핀']].map(([x,y,l])=><g key={String(l)}><circle cx={Number(x)} cy={Number(y)} r="15" fill={C.red}/><text x={Number(x)+20} y={Number(y)+8} fontSize="25" fontWeight="900">{l}</text></g>)}</>}
    <defs><marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={C.gold}/></marker></defs>
  </svg>;
};

const CentralVisual: React.FC<{config: SceneConfig; frame: number}> = ({config, frame}) => {
  const pop = interpolate(frame, [8, 28], [.86, 1], {...clamp, easing:ease, output:'perceptual-scale'});
  if (['timeline','chain','layers','options','reasons'].includes(config.kind)) return <DossierCards kind={config.kind} frame={frame}/>;
  if (['treaty','split','korea','defense'].includes(config.kind)) return <MapGraphic kind={config.kind} frame={frame}/>;
  if (config.kind === 'blank') return <div style={{position:'relative',scale:pop}}><Document title="TREATY OF PEACE" lines={['FROM: JAPAN','TO: __________________']} stamp="?"/><TaiwanIcon style={{position:'absolute',width:150,right:-190,top:5}}/></div>;
  if (config.kind === 'colony') return <div style={{display:'flex',alignItems:'end',gap:30,scale:pop}}><div style={{width:580,height:320,border:`8px solid ${C.ink}`,background:'linear-gradient(#B9C3BE 0 45%,#80735E 45%)',position:'relative'}}><div style={{position:'absolute',bottom:0,left:55,width:150,height:220,background:'#424A46',border:`6px solid ${C.ink}`}}/><div style={{position:'absolute',bottom:0,right:45,width:290,height:110,background:'#343C3E',border:`6px solid ${C.ink}`}}/><div style={{position:'absolute',left:0,right:0,bottom:55,height:12,background:C.gold}}/></div><TaiwanIcon style={{width:190,height:320}}/></div>;
  if (config.kind === 'conference') return <div style={{width:720,height:330,background:'#5C4637',border:`9px solid ${C.ink}`,clipPath:'polygon(12% 0,88% 0,100% 100%,0 100%)',position:'relative',scale:pop}}><div style={{position:'absolute',left:180,top:90,color:C.cream,fontFamily:'serif',fontSize:45,fontWeight:900}}>CAIRO · 1943</div><div style={{position:'absolute',left:255,top:175,fontSize:34,color:C.gold,fontWeight:950}}>FORMOSA → TAIWAN</div></div>;
  if (config.kind === 'handover') return <div style={{display:'flex',gap:80,alignItems:'center'}}><Flag type="japan"/><div style={{fontSize:88,color:C.gold,translate:`${interpolate(frame,[10,50],[-80,80],clamp)}px 0`}}>→</div><TaiwanIcon style={{width:150,height:260}}/><div style={{fontSize:88,color:C.gold}}>→</div><Flag type="roc"/></div>;
  if (config.kind === 'unrest') return <div style={{width:760,height:390,background:'#827863',border:`8px solid ${C.ink}`,position:'relative',overflow:'hidden',scale:pop}}><div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg,transparent 0 90px,rgba(15,24,32,.15) 90px 96px)'}}/><div style={{position:'absolute',left:45,top:45,fontSize:110,fontWeight:950,color:C.red}}>2·28</div><div style={{position:'absolute',left:55,bottom:55,width:620,height:12,background:C.ink}}/><div style={{position:'absolute',left:60,bottom:75,width:600,height:150,background:'linear-gradient(15deg,transparent 49%,#D7B35F 50% 53%,transparent 54%)'}}/></div>;
  if (config.kind === 'reframe') return <div style={{display:'flex',gap:70,alignItems:'center'}}><div style={{padding:32,border:`7px solid ${C.ink}`,background:'#B8AA8C',fontSize:35,fontWeight:900,textDecoration:'line-through',opacity:.52}}>일본이 가질 수 있는가?</div><div style={{fontSize:80,color:C.gold}}>→</div><div style={{padding:38,border:`8px solid ${C.red}`,background:C.paper,fontSize:45,fontWeight:950}}>대만의 미래는?</div></div>;
  if (config.kind === 'truman') return <div style={{display:'flex',gap:50,alignItems:'center'}}><div style={{width:310,height:280,background:C.paper,border:`8px solid ${C.ink}`,textAlign:'center',paddingTop:35}}><div style={{fontSize:25,color:C.red,fontWeight:900}}>JANUARY</div><div style={{fontSize:145,fontWeight:950}}>5</div><div style={{fontSize:31,fontWeight:900}}>1950</div></div><div style={{width:420,padding:35,background:'#27343A',border:`8px solid ${C.ink}`,color:C.cream}}><div style={{fontSize:29}}>MILITARY AID</div><div style={{fontSize:95,fontWeight:950,color:C.red}}>OFF</div></div></div>;
  if (config.kind === 'japan') return <div style={{display:'flex',gap:26}}>{['새 헌법','국가 재건','평화조약'].map((x,i)=><div key={x} style={{width:230,height:300,background:C.paper,border:`7px solid ${C.ink}`,padding:25,translate:`0 ${interpolate(frame,[8+i*9,26+i*9],[70,0],clamp)}px`,fontSize:33,fontWeight:950}}><div style={{fontSize:18,color:C.red}}>PRIORITY {i+1}</div><div style={{marginTop:40}}>{x}</div></div>)}</div>;
  if (config.kind === 'hall') return <div style={{width:800,height:400,border:`8px solid ${C.ink}`,background:'#786B58',borderRadius:'50% 50% 8% 8%',position:'relative',scale:pop}}>{Array.from({length:18},(_,i)=><div key={i} style={{position:'absolute',left:80+(i%9)*78,top:100+Math.floor(i/9)*115,width:52,height:72,background:i>15?'transparent':C.paper,border:`5px ${i>15?'dashed':'solid'} ${i>15?C.red:C.ink}`}}/>)}<div style={{position:'absolute',left:270,bottom:18,color:C.cream,fontSize:27,fontWeight:950}}>두 개의 빈 좌석</div></div>;
  if (config.kind === 'article') return <div style={{position:'relative',scale:pop}}><Document title="ARTICLE 2 (b)" lines={['Japan renounces all right, title and claim','to Formosa and the Pescadores.','수령국: 명시하지 않음']} stamp="RENOUNCED"/><div style={{position:'absolute',right:-260,top:65,width:190}}><TaiwanIcon/><div style={{fontSize:58,fontWeight:950,color:C.red,textAlign:'center'}}>권리 0</div></div></div>;
  return <div style={{position:'relative',display:'flex',gap:45,alignItems:'center'}}><div style={{width:620,height:380,background:'#252D31',border:`9px solid ${C.ink}`,padding:40,color:C.cream,boxShadow:'0 28px 50px rgba(0,0,0,.3)'}}><div style={{fontSize:20,letterSpacing:5,color:C.gold}}>EAST ASIA · CASE 001</div><div style={{fontSize:58,fontWeight:950,marginTop:40}}>UNRESOLVED</div><div style={{height:6,background:C.red,marginTop:30}}/><div style={{fontSize:28,marginTop:30}}>TAIWAN · 1895–1951</div></div><TaiwanIcon style={{width:180,height:330,opacity:interpolate(frame,[18,45],[0,1],clamp)}}/></div>;
};

const ActorLayer: React.FC<{actors: Actor[]; frame: number; duration: number}> = ({actors, frame, duration}) => <>{actors.map((actor, i) => {
  const {side, scale=1, delay=0, motion='static', pose2, prop2, actionAt=Math.round(duration*.48), x, xTo, bottom=-80, speaking, ...props} = actor;
  const base = x ?? (side === 'left' ? 65 : side === 'right' ? 1555 : 810);
  const progress = interpolate(frame, [delay, Math.max(delay+1, duration-18)], [0, 1], clamp);
  const entrance = interpolate(frame, [delay, delay+24], [0, 1], {...clamp,easing:ease});
  const motionX = motion === 'enter-left' ? interpolate(entrance,[0,1],[-380,base])
    : motion === 'enter-right' ? interpolate(entrance,[0,1],[1960,base])
      : motion === 'march-right' ? interpolate(progress,[0,1],[base,xTo ?? base+620])
        : motion === 'march-left' ? interpolate(progress,[0,1],[base,xTo ?? base-620])
          : motion === 'advance' ? interpolate(progress,[0,1],[base,xTo ?? base+(side==='left'?180:-180)])
            : motion === 'retreat' ? interpolate(progress,[0,1],[base,xTo ?? base+(side==='left'?-160:160)])
              : motion === 'recoil' ? base+Math.sin(Math.min(1,Math.max(0,(frame-actionAt)/14))*Math.PI)*70*(side==='left'?-1:1)
                : base;
  const activePose = frame >= actionAt && pose2 ? pose2 : props.pose;
  const activeProp = frame >= actionAt && prop2 ? prop2 : props.prop;
  const actorSpeaking = speaking ?? (frame%150<58 && i===0 && motion === 'static');
  return <CharacterPuppet key={`${side}-${i}`} {...props} pose={activePose} prop={activeProp} speaking={actorSpeaking} enterFrame={delay+4} motionOffset={i*3} style={{left:motionX,bottom,scale:String(scale),zIndex:10+i}}/>;
})}</>;

const StoryScene: React.FC<{config: SceneConfig; duration: number}> = ({config, duration}) => {
  const frame = useCurrentFrame();
  const accent = config.accent ?? C.red;
  const cameraScale = interpolate(frame,[0,Math.round(duration*.5),duration],[1.035,1,1.025],clamp);
  return <AbsoluteFill style={{background:'linear-gradient(125deg,#D8CCAC 0%,#AFA78E 52%,#697276 100%)',overflow:'hidden',opacity:fade(frame,duration),fontFamily:'Noto Sans CJK KR, Arial, sans-serif'}}>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 55% 42%,rgba(246,236,210,.68),transparent 52%)'}}/>
    <div style={{position:'absolute',left:48,right:48,top:34,height:4,background:C.ink,opacity:.6}}/>
    <div style={{position:'absolute',left:62,top:55,color:C.ink,zIndex:5}}><div style={{fontSize:20,fontWeight:950,letterSpacing:5,color:accent}}>{config.kicker}</div><div style={{fontSize:60,fontWeight:950,letterSpacing:-3,marginTop:8,maxWidth:1250,lineHeight:1.06}}>{config.title}</div><div style={{fontSize:27,fontWeight:800,marginTop:12,opacity:.72}}>{config.subtitle}</div></div>
    <div style={{position:'absolute',left:330,right:330,top:300,bottom:205,display:'grid',placeItems:'center',zIndex:2,scale:cameraScale}}><CentralVisual config={config} frame={frame}/></div>
    <ActorLayer actors={config.actors} frame={frame} duration={duration}/>
    <div style={{position:'absolute',right:58,top:55,fontSize:16,fontWeight:900,letterSpacing:4,color:'rgba(16,24,32,.58)'}}>기묘한 기록실 · {config.id}</div>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',boxShadow:'inset 0 0 160px rgba(0,0,0,.34)',zIndex:20}}/>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.08,backgroundImage:'repeating-linear-gradient(0deg,rgba(255,255,255,.8) 0 1px,transparent 1px 4px)',translate:`0 ${frame%4}px`,zIndex:19}}/>
  </AbsoluteFill>;
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const now = frame / 30 * 1000;
  const active = timing.captions.find((caption) => caption.startMs <= now && caption.endMs > now && caption.startMs >= 27000);
  if (!active) return null;
  return <div style={{position:'absolute',left:'50%',bottom:38,translate:'-50% 0',maxWidth:1380,padding:'15px 27px 17px',background:'rgba(8,13,17,.9)',borderTop:`5px solid ${C.gold}`,boxShadow:'0 14px 32px rgba(0,0,0,.3)',color:'#FFF8E8',fontFamily:'Noto Sans CJK KR, sans-serif',fontSize:39,fontWeight:850,lineHeight:1.3,textAlign:'center',zIndex:50}}>{active.text}</div>;
};

const Narration: React.FC = () => <>{Object.entries(timing.clips).filter(([id]) => id !== 'KO-001').map(([id, clip]) => <Audio key={id} from={'startFrame' in clip ? clip.startFrame : 0} src={staticFile(clip.file)} volume={1}/>)}</>;

export const TaiwanAfterWW2Video: React.FC = () => <AbsoluteFill style={{background:C.ink}}>
  <Audio from={810} src={staticFile('episodes/taiwan-after-ww2/audio/episode_bed.mp3')} volume={(f) => interpolate(f,[0,50,timing.durationInFrames-870,timing.durationInFrames-810],[0,.17,.17,0],clamp)}/>
  <Narration/>
  <Series>
    <Series.Sequence durationInFrames={timing.scenes[0].durationInFrames}><Scene01Preview/></Series.Sequence>
    {scenes.map((config,index)=><Series.Sequence key={config.id} durationInFrames={timing.scenes[index+1].durationInFrames}><StoryScene config={config} duration={timing.scenes[index+1].durationInFrames}/></Series.Sequence>)}
  </Series>
  {timing.scenes.slice(1).map((scene,index)=><Sequence key={scene.id} from={scene.startFrame} durationInFrames={Math.min(24,scene.durationInFrames)}><Audio src={staticFile(index%3===0?'episodes/taiwan-after-ww2/audio/sfx/whoosh.wav':'episodes/taiwan-after-ww2/audio/sfx/paper.wav')} volume={() => index%3===0?.16:.1}/></Sequence>)}
  <Captions/>
</AbsoluteFill>;
