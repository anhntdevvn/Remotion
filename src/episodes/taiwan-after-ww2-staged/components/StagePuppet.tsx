// Independent V3 rig snapshot. Do not import or mutate the preserved episode rig.
import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type CharacterExpression =
  | "neutral"
  | "stern"
  | "concerned"
  | "surprised"
  | "warm";

export type CharacterPose =
  | "neutral"
  | "explain-left"
  | "explain-right"
  | "point-left"
  | "point-right"
  | "salute"
  | "hold-document"
  | "hands-behind"
  | "march"
  | "rifle-ready"
  | "rifle-aim-left"
  | "rifle-aim-right"
  | "spear-ready"
  | "pass-left"
  | "pass-right"
  | "arms-raised"
  | "write"
  | "read"
  | "carry";

export type CharacterProp =
  | "none"
  | "rifle"
  | "spear"
  | "sword"
  | "placard"
  | "box"
  | "folder"
  | "pen";

export type CharacterOutfit =
  | "civilian"
  | "qing-official"
  | "dark-suit"
  | "light-suit"
  | "japanese-officer"
  | "japanese-soldier"
  | "roc-officer"
  | "roc-soldier"
  | "prc-officer"
  | "us-officer";

export type CharacterHair =
  | "side-part"
  | "slick"
  | "crop"
  | "silver"
  | "bald"
  | "waves";

export type CharacterHat =
  | "none"
  | "qing-cap"
  | "officer-khaki"
  | "officer-olive"
  | "field-khaki"
  | "field-olive";

export type StagePuppetProps = {
  outfit?: CharacterOutfit;
  hair?: CharacterHair;
  hat?: CharacterHat;
  expression?: CharacterExpression;
  pose?: CharacterPose;
  skin?: string;
  hairColor?: string;
  glasses?: boolean;
  moustache?: boolean;
  speaking?: boolean;
  gaze?: -1 | 0 | 1;
  enterFrame?: number;
  motionOffset?: number;
  flip?: boolean;
  label?: string;
  prop?: CharacterProp;
  style?: React.CSSProperties;
  facing?: "front" | "profile" | "back";
  seated?: boolean;
  handsOnly?: boolean;
  walking?: boolean;
};

const OUTFITS: Record<
  CharacterOutfit,
  {
    body: string;
    bodyDark: string;
    shirt: string;
    tie: string;
    military: boolean;
    trim: string;
  }
> = {
  "qing-official": {
    body: "#4b5965",
    bodyDark: "#29383f",
    shirt: "#cfba91",
    tie: "#4b5965",
    military: false,
    trim: "#c5a45e",
  },
  civilian: {
    body: "#53626A",
    bodyDark: "#2F3B41",
    shirt: "#E8DDCA",
    tie: "#8E3D34",
    military: false,
    trim: "#C6A45C",
  },
  "dark-suit": {
    body: "#202B38",
    bodyDark: "#111923",
    shirt: "#F2EBDD",
    tie: "#A13F38",
    military: false,
    trim: "#D8B96D",
  },
  "light-suit": {
    body: "#B8AA91",
    bodyDark: "#756B5B",
    shirt: "#F3ECDF",
    tie: "#27466D",
    military: false,
    trim: "#D1AD58",
  },
  "japanese-officer": {
    body: "#6B6250",
    bodyDark: "#3F3A30",
    shirt: "#D7C8AA",
    tie: "#3B3228",
    military: true,
    trim: "#D4B25F",
  },
  "japanese-soldier": {
    body: "#81785B",
    bodyDark: "#4B4736",
    shirt: "#B9AD88",
    tie: "#514936",
    military: true,
    trim: "#D5B466",
  },
  "roc-officer": {
    body: "#3E553F",
    bodyDark: "#263728",
    shirt: "#BDBA93",
    tie: "#25372A",
    military: true,
    trim: "#D7B64E",
  },
  "roc-soldier": {
    body: "#53694A",
    bodyDark: "#31422D",
    shirt: "#C0BE94",
    tie: "#34442F",
    military: true,
    trim: "#D7B64E",
  },
  "prc-officer": {
    body: "#50634F",
    bodyDark: "#2E3D30",
    shirt: "#9FA889",
    tie: "#4A3F32",
    military: true,
    trim: "#CFA63F",
  },
  "us-officer": {
    body: "#8C8060",
    bodyDark: "#514A39",
    shirt: "#D8CFB2",
    tie: "#443A2D",
    military: true,
    trim: "#E1C977",
  },
};

type ArmJoints = {
  shoulder: [number, number];
  elbow: [number, number];
  wrist: [number, number];
  pointing?: "left" | "right";
};

const mirrorJoints = (joints: ArmJoints): ArmJoints => ({
  shoulder: [300 - joints.shoulder[0], joints.shoulder[1]],
  elbow: [300 - joints.elbow[0], joints.elbow[1]],
  wrist: [300 - joints.wrist[0], joints.wrist[1]],
  pointing:
    joints.pointing === "left"
      ? "right"
      : joints.pointing === "right"
        ? "left"
        : undefined,
});

const neutralLeft: ArmJoints = {
  shoulder: [88, 290],
  elbow: [65, 365],
  wrist: [74, 452],
};

const getArmJoints = (
  pose: CharacterPose,
  side: "left" | "right",
): ArmJoints => {
  const left = side === "left";
  const inactive = left ? neutralLeft : mirrorJoints(neutralLeft);

  if (pose === "write")
    return left
      ? { shoulder: [88, 290], elbow: [60, 357], wrist: [106, 397] }
      : { shoulder: [212, 290], elbow: [240, 340], wrist: [196, 393] };
  if (pose === "read" || pose === "carry")
    return left
      ? { shoulder: [88, 290], elbow: [62, 351], wrist: [113, 376] }
      : { shoulder: [212, 290], elbow: [238, 351], wrist: [187, 376] };
  if (pose === "hands-behind") {
    const joints: ArmJoints = {
      shoulder: [88, 290],
      elbow: [70, 365],
      wrist: [119, 421],
    };
    return left ? joints : mirrorJoints(joints);
  }
  if (pose === "hold-document") {
    const joints: ArmJoints = {
      shoulder: [88, 290],
      elbow: [65, 354],
      wrist: [113, 407],
    };
    return left ? joints : mirrorJoints(joints);
  }
  if (pose === "salute") {
    if (left) return inactive;
    return { shoulder: [212, 290], elbow: [238, 247], wrist: [194, 178] };
  }
  if (pose === "explain-left") {
    if (!left) return inactive;
    return { shoulder: [88, 290], elbow: [48, 318], wrist: [24, 260] };
  }
  if (pose === "explain-right") {
    if (left) return inactive;
    return mirrorJoints({
      shoulder: [88, 290],
      elbow: [48, 318],
      wrist: [24, 260],
    });
  }
  if (pose === "point-left") {
    if (!left) return inactive;
    return {
      shoulder: [88, 290],
      elbow: [53, 326],
      wrist: [25, 307],
      pointing: "left",
    };
  }
  if (pose === "point-right") {
    if (left) return inactive;
    return mirrorJoints({
      shoulder: [88, 290],
      elbow: [53, 326],
      wrist: [25, 307],
      pointing: "left",
    });
  }
  if (pose === "march") {
    const joints: ArmJoints = left
      ? { shoulder: [88, 290], elbow: [61, 344], wrist: [96, 405] }
      : { shoulder: [212, 290], elbow: [239, 338], wrist: [212, 398] };
    return joints;
  }
  if (pose === "rifle-ready") {
    return left
      ? { shoulder: [88, 290], elbow: [74, 340], wrist: [116, 365] }
      : { shoulder: [212, 290], elbow: [224, 338], wrist: [184, 374] };
  }
  if (pose === "rifle-aim-left") {
    return left
      ? { shoulder: [88, 290], elbow: [53, 302], wrist: [23, 288] }
      : { shoulder: [212, 290], elbow: [170, 307], wrist: [116, 295] };
  }
  if (pose === "rifle-aim-right") {
    return left
      ? { shoulder: [88, 290], elbow: [130, 307], wrist: [184, 295] }
      : { shoulder: [212, 290], elbow: [247, 302], wrist: [277, 288] };
  }
  if (pose === "spear-ready") {
    return left
      ? { shoulder: [88, 290], elbow: [64, 330], wrist: [102, 370] }
      : { shoulder: [212, 290], elbow: [231, 350], wrist: [205, 405] };
  }
  if (pose === "pass-left") {
    return left
      ? { shoulder: [88, 290], elbow: [55, 323], wrist: [25, 315] }
      : { shoulder: [212, 290], elbow: [178, 325], wrist: [128, 328] };
  }
  if (pose === "pass-right") {
    return left
      ? { shoulder: [88, 290], elbow: [122, 325], wrist: [172, 328] }
      : { shoulder: [212, 290], elbow: [245, 323], wrist: [275, 315] };
  }
  if (pose === "arms-raised") {
    return left
      ? { shoulder: [88, 290], elbow: [55, 240], wrist: [72, 178] }
      : { shoulder: [212, 290], elbow: [245, 240], wrist: [228, 178] };
  }
  return inactive;
};

const HandProp: React.FC<{ prop: CharacterProp; pose: CharacterPose }> = ({
  prop,
  pose,
}) => {
  if (prop === "none") return null;
  if (prop === "rifle") {
    const aimLeft = pose === "rifle-aim-left";
    const aimRight = pose === "rifle-aim-right";
    const transform = aimLeft
      ? "translate(116 285) scale(-1 1) rotate(-4)"
      : aimRight
        ? "translate(184 285) rotate(-4)"
        : "translate(67 348) rotate(7.5)";
    return (
      <g transform={transform}>
        <path
          d="M0 10H205"
          stroke="#20272B"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path d="M130 10L198 10" stroke="#6D7475" strokeWidth="6" />
        <path
          d="M20 9L74 -7L118 3L105 22L55 28Z"
          fill="#704A32"
          stroke="#172027"
          strokeWidth="6"
        />
        <path d="M115 8L139 42" stroke="#4B362A" strokeWidth="10" />
        <path d="M202 10L224 10" stroke="#B9C3C3" strokeWidth="5" />
        <path
          d="M224 10L248 -4L239 10L248 24Z"
          fill="#C7CFCE"
          stroke="#172027"
          strokeWidth="4"
        />
      </g>
    );
  }
  if (prop === "spear")
    return (
      <g transform="translate(92 78) rotate(-10)">
        <path d="M15 0V390" stroke="#5A3D2A" strokeWidth="12" />
        <path
          d="M15 0L-7 52L15 40L37 52Z"
          fill="#AAB3B4"
          stroke="#172027"
          strokeWidth="5"
        />
      </g>
    );
  if (prop === "sword")
    return (
      <g transform="translate(135 332) rotate(20)">
        <path d="M10 0V150" stroke="#BFC8C9" strokeWidth="13" />
        <path d="M-20 12H40" stroke="#D2A84C" strokeWidth="12" />
        <path
          d="M10 150L-2 182H22Z"
          fill="#BFC8C9"
          stroke="#172027"
          strokeWidth="5"
        />
      </g>
    );
  if (prop === "placard")
    return (
      <g transform="translate(55 38)">
        <path d="M95 130V430" stroke="#5E442F" strokeWidth="12" />
        <rect
          x="0"
          y="0"
          width="190"
          height="140"
          rx="8"
          fill="#EFE6CF"
          stroke="#172027"
          strokeWidth="8"
        />
        <path
          d="M28 42H162M28 72H142M28 102H158"
          stroke="#B33E39"
          strokeWidth="11"
        />
      </g>
    );
  if (prop === "pen")
    return (
      <g transform="translate(196 393) rotate(30)">
        <path d="M0 -38V23" stroke="#19232B" strokeWidth="9" />
        <path d="M0 23L-4 33L4 33Z" fill="#D5AE62" />
      </g>
    );
  if (prop === "box")
    return (
      <g transform="translate(95 338)">
        <rect
          width="110"
          height="94"
          fill="#A77B4D"
          stroke="#172027"
          strokeWidth="7"
        />
        <path d="M0 30H110M55 0V94" stroke="#D4B77C" strokeWidth="5" />
      </g>
    );
  const wrist = getArmJoints(
    pose,
    pose === "pass-left" ? "left" : "right",
  ).wrist;
  const x = pose === "pass-right" || pose === "pass-left" ? wrist[0] - 42 : 90;
  const y = pose === "pass-right" || pose === "pass-left" ? wrist[1] - 28 : 340;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="100"
        height="80"
        rx="4"
        fill="#D5BA79"
        stroke="#172027"
        strokeWidth="7"
      />
      <path d="M15 28H84M15 48H72M15 64H58" stroke="#6A5B41" strokeWidth="5" />
    </g>
  );
};

const Hat: React.FC<{ type: CharacterHat; trim: string }> = ({
  type,
  trim,
}) => {
  if (type === "none") return null;
  if (type === "qing-cap")
    return (
      <g>
        <path
          d="M70 143Q79 67 150 67Q221 67 230 143Z"
          fill="#29383f"
          stroke="#172027"
          strokeWidth="7"
        />
        <path d="M76 143H224" stroke="#bb5341" strokeWidth="18" />
        <circle cx="150" cy="68" r="12" fill="#c09851" />
      </g>
    );
  const olive = type.includes("olive");
  const officer = type.includes("officer");
  const fill = olive ? "#42513B" : "#9C9271";
  const dark = olive ? "#253126" : "#5D5643";
  if (!officer) {
    return (
      <g>
        <path
          d="M75 115 Q150 67 225 115 L218 150 Q150 137 82 150Z"
          fill={fill}
          stroke="#172027"
          strokeWidth="7"
        />
        <path
          d="M72 143 Q150 125 228 143 L220 159 Q150 151 80 159Z"
          fill={dark}
        />
        <circle cx="150" cy="116" r="10" fill={trim} />
      </g>
    );
  }
  return (
    <g>
      <path
        d="M72 115 Q150 73 228 115 L214 148 H86Z"
        fill={fill}
        stroke="#172027"
        strokeWidth="7"
      />
      <path
        d="M65 143 Q150 124 235 143 Q223 166 150 164 Q77 166 65 143Z"
        fill={dark}
        stroke="#172027"
        strokeWidth="6"
      />
      <path d="M137 112 H163 L171 133 H129Z" fill={trim} />
      <circle cx="150" cy="124" r="6" fill="#A83232" />
    </g>
  );
};

const Hair: React.FC<{ type: CharacterHair; color: string }> = ({
  type,
  color,
}) => {
  if (type === "bald")
    return (
      <path
        d="M92 113 Q150 82 208 113"
        fill="none"
        stroke={color}
        strokeWidth="8"
        opacity=".3"
      />
    );
  if (type === "crop")
    return (
      <path
        d="M82 129 Q91 78 150 76 Q209 78 218 129 L200 116 Q150 96 100 116Z"
        fill={color}
      />
    );
  if (type === "slick")
    return (
      <path
        d="M77 135 Q81 77 145 72 Q206 69 224 119 Q183 106 156 100 Q122 120 77 135Z"
        fill={color}
      />
    );
  if (type === "silver")
    return (
      <path
        d="M76 139 Q76 82 139 74 Q205 65 226 126 L205 112 L193 91 L172 108 L149 87 L124 108 L99 94Z"
        fill={color}
      />
    );
  if (type === "waves")
    return (
      <path
        d="M74 140 Q70 84 116 76 Q147 55 174 76 Q218 78 227 132 Q207 116 193 125 Q171 100 151 119 Q126 96 108 123 Q91 112 74 140Z"
        fill={color}
      />
    );
  return (
    <path
      d="M75 139 Q75 82 138 74 Q199 65 226 121 Q194 111 171 94 Q139 119 102 113 L88 145Z"
      fill={color}
    />
  );
};

const Arm: React.FC<{
  side: "left" | "right";
  pose: CharacterPose;
  body: string;
  bodyDark: string;
  skin: string;
  wave: number;
}> = ({ side, pose, body, bodyDark, skin, wave }) => {
  const joints = getArmJoints(pose, side);
  const [sx, sy] = joints.shoulder;
  const [ex, ey] = joints.elbow;
  const [wx, baseWy] = joints.wrist;
  const wy = baseWy + wave;
  const pointingHand =
    joints.pointing === "left"
      ? `M${wx + 12} ${wy - 17} Q${wx - 2} ${wy - 19} ${wx - 8} ${wy - 9} L4 ${wy - 9} Q0 ${wy} 4 ${wy + 9} L${wx - 8} ${wy + 9} Q${wx - 2} ${wy + 19} ${wx + 12} ${wy + 17}Z`
      : joints.pointing === "right"
        ? `M${wx - 12} ${wy - 17} Q${wx + 2} ${wy - 19} ${wx + 8} ${wy - 9} L296 ${wy - 9} Q300 ${wy} 296 ${wy + 9} L${wx + 8} ${wy + 9} Q${wx + 2} ${wy + 19} ${wx - 12} ${wy + 17}Z`
        : null;
  return (
    <g>
      <path
        d={`M${sx} ${sy} L${ex} ${ey}`}
        fill="none"
        stroke="#172027"
        strokeWidth="52"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M${sx} ${sy} L${ex} ${ey}`}
        fill="none"
        stroke={body}
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M${ex} ${ey} L${wx} ${wy}`}
        fill="none"
        stroke="#172027"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M${ex} ${ey} L${wx} ${wy}`}
        fill="none"
        stroke={bodyDark}
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pointingHand ? (
        <path
          d={pointingHand}
          fill={skin}
          stroke="#172027"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      ) : (
        <circle
          cx={wx}
          cy={wy}
          r="19"
          fill={skin}
          stroke="#172027"
          strokeWidth="7"
        />
      )}
    </g>
  );
};

export const StagePuppet: React.FC<StagePuppetProps> = ({
  outfit = "dark-suit",
  hair = "side-part",
  hat = "none",
  expression = "neutral",
  pose = "neutral",
  skin = "#D6A27E",
  hairColor = "#20242A",
  glasses = false,
  moustache = false,
  speaking = false,
  gaze = 0,
  enterFrame = 0,
  motionOffset = 0,
  flip = false,
  label,
  prop = "none",
  style,
  facing = "front",
  seated = false,
  handsOnly = false,
  walking = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = useId().replace(/:/g, "");
  const outfitStyle = OUTFITS[outfit];
  // enterFrame is retained for independently editable staging cues.
  void enterFrame;
  const blinkPhase = (frame + motionOffset * 17) % 127;
  const eyesOpen = blinkPhase > 4;
  const talkPhase = Math.floor((frame + motionOffset * 5) / 4) % 3;
  const idle = Math.sin(((frame + motionOffset * 11) / fps) * Math.PI * 1.25);
  const armWave = speaking
    ? Math.sin(((frame + motionOffset * 7) / fps) * Math.PI * 2.2) * 3
    : 0;
  const marchCycle = walking
    ? Math.sin(((frame + motionOffset * 5) / fps) * Math.PI * 4) * 9
    : 0;
  const browTilt =
    expression === "concerned" ? 7 : expression === "stern" ? -5 : 0;
  const mouth = speaking
    ? talkPhase === 0
      ? "M132 226 Q150 239 168 226 Q150 260 132 226Z"
      : talkPhase === 1
        ? "M132 229 Q150 242 168 229"
        : "M139 228 Q150 247 161 228 Q150 258 139 228Z"
    : expression === "warm"
      ? "M132 228 Q150 247 168 228"
      : expression === "surprised"
        ? "M142 226 Q150 218 158 226 Q160 247 150 251 Q140 247 142 226Z"
        : expression === "concerned"
          ? "M133 242 Q150 226 167 242"
          : "M136 234 H164";

  // Foreground hand pass allows the desk to occlude the torso without hiding the pen.
  if (handsOnly)
    return (
      <div style={{ position: "absolute", width: 300, height: 560, ...style }}>
        <svg
          viewBox="0 0 300 560"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <Arm
            side="left"
            pose={pose}
            body={outfitStyle.body}
            bodyDark={outfitStyle.bodyDark}
            skin={skin}
            wave={0}
          />
          <Arm
            side="right"
            pose={pose}
            body={outfitStyle.body}
            bodyDark={outfitStyle.bodyDark}
            skin={skin}
            wave={0}
          />
          <HandProp prop={prop} pose={pose} />
          {(["left", "right"] as const).map((side) => {
            const { wrist } = getArmJoints(pose, side);
            return (
              <circle
                key={side}
                cx={wrist[0]}
                cy={wrist[1]}
                r="16"
                fill={skin}
                stroke="#172027"
                strokeWidth="6"
              />
            );
          })}
        </svg>
      </div>
    );
  return (
    <div
      style={{
        position: "absolute",
        width: 300,
        height: 560,
        opacity: 1,
        translate: `0 ${idle * 0.7}px`,
        scale: `${flip ? -1 : 1} 1`,
        transformOrigin: "50% 100%",
        filter: "drop-shadow(0 24px 22px rgba(8,12,16,.28))",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 300 560"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
        aria-label={label}
      >
        <defs>
          <linearGradient id={`${id}-body`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={outfitStyle.body} />
            <stop offset="1" stopColor={outfitStyle.bodyDark} />
          </linearGradient>
          <linearGradient id={`${id}-skin`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={skin} />
            <stop offset="1" stopColor="#B97E61" />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="532" rx="104" ry="18" fill="rgba(4,8,12,.22)" />
        <g opacity={seated ? 0 : 1} transform={`translate(0 ${marchCycle})`}>
          <path
            d="M92 410 H142 V520 Q142 538 125 538 H91 Q76 538 78 520Z"
            fill={outfitStyle.bodyDark}
            stroke="#172027"
            strokeWidth="8"
          />
        </g>
        <g opacity={seated ? 0 : 1} transform={`translate(0 ${-marchCycle})`}>
          <path
            d="M158 410 H208 L222 520 Q224 538 209 538 H175 Q158 538 158 520Z"
            fill={outfitStyle.bodyDark}
            stroke="#172027"
            strokeWidth="8"
          />
        </g>
        <path
          d={
            outfit === "qing-official"
              ? "M68 278Q77 252 108 244H192Q223 252 232 278L229 524H71Z"
              : "M68 278 Q77 252 108 244 H192 Q223 252 232 278 L218 438 H82Z"
          }
          fill={`url(#${id}-body)`}
          stroke="#172027"
          strokeWidth="9"
        />

        <Arm
          side="left"
          pose={pose}
          body={outfitStyle.body}
          bodyDark={outfitStyle.bodyDark}
          skin={skin}
          wave={-armWave}
        />
        <Arm
          side="right"
          pose={pose}
          body={outfitStyle.body}
          bodyDark={outfitStyle.bodyDark}
          skin={skin}
          wave={armWave}
        />

        <path d="M115 245 H185 L177 302 H123Z" fill={outfitStyle.shirt} />
        <path d="M115 245 L150 279 L126 306 L98 252Z" fill={outfitStyle.body} />
        <path
          d="M185 245 L150 279 L174 306 L202 252Z"
          fill={outfitStyle.body}
        />
        <path
          d="M143 280 H157 L164 356 L150 371 L136 356Z"
          fill={outfitStyle.tie}
        />
        {outfitStyle.military ? (
          <g>
            <path
              d="M96 322 H132 M168 322 H204"
              stroke={outfitStyle.trim}
              strokeWidth="5"
            />
            <rect
              x="101"
              y="331"
              width="34"
              height="28"
              rx="4"
              fill="none"
              stroke="#182028"
              strokeWidth="5"
            />
            <rect
              x="165"
              y="331"
              width="34"
              height="28"
              rx="4"
              fill="none"
              stroke="#182028"
              strokeWidth="5"
            />
            <circle cx="150" cy="315" r="5" fill={outfitStyle.trim} />
            <circle cx="150" cy="344" r="5" fill={outfitStyle.trim} />
            <circle cx="150" cy="403" r="5" fill={outfitStyle.trim} />
            <rect
              x="184"
              y="286"
              width="31"
              height="8"
              fill={outfitStyle.trim}
            />
          </g>
        ) : (
          <g>
            <circle cx="150" cy="395" r="5" fill="#83909A" />
            <path
              d="M105 360 H134 M166 360 H195"
              stroke="#53616B"
              strokeWidth="4"
            />
          </g>
        )}

        {pose === "hold-document" ? (
          <g transform="translate(104 349)">
            <rect
              width="92"
              height="112"
              rx="5"
              fill="#EFE8D7"
              stroke="#172027"
              strokeWidth="6"
            />
            <path
              d="M16 26 H75 M16 43 H68 M16 60 H76 M16 77 H58"
              stroke="#858071"
              strokeWidth="4"
            />
            <circle
              cx="67"
              cy="87"
              r="14"
              fill="none"
              stroke="#B24138"
              strokeWidth="5"
            />
          </g>
        ) : null}

        {outfit === "qing-official" && (
          <g>
            <path
              d="M115 250Q150 292 185 250V438H115Z"
              fill={outfitStyle.body}
            />
            <path d="M150 281V504" stroke="#ac9570" strokeWidth="4" />
            <circle cx="163" cy="306" r="4" fill="#c6ad74" />
            <circle cx="163" cy="340" r="4" fill="#c6ad74" />
            <path d="M84 451H218" stroke="#c6ad74" strokeWidth="11" />
          </g>
        )}
        {facing === "back" && (
          <g>
            <path
              d="M68 278Q77 252 108 244H192Q223 252 232 278L218 438H82Z"
              fill={outfitStyle.body}
              stroke="#172027"
              strokeWidth="8"
            />
            <path
              d="M150 280V431M105 260Q150 300 195 260"
              fill="none"
              stroke={outfitStyle.bodyDark}
              strokeWidth="4"
            />
          </g>
        )}
        <HandProp prop={prop} pose={pose} />
        {prop !== "none" || pose === "hold-document"
          ? (["left", "right"] as const).map((side) => {
              const { wrist } = getArmJoints(pose, side);
              return (
                <circle
                  key={side}
                  cx={wrist[0]}
                  cy={wrist[1]}
                  r="16"
                  fill={skin}
                  stroke="#172027"
                  strokeWidth="6"
                />
              );
            })
          : null}
        <rect
          x="129"
          y="221"
          width="42"
          height="51"
          rx="18"
          fill={skin}
          stroke="#172027"
          strokeWidth="7"
        />
        <circle
          cx="79"
          cy="177"
          r="27"
          fill={skin}
          stroke="#172027"
          strokeWidth="7"
        />
        <circle
          cx="221"
          cy="177"
          r="27"
          fill={skin}
          stroke="#172027"
          strokeWidth="7"
        />
        <path
          d="M82 132 Q82 92 150 86 Q218 92 218 132 V189 Q218 239 150 253 Q82 239 82 189Z"
          fill={`url(#${id}-skin)`}
          stroke="#172027"
          strokeWidth="8"
        />
        <Hair type={hair} color={hairColor} />
        <Hat type={hat} trim={outfitStyle.trim} />

        {facing === "front" ? (
          <g>
            <path
              d={`M105 166 L132 ${166 + browTilt}`}
              stroke="#342A26"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d={`M168 ${166 - browTilt} L195 166`}
              stroke="#342A26"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <ellipse
              cx={119 + gaze * 4}
              cy="190"
              rx="12"
              ry={eyesOpen ? 10 : 1.5}
              fill="#F6F1E7"
              stroke="#172027"
              strokeWidth="4"
            />
            <ellipse
              cx={181 + gaze * 4}
              cy="190"
              rx="12"
              ry={eyesOpen ? 10 : 1.5}
              fill="#F6F1E7"
              stroke="#172027"
              strokeWidth="4"
            />
            {eyesOpen ? (
              <>
                <circle cx={119 + gaze * 6} cy="191" r="5" fill="#172027" />
                <circle cx={181 + gaze * 6} cy="191" r="5" fill="#172027" />
              </>
            ) : null}
            {glasses ? (
              <g fill="none" stroke="#272F34" strokeWidth="6">
                <circle cx="118" cy="190" r="22" />
                <circle cx="182" cy="190" r="22" />
                <path d="M140 190 H160 M95 185 L79 179 M205 185 L221 179" />
              </g>
            ) : null}
            <path
              d="M150 195 L143 216 L156 216"
              fill="none"
              stroke="#9D6853"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {moustache ? (
              <path
                d="M126 225 Q141 212 150 226 Q159 212 174 225 Q164 242 150 234 Q136 242 126 225Z"
                fill={hairColor}
              />
            ) : null}
            <path
              d={mouth}
              fill={speaking || expression === "surprised" ? "#5B2425" : "none"}
              stroke="#542E2C"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ) : facing === "profile" ? (
          <g>
            <path
              d="M167 166L195 170"
              stroke="#342A26"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <ellipse
              cx="187"
              cy="190"
              rx="12"
              ry={eyesOpen ? 10 : 1.5}
              fill="#F6F1E7"
              stroke="#172027"
              strokeWidth="4"
            />
            {eyesOpen ? (
              <circle cx="193" cy="191" r="5" fill="#172027" />
            ) : null}
            <path
              d="M211 190L235 209L210 218"
              fill={skin}
              stroke="#172027"
              strokeWidth="5"
            />
            <path
              d="M186 235H213"
              stroke="#542E2C"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {glasses ? (
              <circle
                cx="187"
                cy="190"
                r="20"
                fill="none"
                stroke="#272F34"
                strokeWidth="5"
              />
            ) : null}
          </g>
        ) : (
          <g>
            <path
              d="M85 134Q85 85 150 86Q216 91 216 132V204Q205 245 150 249Q95 240 85 204Z"
              fill={hairColor}
              stroke="#172027"
              strokeWidth="7"
            />
            <Hat type={hat} trim={outfitStyle.trim} />
          </g>
        )}
      </svg>
    </div>
  );
};
