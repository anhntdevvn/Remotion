import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadSans } from '@remotion/google-fonts/Montserrat';

const { fontFamily: titleFont } = loadFont('normal', {
  weights: ['700', '900'],
  subsets: ['vietnamese', 'latin'],
});

const { fontFamily: subFont } = loadSans('normal', {
  weights: ['500', '600'],
  subsets: ['vietnamese', 'latin'],
});

interface KeyTitleItem {
  text: string;
  subText?: string;
  startFrame: number;
  durationInFrames: number;
  size?: 'large' | 'medium' | 'huge';
}

interface AnimatedCaptionProps {
  titles: KeyTitleItem[];
}

export const AnimatedCaption: React.FC<AnimatedCaptionProps> = ({ titles }) => {
  const frame = useCurrentFrame();

  const activeTitle = titles.find(
    (t) => frame >= t.startFrame && frame < t.startFrame + t.durationInFrames
  );

  if (!activeTitle) {
    return null;
  }

  const offset = frame - activeTitle.startFrame;
  const dur = activeTitle.durationInFrames;

  // Gentle, dignified documentary fade & subtle scale
  const fadeIn = interpolate(offset, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(offset, [dur - 18, dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Very slow, authoritative tracking/expansion
  const scale = interpolate(offset, [0, dur], [0.98, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const baseFontSize =
    activeTitle.size === 'huge' ? 78 : activeTitle.size === 'large' ? 62 : 48;
  const fontSize = activeTitle.text.length > 26 ? Math.min(baseFontSize, 62) : baseFontSize;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 35,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '24px 48px',
          maxWidth: 1720,
          background: 'radial-gradient(ellipse at center, rgba(15,12,8,0.78) 0%, rgba(10,8,5,0) 75%)',
        }}
      >
        {/* Accent top line */}
        <div
          style={{
            width: 140,
            height: 2,
            backgroundColor: '#d97706',
            marginBottom: 16,
            opacity: 0.85,
          }}
        />

        {/* Main Historical Title */}
        <h1
          style={{
            margin: 0,
            fontFamily: titleFont,
            fontSize,
            fontWeight: 900,
            color: '#fef3c7',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.95), 0 0 30px rgba(217, 119, 6, 0.25)',
          }}
        >
          {activeTitle.text}
        </h1>

        {/* Optional Subtext */}
        {activeTitle.subText && (
          <p
            style={{
              margin: '12px 0 0 0',
              fontFamily: subFont,
              fontSize: 20,
              fontWeight: 600,
              color: '#d4d4d8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            {activeTitle.subText}
          </p>
        )}

        {/* Accent bottom line */}
        <div
          style={{
            width: 140,
            height: 2,
            backgroundColor: '#d97706',
            marginTop: 16,
            opacity: 0.85,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
