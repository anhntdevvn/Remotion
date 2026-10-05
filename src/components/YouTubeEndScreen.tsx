import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadSerif } from '@remotion/google-fonts/PlayfairDisplay';

const { fontFamily: sansFont } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['vietnamese', 'latin'],
});

const { fontFamily: serifFont } = loadSerif('normal', {
  weights: ['700', '900'],
  subsets: ['vietnamese', 'latin'],
});

interface YouTubeEndScreenProps {
  startFrame: number;
}

export const YouTubeEndScreen: React.FC<YouTubeEndScreenProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) {
    return null;
  }

  const localFrame = frame - startFrame;
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 200, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: 80,
        background:
          'linear-gradient(90deg, rgba(8,7,5,0.96) 0%, rgba(12,10,7,0.92) 44%, rgba(8,7,5,0.82) 100%)',
        opacity: interpolate(localFrame, [0, 16], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        padding: '105px 120px 90px',
        color: '#fef3c7',
        fontFamily: sansFont,
      }}
    >
      <div
        style={{
          fontFamily: serifFont,
          fontSize: 56,
          fontWeight: 900,
          letterSpacing: '0.08em',
          textAlign: 'center',
          textShadow: '0 4px 18px rgba(0,0,0,0.9)',
        }}
      >
        TIẾP TỤC KHÁM PHÁ LỊCH SỬ
      </div>

      <div
        style={{
          width: 150,
          height: 3,
          margin: '20px auto 48px',
          backgroundColor: '#d97706',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 100,
          opacity: entrance,
          translate: `0 ${interpolate(entrance, [0, 1], [24, 0])}px`,
        }}
      >
        <div style={{ width: 360, textAlign: 'center' }}>
          <div
            style={{
              width: 160,
              height: 160,
              margin: '0 auto 22px',
              borderRadius: '50%',
              border: '4px solid #f59e0b',
              backgroundColor: 'rgba(217,119,6,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.12em',
              boxShadow: '0 0 35px rgba(217,119,6,0.25)',
            }}
          >
            ĐĂNG KÝ
          </div>
          <div style={{ fontSize: 22, color: '#e4e4e7', letterSpacing: '0.06em' }}>
            Đón xem những câu chuyện tiếp theo
          </div>
        </div>

        <div>
          <div
            style={{
              width: 640,
              height: 360,
              border: '3px solid rgba(245,158,11,0.78)',
              background:
                'radial-gradient(circle at center, rgba(217,119,6,0.22), rgba(10,8,5,0.88) 68%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 42px rgba(0,0,0,0.6)',
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.14em' }}>
              VIDEO TIẾP THEO
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
