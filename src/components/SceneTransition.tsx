import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface SceneTransitionProps {
  type?: 'fade-to-black' | 'dip-white';
  durationInFrames?: number;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  type = 'fade-to-black',
  durationInFrames = 20,
}) => {
  const frame = useCurrentFrame();

  const half = durationInFrames / 2;
  const opacity =
    frame < half
      ? interpolate(frame, [0, half], [0, 1])
      : interpolate(frame, [half, durationInFrames], [1, 0]);

  const bgColor = type === 'fade-to-black' ? '#0a0a0a' : '#fafaf9';

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 100,
        backgroundColor: bgColor,
        opacity,
      }}
    />
  );
};
