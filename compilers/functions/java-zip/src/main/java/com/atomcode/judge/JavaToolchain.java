package com.atomcode.judge;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.SimpleJavaFileObject;
import javax.tools.ToolProvider;

/**
 * Java toolchain for the judge: compiles user code in-process (system javac
 * or the bundled ECJ) and runs it as a subprocess. This is the Java port of
 * the java branch in compilers/functions/_shared/handler.mjs — the request/
 * response contract, limits, timeout clamping and judge semantics must stay
 * byte-compatible with that file.
 */
final class JavaToolchain {

    /* ───────────────────── limits (mirror handler.mjs) ───────────────────── */

    static final int COMPILE_TIMEOUT_MS = 30_000;
    static final int MAX_STREAM_CHARS = 200_000;

    /* mirrors langspec/java.json profiles */
    static final Map<String, String> RELEASE_BY_PROFILE = Map.of(
            "java-8", "8",
            "java-11", "11",
            "java-17", "17",
            "java-21", "21");
    static final String DEFAULT_PROFILE = "java-17";

    private static final Pattern PKG = Pattern.compile("(^|\n)\\s*package\\s+([\\w.]+)\\s*;");
    private static final Pattern CLASS_DECL = Pattern.compile(
            "(?:public\\s+)?(?:final\\s+|abstract\\s+)*class\\s+([A-Za-z_$][A-Za-z0-9_$]*)\\s*(?:extends\\s+[\\w.]+|implements\\s+[\\w.,\\s]+)?\\s*\\{");
    private static final Pattern HAS_MAIN = Pattern.compile("static[\\s\\S]{0,200}?void[\\s\\S]{0,40}?main\\s*\\(");
    private static final Pattern PUBLIC_TYPE = Pattern.compile(
            "(^|\n)\\s*public\\s+(?:final\\s+|abstract\\s+|sealed\\s+|non\\s+sealed\\s+|static\\s+)*(?:class|enum|interface|record)\\s+([A-Za-z_$][A-Za-z0-9_$]*)");

    /* ────────────────────────── code detection ports ─────────────────────── */

    /** Mirror of detectMainClass() in handler.mjs. */
    static String detectMainClass(String code) {
        String pkg = "";
        Matcher pkgMatch = PKG.matcher(code);
        if (pkgMatch.find()) pkg = pkgMatch.group(2) + ".";

        String fallback = null;
        Matcher m = CLASS_DECL.matcher(code);
        while (m.find()) {
            int from = m.end();
            int to = Math.min(code.length(), from + 800);
            if (HAS_MAIN.matcher(code.substring(from, to)).find()) {
                return pkg + m.group(1);
            }
            if (fallback == null) fallback = m.group(1);
        }
        return pkg + (fallback != null ? fallback : "Main");
    }

    /** Mirror of detectPublicTypeName() in handler.mjs. */
    static String detectPublicTypeName(String code) {
        Matcher m = PUBLIC_TYPE.matcher(code);
        return m.find() ? m.group(2) : null;
    }

    /** Mirror of normalizeOutput() in handler.mjs (judge comparison). */
    static String normalizeOutput(String value) {
        String s = value == null ? "" : value.replace("\r\n", "\n");
        String[] lines = s.split("\n", -1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < lines.length; i++) {
            sb.append(lines[i].replaceAll("[ \t]+$", ""));
            if (i < lines.length - 1) sb.append('\n');
        }
        return sb.toString().replaceAll("\n+$", "").trim();
    }

    /** Mirror of the clampRunTimeout() defaults for java (spec.limits.runTimeoutMs = 30000). */
    static long clampRunTimeout(Long timeoutMs) {
        long t = timeoutMs == null ? 30_000L : timeoutMs;
        return Math.min(Math.max(t, 1_000L), 60_000L);
    }

    /* ─────────────────────────────── compile ─────────────────────────────── */

    record CompileResult(boolean ok, String message, String mainClass, String sourceFile,
            long compileTimeMs, boolean toolchainUnavailable) {
        static CompileResult toolchainError(String msg) {
            return new CompileResult(false, "Toolchain unavailable: " + msg, null, null, 0, true);
        }
        static CompileResult compileError(String stderr) {
            return new CompileResult(false, stderr, null, null, 0, false);
        }
    }

    /**
     * Mirror of the java branch of compile() in handler.mjs:
     *   javac --release <level> -nowarn -d out <PublicType>.java
     * Runs the compiler in-process (system javac) with ECJ as the guaranteed
     * fallback — no compiler subprocess, no dependence on javac being on PATH.
     */
    static CompileResult compile(Path dir, String code, String versionProfileId) {
        long started = System.nanoTime();

        String profile = versionProfileId == null || versionProfileId.isBlank()
                ? DEFAULT_PROFILE : versionProfileId;
        String release = RELEASE_BY_PROFILE.getOrDefault(profile, "17");

        String mainClass = detectMainClass(code);
        String publicType = detectPublicTypeName(code);
        if (publicType == null) {
            int dot = mainClass.lastIndexOf('.');
            publicType = dot >= 0 ? mainClass.substring(dot + 1) : mainClass;
        }
        Path source = dir.resolve(publicType + ".java");
        try {
            Files.writeString(source, code, StandardCharsets.UTF_8);
        } catch (IOException err) {
            return CompileResult.toolchainError("Failed to write source: " + err.getMessage());
        }

        String mode = System.getenv().getOrDefault("ATOM_COMPILER", "auto");
        CompileResult result;
        if ("ecj".equals(mode)) {
            result = compileWithEcj(dir, source, release);
        } else {
            result = compileWithSystemJavac(dir, source, release);
            // auto mode → fall back to the bundled ECJ when no system compiler
            if (!result.ok() && result.toolchainUnavailable()) {
                result = compileWithEcj(dir, source, release);
            }
        }

        long elapsedMs = (System.nanoTime() - started) / 1_000_000L;
        if (!result.ok()) {
            return result;
        }
        return new CompileResult(true, null, mainClass, publicType + ".java", elapsedMs, false);
    }

    /** In-process javax.tools javac (Corretto JDK on Lambda ships it). */
    private static CompileResult compileWithSystemJavac(Path dir, Path source, String release) {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        if (compiler == null) {
            return CompileResult.toolchainError("no system JavaCompiler (JRE-only runtime)");
        }
        try {
            Path outDir = dir.resolve("out");
            Files.createDirectories(outDir);
            ByteArrayOutputStream diagnostics = new ByteArrayOutputStream();

            JavaFileObject unit = new SimpleJavaFileObject(source.toUri(), JavaFileObject.Kind.SOURCE) {
                @Override
                public CharSequence getCharContent(boolean ignoreEncoding) throws IOException {
                    return Files.readString(source, StandardCharsets.UTF_8);
                }
            };
            DiagnosticCollector<JavaFileObject> collector = new DiagnosticCollector<>();
            List<String> options = List.of(
                    "--release", release,
                    "-nowarn",
                    "-d", outDir.toString(),
                    "-classpath", outDir.toString());
            JavaCompiler.CompilationTask task = compiler.getTask(
                    new PrintWriter(new PrintStream(diagnostics, true, StandardCharsets.UTF_8), true),
                    compiler.getStandardFileManager(collector, null, null),
                    collector,
                    options,
                    null,
                    List.of(unit));
            boolean ok = Boolean.TRUE.equals(task.call());
            String stderr = diagnostics.toString(StandardCharsets.UTF_8).trim();
            if (!ok) {
                // Mirror javac stderr formatting ("Main.java:1: error: ...") so the
                // app shows the same compile messages as the container deployment.
                String rendered = collector.getDiagnostics().stream()
                        .map(d -> {
                            String where = source.getFileName() + ""
                                    + (d.getLineNumber() >= 1 ? ":" + d.getLineNumber() : "");
                            String kind = d.getKind() == javax.tools.Diagnostic.Kind.ERROR ? "error"
                                    : d.getKind() == javax.tools.Diagnostic.Kind.WARNING ? "warning" : "note";
                            return where + ": " + kind + ": " + d.getMessage(null);
                        })
                        .collect(java.util.stream.Collectors.joining("\n"));
                String detail = !rendered.isBlank() ? rendered : stderr;
                return CompileResult.compileError(
                        detail.isBlank() ? "Compilation failed (unknown error)." : detail);
            }
            return new CompileResult(true, null, null, null, 0, false);
        } catch (Exception err) {
            return CompileResult.toolchainError("system compiler failed: " + err.getMessage());
        }
    }

    /**
     * Bundled ECJ 3.33 — works even on a JRE-only runtime. BatchCompiler.compile()
     * returns a boolean (unlike Main.main() which System.exits — never call that).
     */
    private static CompileResult compileWithEcj(Path dir, Path source, String release) {
        try {
            Path outDir = dir.resolve("out");
            Files.createDirectories(outDir);
            // ECJ ≥ 3.14 supports --release. Java 8 releases map to 1.8 internally.
            String[] args = {
                    "--release", release,
                    "-nowarn",
                    "-proceedOnError",
                    "-d", outDir.toString(),
                    source.toString(),
            };
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ByteArrayOutputStream err = new ByteArrayOutputStream();
            PrintWriter outW = new PrintWriter(new PrintStream(out, true, StandardCharsets.UTF_8), true);
            PrintWriter errW = new PrintWriter(new PrintStream(err, true, StandardCharsets.UTF_8), true);

            Class<?> batch = Class.forName("org.eclipse.jdt.core.compiler.batch.BatchCompiler");
            Class<?> progress = Class.forName("org.eclipse.jdt.core.compiler.CompilationProgress");
            var method = batch.getMethod("compile", String[].class, PrintWriter.class, PrintWriter.class, progress);
            boolean ok = (Boolean) method.invoke(null, args, outW, errW, null);
            outW.flush();
            errW.flush();

            String stderr = err.toString(StandardCharsets.UTF_8).trim();
            if (!ok) {
                String detail = stderr.isBlank() ? out.toString(StandardCharsets.UTF_8).trim() : stderr;
                return CompileResult.compileError(
                        detail.isBlank() ? "Compilation failed (unknown error)." : detail);
            }
            return new CompileResult(true, null, null, null, 0, false);
        } catch (Exception err) {
            return CompileResult.toolchainError("bundled ECJ unavailable: " + err.getMessage());
        }
    }

    /* ──────────────────────────────── run ────────────────────────────────── */

    record RunResult(String stdout, String stderr, Integer exitCode, boolean timedOut, String spawnError) {
    }

    /**
     * Mirror of the java branch of execute() in handler.mjs:
     *   java -Xmx512m -XX:-UsePerfData -Dfile.encoding=UTF-8 -cp out <MainClass>
     * stdin piped, streams capped, whole process tree killed on timeout.
     */
    static RunResult run(Path dir, String mainClass, String stdin, long timeoutMs) {
        String javaBin = resolveJavaBinary();
        if (javaBin == null) {
            return new RunResult("", "", null, false, "java is not available on this Lambda image.");
        }

        List<String> cmd = List.of(
                javaBin,
                "-Xmx512m",
                "-XX:-UsePerfData",
                "-Dfile.encoding=UTF-8",
                "-cp", dir.resolve("out").toString(),
                mainClass);

        Process proc;
        try {
            proc = new ProcessBuilder(cmd)
                    .directory(dir.toFile())
                    .start();
        } catch (IOException err) {
            return new RunResult("", "", null, false, "Failed to run java: " + err.getMessage());
        }

        CappedCollector stdout = new CappedCollector(MAX_STREAM_CHARS);
        CappedCollector stderr = new CappedCollector(MAX_STREAM_CHARS);
        Thread outThread = new Thread(() -> stdout.drain(proc.getInputStream(), StandardCharsets.UTF_8));
        Thread errThread = new Thread(() -> stderr.drain(proc.getErrorStream(), StandardCharsets.UTF_8));
        outThread.start();
        errThread.start();

        try {
            proc.getOutputStream().write((stdin == null ? "" : stdin).getBytes(StandardCharsets.UTF_8));
            proc.getOutputStream().flush();
        } catch (IOException ignored) {
            /* stdin unavailable — mirror handler.mjs */
        }
        try {
            proc.getOutputStream().close();
        } catch (IOException ignored) {
            /* ignore close races */
        }

        boolean timedOut = false;
        try {
            if (!proc.waitFor(timeoutMs, TimeUnit.MILLISECONDS)) {
                timedOut = true;
                killTree(proc);
            }
        } catch (InterruptedException err) {
            Thread.currentThread().interrupt();
            killTree(proc);
            return new RunResult("", "", null, false, "Failed to run java: interrupted");
        }

        try {
            outThread.join(2_000);
            errThread.join(2_000);
        } catch (InterruptedException err) {
            Thread.currentThread().interrupt();
        }

        if (timedOut) {
            return new RunResult(stdout.text(), stderr.text(), null, true, null);
        }
        return new RunResult(stdout.text(), stderr.text(), proc.exitValue(), false, null);
    }

    private static void killTree(Process proc) {
        try {
            proc.toHandle().descendants().forEach(h -> h.destroyForcibly());
        } catch (Exception ignored) {
            /* descendants enumeration can race */
        }
        proc.destroyForcibly();
        try {
            proc.onExit().get(2, TimeUnit.SECONDS);
        } catch (Exception ignored) {
            /* best effort */
        }
    }

    /**
     * Resolve a runnable `java` binary. The handler itself runs inside the
     * runtime JVM, so the current process command is the most reliable hit;
     * then the usual Lambda/runtime locations, then PATH.
     */
    static String resolveJavaBinary() {
        String self = ProcessHandle.current().info().command().orElse(null);
        if (self != null && Files.isRegularFile(Path.of(self)) && !self.endsWith(".so")) {
            return self;
        }
        String javaHome = System.getenv("JAVA_HOME");
        if (javaHome != null) {
            Path candidate = Path.of(javaHome, "bin", "java");
            if (Files.isRegularFile(candidate)) return candidate.toString();
        }
        for (String fixed : new String[] { "/var/lang/bin/java", "/usr/lib/jvm/java-21-amazon-corretto/bin/java" }) {
            if (Files.isRegularFile(Path.of(fixed))) return fixed;
        }
        try (Stream<Path> js = Files.list(Path.of("/usr/lib/jvm"))) {
            List<Path> found = js
                    .map(p -> p.resolve("bin/java"))
                    .filter(Files::isRegularFile)
                    .toList();
            if (!found.isEmpty()) return found.get(0).toString();
        } catch (Exception ignored) {
            /* /usr/lib/jvm absent locally → fall through to PATH */
        }
        return "java";
    }

    /** Accumulates a stream into a string with a character cap (mirror of append() in handler.mjs). */
    private static final class CappedCollector {
        private final StringBuilder sb = new StringBuilder();
        private final int cap;

        CappedCollector(int cap) {
            this.cap = cap;
        }

        void drain(java.io.InputStream stream, java.nio.charset.Charset charset) {
            byte[] buffer = new byte[8_192];
            try (stream) {
                int read;
                while ((read = stream.read(buffer)) != -1) {
                    if (sb.length() < cap) {
                        String chunk = new String(buffer, 0, read, charset);
                        int room = cap - sb.length();
                        sb.append(chunk, 0, Math.min(room, chunk.length()));
                    }
                }
            } catch (IOException ignored) {
                /* stream torn down on kill */
            }
        }

        String text() {
            return sb.toString();
        }
    }

    private JavaToolchain() {
        throw new AssertionError("static only");
    }
}
