# Character system QA log

## CHAR-001 — Mouth appears as a dark ring

- **Observed in:** concerned Japanese soldier.
- **Root cause:** the concerned mouth is placed very low on the face (`y=242`) while the head ends at `y=253`. The rounded, stroked neck begins behind the head at `y=221` and remains visible directly below the chin. At small display sizes, the mouth arc and the visible neck/chin outline visually join into one dark oval.
- **Systemic risk:** every low mouth shape, especially `concerned` and open speaking phonemes, can collide with the chin/neck outline.
- **Required future fix:** define a facial-feature safe area; move all mouth paths above its lower boundary; mask the neck stroke behind the head or redraw the neck without a top/bottom outline that can read as a second mouth.
- **Acceptance check:** every expression and speaking mouth must remain distinct at full resolution and at 25% preview scale.

## CHAR-002 — Raised arm disappears behind caption panel

- **Status:** resolved in the character-system preview; prevention rules remain mandatory for later scenes.
- **Observed in:** speaking Japanese officer using `explain-right`.
- **Root cause:** the pose rotates the right arm outside the nominal 300 px character box. The caption panel is rendered after the character and occupies the same screen region, so its opaque background covers the forearm and hand.
- **Systemic risk:** pointing, explaining and saluting poses extend beyond the neutral character bounds and can be hidden by captions, props or adjacent actors.
- **Required future fix:** attach pose-specific visual bounds (`extentLeft`, `extentRight`, `extentTop`) to every pose; reserve those bounds during scene layout; separate background, actor, prop and foreground-caption layers; run collision checks before render.
- **Acceptance check:** hands and held props remain completely visible unless an occlusion is explicitly storyboarded.

## CHAR-003 — Pointing hand separates from the forearm

- **Status:** resolved in the reusable rig.
- **Root cause:** the original arm used nested rotate/scale transforms and a separate finger stroke. Mirroring changed the apparent joint direction, producing a detached vertical hand and horizontal bar.
- **Implemented fix:** arms now use explicit shoulder, elbow and wrist coordinates for each pose. Pointing hands use one closed silhouette joined directly to the wrist.
- **Acceptance check:** the arm must read as one continuous limb for both left- and right-facing poses at 25% preview scale.

## Mandatory character QA before episode rendering

1. Render every expression at 100% and 25% scale.
2. Render every pose facing both directions.
3. Check pose-specific bounds against text, captions, maps and neighboring actors.
4. Check hands, hats and held objects at the first, middle and last frame of each action.
5. Treat accidental cropping or occlusion as a blocking visual defect.
