/**
 * rename-titles.mjs — renames day-file titles that collide with questions in
 * OTHER groups (OOPS using JAVA / PYTHON Programming / seed data).
 * Validates the new titles are free across the whole DB before applying.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { db } from "../src/lib/db";

const RENAMES = [
  { day: "03", kind: "code", old: "Larger of Two Numbers", neu: "Larger Integer with if-else" },
  { day: "03", kind: "code", old: "Pass or Fail Checker", neu: "Pass or Fail Verdict" },
  { day: "03", kind: "mcq", old: "Dangling else Binding", neu: "Dangling else Pairing Rule" },
  { day: "04", kind: "code", old: "Sum of First N Natural Numbers", neu: "Natural Number Sum with for Loop" },
  { day: "04", kind: "mcq", old: "Nested Loop Iteration Count", neu: "Nested Loop Total Ticks" },
  { day: "06", kind: "mcq", old: "Definition of Recursion", neu: "Recursion Defined Correctly" },
  { day: "07", kind: "mcq", old: "Valid Index Range", neu: "Legal Subscript Range for Arrays" },
  { day: "08", kind: "mcq", old: "Row-Major Storage Order", neu: "Row-Major Layout Rule" },
  { day: "09", kind: "code", old: "Product Code Formatter", neu: "SKU Code Formatter" },
  { day: "12", kind: "mcq", old: "Two Objects Independent State", neu: "Objects Keep Separate State" },
  { day: "13", kind: "mcq", old: "Copy Constructor Signature", neu: "Copy Constructor Declaration Form" },
  { day: "14", kind: "mcq", old: "Base Constructor Prints First", neu: "Base Constructor Runs Before Derived" },
  { day: "16", kind: "mcq", old: "Instantiation Meaning", neu: "Template Instantiation Explained" },
  { day: "17", kind: "code", old: "ATM Withdrawal Guard", neu: "Cash Machine Withdrawal Guard" },
  { day: "17", kind: "mcq", old: "Purpose of join()", neu: "What thread join() Does" },
];

async function main() {
  const allCode = new Set((await db.codeQuestion.findMany({ select: { title: true } })).map((q) => q.title));
  const allMcq = new Set((await db.mCQQuestion.findMany({ select: { title: true } })).map((q) => q.title));

  // Validate every new title is globally free
  for (const r of RENAMES) {
    if (allCode.has(r.neu) || allMcq.has(r.neu)) {
      throw new Error(`New title collides in DB: "${r.neu}"`);
    }
  }
  console.log("All new titles are globally free.");

  for (const r of RENAMES) {
    const mjsPath = new URL(`./day${r.day}.mjs`, import.meta.url);
    let mjs = readFileSync(mjsPath, "utf8");
    const needle = `title: "${r.old}"`;
    if (!mjs.includes(needle)) throw new Error(`day${r.day}.mjs lacks ${needle}`);
    mjs = mjs.replaceAll(needle, `title: "${r.neu}"`);
    writeFileSync(mjsPath, mjs);

    const jsonPath = new URL(`./day${r.day}.verified.json`, import.meta.url);
    let json = readFileSync(jsonPath, "utf8");
    const jneedle = `"title": "${r.old}"`;
    if (!json.includes(jneedle)) throw new Error(`day${r.day}.verified.json lacks ${jneedle}`);
    json = json.replaceAll(jneedle, `"title": "${r.neu}"`);
    writeFileSync(jsonPath, json);

    console.log(`day${r.day} ${r.kind}: "${r.old}" -> "${r.neu}"`);
  }
  console.log("Renames complete.");
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
