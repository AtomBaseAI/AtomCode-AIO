#!/usr/bin/env python3
"""Repair day-04 sourcecode for dsa-python. Writes data/day-04.code.json + day-04.mcq.json."""
import json, os

SRC = "/home/z/tmp/dsa-export/dsa-python/day-04.code.json"
MCQ_SRC = "/home/z/tmp/dsa-export/dsa-python/day-04.mcq.json"
OUT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

CODES = [
    # Q0 Manual String Length (bl='' wl='')
    "s = input()\ncount = 0\nfor ch in s:\n    count += 1\nprint(count)\n",
    # Q1 Palindrome Check (bl='' wl='')
    "s = input()\nprint(s == s[::-1])\n",
    # Q2 Count Vowels (bl='' wl='')
    "s = input()\ntotal = 0\nfor ch in s.lower():\n    if ch in \"aeiou\":\n        total += 1\nprint(total)\n",
    # Q3 Frequency of Target Character (bl='' wl='')
    "s = input()\nraw = input()\nch = raw[0] if raw else \"\"\ntotal = 0\nfor c in s:\n    if c == ch:\n        total += 1\nprint(total)\n",
    # Q4 Toggle Case (bl='' wl='')
    "s = input()\nprint(s.swapcase())\n",
    # Q5 Reverse Word Order (bl='' wl='')
    "s = input()\nprint(\" \".join(s.split()[::-1]))\n",
    # Q6 Passport Anagram Check (bl='' wl='')
    "a = input()\nb = input()\nprint(sorted(a) == sorted(b))\n",
    # Q7 Backward Name Badge (bl='' wl='')
    "s = input()\nprint(s[::-1])\n",
    # Q8 Initials Extractor (bl='' wl='')
    "s = input()\nprint(\" \".join(w[0].upper() for w in s.split()))\n",
    # Q9 Clean Username Generator (bl='' wl='')
    "raw = input()\nprint(raw.lower().replace(\" \", \"\"))\n",
    # Q10 Detective Phrase Anagram (bl='Counter' wl='lower')
    "a = input()\nb = input()\n\n\ndef is_phrase_anagram(a, b):\n    na = \"\".join(a.lower().split())\n    nb = \"\".join(b.lower().split())\n    return sorted(na) == sorted(nb)\n\n\nprint(is_phrase_anagram(a, b))\n",
    # Q11 First Unique Signal (bl='collections,Counter' wl='for')
    "s = input()\n\n\ndef first_unique(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return \"-\"\n\n\nprint(first_unique(s))\n",
    # Q12 Mirror Type Banner (bl='[::-1],reversed(' wl='join')
    "s = input()\n\n\ndef reverse_each_word(s):\n    out = []\n    for w in s.split():\n        r = \"\"\n        for ch in w:\n            r = ch + r\n        out.append(r)\n    return \" \".join(out)\n\n\nprint(reverse_each_word(s))\n",
    # Q13 Call Sign Frequency Watch (bl='Counter,collections' wl='for')
    "s = input()\n\n\ndef most_frequent_char(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    best = None\n    best_count = 0\n    for ch in sorted(counts):\n        if counts[ch] > best_count:\n            best = ch\n            best_count = counts[ch]\n    return best\n\n\nprint(most_frequent_char(s))\n",
    # Q14 Radar Sign Palindrome (bl='re.match,re.sub' wl='isalnum')
    "s = input()\n\n\ndef is_phrase_palindrome(s):\n    cleaned = \"\".join(ch.lower() for ch in s if ch.isalnum())\n    return cleaned == cleaned[::-1]\n\n\nprint(is_phrase_palindrome(s))\n",
    # Q15 Secret Message Alternation (bl='swapcase' wl='%')
    "s = input()\n\n\ndef alt_case(s):\n    parts = []\n    for i, ch in enumerate(s):\n        if i % 2 == 0:\n            parts.append(ch.upper())\n        else:\n            parts.append(ch.lower())\n    return \"\".join(parts)\n\n\nprint(alt_case(s))\n",
    # Q16 Gene Motif Scanner (bl='.count(,find(,re.' wl='for')
    "text = input()\npat = input()\n\n\ndef count_occurrences(text, pat):\n    total = 0\n    for i in range(len(text) - len(pat) + 1):\n        if text[i:i + len(pat)] == pat:\n            total += 1\n    return total\n\n\nprint(count_occurrences(text, pat))\n",
    # Q17 Telemetry Signal Compactor (bl='itertools,groupby' wl='join')
    "s = input()\n\n\ndef compress_runs(s):\n    parts = []\n    i = 0\n    while i < len(s):\n        j = i\n        while j < len(s) and s[j] == s[i]:\n            j += 1\n        parts.append(s[i] + str(j - i))\n        i = j\n    return \"\".join(parts)\n\n\nprint(compress_runs(s))\n",
    # Q18 Catalogue Heading Rules (bl='.title(,.capitalize(' wl='upper')
    "s = input()\n\n\ndef title_case(s):\n    small = {\"a\", \"an\", \"the\", \"and\", \"or\", \"of\", \"in\", \"on\", \"at\", \"to\"}\n    words = s.split()\n    out = []\n    for i, w in enumerate(words):\n        if i > 0 and w in small:\n            out.append(w)\n        else:\n            out.append(w[0].upper() + w[1:])\n    return \" \".join(out)\n\n\nprint(title_case(s))\n",
    # Q19 Genetic Palindrome Scan (bl='re.' wl='while')
    "s = input()\n\n\ndef longest_palindrome(s):\n    n = len(s)\n    best_start = 0\n    best_len = 1\n    for center in range(n):\n        left = center\n        right = center\n        while left >= 0 and right < n and s[left] == s[right]:\n            left -= 1\n            right += 1\n        if right - left - 1 > best_len:\n            best_len = right - left - 1\n            best_start = left + 1\n        left = center\n        right = center + 1\n        while left >= 0 and right < n and s[left] == s[right]:\n            left -= 1\n            right += 1\n        if right - left - 1 > best_len:\n            best_len = right - left - 1\n            best_start = left + 1\n    return s[best_start:best_start + best_len]\n\n\nprint(longest_palindrome(s))\n",
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
    json.dump(doc, open(f"{OUT_DIR}/day-04.code.json", "w"), indent=2)

    mcq = json.load(open(MCQ_SRC))
    mcq["questions"] = [{k: v for k, v in item.items() if k != "_id"} for item in mcq["questions"]]
    json.dump(mcq, open(f"{OUT_DIR}/day-04.mcq.json", "w"), indent=2)
    print("day-04 written:", len(qs), "code questions,", len(mcq["questions"]), "mcq")


if __name__ == "__main__":
    main()
