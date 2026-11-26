/* ================================================================
 * AtomCode Student Desktop — C / C++ worker (bundled real toolchain)
 *
 * Runs clang + lld compiled to WebAssembly (binji/wasm-clang, Apache-2.0)
 * fully in this worker: compile student C/C++ → link with the bundled
 * wasi sysroot (libc/libc++/crt1.o) → execute the produced wasm with
 * stdin/stdout captured. 100% local — no server, no Lambda.
 *
 * Layout (renderer/runtimes/clang/):
 *   clang        clang 8.0.1 built to wasm (WASI)
 *   lld          wasm-ld built to wasm (WASI)
 *   memfs        in-memory filesystem service built to wasm
 *   sysroot.tar  C/C++ standard headers + libc/libc++/crt1.o
 *
 * Protocol (same as every desktop worker):
 *   request  { type:"run", executionId, language:"c"|"cpp", code, stdin,
 *              timeoutMs, runtimeBasePath }
 *   response { type:"result", executionId, stdout, stderr,
 *              executionTimeMs, exitCode, compileError? }
 *          | { type:"error",  executionId, message, stage }
 * ================================================================ */

/* ----------------------------- helpers ----------------------------- */

function readStr(u8, o, len = -1) {
  let str = "";
  const end = len === -1 ? u8.length : o + len;
  for (let i = o; i < end && u8[i] !== 0; ++i) str += String.fromCharCode(u8[i]);
  return str;
}

const ESUCCESS = 0;

class ProcExit extends Error {
  constructor(code) {
    super("process exited with code " + code + ".");
    this.code = code;
  }
}

class NotImplemented extends Error {
  constructor(modname, fieldname) {
    super(modname + "." + fieldname + " not implemented.");
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed.");
}

function getInstance(module, imports) {
  return WebAssembly.instantiate(module, imports);
}

function getImportObject(obj, names) {
  const result = {};
  for (const name of names) result[name] = obj[name].bind(obj);
  return result;
}

class Memory {
  constructor(memory) {
    this.memory = memory;
    this.buffer = this.memory.buffer;
    this.u8 = new Uint8Array(this.buffer);
    this.u32 = new Uint32Array(this.buffer);
  }
  check() {
    // A detached (grown) wasm buffer reports byteLength 0 — rebuild views.
    if (this.buffer.byteLength === 0) {
      this.buffer = this.memory.buffer;
      this.u8 = new Uint8Array(this.buffer);
      this.u32 = new Uint32Array(this.buffer);
    }
  }
  read8(o) { return this.u8[o]; }
  read32(o) { return this.u32[o >> 2]; }
  write8(o, v) { this.u8[o] = v; }
  write32(o, v) { this.u32[o >> 2] = v; }
  write64(o, vlo, vhi = 0) { this.write32(o, vlo); this.write32(o + 4, vhi); }
  readStr(o, len) { return readStr(this.u8, o, len); }
  writeStr(o, str) {
    o += this.write(o, str);
    this.write8(o, 0);
    return str.length + 1;
  }
  write(o, buf) {
    if (buf instanceof ArrayBuffer) return this.write(o, new Uint8Array(buf));
    if (typeof buf === "string") {
      const dst = new Uint8Array(this.buffer, o, buf.length);
      for (let i = 0; i < buf.length; ++i) dst[i] = buf.charCodeAt(i);
      return buf.length;
    }
    const dst = new Uint8Array(this.buffer, o, buf.length);
    dst.set(buf);
    return buf.length;
  }
}

/* ------------------------------ MemFS ------------------------------ */

class MemFS {
  constructor(options) {
    this.compileStreaming = options.compileStreaming;
    this.memfsFilename = options.memfsFilename;
    this.stdinStr = options.stdinStr || "";
    this.stdinStrPos = 0;

    // fd 1 → stdout, fd 2 → stderr (both captured during tool runs).
    this.hostWrite = options.hostWrite;

    const env = getImportObject(this, [
      "abort", "host_write", "host_read", "memfs_log", "copy_in", "copy_out",
    ]);

    this.ready = this.compileStreaming(this.memfsFilename)
      .then((module) => WebAssembly.instantiate(module, { env }))
      .then((instance) => {
        this.instance = instance;
        this.exports = instance.exports;
        this.mem = new Memory(this.exports.memory);
        this.exports.init();
      });
  }

  setStdinStr(str) {
    this.stdinStr = str;
    this.stdinStrPos = 0;
  }

  addDirectory(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    this.exports.AddDirectoryNode(path.length);
  }

  addFile(path, contents) {
    const length =
      contents instanceof ArrayBuffer ? contents.byteLength : contents.length;
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.AddFileNode(path.length, length);
    const addr = this.exports.GetFileNodeAddress(inode);
    this.mem.check();
    this.mem.write(addr, contents);
  }

  getFileContents(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.FindNode(path.length);
    const addr = this.exports.GetFileNodeAddress(inode);
    const size = this.exports.GetFileNodeSize(inode);
    return new Uint8Array(this.mem.buffer, addr, size);
  }

  abort() { throw new Error("abort"); }

  host_write(fd, iovs, iovs_len, nwritten_out) {
    this.hostMem_.check();
    assert(fd <= 2, "host_write fd " + fd);
    let size = 0;
    let str = "";
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      str += this.hostMem_.readStr(buf, len);
      size += len;
    }
    this.hostMem_.write32(nwritten_out, size);
    this.hostWrite(fd, str);
    return ESUCCESS;
  }

  host_read(fd, iovs, iovs_len, nread) {
    this.hostMem_.check();
    assert(fd === 0, "host_read fd " + fd);
    let size = 0;
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      const lenToWrite = Math.min(len, this.stdinStr.length - this.stdinStrPos);
      if (lenToWrite === 0) break;
      this.hostMem_.write(buf, this.stdinStr.substr(this.stdinStrPos, lenToWrite));
      size += lenToWrite;
      this.stdinStrPos += lenToWrite;
      if (lenToWrite !== len) break;
    }
    this.hostMem_.write32(nread, size);
    return ESUCCESS;
  }

  memfs_log(buf, len) {
    this.mem.check();
    console.log(this.mem.readStr(buf, len));
  }

  copy_out(clang_dst, memfs_src, size) {
    this.hostMem_.check();
    const dst = new Uint8Array(this.hostMem_.buffer, clang_dst, size);
    this.mem.check();
    const src = new Uint8Array(this.mem.buffer, memfs_src, size);
    dst.set(src);
  }

  copy_in(memfs_dst, clang_src, size) {
    this.mem.check();
    const dst = new Uint8Array(this.mem.buffer, memfs_dst, size);
    this.hostMem_.check();
    const src = new Uint8Array(this.hostMem_.buffer, clang_src, size);
    dst.set(src);
  }
}

/* ------------------------------- App ------------------------------- */

class App {
  constructor(module, memfs, name, ...args) {
    this.argv = [name, ...args];
    this.environ = { USER: "student" };
    this.memfs = memfs;

    const wasi_unstable = getImportObject(this, [
      "proc_exit", "environ_sizes_get", "environ_get", "args_sizes_get",
      "args_get", "random_get", "clock_time_get", "poll_oneoff",
    ]);

    // File-system WASI calls come straight from memfs.
    Object.assign(wasi_unstable, this.memfs.exports);

    this.ready = getInstance(module, { wasi_unstable }).then((instance) => {
      this.instance = instance;
      this.exports = this.instance.exports;
      this.mem = new Memory(this.exports.memory);
      this.memfs.hostMem_ = this.mem;
    });
  }

  async run() {
    await this.ready;
    try {
      this.exports._start();
    } catch (exn) {
      if (exn instanceof ProcExit) {
        if (exn.code === 0) return false;
        throw exn;
      }
      // Trap / abort inside the guest — surface it on stderr.
      const msg = "wasm trap: " + (exn && exn.message ? exn.message : exn);
      this.memfs.hostWrite(2, msg + "\n");
      throw exn;
    }
    return false;
  }

  proc_exit(code) { throw new ProcExit(code); }

  environ_sizes_get(environ_count_out, environ_buf_size_out) {
    this.mem.check();
    let size = 0;
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      const value = this.environ[name];
      size += name.length + value.length + 2; // "name=value\0"
    }
    this.mem.write64(environ_count_out, names.length);
    this.mem.write64(environ_buf_size_out, size);
    return ESUCCESS;
  }

  environ_get(environ_ptrs, environ_buf) {
    this.mem.check();
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      this.mem.write32(environ_ptrs, environ_buf);
      environ_ptrs += 4;
      environ_buf += this.mem.writeStr(environ_buf, name + "=" + this.environ[name]);
    }
    this.mem.write32(environ_ptrs, 0);
    return ESUCCESS;
  }

  args_sizes_get(argc_out, argv_buf_size_out) {
    this.mem.check();
    let size = 0;
    for (const arg of this.argv) size += arg.length + 1;
    this.mem.write64(argc_out, this.argv.length);
    this.mem.write64(argv_buf_size_out, size);
    return ESUCCESS;
  }

  args_get(argv_ptrs, argv_buf) {
    this.mem.check();
    for (const arg of this.argv) {
      this.mem.write32(argv_ptrs, argv_buf);
      argv_ptrs += 4;
      argv_buf += this.mem.writeStr(argv_buf, arg);
    }
    this.mem.write32(argv_ptrs, 0);
    return ESUCCESS;
  }

  random_get(buf, buf_len) {
    const data = new Uint8Array(this.mem.buffer, buf, buf_len);
    for (let i = 0; i < buf_len; ++i) data[i] = (Math.random() * 256) | 0;
    return ESUCCESS;
  }

  clock_time_get(clock_id, precision, time_out) {
    this.mem.check();
    this.mem.write64(time_out, Date.now() * 1e6); // ms → ns (lower 32 bits wrap ok)
    return ESUCCESS;
  }

  poll_oneoff(in_ptr, out_ptr, nsubscriptions, nevents_out) {
    throw new NotImplemented("wasi_unstable", "poll_oneoff");
  }
}

/* ------------------------------- Tar ------------------------------- */

class Tar {
  constructor(buffer) {
    this.u8 = new Uint8Array(buffer);
    this.offset = 0;
  }
  readStr(len) {
    const result = readStr(this.u8, this.offset, len);
    this.offset += len;
    return result;
  }
  readOctal(len) { return parseInt(this.readStr(len), 8); }
  alignUp() { this.offset = (this.offset + 511) & ~511; }
  readEntry() {
    if (this.offset + 512 > this.u8.length) return null;
    const entry = {
      filename: this.readStr(100),
      mode: this.readOctal(8),
      owner: this.readOctal(8),
      group: this.readOctal(8),
      size: this.readOctal(12),
      mtim: this.readOctal(12),
      checksum: this.readOctal(8),
      type: this.readStr(1),
      linkname: this.readStr(100),
    };
    if (this.readStr(8) !== "ustar  ") return null;
    entry.ownerName = this.readStr(32);
    entry.groupName = this.readStr(32);
    entry.devMajor = this.readStr(8);
    entry.devMinor = this.readStr(8);
    entry.filenamePrefix = this.readStr(155);
    this.alignUp();
    if (entry.type === "0") {
      entry.contents = this.u8.subarray(this.offset, this.offset + entry.size);
      this.offset += entry.size;
      this.alignUp();
    } else if (entry.type !== "5") {
      throw new Error("unexpected tar entry type " + entry.type);
    }
    return entry;
  }
  untar(memfs) {
    let entry;
    while ((entry = this.readEntry())) {
      if (entry.type === "0") memfs.addFile(entry.filename, entry.contents);
      else if (entry.type === "5") memfs.addDirectory(entry.filename);
    }
  }
}

/* --------------------------- tool pipeline -------------------------- */

const ASSETS = (() => {
  // runtimeBasePath is "/runtimes/clang/" — resolve against the worker origin.
  const base = new URL("../.." + "/runtimes/clang/", self.location).href;
  return {
    clang: base + "clang",
    lld: base + "lld",
    memfs: base + "memfs",
    sysroot: base + "sysroot.tar",
  };
})();

async function fetchModule(filename) {
  const res = await fetch(filename);
  if (!res.ok) throw new Error("Failed to fetch " + filename + " (" + res.status + ")");
  return WebAssembly.compile(await res.arrayBuffer());
}

let sharedAPI = null;

class Toolchain {
  constructor() {
    this.moduleCache = {};
    this.stdout = [];
    this.stderr = [];
    this.clangCommonArgs = [
      "-disable-free",
      "-isysroot", "/",
      "-internal-isystem", "/include/c++/v1",
      "-internal-isystem", "/include",
      "-internal-isystem", "/lib/clang/8.0.1/include",
      "-ferror-limit", "19",
    ];
    this.memfs = new MemFS({
      compileStreaming: fetchModule,
      hostWrite: (fd, s) => {
        // fd 1 → stdout, fd 2 → stderr (clang/lld diagnostics + program output)
        (fd === 2 ? this.stderr : this.stdout).push(s);
      },
      memfsFilename: ASSETS.memfs,
    });
    this.ready = this.memfs.ready.then(() => this.untarSysroot());
  }

  async untarSysroot() {
    await this.memfs.ready;
    const res = await fetch(ASSETS.sysroot);
    if (!res.ok) throw new Error("Failed to fetch sysroot.tar (" + res.status + ")");
    const tar = new Tar(await res.arrayBuffer());
    tar.untar(this.memfs);
  }

  async getModule(name) {
    if (this.moduleCache[name]) return this.moduleCache[name];
    const module = await fetchModule(name);
    this.moduleCache[name] = module;
    return module;
  }

  /** Run a WASI tool/program to completion. Returns its exit code. */
  async run(module, ...args) {
    const app = new App(module, this.memfs, ...args);
    try {
      await app.run();
      return 0;
    } catch (exn) {
      if (exn instanceof ProcExit) return exn.code;
      throw exn;
    }
  }

  async compile(lang, input, contents, obj) {
    await this.ready;
    this.memfs.addFile(input, contents);
    const clang = await this.getModule(ASSETS.clang);
    return await this.run(
      clang,
      "clang", "-cc1", "-emit-obj",
      ...this.clangCommonArgs,
      "-O2",
      "-o", obj,
      "-x", lang === "c" ? "c" : "c++",
      input
    );
  }

  async link(obj, wasm) {
    const stackSize = 1024 * 1024;
    const libdir = "lib/wasm32-wasi";
    const crt1 = libdir + "/crt1.o";
    const builtins = "/lib/clang/8.0.1/lib/wasi/libclang_rt.builtins-wasm32.a";
    await this.ready;
    const lld = await this.getModule(ASSETS.lld);
    return await this.run(
      lld,
      "wasm-ld",
      "--no-threads",
      "--export-dynamic",
      "-z", "stack-size=" + stackSize,
      "-L" + libdir,
      crt1,
      obj,
      builtins,
      "-lc", "-lc++", "-lc++abi",
      "-o", wasm
    );
  }
}

async function getToolchain() {
  if (!sharedAPI) sharedAPI = new Toolchain();
  await sharedAPI.ready;
  return sharedAPI;
}

/* ------------------------------ runner ----------------------------- */

/* Serialize runs — the toolchain (memfs filenames, streams) is shared. */
let runQueue = Promise.resolve();

self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || msg.type !== "run") return;
  const respond = (payload) => self.postMessage(payload);
  runQueue = runQueue.then(() => handleRun(msg, respond), () => handleRun(msg, respond));
};

async function handleRun(msg, respond) {
  const started = performance.now();

  try {
    if (!msg.runtimeBasePath) {
      throw new Error("C/C++ profile is missing its runtime base path.");
    }
    const lang = (msg.language || "c").toLowerCase() === "cpp" ? "cpp" : "c";
    const tool = await getToolchain();

    // Reset per-run streams; sysroot + compiled modules stay warm.
    tool.stdout.length = 0;
    tool.stderr.length = 0;

    const input = "main.cc";
    const obj = "main.o";
    const wasm = "main.wasm";

    const compileCode = await tool.compile(lang, input, msg.code || "", obj);
    if (compileCode !== 0) {
      // Compilation failed — diagnostics are on stderr.
      respond({
        type: "result",
        executionId: msg.executionId,
        stdout: tool.stdout.join(""),
        stderr: tool.stderr.join("") || "Compilation failed.",
        executionTimeMs: performance.now() - started,
        exitCode: compileCode,
        compileError: true,
      });
      return;
    }

    const linkCode = await tool.link(obj, wasm);
    if (linkCode !== 0) {
      respond({
        type: "result",
        executionId: msg.executionId,
        stdout: tool.stdout.join(""),
        stderr: tool.stderr.join("") || "Linking failed.",
        executionTimeMs: performance.now() - started,
        exitCode: linkCode,
        compileError: true,
      });
      return;
    }

    const buffer = tool.memfs.getFileContents(wasm).slice();
    const program = await WebAssembly.compile(buffer);

    tool.stdout.length = 0;
    tool.stderr.length = 0;
    tool.memfs.setStdinStr(msg.stdin || "");

    let exitCode = 0;
    let crashed = false;
    try {
      exitCode = await tool.run(program, wasm);
    } catch (exn) {
      crashed = !(exn instanceof ProcExit);
    }

    respond({
      type: "result",
      executionId: msg.executionId,
      stdout: tool.stdout.join(""),
      stderr: tool.stderr.join(""),
      executionTimeMs: performance.now() - started,
      exitCode,
      crashed,
    });
  } catch (err) {
    respond({
      type: "error",
      executionId: msg.executionId,
      message: (err instanceof Error ? err.message : String(err)) || "C/C++ toolchain failed.",
      stage: "execute",
    });
  }
};
