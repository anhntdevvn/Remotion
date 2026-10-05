import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {CharacterPuppet} from '../components/CharacterPuppet';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const SceneFrame: React.FC<{children: React.ReactNode; from: number; duration: number}> = ({children, from, duration}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{
      opacity: interpolate(frame, [from, from + 12, from + duration - 14, from + duration], [0, 1, 1, 0], clamp),
    }}>
      {children}
    </AbsoluteFill>
  );
};

const RuinsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame from={0} duration={150}>
      <AbsoluteFill style={{background: 'linear-gradient(#76818B 0%, #AEB1AD 54%, #817565 55%, #64594D 100%)'}}>
        <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
          <path d="M0 590 L170 520 L335 580 L510 480 L650 560 L790 445 L960 555 L1110 410 L1270 550 L1460 455 L1620 560 L1810 440 L1920 505 V1080 H0Z" fill="#3B403B"/>
          <path d="M0 720 H350 V470 H510 V690 H710 V1080 H0ZM735 1080 V610 H910 V390 H1110 V620 H1260 V1080ZM1290 1080 V530 H1530 V400 H1750 V580 H1920 V1080Z" fill="#22282A"/>
          <g fill="#13181A"><rect x="85" y="550" width="55" height="75"/><rect x="205" y="550" width="55" height="75"/><rect x="820" y="535" width="55" height="75"/><rect x="970" y="480" width="58" height="82"/><rect x="1390" y="600" width="58" height="82"/><rect x="1600" y="510" width="58" height="82"/></g>
          <path d="M0 875 H1920 V1080 H0Z" fill="#5E554B"/><path d="M150 925 l170 -70 45 105 -180 42zM1500 900 l210 -65 45 120 -220 40z" fill="#393936"/>
          <g opacity=".5" fill="#CCD0CD"><ellipse cx="560" cy="310" rx="220" ry="80"/><ellipse cx="1300" cy="245" rx="260" ry="95"/></g>
        </svg>
        <div style={{position: 'absolute', left: 92, top: 72, color: '#F4EAD4', fontFamily: 'Noto Sans CJK KR, sans-serif'}}>
          <div style={{fontSize: 24, fontWeight: 800, letterSpacing: 5, color: '#E6BB69'}}>1945 · 패전 직후</div>
          <div style={{fontSize: 82, fontWeight: 950, marginTop: 10}}>무너진 제국</div>
        </div>
        <CharacterPuppet outfit="japanese-soldier" hair="crop" hat="field-khaki" expression="concerned" pose="hands-behind" gaze={1} enterFrame={8} style={{left: 270, bottom: 70, scale: '1.18'}}/>
        <CharacterPuppet outfit="civilian" hair="waves" expression="concerned" pose="neutral" gaze={-1} enterFrame={18} motionOffset={2} style={{left: 580, bottom: 55, scale: '1.03'}}/>
        <CharacterPuppet outfit="civilian" hair="silver" hairColor="#D7D2C5" expression="stern" pose="hold-document" enterFrame={28} motionOffset={4} style={{left: 845, bottom: 48, scale: '.96'}}/>
        <CharacterPuppet outfit="japanese-officer" hair="slick" hat="officer-khaki" moustache expression="stern" pose="explain-right" gaze={1} speaking enterFrame={36} motionOffset={6} style={{left: 1160, bottom: 62, scale: '1.12'}}/>
        <div style={{position: 'absolute', right: 95, top: 80, width: 410, padding: '24px 28px', borderLeft: '8px solid #C8453D', color: '#F2E8D3', backgroundColor: 'rgba(16,22,25,.86)', fontFamily: 'Noto Sans CJK KR, sans-serif', fontSize: 31, fontWeight: 750, translate: `${interpolate(frame, [58, 84], [80, 0], {...clamp, easing: ease})}px 0`, opacity: interpolate(frame, [58, 75], [0, 1], clamp)}}>인물의 감정이<br/>장면을 끌고 간다</div>
      </AbsoluteFill>
    </SceneFrame>
  );
};

const ConferenceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 138;
  return (
    <SceneFrame from={138} duration={178}>
      <AbsoluteFill style={{background: 'linear-gradient(135deg, #D6C7A6, #9F8B68)'}}>
        <div style={{position: 'absolute', inset: '0 0 42% 0', background: 'repeating-linear-gradient(90deg, #B09C79 0 6px, #C7B58F 6px 220px)', borderBottom: '14px solid #4B3528'}}/>
        <div style={{position: 'absolute', left: 690, top: 42, width: 540, height: 330, backgroundColor: '#E9E0CB', border: '15px solid #49382E', boxShadow: '0 18px 35px rgba(0,0,0,.3)'}}>
          <svg viewBox="0 0 510 300" width="100%" height="100%"><path d="M40 200 Q82 111 141 126 Q183 76 240 112 Q295 75 343 120 Q408 105 465 185" fill="#9E9B78"/><path d="M175 55 Q211 76 241 71 Q278 55 319 69 L305 230 Q250 255 194 225Z" fill="#C64A43"/><circle cx="292" cy="96" r="7" fill="#E2B85C"/><path d="M260 42 V253" stroke="#374D66" strokeWidth="8" strokeDasharray="12 10"/></svg>
        </div>
        <div style={{position: 'absolute', left: 92, top: 72, color: '#2A2B2A', fontFamily: 'Noto Sans CJK KR, sans-serif'}}><div style={{fontSize: 24, fontWeight: 900, letterSpacing: 5, color: '#963C35'}}>전후 구상</div><div style={{fontSize: 76, fontWeight: 950, marginTop: 8}}>지도 위의 약속</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 315, background: 'linear-gradient(#543D2D, #2E211A)', clipPath: 'polygon(8% 28%, 92% 28%, 100% 100%, 0 100%)', boxShadow: '0 -12px 30px rgba(0,0,0,.25)'}}/>
        <CharacterPuppet outfit="dark-suit" hair="silver" hairColor="#E2DED2" expression="warm" pose="explain-right" speaking gaze={1} enterFrame={150} motionOffset={1} style={{left: 250, bottom: 105, scale: '1.03'}}/>
        <CharacterPuppet outfit="dark-suit" hair="bald" hairColor="#BFC0B9" glasses moustache expression="stern" pose="hold-document" gaze={0} enterFrame={162} motionOffset={3} style={{left: 780, bottom: 94, scale: '1.08'}}/>
        <CharacterPuppet outfit="roc-officer" hair="slick" expression="stern" pose="point-left" gaze={-1} enterFrame={174} motionOffset={5} style={{left: 1300, bottom: 102, scale: '1.08'}}/>
        <div style={{position: 'absolute', left: 730, bottom: 65, width: 460, padding: '19px 26px', backgroundColor: '#EDE5D2', color: '#332A23', fontFamily: 'Noto Sans CJK KR, sans-serif', fontSize: 27, fontWeight: 800, textAlign: 'center', border: '4px solid #49382E', rotate: `${interpolate(local, [84, 105], [-4, 0], {...clamp, easing: ease})}deg`, opacity: interpolate(local, [78, 95], [0, 1], clamp)}}>대만의 전후 처리 방안</div>
      </AbsoluteFill>
    </SceneFrame>
  );
};

const HandoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 300;
  return (
    <SceneFrame from={300} duration={180}>
      <AbsoluteFill style={{background: 'linear-gradient(110deg, #D3C7A8 0 50%, #B8C6C0 50% 100%)'}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(113,54,45,.16), transparent 44%, rgba(35,72,76,.18))'}}/>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 30, background: '#202B31'}}/>
        <div style={{position: 'absolute', left: 75, top: 75, color: '#283036', fontFamily: 'Noto Sans CJK KR, sans-serif'}}><div style={{fontSize: 24, fontWeight: 900, letterSpacing: 5, color: '#9D3B36'}}>1945 · 대만</div><div style={{fontSize: 74, fontWeight: 950, marginTop: 9}}>통치권의 교체</div></div>
        <div style={{position: 'absolute', left: 180, top: 260, width: 255, height: 150, border: '7px solid #2A3337', background: '#F0E9D8', display: 'grid', placeItems: 'center'}}><div style={{width: 100, height: 100, borderRadius: 100, background: '#C83D38'}}/></div>
        <div style={{position: 'absolute', right: 180, top: 260, width: 255, height: 150, border: '7px solid #2A3337', background: '#D94A46', display: 'grid', placeItems: 'center'}}><div style={{width: 72, height: 72, borderRadius: 100, background: '#263F70', display: 'grid', placeItems: 'center', color: 'white', fontSize: 40}}>☀</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 190, backgroundColor: '#394044'}}/>
        <CharacterPuppet outfit="japanese-officer" hair="crop" hat="officer-khaki" expression="concerned" pose="hold-document" gaze={1} enterFrame={312} motionOffset={1} style={{left: 310, bottom: 90, scale: '1.16'}}/>
        <CharacterPuppet outfit="japanese-soldier" hair="crop" hat="field-khaki" expression="concerned" pose="hands-behind" gaze={1} enterFrame={328} motionOffset={2} style={{left: 70, bottom: 68, scale: '.84'}}/>
        <CharacterPuppet outfit="roc-officer" hair="slick" hat="officer-olive" expression="stern" pose={local > 88 ? 'hold-document' : 'explain-left'} gaze={-1} enterFrame={320} motionOffset={5} style={{right: 315, bottom: 90, scale: '1.16'}}/>
        <CharacterPuppet outfit="roc-soldier" hair="side-part" hat="field-olive" expression="neutral" pose="hands-behind" gaze={-1} enterFrame={338} motionOffset={7} style={{right: 80, bottom: 68, scale: '.84'}}/>
        <div style={{position: 'absolute', left: '50%', top: 475, width: 180, height: 218, translate: `${interpolate(local, [62, 103], [-220, 220], {...clamp, easing: ease}) - 90}px ${-Math.sin(interpolate(local, [62, 103], [0, Math.PI], clamp)) * 85}px`, rotate: `${interpolate(local, [62, 103], [-9, 7], clamp)}deg`, background: '#EEE5CE', border: '6px solid #293238', boxShadow: '0 18px 28px rgba(0,0,0,.27)', padding: 18}}><div style={{fontSize: 14, letterSpacing: 2, color: '#4C5558'}}>SURRENDER</div><div style={{height: 4, background: '#8E897B', marginTop: 13}}/><div style={{height: 4, width: '80%', background: '#8E897B', marginTop: 10}}/><div style={{height: 4, width: '88%', background: '#8E897B', marginTop: 10}}/><div style={{position: 'absolute', right: 15, bottom: 15, width: 52, height: 52, border: '5px solid #B6423A', borderRadius: 52}}/></div>
        <div style={{position: 'absolute', left: '50%', bottom: 70, translate: '-50% 0', color: '#F5EBD4', backgroundColor: '#202A30', borderTop: '6px solid #D0A84B', padding: '18px 34px', fontFamily: 'Noto Sans CJK KR, sans-serif', fontSize: 31, fontWeight: 850, opacity: interpolate(local, [108, 124], [0, 1], clamp)}}>같은 인물 시스템 · 다른 시대와 역할</div>
      </AbsoluteFill>
    </SceneFrame>
  );
};

export const CharacterSystemPreview: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#11171C', overflow: 'hidden'}}>
    <RuinsScene/>
    <ConferenceScene/>
    <HandoverScene/>
    <AbsoluteFill style={{pointerEvents: 'none', opacity: .11, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 4px)'}}/>
    <AbsoluteFill style={{pointerEvents: 'none', boxShadow: 'inset 0 0 180px rgba(0,0,0,.38)'}}/>
  </AbsoluteFill>
);
