import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { SCENE_6_HILL_A1 } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';

export const HillA1Scene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
  } = SCENE_6_HILL_A1;

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
        currentStage="QUYẾT CHIẾN ĐỒI A1 (ELIANE 2)"
        progressPercent={75}
      />

      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
