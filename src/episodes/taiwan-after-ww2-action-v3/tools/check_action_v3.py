"""Check continuity, unchanged speech and isolation without rendering video."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parents[2]
old = PROJECT / 'src/episodes/taiwan-after-ww2'
read = lambda path: json.loads(path.read_text())
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
beats = read(ROOT / 'data/beats.json')
timing = read(ROOT / 'data/full_timing.json')
original = read(old / 'data/full_timing.json')
assert timing['durationInFrames'] == original['durationInFrames'] == 14358
assert beats[0]['start'] == 810
for i, b in enumerate(beats):
    assert b['duration'] > 0
    end = beats[i+1]['start'] if i+1 < len(beats) else 14358
    assert b['start'] + b['duration'] == end, ('gap/overlap', b['id'])
    assert b['action'] and b['target']
    assert b['clipId'] in timing['clips']
for clip_id, clip in timing['clips'].items():
    reference = original['clips'][clip_id]
    assert clip['text'] == reference['text'], ('changed narration', clip_id)
    assert clip.get('startFrame') == reference.get('startFrame')
    assert clip['durationSec'] == reference['durationSec']
    assert sha(PROJECT / 'public' / clip['file']) == sha(PROJECT / 'public' / reference['file'])
assert timing['captions'] == original['captions']
rendered_captions = read(ROOT / 'data/captions.json')
normalize = lambda text: re.sub(r'\s+', '', text)
assert normalize(''.join(c['text'] for c in rendered_captions)) == normalize(''.join(c['text'] for c in timing['clips'].values()))
sentences = read(ROOT / 'data/sentences.json')
assert {b['sentenceId'] for b in beats} == {s['id'] for s in sentences if s['start'] >= 810}
for b in beats:
    sentence = next(s for s in sentences if s['id'] == b['sentenceId'])
    clip = timing['clips'][b['clipId']]
    earliest = min(sentence['start'], clip['startFrame'])
    assert b['start'] >= earliest
    assert b['start'] <= sentence['end']
hooks = [b for b in beats if b.get('hook')]
assert all(b.get('hookVi') for b in hooks)
preserved = read(ROOT / 'planning/preserved_versions.json')
for path, expected in preserved.items():
    assert sha(PROJECT / path) == expected, ('preserved file changed', path)
for file in ROOT.rglob('*.tsx'):
    assert "from '../taiwan-after-ww2/" not in file.read_text()
    assert "from '../taiwan-after-ww2-staged/" not in file.read_text()
result = {
    'status': 'passed', 'frames': 14358, 'seconds': 478.6,
    'beats_after_opening': len(beats), 'scene_grammars': len({b['grammar'] for b in beats}),
    'visual_micro_hooks': len(hooks), 'unchanged_voice_clips': len(timing['clips']),
    'preserved_files': len(preserved), 'rendered': False,
}
(ROOT / 'planning/continuity_check.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result))
