export interface SubtitleItem {
  id: string;
  startFrame: number;
  endFrame: number;
  text: string;
  highlightWords?: string[];
}

export interface SceneImage {
  src: string;
  caption?: string;
  panDirection?: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-down';
  scaleStart?: number;
  scaleEnd?: number;
  durationInFrames: number;
}

export interface LowerThirdInfo {
  name: string;
  title: string;
  startFrame: number;
  durationInFrames: number;
}

export interface MapHighlight {
  name: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  color?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  revealFrame?: number;
}

export interface SceneData {
  id: string;
  title: string;
  startFrame: number;
  durationInFrames: number;
  voiceoverAudio?: string;
  bgAudio?: string;
  sfxAudio?: string;
  images: SceneImage[];
  subtitles: SubtitleItem[];
  keyTitles?: {
    text: string;
    subText?: string;
    startFrame: number;
    durationInFrames: number;
    size?: 'large' | 'medium' | 'huge';
  }[];
  lowerThird?: LowerThirdInfo;
  mapHighlights?: MapHighlight[];
  dateMarker?: {
    date: string;
    location?: string;
    startFrame: number;
    durationInFrames: number;
  };
}
