import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireAdminApi } from "@/lib/api-admin-guard";
import { db } from "@/lib/db";

/**
 * Shared "intelligent delete" cleanup API.
 *
 * Every destructive delete dialog calls this endpoint to offer the admin a
 * two-phase flow:
 *   1. remove the entity's related data up-front (per-section, with counts,
 *      loading and confirmation states in the UI)
 *   2. run the final entity delete (the delete action itself also cascades
 *      everything left in one transaction, so nothing can be orphaned)
 *
 * GET    /api/cleanup/[entity]/[id]           → sections with live counts
 * DELETE /api/cleanup/[entity]/[id]?section=k → wipes ONE section
 * DELETE /api/cleanup/[entity]/[id]           → wipes ALL sections
 *
 * Entities:
 *   course          id = courseId
 *   module          id = moduleId
 *   staff           id = staffId
 *   assessment      id = assessmentId
 *   course-student  id = userId + ?cid=courseId   (student's data in a course)
 *   question-group  id = questionGroupId
 *   code-question   id = codeQuestionId
 *   mcq-question    id = mcqQuestionId
 *
 * The entity row itself is NEVER removed here — only its dependants.
 */

type CleanupSection = {
    key: string;
    label: string;
    subtitle: string;
    count: number;
};

type PrismaTx = Parameters<Parameters<typeof db.$transaction>[0]>[0];

/** Course ids of the given modules (helper for scoped deletes). */
async function moduleIdsOfCourse(tx: PrismaTx, cid: string) {
    const mods = await tx.module.findMany({ where: { courseId: cid }, select: { id: true } });
    return mods.map((m) => m.id);
}

async function assessmentIdsOfCourse(tx: PrismaTx, cid: string) {
    const rows = await tx.assessments.findMany({ where: { courseId: cid }, select: { id: true } });
    return rows.map((a) => a.id);
}

/* ------------------------------------------------------------------ */
/* Counters (GET)                                                      */
/* ------------------------------------------------------------------ */

async function countCourse(cid: string): Promise<CleanupSection[]> {
    const [modules, assessments] = await Promise.all([
        db.module.findMany({ where: { courseId: cid }, select: { id: true } }),
        db.assessments.findMany({ where: { courseId: cid }, select: { id: true } }),
    ]);
    const mids = modules.map((m) => m.id);
    const aids = assessments.map((a) => a.id);

    const [userModuleData, userMcqData, userCodeQuestionData, userAssessmentData, assessMcq, assessCode, enrollments, staff, feedbacks] =
        await Promise.all([
            db.userModuleData.count({ where: { courseId: cid } }),
            db.userMCQData.count({ where: { moduleId: { in: mids } } }),
            db.userCodeQuestionData.count({ where: { moduleId: { in: mids } } }),
            db.userAssessmentData.count({ where: { courseId: cid } }),
            db.userAssessmentMCQData.count({ where: { assessmentId: { in: aids } } }),
            db.userAssessmentCodeData.count({ where: { assessmentId: { in: aids } } }),
            db.userCourse.count({ where: { courseId: cid } }),
            db.staffCourse.count({ where: { courseId: cid } }),
            db.feedbacks.count({ where: { courseId: cid } }),
        ]);

    return [
        {
            key: "modules",
            label: "Modules & questions",
            subtitle: "All modules with their code/MCQ questions and references",
            count: modules.length,
        },
        {
            key: "assessments",
            label: "Assessments",
            subtitle: "Assessment papers created for this course",
            count: assessments.length,
        },
        {
            key: "userdata",
            label: "Student practice & assessment data",
            subtitle: "Progress, submissions, scores and results of all students",
            count: userModuleData + userMcqData + userCodeQuestionData + userAssessmentData + assessMcq + assessCode,
        },
        {
            key: "enrollments",
            label: "Student enrollments",
            subtitle: "Students currently assigned to this course",
            count: enrollments,
        },
        {
            key: "staff",
            label: "Staff assignments",
            subtitle: "Staff members currently assigned to this course",
            count: staff,
        },
        {
            key: "feedbacks",
            label: "Course feedbacks",
            subtitle: "Feedback forms attached to this course",
            count: feedbacks,
        },
    ];
}

async function countModule(mid: string): Promise<CleanupSection[]> {
    const [codeQuestions, mcqQuestions, userModuleData, userMcqData, userCodeQuestionData, references] =
        await Promise.all([
            db.codeQuestion.count({ where: { moduleId: mid } }),
            db.mCQQuestion.count({ where: { moduleId: mid } }),
            db.userModuleData.count({ where: { moduleId: mid } }),
            db.userMCQData.count({ where: { moduleId: mid } }),
            db.userCodeQuestionData.count({ where: { moduleId: mid } }),
            db.moduleReferences.count({ where: { moduleId: mid } }),
        ]);

    return [
        {
            key: "questions",
            label: "Questions",
            subtitle: "Code & MCQ questions of this module (student submissions go with them)",
            count: codeQuestions + mcqQuestions,
        },
        {
            key: "userdata",
            label: "Student practice data",
            subtitle: "Module progress, code submissions & MCQ attempts for this module",
            count: userModuleData + userMcqData + userCodeQuestionData,
        },
        {
            key: "references",
            label: "Study references",
            subtitle: "Reference material attached to this module",
            count: references,
        },
    ];
}

async function countStaff(sid: string): Promise<CleanupSection[]> {
    const assignments = await db.staffCourse.count({ where: { staffId: sid } });
    return [
        {
            key: "assignments",
            label: "Course assignments",
            subtitle: "Courses this staff member is assigned to",
            count: assignments,
        },
    ];
}

async function countAssessment(aid: string): Promise<CleanupSection[]> {
    const [attempts, mcq, code] = await Promise.all([
        db.userAssessmentData.count({ where: { assessmentId: aid } }),
        db.userAssessmentMCQData.count({ where: { assessmentId: aid } }),
        db.userAssessmentCodeData.count({ where: { assessmentId: aid } }),
    ]);
    return [
        {
            key: "userdata",
            label: "Student assessment data",
            subtitle: "Attempts, answers and results for this assessment",
            count: attempts + mcq + code,
        },
    ];
}

async function countCourseStudent(uid: string, cid: string): Promise<CleanupSection[]> {
    const mids = await moduleIdsOfCourse(db, cid);
    const aids = await assessmentIdsOfCourse(db, cid);

    const [practiceModules, practiceMcq, practiceCode, assessData, assessMcq, assessCode] =
        await Promise.all([
            db.userModuleData.count({ where: { userId: uid, courseId: cid } }),
            db.userMCQData.count({ where: { userId: uid, moduleId: { in: mids } } }),
            db.userCodeQuestionData.count({ where: { userId: uid, moduleId: { in: mids } } }),
            db.userAssessmentData.count({ where: { userId: uid, courseId: cid } }),
            db.userAssessmentMCQData.count({ where: { userId: uid, assessmentId: { in: aids } } }),
            db.userAssessmentCodeData.count({ where: { userId: uid, assessmentId: { in: aids } } }),
        ]);

    return [
        {
            key: "practice",
            label: "Practice data for this course",
            subtitle: "Module progress, code submissions & MCQ attempts of this student",
            count: practiceModules + practiceMcq + practiceCode,
        },
        {
            key: "assessment",
            label: "Assessment data for this course",
            subtitle: "Assessment attempts, answers and results of this student",
            count: assessData + assessMcq + assessCode,
        },
    ];
}

/** Sections for the student-account delete dialog (across ALL courses). */
async function countStudent(uid: string): Promise<CleanupSection[]> {
    const [moduleData, mcqData, codeQuestionData, assessmentData, assessMcq, assessCode, enrollments] =
        await Promise.all([
            db.userModuleData.count({ where: { userId: uid } }),
            db.userMCQData.count({ where: { userId: uid } }),
            db.userCodeQuestionData.count({ where: { userId: uid } }),
            db.userAssessmentData.count({ where: { userId: uid } }),
            db.userAssessmentMCQData.count({ where: { userId: uid } }),
            db.userAssessmentCodeData.count({ where: { userId: uid } }),
            db.userCourse.count({ where: { userId: uid } }),
        ]);

    return [
        {
            key: "data",
            label: "Course & assessment data",
            subtitle: "Practice submissions, module progress & assessment records",
            count: moduleData + mcqData + codeQuestionData + assessmentData + assessMcq + assessCode,
        },
        {
            key: "assignments",
            label: "Unassign from courses",
            subtitle: "Removes all course enrollments for this student",
            count: enrollments,
        },
    ];
}

/**
 * Sections for the question-group delete dialog. The group row itself is
 * deleted by the dialog's final action; topics/subtopics cascade with it
 * automatically, while questions only become ungrouped (SetNull) unless
 * they are explicitly removed via these sections first.
 */
async function countQuestionGroup(gid: string): Promise<CleanupSection[]> {
    const [codeQuestions, mcqQuestions, topics] = await Promise.all([
        db.codeQuestion.count({ where: { questionGroupId: gid } }),
        db.mCQQuestion.count({ where: { questionGroupId: gid } }),
        db.topic.count({ where: { groupId: gid } }),
    ]);

    return [
        {
            key: "code-questions",
            label: "Code questions",
            subtitle: "Code questions in this group — their student submissions go with them",
            count: codeQuestions,
        },
        {
            key: "mcq-questions",
            label: "MCQ questions",
            subtitle: "MCQ questions in this group (they are kept ungrouped if you skip this)",
            count: mcqQuestions,
        },
        {
            key: "topics",
            label: "Topics & subtopics",
            subtitle: "Topic tree of this group (removed with the group automatically)",
            count: topics,
        },
    ];
}

/**
 * Sections for the code-question delete dialog. Submission rows cascade
 * via the schema (onDelete: Cascade), so the final delete can never fail —
 * these sections just make the impact visible and removable up-front.
 */
async function countCodeQuestion(qid: string): Promise<CleanupSection[]> {
    const [question, practice, assess] = await Promise.all([
        db.codeQuestion.findUnique({
            where: { id: qid },
            select: {
                moduleId: true,
                assessmentsId: true,
                questionGroupId: true,
                module: { select: { title: true } },
                Assessments: { select: { title: true } },
                questionGroup: { select: { title: true } },
            },
        }),
        db.userCodeQuestionData.count({ where: { questionId: qid } }),
        db.userAssessmentCodeData.count({ where: { questionId: qid } }),
    ]);

    const attachments: string[] = [];
    if (question?.module?.title) attachments.push(`module "${question.module.title}"`);
    if (question?.Assessments?.title) attachments.push(`assessment "${question.Assessments.title}"`);
    if (question?.questionGroup?.title) attachments.push(`group "${question.questionGroup.title}"`);

    return [
        {
            key: "practice-data",
            label: "Student practice submissions",
            subtitle: "Practice attempts, code and results recorded for this question",
            count: practice,
        },
        {
            key: "assessment-data",
            label: "Assessment answers",
            subtitle: "Student answers recorded for this question inside assessments",
            count: assess,
        },
        {
            key: "attachments",
            label: "Attachments",
            subtitle: attachments.length
                ? `Attached to ${attachments.join(", ")} — detached on delete`
                : "Not attached to any module, assessment or group",
            count: attachments.length,
        },
    ];
}

/**
 * Sections for the MCQ delete dialog. MCQ questions have no per-question
 * student rows (attempts are stored per module/assessment), so the impact
 * of a delete is purely its attachments — shown here with live names.
 */
async function countMcqQuestion(mcqId: string): Promise<CleanupSection[]> {
    const mcq = await db.mCQQuestion.findUnique({
        where: { id: mcqId },
        select: {
            moduleId: true,
            assessmentsId: true,
            questionGroupId: true,
            module: { select: { title: true } },
            Assessments: { select: { title: true } },
            questionGroup: { select: { title: true } },
        },
    });

    const attachments: string[] = [];
    if (mcq?.module?.title) attachments.push(`module "${mcq.module.title}"`);
    if (mcq?.Assessments?.title) attachments.push(`assessment "${mcq.Assessments.title}"`);
    if (mcq?.questionGroup?.title) attachments.push(`group "${mcq.questionGroup.title}"`);

    return [
        {
            key: "attachments",
            label: "Attachments",
            subtitle: attachments.length
                ? `Attached to ${attachments.join(", ")} — detached on delete`
                : "Not attached to any module, assessment or group",
            count: attachments.length,
        },
    ];
}

/* ------------------------------------------------------------------ */
/* Removers (DELETE) — each wipes its own scope inside one transaction */
/* ------------------------------------------------------------------ */

async function removeCourseSection(tx: PrismaTx, cid: string, section: string | null) {
    const mids = await moduleIdsOfCourse(tx, cid);
    const aids = await assessmentIdsOfCourse(tx, cid);
    const hit = (key: string) => section === null || section === key;
    const sum = (...counts: number[]) => counts.reduce((a, b) => a + b, 0);

    let removed = 0;

    // Student data always goes first — it references questions, modules,
    // assessments and the course itself.
    if (hit("userdata")) {
        const [a, b, c, d, e, f] = await Promise.all([
            tx.userModuleData.deleteMany({ where: { courseId: cid } }),
            tx.userMCQData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userAssessmentData.deleteMany({ where: { courseId: cid } }),
            tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: { in: aids } } }),
        ]);
        removed += sum(a.count, b.count, c.count, d.count, e.count, f.count);
    }
    if (hit("feedbacks")) {
        const r = await tx.feedbacks.deleteMany({ where: { courseId: cid } });
        removed += r.count;
    }
    // Modules & questions: every module-scoped row must go BEFORE the modules
    // themselves (student data → questions → references → modules).
    if (hit("modules") || hit("questions")) {
        const [umd, umcq, ucq, code, mcq, refs] = await Promise.all([
            tx.userModuleData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userMCQData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.codeQuestion.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.mCQQuestion.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.moduleReferences.deleteMany({ where: { moduleId: { in: mids } } }),
        ]);
        removed += sum(umd.count, umcq.count, ucq.count, code.count, mcq.count, refs.count);
    }
    // Assessments: the student attempt rows referencing them go first (FK).
    if (hit("assessments")) {
        const [d, e, f] = await Promise.all([
            tx.userAssessmentData.deleteMany({ where: { assessmentId: { in: aids } } }),
            tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: { in: aids } } }),
        ]);
        removed += sum(d.count, e.count, f.count);
        const r = await tx.assessments.deleteMany({ where: { courseId: cid } });
        removed += r.count;
    }
    if (hit("modules")) {
        const r = await tx.module.deleteMany({ where: { courseId: cid } });
        removed += r.count;
    }
    if (hit("enrollments")) {
        const r = await tx.userCourse.deleteMany({ where: { courseId: cid } });
        removed += r.count;
    }
    if (hit("staff")) {
        const r = await tx.staffCourse.deleteMany({ where: { courseId: cid } });
        removed += r.count;
    }
    return removed;
}

async function removeModuleSection(tx: PrismaTx, mid: string, section: string | null) {
    const hit = (key: string) => section === null || section === key;
    let removed = 0;

    if (hit("userdata")) {
        const [a, b, c] = await Promise.all([
            tx.userModuleData.deleteMany({ where: { moduleId: mid } }),
            tx.userMCQData.deleteMany({ where: { moduleId: mid } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: mid } }),
        ]);
        removed += a.count + b.count + c.count;
    }
    // Questions: their per-question submission rows cascade via schema
    // (UserCodeQuestionData / userAssessmentCodeData), so no extra wipe.
    if (hit("questions")) {
        const [code, mcq] = await Promise.all([
            tx.codeQuestion.deleteMany({ where: { moduleId: mid } }),
            tx.mCQQuestion.deleteMany({ where: { moduleId: mid } }),
        ]);
        removed += code.count + mcq.count;
    }
    if (hit("references")) {
        const r = await tx.moduleReferences.deleteMany({ where: { moduleId: mid } });
        removed += r.count;
    }
    return removed;
}

async function removeStaffSection(tx: PrismaTx, sid: string, section: string | null) {
    if (section !== null && section !== "assignments") return 0;
    const r = await tx.staffCourse.deleteMany({ where: { staffId: sid } });
    return r.count;
}

async function removeAssessmentSection(tx: PrismaTx, aid: string, section: string | null) {
    if (section !== null && section !== "userdata") return 0;
    const [a, b, c] = await Promise.all([
        tx.userAssessmentData.deleteMany({ where: { assessmentId: aid } }),
        tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: aid } }),
        tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: aid } }),
    ]);
    return a.count + b.count + c.count;
}

async function removeCourseStudentSection(tx: PrismaTx, uid: string, cid: string, section: string | null) {
    const mids = await moduleIdsOfCourse(tx, cid);
    const aids = await assessmentIdsOfCourse(tx, cid);
    let removed = 0;

    if (section === null || section === "practice") {
        const [a, b, c] = await Promise.all([
            tx.userModuleData.deleteMany({ where: { userId: uid, courseId: cid } }),
            tx.userMCQData.deleteMany({ where: { userId: uid, moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { userId: uid, moduleId: { in: mids } } }),
        ]);
        removed += a.count + b.count + c.count;
    }
    if (section === null || section === "assessment") {
        const [a, b, c] = await Promise.all([
            tx.userAssessmentData.deleteMany({ where: { userId: uid, courseId: cid } }),
            tx.userAssessmentMCQData.deleteMany({ where: { userId: uid, assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { userId: uid, assessmentId: { in: aids } } }),
        ]);
        removed += a.count + b.count + c.count;
    }
    return removed;
}

/** Wipes the sections shown in the student-account delete dialog. */
async function removeStudentSection(tx: PrismaTx, uid: string, section: string | null) {
    let removed = 0;

    if (section === null || section === "data") {
        const [a, b, c, d, e, f] = await Promise.all([
            tx.userModuleData.deleteMany({ where: { userId: uid } }),
            tx.userMCQData.deleteMany({ where: { userId: uid } }),
            tx.userCodeQuestionData.deleteMany({ where: { userId: uid } }),
            tx.userAssessmentData.deleteMany({ where: { userId: uid } }),
            tx.userAssessmentMCQData.deleteMany({ where: { userId: uid } }),
            tx.userAssessmentCodeData.deleteMany({ where: { userId: uid } }),
        ]);
        removed += a.count + b.count + c.count + d.count + e.count + f.count;
    }
    if (section === null || section === "assignments") {
        const r = await tx.userCourse.deleteMany({ where: { userId: uid } });
        removed += r.count;
    }
    return removed;
}

/**
 * Wipes the sections shown in the question-group delete dialog. Deleting
 * the attached questions permanently also removes their submissions (the
 * schema cascades them). Topics go together with the group either way.
 */
async function removeQuestionGroupSection(tx: PrismaTx, gid: string, section: string | null) {
    const hit = (key: string) => section === null || section === key;
    let removed = 0;

    if (hit("code-questions")) {
        const r = await tx.codeQuestion.deleteMany({ where: { questionGroupId: gid } });
        removed += r.count;
    }
    if (hit("mcq-questions")) {
        const r = await tx.mCQQuestion.deleteMany({ where: { questionGroupId: gid } });
        removed += r.count;
    }
    if (hit("topics")) {
        const r = await tx.topic.deleteMany({ where: { groupId: gid } });
        removed += r.count;
    }
    return removed;
}

/**
 * Wipes the sections shown in the code-question delete dialog. Submission
 * rows reference the question with onDelete: Cascade, so the final delete
 * also clears anything left behind automatically.
 */
async function removeCodeQuestionSection(tx: PrismaTx, qid: string, section: string | null) {
    const hit = (key: string) => section === null || section === key;
    let removed = 0;

    if (hit("practice-data")) {
        const r = await tx.userCodeQuestionData.deleteMany({ where: { questionId: qid } });
        removed += r.count;
    }
    if (hit("assessment-data")) {
        const r = await tx.userAssessmentCodeData.deleteMany({ where: { questionId: qid } });
        removed += r.count;
    }
    if (hit("attachments")) {
        const question = await tx.codeQuestion.findUnique({
            where: { id: qid },
            select: { moduleId: true, assessmentsId: true, questionGroupId: true },
        });
        if (question) {
            const attached = [
                question.moduleId,
                question.assessmentsId,
                question.questionGroupId,
            ].filter(Boolean).length;
            if (attached > 0) {
                await tx.codeQuestion.update({
                    where: { id: qid },
                    data: {
                        module: { disconnect: true },
                        Assessments: { disconnect: true },
                        questionGroup: { disconnect: true },
                    },
                });
            }
            removed += attached;
        }
    }
    return removed;
}

/**
 * Wipes the sections shown in the MCQ delete dialog — detaches the MCQ
 * from its module / assessment / question group (the final delete would
 * do the same automatically via the nullable FKs).
 */
async function removeMcqQuestionSection(tx: PrismaTx, mcqId: string, section: string | null) {
    if (section !== null && section !== "attachments") return 0;
    const mcq = await tx.mCQQuestion.findUnique({
        where: { id: mcqId },
        select: { moduleId: true, assessmentsId: true, questionGroupId: true },
    });
    if (!mcq) return 0;
    const attached = [mcq.moduleId, mcq.assessmentsId, mcq.questionGroupId]
        .filter(Boolean).length;
    if (attached > 0) {
        await tx.mCQQuestion.update({
            where: { id: mcqId },
            data: {
                module: { disconnect: true },
                Assessments: { disconnect: true },
                questionGroup: { disconnect: true },
            },
        });
    }
    return attached;
}

/* ------------------------------------------------------------------ */
/* Route handlers                                                      */
/* ------------------------------------------------------------------ */

/** Resolves the entity from the URL; returns an error response if unknown. */
function resolveEntity(entity: string, id: string, cid: string | null) {
    switch (entity) {
        case "course":
            return { kind: "course" as const, cid: id };
        case "module":
            return { kind: "module" as const, mid: id };
        case "staff":
            return { kind: "staff" as const, sid: id };
        case "assessment":
            return { kind: "assessment" as const, aid: id };
        case "course-student":
            if (!cid) return { kind: "error" as const, message: "course-student cleanup requires a ?cid= query parameter." };
            return { kind: "course-student" as const, uid: id, cid };
        case "student":
            return { kind: "student" as const, uid: id };
        case "question-group":
            return { kind: "question-group" as const, gid: id };
        case "code-question":
            return { kind: "code-question" as const, qid: id };
        case "mcq-question":
            return { kind: "mcq-question" as const, mcqId: id };
        default:
            return { kind: "error" as const, message: `Unknown cleanup entity "${entity}".` };
    }
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ entity: string; id: string }> },
) {
    const guard = await requireAdminApi("cleanup");
    if (!guard.ok) return guard.response;

    const { entity, id } = await params;
    const url = new URL(_request.url);
    const cid = url.searchParams.get("cid");
    const resolved = resolveEntity(entity, id, cid);
    if (resolved.kind === "error") {
        return NextResponse.json({ error: resolved.message }, { status: 400 });
    }

    let sections: CleanupSection[];
    switch (resolved.kind) {
        case "course":
            sections = await countCourse(resolved.cid);
            break;
        case "module":
            sections = await countModule(resolved.mid);
            break;
        case "staff":
            sections = await countStaff(resolved.sid);
            break;
        case "assessment":
            sections = await countAssessment(resolved.aid);
            break;
        case "course-student":
            sections = await countCourseStudent(resolved.uid, resolved.cid);
            break;
        case "student":
            sections = await countStudent(resolved.uid);
            break;
        case "question-group":
            sections = await countQuestionGroup(resolved.gid);
            break;
        case "code-question":
            sections = await countCodeQuestion(resolved.qid);
            break;
        case "mcq-question":
            sections = await countMcqQuestion(resolved.mcqId);
            break;
    }

    return NextResponse.json({ entity, id, sections });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ entity: string; id: string }> },
) {
    const guard = await requireAdminApi("cleanup");
    if (!guard.ok) return guard.response;

    const { entity, id } = await params;
    const url = new URL(request.url);
    const cid = url.searchParams.get("cid");
    const section = url.searchParams.get("section"); // null → wipe all sections
    const resolved = resolveEntity(entity, id, cid);
    if (resolved.kind === "error") {
        return NextResponse.json({ error: resolved.message }, { status: 400 });
    }

    const removed = await db.$transaction(async (tx) => {
        switch (resolved.kind) {
            case "course":
                return removeCourseSection(tx, resolved.cid, section);
            case "module":
                return removeModuleSection(tx, resolved.mid, section);
            case "staff":
                return removeStaffSection(tx, resolved.sid, section);
            case "assessment":
                return removeAssessmentSection(tx, resolved.aid, section);
            case "course-student":
                return removeCourseStudentSection(tx, resolved.uid, resolved.cid, section);
            case "student":
                return removeStudentSection(tx, resolved.uid, section);
            case "question-group":
                return removeQuestionGroupSection(tx, resolved.gid, section);
            case "code-question":
                return removeCodeQuestionSection(tx, resolved.qid, section);
            case "mcq-question":
                return removeMcqQuestionSection(tx, resolved.mcqId, section);
        }
    });

    // Revalidate the surfaces that render this related data.
    revalidateCleanupPaths();

    return NextResponse.json({
        success: section ? `Removed "${section}" records.` : "Related records removed.",
        removed,
    });
}

function revalidateCleanupPaths() {
    // Best-effort revalidation of pages rendering the cleaned data.
    revalidatePath("/admin/courses");
    revalidatePath("/admin/students");
    revalidatePath("/admin/staffs");
    revalidatePath("/staff/courses");
    revalidatePath("/admin/questions-groups", "layout");
}
