import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  Img,
} from 'remotion';
import { MapHighlight } from '../types';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['vietnamese', 'latin'],
});

interface HistoricalMapProps {
  mapSrc?: string;
  highlights?: MapHighlight[];
  title?: string;
}

export const HistoricalMap: React.FC<HistoricalMapProps> = ({
  mapSrc = 'images/dien-bien-phu-map.png',
  highlights = [],
  title = 'BẢN ĐỒ TẬP ĐOÀN CỨ ĐIỂM ĐIỆN BIÊN PHỦ',
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#13110e', overflow: 'hidden' }}>
      {/* Vintage parchment/map background image with subtle slow pan */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          transform: `scale(${interpolate(frame, [0, 600], [1.02, 1.08], {
            extrapolateRight: 'clamp',
          })})`,
        }}
      >
        <Img
          src={staticFile(mapSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'sepia(0.35) contrast(1.1) brightness(0.95)',
          }}
        />
      </div>

      {/* Map title badge in upper-left */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          padding: '10px 20px',
          backgroundColor: 'rgba(15, 12, 8, 0.85)',
          borderLeft: '4px solid #d97706',
          borderRadius: '0 4px 4px 0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: 700,
            color: '#fef3c7',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
      </div>

      {/* Animated Strongpoint Highlights */}
      {highlights.map((h, i) => {
        const reveal = h.revealFrame || 0;
        if (frame < reveal) return null;

        const offset = frame - reveal;
        const opacity = interpolate(offset, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const pulse = 1 + Math.sin(frame * 0.15) * 0.15;

        return (
          <div
            key={`${h.name}-${i}`}
            style={{
              position: 'absolute',
              left: `${h.xPercent}%`,
              top: `${h.yPercent}%`,
              transform: 'translate(-50%, -50%)',
              opacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Pulsing ring target */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: h.color || 'rgba(239, 68, 68, 0.8)',
                boxShadow: `0 0 16px ${h.color || '#ef4444'}`,
                transform: `scale(${pulse})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>

            {/* Tactical Name Label */}
            <div
              style={{
                marginTop: 6,
                padding: '4px 10px',
                backgroundColor: 'rgba(10, 8, 5, 0.85)',
                border: `1px solid ${h.color || '#ef4444'}`,
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              <span
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                {h.name}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
