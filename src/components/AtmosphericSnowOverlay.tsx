import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface Snowflake {
  id: number;
  baseX: number;
  speedY: number;
  size: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  phase: number;
}

interface AtmosphericSnowOverlayProps {
  intensity?: 'light' | 'medium' | 'blizzard';
  windDirection?: 'left' | 'right' | 'calm';
}

export const AtmosphericSnowOverlay: React.FC<AtmosphericSnowOverlayProps> = ({
  intensity = 'medium',
  windDirection = 'right',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const flakeCount = intensity === 'light' ? 45 : intensity === 'medium' ? 80 : 130;

  // Generate deterministic pseudo-random snowflakes once
  const flakes: Snowflake[] = useMemo(() => {
    const list: Snowflake[] = [];
    for (let i = 0; i < flakeCount; i++) {
      // Deterministic distribution
      const seed = i * 7919;
      const baseX = ((seed * 9301 + 49297) % 233280) / 233280;
      const speedY = 1.8 + (((seed * 12345 + 1103515245) % 1000) / 1000) * 3.5;
      const size = 1.5 + (((seed * 54321 + 76543) % 1000) / 1000) * 3.2;
      const opacity = 0.25 + (((seed * 99991 + 13) % 1000) / 1000) * 0.55;
      const swayAmplitude = 15 + (((seed * 17 + 29) % 1000) / 1000) * 35;
      const swayFrequency = 0.02 + (((seed * 31 + 47) % 1000) / 1000) * 0.03;
      const phase = (((seed * 43 + 89) % 1000) / 1000) * Math.PI * 2;

      list.push({
        id: i,
        baseX: baseX * width,
        speedY,
        size,
        opacity,
        swayAmplitude,
        swayFrequency,
        phase,
      });
    }
    return list;
  }, [flakeCount, width]);

  const windFactor = windDirection === 'right' ? 1.4 : windDirection === 'left' ? -1.4 : 0.2;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      {/* 1. Subtle dark fog / vignette haze */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(10,15,25,0) 40%, rgba(5,8,15,0.4) 80%, rgba(2,4,8,0.75) 100%)',
        }}
      />

      {/* 2. Floating Snow Particles */}
      {flakes.map((flake) => {
        // Continuous looping Y position
        const totalDistance = height + 80;
        const currentY = ((flake.speedY * frame) % totalDistance) - 40;

        // Organic horizontal drift + wind
        const sway = Math.sin(frame * flake.swayFrequency + flake.phase) * flake.swayAmplitude;
        const windDrift = (frame * windFactor * (flake.speedY / 2.5)) % width;
        const currentX = (flake.baseX + sway + windDrift + width) % width;

        return (
          <div
            key={flake.id}
            style={{
              position: 'absolute',
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(235, 245, 255, 0.85)',
              opacity: flake.opacity,
              boxShadow: `0 0 ${flake.size * 2}px rgba(210, 230, 255, 0.6)`,
              filter: flake.size > 3 ? 'blur(0.8px)' : 'none',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
