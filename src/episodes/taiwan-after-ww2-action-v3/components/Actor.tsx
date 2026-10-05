import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { StagePuppet, StagePuppetProps } from "./StagePuppet";
import { clamp, FONT, INK, PAPER } from "../types";

export type Cast =
  | "japan"
  | "japanTroop"
  | "qing"
  | "roc"
  | "rocTroop"
  | "prc"
  | "us"
  | "roosevelt"
  | "churchill"
  | "chiang"
  | "truman"
  | "civilian"
  | "clerk"
  | "worker"
  | "observer";
const CAST: Record<Cast, StagePuppetProps> = {
  japan: {
    outfit: "japanese-officer",
    hat: "officer-khaki",
    moustache: true,
    expression: "stern",
  },
  japanTroop: { outfit: "japanese-soldier", hat: "field-khaki", hair: "crop" },
  qing: {
    outfit: "qing-official",
    hat: "qing-cap",
    hair: "bald",
    moustache: true,
    expression: "concerned",
  },
  roc: { outfit: "roc-officer", hat: "officer-olive", hair: "crop" },
  rocTroop: { outfit: "roc-soldier", hat: "field-olive", hair: "crop" },
  prc: { outfit: "prc-officer", hair: "slick", expression: "stern" },
  us: { outfit: "us-officer", hat: "officer-olive", hairColor: "#594c3d" },
  roosevelt: {
    outfit: "dark-suit",
    hair: "silver",
    hairColor: "#8a8070",
    glasses: true,
    skin: "#d6af92",
  },
  churchill: {
    outfit: "dark-suit",
    hair: "bald",
    hairColor: "#898277",
    skin: "#dfb599",
  },
  chiang: { outfit: "roc-officer", hair: "bald", moustache: true },
  truman: {
    outfit: "dark-suit",
    hair: "silver",
    hairColor: "#76746c",
    glasses: true,
    skin: "#dab493",
  },
  civilian: { outfit: "civilian", hair: "waves", expression: "concerned" },
  clerk: { outfit: "light-suit", hair: "slick", glasses: true },
  worker: { outfit: "civilian", hair: "crop", hat: "field-khaki" },
  observer: {
    outfit: "light-suit",
    hair: "silver",
    hairColor: "#807666",
    glasses: true,
    skin: "#d7af91",
  },
};
export type ActorProps = StagePuppetProps & {
  cast?: Cast;
  x: number;
  y?: number;
  height?: number;
  travel?: number;
  travelStart?: number;
  travelEnd?: number;
  recoil?: boolean;
  name?: string;
};

export const Actor: React.FC<ActorProps> = ({
  cast = "civilian",
  x,
  y = 145,
  height = 800,
  travel = 0,
  travelStart = 10,
  travelEnd = 70,
  recoil = false,
  name,
  ...rig
}) => {
  const frame = useCurrentFrame();
  const walk = travel !== 0 && frame >= travelStart && frame < travelEnd;
  const retreat = recoil
    ? interpolate(frame, [0, 35, 47, 70], [0, 0, -36, -36], clamp)
    : 0;
  const dx =
    interpolate(frame, [travelStart, travelEnd], [0, travel], clamp) + retreat;
  return (
    <div
      style={{
        position: "absolute",
        left: x - (height * 300) / 560 / 2 + dx,
        top: y,
        width: (height * 300) / 560,
        height,
      }}
    >
      <StagePuppet
        {...CAST[cast]}
        {...rig}
        walking={walk}
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 10px 6px rgba(36,44,35,.16))",
        }}
      />
      {name && (
        <div
          style={{
            position: "absolute",
            top: height * 0.79,
            left: -28,
            right: -28,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            color: INK,
            background: PAPER,
            border: `3px solid ${INK}`,
            borderRadius: 3,
            padding: "6px 8px",
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export const Formation: React.FC<{
  cast: Cast;
  advance?: boolean;
  armed?: boolean;
  flee?: boolean;
}> = ({ cast, advance = false, armed = true, flee = false }) => (
  <>
    {[0, 1, 2].map((i) => (
      <Actor
        key={`back-${i}`}
        cast={cast}
        x={290 + i * 510}
        y={200}
        height={650}
        travel={advance ? 90 : flee ? -250 : 0}
        travelStart={i * 5}
        travelEnd={64 + i * 5}
        pose={armed ? "rifle-ready" : flee ? "march" : "neutral"}
        prop={armed ? "rifle" : "none"}
        motionOffset={i + 4}
        expression={flee ? "concerned" : "stern"}
      />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <Actor
        key={i}
        cast={cast}
        x={160 + i * 495}
        y={185}
        height={820}
        travel={advance ? 130 : flee ? -350 : 0}
        travelStart={i * 4}
        travelEnd={80 + i * 4}
        pose={armed ? "rifle-ready" : flee ? "march" : "neutral"}
        prop={armed ? "rifle" : "none"}
        motionOffset={i}
      />
    ))}
  </>
);
