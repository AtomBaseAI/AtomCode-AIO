#!/usr/bin/env python3
"""Run every MCQ codesnippet and print its output, for eyeball-verification of CorrectOption."""
import json, subprocess, sys, tempfile, os

for fp in sys.argv[1:]:
    with open(fp) as f:
        data = json.load(f)
    for i, q in enumerate(data["questions"]):
        if not q.get("iscodesnippet"):
            continue
        fd, path = tempfile.mkstemp(suffix=".py", dir=os.path.dirname(os.path.abspath(__file__)))
        with os.fdopen(fd, "w") as f:
            f.write(q["codesnippet"])
        try:
            p = subprocess.run([sys.executable, path], capture_output=True, text=True, timeout=10)
        finally:
            os.unlink(path)
        out = p.stdout.rstrip("\n")
        err = (p.stderr.strip().splitlines() or [""])[-1]
        print(f"--- {q['title']} (CorrectOption={q['CorrectOption']}) ---")
        print("output:", out if out else ("<empty>",))
        if p.returncode != 0:
            print("exception:", err)
