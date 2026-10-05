import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { HookScene } from './scenes/HookScene';
import { PrologueScene } from './scenes/PrologueScene';
import { UtahCabinScene } from './scenes/UtahCabinScene';
import { MexicanWaterScene } from './scenes/MexicanWaterScene';
import { SnowplowScene } from './scenes/SnowplowScene';
import { MillersCreekScene } from './scenes/MillersCreekScene';
import { EpilogueScene } from './scenes/EpilogueScene';

import {
  SCENE_0_HOOK,
  SCENE_1_PROLOGUE,
  SCENE_2_UTAH_CABIN,
  SCENE_3_MEXICAN_WATER,
  SCENE_4_SNOWPLOW_RIDGE,
  SCENE_5_MILLERS_CREEK,
  SCENE_6_EPILOGUE,
  SCENE_TRANSITION_FRAMES,
} from './scenesData';

export const SkinwalkerVideo: React.FC = () => {
  const transitionTiming = linearTiming({ durationInFrames: SCENE_TRANSITION_FRAMES });

  return (
    <AbsoluteFill style={{ backgroundColor: '#030508' }}>
      <TransitionSeries>
        {/* Scene 0: Cold Open Hook & Main Title Reveal */}
        <TransitionSeries.Sequence
          name="Scene-0-Hook"
          durationInFrames={SCENE_0_HOOK.durationInFrames}
        >
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 1: Historical & Cultural Framing */}
        <TransitionSeries.Sequence
          name="Scene-1-Prologue"
          durationInFrames={SCENE_1_PROLOGUE.durationInFrames}
        >
          <PrologueScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 2: Utah Cabin Incident */}
        <TransitionSeries.Sequence
          name="Scene-2-Utah-Cabin"
          durationInFrames={SCENE_2_UTAH_CABIN.durationInFrames}
        >
          <UtahCabinScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 3: Mexican Water Incident */}
        <TransitionSeries.Sequence
          name="Scene-3-Mexican-Water"
          durationInFrames={SCENE_3_MEXICAN_WATER.durationInFrames}
        >
          <MexicanWaterScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 4: Monticello Ridge Snowplow Encounter */}
        <TransitionSeries.Sequence
          name="Scene-4-Snowplow-Ridge"
          durationInFrames={SCENE_4_SNOWPLOW_RIDGE.durationInFrames}
        >
          <SnowplowScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 5: Miller's Creek Farmhouse Disappearance */}
        <TransitionSeries.Sequence
          name="Scene-5-Millers-Creek"
          durationInFrames={SCENE_5_MILLERS_CREEK.durationInFrames}
        >
          <MillersCreekScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* Scene 6: Epilogue & Unresolved Inquiry */}
        <TransitionSeries.Sequence
          name="Scene-6-Epilogue"
          durationInFrames={SCENE_6_EPILOGUE.durationInFrames}
        >
          <EpilogueScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
