import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SCENE_2_UTAH_CABIN } from '../scenesData';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AnimatedCaption } from '../../../components/AnimatedCaption';
import { DateTitle } from '../../../components/DateTitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';
import {findNarrationFrame} from '../audioTiming';

export const UtahCabinScene: React.FC = () => {
  const {
    images,
    subtitles,
    keyTitles = [],
    dateMarker,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_2_UTAH_CABIN;
  const dogBarkFrame = findNarrationFrame(subtitles, /tiếng sủa/i, 1800);
  const thumpFrame = findNarrationFrame(subtitles, /va đập/i, 3600);
  const glassTapFrame = findNarrationFrame(subtitles, /gõ.*(?:kính|cửa sổ)/i, 5000);
  const scratchFrame = findNarrationFrame(subtitles, /cào rít/i, 7600);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070a' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Dedicated Chapter Soundscape: Deep Winter Pine Forest Isolation */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/utah_ambience.wav')}
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
      {/* Far dog bark during porch incident */}
      <Sequence from={dogBarkFrame} durationInFrames={90}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_dog_bark_far.wav')}
          volume={0.4}
        />
      </Sequence>

      {/* Heavy dull thump on cabin roof */}
      <Sequence from={thumpFrame} durationInFrames={75}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_heavy_thump.wav')}
          volume={0.65}
        />
      </Sequence>

      {/* Tapping begins exactly when the window incident is narrated. */}
      <Sequence from={glassTapFrame} durationInFrames={80}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_glass_tap.wav')}
          volume={0.45}
        />
      </Sequence>

      {/* Creeping scratch along wooden wall */}
      <Sequence from={scratchFrame} durationInFrames={100}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_wall_scratch.wav')}
          volume={0.5}
        />
      </Sequence>

      {/* 4. Visual plate sequence with Breathing Zoom */}
      <BreathingImageSequence
        images={images}
        fadeDuration={24}
        breathingPeriodInFrames={240}
        amplitude={0.022}
      />

      {/* 5. Cold Drifting Snowfall */}
      <AtmosphericSnowOverlay intensity="medium" windDirection="right" />

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
