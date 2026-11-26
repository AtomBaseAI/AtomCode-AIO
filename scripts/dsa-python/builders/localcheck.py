"""Local pre-check: run each question's sourcecode against all testcase slots."""
import json
import subprocess
import sys

SLOTS = [('sampleinput1', 'sampleoutput1'), ('sampleinput2', 'sampleoutput2'),
         ('input1', 'output1'), ('input2', 'output2'), ('input3', 'output3')]


def check_file(path):
    data = json.load(open(path))
    fails = 0
    total = 0
    for i, q in enumerate(data['questions']):
        for si, so in SLOTS:
            inp = q.get(si) or ''
            exp = q.get(so) or ''
            if exp.strip() == '':
                continue
            total += 1
            try:
                r = subprocess.run([sys.executable, '-c', q['sourcecode']],
                                   input=inp, capture_output=True, text=True, timeout=30)
                got, rc = r.stdout, r.returncode
                err = r.stderr
            except subprocess.TimeoutExpired:
                got, rc, err = '', 'TIMEOUT', ''
            if rc != 0 or got.strip() != exp.strip():
                fails += 1
                print(f'FAIL q[{i}] {q["title"]} slot={si} rc={rc}')
                print('  expected:', repr(exp[:150]))
                print('  actual  :', repr(got[:150]))
                if err.strip():
                    print('  stderr  :', err.strip()[:300])
    print(f'LOCAL: file={path} cases={total} fails={fails}')
    return fails


if __name__ == '__main__':
    sys.exit(1 if check_file(sys.argv[1]) else 0)
