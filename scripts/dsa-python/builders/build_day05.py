#!/usr/bin/env python3
"""Repair day-05 sourcecode for dsa-python. Writes data/day-05.code.json + day-05.mcq.json."""
import json, os

SRC = "/home/z/tmp/dsa-export/dsa-python/day-05.code.json"
MCQ_SRC = "/home/z/tmp/dsa-export/dsa-python/day-05.mcq.json"
OUT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

CODES = [
    # Q0 Linear Search Index (bl='' wl='')
    "import sys\n\n\ndef linear_search(values, x):\n    for i in range(len(values)):\n        if values[i] == x:\n            return i\n    return -1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(linear_search(values, x))\n",
    # Q1 Count Occurrences by Scanning (bl='' wl='')
    "import sys\n\n\ndef count_occurrences(values, x):\n    total = 0\n    for v in values:\n        if v == x:\n            total += 1\n    return total\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(count_occurrences(values, x))\n",
    # Q2 Binary Search Index (bl='' wl='')
    "import sys\n\n\ndef binary_search(values, x):\n    lo, hi = 0, len(values) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            return mid\n        if values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(binary_search(values, x))\n",
    # Q3 First Occurrence in a Sorted List (bl='' wl='')
    "import sys\n\n\ndef first_occurrence(values, x):\n    lo, hi = 0, len(values) - 1\n    ans = -1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            ans = mid\n            hi = mid - 1\n        elif values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(first_occurrence(values, x))\n",
    # Q4 Last Occurrence in a Sorted List (bl='' wl='')
    "import sys\n\n\ndef last_occurrence(values, x):\n    lo, hi = 0, len(values) - 1\n    ans = -1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            ans = mid\n            lo = mid + 1\n        elif values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(last_occurrence(values, x))\n",
    # Q5 Is the List Sorted? (bl='' wl='')
    "import sys\n\n\ndef is_sorted_ascending(values):\n    for i in range(len(values) - 1):\n        if values[i] > values[i + 1]:\n            return False\n    return True\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nprint(is_sorted_ascending(values))\n",
    # Q6 Find the Book by Accession ID (bl='' wl='')
    "import sys\n\n\ndef find_book(ids, target):\n    for i in range(len(ids)):\n        if ids[i] == target:\n            return i\n    return -1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nids = list(map(int, data[1:1 + n]))\ntarget = int(data[1 + n])\nprint(find_book(ids, target))\n",
    # Q7 Sorted Attendance Check (bl='' wl='')
    "import sys\n\n\ndef strictly_increasing(values):\n    for i in range(len(values) - 1):\n        if values[i] >= values[i + 1]:\n            return False\n    return True\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nprint(strictly_increasing(values))\n",
    # Q8 First Defective Chip (bl='' wl='')
    "import sys\n\n\ndef first_defective(chips):\n    lo, hi = 0, len(chips) - 1\n    ans = -1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if chips[mid] == 1:\n            ans = mid\n            hi = mid - 1\n        else:\n            lo = mid + 1\n    return ans\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nchips = list(map(int, data[1:1 + n]))\nprint(first_defective(chips))\n",
    # Q9 Binary Search Probe Count (bl='' wl='')
    "import sys\n\n\ndef probe_count(values, x):\n    lo, hi = 0, len(values) - 1\n    probes = 0\n    while lo <= hi:\n        probes += 1\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            break\n        if values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return probes\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(probe_count(values, x))\n",
    # Q10 Manual Lower Bound Index (bl='bisect,sorted(,.sort(' wl='while')
    "import sys\n\n\ndef lower_bound(values, x):\n    lo, hi = 0, len(values)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(lower_bound(values, x))\n",
    # Q11 Manual Upper Bound Index (bl='bisect,sorted(,.sort(' wl='while')
    "import sys\n\n\ndef upper_bound(values, x):\n    lo, hi = 0, len(values)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if values[mid] <= x:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(upper_bound(values, x))\n",
    # Q12 Closest Element to the Target (bl='min(,abs(,sorted(,.sort(' wl='while')
    "import sys\n\n\ndef closest_element(values, x):\n    best = values[0]\n    bestd = values[0] - x\n    if bestd < 0:\n        bestd = -bestd\n    i = 1\n    while i < len(values):\n        d = values[i] - x\n        if d < 0:\n            d = -d\n        if d < bestd:\n            bestd = d\n            best = values[i]\n        i += 1\n    return best\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(closest_element(values, x))\n",
    # Q13 Occurrences Within Two Bounds (bl='count(' wl='while')
    "import sys\n\n\ndef occurrences_of(values, x):\n    lo, hi = 0, len(values) - 1\n    first = -1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            first = mid\n            hi = mid - 1\n        elif values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    if first == -1:\n        return 0\n    lo, hi = first, len(values) - 1\n    last = first\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            last = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return last - first + 1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nx = int(data[1 + n])\nprint(occurrences_of(values, x))\n",
    # Q14 Find the Fixed Point (bl='enumerate' wl='while')
    "import sys\n\n\ndef fixed_point(values):\n    lo, hi = 0, len(values) - 1\n    ans = -1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == mid:\n            ans = mid\n            hi = mid - 1\n        elif values[mid] < mid:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nprint(fixed_point(values))\n",
    # Q15 Two Sum in a Sorted List (bl='sorted(,.sort(' wl='while')
    "import sys\n\n\ndef two_sum_pair(values, target):\n    lo, hi = 0, len(values) - 1\n    while lo < hi:\n        s = values[lo] + values[hi]\n        if s == target:\n            return values[lo], values[hi]\n        if s < target:\n            lo += 1\n        else:\n            hi -= 1\n    return -1, -1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\ntarget = int(data[1 + n])\na, b = two_sum_pair(values, target)\nprint(a, b)\n",
    # Q16 The Missing Number (bl='sorted(,.sort(' wl='while')
    "import sys\n\n\ndef missing_number(batch):\n    n = len(batch)\n    acc = 0\n    i = 0\n    while i <= n:\n        acc ^= i\n        i += 1\n    i = 0\n    while i < n:\n        acc ^= batch[i]\n        i += 1\n    return acc\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nbatch = list(map(int, data[1:1 + n]))\nprint(missing_number(batch))\n",
    # Q17 Peak Element Index (bl='sorted(,.sort(' wl='while')
    "import sys\n\n\ndef peak_index(values):\n    lo, hi = 0, len(values) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if values[mid] < values[mid + 1]:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\nprint(peak_index(values))\n",
    # Q18 Search a Rotated Sorted List (bl='sorted(,.sort(' wl='while')
    "import sys\n\n\ndef rotated_search(values, target):\n    lo, hi = 0, len(values) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == target:\n            return mid\n        if values[lo] <= values[mid]:\n            if values[lo] <= target < values[mid]:\n                hi = mid - 1\n            else:\n                lo = mid + 1\n        else:\n            if values[mid] < target <= values[hi]:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n    return -1\n\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nvalues = list(map(int, data[1:1 + n]))\ntarget = int(data[1 + n])\nprint(rotated_search(values, target))\n",
    # Q19 Integer Square Root by Search (bl='math,pow(,**' wl='while')
    "import sys\n\n\ndef integer_sqrt(x):\n    lo, hi = 1, x\n    ans = 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= x:\n            ans = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans\n\n\nx = int(sys.stdin.read().strip())\nprint(integer_sqrt(x))\n",
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
    json.dump(doc, open(f"{OUT_DIR}/day-05.code.json", "w"), indent=2)

    mcq = json.load(open(MCQ_SRC))
    mcq["questions"] = [{k: v for k, v in item.items() if k != "_id"} for item in mcq["questions"]]
    json.dump(mcq, open(f"{OUT_DIR}/day-05.mcq.json", "w"), indent=2)
    print("day-05 written:", len(qs), "code questions,", len(mcq["questions"]), "mcq")


if __name__ == "__main__":
    main()
