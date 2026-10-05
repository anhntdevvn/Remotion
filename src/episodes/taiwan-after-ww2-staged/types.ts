export type Shot = {
  id: string;
  sentenceId: string;
  clipId: string;
  start: number;
  duration: number;
  kind: string;
  locator: string;
  label: string;
  mode: string;
};
export const STAGED_DURATION = 14358;
export const FPS = 30;
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const INK = "#25332f";
export const PAPER = "#eee5d1";
export const RED = "#ae443b";
export const FONT = '"Noto Sans KR", "Malgun Gothic", sans-serif';
