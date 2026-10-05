import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor, Cast } from "../components/Actor";
import { World, Table, Chair, Flag } from "../components/World";
import { Board, FolderObject } from "../components/Props";
import { clamp, FONT, INK, PAPER, RED, Shot } from "../types";

export const DiplomacyScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  if (shot.kind === "meeting")
    return (
      <>
        <World kind="meeting" />
        {[500, 945, 1390].map((x) => (
          <Chair key={x} x={x - 140} y={277} width={280} />
        ))}
        <Actor
          cast="roosevelt"
          x={500}
          y={92}
          height={845}
          seated
          pose={frame > 65 ? "point-right" : "read"}
          prop={frame > 65 ? "none" : "folder"}
          gaze={1}
        />
        <Actor
          cast="churchill"
          x={945}
          y={84}
          height={860}
          seated
          pose={frame > 90 ? "explain-left" : "neutral"}
          gaze={-1}
        />
        <Actor
          cast="chiang"
          x={1390}
          y={96}
          height={842}
          seated
          pose={frame > 28 ? "explain-left" : "hands-behind"}
          gaze={-1}
        />
        <Table y={763} x={237} width={1450} document />
        {["루스벨트", "처칠", "장제스"].map((name, i) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 367 + i * 445,
              top: 772,
              width: 270,
              textAlign: "center",
              color: INK,
              background: PAPER,
              border: `3px solid ${INK}`,
              fontFamily: FONT,
              fontSize: 31,
              fontWeight: 700,
              padding: 8,
            }}
          >
            {name}
          </div>
        ))}
      </>
    );
  if (shot.kind === "handover") {
    const transfer = interpolate(frame, [22, 60], [0, 1], clamp);
    const delivered = frame >= 60;
    return (
      <>
        <World kind="office" />
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Flag country="roc" x={1250} y={109} w={229} />
        </svg>
        <Actor
          cast="japan"
          x={526}
          y={148}
          height={800}
          pose={delivered ? "neutral" : "pass-right"}
          expression="concerned"
          gaze={1}
          travel={166}
          travelStart={22}
          travelEnd={60}
        />
        <Actor
          cast="roc"
          x={1214}
          y={148}
          height={800}
          pose="pass-left"
          prop={delivered ? "folder" : "none"}
          gaze={-1}
          travel={-166}
          travelStart={22}
          travelEnd={60}
        />
        <Actor
          cast="rocTroop"
          x={1660}
          y={204}
          height={711}
          pose="rifle-ready"
          prop="rifle"
        />
        <Table x={740} y={795} width={430} document />
        {!delivered && (
          <>
            <FolderObject
              x={704 + transfer * 166}
              y={602}
              width={153}
              angle={interpolate(frame, [22, 41, 60], [0, -6, 0], clamp)}
            />
            <svg
              viewBox="0 0 1920 1080"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <circle
                cx={704 + transfer * 166}
                cy={598}
                r="22"
                fill="#D6A27E"
                stroke={INK}
                strokeWidth="8"
              />
            </svg>
          </>
        )}
      </>
    );
  }
  if (shot.kind === "signing")
    return (
      <>
        <World kind="office" />
        <Chair x={500} y={270} width={310} />
        <Actor
          cast="japan"
          x={657}
          y={72}
          height={1000}
          seated
          pose="write"
          prop="pen"
          expression="concerned"
        />
        <Actor
          cast={shot.mode === "cession" ? "qing" : "us"}
          x={1350}
          y={161}
          height={820}
          pose={frame > 56 ? "hold-document" : "hands-behind"}
          gaze={-1}
        />
        <Table x={335} y={831} width={1260} />
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M629 789H845L883 829H594Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="4"
          />
          <path d="M637 801H825" stroke="#998d72" strokeWidth="3" />
          <path
            d="M670 817q15-19 27 0q7 10 16-11q7-11 8 6q6 9 19-3q12-10 32 0"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={interpolate(frame, [25, 65], [100, 0], clamp)}
          />
        </svg>
        {/* Same joints in two painter passes: body behind desk, hands and pen above it. */}
        <Actor
          cast="japan"
          x={657}
          y={72}
          height={1000}
          handsOnly
          seated
          pose="write"
          prop="pen"
        />
      </>
    );
  if (shot.kind === "observer")
    return (
      <>
        <World kind="archive" />
        <Chair x={450} y={275} width={280} />
        <Actor
          cast="observer"
          x={630}
          y={92}
          height={980}
          seated
          pose="read"
          prop="folder"
          gaze={1}
          expression="concerned"
        />
        <Board
          x={1350}
          y={327}
          width={605}
          text={shot.label}
          sub="문서의 취지 요약"
        />
        <Table x={265} y={850} width={1270} document />
      </>
    );
  if (shot.kind === "administration")
    return (
      <>
        <World kind="office" />
        <Chair x={236} y={265} width={240} />
        <Actor
          cast="clerk"
          x={375}
          y={92}
          height={857}
          seated
          pose="write"
          prop="pen"
          expression={shot.mode === "tension" ? "stern" : "neutral"}
        />
        <Actor
          cast="civilian"
          x={1065}
          y={183}
          height={775}
          pose="read"
          prop="folder"
          expression="concerned"
          travel={-60}
          travelEnd={55}
        />
        <Actor
          cast="civilian"
          x={1460}
          y={205}
          height={725}
          expression="concerned"
          hair="crop"
        />
        <Actor
          cast="civilian"
          x={1750}
          y={215}
          height={700}
          expression="concerned"
          hair="silver"
          hairColor="#92907e"
        />
        <Table x={135} y={753} width={682} document />
        <div
          style={{
            position: "absolute",
            left: 222,
            top: 766,
            padding: "8px 32px",
            fontSize: 36,
            fontWeight: 700,
            color: INK,
            background: PAPER,
            border: `4px solid ${INK}`,
            fontFamily: FONT,
          }}
        >
          행정 접수
        </div>
        {shot.mode === "tension" && (
          <div
            style={{
              position: "absolute",
              left: 1170,
              top: 260,
              color: RED,
              fontSize: 76,
              fontWeight: 900,
            }}
          >
            …
          </div>
        )}
      </>
    );
  if (shot.kind === "absent")
    return (
      <>
        <World kind="hall" />
        <Chair x={382} y={335} width={340} />
        <Chair x={1120} y={335} width={340} />
        {shot.mode === "representation" || shot.mode === "dispute" ? (
          <>
            <Actor
              cast="chiang"
              x={555}
              y={116}
              height={900}
              seated
              pose="explain-right"
              expression="stern"
              gaze={1}
            />
            <Actor
              cast="prc"
              x={1292}
              y={116}
              height={900}
              seated
              pose="explain-left"
              expression="stern"
              gaze={-1}
            />
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                left: 415,
                top: 495,
                fontSize: 103,
                color: RED,
                fontWeight: 800,
              }}
            >
              ×
            </div>
            <div
              style={{
                position: "absolute",
                left: 1150,
                top: 495,
                fontSize: 103,
                color: RED,
                fontWeight: 800,
              }}
            >
              ×
            </div>
          </>
        )}
        <Table x={233} y={814} width={1464} />
        <div
          style={{
            position: "absolute",
            left: 356,
            top: 818,
            width: 430,
            textAlign: "center",
            background: PAPER,
            border: `4px solid ${INK}`,
            fontSize: 41,
            fontFamily: FONT,
            padding: 10,
          }}
        >
          중화민국
        </div>
        <div
          style={{
            position: "absolute",
            left: 1062,
            top: 818,
            width: 470,
            textAlign: "center",
            background: PAPER,
            border: `4px solid ${INK}`,
            fontSize: 41,
            fontFamily: FONT,
            padding: 10,
          }}
        >
          중화인민공화국
        </div>
        <div
          style={{
            position: "absolute",
            top: 298,
            left: 530,
            right: 530,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            color: RED,
            fontFamily: FONT,
          }}
        >
          {shot.mode === "chairs"
            ? "두 정부 모두 불참"
            : "대표권 논쟁의 도식 · 실제 회담 장면 아님"}
        </div>
      </>
    );
  if (shot.kind === "conference")
    return (
      <>
        <World kind="hall" />
        <Actor cast="us" x={292} y={223} height={698} pose="neutral" />
        <Chair x={653} y={250} width={300} />
        <Actor
          cast="clerk"
          x={845}
          y={84}
          height={926}
          seated
          pose={shot.mode === "sign" ? "write" : "read"}
          prop={shot.mode === "sign" ? "pen" : "folder"}
          expression="neutral"
        />
        <Actor
          cast="observer"
          x={1330}
          y={149}
          height={828}
          pose={frame > 48 ? "hold-document" : "neutral"}
          gaze={-1}
        />
        <Actor cast="us" x={1710} y={232} height={697} pose="hands-behind" />
        <Table x={535} y={817} width={994} document />
        {shot.mode === "excluded" && (
          <div
            style={{
              position: "absolute",
              left: 627,
              top: 819,
              fontSize: 40,
              fontFamily: FONT,
              fontWeight: 800,
              color: RED,
              background: PAPER,
              padding: "10px 25px",
            }}
          >
            대만 보유: 선택지에 없음
          </div>
        )}
      </>
    );
  const cast: Cast =
    shot.mode === "truman"
      ? "truman"
      : shot.mode === "roc"
        ? "chiang"
        : "japan";
  return (
    <>
      <World kind="office" />
      <Chair x={220} y={280} width={300} />
      <Actor
        cast={cast}
        x={485}
        y={72}
        height={1020}
        seated
        pose={frame > 45 ? "explain-right" : "read"}
        prop={frame > 45 ? "none" : "folder"}
        expression="concerned"
        gaze={1}
      />
      <Board
        x={1370}
        y={301}
        width={670}
        text={shot.label || "대만"}
        sub={shot.mode === "japan" ? "일본의 결정권은 사라졌다" : undefined}
      />
      <Table x={158} y={858} width={840} document />
    </>
  );
};
