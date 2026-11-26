#!/usr/bin/env python3
"""Repair day-02 sourcecode for dsa-python. Writes data/day-02.code.json + day-02.mcq.json."""
import json, os

SRC = "/home/z/tmp/dsa-export/dsa-python/day-02.code.json"
MCQ_SRC = "/home/z/tmp/dsa-export/dsa-python/day-02.mcq.json"
OUT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

CODES = [
    # Q0 Count Stride-Three Iterations (bl='' wl='')
    "n = int(input())\ncount = 0\ni = 0\nwhile i < n:\n    i += 3\n    count += 1\nprint(count)\n",
    # Q1 Count Single Loop Iterations (bl='' wl='')
    "n = int(input())\ncount = 0\nfor i in range(n):\n    count += 1\nprint(count)\n",
    # Q2 Count Nested Loop Iterations (bl='' wl='')
    "n = int(input())\ncount = 0\nfor i in range(n):\n    for j in range(n):\n        count += 1\nprint(count)\n",
    # Q3 Pair Comparison Count (bl='' wl='')
    "n = int(input())\nprint(n * (n - 1) // 2)\n",
    # Q4 Linear Versus Quadratic Growth (bl='' wl='')
    "n = int(input())\nprint(n, n * n)\n",
    # Q5 Loop Sum of First N (bl='' wl='')
    "n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)\n",
    # Q6 Pairwise Handshakes at Orientation (bl='' wl='')
    "n = int(input())\nprint(n * (n - 1) // 2)\n",
    # Q7 Doubling Upload Chunks (bl='' wl='')
    "n = int(input())\nsize = 1\nsteps = 0\nwhile size < n:\n    size *= 2\n    steps += 1\nprint(steps)\n",
    # Q8 Grid Cell Visits (bl='' wl='')
    "n = int(input())\nprint(n * n)\n",
    # Q9 Queue Halving Announcements (bl='' wl='')
    "n = int(input())\nsteps = 0\nwhile n >= 1:\n    n //= 2\n    steps += 1\nprint(steps)\n",
    # Q10 Classify the Growth Curve (bl='print,input' wl='if')
    "import sys\n\n\ndef classify_growth(t1, t2):\n    if t2 == t1:\n        return 0\n    if t2 == 2 * t1:\n        return 1\n    if t2 == 4 * t1:\n        return 2\n    if t2 == t1 + 1:\n        return 3\n    return 9\n\n\ndata = sys.stdin.read().split()\nsys.stdout.write(str(classify_growth(int(data[0]), int(data[1]))) + \"\\n\")\n",
    # Q11 Panel Pairwise Visits (No Shortcut) (bl='*' wl='for')
    "import sys\n\n\ndef visit_count(n):\n    total = 0\n    for i in range(n):\n        for j in range(i + 1):\n            total += 1\n    return total\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(visit_count(n)) + \"\\n\")\n",
    # Q12 Reshelve Mixed Loop Steps (bl='math,print,input' wl='while')
    "import sys\n\n\ndef mixed_count(n):\n    total = 0\n    for i in range(n):\n        j = i\n        while j > 0:\n            j //= 2\n            total += 1\n    return total\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(mixed_count(n)) + \"\\n\")\n",
    # Q13 Tournament Rounds (bl='math,print,input' wl='while')
    "import sys\n\n\ndef tournament_rounds(n):\n    players = n\n    rounds = 0\n    while players > 1:\n        players = (players + 1) // 2\n        rounds += 1\n    return rounds\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(tournament_rounds(n)) + \"\\n\")\n",
    # Q14 Linear versus Binary Step Race (bl='math,print,input' wl='while')
    "import sys\n\n\ndef step_race(n):\n    halvings = 0\n    m = n\n    while m > 0:\n        m //= 2\n        halvings += 1\n    return (n, halvings)\n\n\nn = int(sys.stdin.read().strip())\nlinear, binary = step_race(n)\nsys.stdout.write(str(linear) + \" \" + str(binary) + \"\\n\")\n",
    # Q15 Dynamic Array Copy Count (bl='math,print,input' wl='for')
    "import sys\n\n\ndef copy_count(n):\n    capacity = 1\n    size = 0\n    copies = 0\n    for _ in range(n):\n        if size == capacity:\n            copies += capacity\n            capacity *= 2\n        size += 1\n    return copies\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(copy_count(n)) + \"\\n\")\n",
    # Q16 Item Budget Ceiling (bl='math,print,input' wl='while')
    "import sys\n\n\ndef max_items(budget):\n    n = 1\n    total = 0\n    while total + n <= budget:\n        total += n\n        n += 1\n    return n\n\n\nbudget = int(sys.stdin.read().strip())\nsys.stdout.write(str(max_items(budget)) + \"\\n\")\n",
    # Q17 Stage Pyramid Blocks (bl='print,input' wl='for')
    "import sys\n\n\ndef pyramid_blocks(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i * (i + 1) // 2\n    return total\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(pyramid_blocks(n)) + \"\\n\")\n",
    # Q18 Even-Divisor Loop Trace (bl='math,print,input' wl='while')
    "import sys\n\n\ndef even_step_sum(n):\n    total = 0\n    for i in range(1, n + 1):\n        j = i\n        while j % 2 == 0:\n            j //= 2\n            total += 1\n    return total\n\n\nn = int(sys.stdin.read().strip())\nsys.stdout.write(str(even_step_sum(n)) + \"\\n\")\n",
    # Q19 Viral Message Spread (bl='math,print,input' wl='while')
    "import sys\n\n\ndef spread_report(target):\n    reach = 1\n    hours = 0\n    while reach < target:\n        reach *= 2\n        hours += 1\n    return (hours, reach - target)\n\n\ntarget = int(sys.stdin.read().strip())\nhours, overshoot = spread_report(target)\nsys.stdout.write(str(hours) + \" \" + str(overshoot) + \"\\n\")\n",
]


def main():
    doc = json.load(open(SRC))
    qs = doc["questions"]
    assert len(qs) == len(CODES), (len(qs), len(CODES))
    for q, code in zip(qs, CODES):
        bl = [k.strip() for k in (q.get("blacklist") or "").split(",") if k.strip()]
        wl = [k.strip() for k in (q.get("whitelist") or "").split(",") if k.strip()]
        for k in bl:
            assert k not in code, f"blacklist hit {k!r} in {q['title']}"
        for k in wl:
            assert k in code, f"whitelist missing {k!r} in {q['title']}"
        compile(code, q["title"], "exec")
        q["sourcecode"] = code
    os.makedirs(OUT_DIR, exist_ok=True)
    json.dump(doc, open(f"{OUT_DIR}/day-02.code.json", "w"), indent=2)

    mcq = json.load(open(MCQ_SRC))
    mcq["questions"] = [{k: v for k, v in item.items() if k != "_id"} for item in mcq["questions"]]
    json.dump(mcq, open(f"{OUT_DIR}/day-02.mcq.json", "w"), indent=2)
    print("day-02 written:", len(qs), "code questions,", len(mcq["questions"]), "mcq")


if __name__ == "__main__":
    main()
