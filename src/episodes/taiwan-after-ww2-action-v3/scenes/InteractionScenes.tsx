import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Actor, Cast } from "../components/Actor";
import { Chair, Desk, Space } from "../components/Space";
import { DeskPaper, Flag, Folder, Label } from "../components/Objects";
import { Beat, C, FONT, clamp } from "../types";

export const InteractionScene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  if (beat.grammar === "handover") {
    const p = interpolate(frame, [18, 66], [0, 1], clamp);
    const received = frame >= 66;
    return (
      <>
        <Space setting="office" />
        <Flag type="japan" x={280} y={222} />
        <Flag type="roc" x={1402} y={222} />
        <Actor
          cast="japanTroop"
          x={230}
          height={650}
          y={253}
          pose="neutral"
          expression="concerned"
        />
        <Actor
          cast="japan"
          x={526}
          height={800}
          y={148}
          travel={166}
          travelStart={18}
          travelEnd={66}
          pose={received ? "neutral" : "pass-right"}
          gaze={1}
          expression="concerned"
        />
        <Actor
          cast="roc"
          x={1214}
          height={800}
          y={148}
          travel={-166}
          travelStart={18}
          travelEnd={66}
          pose="pass-left"
          prop={received ? "folder" : "none"}
          gaze={-1}
        />
        <Actor
          cast="rocTroop"
          x={1692}
          height={655}
          y={250}
          pose="rifle-ready"
          prop="rifle"
        />
        <Desk x={733} y={810} width={463} />
        <DeskPaper x={963} y={801} />
        {!received && (
          <>
            <Folder
              x={704 + p * 166}
              y={596}
              width={144}
              text="행정 서류"
              angle={interpolate(frame, [18, 42, 66], [0, -5, 0], clamp)}
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
                cx={704 + p * 166}
                cy="598"
                r="22"
                fill="#D6A27E"
                stroke={C.ink}
                strokeWidth="7"
              />
            </svg>
          </>
        )}
        {received && (
          <Label x={960} y={839} width={410}>
            중화민국 · 행정 인수
          </Label>
        )}
      </>
    );
  }
  if (beat.grammar === "meeting") {
    const cast: Cast[] = ["roosevelt", "churchill", "chiang"];
    const xs = [500, 960, 1410];
    const poses = [
      "read",
      "explain-left",
      frame > 30 ? "write" : "read",
    ] as const;
    return (
      <>
        <Space setting="meeting" />
        <div
          style={{
            position: "absolute",
            left: 790,
            top: 158,
            color: C.ink,
            fontFamily: FONT,
            fontSize: 35,
            fontWeight: 800,
          }}
        >
          CAIRO · 1943
        </div>
        <Flag type="us" x={445} y={218} w={135} />
        <Flag type="roc" x={1365} y={218} w={135} />
        {xs.map((x) => (
          <Chair key={x} x={x} />
        ))}
        {cast.map((c, i) => (
          <Actor
            key={c}
            cast={c}
            x={xs[i]}
            y={87}
            height={890}
            seated
            pose={poses[i]}
            prop={i === 0 ? "folder" : i === 2 && frame > 30 ? "pen" : "none"}
            gaze={i === 2 ? -1 : 1}
          />
        ))}
        <Desk x={275} y={785} width={1370} />
        <DeskPaper x={1483} y={768} />
        {cast.map((c, i) => (
          <Actor
            key={`hands-${c}`}
            cast={c}
            x={xs[i]}
            y={87}
            height={890}
            seated
            handsOnly
            pose={poses[i]}
            prop={i === 0 ? "folder" : i === 2 && frame > 30 ? "pen" : "none"}
          />
        ))}
        {["루스벨트", "처칠", "장제스"].map((name, i) => (
          <Label key={name} x={xs[i]} y={811} width={280}>
            {name}
          </Label>
        ))}
      </>
    );
  }
  if (beat.grammar === "signing" || beat.grammar === "hall") {
    const hall = beat.grammar === "hall";
    const first: Cast = hall ? "clerk" : "japan";
    const witness: Cast = beat.mode === "shimonoseki" ? "qing" : "us";
    return (
      <>
        <Space setting={hall ? "hall" : "office"} />
        <Chair x={680} />
        <Actor
          cast={first}
          x={680}
          y={61}
          height={1000}
          seated
          pose="write"
          prop="pen"
          expression={hall ? "neutral" : "concerned"}
        />
        <Actor
          cast={witness}
          x={1390}
          y={182}
          height={780}
          pose={frame > 55 ? "hold-document" : "hands-behind"}
          gaze={-1}
        />
        {hall && (
          <>
            <Actor
              cast="observer"
              x={244}
              y={233}
              height={670}
              pose="read"
              prop="folder"
            />
            <Actor
              cast="observer"
              x={1730}
              y={245}
              height={650}
              pose="neutral"
              hair="slick"
              hairColor="#353029"
            />
          </>
        )}
        <Desk x={365} y={829} width={1250} />
        <DeskPaper x={755} y={827} sign />
        <Actor
          cast={first}
          x={680}
          y={61}
          height={1000}
          seated
          handsOnly
          pose="write"
          prop="pen"
        />
        <Label x={1260} y={836} width={480}>
          {beat.mode === "shimonoseki"
            ? "시모노세키 조약"
            : hall
              ? "평화조약"
              : "항복 조건 수락"}
        </Label>
      </>
    );
  }
  if (beat.grammar === "queue") {
    const tense =
      beat.mode === "tension" ||
      beat.mode === "coercion" ||
      beat.mode === "disillusion";
    const processed = frame > 90;
    const clerkPose = processed ? "write" : "pass-right";
    return (
      <>
        <Space setting="office" />
        <Chair x={396} />
        <Actor
          cast="clerk"
          x={396}
          y={86}
          height={902}
          seated
          pose={clerkPose}
          writeStartFrame={91}
          prop={processed ? "pen" : "none"}
          expression={tense ? "stern" : "neutral"}
        />
        <Actor
          cast="civilian"
          x={1040}
          y={194}
          height={752}
          pose={processed ? "neutral" : "pass-left"}
          prop={frame < 55 ? "folder" : "none"}
          travel={-146}
          travelStart={5}
          travelEnd={55}
          expression="concerned"
          gaze={-1}
        />
        <Actor
          cast="civilian"
          x={1437}
          y={253}
          height={658}
          pose="carry"
          prop="box"
          expression="concerned"
          hair="crop"
          travel={-50}
          travelEnd={55}
        />
        <Actor
          cast="civilian"
          x={1750}
          y={250}
          height={650}
          pose="neutral"
          expression="concerned"
          hair="silver"
          hairColor="#898474"
        />
        {frame >= 55 && frame <= 90 && (
          <Folder
            x={interpolate(frame, [55, 90], [724, 597], clamp)}
            y={interpolate(frame, [55, 90], [617, 594], clamp)}
            width={144}
            text="신청 서류"
          />
        )}
        <Desk x={177} y={790} width={633} />
        <DeskPaper x={470} y={774} sign={processed && !tense} startFrame={91} />
        <Actor
          cast="clerk"
          x={396}
          y={86}
          height={902}
          seated
          handsOnly
          pose={clerkPose}
          writeStartFrame={91}
          prop={processed ? "pen" : "none"}
        />
        <Label x={480} y={816} width={410}>
          {tense ? "접수 대기" : "행정 접수"}
        </Label>
        {tense && (
          <div
            style={{
              position: "absolute",
              left: 1060,
              top: 357,
              color: C.red,
              fontFamily: FONT,
              fontWeight: 950,
              fontSize: 73,
            }}
          >
            …
          </div>
        )}
      </>
    );
  }
  if (beat.grammar === "empty-seats")
    return (
      <>
        <Space setting="hall" />
        <Chair x={550} y={345} />
        <Chair x={1328} y={345} />
        <Desk x={214} y={846} width={1510} />
        <Label x={550} y={850} width={420}>
          중화민국
        </Label>
        <Label x={1328} y={850} width={460}>
          중화인민공화국
        </Label>
        <div
          style={{
            position: "absolute",
            top: 548,
            left: 484,
            color: C.red,
            fontSize: 110,
            fontWeight: 900,
          }}
        >
          ×
        </div>
        <div
          style={{
            position: "absolute",
            top: 548,
            left: 1265,
            color: C.red,
            fontSize: 110,
            fontWeight: 900,
          }}
        >
          ×
        </div>
      </>
    );
  const observer = beat.mode === "observer";
  const truman = beat.mode === "truman-aid";
  const roc = beat.mode === "roc-stop";
  const cast: Cast = observer
    ? "observer"
    : truman
      ? "truman"
      : roc
        ? "chiang"
        : "japan";
  return (
    <>
      <Space setting="office" />
      <Chair x={644} />
      <Actor
        cast={cast}
        x={644}
        y={42}
        height={1070}
        seated
        pose={frame < 54 ? "read" : "explain-right"}
        prop={frame < 54 ? "folder" : "none"}
        expression="concerned"
        gaze={1}
      />
      <Desk x={288} y={864} width={890} />
      <DeskPaper x={912} y={850} />
      <div
        style={{
          position: "absolute",
          left: 1210,
          top: 385,
          width: 490,
          background: C.paper,
          border: `7px solid ${C.ink}`,
          padding: "26px 33px",
          fontFamily: FONT,
          color: C.ink,
          boxShadow: "0 22px 35px rgba(0,0,0,.22)",
        }}
      >
        <div style={{ fontSize: 27, color: C.red, fontWeight: 900 }}>
          기록의 쟁점
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.35,
            marginTop: 20,
          }}
        >
          {observer
            ? "정말 안정적인 해법인가?"
            : truman
              ? "군사 원조·고문 제공 안 함"
              : roc
                ? "대륙 공격 작전 중단"
                : beat.mode === "colony"
                  ? "50년간 지배한 식민지"
                  : beat.mode === "not-a-loophole"
                    ? "일본의 권리는 남았을까?"
                    : beat.mode === "question"
                      ? "왜 대만을 지키지 못했을까?"
                      : "대만을 잃는다는 것"}
        </div>
      </div>
    </>
  );
};
