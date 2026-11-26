"""Build day-12.code.json (Queues and Deques) + day-12.mcq.json with complete standalone programs."""
import json

EXPORT = '/home/z/tmp/dsa-export/dsa-python/day-12.code.json'
OUT = '/home/z/my-project/scripts/dsa-python/data/day-12.code.json'
MCQ_IN = '/home/z/tmp/dsa-export/dsa-python/day-12.mcq.json'
MCQ_OUT = '/home/z/my-project/scripts/dsa-python/data/day-12.mcq.json'

DEQ = 'from collections import deque\n'

READER = '''import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']
'''

P = {}

P[0] = DEQ + READER + '''

def serve_order(values):
    q = deque(values)
    out = []
    while q:
        out.append(q.popleft())
    return out


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, serve_order(values))))


main()
'''

P[1] = DEQ + READER + '''

def pop_ends(values):
    dq = deque(values)
    left = dq.popleft()
    right = dq.pop()
    return left, right


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    left, right = pop_ends(values)
    print(left, right)


main()
'''

P[2] = DEQ + READER + '''

def rotated(values, k):
    dq = deque(values)
    dq.rotate(k)
    return list(dq)


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, rotated(values, k))))


main()
'''

P[3] = DEQ + READER + '''

def front_after_serves(values, k):
    q = deque(values)
    for _ in range(k):
        q.popleft()
    return q[0], len(q)


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    values = list(map(int, lines[1].split()))
    front, size = front_after_serves(values, k)
    print(front, size)


main()
'''

P[4] = DEQ + READER + '''

def reversed_queue(values):
    dq = deque()
    for v in values:
        dq.appendleft(v)
    return list(dq)


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, reversed_queue(values))))


main()
'''

P[5] = DEQ + READER + '''

def symmetric(values):
    dq = deque(values)
    while len(dq) > 1:
        if dq.popleft() != dq.pop():
            return False
    return True


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(symmetric(values))


main()
'''

P[6] = DEQ + READER + '''

def print_order(jobs):
    urgent = deque()
    normal = deque()
    for job in jobs:
        name, prio = job.split()
        if prio == "1":
            urgent.append(name)
        else:
            normal.append(name)
    out = []
    while urgent:
        out.append(urgent.popleft())
    while normal:
        out.append(normal.popleft())
    return out


def main():
    lines = read_lines()
    jobs = lines[1:]
    print(' '.join(print_order(jobs)))


main()
'''

P[7] = DEQ + READER + '''

def survivor(names, p):
    q = deque(names)
    while len(q) > 1:
        for _ in range(p - 1):
            q.append(q.popleft())
        q.popleft()
    return q[0]


def main():
    lines = read_lines()
    p = int(lines[0].split()[1])
    names = lines[1].split()
    print(survivor(names, p))


main()
'''

P[8] = DEQ + READER + '''

def diverted(cars, k):
    q = deque(cars)
    i = 0
    out = []
    while q:
        car = q.popleft()
        i += 1
        if i % k == 0:
            out.append(car)
    return out


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    cars = lines[1].split()
    print(' '.join(diverted(cars, k)))


main()
'''

P[9] = DEQ + READER + '''

def window_averages(nums, k):
    res = []
    for i in range(len(nums) - k + 1):
        res.append(sum(nums[i:i + k]) / k)
    return res


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print('\\n'.join('{:.2f}'.format(v) for v in window_averages(nums, k)))


main()
'''

# [10] bans 'deque': ring buffer with head index + count, no collections.
P[10] = READER + '''

def circular_queue_ops(cap, ops):
    buf = [None] * cap
    head = 0
    count = 0
    res = []
    for op in ops:
        parts = op.split()
        if parts[0] == "enq":
            if count < cap:
                buf[(head + count) % cap] = int(parts[1])
                count += 1
        elif parts[0] == "deq":
            if count == 0:
                res.append("EMPTY")
            else:
                res.append(buf[head])
                head = (head + 1) % cap
                count -= 1
        else:
            res.append("EMPTY" if count == 0 else buf[head])
    return res


def main():
    lines = read_lines()
    cap = int(lines[0])
    ops = lines[2:]
    print('\\n'.join(map(str, circular_queue_ops(cap, ops))))


main()
'''

P[11] = DEQ + READER + '''

def fives_sixes(n):
    res = []
    q = deque()
    for seed in (5, 6):
        if seed <= n:
            q.append(seed)
    while q:
        x = q.popleft()
        res.append(x)
        for d in (5, 6):
            y = x * 10 + d
            if y <= n:
                q.append(y)
    return res


def main():
    lines = read_lines()
    n = int(lines[0])
    print('\\n'.join(map(str, fives_sixes(n))))


main()
'''

P[12] = DEQ + READER + '''

def first_negatives(nums, k):
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        if x < 0:
            dq.append(i)
        if i >= k and dq and dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]] if dq else 0)
    return res


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, first_negatives(nums, k))))


main()
'''

P[13] = DEQ + READER + '''

def completion_order(bursts, quantum):
    q = deque(range(len(bursts)))
    left = list(bursts)
    done = []
    while q:
        i = q.popleft()
        step = left[i] if left[i] < quantum else quantum
        left[i] -= step
        if left[i] == 0:
            done.append(i)
        else:
            q.append(i)
    return done


def main():
    lines = read_lines()
    quantum = int(lines[0].split()[1])
    bursts = list(map(int, lines[1].split()))
    print(' '.join(map(str, completion_order(bursts, quantum))))


main()
'''

P[14] = DEQ + READER + '''

def start_station(petrol, dist):
    total = 0
    curr = 0
    start = 0
    for i in range(len(petrol)):
        d = petrol[i] - dist[i]
        total += d
        curr += d
        if curr < 0:
            start = i + 1
            curr = 0
    return start if total >= 0 else -1


def main():
    lines = read_lines()
    petrol = list(map(int, lines[1].split()))
    dist = list(map(int, lines[2].split()))
    print(start_station(petrol, dist))


main()
'''

P[15] = DEQ + READER + '''

def interleaved(values):
    first = deque(values[: len(values) // 2])
    second = deque(values[len(values) // 2 :])
    out = []
    while first:
        out.append(first.popleft())
        out.append(second.popleft())
    return out


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, interleaved(values))))


main()
'''

P[16] = DEQ + READER + '''

def window_maxes(nums, k):
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, window_maxes(nums, k))))


main()
'''

P[17] = DEQ + READER + '''

def stream_chars(s):
    count = {}
    q = deque()
    res = []
    for ch in s:
        count[ch] = count.get(ch, 0) + 1
        q.append(ch)
        while q and count[q[0]] > 1:
            q.popleft()
        res.append(q[0] if q else "-")
    return res


def main():
    lines = read_lines()
    print('\\n'.join(stream_chars(lines[0])))


main()
'''

P[18] = DEQ + READER + '''

def window_mins(nums, k):
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] >= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res


def main():
    lines = read_lines()
    k = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, window_mins(nums, k))))


main()
'''

P[19] = DEQ + READER + '''

def shortest_subarray(nums, target):
    n = len(nums)
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    dq = deque()
    best = n + 1
    for j in range(n + 1):
        while dq and prefix[j] - prefix[dq[0]] >= target:
            if j - dq[0] < best:
                best = j - dq[0]
            dq.popleft()
        while dq and prefix[dq[-1]] >= prefix[j]:
            dq.pop()
        dq.append(j)
    return best if best <= n else -1


def main():
    lines = read_lines()
    target = int(lines[0].split()[1])
    nums = list(map(int, lines[1].split()))
    print(shortest_subarray(nums, target))


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
print('day-12 written:', OUT, MCQ_OUT)
