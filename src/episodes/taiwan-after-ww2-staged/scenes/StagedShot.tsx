import React from "react";
import { AbsoluteFill } from "remotion";
import { StreetScene } from "./StreetScenes";
import { DiplomacyScene } from "./DiplomacyScenes";
import { GeographyScene } from "./MapScene";
import { DocumentScene, RewindScene } from "./DocumentScenes";
import { DecisionScene, EndingScene } from "./DecisionScenes";
import { WarScene } from "./WarScenes";
import { FONT, INK, PAPER, Shot } from "../types";

export const StagedShot: React.FC<{ shot: Shot }> = ({ shot }) => {
  const street = [
    "colony",
    "collapse",
    "question",
    "field",
    "port",
    "crowd",
    "curfew",
    "rebuild",
  ].includes(shot.kind);
  const decision = ["comparison", "summary", "options"].includes(shot.kind);
  return (
    <AbsoluteFill
      style={{ overflow: "hidden", background: PAPER, fontFamily: FONT }}
    >
      {street ? (
        <StreetScene shot={shot} />
      ) : shot.kind === "map" ? (
        <GeographyScene shot={shot} />
      ) : shot.kind === "archive" ? (
        <DocumentScene shot={shot} />
      ) : shot.kind === "rewind" ? (
        <RewindScene shot={shot} />
      ) : decision ? (
        <DecisionScene shot={shot} />
      ) : shot.kind === "ending" ? (
        <EndingScene shot={shot} />
      ) : ["korea", "fleet"].includes(shot.kind) ? (
        <WarScene shot={shot} />
      ) : (
        <DiplomacyScene shot={shot} />
      )}
      <div
        style={{
          position: "absolute",
          top: 34,
          left: 42,
          maxWidth: 1690,
          color: INK,
          background: "rgba(238,229,209,.93)",
          borderLeft: `7px solid ${INK}`,
          padding: "8px 22px",
          fontSize: 32,
          fontWeight: 750,
          letterSpacing: -0.5,
        }}
      >
        {shot.locator}
      </div>
    </AbsoluteFill>
  );
};
