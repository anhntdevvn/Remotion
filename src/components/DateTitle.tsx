import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['vietnamese', 'latin'],
});

interface DateTitleProps {
  date: string;
  location?: string;
  startFrame: number;
  durationInFrames: number;
}

export const DateTitle: React.FC<DateTitleProps> = ({
  date,
  location,
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const offset = frame - startFrame;
  const fadeIn = interpolate(offset, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    offset,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 38,
        padding: '50px 70px',
      }}
    >
      <div
        style={{
          opacity,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 18px',
          backgroundColor: 'rgba(12, 10, 8, 0.75)',
          borderLeft: '4px solid #f59e0b',
          borderRadius: '0 4px 4px 0',
          backdropFilter: 'blur(6px)',
          fontFamily,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#fbbf24',
            letterSpacing: '0.08em',
          }}
        >
          {date}
        </span>
        {location && (
          <>
            <span style={{ color: '#71717a', fontSize: 16 }}>•</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#e4e4e7',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {location}
            </span>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
