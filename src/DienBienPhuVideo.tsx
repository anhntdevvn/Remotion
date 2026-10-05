import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { IntroScene } from './scenes/IntroScene';
import { MapScene } from './scenes/MapScene';
import { PreparationScene } from './scenes/PreparationScene';
import { OpeningBattleScene } from './scenes/OpeningBattleScene';
import { TrenchScene } from './scenes/TrenchScene';
import { HillA1Scene } from './scenes/HillA1Scene';
import { FinalAssaultScene } from './scenes/FinalAssaultScene';
import { HistoricalImpactScene } from './scenes/HistoricalImpactScene';
import { OutroScene } from './scenes/OutroScene';
import {
  SCENE_1_HOOK,
  SCENE_2_WHY_DBP,
  SCENE_3_PREPARATION,
  SCENE_4_OPENING_BATTLE,
  SCENE_5_TRENCH_WARFARE,
  SCENE_6_HILL_A1,
  SCENE_7_FINAL_ASSAULT,
  SCENE_8_HISTORICAL_IMPACT,
  SCENE_9_OUTRO,
  FULL_VIDEO_DURATION_IN_FRAMES,
  SCENE_TRANSITION_FRAMES,
} from './data/scenesData';

export const DienBienPhuVideo: React.FC = () => {
  const transitionTiming = linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0908' }}>
      <Audio
        src={staticFile('audio/bg_drone.wav')}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(frame) =>
          interpolate(
            frame,
            [0, 30, FULL_VIDEO_DURATION_IN_FRAMES - 120, FULL_VIDEO_DURATION_IN_FRAMES],
            [0, 0.14, 0.14, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Scene-1-Hook"
          durationInFrames={SCENE_1_HOOK.durationInFrames}
        >
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-2-Why-DBP"
          durationInFrames={SCENE_2_WHY_DBP.durationInFrames}
        >
          <MapScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-3-Preparation"
          durationInFrames={SCENE_3_PREPARATION.durationInFrames}
        >
          <PreparationScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-4-Opening-Battle"
          durationInFrames={SCENE_4_OPENING_BATTLE.durationInFrames}
        >
          <OpeningBattleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-5-Trench-Warfare"
          durationInFrames={SCENE_5_TRENCH_WARFARE.durationInFrames}
        >
          <TrenchScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-6-Hill-A1"
          durationInFrames={SCENE_6_HILL_A1.durationInFrames}
        >
          <HillA1Scene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-7-Final-Assault"
          durationInFrames={SCENE_7_FINAL_ASSAULT.durationInFrames}
        >
          <FinalAssaultScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-8-Historical-Impact"
          durationInFrames={SCENE_8_HISTORICAL_IMPACT.durationInFrames}
        >
          <HistoricalImpactScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        <TransitionSeries.Sequence
          name="Scene-9-Outro"
          durationInFrames={SCENE_9_OUTRO.durationInFrames}
        >
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
