/**
 * Reproduce the code-question import failure using the real schema.
 * Run: bun scripts/test-import-schema.ts <path-to-json>
 */
import fs from "fs";
import { AddQuestionSchema } from "../src/schemas/question-schema";
import { TRANSFER_LANG_IDS } from "../src/lib/question-transfer";

const file = process.argv[2] ?? "/home/z/my-project/upload/question-group-c-programming-2026-11-13.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const questions: unknown[] = Array.isArray(data.questions) ? data.questions : [];

console.log(`Total code questions in file: ${questions.length}`);

/** Mirror of the route's normalizeCodeQuestion (null → undefined for optional fields). */
const OPTIONAL_STRING_FIELDS = [
    "topic",
    "subtopic",
    "inputconstrains",
    "blacklist",
    "whitelist",
    "referenceimg",
] as const;
function normalizeCodeQuestion(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };
    if (
        typeof obj.maxscore === "string" &&
        obj.maxscore.trim() !== "" &&
        !Number.isNaN(Number(obj.maxscore))
    ) {
        obj.maxscore = Number(obj.maxscore);
    }
    for (const field of OPTIONAL_STRING_FIELDS) {
        if (obj[field] === null) obj[field] = undefined;
    }
    return obj;
}

let fail = 0;
const reasonCounts = new Map<string, number>();

for (let i = 0; i < questions.length; i++) {
    const parsed = AddQuestionSchema.safeParse(normalizeCodeQuestion(questions[i]));
    if (!parsed.success) {
        fail++;
        const issue = parsed.error.issues[0];
        const key = `${issue?.path.join(".")}: ${issue?.message}`;
        reasonCounts.set(key, (reasonCounts.get(key) ?? 0) + 1);
        if (fail === 1) {
            console.log(`First failure at #${i + 1} "${(questions[i] as { title: string }).title}"`);
            for (const iss of parsed.error.issues.slice(0, 5)) {
                console.log(`  - path=${iss.path.join(".")} :: ${iss.message}`);
            }
        }
    }
}

console.log(`\nFailed validation: ${fail}/${questions.length}`);
for (const [k, v] of reasonCounts.entries()) console.log(`  ${v}x  ${k}`);

// Also simulate the extended import schema check (language list)
const langSet = new Set<string>();
for (const q of questions as { lang?: string }[]) {
    if (q?.lang) langSet.add(q.lang);
}
console.log(`\nLanguages in file: ${[...langSet].join(", ")}`);
console.log(`All in TRANSFER_LANG_IDS? ${[...langSet].every((l) => (TRANSFER_LANG_IDS as readonly string[]).includes(l))}`);
