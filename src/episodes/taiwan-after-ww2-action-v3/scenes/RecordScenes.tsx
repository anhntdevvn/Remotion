import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor } from "../components/Actor";
import { Chair, Desk, Space } from "../components/Space";
import { PaperHand, Folder, DeskPaper, Label } from "../components/Objects";
import { CentralVisual, scenes } from "../LegacyV2";
import { Beat, C, FONT, clamp } from "../types";

const RECORDS: Record<
  string,
  { heading: string; lines: string[]; tag?: string }
> = {
  mystery: {
    heading: "평화조약 · 1951",
    lines: [
      "일본은 대만에 대한 권리를 포기했다.",
      "그런데 문장에는 이상한 점이 있었다.",
    ],
  },
  recipient: {
    heading: "제2조 (b) · 수령국",
    lines: ["일본의 권리 포기는 명시했다.", "받는 나라: 명시하지 않음"],
    tag: "남은 질문",
  },
  cairo: {
    heading: "카이로 공동성명 · 1943",
    lines: ["만주 · 포모사 · 펑후", "중화민국에 돌려준다는 전후 처리 방향"],
    tag: "전후 처리 방향",
  },
  potsdam: {
    heading: "포츠담 선언 · 1945",
    lines: ["카이로 선언의 조건을 이행한다.", "일본이 받아들인 항복 조건"],
    tag: "재확인",
  },
  chain: {
    heading: "전후 처리의 방향",
    lines: [
      "1943 · 카이로 공동성명",
      "1945 · 포츠담 선언",
      "1945 · 일본 항복문서",
    ],
    tag: "조건 수락",
  },
  pending: {
    heading: "행정은 시작 · 조약은 미완",
    lines: [
      "군사 항복과 행정 인수는 진행됐다.",
      "최종 평화조약은 아직 완성되지 않았다.",
    ],
    tag: "미완",
  },
  "state-dept": {
    heading: "미국 국무부 문서 · 1946",
    lines: [
      "이관이 적절한 조약을 통해",
      "나중에 공식화될 필요가 있을 수 있다.",
    ],
    tag: "가능성에 관한 기록",
  },
  priorities: {
    heading: "전후 일본의 우선순위",
    lines: ["새 헌법", "국가 재건", "평화조약 체결"],
    tag: "대만 회복이 아니다",
  },
  article: {
    heading: "평화조약 · 제2조 (b)",
    lines: ["포모사와 펑후 제도", "일본의 모든 권리 · 권원 · 청구권"],
  },
  renounce: {
    heading: "평화조약 · 제2조 (b)",
    lines: [
      "일본은 포모사와 펑후 제도에 대한",
      "모든 권리 · 권원 · 청구권을 포기한다.",
    ],
    tag: "명시적 포기",
  },
  "not-japanese-ownership": {
    heading: "1951년에 남은 모호함",
    lines: ["일본이 대만을 가질 수 있는가?", "이미 권리 포기를 명시했다."],
    tag: "질문은 그다음이다",
  },
};
export const RecordScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const record = RECORDS[beat.mode] || RECORDS.pending;
  if (beat.grammar === "timeline")
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(130deg,#18242B,#0D141A)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 105,
            right: 105,
            top: 205,
            color: C.cream,
            fontSize: 66,
            fontWeight: 950,
          }}
        >
          한 줄이 아닌 56년의 순서
        </div>
        <div
          style={{
            position: "absolute",
            left: 122,
            top: 448,
            scale: 1.03,
            transformOrigin: "0 0",
          }}
        >
          <CentralVisual config={scenes[1]} frame={frame} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 125,
            top: 740,
            color: C.gold,
            fontSize: 37,
            fontWeight: 850,
          }}
        >
          전쟁 → 항복 → 행정 → 평화조약
        </div>
      </>
    );
  if (beat.grammar === "procedure")
    return (
      <>
        <Space setting="office" />
        <Actor
          cast="japanTroop"
          x={350}
          y={311}
          height={600}
          pose="neutral"
          expression="concerned"
        />
        <Actor
          cast="clerk"
          x={960}
          y={284}
          height={647}
          pose="write"
          prop="pen"
        />
        <Actor
          cast="observer"
          x={1550}
          y={294}
          height={625}
          pose="read"
          prop="folder"
        />
        {["군사 항복", "행정 인수", "최종 평화조약"].map((text, i) => (
          <Label key={text} x={350 + i * 600} y={241} width={470}>
            {text}
          </Label>
        ))}
        <div
          style={{
            position: "absolute",
            left: 671,
            top: 582,
            color: C.red,
            fontSize: 88,
            fontWeight: 950,
          }}
        >
          ≠
        </div>
        <div
          style={{
            position: "absolute",
            left: 1278,
            top: 582,
            color: C.red,
            fontSize: 88,
            fontWeight: 950,
          }}
        >
          ≠
        </div>
        <Desk x={706} y={789} width={514} />
        <DeskPaper x={1016} y={780} />
        <Actor
          cast="clerk"
          x={960}
          y={284}
          height={647}
          handsOnly
          pose="write"
          prop="pen"
        />
      </>
    );
  return (
    <>
      <Space setting="office" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8,15,20,.32)",
        }}
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
          d="M187 243L1733 220L1845 910H71Z"
          fill="#5C4637"
          stroke={C.ink}
          strokeWidth="10"
        />
        <path d="M1628 381L1650 767" stroke={C.ink} strokeWidth="18" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 405,
          top: 184,
          width: 1100,
          minHeight: 635,
          background: C.paper,
          border: `8px solid ${C.ink}`,
          padding: "43px 66px 30px",
          rotate: "-2deg",
          boxShadow: "0 24px 38px rgba(0,0,0,.27)",
          color: C.ink,
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            fontSize: 25,
            color: C.red,
            fontWeight: 950,
            letterSpacing: 3,
          }}
        >
          기묘한 기록실 · 문서 요약
        </div>
        <div
          style={{
            fontSize: 57,
            fontWeight: 950,
            margin: "25px 0 30px",
            paddingBottom: 25,
            borderBottom: "4px solid #85785B",
          }}
        >
          {record.heading}
        </div>
        {record.lines.map((line, i) => (
          <div
            key={line}
            style={{
              fontSize: 43,
              lineHeight: 1.6,
              fontWeight: i === 0 ? 850 : 700,
              opacity: interpolate(
                frame,
                [5 + i * 14, 18 + i * 14],
                [0, 1],
                clamp,
              ),
            }}
          >
            {line}
          </div>
        ))}
        {record.tag && (
          <div
            style={{
              marginTop: 34,
              display: "inline-block",
              border: `6px solid ${C.red}`,
              padding: "9px 25px",
              color: C.red,
              fontSize: 39,
              fontWeight: 950,
              rotate: "-6deg",
              opacity: interpolate(frame, [35, 48], [0, 1], clamp),
            }}
          >
            {record.tag}
          </div>
        )}
        <div style={{ marginTop: 28, fontSize: 23, color: "#776E57" }}>
          설명용 재구성 · 원문 이미지 아님
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 478,
          width: 800,
          height: 59,
          background:
            beat.mode === "renounce" ? "rgba(184,61,56,.12)" : "transparent",
          scale: `${interpolate(frame, [19, 65], [0, 1], clamp)} 1`,
          transformOrigin: "0 50%",
        }}
      />
      <PaperHand
        x={259 + interpolate(frame, [8, 52], [0, 166], clamp)}
        y={591}
        angle={-8}
      />
      {beat.mode === "recipient" && (
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <circle
            cx={1250 + interpolate(frame, [0, 55], [195, 0], clamp)}
            cy="559"
            r="95"
            fill="rgba(245,238,220,.17)"
            stroke={C.ink}
            strokeWidth="13"
          />
          <path
            d={`M${1317 + interpolate(frame, [0, 55], [195, 0], clamp)} 626L${1434 + interpolate(frame, [0, 55], [195, 0], clamp)} 755`}
            stroke={C.ink}
            strokeWidth="22"
          />
        </svg>
      )}
    </>
  );
};

export const ClosureScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  if (beat.mode === "three-reasons" || beat.mode === "recap")
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(115deg,#142027,#263039)",
          }}
        />
        {["전쟁 패배", "항복 조건 수락", "평화조약에서 권리 포기"].map(
          (label, i) => {
            const close = interpolate(
              frame,
              [22 + i * 28, 47 + i * 28],
              [0, 1],
              clamp,
            );
            return (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: 175 + i * 555,
                  top: 345,
                  width: 470,
                  height: 465,
                  perspective: 900,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#263B40",
                    border: `8px solid ${C.gold}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: C.paper,
                    border: `8px solid ${C.ink}`,
                    padding: "42px 26px",
                    color: C.ink,
                    transform: `rotateY(${interpolate(close, [0, 1], [-55, 0])}deg)`,
                    transformOrigin: "0 50%",
                  }}
                >
                  <div style={{ fontSize: 34, color: C.red, fontWeight: 950 }}>
                    0{i + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 950,
                      marginTop: 39,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </>
    );
  const excluded =
    beat.mode === "excluded" ||
    beat.mode === "not-recovery" ||
    beat.mode === "lost-decision" ||
    beat.mode === "not-japan";
  return (
    <>
      <Space setting="office" />
      <Chair x={607} />
      <Actor
        cast={beat.mode === "avoid-war" ? "truman" : "japan"}
        x={607}
        y={72}
        height={985}
        seated
        pose={frame < 45 ? "read" : "neutral"}
        prop={frame < 45 ? "folder" : "none"}
        expression="concerned"
      />
      <Desk x={273} y={837} width={1290} />
      <div
        style={{
          position: "absolute",
          left: 1060,
          top: 411,
          width: 390,
          height: 303,
          border: `8px solid ${C.ink}`,
          background: "#394B4C",
          overflow: "hidden",
          boxShadow: "0 16px 25px rgba(0,0,0,.22)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 380,
            background: C.paper,
            padding: 29,
            translate: `${interpolate(frame, [26, 83], [0, excluded ? 400 : 0], clamp)}px 0`,
          }}
        >
          <div style={{ fontSize: 24, color: C.red, fontWeight: 950 }}>
            {beat.mode === "avoid-war" ? "미국의 검토" : "일본의 선택지"}
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 950,
              color: C.ink,
              marginTop: 28,
            }}
          >
            {beat.mode === "avoid-war" ? "중국 내전 개입" : "대만 보유"}
          </div>
        </div>
        {excluded && (
          <div
            style={{
              position: "absolute",
              left: 25,
              top: 112,
              fontSize: 47,
              fontWeight: 950,
              color: C.cream,
            }}
          >
            선택지에서 제외
          </div>
        )}
      </div>
      <Folder
        x={1250}
        y={756}
        text={beat.mode === "avoid-war" ? "개입 회피" : "전후 처리"}
        width={232}
      />
    </>
  );
};

export const ChoiceScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const ballot = beat.grammar === "ballot";
  const selected =
    beat.mode === "statusquo"
      ? 0
      : beat.mode === "international"
        ? 1
        : beat.mode.startsWith("military")
          ? 2
          : null;
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(130deg,#29363B,#101820)",
        }}
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
          d="M150 325H1770L1860 898H60Z"
          fill="#6D563C"
          stroke={C.ink}
          strokeWidth="10"
        />
      </svg>
      {ballot ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 965,
              top: 456,
              width: 380,
              height: 334,
              background: "#BDA478",
              border: `8px solid ${C.ink}`,
              boxShadow: "0 20px 30px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                width: 156,
                height: 10,
                background: C.ink,
                margin: "27px auto",
              }}
            />
            <div
              style={{
                textAlign: "center",
                fontSize: 54,
                fontWeight: 950,
                color: C.ink,
                marginTop: 88,
              }}
            >
              주민 투표?
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 1047,
              top: 280 + interpolate(frame, [0, 45], [0, 144], clamp),
              width: 188,
              height: 141,
              background: C.cream,
              border: `6px solid ${C.ink}`,
              fontSize: 76,
              textAlign: "center",
              color: C.red,
            }}
          >
            ?
          </div>
          <PaperHand
            x={867}
            y={230 + interpolate(frame, [0, 45], [0, 144], clamp)}
            angle={0}
          />
          <div
            style={{
              position: "absolute",
              left: 311,
              top: 582,
              width: 454,
              fontSize: 46,
              lineHeight: 1.4,
              fontWeight: 950,
              color: C.cream,
            }}
          >
            중국 양측의 반발
            <br />
            <span style={{ color: C.gold }}>간단하지 않았다</span>
          </div>
        </>
      ) : (
        <>
          {["현 상태 인정", "국제 관리·주민 투표", "군사 개입"].map(
            (label, i) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: 170 + i * 570,
                  top:
                    422 +
                    interpolate(frame, [8 + i * 7, 31 + i * 7], [80, 0], clamp),
                  width: 500,
                  height: 362,
                  padding: "36px 32px",
                  background: C.paper,
                  border: `8px solid ${selected === i ? C.red : C.ink}`,
                  opacity: selected === null || selected === i ? 1 : 0.4,
                  boxShadow: "0 20px 32px rgba(0,0,0,.22)",
                  rotate: `${i - 1}deg`,
                }}
              >
                <div style={{ fontSize: 28, color: C.red, fontWeight: 950 }}>
                  OPTION {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 46,
                    fontWeight: 950,
                    color: C.ink,
                    marginTop: 28,
                    lineHeight: 1.35,
                  }}
                >
                  {label}
                </div>
                {beat.mode === "no-simple-answer" ||
                beat.mode === "military-risk" ? (
                  <div
                    style={{
                      color: C.red,
                      fontSize: 44,
                      fontWeight: 950,
                      marginTop: 31,
                    }}
                  >
                    새로운 위험
                  </div>
                ) : null}
              </div>
            ),
          )}
        </>
      )}
      {!ballot && selected !== null && (
        <PaperHand x={170 + selected * 570 + 60} y={655} angle={-7} />
      )}
      <div
        style={{
          position: "absolute",
          left: 161,
          top: 844,
          color: C.cream,
          fontSize: 26,
          fontFamily: FONT,
        }}
      >
        검토된 방안의 도식 · 시행 장면 아님
      </div>
    </>
  );
};
