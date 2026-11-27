/**
 * AtomCode — seed every course module's `concepturl` from the concept URL maps.
 *
 * Sources:
 *   - scripts/Concepts/url-maps/<slug>.csv  (header: title,url — one row per
 *     module/day, authored in Day 1..Day 20 order)
 *     slugs: c, cpp, java, python, ruby, sql, dsa-c, dsa-cpp, dsa-java,
 *            dsa-python …
 *
 * Resolution strategy (deterministic, no hardcoded course titles):
 *   1. Each course picks the CSV whose titles best match its module titles
 *      (exact normalized-title match score; highest score wins).
 *   2. Per module, the URL comes from:
 *      a. exact normalized title match ("Day N: X" ↔ CSV "X"), else
 *      b. day-index mapping (module "Day N" ↔ CSV row N), flagged with a
 *         title-similarity warning when the two disagree heavily.
 *   3. Only https(s) URLs pointing at the concepts host are written.
 *
 * The script is idempotent — re-running after a successful apply is a no-op.
 *
 * Modes:
 *   bun scripts/Concepts/add-module-concepts.ts            → dry run (default)
 *   bun scripts/Concepts/add-module-concepts.ts --apply    → write to DB
 *
 * Run: set -a; . ./.env; set +a; bun scripts/Concepts/add-module-concepts.ts [--apply]
 */
import { PrismaClient } from "@prisma/client";
import Papa from "papaparse";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const db = new PrismaClient();

const URL_MAP_DIR = join(process.cwd(), "scripts", "Concepts", "url-maps");
const ALLOWED_URL_HOST = "conceptsv2.atomapps.space";
const APPLY = process.argv.includes("--apply");

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Normalizes a module title for comparison: strips "Day N:" prefix,
 *  lowercases, unifies dashes/quotes, collapses whitespace. */
function normalizeTitle(raw: string): string {
  return raw
    .replace(/^\s*day\s*\d+\s*[:.\-–—]?\s*/i, "") // strip "Day N:" prefix
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extracts the day number from a "Day N: ..." module title (null if none). */
function extractDayNumber(raw: string): number | null {
  const m = raw.match(/^\s*day\s*(\d+)\b/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Token-set Jaccard similarity used only for reporting anomalies. */
function jaccard(a: string, b: string): number {
  const A = new Set(a.split(/\s+/).filter(Boolean));
  const B = new Set(b.split(/\s+/).filter(Boolean));
  if (A.size === 0 && B.size === 0) return 1;
  const inter = [...A].filter((t) => B.has(t)).length;
  return inter / (A.size + B.size - inter);
}

function isSafeConceptUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      (u.protocol === "https:" || u.protocol === "http:") &&
      u.hostname === ALLOWED_URL_HOST
    );
  } catch {
    return false;
  }
}

type UrlRow = { title: string; url: string; index: number }; // index = 0-based day slot

/** Parses one CSV file into rows; throws on malformed entries. */
function loadUrlMap(file: string): UrlRow[] {
  const text = readFileSync(join(URL_MAP_DIR, file), "utf8");
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });
  const rows: UrlRow[] = [];
  parsed.data.forEach((r, i) => {
    const title = (r["title"] ?? "").trim();
    const url = (r["url"] ?? "").trim();
    if (!title || !url) {
      throw new Error(`${file} row ${i + 2}: missing title or url`);
    }
    if (!isSafeConceptUrl(url)) {
      throw new Error(`${file} row ${i + 2}: unsafe/unexpected URL "${url}"`);
    }
    rows.push({ title, url, index: i });
  });
  return rows;
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  const files = readdirSync(URL_MAP_DIR).filter((f) => f.endsWith(".csv"));
  if (files.length === 0) throw new Error(`no CSV url-maps found in ${URL_MAP_DIR}`);

  const urlMaps = new Map<string, UrlRow[]>(); // file slug → rows
  for (const f of files) urlMaps.set(f.replace(/\.csv$/, ""), loadUrlMap(f));
  console.log(`Loaded ${urlMaps.size} url-map files: ${[...urlMaps.keys()].join(", ")}`);

  const courses = await db.course.findMany({
    select: { id: true, title: true, language: true },
  });

  const stats = { courses: 0, modules: 0, updated: 0, unchanged: 0, skipped: 0 };
  const unmatchedCourses: string[] = [];

  for (const course of courses) {
    const modules = await db.module.findMany({
      where: { courseId: course.id },
      select: { id: true, title: true, concepturl: true },
    });
    if (modules.length === 0) continue;

    /* --- 1. pick the best-matching CSV for this course ---------------- */
    let bestSlug: string | null = null;
    let bestScore = 0;
    for (const [slug, rows] of urlMaps) {
      const csvTitles = new Set(rows.map((r) => normalizeTitle(r.title)));
      const score = modules.filter((m) => csvTitles.has(normalizeTitle(m.title))).length;
      if (score > bestScore) {
        bestScore = score;
        bestSlug = slug;
      }
    }

    if (!bestSlug) {
      unmatchedCourses.push(`${course.title} (${modules.length} modules — no CSV title matches)`);
      continue;
    }

    const rows = urlMaps.get(bestSlug)!;
    const byExactTitle = new Map<string, UrlRow>();
    for (const r of rows) byExactTitle.set(normalizeTitle(r.title), r);

    console.log(
      `\n=== ${course.title} [lang=${course.language}] — ${modules.length} modules ` +
        `→ ${bestSlug}.csv (title-match score ${bestScore}/${modules.length}) ===`
    );

    if (rows.length !== modules.length) {
      console.log(
        `  ! WARN: ${bestSlug}.csv has ${rows.length} rows but course has ${modules.length} modules`
      );
    }

    stats.courses += 1;

    /* --- 2. resolve + update each module ------------------------------ */
    for (const mod of modules) {
      const norm = normalizeTitle(mod.title);
      const day = extractDayNumber(mod.title);

      let row: UrlRow | undefined = byExactTitle.get(norm);
      let how = "exact-title";
      if (!row && day !== null && day >= 1 && day <= rows.length) {
        row = rows[day - 1];
        how = "day-index";
      }

      if (!row) {
        console.log(`  ? SKIP "${mod.title}" — no matching CSV row`);
        stats.skipped += 1;
        continue;
      }

      const sim = jaccard(norm, normalizeTitle(row.title));
      if (how === "day-index" && sim < 0.4) {
        console.log(
          `  ! WARN "${mod.title}" → row ${day} "${row.title}" (low title similarity ${sim.toFixed(2)})`
        );
      }

      if (mod.concepturl === row.url) {
        stats.unchanged += 1;
        console.log(`  = "${mod.title}" already → ${row.url}`);
        continue;
      }

      stats.modules += 1;
      console.log(
        `  ${mod.concepturl ? "~" : "+"} "${mod.title}" [${how}] → ${row.url}` +
          (mod.concepturl ? ` (was ${mod.concepturl})` : " (was null)")
      );

      if (APPLY) {
        await db.module.update({ where: { id: mod.id }, data: { concepturl: row.url } });
      }
      stats.updated += 1;
    }
  }

  console.log("\n================ SUMMARY ================");
  console.log(`Mode                : ${APPLY ? "APPLY (written to DB)" : "DRY RUN (no writes)"}`);
  console.log(`Courses matched     : ${stats.courses}`);
  console.log(`Modules to update   : ${stats.updated}`);
  console.log(`Modules unchanged   : ${stats.unchanged}`);
  console.log(`Modules skipped     : ${stats.skipped}`);
  if (unmatchedCourses.length) {
    console.log(`Courses skipped     : ${unmatchedCourses.length}`);
    unmatchedCourses.forEach((c) => console.log(`  - ${c}`));
  }
  if (!APPLY) console.log(`\nRe-run with --apply to write these changes to the database.`);

  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
