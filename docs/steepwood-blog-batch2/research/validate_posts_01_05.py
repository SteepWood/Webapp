from pathlib import Path
import re
slugs=['laundry-joinery-cost-nsw','kitchen-renovation-timeline-lead-times-nsw','porcelain-sintered-stone-benchtop-cost-nsw','butlers-pantry-cost-nsw','cabinetry-cost-per-linear-metre-nsw']
base=Path('/home/user/workspace/build/steepwood-blog-batch2/posts')
for slug in slugs:
 s=(base/(slug+'.md')).read_text(); front,body=s.split('---',2)[1:]
 wc=len(re.findall(r"\b[\w’'-]+\b",body))
 links=re.findall(r'\]\((/[^)]+)\)',body)
 ext=re.findall(r'\]\((https?://[^)]+)\)',body)
 h2=re.findall(r'^## (.+)$',body,re.M)
 faq=re.findall(r'^### ',body,re.M)
 bad=[x for x in ['!','*','scrape','crawl'] if x in s.lower()]
 hazards=re.findall(r'<\d',s)
 ctas=len(re.findall(r'^> \*\*STEEPWOOD ',body,re.M))
 print(f'{slug}\n words={wc} internal={len(links)} external={len(ext)} h2={len(h2)} faq={len(faq)} ctas={ctas} bad={bad} hazards={hazards[:3]}')
 print(' links',links)
