import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { SCENE_2_WHY_DBP } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';
import { HistoricalMap } from '../components/HistoricalMap';

export const MapScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    mapHighlights = [],
  } = SCENE_2_WHY_DBP;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      {voiceoverAudio && <Audio src={staticFile(voiceoverAudio)} volume={1.0} />}

      {/* 1. Archival Photos of Strategic Location, Mountains, French Aircraft & Fortresses */}
      <DocumentaryImage images={images} />

      {/* 2. Bring the tactical map in while the narration is still explaining the fortress. */}
      <Sequence from={430} durationInFrames={290}>
        <HistoricalMap
          mapSrc="images/dien-bien-phu-battle-map-1954.jpg"
          highlights={mapHighlights}
          title="TẬP ĐOÀN CỨ ĐIỂM ĐIỆN BIÊN PHỦ – BỐ PHÒNG 1954"
        />
      </Sequence>

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
        currentStage="VÌ SAO LẠI LÀ ĐIỆN BIÊN PHỦ?"
        progressPercent={18}
      />

      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
