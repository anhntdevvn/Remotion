import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor } from "../components/Actor";
import { World, Table, Chair } from "../components/World";
import { Board } from "../components/Props";
import { clamp, FONT, INK, PAPER, RED, Shot } from "../types";

const SmallBallot = (
  <svg viewBox="0 0 300 330" style={{ width: 240, height: 260 }}>
    <path d="M40 123H260V298H40Z" fill="#ba9d70" stroke={INK} strokeWidth="7" />
    <path
      d="M40 123L78 84H219L260 123Z"
      fill="#d5bd8f"
      stroke={INK}
      strokeWidth="7"
    />
    <path d="M106 104H193" stroke={INK} strokeWidth="9" />
    <path d="M114 45H187V121H114Z" fill={PAPER} stroke={INK} strokeWidth="5" />
    <path d="M128 66L139 78L173 54" fill="none" stroke={RED} strokeWidth="6" />
  </svg>
);
export const DecisionScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  if (shot.kind === "comparison")
    return (
      <>
        <World kind="office" />
        <Actor
          cast="japanTroop"
          x={358}
          y={246}
          height={660}
          pose="neutral"
          expression="concerned"
        />
        <Actor
          cast="clerk"
          x={962}
          y={246}
          height={660}
          pose="read"
          prop="folder"
        />
        <Actor
          cast="observer"
          x={1562}
          y={246}
          height={660}
          pose="hold-document"
        />
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M660 268V915M1260 268V915"
            stroke="#8f8867"
            strokeWidth="6"
            strokeDasharray="9 9"
          />
        </svg>
        {["일본군 항복", "행정 인수", "최종 평화조약"].map((label, i) => (
          <div
            key={label}
            style={{
              position: "absolute",
              left: 90 + i * 600,
              top: 171,
              width: 525,
              textAlign: "center",
              fontSize: 46,
              fontWeight: 800,
              color: INK,
              fontFamily: FONT,
            }}
          >
            {label}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 883,
            left: 720,
            color: RED,
            fontSize: 42,
            fontWeight: 800,
            fontFamily: FONT,
          }}
        >
          서로 다른 절차
        </div>
      </>
    );
  if (shot.kind === "summary")
    return (
      <>
        <World kind="archive" />
        <Board
          x={960}
          y={208}
          width={1100}
          text="왜 일본은 대만을 지킬 수 없었을까?"
          sub="① 패전  ② 항복 조건  ③ 권리 포기"
        />
      </>
    );
  const ballot = shot.mode === "ballot" || shot.mode === "ballot-risk";
  const military = shot.mode === "military" || shot.mode === "military-risk";
  const all =
    shot.mode === "three" || shot.mode === "intro" || shot.mode === "problems";
  return (
    <>
      <World kind="office" />
      <Chair x={155} y={278} width={300} />
      <Actor
        cast="truman"
        x={394}
        y={105}
        height={948}
        seated
        pose={frame > 40 ? "explain-right" : "neutral"}
        expression="concerned"
        gaze={1}
      />
      {ballot ? (
        <>
          <Actor
            cast="civilian"
            x={1025}
            y={141}
            height={790}
            pose="pass-right"
            prop="folder"
            gaze={1}
          />
          <div style={{ position: "absolute", left: 1175, top: 613 }}>
            {SmallBallot}
          </div>
          {shot.mode === "ballot-risk" && (
            <Actor
              cast="prc"
              x={1630}
              y={190}
              height={744}
              pose="arms-raised"
              expression="stern"
            />
          )}
          <Board
            x={1360}
            y={227}
            width={465}
            text={shot.mode === "ballot-risk" ? "양측의 반발" : "주민 투표?"}
            sub="검토된 방안 · 시행 장면 아님"
          />
        </>
      ) : military ? (
        <>
          <Actor
            cast="us"
            x={1000}
            y={170}
            height={800}
            pose="rifle-ready"
            prop="rifle"
            travel={95}
            travelEnd={60}
          />
          <Actor
            cast="civilian"
            x={1580}
            y={220}
            height={715}
            pose="explain-left"
            expression="concerned"
            gaze={-1}
            recoil={shot.mode === "military-risk"}
          />
          <div
            style={{
              position: "absolute",
              left: 1100,
              top: 242,
              color: RED,
              fontFamily: FONT,
              fontSize: 60,
              fontWeight: 800,
            }}
          >
            군사 개입?
          </div>
          <div
            style={{
              position: "absolute",
              left: 960,
              top: 340,
              color: INK,
              fontFamily: FONT,
              fontSize: 27,
            }}
          >
            가정된 방안 · 실제 점령 장면 아님
          </div>
        </>
      ) : (
        <Board
          x={1290}
          y={264}
          width={780}
          text={all ? "여러 선택지" : shot.label}
          sub={
            all ? "현상 유지 / 국제적 관리 / 군사 개입" : "해결되지 않은 질문"
          }
        />
      )}
      <Table x={148} y={856} width={690} document />
      {shot.mode === "statusquo" && (
        <div
          style={{
            position: "absolute",
            left: 1070,
            top: 758,
            color: RED,
            fontSize: 42,
            fontWeight: 800,
            fontFamily: FONT,
          }}
        >
          현 상태를 인정할 것인가?
        </div>
      )}
    </>
  );
};

export const EndingScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <World kind="port" />
      <Actor
        cast="civilian"
        x={535}
        y={188}
        height={770}
        facing="back"
        hair="waves"
      />
      <Actor
        cast="civilian"
        x={976}
        y={200}
        height={735}
        facing="back"
        hair="silver"
        hairColor="#9b9683"
      />
      <Actor
        cast="civilian"
        x={1374}
        y={212}
        height={710}
        facing="back"
        hair="crop"
      />
      <div
        style={{
          position: "absolute",
          left: 260,
          right: 260,
          top: 155,
          fontFamily: FONT,
          fontSize: 59,
          fontWeight: 800,
          textAlign: "center",
          color: INK,
          background: "rgba(238,229,209,.89)",
          border: `4px solid ${INK}`,
          padding: 30,
          opacity: interpolate(frame, [0, 16], [0, 1], clamp),
        }}
      >
        누가 대만의 미래를 결정할 것인가?
      </div>
      {shot.mode === "end" && (
        <div
          style={{
            position: "absolute",
            left: 1470,
            top: 817,
            padding: "9px 16px",
            fontFamily: FONT,
            fontSize: 26,
            color: PAPER,
            background: INK,
          }}
        >
          기묘한 기록실
        </div>
      )}
    </>
  );
};
