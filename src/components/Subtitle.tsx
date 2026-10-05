import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { SubtitleItem } from '../types';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily: subtitleFont } = loadFont('normal', {
  weights: ['500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
});

interface SubtitleProps {
  subtitles: SubtitleItem[];
}

export const Subtitle: React.FC<SubtitleProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();

  const currentSub = subtitles.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame
  );

  if (!currentSub) {
    return null;
  }

  const duration = currentSub.endFrame - currentSub.startFrame;
  const currentOffset = frame - currentSub.startFrame;

  // Gentle fade in / fade out
  const fadeIn = interpolate(currentOffset, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(currentOffset, [duration - 8, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Keep subtitle cards short enough to read on a phone. The source timing is
  // sentence-level, so distribute balanced word groups across that interval.
  const sourceWords = currentSub.text.split(/\s+/);
  const pageCount = Math.max(1, Math.ceil(sourceWords.length / 9));
  const wordsPerPage = Math.ceil(sourceWords.length / pageCount);
  const pages = Array.from({ length: pageCount }, (_, pageIndex) =>
    sourceWords.slice(pageIndex * wordsPerPage, (pageIndex + 1) * wordsPerPage)
  ).filter((page) => page.length > 0);
  const progress = Math.min(0.999, Math.max(0, currentOffset / Math.max(1, duration)));
  const activePage = Math.min(pages.length - 1, Math.floor(progress * pages.length));
  const words = pages[activePage];
  const highlights = currentSub.highlightWords?.map((h) => h.toLowerCase()) || [];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 72,
        zIndex: 40,
      }}
    >
      <div
        style={{
          opacity,
          maxWidth: '1040px',
          padding: '14px 26px',
          backgroundColor: 'rgba(10, 8, 5, 0.82)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: subtitleFont,
            fontSize: 35,
            lineHeight: 1.32,
            fontWeight: 600,
            color: '#f4f4f5',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {words.map((word, i) => {
            const cleanWord = word.replace(/[.,:;?!“”"']/g, '').toLowerCase();
            const isHighlighted = highlights.some((h) =>
              cleanWord.includes(h) || h.includes(cleanWord)
            );

            return (
              <span
                key={`${word}-${i}`}
                style={{
                  display: 'inline-block',
                  margin: '0 3px',
                  color: isHighlighted ? '#fbbf24' : '#f4f4f5',
                  fontWeight: isHighlighted ? 700 : 500,
                  textShadow: isHighlighted
                    ? '0 0 12px rgba(251, 191, 36, 0.4), 0 2px 4px rgba(0,0,0,0.9)'
                    : '0 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </AbsoluteFill>
  );
};
