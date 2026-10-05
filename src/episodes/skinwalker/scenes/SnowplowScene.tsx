import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SCENE_4_SNOWPLOW_RIDGE } from '../scenesData';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AnimatedCaption } from '../../../components/AnimatedCaption';
import { DateTitle } from '../../../components/DateTitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';
import {findNarrationFrame} from '../audioTiming';

export const SnowplowScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_4_SNOWPLOW_RIDGE;
  const radioFrame = findNarrationFrame(subtitles, /điện đàm/i, 3500);
  const brakesFrame = findNarrationFrame(subtitles, /phanh khẩn cấp/i, 7000);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070a' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Dedicated Chapter Soundscape: Mountain Blizzard & Heavy Diesel Engine */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/snowplow_ambience.wav')}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 45, durationInFrames - 45, durationInFrames],
            [0, 0.24, 0.24, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      {/* 3. Narrative SFX at Spoken Dramatic Beats */}
      {/* Ghost radio call static burst */}
      <Sequence from={radioFrame} durationInFrames={75}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_radio_static.wav')}
          volume={0.65}
        />
      </Sequence>

      {/* Heavy pneumatic brakes screech seeing figure in road */}
      <Sequence from={brakesFrame} durationInFrames={90}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_snowplow_brakes.wav')}
          volume={0.7}
        />
      </Sequence>

      {/* 4. Visual plate sequence with Breathing Zoom */}
      <BreathingImageSequence
        images={images}
        fadeDuration={24}
        breathingPeriodInFrames={230}
        amplitude={0.022}
      />

      {/* 5. Intense High-Mountain Blizzard Snowfall */}
      <AtmosphericSnowOverlay intensity="blizzard" windDirection="right" />

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
