"""Build day-11.code.json (Stacks) + day-11.mcq.json with complete standalone programs."""
import json
import shutil

EXPORT = '/home/z/tmp/dsa-export/dsa-python/day-11.code.json'
OUT = '/home/z/my-project/scripts/dsa-python/data/day-11.code.json'
MCQ_IN = '/home/z/tmp/dsa-export/dsa-python/day-11.mcq.json'
MCQ_OUT = '/home/z/my-project/scripts/dsa-python/data/day-11.mcq.json'

READER = '''import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']
'''

P = {}

P[0] = READER + '''

def stack_top(values):
    stack = []
    for v in values:
        stack.append(v)
    return stack[-1]


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(stack_top(values))


main()
'''

P[1] = READER + '''

def pop_two(values):
    stack = []
    for v in values:
        stack.append(v)
    first = stack.pop()
    second = stack.pop()
    return first, second


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    first, second = pop_two(values)
    print(first, second)


main()
'''

P[2] = READER + '''

def is_balanced(s):
    stack = []
    for ch in s:
        if ch == '(':
            stack.append(ch)
        elif ch == ')':
            if not stack:
                return False
            stack.pop()
    return not stack


def main():
    lines = read_lines()
    print(is_balanced(lines[0]))


main()
'''

P[3] = READER + '''

def reverse_word(s):
    stack = []
    for ch in s:
        stack.append(ch)
    out = []
    while stack:
        out.append(stack.pop())
    return "".join(out)


def main():
    lines = read_lines()
    print(reverse_word(lines[0]))


main()
'''

P[4] = READER + '''

def next_greater(nums):
    res = []
    for i in range(len(nums)):
        res.append(-1)
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i]:
                res[i] = nums[j]
                break
    return res


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, next_greater(values))))


main()
'''

P[5] = READER + '''

def second_from_top(values):
    stack = []
    for v in values:
        stack.append(v)
    top = stack.pop()
    second = stack[-1]
    stack.append(top)
    return second


def main():
    lines = read_lines()
    values = list(map(int, lines[1].split()))
    print(second_from_top(values))


main()
'''

P[6] = READER + '''

def page_after_backs(history, k):
    stack = []
    for page in history:
        stack.append(page)
    for _ in range(k):
        stack.pop()
    return stack[-1]


def main():
    lines = read_lines()
    names = lines[1].split()
    k = int(lines[2])
    print(page_after_backs(names, k))


main()
'''

P[7] = READER + '''

def final_text(s):
    stack = []
    for ch in s:
        if ch == '<':
            if stack:
                stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)


def main():
    lines = read_lines()
    print(final_text(lines[0]))


main()
'''

P[8] = READER + '''

def max_depth(s):
    stack = []
    best = 0
    for ch in s:
        if ch == '(':
            stack.append(ch)
            if len(stack) > best:
                best = len(stack)
        elif ch == ')':
            stack.pop()
    return best


def main():
    lines = read_lines()
    print(max_depth(lines[0]))


main()
'''

P[9] = READER + '''

def pushed_values(values, cap):
    stack = []
    for v in values:
        if len(stack) < cap:
            stack.append(v)
    return stack


def main():
    lines = read_lines()
    cap = int(lines[0].split()[1])
    values = list(map(int, lines[1].split()))
    print(' '.join(map(str, pushed_values(values, cap))))


main()
'''

P[10] = READER + '''

def min_stack_ops(ops):
    stack = []
    mins = []
    res = []
    for op in ops:
        parts = op.split()
        if parts[0] == "push":
            x = int(parts[1])
            stack.append(x)
            if mins and x > mins[-1]:
                mins.append(mins[-1])
            else:
                mins.append(x)
        elif parts[0] == "pop":
            stack.pop()
            mins.pop()
        else:
            res.append(mins[-1])
    return res


def main():
    lines = read_lines()
    ops = lines[1:]
    print('\\n'.join(map(str, min_stack_ops(ops))))


main()
'''

P[11] = READER + '''

def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack


def main():
    lines = read_lines()
    print(is_balanced(lines[0]))


main()
'''

P[12] = READER + '''

def valid_order(pushes, pops):
    stack = []
    i = 0
    for x in pushes:
        stack.append(x)
        while stack and stack[-1] == pops[i]:
            stack.pop()
            i += 1
    return i == len(pops)


def main():
    lines = read_lines()
    pushes = list(map(int, lines[1].split()))
    pops = list(map(int, lines[2].split()))
    print(valid_order(pushes, pops))


main()
'''

P[13] = READER + '''

def clean_text(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch:
            stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)


def main():
    lines = read_lines()
    print(clean_text(lines[0]))


main()
'''

P[14] = READER + '''

def decode(s):
    stack = []
    cur = []
    num = 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == '[':
            stack.append((cur, num))
            cur = []
            num = 0
        elif ch == ']':
            prev, k = stack.pop()
            prev.extend(cur * k)
            cur = prev
        else:
            cur.append(ch)
    return "".join(cur)


def main():
    lines = read_lines()
    print(decode(lines[0]))


main()
'''

P[15] = READER + '''

def warmer_days(temps):
    n = len(temps)
    res = [0] * n
    stack = []
    for i in range(n):
        while stack and temps[stack[-1]] < temps[i]:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res


def main():
    lines = read_lines()
    temps = list(map(int, lines[1].split()))
    print(' '.join(map(str, warmer_days(temps))))


main()
'''

P[16] = READER + '''

def eval_postfix(tokens):
    stack = []
    for tok in tokens:
        if tok in ('+', '-', '*', '/'):
            b = stack.pop()
            a = stack.pop()
            if tok == '+':
                stack.append(a + b)
            elif tok == '-':
                stack.append(a - b)
            elif tok == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(tok))
    return stack[0]


def main():
    lines = read_lines()
    tokens = lines[0].split()
    print(eval_postfix(tokens))


main()
'''

P[17] = READER + '''

def stock_spans(prices):
    n = len(prices)
    spans = [0] * n
    stack = []
    for i in range(n):
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()
        spans[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)
    return spans


def main():
    lines = read_lines()
    prices = list(map(int, lines[1].split()))
    print(' '.join(map(str, stock_spans(prices))))


main()
'''

P[18] = READER + '''

def max_area(heights):
    stack = [-1]
    best = 0
    for i in range(len(heights) + 1):
        h = heights[i] if i < len(heights) else 0
        while stack[-1] != -1 and heights[stack[-1]] >= h:
            hh = heights[stack.pop()]
            w = i - stack[-1] - 1
            if hh * w > best:
                best = hh * w
        stack.append(i)
    return best


def main():
    lines = read_lines()
    heights = list(map(int, lines[1].split()))
    print(max_area(heights))


main()
'''

P[19] = READER + '''

def longest_valid(s):
    stack = [-1]
    best = 0
    for i, ch in enumerate(s):
        if ch == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            elif i - stack[-1] > best:
                best = i - stack[-1]
    return best


def main():
    lines = read_lines()
    print(longest_valid(lines[0]))


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
print('day-11 written:', OUT, MCQ_OUT)
