import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const HDR = "#include <bits/stdc++.h>\nusing namespace std;\n\n";
const WORK = "/home/z/my-project/scripts/dsa-cpp/work";
const OUTDIR = "/home/z/my-project/scripts/dsa-cpp/data";
mkdirSync(OUTDIR, { recursive: true });
mkdirSync(`${WORK}/src`, { recursive: true });
mkdirSync(`${WORK}/bin`, { recursive: true });

// ---------- main() blocks, indexed by question order ----------
const mains18 = [
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> people(n);
    for (int& x : people) cin >> x;
    int limit;
    cin >> limit;
    cout << num_boats(people, limit) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> greed(n);
    for (int& x : greed) cin >> x;
    int m;
    cin >> m;
    vector<int> cookies(m);
    for (int& x : cookies) cin >> x;
    cout << content_children(greed, cookies) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    cout << earliest_finish_index(acts) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    vector<int> out;
    finish_order(acts, out);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << " ";
        cout << out[i];
    }
    cout << "\\n";
    return 0;
}`,
`int main() {
    int w1, w2, limit;
    cin >> w1 >> w2 >> limit;
    cout << boats_for_two(w1, w2, limit) << "\\n";
    return 0;
}`,
`int main() {
    int m;
    if (!(cin >> m)) return 0;
    vector<int> cookies(m);
    for (int& x : cookies) cin >> x;
    int greed;
    cin >> greed;
    cout << best_cookie(cookies, greed) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> weights(n);
    for (int& x : weights) cin >> x;
    int capacity;
    cin >> capacity;
    cout << pack_count(weights, capacity) << "\\n";
    return 0;
}`,
`int main() {
    int a1, d1, a2, d2;
    cin >> a1 >> d1 >> a2 >> d2;
    cout << platforms_for_two(a1, d1, a2, d2) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> meetings(n);
    for (auto& p : meetings) cin >> p.first >> p.second;
    int s, e;
    cin >> s >> e;
    cout << meetings_in_slot(meetings, s, e) << "\\n";
    return 0;
}`,
`int main() {
    int fare;
    cin >> fare;
    cout << bus_fare_coins(fare) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> bursts(n);
    for (int& x : bursts) cin >> x;
    cout << sjf_wait(bursts) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> bills(n);
    for (int& x : bills) cin >> x;
    cout << can_serve_all(bills) << "\\n";
    return 0;
}`,
`int main() {
    int amount;
    cin >> amount;
    cout << min_coins(amount) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> jobs(n);
    for (auto& p : jobs) cin >> p.first >> p.second;
    cout << max_jobs(jobs) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> ropes(n);
    for (int& x : ropes) cin >> x;
    cout << rope_cost(ropes) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> meetings(n);
    for (auto& p : meetings) cin >> p.first >> p.second;
    cout << removals_needed(meetings) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    cout << max_activities(acts) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> items(n);
    for (auto& p : items) cin >> p.first >> p.second;
    int capacity;
    cin >> capacity;
    double best = fractional_knapsack(items, capacity);
    cout << fixed << setprecision(2) << best << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> trains(n);
    for (auto& p : trains) cin >> p.first >> p.second;
    cout << min_platforms(trains) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> jobs(n);
    for (auto& p : jobs) cin >> p.first >> p.second;
    cout << job_profit(jobs) << "\\n";
    return 0;
}`
];

const mains19 = [
`int main() {
    int R, C;
    if (!(cin >> R >> C)) return 0;
    vector<vector<long long>> grid(R, vector<long long>(C));
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++) cin >> grid[r][c];
    cout << min_path_sum(grid) << "\\n";
    return 0;
}`,
`int main() {
    long long n;
    cin >> n;
    cout << fib_term(n) << "\\n";
    return 0;
}`,
`int main() {
    long long R, C;
    cin >> R >> C;
    cout << grid_paths(R, C) << "\\n";
    return 0;
}`,
`int main() {
    long long n;
    cin >> n;
    cout << stair_ways(n) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> cost(n);
    for (auto& x : cost) cin >> x;
    cout << min_climb_cost(cost) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    long long W;
    if (!(cin >> n >> W)) return 0;
    vector<long long> wt(n), val(n);
    for (auto& x : wt) cin >> x;
    for (auto& x : val) cin >> x;
    cout << knapsack_value(wt, val, W) << "\\n";
    return 0;
}`,
`int main() {
    string a, b;
    cin >> a >> b;
    cout << lcs_length(a, b) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (auto& x : h) cin >> x;
    cout << frog_min_energy(h) << "\\n";
    return 0;
}`,
`int main() {
    int k;
    if (!(cin >> k)) return 0;
    vector<long long> coins(k);
    for (auto& x : coins) cin >> x;
    long long amount;
    cin >> amount;
    cout << coin_ways(coins, amount) << "\\n";
    return 0;
}`,
`int main() {
    string a, b;
    cin >> a >> b;
    cout << common_run_length(a, b) << "\\n";
    return 0;
}`,
`int main() {
    long long n, a, b;
    cin >> n >> a >> b;
    cout << loyalty_award(n, a, b) << "\\n";
    return 0;
}`,
`int main() {
    long long n;
    cin >> n;
    cout << tiling_ways(n) << "\\n";
    return 0;
}`,
`int main() {
    int k;
    if (!(cin >> k)) return 0;
    vector<long long> coins(k);
    for (auto& x : coins) cin >> x;
    long long amount;
    cin >> amount;
    cout << min_coins(coins, amount) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << max_loot(val) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << can_partition(val) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (auto& x : arr) cin >> x;
    cout << min_jumps(arr) << "\\n";
    return 0;
}`,
`int main() {
    string s;
    cin >> s;
    cout << lps_length(s) << "\\n";
    return 0;
}`,
`int main() {
    long long L;
    if (!(cin >> L)) return 0;
    vector<long long> price(L);
    for (auto& x : price) cin >> x;
    cout << rod_revenue(L, price) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    cout << lis_length(a) << "\\n";
    return 0;
}`,
`int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << count_subsets(val, target) << "\\n";
    return 0;
}`
];

function tcsOf(q) {
  return [
    ["s1", q.sampleinput1, q.sampleoutput1],
    ["s2", q.sampleinput2, q.sampleoutput2],
    ["i1", q.input1, q.output1],
    ["i2", q.input2, q.output2],
    ["i3", q.input3, q.output3],
  ].filter(t => (t[2] ?? "").trim() !== "");
}

const days = {
  18: { mains: mains18, src: "/home/z/tmp/dsa-export/dsa-cpp/day-18.code.json", mcq: "/home/z/tmp/dsa-export/dsa-cpp/day-18.mcq.json" },
  19: { mains: mains19, src: "/home/z/tmp/dsa-export/dsa-cpp/day-19.code.json", mcq: "/home/z/tmp/dsa-export/dsa-cpp/day-19.mcq.json" },
};

let localFail = 0;
for (const [dayStr, cfg] of Object.entries(days)) {
  const day = Number(dayStr);
  const data = JSON.parse(readFileSync(cfg.src, "utf8"));
  if (data.questions.length !== cfg.mains.length) throw new Error(`day ${day}: ${data.questions.length} questions vs ${cfg.mains.length} mains`);
  for (let i = 0; i < data.questions.length; i++) {
    const q = data.questions[i];
    const fn = (q.sourcecode ?? "").trim();
    if (!fn.endsWith("}")) throw new Error(`day ${day} q${i} (${q.title}): sourcecode does not end with }`);
    // brace balance sanity
    let bal = 0;
    for (const ch of fn) { if (ch === "{") bal++; else if (ch === "}") bal--; }
    if (bal !== 0) throw new Error(`day ${day} q${i} (${q.title}): unbalanced braces in function source`);
    q.sourcecode = HDR + fn + "\n\n" + cfg.mains[i].trim() + "\n";

    // local compile + run verification
    const cp = `${WORK}/src/d${day}-q${i}.cpp`;
    const bin = `${WORK}/bin/d${day}-q${i}`;
    writeFileSync(cp, q.sourcecode);
    let compileErr = "";
    try {
      execFileSync("g++", ["-std=c++17", "-O2", "-w", "-o", bin, cp], { stdio: "pipe" });
    } catch (e) {
      compileErr = e.stderr.toString().slice(0, 500);
    }
    if (compileErr) {
      localFail++;
      console.log(`LOCAL-COMPILE-FAIL day${day} q${i} ${q.title}\n${compileErr}`);
      continue;
    }
    for (const [k, inp, exp] of tcsOf(q)) {
      let actual = "";
      try {
        actual = execFileSync(bin, { input: inp, stdio: "pipe", timeout: 10000 }).toString();
      } catch (e) {
        actual = "RUNTIME-ERROR: " + e.stderr.toString().slice(0, 200);
      }
      const ok = actual.trim() === exp.trim();
      if (!ok) {
        localFail++;
        console.log(`LOCAL-FAIL day${day} q${i} ${q.title} tc=${k} expected=${JSON.stringify(exp.trim())} actual=${JSON.stringify(actual.trim())}`);
      }
    }

    // blacklist / whitelist sanity on final source
    const bl = (q.blacklist ?? "").trim();
    if (bl && q.sourcecode.includes(bl)) {
      localFail++;
      console.log(`BLACKLIST-HIT day${day} q${i} ${q.title}: contains ${JSON.stringify(bl)}`);
    }
    const wl = (q.whitelist ?? "").trim();
    if (wl && !q.sourcecode.includes(wl)) {
      localFail++;
      console.log(`WHITELIST-MISS day${day} q${i} ${q.title}: missing ${JSON.stringify(wl)}`);
    }
  }
  writeFileSync(`${OUTDIR}/day-${day}.code.json`, JSON.stringify(data, null, 2) + "\n");

  // MCQ copy without _id
  const mcq = JSON.parse(readFileSync(cfg.mcq, "utf8"));
  const stripped = { day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) };
  writeFileSync(`${OUTDIR}/day-${day}.mcq.json`, JSON.stringify(stripped, null, 2) + "\n");
  console.log(`day ${day}: wrote code.json (${data.questions.length} q) and mcq.json (${stripped.questions.length} q)`);
}
console.log(localFail === 0 ? "LOCAL-ALL-OK" : `LOCAL-FAILS=${localFail}`);
