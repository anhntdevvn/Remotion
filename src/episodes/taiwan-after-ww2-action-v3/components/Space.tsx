import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../types";
export type Setting =
  | "office"
  | "meeting"
  | "hall"
  | "yard"
  | "port"
  | "street"
  | "workshop";

const Trees = (
  <g fill="#434A3D" stroke="#101820" strokeWidth="4">
    <path d="M80 810L96 538H122L142 810Z" />
    <path d="M-12 564Q-49 490 49 474Q20 398 109 390Q190 357 202 442Q270 463 229 532Q247 591 130 594Z" />
    <path d="M1680 818L1700 568H1730L1744 818Z" />
    <path d="M1600 573Q1560 500 1653 470Q1632 399 1720 412Q1810 370 1830 460Q1900 493 1858 557Q1872 611 1720 616Z" />
  </g>
);
export const Space: React.FC<{ setting: Setting }> = React.memo(
  ({ setting }) => {
    const outside = ["yard", "port", "street", "workshop"].includes(setting);
    return (
      <AbsoluteFill
        style={{
          background: outside
            ? "linear-gradient(145deg,#B8AC8B,#7F8982)"
            : "linear-gradient(125deg,#D8CCAC,#AAA58D 55%,#636C6D)",
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          {outside ? (
            <>
              <path
                d="M0 530L220 488L390 532L720 380L1070 514L1360 404L1660 507L1920 454V876H0Z"
                fill="#586352"
                opacity=".5"
              />
              {setting === "yard" ? (
                Trees
              ) : (
                <g fill="#495451" stroke={C.ink} strokeWidth="5" opacity=".8">
                  <path d="M100 798V387H398V798M508 798V319H735V798M1270 798V322H1790V798" />
                  <path d="M1190 322L1530 212L1845 322Z" />
                  <path d="M583 318V203H627V318" />
                </g>
              )}
              <rect y="807" width="1920" height="273" fill="#595649" />
              <path
                d="M0 807H1920M0 944H1920"
                stroke="#292F2F"
                strokeWidth="8"
              />
              {setting === "port" && (
                <>
                  <rect y="510" width="1920" height="296" fill="#6F8B90" />
                  <path
                    d="M600 650H1530L1410 774H738Z"
                    fill="#36464C"
                    stroke={C.ink}
                    strokeWidth="6"
                  />
                  <path
                    d="M913 650V486H1193V650M1044 486V389M1456 796V240H1783L1456 516M1783 240V638"
                    fill="#8B9388"
                    stroke={C.ink}
                    strokeWidth="12"
                  />
                  <path d="M0 810H1920" stroke="#D5AD55" strokeWidth="6" />
                </>
              )}
              {setting === "workshop" && (
                <>
                  <path
                    d="M1330 217V817M1550 217V817M1330 275H1647M1330 450H1647M1330 631H1647M1647 218V817"
                    stroke={C.ink}
                    strokeWidth="15"
                  />
                  <path
                    d="M0 899H1920M0 922H1920"
                    stroke="#A89671"
                    strokeWidth="7"
                  />
                </>
              )}
              {setting === "street" && (
                <g stroke="#A09374" strokeWidth="8">
                  <path d="M129 640H359M129 567H359M1330 419H1720M1330 529H1720M1330 647H1720" />
                </g>
              )}
            </>
          ) : (
            <>
              <g stroke="#766E57" strokeWidth="4" opacity=".6">
                <path d="M75 200H1845V793H75Z" fill="none" />
                <path d="M80 450H1840M80 510H1840" />
                {[140, 640, 1140, 1640].map((x) => (
                  <rect
                    key={x}
                    x={x}
                    y="537"
                    width="220"
                    height="217"
                    rx="4"
                    fill="#7A7561"
                  />
                ))}
              </g>
              <rect y="793" width="1920" height="287" fill="#70634E" />
              <path
                d="M0 793H1920M0 909H1920M150 1080L755 793M1770 1080L1165 793"
                stroke="#4A4C41"
                strokeWidth="5"
              />
              {[170, 1440].map((x) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="239"
                    width="318"
                    height="215"
                    fill="#768A87"
                    stroke={C.ink}
                    strokeWidth="12"
                  />
                  <path
                    d={`M${x + 158} 239V454M${x} 347H${x + 318}`}
                    stroke="#C8BA95"
                    strokeWidth="9"
                  />
                  <path
                    d={`M${x - 17} 239L${x + 15} 454M${x + 333} 239L${x + 300} 454`}
                    stroke="#655044"
                    strokeWidth="42"
                  />
                </g>
              ))}
              {setting === "hall" && (
                <>
                  <path
                    d="M615 82H1305V320H615Z"
                    fill="#BFB28F"
                    stroke={C.ink}
                    strokeWidth="8"
                  />
                  <text
                    x="960"
                    y="169"
                    fontFamily={FONT}
                    fontSize="42"
                    fontWeight="800"
                    textAnchor="middle"
                    fill={C.ink}
                  >
                    SAN FRANCISCO · 1951
                  </text>
                  <text
                    x="960"
                    y="238"
                    fontFamily={FONT}
                    fontSize="36"
                    fontWeight="700"
                    textAnchor="middle"
                    fill={C.ink}
                  >
                    평화 회의
                  </text>
                </>
              )}
            </>
          )}
        </svg>
      </AbsoluteFill>
    );
  },
);
export const Desk: React.FC<{ x?: number; y?: number; width?: number }> = ({
  x = 290,
  y = 795,
  width = 1340,
}) => (
  <svg
    viewBox="0 0 1920 1080"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
  >
    <g stroke={C.ink} strokeWidth="7">
      <path
        d={`M${x + 75} ${y}V1080H${x + 119}V${y}M${x + width - 114} ${y}V1080H${x + width - 70}V${y}`}
        fill="#373D3A"
      />
      <path
        d={`M${x} ${y}L${x + 91} ${y - 56}H${x + width - 89}L${x + width} ${y}V${y + 72}H${x}Z`}
        fill="#5C4637"
      />
      <path d={`M${x} ${y}H${x + width}`} stroke={C.gold} strokeWidth="8" />
    </g>
  </svg>
);
export const Chair: React.FC<{ x: number; y?: number }> = ({ x, y = 267 }) => (
  <svg
    viewBox="0 0 270 500"
    style={{
      position: "absolute",
      left: x - 135,
      top: y,
      width: 270,
      height: 500,
    }}
  >
    <path
      d="M26 494V64Q26 20 66 20H204Q244 20 244 64V494"
      fill="#594834"
      stroke={C.ink}
      strokeWidth="9"
    />
    <rect
      x="48"
      y="51"
      width="174"
      height="275"
      rx="20"
      fill="#394E4B"
      stroke={C.ink}
      strokeWidth="6"
    />
    <path
      d="M18 343H252V384H18Z"
      fill="#756243"
      stroke={C.ink}
      strokeWidth="7"
    />
  </svg>
);
