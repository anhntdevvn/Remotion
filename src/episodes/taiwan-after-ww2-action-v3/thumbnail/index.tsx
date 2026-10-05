import React from "react";
import { AbsoluteFill, Img, registerRoot, staticFile, Still } from "remotion";
import { Actor } from "../components/Actor";
import { FONT } from "../types";
import taiwan from "./taiwan-outline.json";

// Separate still entry: does not change the video composition or narration.
// Natural Earth 1:50m outline; local equirectangular projection preserves
// the island's proportions, instead of enlarging the coarse episode map.

export const TaiwanThumbnail: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse at 72% 70%, #314849, #14232C 58%, #0B141D)",
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    <svg width="1920" height="1080" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="chart" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M100 0H0V100" stroke="#D9C68E" fill="none" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#chart)" opacity=".065" />
      <g opacity=".12" fill="none" stroke="#E7DAB9">
        <circle cx="1370" cy="745" r="400" strokeWidth="3" />
        <circle cx="1370" cy="745" r="320" strokeWidth="2" />
        <path d="M920 745H1830M1370 320V1080" strokeWidth="3" />
      </g>
      {/* Japan is represented by a flag, rather than a fabricated portrait. */}
      <g transform="translate(50 105) rotate(-9 280 160)">
        <path d="M0 0H565V321H0Z" fill="#F0E7CF" stroke="#0C161D" strokeWidth="10" />
        <circle cx="283" cy="160" r="104" fill="#BE3936" />
      </g>
    </svg>

    <Actor
      cast="japan"
      x={350}
      y={270}
      height={1370}
      expression="concerned"
      gaze={1}
      pose="explain-right"
      motionOffset={1}
    />

    <div style={{ position: "absolute", left: 738, top: 78, color: "#F4EAD2", fontWeight: 900, fontSize: 130, letterSpacing: -7, lineHeight: 1.16, textShadow: "0 8px 0 #08131B, 0 15px 24px #08131B" }}>
      대만을
    </div>
    <div style={{ position: "absolute", left: 724, top: 239, color: "#FFD16C", fontWeight: 900, fontSize: 139, letterSpacing: -8, whiteSpace: "nowrap", lineHeight: 1.16, textShadow: "0 8px 0 #08131B, 0 15px 24px #08131B" }}>
      왜 못 지켰나?
    </div>

    {/* Stylized scale, not a territorial boundary or an ownership claim. */}
    <svg width="540" height="600" viewBox="0 0 540 600" style={{ position: "absolute", left: 1080, top: 428, filter: "drop-shadow(0 17px 0 #09151CCC) drop-shadow(0 0 24px #E2583930)" }}>
      <g transform="translate(105 20)">
        <path d={taiwan.path} fill="#CA423B" stroke="#F2D3A1" strokeWidth="8" strokeLinejoin="round" />
      </g>
      <text x="245" y="327" fill="#FFE9C1" stroke="#A82F2C" strokeWidth="9" paintOrder="stroke" textAnchor="middle" fontFamily={FONT} fontSize="147" fontWeight="900">?</text>
    </svg>

    <div style={{ position: "absolute", left: 725, top: 658, width: 310, height: 350, rotate: "-12deg", background: "#E9D8B1", border: "7px solid #101B22", boxShadow: "0 15px 28px #0007", padding: "33px 23px", boxSizing: "border-box" }}>
      <div style={{ color: "#253037", fontSize: 38, fontWeight: 900, textAlign: "center" }}>평화조약</div>
      <svg width="250" height="200" viewBox="0 0 250 200">
        <path d="M10 32H240M10 66H240M10 100H240M10 134H205" stroke="#756B54" strokeWidth="9" opacity=".65" />
        <g transform="rotate(-7 128 105)">
          <rect x="10" y="61" width="230" height="95" rx="4" fill="#E9D8B1" stroke="#AF342E" strokeWidth="7" />
          <text x="125" y="126" textAnchor="middle" fill="#AF342E" fontFamily={FONT} fontWeight="900" fontSize="55">권리 포기</text>
        </g>
      </svg>
    </div>

    <div style={{ position: "absolute", left: 83, top: 946, background: "#EDDDBB", border: "6px solid #14202A", color: "#17252B", padding: "8px 25px 12px", fontSize: 57, fontWeight: 900, rotate: "-3deg", boxShadow: "0 8px 22px #0007" }}>50년의 지배</div>
    <Img src={staticFile("channel-branding/logo/archive-logo.svg")} style={{ position: "absolute", right: 50, top: 46, width: 98, height: 98 }} />
  </AbsoluteFill>
);

const ThumbnailRoot: React.FC = () => <Still id="Taiwan-Thumbnail-KO" component={TaiwanThumbnail} width={1920} height={1080} />;
registerRoot(ThumbnailRoot);
