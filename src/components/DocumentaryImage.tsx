import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SceneImage } from '../types';
import { KenBurnsImage } from './KenBurnsImage';

interface DocumentaryImageProps {
  images: SceneImage[];
}

export const DocumentaryImage: React.FC<DocumentaryImageProps> = ({ images }) => {
  let accumulatedFrame = 0;

  return (
    <AbsoluteFill>
      {images.map((img, index) => {
        const startFrame = accumulatedFrame;
        // Overlap each image by 15 frames for seamless cross-dissolve transition
        const overlap = index > 0 ? 15 : 0;
        const actualStart = Math.max(0, startFrame - overlap);
        const actualDuration = img.durationInFrames + overlap;
        accumulatedFrame += img.durationInFrames;

        return (
          <Sequence
            key={`${img.src}-${index}`}
            from={actualStart}
            durationInFrames={actualDuration}
            name={`Archival-Image-${index + 1}`}
          >
            <KenBurnsImage image={{ ...img, durationInFrames: actualDuration }} fadeDuration={15} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
