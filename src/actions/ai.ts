'use server';

import OpenAI from "openai";
import { requireUser } from "@/lib/action-guards";
import { consumeQuota } from "@/lib/rate-limit";

/**
 * Lazy OpenAI client: constructing this module eagerly (previous behavior)
 * threw at import time when OPENAI_API_KEY was unset, which crashed the
 * entire server-action bundle of any page importing the AI tutor — taking
 * unrelated actions (submitquestion, submitmodule, ...) down with it.
 * The client is now created on first use only.
 */
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  openai ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  return openai;
}

/** Hard cap for user-controlled prompt text (question/code etc.). */
const MAX_PROMPT_CHARS = 8000;
const clampText = (value: string | null | undefined) =>
  typeof value === "string" && value.length > MAX_PROMPT_CHARS
    ? value.slice(0, MAX_PROMPT_CHARS)
    : (value ?? "");

interface AtomAIProps {
    question: string;
    description: string;
    inputconstraints: string | null;
    blacklist: string | null;
    whitelist: string | null;
    testcasei1: string;
    testcasei2: string;
    testcaseo1: string;
    testcaseo2: string;
    code: string | null;
}

const AIAnalyze = async ({
    question,
    description,
    inputconstraints,
    blacklist,
    whitelist,
    testcasei1,
    testcasei2,
    testcaseo1,
    testcaseo2,
    code,
}: AtomAIProps): Promise<string> => {
    // The AI tutor is a signed-in-only surface (students use it from the
    // practice code view). No session → no OpenAI spend.
    const session = await requireUser();
    if (!session) {
        return "You must be signed in to use ATOM AI.";
    }
    const userId = session.user.id;

    // Budget the tutor per user — it spends real API money.
    const quota = consumeQuota("ai", userId, { perMinute: 5, perDay: 30 });
    if (!quota.allowed) {
        return "You've reached the ATOM AI limit for now — please try again a bit later.";
    }

    if (!process.env.OPENAI_API_KEY) {
        return "ATOM AI tutor is not configured on this server (missing OPENAI_API_KEY).";
    }
    const completion = await getOpenAI().chat.completions.create({
        model: (process.env.OPENAI_MODEL || "gpt-4o-mini"),
        // Bound the answer size so one request can never balloon the bill.
        max_tokens: 700,
        messages: [
            {
                role: "system",
                content: " You are an expert programmer in all programming languages named ATOM AI, tasked with analyzing programming questions, test cases, and junior-level user code. Provide concise suggestions or key code snippets as needed in master level , do not provide entire code (important note - do not provide the entire code / entire example , provide only essential block of code & don't mention or show code based on whitelist & blocklist based data in output), highlighting best practices. Avoid revealing input data and share only essential guidance, please format your response using Markdown ",
            },
            {
                role: "user",
                content: `
                    Question: ${clampText(question)}
                    Description: ${clampText(description)}
                    Input Constraints: ${clampText(inputconstraints) || "None"}
                    Blacklist: ${clampText(blacklist) || "None"}
                    Whitelist: ${clampText(whitelist) || "None"}
                    Test Case 1 Input: ${clampText(testcasei1)}
                    Test Case 1 Output: ${clampText(testcaseo1)}
                    Test Case 2 Input: ${clampText(testcasei2)}
                    Test Case 2 Output: ${clampText(testcaseo2)}
                    Code: ${clampText(code) || "No code provided"}
                `,
            },
        ],
    });

    // console.log(completion.choices[0].message?.content?.trim())
    return completion.choices[0].message?.content?.trim() || "No response from AI.";
};

export default AIAnalyze;
