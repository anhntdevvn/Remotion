import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['vietnamese', 'latin'],
});

interface TimelineProps {
  currentStage?: string;
  progressPercent?: number; // 0 to 100
}

export const Timeline: React.FC<TimelineProps> = ({
  currentStage = 'CHIẾN DỊCH ĐIỆN BIÊN PHỦ (13/3/1954 – 7/5/1954)',
  progressPercent,
}) => {
  const frame = useCurrentFrame();

  const autoProgress =
    progressPercent !== undefined
      ? progressPercent
      : interpolate(frame, [0, 600], [0, 100], {
          extrapolateRight: 'clamp',
        });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 39,
        justifyContent: 'flex-start',
        padding: '24px 70px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 15,
            fontWeight: 700,
            color: '#d4d4d8',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {currentStage}
        </span>
        <div
          style={{
            width: 270,
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${autoProgress}%`,
              height: '100%',
              backgroundColor: '#d97706',
              boxShadow: '0 0 8px rgba(217, 119, 6, 0.8)',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
