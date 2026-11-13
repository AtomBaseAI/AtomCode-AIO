/**
 * check-titles.mjs — cross-file title uniqueness check across all day files.
 */
const days = Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, "0"));
const seen = new Map(); // title -> where
const dups = [];
for (const d of days) {
  const mod = await import(`./day${d}.mjs`);
  for (const q of mod.code) {
    if (seen.has(q.title)) dups.push(`CODE "${q.title}": ${seen.get(q.title)} AND day${d}`);
    else seen.set(q.title, `day${d}(code)`);
  }
  for (const m of mod.mcqs) {
    if (seen.has(m.title)) dups.push(`MCQ "${m.title}": ${seen.get(m.title)} AND day${d}`);
    else seen.set(m.title, `day${d}(mcq)`);
  }
}
console.log(`Total unique titles: ${seen.size} (expected 800)`);
if (dups.length) {
  console.log(`DUPLICATES (${dups.length}):`);
  dups.forEach((x) => console.log("  " + x));
  process.exit(2);
}
console.log("NO DUPLICATES ACROSS ALL 20 DAY FILES");
