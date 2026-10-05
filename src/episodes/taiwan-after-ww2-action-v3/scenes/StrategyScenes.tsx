import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import coastlines from "../data/coastlines.json";
import { Beat, C, FONT, clamp } from "../types";
import { Actor } from "../components/Actor";
import { Chair, Desk, Space } from "../components/Space";
import { Folder, PaperHand } from "../components/Objects";

const xy = (lon: number, lat: number): [number, number] => [
  (lon - 102) * 35,
  (48 - lat) * 27,
];
const Route: React.FC<{
  from: [number, number];
  to: [number, number];
  p: number;
  color?: string;
}> = ({ from, to, p, color = C.gold }) => {
  const dx = to[0] - from[0],
    dy = to[1] - from[1];
  return (
    <g>
      <path
        d={`M${from[0]} ${from[1]}L${from[0] + dx * p} ${from[1] + dy * p}`}
        fill="none"
        stroke={color}
        strokeWidth="8"
      />
      <g
        transform={`translate(${from[0] + dx * p} ${from[1] + dy * p}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`}
        opacity={p}
      >
        <path d="M0 0L-25-14L-25 14Z" fill={color} />
      </g>
    </g>
  );
};
const Dot: React.FC<{
  lon: number;
  lat: number;
  text: string;
  dx?: number;
  dy?: number;
}> = ({ lon, lat, text, dx = 25, dy = -12 }) => {
  const [x, y] = xy(lon, lat);
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="10"
        fill={C.red}
        stroke={C.gold}
        strokeWidth="3"
      />
      <text
        x={x + dx}
        y={y + dy}
        fill={C.cream}
        stroke={C.ink}
        strokeWidth="6"
        paintOrder="stroke"
        fontSize="32"
        fontFamily={FONT}
        fontWeight="900"
      >
        {text}
      </text>
    </g>
  );
};
export const StrategyScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [12, 85], [0, 1], clamp);
  const focus = ["cession", "formosa", "admin", "freeze"].includes(beat.mode);
  const korea = beat.mode === "korea-turn";
  const taiwan = xy(121, 23.7);
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(115deg,#17252C,#263A41)",
        }}
      />
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id="v3-geography">
            <rect x="55" y="194" width="1810" height="721" />
          </clipPath>
        </defs>
        <g clipPath="url(#v3-geography)">
          <g
            transform={
              focus
                ? "translate(-190 -473) scale(1.6)"
                : korea
                  ? "translate(-610 -40) scale(1.65)"
                  : "translate(223 73)"
            }
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <path
                key={i}
                d={`M${i * 180} 0V1100M0 ${i * 130}H1800`}
                stroke="#435450"
                strokeWidth="1"
              />
            ))}
            {coastlines.map(({ code, path }) => (
              <path
                key={code}
                d={path}
                fill={code === "TWN" ? C.red : "#666E57"}
                stroke="#C4B592"
                strokeWidth="2"
              />
            ))}
            <Dot
              lon={121}
              lat={23.7}
              text={beat.mode === "formosa" ? "대만 / FORMOSA" : "대만"}
              dx={-123}
            />
            {!focus && (
              <>
                <Dot
                  lon={112}
                  lat={33.2}
                  text={
                    beat.mode === "retreat" ? "중화인민공화국" : "중국 대륙"
                  }
                  dx={-115}
                />
                <Dot lon={135} lat={35.5} text="일본" />
                <Dot lon={127.4} lat={37.5} text="한반도" dx={-54} dy={-42} />
                <Dot lon={121.5} lat={14} text="필리핀" />
              </>
            )}
            {beat.mode === "strategy" && (
              <g>
                <circle
                  cx={taiwan[0]}
                  cy={taiwan[1]}
                  r={72 + p * 23}
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="6"
                />
                <text
                  x={taiwan[0] + 123}
                  y={taiwan[1] + 24}
                  fill={C.gold}
                  fontSize="34"
                  fontFamily={FONT}
                  fontWeight="900"
                >
                  전략적 위치
                </text>
              </g>
            )}
            {korea && (
              <Route
                from={xy(127.3, 39.2)}
                to={xy(127.3, 36.4)}
                p={p}
                color={C.red}
              />
            )}
            {beat.mode === "cession" && (
              <>
                <Dot lon={119.6} lat={23.5} text="펑후" dx={-126} dy={56} />
                <text
                  x={taiwan[0] + 69}
                  y={taiwan[1] + 28}
                  fill={C.gold}
                  fontSize="37"
                  fontFamily={FONT}
                  fontWeight="950"
                >
                  일본에 할양
                </text>
                <path
                  d={`M${taiwan[0] - 16} ${taiwan[1] + 34}Q${taiwan[0] + 42} ${taiwan[1] + 93} ${taiwan[0] + 94} ${taiwan[1] + 14}`}
                  stroke={C.gold}
                  strokeWidth="5"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - p * 100}
                />
              </>
            )}
            {beat.mode === "retreat" && (
              <Route from={xy(118, 31.3)} to={taiwan} p={p} color="#B9C6BF" />
            )}
            {beat.mode === "defense" && (
              <path
                d={`M${xy(127.4, 37.5).join(" ")}L${xy(135, 35.5).join(" ")}L${taiwan.join(" ")}L${xy(121.5, 14).join(" ")}`}
                fill="none"
                stroke={C.gold}
                strokeWidth="9"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - p * 100}
              />
            )}
            {beat.mode === "freeze" && (
              <>
                <Route
                  from={xy(116.3, 26)}
                  to={xy(119.8, 24.8)}
                  p={Math.min(0.79, p)}
                />
                <Route
                  from={taiwan}
                  to={xy(119.9, 24.8)}
                  p={Math.min(0.79, p)}
                  color="#A5C0C2"
                />
                <path
                  d={`M${taiwan[0] - 70} ${taiwan[1] - 80}L${taiwan[0] - 26} ${taiwan[1] + 90}`}
                  stroke="#A8C5C7"
                  strokeWidth="14"
                />
              </>
            )}
            {beat.mode === "risk" && (
              <text
                x={taiwan[0] + 42}
                y={taiwan[1]}
                fill={C.gold}
                fontSize="105"
                fontWeight="950"
              >
                ?
              </text>
            )}
          </g>
        </g>
        <path d="M55 915H1865" stroke={C.gold} strokeWidth="4" />
        <text
          x="1810"
          y="883"
          textAnchor="end"
          fill="#B2B59C"
          fontSize="23"
          fontFamily={FONT}
        >
          지리 설명도 · 역사적 국경선 아님
        </text>
      </svg>
      {beat.mode === "admin" && (
        <div
          style={{
            position: "absolute",
            left: 1230,
            top: 500,
            color: C.cream,
            fontFamily: FONT,
            fontSize: 44,
            fontWeight: 900,
          }}
        >
          행정 인수
          <br />
          <span style={{ fontSize: 29, color: C.gold }}>
            최종 조약보다 먼저
          </span>
        </div>
      )}
      {beat.mode === "formosa" && (
        <div
          style={{
            position: "absolute",
            left: 1230,
            top: 385,
            color: C.gold,
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 950,
          }}
        >
          포모사
          <br />
          <span style={{ color: C.cream, fontSize: 29 }}>당시 대만의 이름</span>
        </div>
      )}
      {beat.mode === "freeze" && (
        <div
          style={{
            position: "absolute",
            left: 1270,
            top: 403,
            color: C.cream,
            fontFamily: FONT,
            fontSize: 42,
            fontWeight: 950,
          }}
        >
          양측의 공격을 억제
        </div>
      )}
    </>
  );
};

const Ship: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    stroke={C.ink}
    strokeWidth="7"
  >
    <path d="M-325 57H335L269 170H-234Z" fill="#586B73" />
    <path d="M-134 55V-28H117V55" fill="#89998F" />
    <rect x="-58" y="-98" width="110" height="70" fill="#9AA496" />
    <path d="M-19-99V-186M-94-157H46" strokeWidth="10" />
    <path d="M137 18L225-16" strokeWidth="14" />
    <path d="M-305 117H301" stroke={C.gold} strokeWidth="5" />
    <text
      x="-157"
      y="137"
      fill={C.cream}
      stroke="none"
      fontFamily={FONT}
      fontSize="31"
    >
      7TH FLEET
    </text>
  </g>
);
export const FleetScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const travel = interpolate(frame, [8, 106], [-210, 0], clamp);
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(#A89E80,#52666B 65%,#172A34)",
        }}
      />
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M0 559L366 442L716 546V829H0M1410 544L1668 405L1920 522V829H1410Z"
          fill="#465344"
          stroke={C.ink}
          strokeWidth="6"
        />
        <rect y="631" width="1920" height="449" fill="#2B454F" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${i * 320 - 110} ${782 + (i % 2) * 115}q70-18 144 0t144 0`}
            fill="none"
            stroke="#657D7C"
            strokeWidth="5"
          />
        ))}
        <Ship x={1220 + travel} y={563} scale={0.59} />
        <Ship x={803 + travel} y={744} scale={1.23} />
        <text
          x="118"
          y="596"
          fill={C.cream}
          fontSize="43"
          fontFamily={FONT}
          fontWeight="900"
        >
          중국 대륙
        </text>
        <text
          x="1525"
          y="590"
          fill={C.cream}
          fontSize="43"
          fontFamily={FONT}
          fontWeight="900"
        >
          대만
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          right: 76,
          top: 323,
          color: C.cream,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 900,
        }}
      >
        {beat.mode === "seventh"
          ? "1950.06.27 · 제7함대"
          : "동아시아 확전 억제"}
      </div>
    </>
  );
};
export const DebateScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const representation =
    beat.mode === "representation" || beat.mode === "new-question";
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(125deg,#142028,#303C3F)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 225,
          top: 287,
          width: 1450,
          height: 566,
          background: C.paper,
          border: `10px solid ${C.ink}`,
          padding: "41px 58px",
          boxShadow: "0 26px 39px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            fontSize: 27,
            color: C.red,
            fontWeight: 950,
            letterSpacing: 3,
          }}
        >
          다음 쟁점
        </div>
        <div
          style={{
            fontSize: 63,
            color: C.ink,
            fontWeight: 950,
            margin: "29px 0 34px",
          }}
        >
          {representation
            ? "누가 중국을 대표하는가?"
            : beat.mode === "stability"
              ? "정말 안정적인 해결책인가?"
              : beat.mode === "interpretations"
                ? "그 뒤에 남은 법적·정치적 논쟁"
                : "대만의 미래는 누가 결정하는가?"}
        </div>

        {!representation && (
          <div
            style={{
              color: C.red,
              fontSize: 43,
              fontWeight: 950,
              marginTop: 23,
              opacity: interpolate(frame, [18, 42], [0, 1], clamp),
            }}
          >
            {beat.mode === "interpretations"
              ? "서로 다른 해석이 이어졌다"
              : "일본의 소유 여부를 넘어선 질문"}
          </div>
        )}
      </div>
      <Folder
        x={representation ? 643 : 1060}
        y={650}
        text={representation ? "중화민국" : "대만의 장래"}
        width={300}
      />
      {representation && (
        <Folder x={1159} y={650} text="중화인민공화국" width={335} />
      )}
      <PaperHand
        x={
          (representation ? 273 : 620) +
          interpolate(frame, [9, 59], [0, 197], clamp)
        }
        y={655}
        angle={-11}
      />
    </>
  );
};
export const EndingScene: React.FC<{ beat: Beat }> = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Space setting="office" />
      <Chair x={475} />
      <Actor
        cast="observer"
        x={475}
        y={112}
        height={900}
        seated
        pose="read"
        prop="folder"
        expression="concerned"
        gaze={1}
      />
      <Desk x={155} y={842} width={716} />
      <Actor
        cast="observer"
        x={475}
        y={112}
        height={900}
        seated
        handsOnly
        pose="read"
        prop="folder"
        expression="concerned"
      />
      <div
        style={{
          position: "absolute",
          left: 963,
          top: 345,
          width: 700,
          height: 481,
          padding: "43px 51px",
          border: `8px solid ${C.ink}`,
          background: "#24343A",
          color: C.cream,
          boxShadow: "0 27px 39px rgba(0,0,0,.3)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: C.gold,
            letterSpacing: 4,
            fontWeight: 850,
          }}
        >
          TAIWAN · 1895–1951
        </div>
        <div
          style={{
            fontSize: 55,
            lineHeight: 1.35,
            fontWeight: 950,
            marginTop: 34,
          }}
        >
          남아 있는
          <br />
          법적·정치적 논쟁
        </div>
        <div
          style={{
            height: 6,
            background: C.red,
            marginTop: 29,
            width: interpolate(frame, [16, 68], [0, 548], clamp),
          }}
        />
        <div style={{ fontSize: 27, color: C.gold, marginTop: 22 }}>
          누가 미래를 결정하는가?
        </div>
      </div>
      <Folder x={805} y={819} text="아직 열린 기록" width={257} />
    </>
  );
};
