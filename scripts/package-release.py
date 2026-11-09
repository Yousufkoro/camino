"""Build a portable, unpublished Camino ZIP without Git, account metadata or build caches."""
from pathlib import Path
import zipfile,sys
root=Path(__file__).resolve().parents[1]
output=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else root/'work/camino-unreleased.zip'
output.parent.mkdir(parents=True,exist_ok=True)
files=[]
for path in (root/'dist').rglob('*'):
 if path.is_file() and not any(part in ('server','.openai') for part in path.relative_to(root/'dist').parts):files.append(path)
files.extend(path for folder in ['tests','scripts'] for path in (root/folder).glob('*.cjs'))
files.extend(root/name for name in ['wrangler.jsonc','worker/standalone.mjs','worker/academic-service.mjs','wrangler.ai.jsonc','wrangler.local.jsonc','worker/index.mjs','package.json','package-lock.json','HOSTING.md','AUDIT.md','TESTING.md','UX-REDESIGN.md','MULTI-DEGREE.md','RELEASE-0.5.md','RELEASE-0.6.md','CHECKLIST.md','README.md','scripts/build-standalone.py','scripts/package-release.py'])
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
 for path in sorted(set(files)):archive.write(path,'camino/'+str(path.relative_to(root)))
with zipfile.ZipFile(output) as archive:
 assert archive.testzip() is None
 assert not any('/.git/' in n or '/.openai/' in n or '/server/' in n or '/node_modules/' in n for n in archive.namelist())
 print('Unpublished ZIP:',output,'·',len(archive.namelist()),'files ·',output.stat().st_size,'bytes')
