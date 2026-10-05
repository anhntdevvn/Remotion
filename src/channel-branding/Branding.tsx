import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const INK = "#101C22";
const CREAM = "#F2E7CB";
const GOLD = "#D1AE67";
const RED = "#BC443C";
const FONT = '"Noto Sans CJK KR", "Noto Sans KR", sans-serif';

// Original archive-folder mark. The folded corner and red seal remain legible
// when the circular YouTube avatar is reduced to comment-list size.
export const ArchiveMark: React.FC = () => (
  <Img
    src={staticFile("channel-branding/logo/archive-logo.svg")}
    style={{width: "100%", height: "100%", objectFit: "contain"}}
  />
);

export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{background: INK, display: "grid", placeItems: "center"}}>
    <svg viewBox="0 0 1000 1000" style={{position:"absolute",inset:0}}>
      <circle cx="500" cy="500" r="440" fill="none" stroke={GOLD} strokeWidth="5" opacity=".7"/>
      <circle cx="500" cy="500" r="421" fill="none" stroke={GOLD} strokeWidth="2" opacity=".2"/>
    </svg>
    <div style={{width:810,height:810,marginTop:20}}><ArchiveMark/></div>
  </AbsoluteFill>
);

const ArchiveBackdrop: React.FC = () => (
  <svg viewBox="0 0 2560 1440" style={{position:"absolute",inset:0}}>
    <defs>
      <pattern id="archive-grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke={GOLD} strokeWidth="1"/></pattern>
      <radialGradient id="archive-light"><stop stopColor="#365054"/><stop offset="1" stopColor={INK}/></radialGradient>
    </defs>
    <rect width="2560" height="1440" fill="url(#archive-light)"/>
    <rect width="2560" height="1440" fill="url(#archive-grid)" opacity=".09"/>
    <g transform="translate(80 130) rotate(-12 220 300)" opacity=".2" stroke={GOLD} fill="none">
      <rect x="70" y="40" width="375" height="550" strokeWidth="3"/>
      <rect x="45" y="70" width="375" height="550" strokeWidth="3"/>
      <rect x="20" y="100" width="375" height="550" strokeWidth="3"/>
      <path d="M68 184H331M68 215H285M68 282H342M68 313H302M68 344H331M68 450H256" strokeWidth="7"/>
      <circle cx="290" cy="542" r="58" strokeWidth="4"/>
    </g>
    <g transform="translate(2220 1060)" opacity=".18" stroke={GOLD} fill="none">
      <circle r="245" strokeWidth="2"/><circle r="194" strokeWidth="2"/>
      <path d="M-290 0H290M0-290V290M-170-170L170 170M170-170L-170 170" strokeWidth="2"/>
      <path d="M0-186L35-35L186 0L35 35L0 186L-35 35L-186 0L-35-35Z" strokeWidth="3"/>
    </g>
    <path d="M0 474H2560M0 966H2560" stroke={GOLD} strokeWidth="2" opacity=".13"/>
  </svg>
);

export const ChannelBanner: React.FC = () => (
  <AbsoluteFill style={{background:INK,fontFamily:FONT,color:CREAM}}>
    <ArchiveBackdrop/>
    {/* All essential content is inside the centered 1546 × 423 safe area. */}
    <div style={{position:"absolute",left:615,top:578,width:285,height:285,borderRadius:"50%",background:INK,border:`2px solid ${GOLD}`,boxShadow:"0 20px 70px #07121788"}}><ArchiveMark/></div>
    <div style={{position:"absolute",left:950,top:593,fontSize:108,fontWeight:900,letterSpacing:-5,lineHeight:1.35}}>기묘한 기록실</div>
    <div style={{position:"absolute",left:956,top:770,width:815,height:3,background:`linear-gradient(90deg,${RED},${GOLD}88,transparent)`}}/>
    <div style={{position:"absolute",left:958,top:804,fontSize:37,fontWeight:500,letterSpacing:.4,color:"#E2D2AD"}}>익숙한 역사 속, 낯선 이야기를 기록하다</div>
  </AbsoluteFill>
);

// Delivery-size export of the generated artwork. No visual compositing or
// effects: preserve the source design and export at YouTube's banner size.
export const IllustratedChannelBanner: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("channel-branding/banner-illustrated-final-source.png")} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
  </AbsoluteFill>
);
