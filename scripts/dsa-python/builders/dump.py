import json, sys
nn = sys.argv[1]
d = json.load(open(f'/home/z/tmp/dsa-export/dsa-python/day-{nn}.code.json'))
out = []
out.append(f"=== DAY {d.get('day')} ===")
for t in d.get('topics', []):
    out.append(f"TOPIC: {t.get('name')} | subtopics: {t.get('subtopics')}")
for i, q in enumerate(d['questions']):
    out.append(f"\n{'='*80}\n[{i}] {q['title']}   lang={q.get('lang')} type={q.get('questionType')} diff={q.get('difficulty')}")
    out.append(f"TOPIC: {q.get('topic')} | SUB: {q.get('subtopic')}")
    out.append(f"BLACKLIST: {q.get('blacklist')}")
    out.append(f"WHITELIST: {q.get('whitelist')}")
    out.append(f"INPUTCONSTRAINTS: {q.get('inputconstrains')}")
    out.append(f"DESCRIPTION:\n{q.get('description')}")
    slots = [('sampleinput1','sampleoutput1'),('sampleinput2','sampleoutput2'),('input1','output1'),('input2','output2'),('input3','output3')]
    for ik, ok in slots:
        inp = (q.get(ik) or '').strip()
        outp = (q.get(ok) or '').strip()
        if inp or outp:
            out.append(f"  {ik}: {json.dumps(inp)}\n  {ok}: {json.dumps(outp)}")
    out.append(f"SOURCECODE:\n{q.get('sourcecode')}")
open(f'/home/z/my-project/scripts/dsa-python/work/day-{nn}.txt','w').write('\n'.join(out))
print('written', len(d['questions']), 'questions')
