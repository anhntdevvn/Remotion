import React from "react";
import { Img, staticFile } from "remotion";

// Fixed above scene/caption layers; independent of cuts and preview-window timing.
// Keep the editable source and the exported logo outside Git-ignored out/.
export type ChannelWatermarkProps = {
  top?: number;
  right?: number;
  logoOpacity?: number;
  nameOpacity?: number;
};

export const ChannelWatermark: React.FC<ChannelWatermarkProps> = ({
  top = 112,
  right = 58,
  logoOpacity = 0.6,
  nameOpacity = 0.55,
}) => (
  <div
    data-testid="channel-watermark"
    style={{
      position: "absolute",
      top,
      right,
      width: 256,
      height: 84,
      display: "flex",
      alignItems: "center",
      gap: 8,
      zIndex: 100,
      pointerEvents: "none",
      color: "#F2E7CB",
      fontFamily: '"Noto Sans CJK KR", "Noto Sans KR", sans-serif',
      textShadow: "0 1px 3px #101C22, 0 0 2px #101C22",
    }}
  >
    <Img
      src={staticFile("channel-branding/logo/archive-logo.svg")}
      alt="기묘한 기록실 logo"
      style={{width: 84, height: 84, flexShrink: 0, objectFit: "contain", opacity: logoOpacity}}
    />
    <span style={{fontSize: 22, fontWeight: 800, whiteSpace: "nowrap", opacity: nameOpacity}}>
      기묘한 기록실
    </span>
  </div>
);
