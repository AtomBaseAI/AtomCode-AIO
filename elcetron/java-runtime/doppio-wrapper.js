/* ================================================================
 * AtomCode Student Desktop — doppio wrapper (one JVM invocation)
 *
 * Problem it solves: the Doppio CLI ends with process.exit(), which
 * truncates pending async writes when stdout is a pipe. This wrapper
 * redirects stdout/stderr into memory and emits a single synchronous
 * fs.writeSync(RESULT_FD, JSON) right before exiting — loss-free.
 *
 * argv: node doppio-wrapper.js <doppio CLI args...>
 * env:  DOPPIO_RESULT_FD=3 (set by the parent runner.js)
 * out:  { code, stdout, stderr }  (BrowserFS/Node noise filtered)
 * ================================================================ */

"use strict";

const fs = require("fs");
const path = require("path");

const DOPPIO_HOME = path.resolve(__dirname, "node_modules", "doppiojvm");
const RESULT_PATH = process.env.DOPPIO_RESULT_PATH || "";
const EXIT_FD = Number(process.env.DOPPIO_RESULT_FD || 3);

const NOISE_RE = /^(\[ZipFS\]|\(node:\d+\)|\(Use `node --trace-warnings|Warning: Accessing non-existent property)/;

const outBuf = [];
const errBuf = [];

process.stdout.write = function wrappedWrite(s) {
  outBuf.push(String(s));
  return true;
};
process.stderr.write = function wrappedWriteErr(s) {
  errBuf.push(String(s));
  return true;
};

/*
 * Deterministic stdin shim. Doppio's System.in natives pull from
 * `process.stdin.read(n)` and wait on `process.stdin.once("readable", cb)`.
 * Node's stdin stream machinery is fragile inside spawned short-lived
 * processes, so we slurp fd 0 once (synchronously) and serve every read
 * from that buffer — no stream events, no event-loop dependency.
 */
const stdinData = (() => {
  try {
    const chunks = [];
    // Read fd 0 to EOF, synchronously.
    const buf = Buffer.alloc(0);
    for (;;) {
      const chunk = Buffer.alloc(65536);
      const n = fs.readSync(0, chunk, 0, 65536, null);
      if (n === 0) break;
      chunks.push(chunk.subarray(0, n));
    }
    return Buffer.concat(chunks.length ? chunks : [buf]);
  } catch {
    return Buffer.alloc(0);
  }
})();

let stdinPos = 0;
const stdinShim = {
  isTTY: false,
  read(nBytes) {
    if (stdinPos >= stdinData.length) return null;
    const take = Math.max(1, Math.min(nBytes || 1, stdinData.length - stdinPos));
    const b = stdinData.subarray(stdinPos, stdinPos + take);
    stdinPos += take;
    return b;
  },
  once(event, cb) {
    // Nothing buffered → the native code treats the next read as EOF.
    if (event === "readable") setImmediate(cb);
  },
  on() {},
  destroy() {},
};
try {
  Object.defineProperty(process, "stdin", { value: stdinShim, configurable: true });
} catch {
  try { process.stdin = stdinShim; } catch { /* keep the real stream */ }
}

function emit(code) {
  const clean = (parts) =>
    parts
      .join("")
      .split("\n")
      .filter((line) => !NOISE_RE.test(line))
      .join("\n");
  const payload = JSON.stringify({
    code: code == null ? 1 : code,
    stdout: clean(outBuf),
    stderr: clean(errBuf),
  });
  try {
    if (RESULT_PATH) {
      fs.writeFileSync(RESULT_PATH, payload);
    } else {
      fs.writeSync(EXIT_FD, payload);
    }
  } catch (e) {
    try {
      process.stderr.write("doppio-wrapper: result write failed: " + (e && e.message) + " (path=" + RESULT_PATH + " fd=" + EXIT_FD + ")\n");
    } catch {
      /* even stderr is gone */
    }
  }
  try {
    process.reallyExit(code == null ? 1 : code);
  } catch {
    process.exit(code == null ? 1 : code);
  }
}

const realExit = process.exit.bind(process);
process.exit = emit;

// The Doppio CLI reads its arguments from process.argv.slice(2).
process.argv = [process.argv[0] || "node", "doppio"].concat(process.argv.slice(2));

require(path.join(DOPPIO_HOME, "bin", "doppio"));

// NOTE: the CLI always terminates through doneCb → process.exit (patched
// above). Do NOT add a fallback emit timer here — the JVM is asynchronous,
// and a timer would kill it mid-run.
