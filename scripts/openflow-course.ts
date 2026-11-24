/**
 * OpenFlow 20-day course generator.
 *
 * Builds one 20-module ("day") course per question-group bank that actually
 * holds questions (PYTHON / Ruby / C / OOPS-using-JAVA — the CPP bank is
 * empty). Every module is themed on exactly one bank topic (the banks carry
 * 20 full topics x 20 code + 20 MCQ), and each module gets a difficulty-mixed
 * selection of 5 code + 5 MCQ questions attached via the questions' moduleId
 * FK (the same mechanism the admin "assign questions" flow uses).
 *
 * Courses are created with completionOrder: "openflow" — all modules open to
 * everyone in any order at any time (moduledate is kept for display only).
 *
 * Idempotent: a course whose title already exists is skipped entirely.
 *
 * Run: bun scripts/openflow-course.ts   (bun auto-loads .env)
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

interface DayPlan {
    course: string;
    group: string;
    language: string;
    topics: string[]; // exactly 20, pedagogically ordered (day 1..20)
}

const PLANS: DayPlan[] = [
    {
        course: "OpenFlow Python Programming",
        group: "PYTHON Programming",
        language: "python",
        topics: [
            "Introduction to Python",
            "Python Syntax and Data Types",
            "Operators",
            "Control Flow (if-else)",
            "Loops",
            "Lists and Tuples",
            "String Manipulation",
            "Dictionaries and Sets",
            "Functions and Lambda",
            "Comprehensions",
            "Error Handling and Exceptions",
            "File Handling",
            "Modules and Packages",
            "Object-Oriented Programming (OOP)",
            "Inheritance",
            "Polymorphism",
            "Decorators and Generators",
            "Regular Expressions",
            "Working with Dates and Times",
            "Multithreading and Concurrency",
        ],
    },
    {
        course: "OpenFlow Ruby Programming",
        group: "Ruby Programming",
        language: "ruby",
        topics: [
            "Introduction to Ruby",
            "Ruby Syntax and Data Types",
            "Operators",
            "Strings",
            "Arrays",
            "Hashes",
            "Symbols and Ranges",
            "Control Flow",
            "Loops and Iterators",
            "Methods",
            "Blocks Procs and Lambdas",
            "Object-Oriented Programming Basics",
            "Inheritance and Class Design",
            "Modules and Mixins",
            "Exception Handling",
            "File Handling",
            "Regular Expressions",
            "Gems and Standard Library",
            "Threads and Concurrency",
            "Metaprogramming Basics",
        ],
    },
    {
        course: "OpenFlow C Programming",
        group: "C Programming",
        language: "c",
        topics: [
            "Introduction to C Programming",
            "Operators",
            "Control Flow (if-else, switch)",
            "Looping Statements",
            "Functions and Modular Programming",
            "1D Arrays",
            "String Manipulation",
            "Strings",
            "2D Arrays",
            "Array Patterns",
            "Pointers and Memory Management",
            "Dynamic Memory Allocation",
            "Structures and Unions",
            "Recursion and Inline Functions",
            "Preprocessor Directives",
            "Bitwise Operations",
            "File Handling in C",
            "Error Handling",
            "Command-Line Arguments",
            "Advanced Topics (Enumerations, Typedef)",
        ],
    },
    {
        course: "OpenFlow Java OOPS",
        group: "OOPS using JAVA",
        language: "java",
        topics: [
            "Introduction to Java",
            "Data Types and Variables",
            "Operators",
            "Control Statements",
            "Looping Statements",
            "Functions and Modular Programming",
            "1D Arrays",
            "Strings",
            "2D Arrays",
            "Introduction to OOP",
            "Classes and Objects",
            "Constructors and Overloading",
            "Inheritance and Interfaces",
            "Polymorphism",
            "Collections Framework 1",
            "Collections Framework 2",
            "Exception Handling",
            "File Handling in Java",
            "Generics and Lambda Expressions",
            "Multithreading and Concurrency",
        ],
    },
    {
        course: "OpenFlow C++ OOPS",
        group: "OOPS using CPP",
        language: "cpp",
        topics: [
            "Introduction to C++",
            "Operators",
            "Control Statements",
            "Looping Statements",
            "Functions and Modular Programming",
            "Recursion",
            "1D Arrays",
            "Strings",
            "2D Arrays",
            "Pattern Manipulation",
            "Pointers and Dynamic Memory",
            "Introduction to Object-Oriented Programming (OOP)",
            "Constructors and Destructors",
            "Inheritance",
            "Polymorphism",
            "Advanced OOP (Abstract Classes, Virtual Functions)",
            "Operator Overloading",
            "Templates and STL",
            "File Handling",
            "Exception Handling, Multithreading",
        ],
    },
];

/** Difficulty-mixed pick: 2 easy, 2 medium, 1 hard (fill from leftovers). */
function pickFive<T extends { id: string; difficulty?: string | null }>(
    rows: T[]
): T[] {
    const buckets: Record<string, T[]> = { easy: [], medium: [], hard: [] };
    const sorted = [...rows].sort((a, b) => (a.id < b.id ? -1 : 1));
    for (const r of sorted) {
        const d = (r.difficulty ?? "medium").toLowerCase();
        (buckets[d] ?? buckets.medium).push(r);
    }
    const picked: T[] = [];
    for (const w of ["easy", "easy", "medium", "medium", "hard"]) {
        const next = buckets[w].shift();
        if (next) picked.push(next);
    }
    const rest = [...buckets.easy, ...buckets.medium, ...buckets.hard];
    while (picked.length < 5 && rest.length) picked.push(rest.shift()!);
    return picked.slice(0, 5);
}

async function main() {
    const start = new Date();
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);

    for (const plan of PLANS) {
        if (plan.topics.length !== 20) {
            throw new Error(`${plan.course}: day plan must hold 20 topics`);
        }
        const group = await db.questionGroup.findFirst({
            where: { title: plan.group },
        });
        if (!group) throw new Error(`Question group not found: ${plan.group}`);

        const existing = await db.course.findFirst({
            where: { title: plan.course },
        });
        if (existing) {
            console.log(`SKIP (already exists): ${plan.course}`);
            continue;
        }

        const course = await db.course.create({
            data: {
                title: plan.course,
                startdate: start,
                enddate: end,
                language: plan.language,
                courseType: "code-mcq",
                anyLanguage: false,
                completionOrder: "openflow",
            },
        });

        let totalCode = 0;
        let totalMcq = 0;
        for (let d = 0; d < 20; d++) {
            const topicName = plan.topics[d];
            const [codes, mcqs] = await Promise.all([
                db.codeQuestion.findMany({
                    where: {
                        questionGroupId: group.id,
                        topic: topicName,
                        moduleId: null,
                    },
                    select: { id: true, difficulty: true, maxscore: true },
                }),
                db.mCQQuestion.findMany({
                    where: {
                        questionGroupId: group.id,
                        topic: topicName,
                        moduleId: null,
                    },
                    select: { id: true, difficulty: true },
                }),
            ]);

            const codePick = pickFive(codes);
            const mcqPick = pickFive(mcqs);
            const maxscore = codePick.reduce((s, q) => s + q.maxscore, 0);

            const moduledate = new Date(start);
            moduledate.setDate(moduledate.getDate() + d);

            const module_ = await db.module.create({
                data: {
                    title: `Day ${String(d + 1).padStart(2, "0")}: ${topicName}`,
                    courseId: course.id,
                    moduledate,
                    modulestatus: "active",
                    language: plan.language,
                    maxscore,
                },
            });

            await db.codeQuestion.updateMany({
                where: { id: { in: codePick.map((q) => q.id) } },
                data: { moduleId: module_.id },
            });
            await db.mCQQuestion.updateMany({
                where: { id: { in: mcqPick.map((q) => q.id) } },
                data: { moduleId: module_.id },
            });

            totalCode += codePick.length;
            totalMcq += mcqPick.length;
            console.log(
                `  ${plan.course} | Day ${d + 1}: ${topicName} — ${codePick.length} code + ${mcqPick.length} mcq`
            );
        }

        console.log(
            `CREATED ${plan.course} (id ${course.id}) — 20 modules, ${totalCode} code + ${totalMcq} mcq questions assigned`
        );
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
