/**
 * desktop-e2e.mjs — single-session end-to-end test of the Electron app.
 * Spawns Electron, drives the renderer over CDP, verifies the student
 * flows: server gate → login → dashboard → assessments → access-key
 * attempt (proctoring: fullscreen + blur) → MCQ → local Java run → save
 * → End Test → results.
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import WebSocket from "/home/z/my-project/node_modules/ws/index.js";

const AID = "f899d3ba-0d79-42a0-9ca0-37d489eea47d";
const ACCESS_KEY = "346243";
const JAVA_CODE = 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Atom!");\n  }\n}';

const results = [];
const ok = (name, cond, detail = "") => {
  results.push({ name, pass: Boolean(cond), detail });
  console.log(`${cond ? "PASS" : "FAIL"} — ${name}${detail ? ` (${detail})` : ""}`);
};

/* ---------------- electron spawn ---------------- */
const electronBin = new URL("./node_modules/.bin/electron", `file://${process.cwd()}/`).pathname;
const child = spawn(electronBin, [".", "--remote-debugging-port=9223", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--js-flags=--max-old-space-size=512"], {
  env: { ...process.env, DISPLAY: ":99" },
  stdio: ["ignore", "pipe", "pipe"],
});
child.stdout.on("data", () => {});
child.stderr.on("data", (d) => { const s = d.toString(); if (!/bus\.cc|object_proxy|viz_main/.test(s)) process.stderr.write("[electron] " + s); });
const killElectron = () => { try { child.kill("SIGTERM"); } catch {} };
process.on("exit", killElectron);
process.on("SIGINT", () => { killElectron(); process.exit(1); });

/* ---------------- CDP plumbing (browser target + flattened sessions) --- */
async function getBrowserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9223/json/version");
      const info = await res.json();
      if (info.webSocketDebuggerUrl) return info.webSocketDebuggerUrl;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("CDP browser target not found");
}

const ws = new WebSocket(await getBrowserWs());
await new Promise((res, rej) => { ws.on("open", res); ws.on("error", rej); });

let msgId = 0;
const pending = new Map();
let sessionId = null;
ws.on("message", (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  msgId += 1;
  pending.set(msgId, { resolve, reject });
  ws.send(JSON.stringify({ id: msgId, method, params, ...(sessionId ? { sessionId } : {}) }));
});

// Attach to the renderer page target with a flattened session.
async function attachPage() {
  for (let i = 0; i < 60; i++) {
    const { targetInfos } = await call("Target.getTargets", {});
    const page = targetInfos.find(t => t.type === "page" && /atomcode|localhost/.test(t.url));
    if (page) {
      const { sessionId: sid } = await call("Target.attachToTarget", { targetId: page.targetId, flatten: true });
      return sid;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("No page target to attach");
}
sessionId = await attachPage();

async function evalJs(expression, timeoutMs = 30000) {
  const r = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, timeout: timeoutMs });
  if (r.exceptionDetails) {
    const desc = r.exceptionDetails.exception?.description || r.exceptionDetails.text || "eval error";
    throw new Error(desc.slice(0, 300));
  }
  return r.result?.value;
}

async function waitForJs(expression, timeoutMs = 30000, pollMs = 500) {
  const start = Date.now();
  let lastErr = null;
  while (Date.now() - start < timeoutMs) {
    try {
      const v = await evalJs(expression, 5000);
      if (v) return v;
    } catch (e) { lastErr = e; }
    await new Promise(r => setTimeout(r, pollMs));
  }
  throw new Error(`waitForJs timeout: ${expression.slice(0, 80)}…${lastErr ? ` (last: ${String(lastErr.message).slice(0, 120)})` : ""}`);
}

async function shot(name) {
  try {
    const { data } = await call("Page.captureScreenshot", { format: "png" });
    writeFileSync(`/tmp/desktop-${name}.png`, Buffer.from(data, "base64"));
    console.log(`[shot] /tmp/desktop-${name}.png`);
  } catch (e) { console.log(`[shot] failed: ${e.message}`); }
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/* ---------------- helpers ---------------- */
const setInputValue = (sel, value) => evalJs(`(() => {
  const el = document.querySelector(${JSON.stringify(sel)});
  if (!el) return false;
  const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  set.call(el, ${JSON.stringify(value)});
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
})()`);

const clickEl = (sel) => evalJs(`(() => {
  const el = document.querySelector(${JSON.stringify(sel)});
  if (!el) return false;
  el.click();
  return true;
})()`);

const textOf = (sel) => evalJs(`(document.querySelector(${JSON.stringify(sel)}) || {}).innerText || ""`);
const exists = (sel) => evalJs(`Boolean(document.querySelector(${JSON.stringify(sel)}))`);

/* ================= TEST FLOW ================= */
try {
  await call("Page.enable", {});
  await call("Runtime.enable", {});
  await sleep(3000);

  /* ---- gate / login ---- */
  const shellVisible = await evalJs(`!document.getElementById('view-shell').classList.contains('hidden')`).catch(() => false);
  if (!shellVisible) {
    const gateVisible = await evalJs(`!document.getElementById('field-server').classList.contains('hidden')`).catch(() => false);
    if (gateVisible) {
      ok("server gate shown on first launch", true);
      await setInputValue("#login-server", "http://localhost:3000");
      await clickEl("#gate-btn");
      await waitForJs(`!document.getElementById('login-cred').classList.contains('hidden')`, 30000);
      ok("server connect → login form", true);
    }
    await setInputValue("#login-email", "student@atom.com");
    await setInputValue("#login-password", "User@Atom");
    await clickEl("#login-btn");
    await waitForJs(`!document.getElementById('view-shell').classList.contains('hidden')`, 40000);
    ok("login → app shell", true);
  } else {
    ok("session resumed from persisted login", true);
  }
  await sleep(2500);
  await shot("01-dashboard");

  /* ---- dashboard ---- */
  await waitForJs(`document.querySelectorAll('.stat-card').length >= 1 && document.querySelectorAll('#cal-days .cal-cell[data-key]').length >= 20`, 30000);
  const dashStats = await evalJs(`Array.from(document.querySelectorAll('.stat-card .lbl')).map(e => e.textContent.trim())`);
  ok("dashboard stat cards + calendar render", dashStats.length >= 3, dashStats.join(", "));

  /* ---- assessments list ---- */
  await clickEl('.side-link[data-view="assessments"]');
  await waitForJs(`document.querySelectorAll('.asm-card').length >= 1`, 30000);
  const cards = await evalJs(`Array.from(document.querySelectorAll('.asm-card')).map(c => c.innerText.replace(/\\n+/g, ' | '))`);
  console.log("[cards]", JSON.stringify(cards));
  const ourCard = cards.find(c => c.includes("Proctoring Live Test"));
  ok("assessment card listed", Boolean(ourCard), ourCard || "missing");
  ok("card status shows Start/Continue", Boolean(ourCard && /\| (Start|Continue)/.test(" " + ourCard)), "");
  await shot("02-assessments-list");

  /* ---- prepare (access key) ---- */
  await evalJs(`document.querySelector('.asm-card[data-aid="${AID}"]').click()`);
  await waitForJs(`Boolean(document.getElementById('otp-row'))`, 30000);
  ok("prepare screen with OTP slots", true);
  await evalJs(`(() => {
    const slots = Array.from(document.querySelectorAll('.otp-slot'));
    "${ACCESS_KEY}".split("").forEach((ch, i) => {
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      set.call(slots[i], ch);
      slots[i].dispatchEvent(new Event('input', { bubbles: true }));
    });
    return true;
  })()`);
  await clickEl("#ap-go");
  await waitForJs(`Boolean(document.querySelector('.asm-topbar'))`, 40000);
  ok("access key → attempt view", true);
  await sleep(1500);
  await shot("03-attempt-top");

  /* ---- attempt state + proctoring ---- */
  const tabCount0 = await textOf("#tab-count");
  ok("tab switch counter at 0", tabCount0 === "0", `got "${tabCount0}"`);
  const timerText = await textOf("#asm-timer");
  ok("timer running", /\d/.test(timerText.replace("—", "")), timerText.slice(0, 40));

  // fullscreen lockdown — the IPC must be acknowledged by the main process.
  // (leave-full-screen events additionally count as tab switches on real
  // desktops with a window manager; Xvfb here has no WM, so we verify the
  // IPC round-trip only.)
  const fsAck = await evalJs(`window.atomcode.setFullscreen(true)`);
  ok("fullscreen lockdown IPC acknowledged", fsAck === true, `got ${fsAck}`);

  // window blur — proctoring signal (window loses focus → tab switch)
  await evalJs(`window.dispatchEvent(new Event('blur'))`);
  await sleep(1200);
  const tabCount1 = await textOf("#tab-count");
  ok("window blur counted as tab switch", tabCount1 === "1", `got "${tabCount1}"`);
  await shot("04-proctoring");

  /* ---- MCQ section ---- */
  await waitForJs(`document.querySelectorAll('#am-abody .opt-row').length >= 4`, 20000);
  await evalJs(`document.querySelectorAll('#am-abody .opt-row')[0].click()`); // extends (correct)
  await clickEl("#am-next");
  await sleep(600);
  await evalJs(`document.querySelectorAll('#am-abody .opt-row')[0].click()`); // Map (correct)
  ok("MCQ answers selected", true);
  await shot("05-mcq");

  /* ---- Code section (local java engine) ---- */
  const qSel = `textarea[data-code]`;
  await waitForJs(`Boolean(document.querySelector(${JSON.stringify(qSel)}))`, 20000);
  await evalJs(`(() => {
    const ta = document.querySelector('textarea[data-code]');
    const set = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    set.call(ta, ${JSON.stringify(JAVA_CODE)});
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  ok("java code entered in desktop editor", true);

  // Run sample
  await clickEl("[data-sample]");
  const samplePassed = await waitForJs(
    `(() => { const t = document.querySelector('#modal-box .dialog-title'); return t && /Sample Testcase/.test(t.textContent) ? t.textContent : null; })()`,
    150000, 1500
  );
  const sampleOut = await textOf("#modal-box .out-pre").catch(() => "");
  ok("Run Sample executed locally (Java/Doppio)", String(sampleOut).includes("Hello, Atom!") || /passed/i.test(String(samplePassed)), `title="${String(samplePassed).trim()}" out="${String(sampleOut).trim().slice(0, 40)}"`);
  await shot("06-sample-run");
  await clickEl("#modal-box [data-close]");
  await sleep(800);

  // Run test cases — results surface as inline badges + toast (no modal)
  await clickEl("[data-run]");
  await waitForJs(`Boolean(document.querySelector('[data-res]'))`, 150000, 1500);
  await sleep(500);
  const testBadges = await evalJs(`Array.from(document.querySelectorAll('[data-res] .badge')).map(b => b.textContent.trim())`);
  ok("hidden test cases judged (server toolchain for Java)", testBadges.filter(b => /pass/i.test(b)).length >= 1, testBadges.join(", "));
  await shot("07-testcases");

  // Save solution
  await clickEl("[data-save]");
  const savedToast = await waitForJs(
    `(() => { const t = document.querySelector('.toast.success span'); return t && /saved/i.test(t.textContent) ? t.textContent : null; })()`,
    30000, 800
  ).catch(() => null);
  ok("solution saved (graded on save)", Boolean(savedToast), savedToast || "toast not seen");

  /* ---- End Test (overall submit) ---- */
  await clickEl("#asm-end");
  await waitForJs(`Boolean(document.getElementById('ae-yes'))`, 15000);
  await clickEl("#ae-yes");
  const scoreTitle = await waitForJs(
    `(() => { const t = document.querySelector('#modal-box .dialog-title'); return t && /Assessment submitted/.test(t.textContent) ? t.textContent : null; })()`,
    60000, 1000
  );
  ok("End Test → finalized with scores dialog", Boolean(scoreTitle), String(scoreTitle).trim());
  const scoreCards = await evalJs(`Array.from(document.querySelectorAll('#modal-box .card-pad')).map(c => c.innerText.replace(/\\n+/g, ' '))`);
  console.log("[scores]", JSON.stringify(scoreCards));
  ok("scores show 2/2 MCQ", scoreCards.some(c => /2\s*\/\s*2/.test(c) && /MCQ/.test(c)), scoreCards.find(c => /MCQ/.test(c)) || "");
  ok("scores show 10/10 Coding", scoreCards.some(c => /10\s*\/\s*10/.test(c) && /Coding/.test(c)), scoreCards.find(c => /Coding/.test(c)) || "");
  await shot("08-scores");
  await clickEl("#fr-ok");
  await sleep(2500);

  /* ---- results view ---- */
  const rows = await evalJs(`Array.from(document.querySelectorAll('.results-wrap table tbody tr')).map(r => r.innerText.replace(/\\n+/g, ' | '))`);
  console.log("[result rows]", JSON.stringify(rows));
  ok("results view lists the assessment", rows.some(r => /Proctoring Live Test/.test(r)), "");
  await shot("09-results");

  /* ---- courses + settings sanity ---- */
  await clickEl('.side-link[data-view="courses"]');
  await waitForJs(`document.querySelectorAll('.course-card').length >= 1`, 20000);
  const courseNames = await evalJs(`Array.from(document.querySelectorAll('.course-card h2')).map(h => h.textContent.trim())`);
  ok("courses list renders", courseNames.includes("Full Stack Java"), courseNames.join(", "));

  await clickEl('.side-link[data-view="settings"]');
  await waitForJs(`Boolean(document.getElementById('st-server'))`, 20000);
  const serverSetting = await evalJs(`document.getElementById('st-server').value`);
  ok("settings shows server connection", serverSetting === "http://localhost:3000", serverSetting);
  await shot("10-settings");

} catch (e) {
  ok("flow completed without exception", false, e.message.slice(0, 300));
  await shot("99-error").catch(() => {});
}

console.log("\n===== DESKTOP E2E SUMMARY =====");
const passed = results.filter(r => r.pass).length;
results.forEach(r => console.log(`${r.pass ? "PASS" : "FAIL"} — ${r.name}${r.detail && !r.pass ? ` (${r.detail})` : ""}`));
console.log(`${passed}/${results.length} checks passed`);

killElectron();
process.exit(passed === results.length ? 0 : 1);
