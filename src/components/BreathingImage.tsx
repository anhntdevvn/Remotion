import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  Img,
} from 'remotion';
import { SceneImage } from '../types';

interface BreathingImageProps {
  image: SceneImage;
  fadeDuration?: number;
  breathingPeriodInFrames?: number; // default ~240 frames (8 seconds per breath cycle)
  amplitude?: number; // scale variance (e.g. 0.02)
}

export const BreathingImage: React.FC<BreathingImageProps> = ({
  image,
  fadeDuration = 18,
  breathingPeriodInFrames = 240,
  amplitude = 0.022,
}) => {
  const frame = useCurrentFrame();
  const {
    src,
    scaleStart = 1.02,
    scaleEnd = 1.08,
    durationInFrames,
  } = image;

  // Soft photographic fade in and fade out
  const fadeIn = interpolate(frame, [0, fadeDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeDuration, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Progressive base push-in + subtle oscillating "breathing" zoom
  const progress = frame / durationInFrames;
  const baseScale = interpolate(progress, [0, 1], [scaleStart, scaleEnd]);
  
  // Dual-frequency organic breathing wave
  const wave1 = Math.sin((frame * 2 * Math.PI) / breathingPeriodInFrames);
  const wave2 = Math.sin((frame * 2 * Math.PI) / (breathingPeriodInFrames * 1.618));
  const breathingOffset = (wave1 * 0.7 + wave2 * 0.3) * amplitude;
  
  const finalScale = baseScale + breathingOffset;

  // Extremely subtle micro-drift pan (feeling of a steady observation camera)
  const driftX = Math.sin((frame * 2 * Math.PI) / (breathingPeriodInFrames * 1.5)) * 0.4;
  const driftY = Math.cos((frame * 2 * Math.PI) / (breathingPeriodInFrames * 2.0)) * 0.3;

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: 'hidden',
        backgroundColor: '#05070a',
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${finalScale}) translate3d(${driftX}%, ${driftY}%, 0)`,
          transformOrigin: 'center center',
          filter: 'contrast(1.08) brightness(0.92)',
        }}
      />
    </AbsoluteFill>
  );
};
