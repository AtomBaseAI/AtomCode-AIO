/* Quick self-audit (temp): CO spread, snippet counts, grid spot checks. */
import { readFileSync } from "node:fs";
import { execSqlScript, composeUserCode } from "./lib.ts";

for (let d = 11; d <= 15; d++) {
  const mcq = JSON.parse(readFileSync(`data/day-${d}.mcq.json`, "utf8"));
  const dist = [1, 2, 3, 4].map((n) => mcq.questions.filter((q) => q.CorrectOption === n).length);
  const snippets = mcq.questions.filter((q) => q.iscodesnippet).length;
  const maxSnippetLines = Math.max(
    ...mcq.questions.filter((q) => q.iscodesnippet).map((q) => q.codesnippet.split("\n").length)
  );
  const code = JSON.parse(readFileSync(`data/day-${d}.code.json`, "utf8"));
  const blwl = code.questions
    .filter((q) => q.blacklist || q.whitelist)
    .map((q) => `${q.title}: bl=[${q.blacklist}] wl=[${q.whitelist}]`);
  console.log(`day ${d}: CO spread ${JSON.stringify(dist)}, snippets=${snippets}, maxSnippetLines=${maxSnippetLines}`);
  console.log(`  subtopic coverage: ${JSON.stringify(
    Object.entries(code.questions.reduce((acc: Record<string, number>, q) => { acc[q.subtopic] = (acc[q.subtopic] ?? 0) + 1; return acc; }, {}))
  )}`);
}

/* Spot-check three interesting grids. */
const spots: [string, string][] = [
  ["day15 tied rank (tied_rank must gap: 1,1,3,3,5,5,7,8,9)",
   JSON.parse(readFileSync("data/day-15.code.json", "utf8")).questions.find((q: any) => q.title === "Tied Times Share The Crown").sampleoutput1],
  ["day13 union dup audit", 
   JSON.parse(readFileSync("data/day-13.code.json", "utf8")).questions.find((q: any) => q.title === "Duplicate Attendance Audit").sampleoutput1],
  ["day14 chain rollup",
   JSON.parse(readFileSync("data/day-14.code.json", "utf8")).questions.find((q: any) => q.title === "Chain Salary Roll Up").sampleoutput1.split("\n").slice(0, 6).join("\n")],
  ["day12 portfolio valuation",
   JSON.parse(readFileSync("data/day-12.code.json", "utf8")).questions.find((q: any) => q.title === "Full Portfolio Valuation").sampleoutput1],
  ["day11 workload ledger",
   JSON.parse(readFileSync("data/day-11.code.json", "utf8")).questions.find((q: any) => q.title === "Player Workload Ledger").sampleoutput1],
];
for (const [label, grid] of spots) {
  console.log(`\n== ${label}\n${grid}`);
}
