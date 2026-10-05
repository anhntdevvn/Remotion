import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { SCENE_8_HISTORICAL_IMPACT } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';

export const HistoricalImpactScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
  } = SCENE_8_HISTORICAL_IMPACT;

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
        currentStage="Ý NGHĨA LỊCH SỬ – HIỆP ĐỊNH GENÈVE"
        progressPercent={96}
      />

      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
