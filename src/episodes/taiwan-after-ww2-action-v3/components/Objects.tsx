import React from "react";
import { C, FONT, clamp } from "../types";
import { interpolate, useCurrentFrame } from "remotion";

export const Label: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  width?: number;
}> = ({ children, x, y, width = 320 }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y,
      width,
      color: C.ink,
      background: C.paper,
      border: `4px solid ${C.ink}`,
      fontFamily: FONT,
      fontSize: 33,
      fontWeight: 900,
      textAlign: "center",
      padding: "9px 14px",
    }}
  >
    {children}
  </div>
);
export const Folder: React.FC<{
  x: number;
  y: number;
  text: string;
  width?: number;
  angle?: number;
}> = ({ x, y, text, width = 185, angle = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y - 45,
      width,
      height: 132,
      rotate: `${angle}deg`,
      filter: "drop-shadow(0 10px 8px rgba(0,0,0,.22))",
    }}
  >
    <svg viewBox="0 0 220 150" width="100%" height="100%">
      <path
        d="M8 24V8H99L113 24H212V142H8Z"
        fill={C.paper}
        stroke={C.ink}
        strokeWidth="7"
      />
      <path d="M8 48H212" stroke={C.gold} strokeWidth="5" />
      <text
        x="110"
        y="100"
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight="800"
        fontSize="29"
        fill={C.ink}
      >
        {text}
      </text>
    </svg>
  </div>
);
export const DeskPaper: React.FC<{
  x?: number;
  y?: number;
  sign?: boolean;
  startFrame?: number;
}> = ({ x = 900, y = 770, sign = false, startFrame = 18 }) => {
  const frame = useCurrentFrame();
  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <path
        d={`M${x - 115} ${y - 49}H${x + 110}L${x + 160} ${y - 6}H${x - 150}Z`}
        fill={C.cream}
        stroke={C.ink}
        strokeWidth="4"
      />
      <path
        d={`M${x - 83} ${y - 33}H${x + 70}`}
        stroke="#89816D"
        strokeWidth="3"
      />
      {sign && (
        <path
          d={`M${x - 90} ${y - 13}q12-16 24 0q10 10 15-9q8-8 10 8q10 9 20-6q8-11 22 1q10-8 27 0`}
          fill="none"
          stroke={C.ink}
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={interpolate(
            frame,
            [startFrame, startFrame + 49],
            [100, 0],
            clamp,
          )}
        />
      )}
    </svg>
  );
};
export const Flag: React.FC<{
  type: "japan" | "roc" | "prc" | "us";
  x: number;
  y: number;
  w?: number;
}> = ({ type, x, y, w = 178 }) => (
  <svg
    viewBox="0 0 180 110"
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: (w * 110) / 180,
      filter: "drop-shadow(0 8px 6px rgba(0,0,0,.2))",
    }}
  >
    <rect
      x="3"
      y="3"
      width="174"
      height="104"
      fill={type === "japan" ? C.cream : type === "us" ? "#EAE1CC" : C.red}
      stroke={C.ink}
      strokeWidth="6"
    />
    {type === "japan" ? (
      <circle cx="90" cy="55" r="28" fill={C.red} />
    ) : type === "roc" ? (
      <>
        <path d="M6 6H82V61H6Z" fill={C.blue} />
        <circle cx="42" cy="32" r="16" fill={C.cream} />
      </>
    ) : type === "prc" ? (
      <path
        d="M32 16L39 33L58 34L43 47L48 64L31 54L16 64L20 46L7 34L26 33Z"
        fill={C.gold}
      />
    ) : (
      <>
        <path
          d="M6 14H174M6 34H174M6 55H174M6 75H174M6 96H174"
          stroke={C.red}
          strokeWidth="10"
        />
        <path d="M6 6H76V61H6Z" fill={C.blue} />
      </>
    )}
  </svg>
);
export const PaperHand: React.FC<{ x: number; y: number; angle?: number }> = ({
  x,
  y,
  angle = -15,
}) => (
  <svg
    viewBox="0 0 300 240"
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 300,
      height: 240,
      rotate: `${angle}deg`,
      filter: "drop-shadow(0 8px 8px rgba(0,0,0,.18))",
    }}
  >
    <path
      d="M22 238L69 149L133 151L104 238Z"
      fill="#303D44"
      stroke={C.ink}
      strokeWidth="8"
    />
    <path
      d="M73 160L90 111Q98 94 111 115L103 142L162 139Q189 139 188 158Q179 187 130 188L97 191Z"
      fill="#D6A27E"
      stroke={C.ink}
      strokeWidth="7"
    />
    <path
      d="M114 112L176 81Q190 77 195 90Q196 98 181 105L135 133"
      fill="#D6A27E"
      stroke={C.ink}
      strokeWidth="7"
    />
  </svg>
);
