import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor } from "../components/Actor";
import { World } from "../components/World";
import { clamp, FONT, INK, Shot } from "../types";

const Ship: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    stroke={INK}
    strokeWidth="6"
  >
    <path d="M-350 55H350L263 172H-220Z" fill="#687981" />
    <path d="M-153 55V-24H114V55" fill="#9da7a4" />
    <rect x="-47" y="-101" width="85" height="78" fill="#98a5a5" />
    <path d="M-26-100V-185M-97-154H50" fill="none" strokeWidth="10" />
    <rect x="91" y="-21" width="73" height="62" fill="#7b8a89" />
    <path d="M132-24L224-58" strokeWidth="12" />
    <path d="M-198 44L-244-2" strokeWidth="12" />
    <path d="M-313 114H306" stroke="#c1c8bd" strokeWidth="6" />
    <text
      x="-164"
      y="132"
      fill="#e3e7da"
      stroke="none"
      fontSize="35"
      fontFamily={FONT}
    >
      7TH FLEET
    </text>
  </g>
);

export const WarScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  if (shot.kind === "korea")
    return (
      <>
        <World kind="field" />
        {/* Generic olive uniforms: deliberately no Chinese government insignia. */}
        {[0, 1, 2, 3].map((i) => (
          <Actor
            key={i}
            cast="rocTroop"
            hat="none"
            x={-70 + i * 360}
            y={177 + (i % 2) * 33}
            height={770 - (i % 2) * 65}
            pose="rifle-ready"
            prop="rifle"
            travel={230}
            travelEnd={83}
            expression="stern"
            motionOffset={i}
          />
        ))}
        <Actor
          cast="civilian"
          x={1525}
          y={222}
          height={706}
          pose="march"
          travel={350}
          travelStart={18}
          travelEnd={94}
          expression="concerned"
        />
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 173,
            color: INK,
            fontSize: 29,
            fontFamily: FONT,
          }}
        >
          침공을 설명하는 상징적 장면
        </div>
      </>
    );
  const dx = interpolate(frame, [0, 105], [-195, 30], clamp);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "#a5c1c3" }} />
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M0 485L303 423L438 457L680 283L1004 486V690H0Z"
          fill="#809677"
          stroke={INK}
          strokeWidth="5"
        />
        <path
          d="M1234 451L1546 325L1920 424V704H1240Z"
          fill="#829275"
          stroke={INK}
          strokeWidth="5"
        />
        <rect y="611" width="1920" height="469" fill="#638e9e" />
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M${i * 226 - 60} ${729 + (i % 3) * 102}q70-24 140 0t140 0`}
            fill="none"
            stroke="#9fbabb"
            strokeWidth="6"
          />
        ))}
        <Ship x={1270 + dx} y={591} scale={0.57} />
        <Ship x={677 + dx} y={713} scale={1.22} />
        <text
          x="248"
          y="491"
          fill={INK}
          fontSize="49"
          fontFamily={FONT}
          fontWeight="800"
        >
          중국 대륙
        </text>
        <text
          x="1478"
          y="526"
          fill={INK}
          fontSize="49"
          fontFamily={FONT}
          fontWeight="800"
        >
          대만
        </text>
        <text x="1448" y="885" fill="#c9dbd9" fontSize="25" fontFamily={FONT}>
          대만해협 · 개념적 재구성
        </text>
      </svg>
    </>
  );
};
