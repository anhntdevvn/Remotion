import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SCENE_5_MILLERS_CREEK } from '../scenesData';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AnimatedCaption } from '../../../components/AnimatedCaption';
import { DateTitle } from '../../../components/DateTitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';
import {findNarrationFrame} from '../audioTiming';

export const MillersCreekScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_5_MILLERS_CREEK;
  const searchFootstepsFrame = findNarrationFrame(subtitles, /men theo|con đường mòn/i, 3600);
  const shoulderTapFrame = findNarrationFrame(subtitles, /chạm nhẹ.*vai/i, 7200);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070a' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Dedicated Chapter Soundscape: Decrepit Farmhouse Draft & Frozen Creek Stillness */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/millers_creek_ambience.wav')}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 45, durationInFrames - 45, durationInFrames],
            [0, 0.22, 0.22, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      {/* 3. Narrative SFX at Spoken Dramatic Beats */}
      {/* Crunching footsteps in snow along frozen creek */}
      <Sequence from={searchFootstepsFrame} durationInFrames={120}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_sync_footsteps.wav')}
          volume={0.5}
        />
      </Sequence>

      {/* Sudden tense shock discovering child on frozen bank */}
      <Sequence from={shoulderTapFrame} durationInFrames={70}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_shoulder_tap.wav')}
          volume={0.6}
        />
      </Sequence>

      {/* 4. Visual plate sequence with Breathing Zoom */}
      <BreathingImageSequence
        images={images}
        fadeDuration={24}
        breathingPeriodInFrames={260}
        amplitude={0.02}
      />

      {/* 5. Medium Snowfall Drift */}
      <AtmosphericSnowOverlay intensity="medium" windDirection="left" />

      {/* 6. Film Grain & Vignette */}
      <FilmGrainOverlay />

      {/* 7. Animated Key Titles */}
      <AnimatedCaption titles={keyTitles} />

      {/* 8. Date & Location Marker */}
      {dateMarker && (
        <DateTitle
          date={dateMarker.date}
          location={dateMarker.location}
          startFrame={dateMarker.startFrame}
          durationInFrames={dateMarker.durationInFrames}
        />
      )}

      {/* 9. Subtitles */}
      <Subtitle subtitles={subtitles} />
    </AbsoluteFill>
  );
};
