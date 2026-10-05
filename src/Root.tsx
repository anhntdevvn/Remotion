import React from 'react';
import './index.css';
import { Composition, Folder } from 'remotion';
import { DienBienPhuVideo } from './DienBienPhuVideo';
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
} from './data/scenesData';

// Skinwalker Documentary Episode
import { SkinwalkerVideo } from './episodes/skinwalker/SkinwalkerVideo';
import { HookScene } from './episodes/skinwalker/scenes/HookScene';
import { PrologueScene } from './episodes/skinwalker/scenes/PrologueScene';
import { UtahCabinScene } from './episodes/skinwalker/scenes/UtahCabinScene';
import { MexicanWaterScene } from './episodes/skinwalker/scenes/MexicanWaterScene';
import { SnowplowScene } from './episodes/skinwalker/scenes/SnowplowScene';
import { MillersCreekScene } from './episodes/skinwalker/scenes/MillersCreekScene';
import { EpilogueScene } from './episodes/skinwalker/scenes/EpilogueScene';
import {
  SCENE_0_HOOK,
  SCENE_1_PROLOGUE,
  SCENE_2_UTAH_CABIN,
  SCENE_3_MEXICAN_WATER,
  SCENE_4_SNOWPLOW_RIDGE,
  SCENE_5_MILLERS_CREEK,
  SCENE_6_EPILOGUE,
  FULL_EPISODE_DURATION_IN_FRAMES as SKINWALKER_DURATION,
} from './episodes/skinwalker/scenesData';
import {Scene01Preview} from './episodes/taiwan-after-ww2/scenes/Scene01Preview';
import {SCENE_01_PREVIEW} from './episodes/taiwan-after-ww2/scene01Timing';
import {CharacterSystemPreview} from './episodes/taiwan-after-ww2/scenes/CharacterSystemPreview';
import {TaiwanAfterWW2Video} from './episodes/taiwan-after-ww2/TaiwanAfterWW2Video';
import {FULL_EPISODE_FRAMES as TAIWAN_FULL_DURATION} from './episodes/taiwan-after-ww2/fullTiming';
import {StagedVideo} from './episodes/taiwan-after-ww2-staged/StagedVideo';
import {STAGED_DURATION} from './episodes/taiwan-after-ww2-staged/types';
import {StagedShot} from './episodes/taiwan-after-ww2-staged/scenes/StagedShot';
import stagedStoryboard from './episodes/taiwan-after-ww2-staged/data/storyboard.json';

import {ActionV3Video,actionBeats} from './episodes/taiwan-after-ww2-action-v3/ActionV3Video';
import {BeatScene as ActionV3Beat} from './episodes/taiwan-after-ww2-action-v3/scenes/BeatScene';

import {KoreaVideo, koreaBeats} from './episodes/korea-no-monarchy/KoreaVideo';
import {EPISODE_FRAMES as KOREA_FRAMES} from './episodes/korea-no-monarchy/duration';
import {KoreaThumbnail} from './episodes/korea-no-monarchy/Thumbnail';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Scenes">
        <Composition
          id="Scene-1-Hook"
          component={IntroScene}
          durationInFrames={SCENE_1_HOOK.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-2-Why-DBP"
          component={MapScene}
          durationInFrames={SCENE_2_WHY_DBP.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-3-Preparation"
          component={PreparationScene}
          durationInFrames={SCENE_3_PREPARATION.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-4-Opening-Battle"
          component={OpeningBattleScene}
          durationInFrames={SCENE_4_OPENING_BATTLE.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-5-Trench-Warfare"
          component={TrenchScene}
          durationInFrames={SCENE_5_TRENCH_WARFARE.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-6-Hill-A1"
          component={HillA1Scene}
          durationInFrames={SCENE_6_HILL_A1.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-7-Final-Assault"
          component={FinalAssaultScene}
          durationInFrames={SCENE_7_FINAL_ASSAULT.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-8-Historical-Impact"
          component={HistoricalImpactScene}
          durationInFrames={SCENE_8_HISTORICAL_IMPACT.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene-9-Outro"
          component={OutroScene}
          durationInFrames={SCENE_9_OUTRO.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Korea-No-Monarchy">
        <Composition id="Korea-No-Monarchy-Thumbnail" component={KoreaThumbnail} durationInFrames={1} fps={30} width={1920} height={1080}/>
        <Composition id="Korea-No-Monarchy-KO" component={KoreaVideo} durationInFrames={KOREA_FRAMES} fps={30} width={1920} height={1080}/>
        <Composition id="Korea-No-Monarchy-Opening" component={KoreaVideo} defaultProps={{startFrame:0,windowFrames:Math.min(1800,KOREA_FRAMES)}} durationInFrames={Math.min(1800,KOREA_FRAMES)} fps={30} width={1920} height={1080}/>
        <Folder name="Korea-Beats">
          {koreaBeats.map(beat=><Composition key={beat.id} id={`Korea-No-Monarchy-${beat.id}`} component={KoreaVideo} defaultProps={{startFrame:beat.startFrame,windowFrames:beat.durationInFrames}} durationInFrames={beat.durationInFrames} fps={30} width={1920} height={1080}/>)}
        </Folder>
      </Folder>

      {/* Main YouTube documentary cut with 12-frame crossfades between scenes. */}
      <Composition
        id="DienBienPhu1954"
        component={DienBienPhuVideo}
        durationInFrames={FULL_VIDEO_DURATION_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Skinwalker Documentary Episode */}
      <Folder name="Skinwalker-Scenes">
        <Composition
          id="Skinwalker-Scene-0-Hook"
          component={HookScene}
          durationInFrames={SCENE_0_HOOK.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-1-Prologue"
          component={PrologueScene}
          durationInFrames={SCENE_1_PROLOGUE.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-2-Utah-Cabin"
          component={UtahCabinScene}
          durationInFrames={SCENE_2_UTAH_CABIN.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-3-Mexican-Water"
          component={MexicanWaterScene}
          durationInFrames={SCENE_3_MEXICAN_WATER.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-4-Snowplow"
          component={SnowplowScene}
          durationInFrames={SCENE_4_SNOWPLOW_RIDGE.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-5-Millers-Creek"
          component={MillersCreekScene}
          durationInFrames={SCENE_5_MILLERS_CREEK.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Skinwalker-Scene-6-Epilogue"
          component={EpilogueScene}
          durationInFrames={SCENE_6_EPILOGUE.durationInFrames}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* Full Skinwalker Dark Documentary Feature */}
      <Composition
        id="SkinwalkerDocumentary"
        component={SkinwalkerVideo}
        durationInFrames={SKINWALKER_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      <Folder name="Taiwan-After-WW2">
        <Composition
          id="TaiwanAfterWW2"
          component={TaiwanAfterWW2Video}
          durationInFrames={TAIWAN_FULL_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Taiwan-Character-System"
          component={CharacterSystemPreview}
          durationInFrames={480}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Taiwan-Scene-01-Preview"
          component={Scene01Preview}
          durationInFrames={SCENE_01_PREVIEW.durationInFrames}
          fps={SCENE_01_PREVIEW.fps}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Taiwan-Action-V3">
        <Composition id="TaiwanAfterWW2-ActionV3" component={ActionV3Video} durationInFrames={14358} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-ActionV3-First-Minute" component={ActionV3Video} defaultProps={{startFrame:810,windowFrames:2242}} durationInFrames={2242} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-ActionV3-Cairo-Handover" component={ActionV3Video} defaultProps={{startFrame:3052,windowFrames:2365}} durationInFrames={2365} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-ActionV3-Cold-War" component={ActionV3Video} defaultProps={{startFrame:8454,windowFrames:2648}} durationInFrames={2648} fps={30} width={1920} height={1080}/>
        <Folder name="ActionV3-Beats">
          {actionBeats.map(beat=><Composition key={beat.id} id={`Taiwan-ActionV3-${beat.id}`} component={ActionV3Beat} defaultProps={{beat}} durationInFrames={beat.duration} fps={30} width={1920} height={1080}/>)}
        </Folder>
      </Folder>
      <Folder name="Taiwan-Staged-New">
        <Folder name="Staged-Shots">
          {stagedStoryboard.map((shot) => <Composition key={shot.id} id={`Taiwan-Staged-${shot.id}`} component={StagedShot} defaultProps={{shot}} durationInFrames={shot.duration} fps={30} width={1920} height={1080}/>)}
        </Folder>
        <Composition id="TaiwanAfterWW2-Staged" component={StagedVideo} durationInFrames={STAGED_DURATION} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-Staged-Opening" component={StagedVideo} defaultProps={{startFrame:0,windowFrames:1492}} durationInFrames={1492} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-Staged-Cairo" component={StagedVideo} defaultProps={{startFrame:3052,windowFrames:779}} durationInFrames={779} fps={30} width={1920} height={1080}/>
        <Composition id="Taiwan-Staged-Treaty" component={StagedVideo} defaultProps={{startFrame:11928,windowFrames:1809}} durationInFrames={1809} fps={30} width={1920} height={1080}/>
      </Folder>
    </>
  );
};
