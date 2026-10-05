import type {SubtitleItem} from '../../types';

/** Resolve sound-design beats from the generated narration captions.
 * This keeps SFX attached to spoken events after a script or TTS timing change.
 */
export const findNarrationFrame = (
  subtitles: SubtitleItem[],
  pattern: RegExp,
  fallback: number,
  offset = 0,
) => {
  // Prefer the tightest possible match, then expand only when a phrase is
  // split by the caption chunker.
  for (let windowSize = 1; windowSize <= 4; windowSize++) {
    for (let index = 0; index < subtitles.length; index++) {
      const windowText = subtitles
        .slice(index, index + windowSize)
        .map((subtitle) => subtitle.text)
        .join(' ');
      pattern.lastIndex = 0;
      if (pattern.test(windowText)) {
        return Math.max(0, subtitles[index].startFrame + offset);
      }
    }
  }
  return Math.max(0, fallback + offset);
};
