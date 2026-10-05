import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SceneImage } from '../types';
import { BreathingImage } from './BreathingImage';

interface BreathingImageSequenceProps {
  images: SceneImage[];
  fadeDuration?: number;
  breathingPeriodInFrames?: number;
  amplitude?: number;
}

export const BreathingImageSequence: React.FC<BreathingImageSequenceProps> = ({
  images,
  fadeDuration = 24,
  breathingPeriodInFrames = 260,
  amplitude = 0.02,
}) => {
  let accumulatedFrame = 0;

  return (
    <AbsoluteFill>
      {images.map((img, index) => {
        const startFrame = accumulatedFrame;
        // Overlap each image by fadeDuration for a slow, photographic cross-dissolve
        const overlap = index > 0 ? fadeDuration : 0;
        const actualStart = Math.max(0, startFrame - overlap);
        const actualDuration = img.durationInFrames + overlap;
        accumulatedFrame += img.durationInFrames;

        return (
          <Sequence
            key={`${img.src}-${index}`}
            from={actualStart}
            durationInFrames={actualDuration}
            name={`Breathing-Plate-${index + 1}`}
          >
            <BreathingImage
              image={{ ...img, durationInFrames: actualDuration }}
              fadeDuration={fadeDuration}
              breathingPeriodInFrames={breathingPeriodInFrames}
              amplitude={amplitude}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
