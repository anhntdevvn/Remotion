import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import coastlines from "../data/coastlines.json";
import { clamp, FONT, INK, PAPER, RED, Shot } from "../types";

const pos = (lon: number, lat: number): [number, number] => [
  (lon - 102) * 35,
  (48 - lat) * 27,
];
const Arrow: React.FC<{
  from: [number, number];
  to: [number, number];
  color?: string;
  progress?: number;
}> = ({ from, to, color = RED, progress = 1 }) => {
  const dx = to[0] - from[0],
    dy = to[1] - from[1];
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g>
      <path
        d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`}
        stroke={color}
        strokeWidth="8"
        strokeDasharray="12 8"
        pathLength="100"
        strokeDashoffset={100 - progress * 100}
        opacity={progress}
      />
      <g
        transform={`translate(${from[0] + dx * progress} ${from[1] + dy * progress}) rotate(${angle})`}
        opacity={progress}
      >
        <path d="M0 0L-27-14L-27 14Z" fill={color} />
      </g>
    </g>
  );
};
const Marker: React.FC<{
  lon: number;
  lat: number;
  text: string;
  dx?: number;
  dy?: number;
  highlight?: boolean;
}> = ({ lon, lat, text, dx = 24, dy = -10, highlight = false }) => {
  const [x, y] = pos(lon, lat);
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={highlight ? 12 : 7}
        fill={highlight ? RED : INK}
        stroke={PAPER}
        strokeWidth="3"
      />
      <text
        x={x + dx}
        y={y + dy}
        fill={INK}
        stroke={PAPER}
        strokeWidth="7"
        paintOrder="stroke"
        fontSize="35"
        fontFamily={FONT}
        fontWeight="800"
      >
        {text}
      </text>
    </g>
  );
};

export const GeographyScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [12, 76], [0, 1], clamp);
  const taiwan = pos(121, 23.7);
  const korea = pos(127.4, 37.5);
  const china = pos(112, 33.2);
  const japan = pos(135, 35.5);
  const koreaMode = shot.mode === "korea";
  const retreat = shot.mode === "retreat";
  const defense = shot.mode === "defense";
  const focus =
    shot.mode === "taiwan" ||
    shot.mode === "administration" ||
    shot.mode === "freeze";
  return (
    <div style={{ position: "absolute", inset: 0, background: "#9eb9b9" }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <clipPath id="stage-map">
            <rect x="80" y="92" width="1760" height="832" rx="5" />
          </clipPath>
        </defs>
        <g clipPath="url(#stage-map)">
          <rect x="80" y="92" width="1760" height="832" fill="#a9c4c3" />
          <g
            transform={
              focus ? "translate(-200 -575) scale(1.65)" : "translate(200 80)"
            }
          >
            {Array.from({ length: 10 }, (_, i) => (
              <path
                key={i}
                d={`M${i * 180} 0V1080M0 ${i * 120}H1700`}
                stroke="#92b0ae"
                strokeWidth="1"
              />
            ))}
            {coastlines.map(({ code, path }) => (
              <path
                key={code}
                d={path}
                fill={
                  code === "TWN"
                    ? shot.mode === "administration"
                      ? "#9c7050"
                      : "#c99069"
                    : "#c9c8a5"
                }
                stroke={INK}
                strokeWidth="2"
              />
            ))}
            <Marker
              lon={112}
              lat={33.2}
              text={retreat ? "중화인민공화국" : "중국 대륙"}
              dx={-118}
            />
            <Marker lon={135} lat={35.5} text="일본" dx={20} />
            <Marker
              lon={127.4}
              lat={37.5}
              text={koreaMode ? "한반도" : "한국"}
              dx={-80}
              dy={-32}
              highlight={koreaMode}
            />
            <Marker
              lon={121}
              lat={23.7}
              text="대만"
              dx={-92}
              dy={3}
              highlight
            />
            {!focus && <Marker lon={121.5} lat={14} text="필리핀" dx={25} />}
            {shot.mode === "cession" && (
              <>
                <Arrow from={taiwan} to={pos(133, 31)} progress={p} />
                <text
                  x={taiwan[0] + 38}
                  y={taiwan[1] + 5}
                  fill={RED}
                  fontFamily={FONT}
                  fontSize="30"
                  fontWeight="800"
                >
                  일본에 할양
                </text>
                <circle
                  cx={taiwan[0] - 25}
                  cy={taiwan[1] + 2}
                  r="4"
                  fill={RED}
                />
                <text
                  x={taiwan[0] - 129}
                  y={taiwan[1] + 58}
                  fill={INK}
                  fontFamily={FONT}
                  fontSize="25"
                >
                  펑후 제도
                </text>
              </>
            )}
            {shot.mode === "war1895" && (
              <>
                <Arrow from={china} to={korea} progress={p} />
                <Arrow from={japan} to={korea} progress={p} />
              </>
            )}
            {retreat && (
              <>
                <Arrow
                  from={pos(118, 31.3)}
                  to={taiwan}
                  color="#415e87"
                  progress={p}
                />
                <text
                  x={taiwan[0] + 32}
                  y={taiwan[1] + 61}
                  fill="#415e87"
                  fontSize="32"
                  fontWeight="800"
                  fontFamily={FONT}
                >
                  중화민국 정부 이동
                </text>
              </>
            )}
            {koreaMode && (
              <>
                <path
                  d={`M${pos(124.5, 38)[0]} ${pos(124.5, 38)[1]}H${pos(130, 38)[0]}`}
                  stroke="#674c47"
                  strokeWidth="4"
                  strokeDasharray="7 5"
                />
                <Arrow from={pos(127, 40)} to={pos(127.4, 36)} progress={p} />
                <text
                  x={pos(128, 40)[0]}
                  y={pos(128, 40)[1]}
                  fill={RED}
                  fontSize="30"
                  fontFamily={FONT}
                >
                  북한군
                </text>
              </>
            )}
            {(shot.mode === "freeze" || shot.mode === "contain") && (
              <>
                <path
                  d={`M${taiwan[0] - 50} ${taiwan[1] - 84}L${taiwan[0] - 22} ${taiwan[1] + 72}`}
                  stroke="#2e6381"
                  strokeWidth="10"
                />
                <Arrow
                  from={pos(117.5, 25.5)}
                  to={pos(119.1, 24.7)}
                  progress={p}
                />
                <Arrow
                  from={pos(120.4, 24.1)}
                  to={pos(119.4, 24.4)}
                  color="#415e87"
                  progress={p}
                />
                <text
                  x={taiwan[0] + 30}
                  y={taiwan[1] - 35}
                  fill="#2e6381"
                  fontSize="27"
                  fontFamily={FONT}
                >
                  제7함대 · 확전 억제
                </text>
              </>
            )}
            {defense && (
              <path
                d={`M${korea[0]} ${korea[1]}L${japan[0]} ${japan[1]}L${taiwan[0]} ${taiwan[1]}L${pos(121.5, 14)[0]} ${pos(121.5, 14)[1]}`}
                fill="none"
                stroke="#375f84"
                strokeWidth="9"
                strokeDasharray="18 10"
                opacity={p}
              />
            )}
            {shot.mode === "risk" && (
              <text
                x={taiwan[0] + 40}
                y={taiwan[1]}
                fill={RED}
                fontSize="80"
                fontWeight="900"
              >
                ?
              </text>
            )}
          </g>
        </g>
        <rect
          x="80"
          y="92"
          width="1760"
          height="832"
          fill="none"
          stroke={INK}
          strokeWidth="6"
        />
        <text
          x="1755"
          y="889"
          textAnchor="end"
          fontSize="22"
          fill="#45635d"
          fontFamily={FONT}
        >
          지리 설명도 · 역사적 국경선 아님
        </text>
      </svg>
      {shot.mode === "taiwan" && (
        <div
          style={{
            position: "absolute",
            left: 1230,
            top: 487,
            fontSize: 65,
            fontWeight: 800,
            color: INK,
            fontFamily: FONT,
          }}
        >
          FORMOSA
          <br />
          <span style={{ fontSize: 34 }}>당시 대만의 이름</span>
        </div>
      )}
      {shot.mode === "administration" && (
        <div
          style={{
            position: "absolute",
            left: 1150,
            top: 300,
            fontFamily: FONT,
            color: INK,
            background: PAPER,
            padding: "24px 30px",
            fontSize: 36,
            border: `4px solid ${INK}`,
          }}
        >
          행정 인수
          <br />
          <span style={{ fontSize: 28 }}>최종 조약과는 다른 절차</span>
        </div>
      )}
    </div>
  );
};
