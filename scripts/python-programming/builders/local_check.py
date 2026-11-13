#!/usr/bin/env python3
"""Local pre-check harness (authoring aid): run each code question's sourcecode against its 5 cases.
Temporary authoring tool — not part of the shipped bank."""
import json, subprocess, sys, tempfile, os

def norm(v):
    s = str(v or "").replace("\r\n", "\n")
    lines = [l.rstrip(" \t") for l in s.split("\n")]
    s = "\n".join(lines)
    s = s.rstrip("\n")
    return s.strip()

def run_case(code, inp):
    fd, path = tempfile.mkstemp(suffix=".py", dir=os.path.dirname(os.path.abspath(__file__)))
    with os.fdopen(fd, "w") as f:
        f.write(code)
    try:
        p = subprocess.run([sys.executable, path], input=inp, capture_output=True, text=True, timeout=20)
        return p.stdout, p.stderr
    finally:
        os.unlink(path)

def check(fp):
    with open(fp) as f:
        data = json.load(f)
    fails = 0
    for q in data["questions"]:
        cases = [
            (q["sampleinput1"], q["sampleoutput1"]),
            (q["sampleinput2"], q["sampleoutput2"]),
            (q["input1"], q["output1"]),
            (q["input2"], q["output2"]),
            (q["input3"], q["output3"]),
        ]
        bl = [t.strip() for t in (q.get("blacklist") or "").split(",") if t.strip()]
        wl = [t.strip() for t in (q.get("whitelist") or "").split(",") if t.strip()]
        for kw in bl:
            if kw in q["sourcecode"]:
                print(f"BLACKLIST-HIT [{q['title']}]: {kw}")
                fails += 1
        for kw in wl:
            if kw not in q["sourcecode"]:
                print(f"WHITELIST-MISS [{q['title']}]: {kw}")
                fails += 1
        for i, (inp, exp) in enumerate(cases):
            out, err = run_case(q["sourcecode"], inp)
            if norm(out) != norm(exp):
                fails += 1
                print(f"CASE-FAIL [{q['title']}] case{i+1}: expected {norm(exp)!r} got {norm(out)!r}")
                if err:
                    print("   stderr:", err.strip().splitlines()[-1] if err.strip() else "")
    print(f"{fp}: {'ALL OK' if fails == 0 else str(fails) + ' FAILURES'}")
    return fails

total = 0
for fp in sys.argv[1:]:
    total += check(fp)
sys.exit(1 if total else 0)
