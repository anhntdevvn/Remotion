"""Check isolation, complete picture coverage, voice assets and sentence mapping."""
from pathlib import Path
import hashlib,json,collections
ROOT=Path(__file__).resolve().parents[1]
PROJECT=ROOT.parents[2]
shots=json.loads((ROOT/'data/storyboard.json').read_text())
voice=json.loads((ROOT/'data/voice_timing.json').read_text())
sentences=json.loads((ROOT/'data/sentences.json').read_text())
manifest=json.loads((ROOT/'planning/preserved_original_sha256.json').read_text())
for rel,digest in manifest.items():
 p=PROJECT/rel
 assert p.exists() and hashlib.sha256(p.read_bytes()).hexdigest()==digest, f'Original changed: {p}'
assert shots[0]['start']==0
for a,b in zip(shots,shots[1:]):assert a['start']+a['duration']==b['start'], (a['id'],b['id'])
assert shots[-1]['start']+shots[-1]['duration']==14358
assert set(s['sentenceId'] for s in shots)==set(s['id'] for s in sentences)
assert len({s['id'] for s in shots})==len(shots)
known={'colony','collapse','question','field','port','crowd','curfew','rebuild','map','archive','rewind','comparison','summary','options','ending','korea','fleet','meeting','handover','signing','observer','administration','absent','conference','office'}
assert set(s['kind'] for s in shots)<=known
for key,c in voice['clips'].items():
 assert 'taiwan-after-ww2-staged/' in c['file'],key
 assert (PROJECT/'public'/c['file']).is_file(),c['file']
 original=PROJECT/'public'/c['file'].replace('taiwan-after-ww2-staged','taiwan-after-ww2')
 assert hashlib.sha256(original.read_bytes()).digest()==hashlib.sha256((PROJECT/'public'/c['file']).read_bytes()).digest(),key
for p in ROOT.rglob('*.tsx'):
 assert "from '../taiwan-after-ww2/" not in p.read_text()
 assert "from '../../taiwan-after-ww2/" not in p.read_text()
print(f'PASS: {len(manifest)} original files unchanged; {len(shots)} contiguous shots; {len(sentences)} sentences; 37 voice snapshots identical.')
print('Staging counts:',dict(collections.Counter(s['kind'] for s in shots)))
