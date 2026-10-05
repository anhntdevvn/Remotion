import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Beat, C, FONT, clamp } from "../types";
import { scenes } from "../LegacyV2";
import { InteractionScene } from "./InteractionScenes";
import { ChannelWatermark } from "../../../channel-branding/ChannelWatermark";
import { EnvironmentScene } from "./EnvironmentScenes";
import { ChoiceScene, ClosureScene, RecordScene } from "./RecordScenes";
import {
  DebateScene,
  EndingScene,
  FleetScene,
  StrategyScene,
} from "./StrategyScenes";

const Content: React.FC<{ beat: Beat }> = ({ beat }) => {
  switch (beat.grammar) {
    case "document":
    case "timeline":
    case "procedure":
      return <RecordScene beat={beat} />;
    case "formation":
    case "industry":
    case "street":
    case "rebuild":
      return <EnvironmentScene beat={beat} />;
    case "closure":
      return <ClosureScene beat={beat} />;
    case "choices":
    case "ballot":
      return <ChoiceScene beat={beat} />;
    case "map":
      return <StrategyScene beat={beat} />;
    case "fleet":
      return <FleetScene beat={beat} />;
    case "debate":
      return <DebateScene beat={beat} />;
    case "ending":
      return <EndingScene beat={beat} />;
    default:
      return <InteractionScene beat={beat} />;
  }
};

// The cuts follow narration. No floating actor layer or automatic zoom on every cut.
export const BeatScene: React.FC<{ beat: Beat; showWatermark?: boolean }> = ({
  beat,
  showWatermark = true,
}) => {
  const frame = useCurrentFrame();
  const chapter = scenes.find((s) => s.id === beat.sceneId);
  const hookHold = Math.min(beat.duration - 8, 110);
  const hookOpacity = interpolate(
    frame,
    [0, 8, Math.max(9, hookHold - 10), Math.max(10, hookHold)],
    [0, 1, 1, 0],
    clamp,
  );
  return (
    <AbsoluteFill
      style={{ background: C.ink, overflow: "hidden", fontFamily: FONT }}
    >
      <Content beat={beat} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 90px rgba(0,0,0,.17)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 25,
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 21px",
          background: "rgba(12,20,26,.92)",
          borderBottom: `3px solid ${C.gold}`,
          color: C.cream,
        }}
      >
        <span style={{ fontWeight: 900, fontSize: 25, letterSpacing: 2 }}>
          {beat.mode === "seventh"
            ? "1950년 6월 27일"
            : chapter?.kicker || "기록의 쟁점"}
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: C.gold }}>
          {beat.sceneId}
        </span>
      </div>
      {beat.hook && (
        <div
          style={{
            position: "absolute",
            top: 99,
            left: 72,
            maxWidth: 1450,
            padding: "12px 25px",
            fontSize: 47,
            fontWeight: 950,
            lineHeight: 1.2,
            color: C.cream,
            background: "rgba(13,22,29,.95)",
            borderLeft: `7px solid ${C.red}`,
            opacity: hookOpacity,
            translate: `${interpolate(frame, [0, 12], [-14, 0], clamp)}px 0`,
          }}
        >
          {beat.hook}
        </div>
      )}
      {showWatermark ? <ChannelWatermark /> : null}
    </AbsoluteFill>
  );
};
