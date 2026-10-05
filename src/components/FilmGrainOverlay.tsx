import React from 'react';
import { AbsoluteFill, useCurrentFrame, random } from 'remotion';

export const FilmGrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle film flicker (vintage projector luminance variation)
  const flicker = 0.96 + random(`flicker-${frame}`) * 0.08;

  // Occasional vintage hair/dust scratch
  const showScratch = random(`scratch-show-${frame}`) > 0.88;
  const scratchX = random(`scratch-pos-${frame}`) * 100;
  const scratchWidth = 1 + random(`scratch-w-${frame}`) * 1.5;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 50,
        opacity: flicker,
      }}
    >
      {/* 1. Heavy vintage vignette around the perimeter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(15,10,5,0.45) 80%, rgba(5,3,1,0.88) 100%)',
        }}
      />

      {/* 2. Warm sepia / archive documentary tint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(92, 60, 24, 0.08)',
          mixBlendMode: 'color-burn',
        }}
      />

      {/* 3. Subtle old film grain noise via SVG filter */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.13,
          mixBlendMode: 'overlay',
        }}
      >
        <filter id={`film-noise-${frame % 12}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            seed={frame % 24}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#film-noise-${frame % 12})`}
        />
      </svg>

      {/* 4. Film projector vertical scratch lines that jump */}
      {showScratch && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${scratchX}%`,
            width: `${scratchWidth}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* 5. Subtle frame border / archival photographic edge */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255, 230, 180, 0.08)',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)',
        }}
      />
    </AbsoluteFill>
  );
};
