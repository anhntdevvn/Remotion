# Production plan — Taiwan after World War II

## Locked creative direction

- Channel: `기묘한 기록실`
- Market: South Korea
- Format: fully coded faceless animated documentary
- Target runtime: 10:40, adjustable after Korean TTS
- Reference footage in final video: none
- Visual target: at least 90% React/SVG/Remotion-native
- Key Korean-market angle: the Korean War as the direct strategic pivot in U.S. Taiwan policy
- Character-led visual language: recurring modular actors remain the primary storytelling layer across the full episode; maps, documents, timelines and labels appear as props inside acted scenes.

## Deliverables already prepared

- Reference analysis
- Story structure
- Verified research and source list
- Korean publishing script
- Parallel Vietnamese review script
- Scene map
- Asset manifest
- Image prompt list
- Audio plan
- Episode configuration
- Thumbnail plan
- Korean title options

## Implementation architecture

```text
src/episodes/taiwan-after-ww2/
├── planning/
├── data/
│   ├── narration.ko.json
│   ├── narration.vi.json
│   ├── captions.ko.json
│   ├── audio_manifest.json
│   └── scene_timing.json
├── components/
│   ├── ArchiveFrame.tsx
│   ├── CharacterPuppet.tsx
│   ├── DocumentCard.tsx
│   ├── HistoricalFlag.tsx
│   ├── MapLayer.tsx
│   ├── PolicyDrawer.tsx
│   └── TreatyHighlight.tsx
├── scenes/
│   └── S01...S21
├── TaiwanAfterWW2Video.tsx
└── register.tsx
```

## Phase 1 — Script lock

1. Review the Vietnamese parallel version.
2. Verify that every Korean paragraph has the same meaning and certainty level.
3. Native Korean language pass for rhythm, particles and documentary phrasing.
4. Lock names and pronunciation dictionary.
5. Mark breaths and pauses before TTS.

**Exit condition:** Korean script approved and no factual changes pending.

## Phase 2 — Voice and timing

1. Generate Korean TTS paragraph by paragraph using the `KO-###` IDs.
2. Loudness-normalize clips consistently.
3. Measure exact duration of every clip with Mediabunny.
4. Add planned pauses.
5. Generate `audio_manifest.json`.
6. Derive scene lengths from narration instead of forcing the current estimates.
7. Create Korean captions using the Remotion `Caption` JSON shape.

**Exit condition:** one continuous voice track, verified pronunciation, exact scene timing.

## Phase 3 — Visual system

1. Build the archive-room master frame.
2. Build one reusable character puppet with configurable hair, uniform, suit, face, expression, pose, gaze, headwear and accessories. Use it throughout the full episode for named figures, officials, soldiers and crowds.
3. Build the map layer system using SVG paths and deterministic interpolation.
4. Build document cards and line-highlighting animation.
5. Build flags as project-native SVG.
6. Build the policy drawer and evidence-board components.
7. Establish typography and safe areas for Korean text.

**Exit condition:** design-system preview renders correctly at 1920×1080 and at mobile thumbnail scale.

## Phase 4 — Scene implementation order

Implement in this order to maximize component reuse:

1. S01, S02, S03 — archive, paper and timeline foundation.
2. S04, S12, S15, S16 — shared map system.
3. S06, S08, S14, S18 — shared character and meeting-room system.
4. S07, S09, S19 — shared treaty/document system.
5. S13, S20, S21 — archive interactions and ending.
6. S05, S10, S11, S17 — specialized supporting scenes.

## Phase 5 — Audio design

1. Create seven restrained music motifs or select licensed tracks matching them.
2. Produce the nine reusable SFX families in `08_audio_plan.json`.
3. Duck music under narration.
4. Remove rhythmic elements from the February 28 section.
5. Preserve the planned silence around Article 2(b).

## Phase 6 — Review renders

1. Render stills from S01, S04, S06, S10, S15, S19 and S21.
2. Review Korean font sizing and line breaks.
3. Render a 30-second hook preview.
4. Render the Korea pivot section.
5. Render the treaty reveal and ending.
6. Check visual-to-narration match before full render.

## Phase 7 — Final QA

- Facts match `03_verified_research.md`.
- Every legal-status statement retains neutral wording.
- Korean voice sounds native and names are pronounced correctly.
- Vietnamese review text still matches the final Korean script.
- No reference artwork, frames or footage appear in the output.
- Maps show the correct year and administrative context.
- Captions fit within title-safe margins.
- No frame depends on random values or CSS animations.
- Master loudness is approximately -14 LUFS with peak at or below -1 dBTP.
- Sources are listed in the YouTube description.

## Immediate next build step

After script approval, generate Korean TTS and exact timing first. Do not start by drawing all 21 scenes against provisional timestamps; voice timing is the source of truth for the Remotion sequence lengths.
