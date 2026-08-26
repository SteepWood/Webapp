import pplx_sdk
queries=[
 'NSW Fair Trading kitchen renovation contract HBCF',
 'SafeWork NSW engineered stone porcelain sintered stone 2026',
 'NSW strata renovation kitchen approval by-laws',
 'Australian laundry ventilation waterproofing guidance',
 'NSW building approvals alterations additions 2026',
]
results=pplx_sdk.search.web_many(queries, limit_per_query=5)
for q,entry in zip(queries,results):
 print('\nQUERY',q)
 if entry.ok:
  for hit in entry.result:
   print(hit.title, hit.url, hit.snippet[:300].replace('\n',' '))
 else: print('ERROR',entry.error)
