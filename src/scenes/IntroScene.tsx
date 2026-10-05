import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { SCENE_1_HOOK } from '../data/scenesData';
import { DocumentaryImage } from '../components/DocumentaryImage';
import { FilmGrainOverlay } from '../components/FilmGrainOverlay';
import { Subtitle } from '../components/Subtitle';
import { AnimatedCaption } from '../components/AnimatedCaption';
import { DateTitle } from '../components/DateTitle';
import { Timeline } from '../components/Timeline';

export const IntroScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    sfxAudio,
  } = SCENE_1_HOOK;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      {/* 1. Voiceover and Atmospheric Soundtrack */}
      {sfxAudio && (
        <Audio
          src={staticFile(sfxAudio)}
          volume={0.12}
        />
      )}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Ken Burns Archival Historical Images */}
      <DocumentaryImage images={images} />

      {/* 3. Vintage Film Grain, Scratches & Vignette Overlay */}
      <FilmGrainOverlay />

      {/* 4. Large Sequential Impact Keywords */}
      <AnimatedCaption titles={keyTitles} />

      {/* 5. Date & Location Marker */}
      {dateMarker && (
        <DateTitle
          date={dateMarker.date}
          location={dateMarker.location}
          startFrame={dateMarker.startFrame}
          durationInFrames={dateMarker.durationInFrames}
        />
      )}

      {/* 6. Chronological Campaign Timeline */}
      <Timeline
        currentStage="CHIẾN DỊCH ĐIỆN BIÊN PHỦ – 1954"
        progressPercent={6}
      />

      {/* 7. Subtitles Synchronized with Voice-over */}
      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
