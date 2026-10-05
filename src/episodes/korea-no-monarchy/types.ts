export const FONT='"Noto Sans CJK KR", "Noto Sans KR", sans-serif';
export const C={ink:'#101B23',cream:'#F2E6CC',paper:'#DCCCAB',gold:'#D7B063',red:'#BA423B',blue:'#34576E',teal:'#426562',olive:'#5B644C'};
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export type KoreaBeat={id:string;scriptId:string;chapter:string;grammar:string;mode:string;ko:string;vi:string;refStart:number;sources:string[];action:string;target:string;shot:string;startFrame:number;voiceFrames:number;durationInFrames:number;durationSec:number;file:string;sha256:string};
