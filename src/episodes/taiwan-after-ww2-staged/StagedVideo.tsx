import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import storyboard from "./data/storyboard.json";
import voice from "./data/voice_timing.json";
import { StagedShot } from "./scenes/StagedShot";
import { KoreanCaptions } from "./components/Captions";
import { Shot, STAGED_DURATION } from "./types";

export type StagedVideoProps = { startFrame?: number; windowFrames?: number };
const shots: Shot[] = storyboard;
const cues = Object.entries(voice.clips).map(([id, c]) => ({
  id,
  file: c.file,
  start: "startFrame" in c ? c.startFrame : 14,
  duration: Math.ceil(c.durationSec * 30),
}));
const sfx = shots
  .filter(
    (s) =>
      ["handover", "signing", "archive"].includes(s.kind) && s.duration > 110,
  )
  .map((s) => ({
    from:
      s.start + (s.kind === "handover" ? 35 : s.kind === "signing" ? 42 : 12),
    file: "paper.wav",
    volume: s.kind === "signing" ? 0.14 : 0.075,
  }));

// A preview is a window on exactly the same timeline, not a separate draft render.
export const StagedVideo: React.FC<StagedVideoProps> = ({
  startFrame = 0,
  windowFrames = STAGED_DURATION,
}) => (
  <AbsoluteFill style={{ background: "#c0bd9f" }}>
    {shots
      .filter(
        (s) =>
          s.start + s.duration > startFrame &&
          s.start < startFrame + windowFrames,
      )
      .map((s) => (
        <Sequence
          key={s.id}
          name={`${s.id} · ${s.sentenceId} · ${s.kind}`}
          from={s.start - startFrame}
          durationInFrames={s.duration}
        >
          <StagedShot shot={s} />
        </Sequence>
      ))}
    {cues
      .filter(
        (c) =>
          c.start + c.duration > startFrame &&
          c.start < startFrame + windowFrames,
      )
      .map((c) => (
        <Sequence
          key={c.id}
          name={`Voice · ${c.id}`}
          from={c.start - startFrame}
          durationInFrames={c.duration}
        >
          <Audio src={staticFile(c.file)} volume={1} />
        </Sequence>
      ))}
    <Audio
      src={staticFile("episodes/taiwan-after-ww2-staged/audio/episode_bed.mp3")}
      trimBefore={startFrame}
      volume={(f) => {
        const global = f + startFrame;
        const fade = Math.min(1, global / 60, (STAGED_DURATION - global) / 70);
        const speaking = cues.some(
          (c) => global >= c.start && global < c.start + c.duration,
        );
        return Math.max(0, fade) * (speaking ? 0.07 : 0.1);
      }}
    />
    {sfx
      .filter(
        (s) => s.from + 30 > startFrame && s.from < startFrame + windowFrames,
      )
      .map((s, i) => (
        <Sequence
          key={`${s.from}-${i}`}
          name="Object sound"
          from={s.from - startFrame}
          durationInFrames={30}
        >
          <Audio
            src={staticFile(
              `episodes/taiwan-after-ww2-staged/audio/sfx/${s.file}`,
            )}
            volume={() => s.volume}
          />
        </Sequence>
      ))}
    <KoreanCaptions startFrame={startFrame} />
  </AbsoluteFill>
);
