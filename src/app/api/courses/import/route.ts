import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { completionOrderSchema } from "@/schemas/course-schema";

/** Per-batch sanity caps so one import cannot flood the database. */
const MAX_MODULES_PER_IMPORT = 200;
const MAX_REFERENCES_PER_MODULE = 100;

interface ImportIssue {
    index: number;
    name: string;
    error: string;
}

/** "full stack java!" → "full-stack-java" — kept local to avoid client-code imports. */
function slugify(name: string): string {
    return (
        name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "course"
    );
}

/**
 * Pick a fresh course title: keep the exported title when free, otherwise
 * append " (imported)" / " (imported 2)" / … so re-importing never collides.
 */
async function uniqueCourseTitle(rawTitle: string) {
    const base = rawTitle.trim() || "Imported Course";
    const existing = await db.course.findMany({ select: { title: true } });
    const taken = new Set(existing.map((c) => c.title.trim().toLowerCase()));
    if (!taken.has(base.toLowerCase())) return base;

    for (let n = 1; n < 100; n++) {
        const candidate =
            n === 1 ? `${base} (imported)` : `${base} (imported ${n})`;
        if (!taken.has(candidate.toLowerCase())) return candidate;
    }
    return `${base} (imported ${Date.now()})`;
}

/** Portable course fields (validated by CourseImportSchema below). */
// JSON has no Date type — dates arrive as ISO strings (or epoch numbers).
// Validate the raw value first so hand-edited files get a clear message.
const dateValue = z
    .union([z.string(), z.number()])
    .refine((v) => !Number.isNaN(new Date(v).getTime()), {
        message: "Invalid date — expected an ISO date string (e.g. 2026-01-31T00:00:00.000Z)",
    })
    .transform((v) => new Date(v));

const CourseImportSchema = z.object({
    title: z.string().min(1),
    startdate: dateValue,
    enddate: dateValue,
    language: z.string().min(1),
    completionOrder: completionOrderSchema,
});

const ReferenceImportSchema = z.object({
    title: z.string().min(1),
    link: z.string().min(1),
    type: z.string().min(1),
});

const ModuleImportSchema = z.object({
    title: z.string().min(1),
    moduledate: dateValue,
    modulestatus: z.enum(["active", "disabled"]),
    language: z.string().min(1),
    maxscore: z.coerce.number().int().min(0),
    concepturl: z.string().nullable().optional(),
    references: z.array(ReferenceImportSchema).optional(),
});

/**
 * Tolerate hand-edited files: numeric strings for maxscore, "inactive"
 * spelled as the UI label, empty concept URLs, booleans-ish statuses.
 */
function normalizeModule(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    if (
        typeof obj.maxscore === "string" &&
        obj.maxscore.trim() !== "" &&
        !Number.isNaN(Number(obj.maxscore))
    ) {
        obj.maxscore = Number(obj.maxscore);
    }

    if (typeof obj.modulestatus === "string") {
        const status = obj.modulestatus.trim().toLowerCase();
        obj.modulestatus =
            status === "inactive" ? "disabled" : status === "active" || status === "disabled" ? status : obj.modulestatus;
    }

    if (obj.concepturl === "") obj.concepturl = null;

    return obj;
}

/**
 * POST /api/courses/import
 *
 * Body: the JSON produced by GET /api/courses/[id]/export
 * (kind: "course" envelope).
 *
 * Creates a NEW course (title deduped automatically) and fills it with
 * every module (created in file order, preserving the queue sequence)
 * including each module's reference material. Deliberately NOT imported:
 * questions, students, staffs, assessments and feedbacks — the import
 * covers only the module structure and data, same as the export.
 * Invalid modules are skipped and reported.
 */
export async function POST(req: Request) {
    const guard = await requireAdminApi("courses");
    if (!guard.ok) return guard.response;

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Invalid file — expected a course export." },
            { status: 400 }
        );
    }

    const envelope = body as Record<string, unknown>;

    // Only accept files this app produced (keeps accidental uploads safe).
    if (envelope.atomcodeExport !== true) {
        return NextResponse.json(
            {
                error:
                    "This file is not an AtomCode export. Export a course first, then import that JSON file.",
            },
            { status: 400 }
        );
    }
    if (envelope.kind !== "course") {
        return NextResponse.json(
            {
                error: `This is a "${String(envelope.kind ?? "unknown")}" export, not a course export. Use the Import button on the matching page.`,
            },
            { status: 400 }
        );
    }

    const rawModules = Array.isArray(envelope.modules) ? envelope.modules : [];
    if (rawModules.length > MAX_MODULES_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many modules in one import (max ${MAX_MODULES_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    // ── Resolve the new course title ─────────────────────────────────────────
    const exportedCourse = (envelope.course ?? {}) as Record<string, unknown>;
    const exportedTitle =
        typeof exportedCourse.title === "string"
            ? exportedCourse.title
            : typeof envelope.title === "string"
              ? envelope.title
              : "";
    const title = await uniqueCourseTitle(exportedTitle);

    // ── Validate the course shell ────────────────────────────────────────────
    const parsedCourse = CourseImportSchema.safeParse(exportedCourse);
    if (!parsedCourse.success) {
        const issue = parsedCourse.error.issues[0];
        return NextResponse.json(
            {
                error: `Invalid course data in file${issue?.path?.length ? ` ("${issue.path.join(".")}")` : ""}: ${issue?.message ?? "validation failed"}.`,
            },
            { status: 400 }
        );
    }

    // ── Create the course shell ──────────────────────────────────────────────
    const course = await db.course.create({
        data: {
            title,
            startdate: parsedCourse.data.startdate,
            enddate: parsedCourse.data.enddate,
            language: parsedCourse.data.language,
            completionOrder: parsedCourse.data.completionOrder,
        },
    });

    const errors: ImportIssue[] = [];
    let createdModules = 0;
    let createdReferences = 0;

    // ── Modules (created in file order → queue sequence preserved) ──────────
    for (let i = 0; i < rawModules.length; i++) {
        const item = normalizeModule(rawModules[i]);
        const mTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = ModuleImportSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name: mTitle,
                error:
                    parsed.error.issues[0]?.message ?? "Invalid module data",
            });
            continue;
        }

        try {
            // Dedupe references by title+link within the module.
            const seen = new Set<string>();
            const refs: { title: string; link: string; type: string }[] = [];
            for (const ref of parsed.data.references ?? []) {
                const key = `${ref.title.trim().toLowerCase()}|${ref.link.trim()}`;
                if (seen.has(key)) continue;
                seen.add(key);
                refs.push({ title: ref.title.trim(), link: ref.link.trim(), type: ref.type.trim() });
            }
            if (refs.length > MAX_REFERENCES_PER_MODULE) {
                errors.push({
                    index: i + 1,
                    name: mTitle,
                    error: `Too many references (max ${MAX_REFERENCES_PER_MODULE})`,
                });
                continue;
            }

            await db.module.create({
                data: {
                    title: parsed.data.title,
                    courseId: course.id,
                    moduledate: parsed.data.moduledate,
                    modulestatus: parsed.data.modulestatus,
                    language: parsed.data.language,
                    maxscore: parsed.data.maxscore,
                    concepturl: parsed.data.concepturl ?? null,
                    reference: { create: refs },
                },
            });
            createdModules++;
            createdReferences += refs.length;
        } catch (err) {
            errors.push({
                index: i + 1,
                name: mTitle,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the module",
            });
        }
    }

    if (rawModules.length > 0 && createdModules === 0) {
        return NextResponse.json(
            {
                error: `Course "${title}" was created but no module could be imported.`,
                courseId: course.id,
                created: 0,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
    }

    const parts: string[] = [`${createdModules} module(s)`];
    if (createdReferences) parts.push(`${createdReferences} reference(s)`);
    if (rawModules.length === 0) parts.push("(no modules in file)");

    return NextResponse.json(
        {
            success: `Imported course "${title}": ${parts.join(", ")}${
                errors.length ? `, ${errors.length} module(s) skipped` : ""
            }`,
            courseId: course.id,
            courseTitle: title,
            createdModules,
            createdReferences,
            failed: errors.length,
            errors: errors.slice(0, 10),
        },
        { status: 201 }
    );
}
