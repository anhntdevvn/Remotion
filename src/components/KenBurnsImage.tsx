import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import { SceneImage } from '../types';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily: captionFont } = loadFont('normal', {
  weights: ['400', '600'],
  subsets: ['vietnamese', 'latin'],
});

interface KenBurnsImageProps {
  image: SceneImage;
  fadeDuration?: number;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  image,
  fadeDuration = 18,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    src,
    caption,
    panDirection = 'zoom-in',
    scaleStart = 1.04,
    scaleEnd = 1.12,
    durationInFrames,
  } = image;

  // Soft fade in at start and fade out at end for natural photographic dissolve
  const fadeIn = interpolate(frame, [0, fadeDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeDuration, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Ken Burns subtle scale and pan calculation
  let scale = scaleStart;
  let translateX = 0;
  let translateY = 0;

  if (panDirection === 'zoom-in') {
    scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (panDirection === 'zoom-out') {
    scale = interpolate(frame, [0, durationInFrames], [scaleEnd, scaleStart], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (panDirection === 'pan-right') {
    scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    translateX = interpolate(frame, [0, durationInFrames], [-2, 2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (panDirection === 'pan-left') {
    scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    translateX = interpolate(frame, [0, durationInFrames], [2, -2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (panDirection === 'pan-up') {
    scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    translateY = interpolate(frame, [0, durationInFrames], [2, -2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Subtle caption slide-in
  const captionSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200, mass: 0.8 },
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#090807', opacity }}>
      {/* Fullscreen Archival Image with smooth Ken Burns movement */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 38%',
            // Authentic historical documentary treatment: gentle sepia tint, contrast adjustment
            filter: 'contrast(1.1) brightness(0.92) sepia(0.22)',
          }}
        />
      </div>

      {/* Archival caption label positioned cleanly in top-left under date marker */}
      {caption && (
        <div
          style={{
            position: 'absolute',
            top: 115,
            left: 60,
            maxWidth: 540,
            padding: '8px 16px',
            backgroundColor: 'rgba(10, 8, 5, 0.8)',
            borderLeft: '3px solid #d97706',
            borderRadius: '0 4px 4px 0',
            backdropFilter: 'blur(6px)',
            opacity: interpolate(captionSpring, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(captionSpring, [0, 1], [-15, 0])}px)`,
            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              color: '#d4d4d8',
              fontSize: 16,
              fontFamily: captionFont,
              fontWeight: 500,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            {caption}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
