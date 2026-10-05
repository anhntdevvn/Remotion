import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { DocumentFace } from "../components/Props";
import { World } from "../components/World";
import { clamp, FONT, INK, PAPER, RED, Shot } from "../types";

const DOCUMENTS: Record<
  string,
  { title: string; lines: string[]; mark?: string; missing?: boolean }
> = {
  cairo: {
    title: "카이로 공동성명 · 1943",
    lines: ["만주 · 포모사 · 펑후", "중화민국에 돌려준다는 방향"],
    mark: "전후 처리 방향",
  },
  potsdam: {
    title: "포츠담 선언 · 1945",
    lines: ["카이로 선언의 조건을 이행한다", "일본이 받아들인 항복 조건"],
    mark: "재확인",
  },
  article: {
    title: "평화조약 · 제2조 (b)",
    lines: ["포모사와 펑후 제도", "일본의 모든 권리 · 권원 · 청구권"],
    mark: "포기",
  },
  renounce: {
    title: "평화조약 · 제2조 (b)",
    lines: [
      "일본은 포모사와 펑후 제도에 대한",
      "모든 권리 · 권원 · 청구권을 포기한다.",
    ],
    mark: "권리 포기",
  },
  missing: {
    title: "평화조약 · 제2조 (b)",
    lines: ["일본의 권리 포기는 명시했다.", "최종 귀속은 명시하지 않았다."],
    missing: true,
  },
  pending: {
    title: "전후 법률 문서",
    lines: [
      "행정 인수는 이미 시작됐다.",
      "최종 평화조약은 아직 완성되지 않았다.",
    ],
    mark: "미완",
  },
  close: {
    title: "평화조약의 한 문장",
    lines: ["일본은 대만에 대한 권리를 포기했다.", "그런데…"],
    missing: true,
  },
  three: {
    title: "연합국이 정한 전후 처리",
    lines: [
      "1943 · 카이로 공동성명",
      "1945 · 포츠담 선언",
      "1945 · 일본 항복문서",
    ],
    mark: "항복 조건 수락",
  },
};
export const DocumentScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const info = DOCUMENTS[shot.mode] || DOCUMENTS.article;
  return (
    <>
      <World kind="archive" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28,39,29,.28)",
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
          d="M180 178L1780 192L1855 937H84Z"
          fill="#94795b"
          stroke={INK}
          strokeWidth="10"
        />
        <path d="M205 911H1750" stroke="#b49b74" strokeWidth="6" />
        <path d="M1533 342L1593 723" stroke={INK} strokeWidth="18" />
        <path d="M1593 723L1590 745L1600 725Z" fill="#dbb96d" />
        <rect
          x="200"
          y="427"
          width="190"
          height="250"
          rx="5"
          fill="#b5a476"
          stroke={INK}
          strokeWidth="7"
        />
        <path
          d="M230 474H357M230 509H337M230 544H357"
          stroke="#777351"
          strokeWidth="5"
        />
      </svg>
      <div
        style={{ position: "absolute", left: 420, top: 146, rotate: "-2deg" }}
      >
        <DocumentFace {...info} />
      </div>
      {shot.mode === "renounce" && (
        <div
          style={{
            position: "absolute",
            left: 610,
            top: 565,
            width: interpolate(frame, [24, 75], [0, 840], clamp),
            height: 61,
            background: "rgba(191,76,57,.15)",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};

export const RewindScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <World kind="archive" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(43,46,34,.23)",
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
          d="M310 210H1610V827H310Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth="10"
        />
        <path d="M472 523H1460" stroke="#827959" strokeWidth="12" />
        {[500, 960, 1420].map((x, i) => (
          <g
            key={x}
            opacity={interpolate(frame, [i * 25, i * 25 + 10], [0, 1], clamp)}
          >
            <circle cx={x} cy="523" r="22" fill={RED} />
            <text
              x={x}
              y="446"
              textAnchor="middle"
              fill={INK}
              fontSize="72"
              fontWeight="900"
              fontFamily={FONT}
            >
              {["1895", "1945", "1951"][i]}
            </text>
            <text
              x={x}
              y="614"
              textAnchor="middle"
              fill={INK}
              fontSize="41"
              fontWeight="700"
              fontFamily={FONT}
            >
              {["할양", "항복", "권리 포기"][i]}
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 510,
          top: 710,
          color: INK,
          fontSize: 40,
          fontFamily: FONT,
        }}
      >
        전쟁과 외교의 순서를 따라가 보자
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 275,
          rotate: "-11deg",
          fontSize: 34,
          fontFamily: FONT,
          color: INK,
          background: "#cbb782",
          border: `4px solid ${INK}`,
          padding: 20,
        }}
      >
        {shot.label}
      </div>
    </>
  );
};
