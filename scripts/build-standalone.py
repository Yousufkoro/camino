"""Version authored frontend assets; standalone Workers serves dist directly."""
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parents[1]
p=root/'dist/index.html'
def version(match):
 name=match.group(2);file=root/'dist'/name
 if not file.exists():return match.group(0)
 return match.group(1)+name+'?v='+hashlib.sha256(file.read_bytes()).hexdigest()[:12]+match.group(3)
p.write_text(re.sub(r'(\b(?:src|href)=")([^"?]+\.(?:js|css))(?:\?v=[^"]*)?(")',version,p.read_text()))
print('Standalone asset versions updated. No account backend or institutional data was provisioned.')
