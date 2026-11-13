#!/usr/bin/env python3
"""Authoring aid: execute every code-snippet MCQ and print its stdout + correct option."""
import json, sys, io, contextlib


def run(snippet):
    buf = io.StringIO()
    g = {"__name__": "__main__"}
    with contextlib.redirect_stdout(buf):
        exec(compile(snippet, "<snippet>", "exec"), g)
    return buf.getvalue()


for fp in sys.argv[1:]:
    with open(fp) as f:
        data = json.load(f)
    for q in data["questions"]:
        if q.get("iscodesnippet"):
            out = run(q["codesnippet"])
            opt = q["Option" + str(q["CorrectOption"])]
            match = "MATCH" if out.strip() == opt.strip() else "*** MISMATCH ***"
            print(f"--- {q['title']} (correct={q['CorrectOption']}) [{match}] ---")
            print(repr(out))
            print(f"    expected option text: {opt!r}")
