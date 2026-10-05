import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor } from "../components/Actor";
import { Space } from "../components/Space";
import { Flag, Label } from "../components/Objects";
import { Beat, C, FONT, clamp } from "../types";

export const EnvironmentScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  if (beat.grammar === "formation") {
    const repression = beat.mode === "repression";
    const defeat = beat.mode === "defeat";
    const korea = beat.mode === "korea";
    if (beat.mode === "civilwar")
      return (
        <>
          <Space setting="yard" />
          {[0, 1, 2].map((i) => (
            <Actor
              key={`roc-${i}`}
              cast="rocTroop"
              x={210 + i * 305}
              y={220}
              height={750}
              pose="rifle-ready"
              prop="rifle"
              travel={-150}
              travelStart={i * 5}
              travelEnd={90}
              expression="concerned"
            />
          ))}
          {[0, 1, 2].map((i) => (
            <Actor
              key={`prc-${i}`}
              cast="prc"
              x={1270 + i * 263}
              y={225}
              height={744}
              pose="rifle-ready"
              prop="rifle"
              travel={-135}
              travelStart={i * 5}
              travelEnd={90}
              gaze={-1}
            />
          ))}
          <Label x={440} y={303} width={354}>
            국민당 · 후퇴
          </Label>
          <Label x={1420} y={295} width={440}>
            공산당 · 대륙에서 승리
          </Label>
          <div
            style={{
              position: "absolute",
              left: 1260,
              top: 839,
              fontSize: 26,
              color: C.cream,
            }}
          >
            1949 · 상징적 재구성
          </div>
        </>
      );
    const cast =
      beat.mode === "civilwar" || repression ? "rocTroop" : "japanTroop";
    return (
      <>
        <Space setting={repression ? "street" : "yard"} />
        {[0, 1, 2].map((i) => (
          <Actor
            key={`back-${i}`}
            cast={cast}
            outfit={
              korea || cast === "rocTroop" ? "roc-soldier" : "japanese-soldier"
            }
            hat={
              korea
                ? "none"
                : cast === "rocTroop"
                  ? "field-olive"
                  : "field-khaki"
            }
            x={260 + i * 435}
            y={267}
            height={620}
            prop={defeat ? "none" : "rifle"}
            pose={defeat ? "neutral" : "rifle-ready"}
            travel={defeat ? -95 : 105}
            travelStart={i * 4}
            travelEnd={75 + i * 4}
            expression={defeat ? "concerned" : "stern"}
            motionOffset={i + 4}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <Actor
            key={i}
            cast={cast}
            outfit={
              korea || cast === "rocTroop" ? "roc-soldier" : "japanese-soldier"
            }
            hat={
              korea
                ? "none"
                : cast === "rocTroop"
                  ? "field-olive"
                  : "field-khaki"
            }
            x={350 + i * 431}
            y={198}
            height={790}
            prop={defeat ? "none" : "rifle"}
            pose={defeat ? "neutral" : "rifle-ready"}
            travel={defeat ? -120 : 148}
            travelStart={i * 5}
            travelEnd={80 + i * 5}
            expression={defeat ? "concerned" : "stern"}
            motionOffset={i}
          />
        ))}
        {repression && (
          <Actor
            cast="civilian"
            x={1500}
            y={271}
            height={650}
            pose="march"
            travel={410}
            travelStart={17}
            travelEnd={100}
            expression="concerned"
          />
        )}
        {korea && (
          <Label x={1513} y={578} width={470}>
            북한군의 남침
          </Label>
        )}
        <div
          style={{
            position: "absolute",
            left: 1260,
            top: 334,
            color: C.cream,
            fontSize: 26,
            fontFamily: FONT,
          }}
        >
          설명을 위한 상징적 재구성
        </div>
      </>
    );
  }
  if (beat.grammar === "street")
    return (
      <>
        <Space setting="street" />
        <Flag type="roc" x={1186} y={297} w={224} />
        <Actor
          cast="roc"
          x={470}
          y={180}
          height={840}
          pose={frame < 40 ? "salute" : "explain-right"}
          expression="warm"
        />
        {[0, 1, 2].map((i) => (
          <Actor
            key={i}
            cast="civilian"
            x={910 + i * 318}
            y={230 + (i % 2) * 27}
            height={740 - (i % 2) * 60}
            pose={i === 1 ? "arms-raised" : "neutral"}
            expression="warm"
            gaze={-1}
            motionOffset={i + 2}
          />
        ))}
      </>
    );
  const rebuild = beat.grammar === "rebuild";
  const arrives = beat.mode === "roc-arrives";
  const cartX = interpolate(frame, [0, 108], [160, 510], clamp);
  return (
    <>
      <Space setting={rebuild ? "workshop" : "port"} />
      {!rebuild && (
        <Flag type={arrives ? "roc" : "japan"} x={1440} y={270} w={230} />
      )}
      {/* Cart and actor travel use the same bounded distance; the worker pulls a real object. */}
      <Actor
        cast="worker"
        x={675}
        y={269}
        height={765}
        travel={350}
        travelStart={0}
        travelEnd={108}
        pose="pass-left"
        facing="profile"
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
        <g transform={`translate(${cartX} 845)`} stroke={C.ink} strokeWidth="7">
          <path d="M0 0H276V-62H0Z" fill="#8E7452" />
          <path d="M0-62H220V-202H0Z" fill="#B39A6A" />
          <path d="M0-145H220M110-202V-62" stroke={C.gold} strokeWidth="5" />
          <path d="M270-35L344-146" />
          <circle cx="43" cy="32" r="35" fill="#38413D" />
          <circle cx="233" cy="32" r="35" fill="#38413D" />
          <circle cx="43" cy="32" r="11" fill={C.gold} />
          <circle cx="233" cy="32" r="11" fill={C.gold} />
        </g>
      </svg>
      <Actor
        cast={rebuild ? "clerk" : arrives ? "roc" : "japan"}
        x={1382}
        y={188}
        height={814}
        pose={frame > 53 ? "point-left" : "read"}
        prop={frame > 53 ? "none" : "folder"}
        gaze={-1}
      />
      <Actor
        cast={rebuild ? "worker" : arrives ? "rocTroop" : "civilian"}
        x={1732}
        y={259}
        height={656}
        pose={arrives ? "rifle-ready" : "carry"}
        prop={arrives ? "rifle" : "box"}
      />
      {beat.mode === "fifty-years" && (
        <Label x={970} y={374} width={435}>
          1895 → 1945 · 50년
        </Label>
      )}
    </>
  );
};
