import React from "react";
import { FONT, INK, PAPER, RED } from "../types";

export const Board: React.FC<{
  text: string;
  sub?: string;
  x?: number;
  y?: number;
  width?: number;
}> = ({ text, sub, x = 960, y = 190, width = 650 }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y,
      width,
      height: 350,
    }}
  >
    <svg
      viewBox="0 0 650 500"
      style={{
        width: "100%",
        height: (500 * width) / 650,
        position: "absolute",
        top: 0,
      }}
    >
      <path
        d="M100 490L290 25H365L550 490M285 365H405"
        stroke={INK}
        strokeWidth="20"
      />
      <path
        d="M100 490L290 25H365L550 490M285 365H405"
        stroke="#9b8159"
        strokeWidth="10"
      />
      <rect
        x="5"
        y="65"
        width="640"
        height="330"
        rx="4"
        fill={PAPER}
        stroke={INK}
        strokeWidth="10"
      />
    </svg>
    <div
      style={{
        position: "absolute",
        top: width * 0.14,
        left: width * 0.04,
        right: width * 0.04,
        height: width * 0.42,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: INK,
        fontFamily: FONT,
        fontSize: width * 0.061,
        fontWeight: 700,
        lineHeight: 1.4,
        padding: 20,
      }}
    >
      {text}
      {sub && (
        <div style={{ fontSize: width * 0.045, color: RED, marginTop: 16 }}>
          {sub}
        </div>
      )}
    </div>
  </div>
);

export const FolderObject: React.FC<{
  x: number;
  y: number;
  angle?: number;
  width?: number;
  text?: string;
}> = ({ x, y, angle = 0, width = 155, text = "행정 서류" }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y - 45,
      width,
      height: 115,
      rotate: `${angle}deg`,
    }}
  >
    <svg viewBox="0 0 180 120" width="100%" height="100%">
      <path
        d="M7 22V5H80L100 22H173V114H7Z"
        fill="#c3a36c"
        stroke={INK}
        strokeWidth="6"
      />
      <path d="M7 39H173" stroke="#e4d0a2" strokeWidth="5" />
      <text
        x="90"
        y="79"
        textAnchor="middle"
        fill={INK}
        fontSize="22"
        fontFamily={FONT}
        fontWeight="700"
      >
        {text}
      </text>
    </svg>
  </div>
);

export const DocumentFace: React.FC<{
  title: string;
  lines: string[];
  mark?: string;
  missing?: boolean;
}> = ({ title, lines, mark, missing = false }) => (
  <div
    style={{
      width: 1080,
      minHeight: 655,
      background: PAPER,
      border: `5px solid ${INK}`,
      padding: "52px 75px",
      boxShadow: "12px 18px 0 rgba(29,42,34,.13)",
      color: INK,
      fontFamily: FONT,
    }}
  >
    <div style={{ fontSize: 24, letterSpacing: 3, color: "#776d56" }}>
      기묘한 기록실 · 문서 요약
    </div>
    <div
      style={{
        fontSize: 55,
        fontWeight: 800,
        margin: "23px 0 32px",
        borderBottom: `3px solid #998d71`,
        paddingBottom: 24,
      }}
    >
      {title}
    </div>
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
          fontSize: 40,
          lineHeight: 1.7,
          fontWeight: i === 0 ? 700 : 500,
        }}
      >
        {line}
      </div>
    ))}
    {missing && (
      <div
        style={{
          marginTop: 35,
          borderBottom: `5px dashed ${RED}`,
          padding: "15px 0",
          fontSize: 37,
          color: RED,
        }}
      >
        받는 나라: 명시하지 않음
      </div>
    )}
    {mark && (
      <div
        style={{
          border: `6px solid ${RED}`,
          color: RED,
          fontWeight: 800,
          fontSize: 48,
          padding: "8px 28px",
          rotate: "-7deg",
          display: "inline-block",
          marginTop: 28,
        }}
      >
        {mark}
      </div>
    )}
    <div style={{ fontSize: 22, color: "#776d56", marginTop: 28 }}>
      설명을 위한 재구성 · 원문 이미지 아님
    </div>
  </div>
);
