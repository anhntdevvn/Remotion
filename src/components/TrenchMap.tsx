import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  Img,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont('normal', {
  weights: ['700'],
  subsets: ['vietnamese', 'latin'],
});

export const TrenchMap: React.FC = () => {
  const frame = useCurrentFrame();

  // Trench siege expansion progress (0 to 1)
  const trenchProgress = interpolate(frame, [40, 550], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = 1 + Math.sin(frame * 0.12) * 0.08;

  return (
    <AbsoluteFill style={{ backgroundColor: '#e2dcce', overflow: 'hidden' }}>
      {/* Base Tactical Map with Parchment Texture */}
      <div
        style={{
          position: 'absolute',
          inset: -30,
          transform: `scale(${interpolate(frame, [0, 750], [1.02, 1.07], {
            extrapolateRight: 'clamp',
          })})`,
        }}
      >
        <Img
          src={staticFile('images/dien-bien-phu-battle-map-1954.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'contrast(1.1) brightness(0.92) sepia(0.15)',
          }}
        />
      </div>

      {/* Animated SVG Siege Trench Networks Tightening Inward */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 1920 1080"
      >
        <defs>
          <radialGradient id="siegeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central pressure zone on Muong Thanh */}
        <circle
          cx="960"
          cy="480"
          r={190 * pulse}
          fill="url(#siegeGlow)"
        />

        {/* Outer and Inner Trenches Constricting */}
        {/* Trench Route North from Doc Lap into central zone */}
        <path
          d="M 680,180 Q 750,280 820,380 T 920,440"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="5"
          strokeDasharray="14 7"
          strokeDashoffset={-frame * 2}
          opacity={interpolate(trenchProgress, [0, 0.4], [0, 0.95])}
        />

        {/* Trench Route Northeast from Him Lam into airstrip */}
        <path
          d="M 1240,240 Q 1120,340 1020,420 T 980,470"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="5"
          strokeDasharray="14 7"
          strokeDashoffset={-frame * 2}
          opacity={interpolate(trenchProgress, [0.1, 0.6], [0, 0.95])}
        />

        {/* Trench Route East into Hill A1 */}
        <path
          d="M 1320,520 Q 1150,520 1040,500 T 990,490"
          fill="none"
          stroke="#dc2626"
          strokeWidth="6"
          strokeDasharray="12 6"
          strokeDashoffset={-frame * 2.5}
          opacity={interpolate(trenchProgress, [0.2, 0.8], [0, 1])}
        />

        {/* Trench Route South isolating Isabelle (Hong Cum) */}
        <path
          d="M 850,880 Q 900,720 940,580 T 955,510"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="5"
          strokeDasharray="14 7"
          strokeDashoffset={-frame * 2}
          opacity={interpolate(trenchProgress, [0.3, 0.9], [0, 0.95])}
        />

        {/* Tightening Siege Ellipse Around Central Airfield */}
        <ellipse
          cx="960"
          cy="470"
          rx={interpolate(trenchProgress, [0, 1], [360, 130])}
          ry={interpolate(trenchProgress, [0, 1], [250, 95])}
          fill="none"
          stroke="#dc2626"
          strokeWidth="4.5"
          strokeDasharray="10 5"
          opacity={interpolate(trenchProgress, [0.2, 1], [0, 1])}
        />
      </svg>

      {/* Status Overlay Badge */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          padding: '14px 26px',
          backgroundColor: 'rgba(15, 12, 8, 0.9)',
          borderLeft: '5px solid #ef4444',
          borderRadius: '0 4px 4px 0',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 17,
            fontWeight: 700,
            color: '#f87171',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          HỆ THỐNG CHIẾN HÀO VÂY LẤN TẤN CÔNG
        </span>
        <div style={{ marginTop: 4 }}>
          <span style={{ fontSize: 13, color: '#d4d4d8', fontFamily: 'sans-serif' }}>
            Siết chặt thung lũng Mường Thanh & cô lập cứ điểm
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
