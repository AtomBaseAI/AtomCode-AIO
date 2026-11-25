"""Build day-13.code.json (Hashing: dicts and sets) + day-13.mcq.json with complete standalone programs."""
import json

EXPORT = '/home/z/tmp/dsa-export/dsa-python/day-13.code.json'
OUT = '/home/z/my-project/scripts/dsa-python/data/day-13.code.json'
MCQ_IN = '/home/z/tmp/dsa-export/dsa-python/day-13.mcq.json'
MCQ_OUT = '/home/z/my-project/scripts/dsa-python/data/day-13.mcq.json'

READER = '''import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']
'''

P = {}

P[0] = READER + '''

def count_target(nums, target):
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1
    return freq.get(target, 0)


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    target = int(lines[2])
    print(count_target(nums, target))


main()
'''

P[1] = READER + '''

def union_size(a, b):
    return len(set(a) | set(b))


def main():
    lines = read_lines()
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[3].split()))
    print(union_size(a, b))


main()
'''

P[2] = READER + '''

def intersection_size(a, b):
    return len(set(a) & set(b))


def main():
    lines = read_lines()
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[3].split()))
    print(intersection_size(a, b))


main()
'''

P[3] = READER + '''

def symdiff_size(a, b):
    return len(set(a) ^ set(b))


def main():
    lines = read_lines()
    a = list(map(int, lines[1].split()))
    b = list(map(int, lines[3].split()))
    print(symdiff_size(a, b))


main()
'''

P[4] = READER + '''

def first_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    print(first_duplicate(nums))


main()
'''

P[5] = READER + '''

def all_unique(nums):
    return len(set(nums)) == len(nums)


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    print(all_unique(nums))


main()
'''

P[6] = READER + '''

def distinct_names(names):
    seen = set()
    for name in names:
        seen.add(name)
    return len(seen)


def main():
    lines = read_lines()
    names = lines[1].split()
    print(distinct_names(names))


main()
'''

P[7] = READER + '''

def common_items(a, b):
    shared = set(a) & set(b)
    return sorted(shared)


def main():
    lines = read_lines()
    a = lines[1].split()
    b = lines[3].split()
    print(' '.join(common_items(a, b)))


main()
'''

P[8] = READER + '''

def char_counts(s):
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    return counts


def main():
    lines = read_lines()
    counts = char_counts(lines[0])
    print('\\n'.join(f'{ch} {c}' for ch, c in sorted(counts.items())))


main()
'''

P[9] = READER + '''

def top_word(words):
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    best = None
    for w in sorted(freq):
        if best is None or freq[w] > freq[best]:
            best = w
    return best


def main():
    lines = read_lines()
    words = lines[1].split()
    print(top_word(words))


main()
'''

P[10] = READER + '''

def count_pairs(nums, target):
    freq = {}
    pairs = 0
    for x in nums:
        pairs += freq.get(target - x, 0)
        freq[x] = freq.get(x, 0) + 1
    return pairs


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    target = int(lines[2])
    print(count_pairs(nums, target))


main()
'''

P[11] = READER + '''

def dict_ops(ops):
    store = {}
    res = []
    for op in ops:
        parts = op.split()
        cmd = parts[0]
        if cmd == "put":
            store[int(parts[1])] = int(parts[2])
        elif cmd == "get":
            res.append(store.get(int(parts[1]), -1))
        elif cmd == "del":
            store.pop(int(parts[1]), None)
        else:
            res.append(len(store))
    return res


def main():
    lines = read_lines()
    ops = lines[1:]
    print('\\n'.join(map(str, dict_ops(ops))))


main()
'''

P[12] = READER + '''

def nearby_duplicate(nums, k):
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(nearby_duplicate(nums, k))


main()
'''

P[13] = READER + '''

def can_build(note, magazine):
    need = {}
    for ch in note:
        need[ch] = need.get(ch, 0) + 1
    have = {}
    for ch in magazine:
        have[ch] = have.get(ch, 0) + 1
    for ch in need:
        if have.get(ch, 0) < need[ch]:
            return False
    return True


def main():
    lines = read_lines()
    print(can_build(lines[0], lines[1]))


main()
'''

P[14] = READER + '''

def top_frequent(nums, k):
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1
    ordered = sorted(freq.keys(), key=lambda x: (-freq[x], x))
    return ordered[:k]


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, top_frequent(nums, k))))


main()
'''

P[15] = READER + '''

def window_distincts(nums, k):
    freq = {}
    res = []
    for i, x in enumerate(nums):
        freq[x] = freq.get(x, 0) + 1
        if i >= k:
            y = nums[i - k]
            freq[y] -= 1
            if freq[y] == 0:
                del freq[y]
        if i >= k - 1:
            res.append(len(freq))
    return res


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, window_distincts(nums, k))))


main()
'''

P[16] = READER + '''

def two_sum(nums, target):
    seen = {}
    for j, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], j]
        if x not in seen:
            seen[x] = j
    return [-1, -1]


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    target = int(lines[2])
    print(' '.join(map(str, two_sum(nums, target))))


main()
'''

P[17] = READER + '''

def anagram_groups(words):
    groups = {}
    for w in words:
        key = "".join(sorted(w))
        groups[key] = groups.get(key, 0) + 1
    return sorted(groups.values(), reverse=True)


def main():
    lines = read_lines()
    words = lines[1].split()
    sizes = anagram_groups(words)
    print(len(sizes))
    print(' '.join(map(str, sizes)))


main()
'''

P[18] = READER + '''

def longest_unique(s):
    last = {}
    start = 0
    best = 0
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= start:
            start = last[ch] + 1
        last[ch] = i
        if i - start + 1 > best:
            best = i - start + 1
    return best


def main():
    lines = read_lines()
    print(longest_unique(lines[0]))


main()
'''

P[19] = READER + '''

def count_subarrays(nums, k):
    freq = {0: 1}
    total = 0
    ans = 0
    for x in nums:
        total += x
        ans += freq.get(total - k, 0)
        freq[total] = freq.get(total, 0) + 1
    return ans


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(count_subarrays(nums, k))


main()
'''

data = json.load(open(EXPORT))
assert len(data['questions']) == len(P) == 20
for i, q in enumerate(data['questions']):
    code = P[i]
    q['sourcecode'] = code
    for b in [x for x in (q.get('blacklist') or '').split(',') if x]:
        assert b not in code, (i, q['title'], 'BLACKLIST VIOLATION', b)
    for w in [x for x in (q.get('whitelist') or '').split(',') if x]:
        assert w in code, (i, q['title'], 'WHITELIST MISSING', w)
with open(OUT, 'w') as f:
    json.dump(data, f, indent=2)

mcq = json.load(open(MCQ_IN))
for q in mcq['questions']:
    q.pop('_id', None)
with open(MCQ_OUT, 'w') as f:
    json.dump(mcq, f, indent=2)
print('day-13 written:', OUT, MCQ_OUT)
