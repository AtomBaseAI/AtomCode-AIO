#!/usr/bin/env python3
"""MCQ snippet verifier (authoring aid): runs every codesnippet MCQ locally with
python3 and compares stdout against the expected output recorded below.
Skips snippets that hang by design (verified by reasoning instead).
Usage: python3 scripts/python-programming/builders/check_mcq_snippets.py 19 20"""
import json, subprocess, sys, tempfile, os

EXPECTED = {
    "19": {
        "Locked Counter Snippet": "6",
        "run() Versus start()": "ran\ndone",
        "Slot Filling Threads": "52",
        "Unawaited Coroutine": "coroutine",
        "is_alive Before start": "False",
        "Await Chain Output": "35",
        "gather Order and Sum": "32 2",
        "Daemon Thread Lifetime": "bye",
    },
    "20": {
        "Second Read After EOF": "5 0",
        "Truncate on Rewrite": "new",
        "Line Length Tally": "5",
        "Append After Write": "AB",
        "Readline Progression": "one\ntwo",
        "write() Return Value": "8",
        "closed After with Block": "True",
        "readlines Shape": "3 r",
        "seek and tell Walk": "0\n2\nabc",
    },
}
# Non-terminating by design — verified by reasoning, never executed:
#   day 19 "Lock Reacquire Deadlock" (plain Lock acquired twice in one thread -> deadlock)
SKIP = {"Lock Reacquire Deadlock"}


def norm(s):
    lines = [ln.rstrip() for ln in str(s).replace("\r\n", "\n").split("\n")]
    return "\n".join(lines).rstrip("\n").strip()


def main():
    fails = 0
    for day in sys.argv[1:]:
        path = f"/home/z/my-project/scripts/python-programming/data/day-{day}.mcq.json"
        data = json.load(open(path))
        exp_map = EXPECTED.get(day, {})
        for q in data["questions"]:
            if not q.get("iscodesnippet"):
                continue
            title = q["title"]
            if title in SKIP:
                print(f"SKIP (hangs by design): {title}")
                continue
            if title not in exp_map:
                print(f"NO EXPECTED OUTPUT RECORDED: {title}")
                fails += 1
                continue
            fd, fn = tempfile.mkstemp(suffix=".py")
            with os.fdopen(fd, "w") as f:
                f.write(q["codesnippet"])
            try:
                r = subprocess.run([sys.executable, fn], capture_output=True, text=True, timeout=15)
            except subprocess.TimeoutExpired:
                print(f"FAIL (timeout) [{title}]")
                fails += 1
                continue
            finally:
                os.unlink(fn)
            got = norm(r.stdout)
            exp = norm(exp_map[title])
            if r.returncode == 0 and got == exp:
                print(f"OK   [{title}] -> {exp!r}")
            else:
                fails += 1
                print(f"FAIL [{title}] expected={exp!r} got={got!r} rc={r.returncode}")
    print("SNIPPET FAILS:", fails)
    sys.exit(1 if fails else 0)


main()
