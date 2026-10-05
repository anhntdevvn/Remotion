import React from "react";
import { AbsoluteFill, Sequence, staticFile, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import timing from "./data/full_timing.json";
import beatData from "./data/beats.json";
import { Beat, C, DURATION, clamp } from "./types";
import { BeatScene } from "./scenes/BeatScene";
import { Scene01Preview } from "./scenes/Scene01Preview";
import { KoreanCaptions } from "./components/Captions";
import { ChannelWatermark } from "../../channel-branding/ChannelWatermark";

export type ActionV3Props = { startFrame?: number; windowFrames?: number };
export const actionBeats = beatData as Beat[];
const voices = Object.entries(timing.clips)
  .filter(([id]) => id !== "KO-001")
  .map(([id, c]) => ({
    id,
    file: c.file,
    start: "startFrame" in c ? c.startFrame : 0,
    duration: Math.ceil(c.durationSec * 30),
  }));
// Quiet object cues accompany contact, rather than a whoosh at every sentence cut.
const sounds = actionBeats.flatMap((b) => {
  const offset =
    b.grammar === "handover"
      ? 66
      : b.grammar === "queue"
        ? 90
        : b.grammar === "signing" || b.grammar === "hall"
          ? 42
          : b.grammar === "document"
            ? 14
            : null;
  return offset !== null && b.duration > offset + 20
    ? [
        {
          from: b.start + offset,
          file: "paper.wav",
          volume: b.grammar === "handover" ? 0.14 : 0.07,
        },
      ]
    : [];
});
const intersects = (
  start: number,
  duration: number,
  from: number,
  length: number,
) => start + duration > from && start < from + length;

// Preview windows share the exact composition/audio timeline used by full export.
export const ActionV3Video: React.FC<ActionV3Props> = ({
  startFrame = 0,
  windowFrames = DURATION,
}) => (
  <AbsoluteFill style={{ background: C.ink }}>
    {startFrame < 810 && (
      <Sequence
        from={-startFrame}
        durationInFrames={810}
        name="Opening · unchanged Action v2"
      >
        <Scene01Preview />
      </Sequence>
    )}
    {actionBeats
      .filter((b) => intersects(b.start, b.duration, startFrame, windowFrames))
      .map((b) => (
        <Sequence
          key={b.id}
          name={`${b.id} · ${b.sentenceId} · ${b.grammar}/${b.mode}`}
          from={b.start - startFrame}
          durationInFrames={b.duration}
        >
          <BeatScene beat={b} showWatermark={false} />
        </Sequence>
      ))}
    {voices
      .filter((c) => intersects(c.start, c.duration, startFrame, windowFrames))
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
    <Sequence
      from={810 - startFrame}
      durationInFrames={DURATION - 810}
      name="Archive ambience · quiet under voice"
    >
      <Audio
        src={staticFile(
          "episodes/taiwan-after-ww2-action-v3/audio/episode_bed.mp3",
        )}
        volume={(f) =>
          interpolate(
            f,
            [0, 50, DURATION - 870, DURATION - 810],
            [0, 0.1, 0.1, 0],
            clamp,
          )
        }
      />
    </Sequence>
    {sounds
      .filter((s) => intersects(s.from, 30, startFrame, windowFrames))
      .map((s) => (
        <Sequence
          key={s.from}
          name="Object contact sound"
          from={s.from - startFrame}
          durationInFrames={30}
        >
          <Audio
            src={staticFile(
              `episodes/taiwan-after-ww2-action-v3/audio/sfx/${s.file}`,
            )}
            volume={() => s.volume}
          />
        </Sequence>
      ))}
    <Sequence
      from={810 - startFrame}
      durationInFrames={DURATION - 810}
      name="Korean captions"
    >
      <KoreanCaptions startFrame={810} />
    </Sequence>
    <ChannelWatermark />
  </AbsoluteFill>
);
