export const DURATION = 14358;
export const FONT = '"Noto Sans CJK KR", "Noto Sans KR", sans-serif';
export const INK = "#101820";
export const PAPER = "#E2D2AD";
export const RED = "#B83D38";
export const GOLD = "#D5AD55";
export const C = {
  ink: INK,
  paper: PAPER,
  cream: "#F1E6CC",
  red: RED,
  gold: GOLD,
  blue: "#294B70",
  teal: "#3C6865",
  olive: "#59624B",
};
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export type Grammar =
  | "document"
  | "timeline"
  | "formation"
  | "industry"
  | "portrait"
  | "meeting"
  | "handover"
  | "signing"
  | "queue"
  | "procedure"
  | "street"
  | "debate"
  | "map"
  | "choices"
  | "ballot"
  | "fleet"
  | "rebuild"
  | "hall"
  | "empty-seats"
  | "closure"
  | "ending";
export type Beat = {
  id: string;
  sceneId: string;
  sentenceId: string;
  clipId: string;
  start: number;
  duration: number;
  grammar: Grammar;
  mode: string;
  kicker: string;
  hook?: string;
  hookVi?: string;
  action: string;
  target: string;
  shot: string;
};
