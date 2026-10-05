import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CharacterPuppet } from "../components/CharacterPuppet";
import { SCENE_01_PREVIEW } from "../scene01Timing";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const C = {
  ink: "#172027",
  cream: "#F2E7CF",
  gold: "#D6AD54",
  red: "#B83E39",
  blue: "#27486E",
};
const sceneOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 14, end], [0, 1, 1, 0], clamp);

const TaiwanShape: React.FC<{ fill?: string }> = ({ fill = C.red }) => (
  <svg viewBox="0 0 210 350" width="100%" height="100%">
    <path
      d="M132 13 C163 25 183 59 180 94 C177 133 157 168 143 199 C126 236 111 276 81 319 C66 340 45 344 35 328 C23 309 36 277 47 251 C61 216 68 177 75 140 C83 99 92 57 111 28 C118 18 124 14 132 13Z"
      fill={fill}
      stroke={C.ink}
      strokeWidth="8"
    />
    <circle cx="25" cy="225" r="7" fill={C.gold} />
    <circle cx="12" cy="239" r="4" fill={C.gold} />
    <circle cx="30" cy="250" r="4" fill={C.gold} />
  </svg>
);

const RuinsBackdrop: React.FC = () => (
  <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
    <defs>
      <linearGradient id="s01-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#75808A" />
        <stop offset=".58" stopColor="#A8AAA5" />
        <stop offset="1" stopColor="#665C50" />
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#s01-sky)" />
    <path
      d="M0 600 L180 520 L340 585 L520 470 L670 565 L820 435 L980 550 L1140 410 L1310 555 L1490 448 L1660 565 L1820 430 L1920 495 V1080 H0Z"
      fill="#3C403B"
    />
    <path
      d="M0 730 H330 V485 H505 V700 H690 V1080 H0ZM740 1080 V600 H900 V390 H1120 V625 H1260 V1080ZM1290 1080 V540 H1535 V405 H1760 V590 H1920 V1080Z"
      fill="#22282A"
    />
    <g fill="#111719">
      <rect x="85" y="560" width="58" height="78" />
      <rect x="210" y="560" width="58" height="78" />
      <rect x="815" y="515" width="58" height="78" />
      <rect x="970" y="475" width="58" height="86" />
      <rect x="1395" y="600" width="58" height="82" />
      <rect x="1605" y="515" width="58" height="82" />
    </g>
    <path d="M0 875 H1920 V1080 H0Z" fill="#5B5248" />
    <path
      d="M140 930 l190 -75 45 115 -200 42zM1470 910 l235 -72 48 128 -245 42z"
      fill="#383936"
    />
  </svg>
);

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const loss = interpolate(frame, [108, 168], [0, 1], {
    ...clamp,
    easing: ease,
  });
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, 0, 320),
        background: "radial-gradient(circle at 67% 46%, #27343D, #0B1116 66%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 70,
          color: C.cream,
          fontFamily: "Noto Sans CJK KR, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: C.gold,
            fontWeight: 900,
            letterSpacing: 6,
          }}
        >
          대만 · 1895–1945
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 950,
            marginTop: 16,
            opacity: interpolate(
              frame,
              [14, 34, 106, 124],
              [0, 1, 1, 0.28],
              clamp,
            ),
          }}
        >
          일본의 지배
        </div>
        <div
          style={{
            fontSize: 162,
            lineHeight: 0.95,
            fontWeight: 950,
            color: C.gold,
            opacity: interpolate(
              frame,
              [20, 45, 108, 128],
              [0, 1, 1, 0.25],
              clamp,
            ),
          }}
        >
          50년
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 950,
            color: "#F4E9D1",
            marginTop: 18,
            opacity: interpolate(frame, [112, 143], [0, 1], clamp),
            translate: `${interpolate(frame, [112, 150], [-35, 0], { ...clamp, easing: ease })}px 0`,
          }}
        >
          하지만 1945년
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 950,
            color: "#D95950",
            opacity: interpolate(frame, [148, 178], [0, 1], clamp),
          }}
        >
          모두 잃었다
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 325,
          top: 100,
          width: 340,
          height: 620,
          filter: "drop-shadow(0 30px 35px rgba(0,0,0,.38))",
          translate: `${loss * 185}px ${loss * 45}px`,
          rotate: `${loss * 9}deg`,
          opacity: 1 - loss * 0.58,
        }}
      >
        <TaiwanShape />
      </div>
      <CharacterPuppet
        outfit="japanese-officer"
        hair="slick"
        hat="officer-khaki"
        moustache
        expression={frame < 112 ? "stern" : "concerned"}
        pose={frame < 112 ? "explain-right" : "hands-behind"}
        gaze={1}
        enterFrame={8}
        motionOffset={3}
        style={{ right: 75, bottom: 46, scale: "1.2" }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 66,
          translate: "-50% 0",
          width: 1030,
          padding: "23px 38px",
          textAlign: "center",
          background: "rgba(9,15,20,.94)",
          borderTop: `8px solid ${C.red}`,
          color: C.cream,
          fontFamily: "Noto Sans CJK KR, sans-serif",
          fontSize: 53,
          fontWeight: 950,
          opacity: interpolate(frame, [214, 242], [0, 1], clamp),
          scale: interpolate(frame, [214, 246], [0.92, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        왜 대만을 지키지 못했을까?
      </div>
    </AbsoluteFill>
  );
};

const DefeatScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, 300, 470),
        scale: interpolate(frame, [300, 470], [1.05, 1], clamp),
      }}
    >
      <RuinsBackdrop />
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 68,
          color: C.cream,
          fontFamily: "Noto Sans CJK KR, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 6,
            color: C.gold,
          }}
        >
          1945 · 제2차 세계대전 종전
        </div>
        <div
          style={{
            fontSize: 112,
            fontWeight: 950,
            letterSpacing: -7,
            marginTop: 10,
          }}
        >
          패전
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, marginTop: 4 }}>
          일본 제국의 마지막 날
        </div>
      </div>
      <CharacterPuppet
        outfit="japanese-soldier"
        hair="crop"
        hat="field-khaki"
        expression="concerned"
        pose="hands-behind"
        gaze={1}
        enterFrame={305}
        style={{ left: 315, bottom: 54, scale: "1.08" }}
      />
      <CharacterPuppet
        outfit="civilian"
        hair="waves"
        expression="concerned"
        gaze={-1}
        enterFrame={312}
        motionOffset={2}
        style={{ left: 685, bottom: 42, scale: ".94" }}
      />
      <CharacterPuppet
        outfit="japanese-officer"
        hair="slick"
        hat="officer-khaki"
        moustache
        expression="stern"
        pose="neutral"
        gaze={-1}
        enterFrame={320}
        motionOffset={5}
        style={{ left: 1120, bottom: 58, scale: "1.16" }}
      />
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 74,
          width: 310,
          height: 198,
          rotate: "-6deg",
          background: "#EEE8D9",
          border: `9px solid ${C.ink}`,
          boxShadow: "0 20px 35px rgba(0,0,0,.3)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: 100,
            background: C.red,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const TerritoryCard: React.FC<{
  name: string;
  detail: string;
  left: number;
  top: number;
  from: number;
  dx: number;
  dy: number;
}> = ({ name, detail, left, top, from, dx, dy }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 250,
        padding: "18px 20px",
        background: "#EEE4CB",
        color: C.ink,
        border: "5px solid #263038",
        boxShadow: "0 15px 25px rgba(0,0,0,.32)",
        fontFamily: "Noto Sans CJK KR, sans-serif",
        translate: `${interpolate(frame, [from, from + 38], [0, dx], { ...clamp, easing: ease })}px ${interpolate(frame, [from, from + 38], [0, dy], { ...clamp, easing: ease })}px`,
        rotate: `${interpolate(frame, [from, from + 38], [0, dx > 0 ? 8 : -8], clamp)}deg`,
        opacity: interpolate(
          frame,
          [from - 4, from + 6, from + 31, from + 39],
          [0, 1, 1, 0],
          clamp,
        ),
      }}
    >
      <div
        style={{
          fontSize: 17,
          fontWeight: 900,
          color: C.red,
          letterSpacing: 3,
        }}
      >
        일본 제국령
      </div>
      <div style={{ fontSize: 39, fontWeight: 950, marginTop: 3 }}>{name}</div>
      <div style={{ fontSize: 19, marginTop: 3, color: "#6B6559" }}>
        {detail}
      </div>
    </div>
  );
};

const EmpireBreakupScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, 450, 590),
        background: "linear-gradient(120deg, #1A252D, #0D1318)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 78,
          top: 62,
          color: C.cream,
          fontFamily: "Noto Sans CJK KR, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: C.gold,
            fontWeight: 900,
            letterSpacing: 5,
          }}
        >
          패전과 동시에
        </div>
        <div style={{ fontSize: 78, fontWeight: 950, marginTop: 8 }}>
          제국의 지배권이 무너졌다
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 750,
          top: 138,
          width: 430,
          height: 430,
          border: "3px dashed rgba(242,231,207,.25)",
          borderRadius: 430,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 220,
            background: "#EEE8D9",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 0 70px rgba(184,62,57,.25)",
          }}
        >
          <div
            style={{
              width: 122,
              height: 122,
              borderRadius: 122,
              background: C.red,
            }}
          />
        </div>
      </div>
      <CharacterPuppet
        outfit="japanese-officer"
        hair="slick"
        hat="officer-khaki"
        expression="concerned"
        pose="hands-behind"
        enterFrame={455}
        style={{ left: 805, bottom: 48, scale: "1.1" }}
      />
      <TerritoryCard
        name="조선"
        detail="식민 통치 종료"
        left={150}
        top={360}
        from={475}
        dx={-230}
        dy={-60}
      />
      <TerritoryCard
        name="만주"
        detail="괴뢰국 붕괴"
        left={420}
        top={650}
        from={498}
        dx={-260}
        dy={170}
      />
      <TerritoryCard
        name="남양 군도"
        detail="통치권 상실"
        left={1260}
        top={650}
        from={521}
        dx={270}
        dy={170}
      />
      <TerritoryCard
        name="대만"
        detail="50년 지배 종료"
        left={1510}
        top={350}
        from={544}
        dx={235}
        dy={-70}
      />
    </AbsoluteFill>
  );
};

const TaiwanRuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, 570, 690),
        background: "linear-gradient(110deg, #D8CBAA, #AFA080)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 210,
          background: "#4C4338",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          top: 68,
          color: C.ink,
          fontFamily: "Noto Sans CJK KR, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 23,
            color: C.red,
            fontWeight: 900,
            letterSpacing: 5,
          }}
        >
          그중 하나
        </div>
        <div style={{ fontSize: 90, fontWeight: 950, marginTop: 5 }}>대만</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 12,
            fontSize: 43,
            fontWeight: 900,
          }}
        >
          <span>1895</span>
          <span style={{ width: 210, height: 5, background: C.red }} />
          <span>1945</span>
        </div>
        <div style={{ fontSize: 31, fontWeight: 800, marginTop: 14 }}>
          일본의 식민 통치 50년
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 775,
          top: 105,
          width: 330,
          height: 600,
          filter: "drop-shadow(0 25px 24px rgba(0,0,0,.25))",
          scale: interpolate(frame, [575, 610], [0.78, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        <TaiwanShape />
      </div>
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, opacity: 0.28 }}
      >
        <path d="M0 750 H1920 M0 790 H1920" stroke="#27343A" strokeWidth="10" />
        <path
          d="M70 750 V620 H250 V750 M1450 750 V565 H1770 V750 M1510 620 H1710"
          fill="none"
          stroke="#27343A"
          strokeWidth="16"
        />
      </svg>
      <CharacterPuppet
        outfit="japanese-officer"
        hair="slick"
        hat="officer-khaki"
        moustache
        expression="stern"
        pose="explain-right"
        speaking
        gaze={1}
        enterFrame={578}
        motionOffset={4}
        style={{ left: 420, bottom: 56, scale: "1.08" }}
      />
      <CharacterPuppet
        outfit="civilian"
        hair="side-part"
        expression="concerned"
        gaze={-1}
        enterFrame={586}
        motionOffset={7}
        style={{ right: 310, bottom: 52, scale: "1.05" }}
      />
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 78,
          width: 500,
          padding: "20px 26px",
          borderLeft: `8px solid ${C.red}`,
          background: "rgba(245,237,219,.88)",
          color: C.ink,
          fontFamily: "Noto Sans CJK KR, sans-serif",
          fontSize: 29,
          fontWeight: 850,
          opacity: interpolate(frame, [600, 618], [0, 1], clamp),
        }}
      >
        단순한 해외 전초기지가 아니라
        <br />
        오랫동안 지배한 식민지
      </div>
    </AbsoluteFill>
  );
};

const HandoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const paperProgress = interpolate(frame, [710, 765], [0, 1], {
    ...clamp,
    easing: ease,
  });
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, 670, 810),
        background: "linear-gradient(110deg, #D7C9A8 0 50%, #B9C9C4 50% 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(134,60,48,.12), transparent 44%, rgba(32,76,80,.17))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 64,
          color: C.ink,
          fontFamily: "Noto Sans CJK KR, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 23,
            color: C.red,
            fontWeight: 900,
            letterSpacing: 5,
          }}
        >
          1945 · 대만
        </div>
        <div style={{ fontSize: 72, fontWeight: 950, marginTop: 7 }}>
          일본 통치 종료와 행정 인수
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 245,
          width: 260,
          height: 150,
          border: `7px solid ${C.ink}`,
          background: "#F1EBDD",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{ width: 98, height: 98, borderRadius: 98, background: C.red }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 130,
          top: 245,
          width: 260,
          height: 150,
          border: `7px solid ${C.ink}`,
          background: "#D74B47",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 76,
            background: C.blue,
            display: "grid",
            placeItems: "center",
            color: "#F7E6A3",
            fontSize: 39,
          }}
        >
          ☀
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 205,
          background: "#3A4245",
        }}
      />
      <CharacterPuppet
        outfit="japanese-soldier"
        hair="crop"
        hat="field-khaki"
        expression="concerned"
        pose="hands-behind"
        gaze={1}
        enterFrame={678}
        motionOffset={1}
        style={{ left: 85, bottom: 58, scale: ".82" }}
      />
      <CharacterPuppet
        outfit="japanese-officer"
        hair="slick"
        hat="officer-khaki"
        moustache
        expression="concerned"
        pose={frame < 765 ? "explain-right" : "hands-behind"}
        gaze={1}
        enterFrame={682}
        motionOffset={3}
        style={{ left: 355, bottom: 72, scale: "1.12" }}
      />
      <CharacterPuppet
        outfit="roc-officer"
        hair="slick"
        hat="officer-olive"
        expression="stern"
        pose={frame < 765 ? "explain-left" : "hold-document"}
        gaze={-1}
        enterFrame={686}
        motionOffset={5}
        style={{ right: 355, bottom: 72, scale: "1.12" }}
      />
      <CharacterPuppet
        outfit="roc-soldier"
        hair="side-part"
        hat="field-olive"
        expression="neutral"
        pose="hands-behind"
        gaze={-1}
        enterFrame={690}
        motionOffset={7}
        style={{ right: 85, bottom: 58, scale: ".82" }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 680,
          width: 174,
          height: 214,
          translate: `${-330 + paperProgress * 660 - 87}px ${-Math.sin(paperProgress * Math.PI) * 35}px`,
          rotate: `${interpolate(paperProgress, [0, 1], [-8, 7])}deg`,
          background: "#F1E8D1",
          border: `6px solid ${C.ink}`,
          boxShadow: "0 18px 28px rgba(0,0,0,.25)",
          padding: 17,
          opacity: interpolate(
            frame,
            [700, 712, 760, 775],
            [0, 1, 1, 0],
            clamp,
          ),
        }}
      >
        <div style={{ fontSize: 13, letterSpacing: 2, color: "#4A555B" }}>
          SURRENDER
        </div>
        <div style={{ height: 4, background: "#918B7C", marginTop: 13 }} />
        <div
          style={{
            height: 4,
            width: "80%",
            background: "#918B7C",
            marginTop: 10,
          }}
        />
        <div
          style={{
            height: 4,
            width: "88%",
            background: "#918B7C",
            marginTop: 10,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 14,
            bottom: 14,
            width: 50,
            height: 50,
            border: `5px solid ${C.red}`,
            borderRadius: 50,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 68,
          translate: "-50% 0",
          padding: "18px 34px",
          color: C.cream,
          background: C.ink,
          borderTop: `7px solid ${C.gold}`,
          fontFamily: "Noto Sans CJK KR, sans-serif",
          fontSize: 31,
          fontWeight: 900,
          opacity: interpolate(frame, [765, 785], [0, 1], clamp),
        }}
      >
        중화민국 정부 · 대만 행정 시작
      </div>
      <div
        style={{
          position: "absolute",
          right: 520,
          top: 190,
          width: 180,
          height: 330,
          opacity: interpolate(frame, [765, 790], [0, 0.42], clamp),
        }}
      >
        <TaiwanShape fill="#B8433D" />
      </div>
    </AbsoluteFill>
  );
};

export const Scene01Preview: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0E151A", overflow: "hidden" }}>
      <Audio
        loop
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/s01_ambience.mp3",
        )}
        volume={(f) =>
          interpolate(f, [0, 35, 765, 809], [0, 0.42, 0.42, 0], clamp)
        }
      />
      <Audio
        from={SCENE_01_PREVIEW.audioStartFrame}
        src={staticFile("episodes/taiwan-after-ww2-action-v3/audio/s01_ko.mp3")}
        volume={1}
      />
      <Audio
        from={1}
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/sfx/impact.wav",
        )}
        volume={0.32}
      />
      <Audio
        from={300}
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/sfx/whoosh.wav",
        )}
        volume={0.23}
      />
      <Audio
        from={570}
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/sfx/whoosh.wav",
        )}
        volume={0.2}
      />
      <Audio
        from={700}
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/sfx/paper.wav",
        )}
        volume={0.3}
      />
      <Audio
        from={768}
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/sfx/stamp.wav",
        )}
        volume={0.24}
      />
      <HookScene />
      <DefeatScene />
      <EmpireBreakupScene />
      <TaiwanRuleScene />
      <HandoverScene />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 32,
          color: "rgba(246,236,214,.72)",
          fontFamily: "Noto Sans CJK KR, sans-serif",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 4,
        }}
      >
        기묘한 기록실 · 기록 001
      </div>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          opacity: 0.1,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 4px)",
          translate: `0 ${frame % 4}px`,
        }}
      />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          boxShadow: "inset 0 0 170px rgba(0,0,0,.4)",
        }}
      />
    </AbsoluteFill>
  );
};
