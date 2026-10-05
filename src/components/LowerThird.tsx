import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { LowerThirdInfo } from '../types';

const { fontFamily: nameFont } = loadPlayfair('normal', {
  weights: ['700'],
  subsets: ['vietnamese', 'latin'],
});

const { fontFamily: titleFont } = loadMontserrat('normal', {
  weights: ['500', '600'],
  subsets: ['vietnamese', 'latin'],
});

interface LowerThirdProps {
  info: LowerThirdInfo;
}

export const LowerThird: React.FC<LowerThirdProps> = ({ info }) => {
  const frame = useCurrentFrame();
  const { name, title, startFrame, durationInFrames } = info;

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const offset = frame - startFrame;
  const fadeIn = interpolate(offset, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    offset,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const slideX = interpolate(offset, [0, 18], [-40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 42,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 80,
        paddingBottom: 130,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateX(${slideX}px)`,
          maxWidth: 600,
          padding: '16px 26px',
          backgroundColor: 'rgba(12, 10, 8, 0.88)',
          borderLeft: '5px solid #d97706',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: nameFont,
            fontSize: 30,
            fontWeight: 700,
            color: '#fef3c7',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textShadow: '0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          {name}
        </h2>
        <p
          style={{
            margin: '6px 0 0 0',
            fontFamily: titleFont,
            fontSize: 18,
            fontWeight: 500,
            color: '#fbbf24',
            letterSpacing: '0.04em',
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </p>
      </div>
    </AbsoluteFill>
  );
};
