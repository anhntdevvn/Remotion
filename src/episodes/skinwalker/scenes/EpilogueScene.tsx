import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile } from 'remotion';
import { SCENE_6_EPILOGUE } from '../scenesData';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AnimatedCaption } from '../../../components/AnimatedCaption';
import { DateTitle } from '../../../components/DateTitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';

export const EpilogueScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_6_EPILOGUE;

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070a' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Dedicated Chapter Soundscape: Contemplative D-minor Cosmic Horizon */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/epilogue_ambience.wav')}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 60, durationInFrames - 90, durationInFrames],
            [0, 0.22, 0.22, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      {/* 3. Visual plate sequence with Breathing Zoom */}
      <BreathingImageSequence
        images={images}
        fadeDuration={28}
        breathingPeriodInFrames={280}
        amplitude={0.018}
      />

      {/* 4. Subtle Night Starlight & Dust */}
      <AtmosphericSnowOverlay intensity="light" windDirection="right" />

      {/* 5. Film Grain & Vignette */}
      <FilmGrainOverlay />

      {/* 6. Animated Key Titles */}
      <AnimatedCaption titles={keyTitles} />

      {/* 7. Date & Location Marker */}
      {dateMarker && (
        <DateTitle
          date={dateMarker.date}
          location={dateMarker.location}
          startFrame={dateMarker.startFrame}
          durationInFrames={dateMarker.durationInFrames}
        />
      )}

      {/* 8. Subtitles */}
      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
