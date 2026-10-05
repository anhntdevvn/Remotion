import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { BreathingImageSequence } from '../../../components/BreathingImageSequence';
import { FilmGrainOverlay } from '../../../components/FilmGrainOverlay';
import { Subtitle } from '../../../components/Subtitle';
import { AtmosphericSnowOverlay } from '../../../components/AtmosphericSnowOverlay';
import { SCENE_0_HOOK } from '../scenesData';
import {findNarrationFrame} from '../audioTiming';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {
    images,
    subtitles,
    voiceoverAudio,
    durationInFrames,
  } = SCENE_0_HOOK;
  const dogBarkFrame = findNarrationFrame(subtitles, /sủa từ/i, 55);
  const radioFrame = findNarrationFrame(subtitles, /bộ đàm/i, 420);

  // Title card appears at the climax of the hook (last 160 frames)
  const titleStartFrame = durationInFrames - 160;
  const isTitleActive = frame >= titleStartFrame;

  const titleOpacity = interpolate(
    frame,
    [titleStartFrame, titleStartFrame + 25, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleScale = interpolate(
    frame,
    [titleStartFrame, durationInFrames],
    [0.96, 1.04],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#030508' }}>
      {/* 1. Voiceover Narration */}
      {voiceoverAudio && (
        <Audio
          src={staticFile(voiceoverAudio)}
          volume={1.0}
        />
      )}

      {/* 2. Cold Open Dedicated Soundscape */}
      <Audio
        src={staticFile('episodes/skinwalker/ambience/hook_ambience.wav')}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 30, durationInFrames - 170, titleStartFrame, durationInFrames],
            [0, 0.22, 0.22, 0.08, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      {/* 3. Narrative SFX at Spoken Dramatic Beats */}
      {/* Dog barking in distance during dog sentence (~frame 60) */}
      <Sequence from={dogBarkFrame} durationInFrames={90}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_dog_bark_far.wav')}
          volume={0.45}
        />
      </Sequence>

      {/* Radio static during snowplow radio sentence (~frame 420) */}
      <Sequence from={radioFrame} durationInFrames={75}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_radio_static.wav')}
          volume={0.5}
        />
      </Sequence>

      {/* Heavy Sub-bass Title Impact Hit at title reveal */}
      <Sequence from={titleStartFrame} durationInFrames={120}>
        <Audio
          src={staticFile('episodes/skinwalker/sfx/sfx_title_impact.wav')}
          volume={0.85}
        />
      </Sequence>

      {/* 4. Visual Montage Plates with Breathing Movement */}
      <BreathingImageSequence
        images={images}
        fadeDuration={20}
        breathingPeriodInFrames={200}
        amplitude={0.02}
      />

      {/* 5. Atmospheric Drifting Snow & Fog */}
      <AtmosphericSnowOverlay intensity="medium" windDirection="right" />

      {/* 6. Cinematic Film Grain & Vignette */}
      <FilmGrainOverlay />

      {/* 7. Subtitles */}
      <Subtitle subtitles={subtitles} />

      {/* 8. Main Climax Title Card */}
      {isTitleActive && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(3, 5, 8, 0.72)',
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            zIndex: 40,
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontFamily: 'sans-serif',
              letterSpacing: '8px',
              color: '#d4a373',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            HỒ SƠ TÂY NAM KỲ BÍ // HỒ SƠ 01
          </div>
          <h1
            style={{
              fontSize: '62px',
              fontFamily: 'serif',
              color: '#f0f3f6',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              fontWeight: 800,
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            }}
          >
            TRỞ LẠI VÙNG ĐẤT SKINWALKER
          </h1>
          <div
            style={{
              width: '180px',
              height: '2px',
              backgroundColor: '#8b2626',
              margin: '10px 0 20px 0',
            }}
          />
          <p
            style={{
              fontSize: '22px',
              fontFamily: 'sans-serif',
              color: '#b0b8c2',
              letterSpacing: '3px',
              margin: 0,
              fontWeight: 300,
            }}
          >
            Bốn Lời Kể Từ Miền Hoang Mạc Tây Nam
          </p>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
