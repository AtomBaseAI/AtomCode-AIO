/**
 * desktop-e2e-v2.mjs — verifies the new desktop features:
 *  1. Login left panel shows client logo + name (from /config branding)
 *  2. Offline detection: banner + net chip + recovery
 *  3. Practice workspace renders web-matching (chips, boxes, gutter, buttons)
 *  4. Settings: Server Connection card removed
 *  5. Sidebar footer (settings gear) alignment fix
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import WebSocket from "/home/z/my-project/node_modules/ws/index.js";

const results = [];
const ok = (name, cond, detail = "") => {
  results.push({ name, pass: Boolean(cond), detail });
  console.log(`${cond ? "PASS" : "FAIL"} — ${name}${detail ? ` (${detail})` : ""}`);
};

const child = spawn(new URL("./node_modules/.bin/electron", `file://${process.cwd()}/`).pathname,
  [".", "--remote-debugging-port=9223", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--js-flags=--max-old-space-size=512"],
  { env: { ...process.env, DISPLAY: ":99" }, stdio: ["ignore", "pipe", "pipe"] });
let preflightLog = [];
child.stdout.on("data", (d) => { const t = d.toString(); if (t.includes("[preflight]")) preflightLog.push(t.trim()); });
child.stderr.on("data", (d) => { const s = d.toString(); if (!/bus\.cc|object_proxy|viz_main/.test(s)) process.stderr.write("[electron] " + s); });
process.on("exit", () => { try { child.kill("SIGTERM"); } catch {} });

async function getBrowserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9223/json/version");
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
  writeFileSync(`/tmp/dv2-${name}.png`, Buffer.from(data, "base64"));
  console.log(`[shot] /tmp/dv2-${name}.png`);
}

try {
  await call("Page.enable", {});
  await call("Network.enable", {});
  await call("Runtime.enable", {});
  await sleep(3000);

  /* ---------- 1. login screen branding ---------- */
  // force logout to reach the login screen
  await evalJs(`localStorage.clear(); 'cleared'`);
  await call("Page.reload", {});
  await sleep(3500);
  await waitForJs(`!document.getElementById('view-login').classList.contains('hidden')`, 20000);
  // gate → server url already cleared, so gate mode shows; set the server
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
  await sleep(2000); // branding fetch
  const brand = await evalJs(`JSON.stringify({
    title: document.getElementById('brand-title').textContent,
    logoVisible: !document.getElementById('brand-logo').classList.contains('hidden'),
    logoSrc: (document.getElementById('brand-logo').src || '').slice(0, 60),
    bulletsGone: !document.querySelector('.brand-points'),
  })`);
  const brandParsed = JSON.parse(brand);
  ok("login left panel shows client name", brandParsed.title === "Atom Code Campus", brandParsed.title);
  ok("login left panel shows client logo", brandParsed.logoVisible, brandParsed.logoSrc);
  ok("old tagline/bullets removed", brandParsed.bulletsGone, "");
  await shot("01-login-branding");

  /* ---------- login ---------- */
  await evalJs(`(() => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const e = document.getElementById('login-email'); set.call(e, 'student@atom.com'); e.dispatchEvent(new Event('input', { bubbles: true }));
    const p = document.getElementById('login-password'); set.call(p, 'User@Atom'); p.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('login-btn').click();
    return true;
  })()`);
  await waitForJs(`!document.getElementById('view-shell').classList.contains('hidden')`, 40000);
  ok("login → app shell", true);
  await sleep(2000);

  /* ---------- net chip (online) ---------- */
  const net0 = await evalJs(`JSON.stringify({ label: document.getElementById('net-label').textContent, chipVisible: Boolean(document.getElementById('net-chip')) })`);
  ok("topbar network chip shows Online", JSON.parse(net0).label === "Online", net0);

  /* ---------- offline emulation ---------- */
  await call("Network.emulateNetworkConditions", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await sleep(800);
  // Chromium updates navigator.onLine from the emulation + fires offline event
  const off = await evalJs(`JSON.stringify({
    onLine: navigator.onLine,
    banner: !document.getElementById('offline-banner').classList.contains('hidden'),
    chip: document.getElementById('net-label').textContent,
  })`);
  const offP = JSON.parse(off);
  ok("offline detected (navigator.onLine=false)", offP.onLine === false, off);
  ok("offline banner shown", offP.banner, "");
  ok("net chip flips to Offline", offP.chip === "Offline", offP.chip);
  await shot("02-offline");

  // navigate to courses while offline → friendly error, no crash
  await evalJs(`(document.querySelector('.side-link[data-view="courses"]')||{}).click?.()`);
  await sleep(1200);
  const offErr = await evalJs(`(() => { const el = document.querySelector('#view .alert-error'); return el ? el.textContent.trim().slice(0, 90) : null; })()`);
  ok("offline view error is friendly", Boolean(offErr && /offline/i.test(offErr)), offErr || "no error shown");

  /* ---------- back online → banner hides + view refreshes ---------- */
  await call("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await sleep(2500);
  const back = await evalJs(`JSON.stringify({
    banner: !document.getElementById('offline-banner').classList.contains('hidden'),
    chip: document.getElementById('net-label').textContent,
    courseCards: document.querySelectorAll('.course-card').length,
  })`);
  const backP = JSON.parse(back);
  ok("banner hides when back online", backP.banner === false, back);
  ok("net chip back to Online", backP.chip === "Online", backP.chip);
  ok("view auto-refreshes after reconnect", backP.courseCards >= 1, `cards=${backP.courseCards}`);

  /* ---------- practice workspace (web-matching) ---------- */
  // courses → Java Basics module card → Start Module → practice home → Start Code
  await evalJs(`(() => { const c = Array.from(document.querySelectorAll('.course-card')).find(x => /Full Stack Java/.test(x.textContent)); if (c) c.click(); return true; })()`);
  await waitForJs(`document.querySelectorAll('.acc-item').length >= 1`, 20000);
  await evalJs(`(() => { const accs = Array.from(document.querySelectorAll('.acc-item')); const t = accs.find(a => /Java Basics/.test(a.textContent)); const trig = t && t.querySelector('.acc-trigger'); if (trig && !t.classList.contains('open')) trig.click(); return true; })()`);
  await sleep(800);
  await evalJs(`(() => { const btn = Array.from(document.querySelectorAll('[data-mod]'))[0]; if (btn) btn.click(); return true; })()`);
  await sleep(800);
  await evalJs(`(() => { const b = document.getElementById('start-mod'); if (b) b.click(); return true; })()`);
  await sleep(600);
  await evalJs(`(() => { const b = document.getElementById('sm-go'); if (b) b.click(); return true; })()`);
  await waitForJs(`Boolean(document.querySelector('.practice-root:not(.hidden)')) || Boolean(document.getElementById('ph-back'))`, 25000);
  await sleep(1000);
  // practice home may show completed module; handle both cases
  const phState = await evalJs(`JSON.stringify({ startCode: Boolean(Array.from(document.querySelectorAll('button')).find(b => /Start Code|Resume|Start MCQ/.test(b.textContent))), moduleDone: /Module Completed/.test(document.body.innerText) })`);
  const ph = JSON.parse(phState);
  if (ph.startCode) {
    const codeBtn = await evalJs(`(() => { const b = Array.from(document.querySelectorAll('button')).find(b => /Start Code/.test(b.textContent)); if (b) { b.click(); return true; } return false; })()`);
    if (codeBtn) {
      await waitForJs(`Boolean(document.querySelector('.editor-gutter'))`, 20000);
      const ws1 = await evalJs(`JSON.stringify({
        chips: Array.from(document.querySelectorAll('.q-chip')).map(c => c.textContent.trim()),
        boxes: document.querySelectorAll('.q-box').length,
        gutter: Boolean(document.querySelector('.editor-gutter')),
        gutterLines: (document.querySelector('.editor-gutter').textContent.trim().split('\\n').length),
        buttons: Array.from(document.querySelectorAll('.p-foot button')).map(b => b.textContent.trim()).slice(0, 4),
        sampleHead: document.querySelectorAll('.sample-head').length,
      })`);
      const w = JSON.parse(ws1);
      ok("workspace: web-style section chips", w.chips.join(",") === "Question,Description,Input Constrains,Sample Testcases", w.chips.join(","));
      ok("workspace: muted input/output boxes", w.boxes >= 2, `boxes=${w.boxes}`);
      ok("workspace: editor line-number gutter", w.gutter && w.gutterLines >= 2, `lines=${w.gutterLines}`);
      ok("workspace: web-matching buttons", /Run/.test(w.buttons.join("|")) && /Run Test Cases/.test(w.buttons.join("|")) && /Submit Question/.test(w.buttons.join("|")), w.buttons.join(" | "));
      await shot("03-workspace");
    }
  } else {
    console.log("[info] module already completed — workspace check skipped this run");
  }

  /* ---------- settings: Server Connection removed ---------- */
  await evalJs(`window.closePractice ? window.closePractice() : null`);
  await sleep(500);
  await evalJs(`(document.querySelector('.side-link[data-view="settings"]')||{}).click?.()`);
  await waitForJs(`Boolean(document.getElementById('st-about'))`, 20000);
  const st = await evalJs(`JSON.stringify({
    serverCard: /Server Connection/.test(document.body.innerText),
    serverAddr: /Server address/.test(document.body.innerText),
    codeExecRow: /Code execution:/.test(document.body.innerText),
    aiRow: /ATOM AI tutor:/.test(document.body.innerText),
    reconnectBtn: Boolean(document.getElementById('st-reconnect')),
    about: /AtomCode Student Desktop v/.test(document.body.innerText),
    profile: /Roll Number/.test(document.body.innerText),
  })`);
  const stp = JSON.parse(st);
  ok("settings: Server Connection card removed", stp.serverCard === false && stp.serverAddr === false && stp.reconnectBtn === false, st);
  ok("settings: config rows removed", stp.codeExecRow === false && stp.aiRow === false, "");
  ok("settings: Profile + About remain", stp.about && stp.profile, "");
  await shot("04-settings");

  /* ---------- sidebar footer alignment ---------- */
  const sb = await evalJs(`(() => {
    const footer = document.querySelector('.side-footer');
    const link = footer.querySelector('.side-link');
    const fs = getComputedStyle(footer).alignItems;
    const lr = link.getBoundingClientRect();
    const sidebarRect = document.querySelector('.sidebar').getBoundingClientRect();
    return JSON.stringify({ align: fs, linkLeftGap: Math.round(lr.left - sidebarRect.left), fullSpan: lr.width > sidebarRect.width * 0.6 });
  })()`);
  const sbp = JSON.parse(sb);
  ok("sidebar footer: links span full width (bar aligned)", sbp.align === "stretch" && sbp.fullSpan && sbp.linkLeftGap <= 2, sb);
  await shot("05-sidebar");

  /* ---------- preflight log ---------- */
  ok("startup preflight ran (main process)", preflightLog.some(l => /"stage":"done"/.test(l) || /"stage":"renderer"/.test(l)), `${preflightLog.length} events`);

} catch (e) {
  ok("flow completed without exception", false, e.message.slice(0, 300));
  await shot("99-error").catch(() => {});
}

console.log("\n===== DESKTOP V2 SUMMARY =====");
const passed = results.filter(r => r.pass).length;
results.forEach(r => console.log(`${r.pass ? "PASS" : "FAIL"} — ${r.name}${r.detail && !r.pass ? ` (${r.detail})` : ""}`));
console.log(`${passed}/${results.length} checks passed`);
child.kill("SIGTERM");
process.exit(passed === results.length ? 0 : 1);
