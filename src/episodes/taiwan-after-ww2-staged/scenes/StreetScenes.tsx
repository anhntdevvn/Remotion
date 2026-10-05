import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor, Formation } from "../components/Actor";
import { World, Flag } from "../components/World";
import { Board } from "../components/Props";
import { clamp, FONT, INK, Shot } from "../types";

export const StreetScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  if (shot.kind === "collapse")
    return (
      <>
        <World kind="ruins" />
        <Actor
          cast="japanTroop"
          x={345}
          y={183}
          height={770}
          pose="neutral"
          expression="concerned"
          travel={-90}
          travelEnd={65}
        />
        <Actor
          cast="japan"
          x={745}
          y={140}
          height={840}
          expression="concerned"
          pose={frame > 45 ? "neutral" : "hold-document"}
          gaze={1}
        />
        <Actor
          cast="civilian"
          x={1435}
          y={220}
          height={695}
          expression="concerned"
          pose="carry"
          prop="box"
          travel={-110}
          travelStart={20}
          travelEnd={85}
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
          <path d="M1110 790V132" stroke={INK} strokeWidth="10" />
          <g
            transform={`translate(0 ${interpolate(frame, [16, 95], [0, 410], clamp)})`}
          >
            <Flag country="japan" x={1110} y={132} w={175} />
          </g>
        </svg>
        {shot.mode === "hook" && (
          <div
            style={{
              position: "absolute",
              left: 1220,
              top: 195,
              fontSize: 87,
              fontWeight: 900,
              color: "#f1e2c3",
              textShadow: `4px 4px ${INK}`,
            }}
          >
            1945
          </div>
        )}
      </>
    );
  if (shot.kind === "question")
    return (
      <>
        <World kind="office" />
        <Actor
          cast="japan"
          x={635}
          y={2}
          height={1190}
          expression="concerned"
          pose={frame > 36 ? "explain-right" : "neutral"}
          gaze={1}
        />
        <Board
          x={1325}
          y={280}
          width={620}
          text="대만을 지킬 수는 없었을까?"
          sub="왜?"
        />
      </>
    );
  if (shot.kind === "field")
    return (
      <>
        <World kind="field" />
        <Formation
          cast={shot.mode === "civilwar" ? "rocTroop" : "japanTroop"}
          advance
          armed
        />
        <div
          style={{
            position: "absolute",
            left: 1450,
            top: 180,
            color: INK,
            fontSize: 38,
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          상징적 장면
        </div>
      </>
    );
  if (shot.kind === "curfew")
    return (
      <>
        <World kind="curfew" />
        <Actor
          cast="civilian"
          x={450}
          height={730}
          y={198}
          pose="march"
          expression="concerned"
          travel={-350}
          travelStart={0}
          travelEnd={88}
        />
        <Actor
          cast="civilian"
          x={770}
          height={685}
          y={218}
          pose="carry"
          prop="box"
          expression="concerned"
          travel={-285}
          travelStart={9}
          travelEnd={98}
        />
        <Actor
          cast={shot.mode === "colonial" ? "japanTroop" : "rocTroop"}
          x={1170}
          height={780}
          y={159}
          pose="rifle-ready"
          prop="rifle"
          travel={-130}
          travelEnd={82}
        />
        <Actor
          cast={shot.mode === "colonial" ? "japanTroop" : "rocTroop"}
          x={1580}
          height={790}
          y={161}
          pose="rifle-ready"
          prop="rifle"
          travel={-100}
          travelEnd={72}
        />
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 160,
            color: "#f0e4c9",
            fontSize: 29,
            fontFamily: FONT,
          }}
        >
          분위기 재구성 · 특정 현장 묘사 아님
        </div>
      </>
    );
  if (shot.kind === "crowd")
    return (
      <>
        <World kind="street" />
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Flag country="roc" x={514} y={216} w={200} />
        </svg>
        <Actor
          cast="roc"
          x={460}
          y={152}
          height={820}
          pose={shot.mode === "celebrate" ? "salute" : "neutral"}
          expression={shot.mode === "celebrate" ? "warm" : "neutral"}
        />
        {[0, 1, 2, 3].map((i) => (
          <Actor
            key={i}
            cast="civilian"
            x={865 + i * 263}
            y={210 + (i % 2) * 40}
            height={i % 2 ? 690 : 735}
            hair={i % 2 ? "crop" : "waves"}
            hairColor={i === 2 ? "#9b9283" : "#282f2d"}
            pose={
              shot.mode === "celebrate" && i % 2 === 0
                ? "arms-raised"
                : "neutral"
            }
            expression={shot.mode === "celebrate" ? "warm" : "concerned"}
            motionOffset={i + 4}
            gaze={-1}
          />
        ))}
      </>
    );
  if (shot.kind === "rebuild")
    return (
      <>
        <World kind="rebuild" />
        <Actor
          cast="worker"
          x={520}
          y={171}
          height={795}
          pose="carry"
          prop="box"
          travel={235}
          travelEnd={92}
        />
        <Actor
          cast="worker"
          x={1210}
          y={190}
          height={760}
          pose={frame > 45 ? "explain-right" : "neutral"}
          gaze={1}
        />
        <Actor
          cast="clerk"
          x={1600}
          y={175}
          height={800}
          pose="read"
          prop="folder"
          gaze={-1}
        />
      </>
    );
  if (shot.kind === "port")
    return (
      <>
        <World kind="port" />
        <Actor
          cast="worker"
          x={355}
          y={198}
          height={750}
          pose="carry"
          prop="box"
          facing="profile"
          travel={230}
          travelEnd={90}
        />
        <Actor
          cast={shot.mode === "retreat" ? "roc" : "japan"}
          x={1280}
          y={160}
          height={815}
          pose={frame > 48 ? "point-left" : "read"}
          prop={frame > 48 ? "none" : "folder"}
          gaze={-1}
        />
        <Actor
          cast={shot.mode === "retreat" ? "rocTroop" : "worker"}
          x={1655}
          y={183}
          height={760}
          pose={shot.mode === "retreat" ? "rifle-ready" : "carry"}
          prop={shot.mode === "retreat" ? "rifle" : "box"}
          travel={-150}
          travelEnd={70}
        />
      </>
    );
  return (
    <>
      <World kind="street" />
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path d="M870 769V160" stroke={INK} strokeWidth="9" />
        <Flag country="japan" x={870} y={160} w={183} />
      </svg>
      <Actor
        cast="japan"
        x={465}
        y={148}
        height={823}
        pose={frame > 28 ? "point-right" : "hands-behind"}
        gaze={1}
      />
      <Actor
        cast="civilian"
        x={1170}
        y={218}
        height={720}
        pose="carry"
        prop="box"
        facing="profile"
        travel={125}
        travelEnd={76}
      />
      <Actor
        cast="civilian"
        x={1630}
        y={210}
        height={710}
        pose="neutral"
        gaze={-1}
      />
      {shot.mode === "hook" && (
        <div
          style={{
            position: "absolute",
            left: 1255,
            top: 135,
            fontFamily: FONT,
            fontSize: 100,
            fontWeight: 900,
            color: "#f4e8ce",
            textShadow: `4px 4px ${INK}`,
          }}
        >
          50년
        </div>
      )}
    </>
  );
};
