// Brute-force search for the buggy reference that generated day-06 Q0/Q1 testcases
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("/home/z/tmp/dsa-export/dsa-cpp/day-06.code.json", "utf8"));

function tcs(q) {
  return [
    [q.sampleinput1, q.sampleoutput1],
    [q.sampleinput2, q.sampleoutput2],
    [q.input1, q.output1],
    [q.input2, q.output2],
    [q.input3, q.output3],
  ].filter(([, o]) => (o ?? "").trim() !== "")
   .map(([i, o]) => {
      const lines = i.trim().split(/\s+/).map(Number);
      const n = lines[0];
      const A = lines.slice(1, 1 + n);
      const B = lines.slice(1 + n, 1 + 2 * n);
      return { A, B, exp: o.trim().split(/\s+/) };
   });
}

// transforms
const idT = {
  ident: (a) => a.slice(),
  zeroFirst: (a) => a.map((x, i) => (i === 0 ? 0 : x)),
  shiftL: (a) => a.map((_, i) => (i + 1 < a.length ? a[i + 1] : 0)),
  shiftR: (a) => a.map((_, i) => (i - 1 >= 0 ? a[i - 1] : 0)),
  reverse: (a) => a.slice().reverse(),
};

function sortPairs(pairs, dir, tie, algo, swapMode) {
  // pairs: [{k, id, idx}] ; dir: 1 asc, -1 desc ; tie: first|last|idAsc|idDesc
  const p = pairs.map((x) => ({ ...x }));
  const n = p.length;
  const cmp = (a, b) => {
    // returns true if a should come before b in FINAL order
    if (a.k !== b.k) return dir === 1 ? a.k < b.k : a.k > b.k;
    if (tie === "idAsc") return a.id < b.id;
    if (tie === "idDesc") return a.id > b.id;
    return false; // first/last handled by scan direction
  };
  const betterLast = (a, b) => {
    if (a.k !== b.k) return dir === 1 ? a.k < b.k : a.k > b.k;
    if (tie === "idAsc") return a.id < b.id;
    if (tie === "idDesc") return a.id > b.id;
    return true; // last-extreme
  };
  const swapElems = (i, j) => {
    if (swapMode === "both") { const t = p[i]; p[i] = p[j]; p[j] = t; }
    else if (swapMode === "idsOnly") { const t = p[i].id; p[i].id = p[j].id; p[j].id = t; }
    else if (swapMode === "scoresOnly") { const t = p[i].k; p[i].k = p[j].k; p[j].k = t; }
  };
  if (algo === "selection") {
    for (let i = 0; i < n - 1; i++) {
      let m = i;
      for (let j = i + 1; j < n; j++) {
        const isBetter = tie === "last" ? betterLast(p[j], p[m]) : cmp(p[j], p[m]);
        if (isBetter) m = j;
      }
      if (m !== i) swapElems(i, m);
    }
  } else if (algo === "insertion") {
    for (let i = 1; i < n; i++) {
      const key = p[i];
      let j = i - 1;
      const before = (x, y) => (tie === "last" ? !betterLast(y, x) : !cmp(y, x));
      while (j >= 0 && before(p[j], key)) { p[j + 1] = p[j]; j--; }
      p[j + 1] = key;
    }
  } else if (algo === "bubble") {
    for (let pass = 0; pass < n - 1; pass++)
      for (let j = 0; j < n - 1 - pass; j++)
        if (cmp(p[j + 1], p[j]) || (tie === "last" && p[j + 1].k === p[j].k && true && betterLast(p[j + 1], p[j]) && JSON.stringify(p[j + 1]) !== JSON.stringify(p[j])))
          swapElems(j, j + 1);
  }
  return p;
}

const outModes = {
  pairIds: (p) => p.map((x) => String(x.id)),
  order: (p) => p.map((x) => String(x.idx)),
  pairScores: (p) => p.map((x) => String(x.k)),
  revIds: (p) => p.map((x) => String(x.id)).reverse(),
  rotL: (p) => { const a = p.map((x) => String(x.id)); if (a.length) a.push(a.shift()); return a; },
  rotR: (p) => { const a = p.map((x) => String(x.id)); if (a.length) a.unshift(a.pop()); return a; },
};

function run(questionIdx) {
  const q = data.questions[questionIdx];
  const tests = tcs(q);
  const results = [];
  for (const tA of Object.keys(idT))
    for (const tBname of ["ident", "zeroFirst", "shiftL", "shiftR", "reverse", "useA"])
      for (const algo of ["selection", "insertion", "bubble"])
        for (const dir of [1, -1])
          for (const tie of ["first", "last", "idAsc", "idDesc"])
            for (const swapMode of ["both", "idsOnly", "scoresOnly"])
              for (const om of Object.keys(outModes)) {
                let ok = true;
                for (const t of tests) {
                  const A = idT[tA](t.A);
                  const B = tBname === "useA" ? A.slice() : idT[tBname](t.B);
                  const pairs = A.map((k, i) => ({ k, id: B[i], idx: i }));
                  const sorted = sortPairs(pairs, dir, tie, algo, swapMode);
                  const out = outModes[om](sorted).join(" ");
                  if (out !== t.exp.join(" ")) { ok = false; break; }
                }
                if (ok) results.push({ tA, tBname, algo, dir, tie, swapMode, om });
              }
  return results;
}

for (const qi of [0, 1]) {
  const r = run(qi);
  console.log(`Q${qi} ${data.questions[qi].title}: ${r.length} matches`);
  r.slice(0, 10).forEach((x) => console.log("  ", JSON.stringify(x)));
}
