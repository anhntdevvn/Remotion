import React from "react";
import { useCurrentFrame } from "remotion";
import type { Caption } from "@remotion/captions";
import source from "../data/captions.json";
import { FONT } from "../types";

const captions: Caption[] = source;
export const KoreanCaptions: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame() + startFrame;
  const caption = captions.find(
    (c) => c.startMs <= (frame / 30) * 1000 && c.endMs > (frame / 30) * 1000,
  );
  if (!caption) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 172,
        right: 172,
        bottom: 27,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1576,
          padding: "11px 24px",
          background: "rgba(24,32,31,.88)",
          color: "#f8f3e6",
          fontFamily: FONT,
          fontSize: 39,
          fontWeight: 850,
          lineHeight: 1.4,
          textAlign: "center",
          wordBreak: "keep-all",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          borderRadius: 4,
          borderTop: "5px solid #D5AD55",
        }}
      >
        {caption.text}
      </div>
    </div>
  );
};
