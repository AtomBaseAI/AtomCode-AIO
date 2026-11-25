#!/usr/bin/env python3
"""Repair day-03 sourcecode for dsa-python. Writes data/day-03.code.json + day-03.mcq.json."""
import json, os

SRC = "/home/z/tmp/dsa-export/dsa-python/day-03.code.json"
MCQ_SRC = "/home/z/tmp/dsa-export/dsa-python/day-03.mcq.json"
OUT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

CODES = [
    # Q0 Alternate Playlist Shuffle (bl='zip,itertools' wl='while')
    "import sys\n\n\ndef interleave(a, b):\n    out = []\n    i = 0\n    while i < len(a) or i < len(b):\n        if i < len(a):\n            out.append(a[i])\n        if i < len(b):\n            out.append(b[i])\n        i += 1\n    return out\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\na = list(map(int, data[1:1 + n]))\nm = int(data[1 + n])\nb = list(map(int, data[2 + n:2 + n + m]))\nprint(\" \".join(map(str, interleave(a, b))))\n",
    # Q1 Reverse the List (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(\" \".join(map(str, lst[::-1])))\n",
    # Q2 Minimum and Maximum (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(min(lst), max(lst))\n",
    # Q3 Second Largest Element (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(sorted(set(lst))[-2])\n",
    # Q4 Remove Duplicates Keep Order (bl='' wl='')
    "import sys\n\ndef dedupe(lst):\n    seen = set()\n    out = []\n    for v in lst:\n        if v not in seen:\n            seen.add(v)\n            out.append(v)\n    return out\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(\" \".join(map(str, dedupe(lst))))\n",
    # Q5 Slice From A to B (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\na = int(data[1 + n])\nb = int(data[2 + n])\nprint(\" \".join(map(str, lst[a:b])))\n",
    # Q6 Insert At Index (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nidx = int(data[1 + n])\nval = int(data[2 + n])\nprint(\" \".join(map(str, lst[:idx] + [val] + lst[idx:])))\n",
    # Q7 Class Roll Call (bl='' wl='')
    "import sys\n\ndef count_present(lst):\n    total = 0\n    for v in lst:\n        if v > 0:\n            total += 1\n    return total\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(count_present(lst))\n",
    # Q8 Temperature Extremes (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(min(lst), max(lst))\n",
    # Q9 Cancel the Booking (bl='' wl='')
    "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nidx = int(data[1 + n])\nprint(\" \".join(map(str, lst[:idx] + lst[idx + 1:])))\n",
    # Q10 Unique Visitor Log (bl='' wl='')
    "import sys\n\ndef unique_log(lst):\n    seen = set()\n    out = []\n    for v in lst:\n        if v not in seen:\n            seen.add(v)\n            out.append(v)\n    return out\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nprint(\" \".join(map(str, unique_log(lst))))\n",
    # Q11 Rotate the Roster by K (bl='reversed,.reverse,deque' wl='%')
    "import sys\n\n\ndef rotate_list(lst, k):\n    n = len(lst)\n    k = k % n\n    return lst[n - k:] + lst[:n - k]\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nk = int(data[1 + n])\nprint(\" \".join(map(str, rotate_list(lst, k))))\n",
    # Q12 Sensor Squares of Evens (bl='append,extend' wl='for')
    "import sys\n\n\ndef even_squares(readings):\n    return [x * x for x in readings if x % 2 == 0]\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nreadings = list(map(int, data[1:1 + n]))\nprint(\" \".join(map(str, even_squares(readings))))\n",
    # Q13 Silver Time Without Sorting (bl='sorted,sort(' wl='if')
    "import sys\n\n\ndef silver_time(times):\n    best = None\n    second = None\n    for t in times:\n        if best is None or t < best:\n            second = best\n            best = t\n        elif t != best and (second is None or t < second):\n            second = t\n    return second\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\ntimes = list(map(int, data[1:1 + n]))\nprint(silver_time(times))\n",
    # Q14 Drop Every Target Order (bl='filter,.remove(' wl='for')
    "import sys\n\n\ndef remove_all(lst, x):\n    return [v for v in lst if v != x]\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(\" \".join(map(str, remove_all(lst, x))))\n",
    # Q15 Waitlist Slot-In (bl='bisect,sorted,sort(' wl='while')
    "import sys\n\n\ndef slot_in(lst, val):\n    i = 0\n    while i < len(lst) and lst[i] < val:\n        i += 1\n    return lst[:i] + [val] + lst[i:]\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nval = int(data[1 + n])\nprint(\" \".join(map(str, slot_in(lst, val))))\n",
    # Q16 Caption Window (Manual Slice) (bl='[:' wl='for')
    "import sys\n\n\ndef manual_slice(lst, a, b):\n    out = []\n    for i in range(a, b):\n        if 0 <= i < len(lst):\n            out.append(lst[i])\n    return out\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\na = int(data[1 + n])\nb = int(data[2 + n])\nprint(\" \".join(map(str, manual_slice(lst, a, b))))\n",
    # Q17 Merge Two Sorted Lists (bl='sorted,sort(' wl='while')
    "import sys\n\n\ndef merge_two_lists(a, b):\n    out = []\n    i = 0\n    j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i])\n            i += 1\n        else:\n            out.append(b[j])\n            j += 1\n    while i < len(a):\n        out.append(a[i])\n        i += 1\n    while j < len(b):\n        out.append(b[j])\n        j += 1\n    return out\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\na = list(map(int, data[1:1 + n]))\nm = int(data[1 + n])\nb = list(map(int, data[2 + n:2 + n + m]))\nprint(\" \".join(map(str, merge_two_lists(a, b))))\n",
    # Q18 Conveyor Window Peak (bl='sum(,sort(' wl='for')
    "import sys\n\n\ndef peak_window(lst, k):\n    cur = 0\n    for i in range(k):\n        cur += lst[i]\n    best = cur\n    for i in range(k, len(lst)):\n        cur += lst[i] - lst[i - k]\n        if cur > best:\n            best = cur\n    return best\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nk = int(data[1 + n])\nprint(peak_window(lst, k))\n",
    # Q19 Carousel Seat Remap (bl='[:,.reverse,reversed' wl='%')
    "import sys\n\n\ndef rotate_remap(lst, k):\n    n = len(lst)\n    out = [0] * n\n    for i in range(n):\n        out[(i + k) % n] = lst[i]\n    return out\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nlst = list(map(int, data[1:1 + n]))\nk = int(data[1 + n])\nprint(\" \".join(map(str, rotate_remap(lst, k))))\n",
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
    json.dump(doc, open(f"{OUT_DIR}/day-03.code.json", "w"), indent=2)

    mcq = json.load(open(MCQ_SRC))
    mcq["questions"] = [{k: v for k, v in item.items() if k != "_id"} for item in mcq["questions"]]
    json.dump(mcq, open(f"{OUT_DIR}/day-03.mcq.json", "w"), indent=2)
    print("day-03 written:", len(qs), "code questions,", len(mcq["questions"]), "mcq")


if __name__ == "__main__":
    main()
