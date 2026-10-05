import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { SCENE_5_TRENCH_WARFARE } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';
import { TrenchMap } from '../components/TrenchMap';

export const TrenchScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
  } = SCENE_5_TRENCH_WARFARE;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      {voiceoverAudio && <Audio src={staticFile(voiceoverAudio)} volume={1.0} />}

      {/* 1. Archival Photos of Trench Warfare & Mud */}
      <DocumentaryImage images={images} />

      {/* 2. Tactical Trench Warfare Animated Map showing siege lines tightening around Muong Thanh */}
      <Sequence from={330} durationInFrames={500}>
        <TrenchMap />
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
        currentStage="CHIẾN HÀO SIẾT CHẶT VÒNG VÂY"
        progressPercent={60}
      />

      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
