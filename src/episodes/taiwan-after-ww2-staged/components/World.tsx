import React from "react";
import { AbsoluteFill } from "remotion";
import { INK } from "../types";

export type WorldKind =
  | "ruins"
  | "street"
  | "port"
  | "field"
  | "office"
  | "meeting"
  | "hall"
  | "archive"
  | "curfew"
  | "rebuild";

const Clouds = (
  <g fill="#eceade" opacity=".76">
    <path d="M84 159Q67 123 131 120Q170 69 237 106Q309 88 338 144Q380 142 386 169Z" />
    <path d="M1171 133Q1165 91 1231 94Q1284 51 1342 89Q1422 81 1455 133Z" />
    <path d="M1594 227Q1583 193 1635 193Q1691 148 1740 189Q1811 188 1825 225Z" />
  </g>
);
const Tree: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    stroke={INK}
    strokeWidth="5"
    strokeLinejoin="round"
  >
    <path d="M-18 0L-12-191H12L28 0Z" fill="#706c47" />
    <path
      d="M-96-179Q-135-242-65-259Q-88-320-5-320Q62-357 90-280Q172-281 139-217Q166-165 63-154Q-28-129-96-179Z"
      fill="#778958"
    />
    <path
      d="M-78-265Q-13-235 74-266M-39-308Q19-282 73-301M-101-213Q-48-186 53-217"
      fill="none"
      stroke="#596e44"
      strokeWidth="8"
    />
  </g>
);
const Building: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  ruined?: boolean;
}> = ({ x, y, w, h, color = "#b8af94", ruined = false }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth="5">
    <path
      d={
        ruined
          ? `M0 ${h}V72L${w * 0.2} 38L${w * 0.35} 101L${w * 0.46} 0L${w * 0.59} 95L${w} 51V${h}Z`
          : `M0 ${h}V0H${w}V${h}Z`
      }
      fill={color}
    />
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={22 + (col * (w - 40)) / 4}
          y={115 + row * 95}
          width={(w - 60) / 5}
          height="57"
          fill={ruined ? "#373e37" : "#6c837a"}
        />
      )),
    )}
    <path d={`M-12 ${h - 26}H${w + 12}M-10 89H${w + 10}`} strokeWidth="12" />
    {!ruined && (
      <>
        <path d={`M-20 0L${w / 2} -95L${w + 20} 0Z`} fill="#57635b" />
        <rect
          x={w / 2 - 35}
          y={h - 124}
          width="70"
          height="98"
          fill="#655e4b"
        />
      </>
    )}
  </g>
);

export const Flag: React.FC<{
  country: "japan" | "roc" | "us" | "uk" | "prc";
  x?: number;
  y?: number;
  w?: number;
}> = ({ country, x = 0, y = 0, w = 140 }) => {
  const h = w * 0.64;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        fill={
          country === "japan"
            ? "#f5eee0"
            : country === "us"
              ? "#f3ead6"
              : country === "uk"
                ? "#304b6f"
                : "#ad463c"
        }
        stroke={INK}
        strokeWidth="4"
      />
      {country === "japan" && (
        <circle cx={w / 2} cy={h / 2} r={h * 0.26} fill="#bb473b" />
      )}
      {country === "roc" && (
        <>
          <rect width={w * 0.48} height={h * 0.56} fill="#2e507b" />
          <g transform={`translate(${w * 0.24} ${h * 0.28})`}>
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d="M-3-10L0-20L3-10Z"
                fill="#eee9d8"
                transform={`rotate(${i * 30})`}
              />
            ))}
            <circle r="9" fill="#eee9d8" />
          </g>
        </>
      )}
      {country === "us" && (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              y={(i * h) / 7}
              width={w}
              height={h / 14}
              fill="#b95148"
            />
          ))}
          <rect width={w * 0.42} height={h * 0.55} fill="#304b6f" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={8 + col * w * 0.08}
                cy={9 + row * h * 0.16}
                r="2.5"
                fill="#f5eee1"
              />
            )),
          )}
        </>
      )}
      {country === "uk" && (
        <>
          <path
            d={`M0 0L${w} ${h}M${w} 0L0 ${h}`}
            stroke="#e8dfcc"
            strokeWidth="16"
          />
          <path
            d={`M0 0L${w} ${h}M${w} 0L0 ${h}`}
            stroke="#b34c42"
            strokeWidth="6"
          />
          <path
            d={`M${w / 2} 0V${h}M0 ${h / 2}H${w}`}
            stroke="#eee5d3"
            strokeWidth="24"
          />
          <path
            d={`M${w / 2} 0V${h}M0 ${h / 2}H${w}`}
            stroke="#b34c42"
            strokeWidth="12"
          />
        </>
      )}
      {country === "prc" && (
        <path
          d={`M${w * 0.2} ${h * 0.15}l6 13 14 2-10 10 3 14-13-7-12 7 2-14-10-10 14-2Z`}
          fill="#e5c564"
        />
      )}
    </g>
  );
};

const Outdoor: React.FC<{ kind: WorldKind }> = ({ kind }) => {
  const ruins = kind === "ruins";
  const night = kind === "curfew";
  const field = kind === "field";
  const port = kind === "port";
  return (
    <>
      <rect
        width="1920"
        height="1080"
        fill={night ? "#66767b" : ruins ? "#8e9691" : "#a3c4c7"}
      />
      {Clouds}
      <path
        d="M0 514L191 470L372 502L615 372L916 470L1249 320L1667 485L1920 451V850H0Z"
        fill={ruins ? "#626d60" : "#7b8c6b"}
        stroke={INK}
        strokeWidth="4"
      />
      {field ? (
        <>
          <Tree x={125} y={730} scale={1.4} />
          <Tree x={1700} y={744} scale={1.8} />
          <Tree x={1352} y={638} scale={0.55} />
          <path
            d="M0 706Q723 625 1920 736V1080H0Z"
            fill="#a6a77c"
            stroke={INK}
            strokeWidth="4"
          />
          <path
            d="M0 890L1920 960M300 768L900 900M1160 771L1390 909"
            stroke="#8b9370"
            strokeWidth="8"
          />
        </>
      ) : port ? (
        <>
          <rect y="604" width="1920" height="280" fill="#6f9ca7" />
          <path
            d="M0 800H1920V1080H0Z"
            fill="#b4ac8e"
            stroke={INK}
            strokeWidth="6"
          />
          <path
            d="M70 546H916L800 682H205Z"
            fill="#45565b"
            stroke={INK}
            strokeWidth="7"
          />
          <rect
            x="370"
            y="421"
            width="355"
            height="126"
            fill="#c8c6b5"
            stroke={INK}
            strokeWidth="6"
          />
          <rect
            x="494"
            y="356"
            width="130"
            height="65"
            fill="#c3c6b5"
            stroke={INK}
            strokeWidth="5"
          />
          <path
            d="M606 359V228M1300 762V212H1748L1300 471M1300 212L1155 392"
            fill="none"
            stroke="#485e5b"
            strokeWidth="21"
          />
          <path d="M1668 228V562" stroke="#45534c" strokeWidth="5" />
          <rect
            x="1596"
            y="560"
            width="150"
            height="95"
            fill="#aa8352"
            stroke={INK}
            strokeWidth="5"
          />
          {[50, 420, 790, 1160, 1530].map((x) => (
            <g key={x}>
              <path d={`M${x} 750v114`} stroke={INK} strokeWidth="15" />
              <path d={`M${x - 25} 757h50`} stroke={INK} strokeWidth="12" />
            </g>
          ))}
          <path d="M0 973H1920M0 992H1920" stroke="#6b7165" strokeWidth="8" />
        </>
      ) : (
        <>
          <Building x={-85} y={267} w={470} h={494} ruined={ruins} />
          <Building
            x={440}
            y={310}
            w={440}
            h={451}
            ruined={ruins}
            color="#acb1a1"
          />
          <Building
            x={1105}
            y={216}
            w={527}
            h={545}
            ruined={ruins}
            color="#b5ab90"
          />
          <Building x={1660} y={326} w={360} h={435} ruined={ruins} />
          <rect
            y="752"
            width="1920"
            height="328"
            fill={ruins ? "#857c68" : night ? "#7c8071" : "#b6ae8c"}
          />
          <path
            d="M0 750H1920M0 790H1920M0 964H1920"
            stroke={INK}
            strokeWidth="6"
          />
          {!ruins && (
            <>
              <path
                d="M0 1035H1920M0 1016H1920"
                stroke="#6e786b"
                strokeWidth="9"
              />
              <Tree x={1040} y={782} scale={0.73} />
              <path d="M919 782V323" stroke={INK} strokeWidth="12" />
              <path
                d="M887 323H951L944 248H894Z"
                fill="#ede7ca"
                stroke={INK}
                strokeWidth="5"
              />
            </>
          )}
          {ruins && (
            <g fill="#666c5d" stroke={INK} strokeWidth="5">
              <path d="M270 836L348 748L414 828Z" />
              <path d="M967 902L986 837L1084 895Z" />
              <path d="M1568 814L1600 738L1682 791Z" />
              <path d="M0 670L85 622L112 773H0Z" />
              <path d="M710 868L727 792L783 857Z" />
            </g>
          )}
          {kind === "rebuild" && (
            <g stroke={INK} strokeWidth="7">
              <path d="M1341 110V748M1240 200H1520M1260 210V752M1260 362H1500M1260 545H1500M1490 210V752" />
              <rect x="1281" y="679" width="185" height="81" fill="#a78252" />
              <path d="M1227 751H1532" strokeWidth="16" />
            </g>
          )}
        </>
      )}
      {night && (
        <rect width="1920" height="1080" fill="#1c2837" opacity=".18" />
      )}
    </>
  );
};

const Interior: React.FC<{ kind: WorldKind }> = ({ kind }) => {
  const meeting = kind === "meeting";
  const hall = kind === "hall";
  const archive = kind === "archive";
  return (
    <>
      <rect
        width="1920"
        height="1080"
        fill={archive ? "#b8aa88" : hall ? "#b7baa8" : "#cec2a0"}
      />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <path d={`M${i * 210} 0V750`} stroke="#b2a47f" strokeWidth="5" />
          <rect
            x={i * 210 + 16}
            y="457"
            width="180"
            height="270"
            rx="3"
            fill={hall ? "#888e7d" : "#8e876a"}
            stroke={INK}
            strokeWidth="4"
          />
        </g>
      ))}
      <rect
        y="742"
        width="1920"
        height="338"
        fill="#a29170"
        stroke={INK}
        strokeWidth="7"
      />
      {[110, 610, 1110, 1610].map((x) => (
        <path
          key={x}
          d={`M960 742L${x} 1080`}
          stroke="#897853"
          strokeWidth="4"
        />
      ))}
      <path d="M0 899H1920" stroke="#887751" strokeWidth="4" />
      {!archive && (
        <>
          {[90, 1390].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="104"
                width="357"
                height="339"
                fill="#7f9fa1"
                stroke={INK}
                strokeWidth="14"
              />
              <path
                d={`M${x} 278H${x + 357}M${x + 177} 104V443`}
                stroke="#cfc6aa"
                strokeWidth="16"
              />
              <path
                d={`M${x - 31} 93L${x - 12} 444L${x + 62} 420L${x + 41} 93Z M${x + 316} 93L${x + 297} 420L${x + 371} 444L${x + 389} 93Z`}
                fill="#7e5645"
                stroke={INK}
                strokeWidth="4"
              />
            </g>
          ))}
        </>
      )}
      {meeting && (
        <>
          <Flag country="us" x={523} y={118} w={218} />
          <Flag country="uk" x={851} y={118} w={218} />
          <Flag country="roc" x={1179} y={118} w={218} />
        </>
      )}
      {hall && (
        <>
          <path
            d="M489 0H540V748H489M1275 0H1326V748H1275"
            fill="#dbd2b9"
            stroke={INK}
            strokeWidth="5"
          />
          <rect
            x="620"
            y="84"
            width="560"
            height="203"
            fill="#dad5be"
            stroke={INK}
            strokeWidth="8"
          />
          <text
            x="900"
            y="168"
            textAnchor="middle"
            fontSize="40"
            fill={INK}
            fontWeight="700"
          >
            평화 회의
          </text>
          <text x="900" y="227" textAnchor="middle" fontSize="32" fill={INK}>
            POSTWAR NEGOTIATIONS
          </text>
        </>
      )}
      {archive && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                x={70 + i * 375}
                y="96"
                width="298"
                height="614"
                fill="#756e51"
                stroke={INK}
                strokeWidth="8"
              />
              {[0, 1, 2].map((row) => (
                <g key={row}>
                  <path
                    d={`M${70 + i * 375} ${264 + row * 195}H${368 + i * 375}`}
                    stroke={INK}
                    strokeWidth="9"
                  />
                  {[0, 1, 2, 3, 4].map((col) => (
                    <rect
                      key={col}
                      x={91 + i * 375 + col * 50}
                      y={118 + row * 195}
                      width="41"
                      height="137"
                      fill={col % 2 ? "#a69360" : "#c4b583"}
                      stroke="#514e3a"
                      strokeWidth="3"
                    />
                  ))}
                </g>
              ))}
            </g>
          ))}
        </>
      )}
    </>
  );
};
export const World: React.FC<{ kind: WorldKind }> = React.memo(({ kind }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%">
      {["office", "meeting", "hall", "archive"].includes(kind) ? (
        <Interior kind={kind} />
      ) : (
        <Outdoor kind={kind} />
      )}
    </svg>
  </AbsoluteFill>
));

export const Table: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  document?: boolean;
}> = ({ x = 310, y = 704, width = 1280, document = false }) => (
  <svg
    viewBox="0 0 1920 1080"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
  >
    <g stroke={INK} strokeWidth="6">
      <path
        d={`M${x + 62} ${y + 62}V1080H${x + 100}V${y + 62}M${x + width - 110} ${y + 62}V1080H${x + width - 70}V${y + 62}`}
        fill="#5d5947"
      />
      <path
        d={`M${x} ${y}L${x + 80} ${y - 56}H${x + width - 65}L${x + width} ${y}V${y + 54}H${x}Z`}
        fill="#8f7352"
      />
      <path d={`M${x} ${y}H${x + width}`} stroke="#c1a57a" strokeWidth="12" />
      {document && (
        <>
          <path
            d={`M${x + width * 0.4} ${y - 36}H${x + width * 0.64}L${x + width * 0.68} ${y - 7}H${x + width * 0.37}Z`}
            fill="#ebe2cb"
          />
          <path
            d={`M${x + width * 0.46} ${y - 21}H${x + width * 0.61}`}
            stroke="#938267"
            strokeWidth="4"
          />
        </>
      )}
    </g>
  </svg>
);

export const Chair: React.FC<{ x: number; y: number; width?: number }> = ({
  x,
  y,
  width = 250,
}) => (
  <svg
    style={{ position: "absolute", left: x, top: y, width, height: 480 }}
    viewBox="0 0 250 480"
  >
    <path
      d="M22 440V65Q22 22 63 22H187Q228 22 228 65V440"
      fill="#806650"
      stroke={INK}
      strokeWidth="12"
    />
    <rect
      x="41"
      y="47"
      width="168"
      height="251"
      rx="24"
      fill="#557065"
      stroke={INK}
      strokeWidth="6"
    />
    <path d="M10 313H240V345H10Z" fill="#70533e" stroke={INK} strokeWidth="8" />
  </svg>
);
