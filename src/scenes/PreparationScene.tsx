import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { SCENE_3_PREPARATION } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';
import { LowerThird } from '../components/LowerThird';

export const PreparationScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    lowerThird,
    dateMarker,
    voiceoverAudio,
  } = SCENE_3_PREPARATION;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      {voiceoverAudio && <Audio src={staticFile(voiceoverAudio)} volume={1.0} />}

      <DocumentaryImage images={images} />
      <FilmGrainOverlay />

      <AnimatedCaption titles={keyTitles} />

      {lowerThird && <LowerThird info={lowerThird} />}

      {dateMarker && (
        <DateTitle
          date={dateMarker.date}
          location={dateMarker.location}
          startFrame={dateMarker.startFrame}
          durationInFrames={dateMarker.durationInFrames}
        />
      )}

      <Timeline
        currentStage="SỰ CHUẨN BỊ CỦA QUÂN ĐỘI VIỆT MINH"
        progressPercent={30}
      />

      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
