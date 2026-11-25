/**
 * Day 02 (Algorithm Analysis and Complexity) — complete standalone programs.
 * Note: several questions blacklist "for"/"while"/"switch"/"pow"/"log(" /
 * "sqrt"/"fib(" as substrings — mains below are loop-free and comment-free.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-02.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-02.code.json";

const programs = [
  /* Q1 Single Loop Iteration Count */
  `#include <iostream>

long long single_loop_count(int n) {
    return n;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << single_loop_count(n) << std::endl;
    return 0;
}
`,
  /* Q2 Nested Pair Iteration Count */
  `#include <iostream>

long long nested_pair_count(int n) {
    return (long long)n * (n - 1) / 2;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << nested_pair_count(n) << std::endl;
    return 0;
}
`,
  /* Q3 Halving Loop Steps */
  `#include <iostream>

int halving_steps(int n) {
    int steps = 0;
    while (n > 1) {
        n /= 2;
        steps++;
    }
    return steps;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << halving_steps(n) << std::endl;
    return 0;
}
`,
  /* Q4 Gauss Loop Sum */
  `#include <iostream>

long long loop_sum(int n) {
    return (long long)n * (n + 1) / 2;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << loop_sum(n) << std::endl;
    return 0;
}
`,
  /* Q5 Doubling Steps to Limit */
  `#include <iostream>

int doubling_steps(int start) {
    int steps = 0;
    long long x = start;
    while (x < 1000000) {
        x *= 2;
        steps++;
    }
    return steps;
}

int main() {
    int start;
    std::cin >> start;
    std::cout << doubling_steps(start) << std::endl;
    return 0;
}
`,
  /* Q6 Skip Loop Count */
  `#include <iostream>

int skip_loop_count(int n) {
    return (n + 2) / 3;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << skip_loop_count(n) << std::endl;
    return 0;
}
`,
  /* Q7 Pairwise Module Tests */
  `#include <iostream>

long long pair_tests(int n) {
    return (long long)n * (n - 1) / 2;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << pair_tests(n) << std::endl;
    return 0;
}
`,
  /* Q8 Antivirus Sweep Count */
  `#include <iostream>

int sweep_count(int n) {
    int sweeps = 0;
    while (n > 1) {
        n /= 2;
        sweeps++;
    }
    return sweeps;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << sweep_count(n) << std::endl;
    return 0;
}
`,
  /* Q9 Bulk Batcher Batches */
  `#include <iostream>

int batch_count(int n) {
    return (n + 2) / 3;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << batch_count(n) << std::endl;
    return 0;
}
`,
  /* Q10 Double Pass Inventory Scan */
  `#include <iostream>

long long double_scan(int n) {
    return 2L * n;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << double_scan(n) << std::endl;
    return 0;
}
`,
  /* Q11 Loop Census — blacklist "for,while" */
  `#include <iostream>

void loop_census(int n, long long &single, long long &pairs) {
    single = n;
    pairs = (long long)n * (n - 1) / 2;
}

int main() {
    int n;
    std::cin >> n;
    long long single = 0, pairs = 0;
    loop_census(n, single, pairs);
    std::cout << single << " " << pairs << std::endl;
    return 0;
}
`,
  /* Q12 Merge Pass Planner — blacklist "for" */
  `#include <iostream>

int merge_passes(int n) {
    int passes = 0;
    long long size = 1;
    while (size < n) {
        size *= 2;
        passes++;
    }
    return passes;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << merge_passes(n) << std::endl;
    return 0;
}
`,
  /* Q13 Big-O Class Identifier — blacklist "switch" */
  `#include <iostream>

int big_o_class(int id) {
    if (id == 1) return 4;
    if (id == 2) return 1;
    if (id == 3) return 5;
    if (id == 4) return 2;
    if (id == 5) return 3;
    return 6;
}

int main() {
    int id;
    std::cin >> id;
    std::cout << big_o_class(id) << std::endl;
    return 0;
}
`,
  /* Q14 Front and Back Scan Compare — blacklist "for,while" */
  `#include <iostream>

void scan_compare(int n, int pos, int &front, int &back) {
    front = pos;
    back = n - pos + 1;
}

int main() {
    int n, pos, front = 0, back = 0;
    std::cin >> n >> pos;
    scan_compare(n, pos, front, back);
    std::cout << front << " " << back << std::endl;
    return 0;
}
`,
  /* Q15 Memory Footprint Model — blacklist "for,while" */
  `#include <iostream>

void space_bytes(int n, long long &flat, long long &grid) {
    flat = 4L * n;
    grid = 4L * n * n;
}

int main() {
    int n;
    std::cin >> n;
    long long flat = 0, grid = 0;
    space_bytes(n, flat, grid);
    std::cout << flat << " " << grid << std::endl;
    return 0;
}
`,
  /* Q16 Cubic Triple Count — blacklist "for,while" */
  `#include <iostream>

long long triple_count(int n) {
    return (long long)n * (n - 1) * (n - 2) / 6;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << triple_count(n) << std::endl;
    return 0;
}
`,
  /* Q17 Divisor Sieve Workload — whitelist "for", blacklist "pow,log(" */
  `#include <iostream>

long long sieve_work(int n) {
    long long work = 0;
    for (int i = 1; i <= n; i++)
        for (int j = i; j <= n; j += i)
            work++;
    return work;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << sieve_work(n) << std::endl;
    return 0;
}
`,
  /* Q18 Quadratic Crossover Finder — blacklist "sqrt,pow" */
  `#include <iostream>

int crossover_point(int slope, int intercept) {
    int n = 1;
    while ((long long)n * n <= (long long)slope * n + intercept) n++;
    return n;
}

int main() {
    int slope, intercept;
    std::cin >> slope >> intercept;
    std::cout << crossover_point(slope, intercept) << std::endl;
    return 0;
}
`,
  /* Q19 Naive Fibonacci Call Count — blacklist "fib(" */
  `#include <iostream>

long long fib_calls(int n) {
    long long a = 0, b = 1;
    for (int i = 2; i <= n + 1; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return 2 * b - 1;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << fib_calls(n) << std::endl;
    return 0;
}
`,
  /* Q20 Merge Work Estimator — blacklist "for" */
  `#include <iostream>

void merge_model(int n, long long &levels, long long &work) {
    levels = 0;
    long long size = 1;
    while (size < n) {
        size *= 2;
        levels++;
    }
    work = (long long)n * levels;
}

int main() {
    int n;
    std::cin >> n;
    long long levels = 0, work = 0;
    merge_model(n, levels, work);
    std::cout << levels << " " << work << std::endl;
    return 0;
}
`,
];

const data = JSON.parse(readFileSync(SRC, "utf8"));
if (data.questions.length !== programs.length)
  throw new Error(`expected ${data.questions.length} programs, got ${programs.length}`);
data.questions.forEach((q, i) => {
  q.sourcecode = programs[i];
});
writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`day-02.code.json written: ${data.questions.length} programs`);
