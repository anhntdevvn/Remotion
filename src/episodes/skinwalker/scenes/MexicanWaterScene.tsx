import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SCENE_3_MEXICAN_WATER } from '../scenesData';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AnimatedCaption } from '../../../components/AnimatedCaption';
import { DateTitle } from '../../../components/DateTitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';
import {findNarrationFrame} from '../audioTiming';

export const MexicanWaterScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_3_MEXICAN_WATER;
  const glassTapFrame = findNarrationFrame(subtitles, /gõ.*(?:kính|cửa sổ)/i, 1800);
  const footstepsFrame = findNarrationFrame(subtitles, /bước chân chậm/i, 6000);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070a' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Dedicated Chapter Soundscape: Dry Desert Stillness & High Shimmer */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/mexican_water_ambience.wav')}
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
      {/* Rhythmic taps on window */}
      <Sequence from={glassTapFrame} durationInFrames={80}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_glass_tap.wav')}
          volume={0.6}
        />
      </Sequence>

      {/* Heavy synchronized steps during sleepwalking investigation */}
      <Sequence from={footstepsFrame} durationInFrames={120}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_sync_footsteps.wav')}
          volume={0.55}
        />
      </Sequence>

      {/* 4. Visual plate sequence with Breathing Zoom */}
      <BreathingImageSequence
        images={images}
        fadeDuration={24}
        breathingPeriodInFrames={250}
        amplitude={0.02}
      />

      {/* 5. Subtle Dust Mist Overlay */}
      <AtmosphericSnowOverlay intensity="light" windDirection="left" />

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
