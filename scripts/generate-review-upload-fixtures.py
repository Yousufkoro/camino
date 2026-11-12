# Optional synthetic fixtures; requires reportlab, pypdf, Pillow and DejaVu Sans.
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from PIL import Image,ImageDraw
from pypdf import PdfReader,PdfWriter
import io,json
p=Path(__file__).resolve().parents[1]/'tests'/'fixtures'/'reviewer-upload'
p.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('ReviewUnicode','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
def make(name,pages):
 c=canvas.Canvas(str(p/name),pagesize=(612,792))
 for lines in pages:
  c.setFont('ReviewUnicode',12)
  for x,y,t in lines:c.drawString(x,y,t)
  c.showPage()
 c.save()
make('two-pages.pdf',[[(40,740,'I built a sensor for the garden.'),(40,724,'I compared two measurements before changing the code.'),(40,670,'The second trial was more consistent.'),(40,654,'I learned to test one change at a time.')],[(40,740,'I shared the results with my teammates.'),(40,724,'We kept the unsuccessful trials in our notebook.'),(40,670,'The next team repeated our method.'),(40,654,'Their observations helped us improve it.')]])
make('unicode.pdf',[[(40,740,'I learned to ask “why” before changing a design.'),(40,710,'Café sessions made our naïve assumptions visible — Ω was our symbol.')]])
make('columns.pdf',[[(40,755,'Synthetic activities and responsibilities'),(40,700,'PROJECTS'),(330,700,'RESPONSIBILITIES'),(40,678,'Sensor workshop'),(330,678,'Library volunteering'),(40,656,'I built a working sensor.'),(330,656,'I scheduled weekly sessions.'),(40,634,'I taught three classmates.'),(330,634,'I organized reading materials.')]])
make('eleven-pages.pdf', [[(40,740,f'Synthetic page {i+1}.')] for i in range(11)])
make('blank.pdf',[[]])
im=Image.new('RGB',(700,180),'white');ImageDraw.Draw(im).text((20,30),'Synthetic scanned statement. No extractable text.',fill='black');buf=io.BytesIO();im.save(buf,format='PNG');buf.seek(0);c=canvas.Canvas(str(p/'scanned.pdf'));c.drawImage(ImageReader(buf),40,500,width=500,height=130);c.save()
w=PdfWriter();w.append(PdfReader(str(p/'two-pages.pdf')));w.encrypt('synthetic-only');w.write(str(p/'password.pdf'))
(p/'unicode.txt').write_text('I built a sensor — then revised it.\n\nCafé discussions taught me to ask “why.” Ω\n',encoding='utf-8')
(p/'utf16-le.txt').write_bytes(('\ufeffI built a sensor.\n\nCafé discussions changed my approach.').encode('utf-16le'))
(p/'utf16-be.txt').write_bytes(('\ufeffI built a sensor.\n\nCafé discussions changed my approach.').encode('utf-16be'))
(p/'invalid-utf8.txt').write_bytes(b'I built a sensor.\xff\x80')
(p/'binary.txt').write_bytes(b'not\x00plain\x01text')
(p/'corrupt.pdf').write_bytes(b'%PDF-1.7\nNot a valid PDF document.')
print(json.dumps({f.name:f.stat().st_size for f in p.iterdir()}))
