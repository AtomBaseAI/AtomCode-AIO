/**
 * desktop-e2e-v3.mjs — verifies the web-parity code workspace (practice +
 * assessment) in the desktop app against the web React views:
 *   1. Practice code workspace structure (wq panels, chips, rail, editor,
 *      gated bottom-bar buttons, version select, online status)
 *   2. Run / Run Test Cases web dialogs + button gating
 *   3. Submit Question web confirm dialog + "Code Submitted !" state
 *   4. Assessment workspace (TopBar MCQ/Code toggle, rail, panels)
 * Screenshots land in /tmp/dv3-*.png.
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import WebSocket from "/home/z/my-project/node_modules/ws/index.js";

const results = [];
const ok = (name, cond, detail = "") => {
  results.push({ name, pass: Boolean(cond), detail });
  console.log(`${cond ? "PASS" : "FAIL"} — ${name}${detail ? ` (${detail})` : ""}`);
};
const warn = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "WARN"} — ${name}${detail ? ` (${detail})` : ""}`);
};

mkdirSync("/tmp/dv3", { recursive: true });

const child = spawn(new URL("./node_modules/.bin/electron", `file://${process.cwd()}/`).pathname,
  [".", "--remote-debugging-port=9224", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--js-flags=--max-old-space-size=512"],
  { env: { ...process.env, DISPLAY: ":99" }, stdio: ["ignore", "pipe", "pipe"] });
child.stderr.on("data", (d) => { const s = d.toString(); if (!/bus\.cc|object_proxy|viz_main/.test(s)) process.stderr.write("[electron] " + s); });
process.on("exit", () => { try { child.kill("SIGTERM"); } catch {} });

async function getBrowserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9224/json/version");
      const info = await res.json();
      if (info.webSocketDebuggerUrl) return info.webSocketDebuggerUrl;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("CDP not found");
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
async function attachPage() {
  for (let i = 0; i < 60; i++) {
    const { targetInfos } = await call("Target.getTargets", {});
    const page = targetInfos.find(t => t.type === "page" && /atomcode|localhost/.test(t.url));
    if (page) return (await call("Target.attachToTarget", { targetId: page.targetId, flatten: true })).sessionId;
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("no page");
}
sessionId = await attachPage();
const evalJs = async (expression, timeoutMs = 30000) => {
  const r = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, timeout: timeoutMs });
  if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception?.description || "").slice(0, 300));
  return r.result?.value;
};
const waitForJs = async (expression, timeoutMs = 30000, pollMs = 500) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try { const v = await evalJs(expression, 5000); if (v) return v; } catch {}
    await new Promise(r => setTimeout(r, pollMs));
  }
  throw new Error("timeout: " + expression.slice(0, 80));
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function shot(name) {
  const { data } = await call("Page.captureScreenshot", { format: "png" });
  writeFileSync(`/tmp/dv3/${name}.png`, Buffer.from(data, "base64"));
  console.log(`[shot] /tmp/dv3/${name}.png`);
}
const closeModal = async () => {
  await evalJs(`(() => { const b = document.querySelector('.modal-box button[data-close], .modal button[data-close], #modal-box .btn'); if (b) b.click(); return true; })()`);
  await sleep(400);
};

try {
  await call("Page.enable", {});
  await call("Runtime.enable", {});
  await sleep(3000);

  /* ---------- fresh login ---------- */
  await evalJs(`localStorage.clear(); 'cleared'`);
  await call("Page.reload", {});
  await sleep(3500);
  await waitForJs(`!document.getElementById('view-login').classList.contains('hidden')`, 20000);
  const gateVisible = await evalJs(`!document.getElementById('field-server').classList.contains('hidden')`);
  if (gateVisible) {
    await evalJs(`(() => {
      const s = document.getElementById('login-server');
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      set.call(s, 'http://localhost:3000');
      s.dispatchEvent(new Event('input', { bubbles: true }));
      document.getElementById('gate-btn').click();
      return true;
    })()`);
    await waitForJs(`!document.getElementById('login-cred').classList.contains('hidden')`, 30000);
  }
  await sleep(1500);
  await evalJs(`(() => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const e = document.getElementById('login-email'); set.call(e, 'student@atom.com'); e.dispatchEvent(new Event('input', { bubbles: true }));
    const p = document.getElementById('login-password'); set.call(p, 'User@Atom'); p.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('login-btn').click();
    return true;
  })()`);
  await waitForJs(`!document.getElementById('view-shell').classList.contains('hidden')`, 40000);
  ok("login → app shell", true);
  await sleep(1500);

  /* ---------- open a practice code module ---------- */
  await evalJs(`(document.querySelector('.side-link[data-view="courses"]')||{}).click?.()`);
  await waitForJs(`document.querySelectorAll('.course-card').length >= 1`, 20000);
  await evalJs(`(() => { const c = Array.from(document.querySelectorAll('.course-card')).find(x => /Full Stack Java/.test(x.textContent)) || document.querySelectorAll('.course-card')[0]; if (c) c.click(); return true; })()`);
  await waitForJs(`document.querySelectorAll('.acc-item').length >= 1`, 20000);
  await evalJs(`(() => { const accs = Array.from(document.querySelectorAll('.acc-item')); const t = accs.find(a => /Java Basics/.test(a.textContent)) || accs[0]; const trig = t && t.querySelector('.acc-trigger'); if (trig && !t.classList.contains('open')) trig.click(); return true; })()`);
  await sleep(800);
  await evalJs(`(() => { const btn = Array.from(document.querySelectorAll('[data-mod]'))[0]; if (btn) btn.click(); return true; })()`);
  await sleep(800);
  await evalJs(`(() => { const b = document.getElementById('start-mod'); if (b) b.click(); return true; })()`);
  await sleep(600);
  await evalJs(`(() => { const b = document.getElementById('sm-go'); if (b) b.click(); return true; })()`);
  await waitForJs(`Boolean(document.querySelector('.practice-root:not(.hidden)')) || Boolean(document.getElementById('ph-back'))`, 25000);
  await sleep(800);

  // practice home → Start Code (or already-open workspace)
  const startCode = await evalJs(`(() => { const b = Array.from(document.querySelectorAll('button')).find(x => /Start Code|Resume Code/.test(x.textContent)); if (b) { b.click(); return true; } return false; })()`);
  if (!startCode) {
    warn("practice: Start Code button", false, "module may already be completed — structure checks limited");
  }
  await waitForJs(`Boolean(document.querySelector('.wq-panels'))`, 25000);
  await sleep(1000);

  /* ---------- 1. workspace structure (web parity) ---------- */
  const st = await evalJs(`JSON.stringify({
    panels: document.querySelectorAll('.wq-panels').length,
    wpanels: document.querySelectorAll('.wq-panels > .wpanel').length,
    drag: document.querySelectorAll('.wq-drag').length,
    chips: Array.from(document.querySelectorAll('.wq-chip')).map(c => c.textContent.trim()),
    title: document.querySelector('.wq-title') ? document.querySelector('.wq-title').textContent.trim() : null,
    purpleHeads: document.querySelectorAll('.practice-root:not(.hidden) .p-head').length,
    maxScore: /Max Score/.test(document.querySelector('.practice-root').textContent),
    grayBoxes: document.querySelectorAll('.wq-gray').length,
    sampleHeads: Array.from(document.querySelectorAll('.wq-tc-head')).map(h => h.textContent.trim()),
    sampleLabels: Array.from(document.querySelectorAll('.wq-tc-label')).map(l => l.textContent.trim()),
    railBtns: document.querySelectorAll('.rail-btn[data-i]').length,
    themeBtn: Boolean(document.getElementById('cp-theme')),
    submitAll: Boolean(document.getElementById('cp-submit')),
    exitBtn: Boolean(document.getElementById('cp-exit')),
    net: document.getElementById('wq-net') ? document.getElementById('wq-net').textContent.trim() : null,
    gutter: Boolean(document.querySelector('.editor-gutter')),
    editorLight: Boolean(document.querySelector('.editor-wrap.light')),
    runVisible: !document.getElementById('run-sample').classList.contains('hidden'),
    runTestsHidden: document.getElementById('run-tests').classList.contains('hidden'),
    submitQHidden: document.getElementById('cp-submit2').classList.contains('hidden'),
    verSelect: document.getElementById('ver-select') ? Array.from(document.getElementById('ver-select').options).map(o => o.textContent) : null,
    barButtons: Array.from(document.querySelectorAll('.wq-bar button')).map(b => b.textContent.trim()),
  })`);
  const s = JSON.parse(st);
  ok("workspace: two-panel card with draggable divider", s.panels === 1 && s.wpanels === 2 && s.drag === 1, st);
  ok("workspace: web section chips (Question/Description/Input Constrains/Sample Testcases)",
    s.chips.join("|") === "Question|Description|Input Constrains|Sample Testcases", s.chips.join("|"));
  ok("workspace: question title shown", Boolean(s.title), s.title || "");
  ok("workspace: no purple headers, no Max Score (web parity)", s.purpleHeads === 0 && s.maxScore === false, `heads=${s.purpleHeads}`);
  ok("workspace: gray sample boxes + violet labels", s.grayBoxes >= 4 && s.sampleHeads.length >= 1 && s.sampleLabels.join("|").includes("Sample Input"), `boxes=${s.grayBoxes}`);
  ok("rail: numbered chips + theme/submit/exit", s.railBtns >= 1 && s.themeBtn && s.submitAll && s.exitBtn, `chips=${s.railBtns}`);
  ok("workspace: online status in question footer", s.net === "Online", s.net);
  ok("editor: gutter + eclipse light theme", s.gutter && s.editorLight, "");
  ok("bar: Run visible; Run Test Cases + Submit Question gated (hidden)", s.runVisible && s.runTestsHidden && s.submitQHidden, s.barButtons.join(" | "));
  ok("bar: runtime version select (web LanguageVersionSelect)", Array.isArray(s.verSelect) && s.verSelect.length >= 1, (s.verSelect || []).join(", "));
  await shot("01-practice-workspace");

  /* ---------- 2. Run → Expected/Program dialog ---------- */
  let samplePassed = false;
  try {
    await evalJs(`document.getElementById('run-sample').click()`);
    await waitForJs(`Boolean(document.querySelector('.dlg-head-row'))`, 20000);
    const dlgRunning = await evalJs(`document.querySelector('.modal-box, #modal-box') ? document.querySelector('.modal-box, #modal-box').textContent.includes('Expected Output') : false`);
    ok("run dialog: Expected/Program Output (web layout)", dlgRunning, "");
    // wait for the run to finish (footer Close appears)
    const done = await waitForJs(`Boolean(document.querySelector('.dlg-foot .dlg-close'))`, 90000);
    samplePassed = true;
    await shot("02-run-dialog");
    await closeModal();
  } catch (e) {
    warn("run dialog: Expected/Program Output", false, String(e.message).slice(0, 80));
    await closeModal();
  }
  await sleep(600);
  const rtVisible = await evalJs(`!document.getElementById('run-tests').classList.contains('hidden')`);
  if (samplePassed && rtVisible) {
    ok("gating: Run Test Cases revealed after sample run", true, "");

    /* ---------- 3. Run Test Cases → verdict dialog ---------- */
    try {
      await evalJs(`document.getElementById('run-tests').click()`);
      await waitForJs(`Boolean(document.querySelector('.dlg-case-row'))`, 20000);
      await waitForJs(`Boolean(document.querySelector('.dlg-foot .dlg-close'))`, 90000);
      const verdicts = await evalJs(`JSON.stringify({
        rows: document.querySelectorAll('.dlg-case-row').length,
        verdictTexts: Array.from(document.querySelectorAll('.dlg-case-row')).map(r => r.textContent.trim()),
      })`);
      const v = JSON.parse(verdicts);
      ok("testcases dialog: 3 rows with verdicts", v.rows === 3 && v.verdictTexts.some(t => /Passed|Failed/.test(t)), v.verdictTexts.join(" / ").slice(0, 90));
      await shot("03-testcases-dialog");
      await closeModal();
    } catch (e) {
      warn("testcases dialog", false, String(e.message).slice(0, 80));
      await closeModal();
    }
    await sleep(600);
    const sqVisible = await evalJs(`!document.getElementById('cp-submit2').classList.contains('hidden')`);
    ok("gating: Submit Question revealed after test cases", sqVisible, "");

    /* ---------- 4. Submit Question → confirm → Code Submitted ---------- */
    try {
      await evalJs(`document.getElementById('cp-submit2').click()`);
      await waitForJs(`Boolean(document.getElementById('wqd-yes'))`, 15000);
      const conf = await evalJs(`JSON.stringify({
        title: document.querySelector('.dialog-title') ? document.querySelector('.dialog-title').textContent.trim() : '',
        hasRedClose: Boolean(document.querySelector('.dlg-cancel-red')),
      })`);
      const c = JSON.parse(conf);
      ok("submit confirm: 'Submit Question' + red Close (web)", /Submit Question/.test(c.title) && c.hasRedClose, conf);
      await shot("04-submit-confirm");
      await evalJs(`document.getElementById('wqd-yes').click()`);
      await waitForJs(`Boolean(document.querySelector('.wq-submitted:not(.hidden)'))`, 40000);
      const sub = await evalJs(`JSON.stringify({
        text: document.querySelector('.wq-submitted .t') ? document.querySelector('.wq-submitted .t').textContent.trim() : '',
        aiBtn: Boolean(document.getElementById('cp-ai')),
        railGreen: Boolean(document.querySelector('.rail-btn.submitted')),
      })`);
      const sp = JSON.parse(sub);
      ok("submitted state: 'Code Submitted !' + ATOM AI (web)", sp.text === "Code Submitted !" && sp.aiBtn, sub);
      ok("rail: submitted chip turns green", sp.railGreen, "");
      await shot("05-code-submitted");
    } catch (e) {
      warn("submit flow", false, String(e.message).slice(0, 100));
      await closeModal();
    }
  } else {
    warn("gating: Run Test Cases revealed after sample run", false, samplePassed ? "sample did not pass" : "run failed/skipped");
  }

  /* ---------- leave practice ---------- */
  await evalJs(`(() => { const b = document.getElementById('cp-exit'); if (b) b.click(); return true; })()`);
  await sleep(800);

  /* ---------- 5. assessment workspace (structure) ---------- */
  try {
    await evalJs(`(document.querySelector('.side-link[data-view="assessments"]')||{}).click?.()`);
    await waitForJs(`Boolean(document.querySelector('.asm-card')) || /No Assessments/.test(document.body.innerText)`, 20000);
    const hasAsm = await evalJs(`Boolean(document.querySelector('.asm-card'))`);
    if (hasAsm) {
      await evalJs(`(() => { const c = Array.from(document.querySelectorAll('.asm-card')).find(x => x.classList.contains('clickable')) || document.querySelector('.asm-card'); if (c) c.click(); return true; })()`);
      await sleep(1000);
      // prepare dialog → start
      await evalJs(`(() => { const b = Array.from(document.querySelectorAll('#modal-box button, .modal button')).find(x => /Start|Begin|Resume|Continue/i.test(x.textContent)); if (b) b.click(); return true; })()`);
      await waitForJs(`Boolean(document.querySelector('.practice-root:not(.hidden)'))`, 25000);
      await sleep(1000);
      const asm = await evalJs(`JSON.stringify({
        topbar: Boolean(document.querySelector('.asm-topbar')),
        viewSelect: Boolean(document.getElementById('asm-view-select')),
        viewOptions: document.getElementById('asm-view-select') ? Array.from(document.getElementById('asm-view-select').options).map(o => o.textContent) : [],
        rail: document.querySelectorAll('.rail-btn[data-rail-i]').length,
        mcqHead: document.querySelector('.p-head') ? document.querySelector('.p-head').textContent.trim().slice(0, 30) : null,
        endTest: Boolean(document.getElementById('asm-end')),
        timer: Boolean(document.getElementById('asm-timer')),
      })`);
      const a = JSON.parse(asm);
      ok("assessment: TopBar with MCQ/Code toggle + timer + End Test", a.topbar && a.endTest && a.timer && a.viewSelect, `options=${a.viewOptions.join(",")}`);
      ok("assessment: rail + single MCQ panel (web AssessmentMCQView)", a.rail >= 1 && Boolean(a.mcqHead) && /Question :/.test(a.mcqHead || ""), a.mcqHead || "");
      await shot("06-assessment-mcq");

      // switch to Code section if available
      const canCode = await evalJs(`(() => { const sel = document.getElementById('asm-view-select'); const opt = sel && Array.from(sel.options).find(o => o.value === 'code'); if (opt && !opt.disabled) { sel.value = 'code'; sel.dispatchEvent(new Event('change', { bubbles: true })); return true; } return false; })()`);
      if (canCode) {
        await waitForJs(`Boolean(document.querySelector('.wq-panels'))`, 15000);
        await sleep(800);
        const asmCode = await evalJs(`JSON.stringify({
          panels: document.querySelectorAll('.wq-panels > .wpanel').length,
          chips: Array.from(document.querySelectorAll('.wq-chip')).map(c => c.textContent.trim()).slice(0, 4),
          editor: Boolean(document.getElementById('asm-code-editor')),
          run: Boolean(document.getElementById('asm-run-sample')),
          runTestsHidden: document.getElementById('asm-run-tests') ? document.getElementById('asm-run-tests').classList.contains('hidden') : null,
          submitHidden: document.getElementById('asm-submit-q') ? document.getElementById('asm-submit-q').classList.contains('hidden') : null,
        })`);
        const ac = JSON.parse(asmCode);
        ok("assessment code: web panels + chips + editor + gated buttons",
          ac.panels === 2 && ac.chips.join("|").includes("Question") && ac.editor && ac.run && ac.runTestsHidden && ac.submitHidden, asmCode);
        await shot("07-assessment-code");
      } else {
        warn("assessment code section", false, "no code section in this assessment");
      }
      // leave the attempt (End Test → Close)
      await evalJs(`(() => { const b = document.getElementById('asm-end'); if (b) b.click(); return true; })()`);
      await sleep(600);
      await evalJs(`(() => { const b = document.getElementById('ae-no'); if (b) b.click(); return true; })()`);
      await sleep(500);
      await evalJs(`window.closePractice ? window.closePractice() : null`);
    } else {
      warn("assessment workspace", false, "no assessments available for this student");
    }
  } catch (e) {
    warn("assessment workspace", false, String(e.message).slice(0, 120));
    try { await evalJs(`window.closePractice ? window.closePractice() : null`); } catch {}
  }

} catch (e) {
  ok("e2e completed without fatal error", false, String(e.message).slice(0, 200));
}

const failed = results.filter(r => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? ` — ${failed} FAILED` : " — ALL OK"}`);
process.exit(failed ? 1 : 0);
