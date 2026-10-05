import React from 'react';
import { AbsoluteFill, Audio, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { SCENE_9_OUTRO } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';
import { YouTubeEndScreen } from '../components/YouTubeEndScreen';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_9_OUTRO;

  // Final fade out to black during the last 30 frames
  const finalFadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      {voiceoverAudio && <Audio src={staticFile(voiceoverAudio)} volume={1.0} />}

      <DocumentaryImage images={images} />
      <FilmGrainOverlay />

      <AnimatedCaption titles={keyTitles} />

      {dateMarker && (
        <DateTitle
          date={dateMarker.date}
          location={dateMarker.location}
          startFrame={dateMarker.startFrame}
          durationInFrames={dateMarker.durationInFrames}
        />
      )}

      <Timeline
        currentStage="ĐIỆN BIÊN PHỦ – BẢN ANH HÙNG CA BẤT DIỆT"
        progressPercent={100}
      />

      <Subtitle subtitles={subtitles} />

      <YouTubeEndScreen startFrame={500} />

      {/* Cinematic Fade Out to Black */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: finalFadeOut,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
