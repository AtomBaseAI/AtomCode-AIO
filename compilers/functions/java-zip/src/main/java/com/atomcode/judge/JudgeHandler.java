package com.atomcode.judge;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * AtomCode Java judge — java21 managed-runtime Lambda (ZIP, no ECR).
 *
 * Java port of compilers/functions/_shared/handler.mjs: identical HTTP
 * envelope handling, validation limits, keyword checks, single-run response
 * {type:"result",...}/{type:"error",stage:...} and multi-testcase judge
 * semantics (auto-pass placeholders, sticky failures, aggregate
 * compileMessage + desktop-route aliases). Keep both files in sync.
 *
 * Environment:
 *   ATOM_TOKEN    — when set, HTTP calls must carry x-atom-token (optional)
 *   ATOM_COMPILER — system | ecj | auto (default auto)
 *
 * Local contract runs (no AWS): reads a direct-invoke JSON request from
 * stdin, prints the response JSON to stdout (see pom.xml header).
 */
public final class JudgeHandler implements RequestStreamHandler {

    /* mirror of handler.mjs limits */
    private static final int MAX_CODE_CHARS = 200_000;
    private static final int MAX_STDIN_CHARS = 1_000_000;
    private static final int MAX_TESTCASES = 10;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /* ─────────────────────────── Lambda entry ───────────────────────────── */

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        String eventJson = new String(input.readAllBytes(), StandardCharsets.UTF_8);

        boolean http = false;
        String tokenGiven = null;
        String body = null;

        JsonNode event = null;
        try {
            event = MAPPER.readTree(eventJson);
        } catch (IOException ignored) {
            /* falls through to the invalid-JSON response below */
        }

        Dispatch dispatched;
        if (event != null && event.isObject() && event.has("body")) {
            // Function URL / API Gateway payload
            http = true;
            String token = System.getenv("ATOM_TOKEN");
            if (token != null && !token.isEmpty()) {
                tokenGiven = header(event, "x-atom-token");
                if (!token.equals(tokenGiven)) {
                    write(output, http, 401, err(null, "Invalid or missing x-atom-token.", null));
                    return;
                }
            }
            body = event.path("body").asText("");
            if (event.path("isBase64Encoded").asBoolean(false)) {
                try {
                    body = new String(Base64.getDecoder().decode(body), StandardCharsets.UTF_8);
                } catch (IllegalArgumentException err) {
                    write(output, http, 400, err(null, "Invalid JSON body.", "bad-request"));
                    return;
                }
            }
        }

        if (http && body == null) {
            write(output, http, 400, err(null, "Invalid JSON body.", "bad-request"));
            return;
        }

        try {
            Map<String, Object> request = parseRequest(event, body);
            dispatched = dispatch(request);
        } catch (InvalidJson err) {
            dispatched = new Dispatch(400, err(null, "Invalid JSON body.", "bad-request"));
        } catch (Exception err) {
            dispatched = new Dispatch(500, err(null, "Unexpected execution failure on the Lambda runtime.", "toolchain"));
        }
        write(output, http, dispatched.statusCode(), dispatched.payload());
    }

    /** `java -jar` local mode: direct-invoke request JSON on stdin → response JSON on stdout. */
    public static void main(String[] args) throws IOException {
        String input = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        Dispatch dispatched;
        try {
            Map<String, Object> request = MAPPER.readValue(input.isBlank() ? "{}" : input, Map.class);
            dispatched = dispatch(request);
        } catch (InvalidJson err) {
            dispatched = new Dispatch(400, err(null, "Invalid JSON body.", "bad-request"));
        } catch (Exception err) {
            dispatched = new Dispatch(500, err(null, "Unexpected execution failure on the Lambda runtime.", "toolchain"));
        }
        System.out.println(MAPPER.writeValueAsString(dispatched.payload()));
    }

    /* ─────────────────────────── envelope helpers ───────────────────────── */

    private static final class InvalidJson extends RuntimeException {
    }

    private record Dispatch(int statusCode, Map<String, Object> payload) {
    }

    private static Map<String, Object> parseRequest(JsonNode event, String body) {
        try {
            if (body != null) {
                return MAPPER.readValue(body, Map.class);
            }
            if (event != null && event.isObject()) {
                return MAPPER.convertValue(event, Map.class);
            }
            return new LinkedHashMap<>();
        } catch (IOException err) {
            throw new InvalidJson();
        }
    }

    /** Mirror of the lowercase-header lookup in handler.mjs. */
    private static String header(JsonNode event, String name) {
        JsonNode headers = event.path("headers");
        if (!headers.isObject()) return null;
        var fields = headers.fields();
        while (fields.hasNext()) {
            var entry = fields.next();
            if (entry.getKey().toLowerCase().equals(name)) {
                JsonNode value = entry.getValue();
                if (value.isArray() && value.size() > 0) return value.get(0).asText(null);
                return value.asText(null);
            }
        }
        return null;
    }

    private static void write(OutputStream output, boolean http, int statusCode, Map<String, Object> payload)
            throws IOException {
        if (http) {
            Map<String, Object> envelope = new LinkedHashMap<>();
            envelope.put("statusCode", statusCode);
            envelope.put("headers", Map.of("Content-Type", "application/json"));
            envelope.put("body", MAPPER.writeValueAsString(payload));
            output.write(MAPPER.writeValueAsBytes(envelope));
        } else {
            output.write(MAPPER.writeValueAsBytes(payload));
        }
    }

    /* ────────────────────── shared response constructors ────────────────── */

    private static Map<String, Object> err(String executionId, String message, String stage) {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("type", "error");
        if (executionId != null) out.put("executionId", executionId);
        if (stage != null) out.put("stage", stage);
        out.put("message", message == null ? "" : message);
        return out;
    }

    /* ───────────────────────────── orchestrator ─────────────────────────── */

    /**
     * Mirror of the handler() entry: validation order, keyword checks and the
     * single-vs-multi switch. The language is always java on this function
     * (per-image langspec behavior in handler.mjs).
     */
    private static Dispatch dispatch(Map<String, Object> req) {
        String executionId = str(req.get("executionId"));

        String code = str(req.get("code"));
        if (code.isBlank()) {
            return new Dispatch(400, err(executionId, "Code is empty.", "bad-request"));
        }
        if (code.length() > MAX_CODE_CHARS) {
            return new Dispatch(400, err(executionId, "Source too large (limit " + MAX_CODE_CHARS + " characters).", "bad-request"));
        }
        String stdin = str(req.get("stdin"));
        if (stdin.length() > MAX_STDIN_CHARS) {
            return new Dispatch(400, err(executionId, "stdin too large (limit " + MAX_STDIN_CHARS + " characters).", "bad-request"));
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> checks = (Map<String, Object>) req.get("checks");
        String keywordViolation = checkKeywords(code, checks);
        if (keywordViolation != null) {
            return new Dispatch(400, err(executionId, keywordViolation, "compile"));
        }

        List<Map<String, String>> testcases = normalizeTestcases(req.get("testcases"));
        if (!testcases.isEmpty() && testcases.size() > MAX_TESTCASES) {
            return new Dispatch(400, err(executionId, "Too many test cases (limit " + MAX_TESTCASES + ").", "bad-request"));
        }

        Map<String, Object> response = testcases.isEmpty()
                ? runSingle(req, code, stdin, executionId)
                : runMulti(req, code, testcases);
        return new Dispatch(200, response);
    }

    /* ──────────────────────────── single run ────────────────────────────── */

    private static Map<String, Object> runSingle(Map<String, Object> req, String code, String stdin, String executionId) {
        long timeoutMs = JavaToolchain.clampRunTimeout(longOrNull(req.get("timeoutMs")));
        String versionProfileId = str(req.get("versionProfileId"));

        Path dir = workDir();
        try {
            JavaToolchain.CompileResult compiled = JavaToolchain.compile(dir, code, versionProfileId);
            if (!compiled.ok()) {
                return err(executionId, compiled.message(), compiled.toolchainUnavailable() ? "toolchain" : "compile");
            }

            long started = System.nanoTime();
            JavaToolchain.RunResult run = JavaToolchain.run(dir, compiled.mainClass(), stdin, timeoutMs);
            long elapsedMs = (System.nanoTime() - started) / 1_000_000L;

            if (run.spawnError() != null) {
                return err(executionId, run.spawnError(), "toolchain");
            }
            if (run.timedOut()) {
                Map<String, Object> out = err(executionId, "Execution timed out.", "execute");
                out.put("timedOut", true);
                return out;
            }

            Map<String, Object> out = new LinkedHashMap<>();
            out.put("type", "result");
            out.put("executionId", executionId);
            out.put("stdout", run.stdout());
            out.put("stderr", run.stderr());
            out.put("exitCode", run.exitCode() == null ? 0 : run.exitCode());
            out.put("executionTimeMs", elapsedMs);
            return out;
        } finally {
            cleanup(dir);
        }
    }

    /* ─────────────────────── multi-testcase judge ───────────────────────── */

    /**
     * Mirror of runMulti() in handler.mjs: compile once (the Node version
     * recompiles per case — deterministic code makes it contract-identical),
     * auto-pass placeholder cases, sticky compile/runtime failures, output
     * comparison via normalizeOutput, desktop-route aliases at the end.
     */
    private static Map<String, Object> runMulti(Map<String, Object> req, String code, List<Map<String, String>> testcases) {
        if (testcases.isEmpty()) {
            Map<String, Object> out = new LinkedHashMap<>();
            out.put("compileMessage", "Error");
            out.put("results", new ArrayList<Map<String, Object>>());
            out.put("passedCount", 0);
            out.put("total", 0);
            return out;
        }

        String versionProfileId = str(req.get("versionProfileId"));
        long timeoutMs = JavaToolchain.clampRunTimeout(longOrNull(req.get("timeoutMs")));

        List<Map<String, Object>> results = new ArrayList<>();
        boolean runtimeBroken = false;
        boolean compileFailed = false;
        String compileMessage = "";

        Path dir = null;
        JavaToolchain.CompileResult compiled = null;
        try {
            for (int index = 0; index < testcases.size(); index++) {
                Map<String, String> testCase = testcases.get(index);
                String input = testCase.get("input");
                String expected = testCase.get("expectedOutput");

                // Mirror wasm-judge: undefined placeholder cases auto-pass.
                if (index > 0 && input.isEmpty() && expected.isEmpty()) {
                    results.add(caseResult("Success", ""));
                    continue;
                }
                if (runtimeBroken || compileFailed) {
                    results.add(caseResult("Error", ""));
                    continue;
                }

                if (compiled == null) {
                    dir = workDir();
                    compiled = JavaToolchain.compile(dir, code, versionProfileId);
                    if (!compiled.ok()) {
                        compileFailed = true;
                        compileMessage = compiled.message();
                        results.add(caseResult("Error", compiled.message()));
                        continue;
                    }
                }

                JavaToolchain.RunResult run = JavaToolchain.run(dir, compiled.mainClass(), input, timeoutMs);
                if (run.spawnError() != null) {
                    compileFailed = true; // stage "toolchain" in handler.mjs
                    if (compileMessage.isEmpty()) compileMessage = run.spawnError();
                    results.add(caseResult("Error", run.spawnError()));
                    continue;
                }
                if (run.timedOut()) {
                    runtimeBroken = true;
                    if (compileMessage.isEmpty()) compileMessage = "Execution timed out.";
                    results.add(caseResult("Error", "Execution timed out."));
                    continue;
                }

                boolean passed = JavaToolchain.normalizeOutput(run.stdout())
                        .equals(JavaToolchain.normalizeOutput(expected));
                results.add(caseResult(passed ? "Success" : "Failed", run.stdout()));
            }
        } finally {
            cleanup(dir);
        }

        boolean anyError = results.stream().anyMatch(r -> "Error".equals(r.get("status")));
        boolean allPass = results.stream().allMatch(r -> "Success".equals(r.get("status")));
        int passedCount = (int) results.stream().filter(r -> "Success".equals(r.get("status"))).count();

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("compileMessage", anyError ? "Error" : allPass ? "Success" : "Failed");
        out.put("compileMessageDetail", compileMessage); // compiler/toolchain stderr when something failed
        out.put("results", results);
        out.put("passedCount", passedCount);
        out.put("total", testcases.size());
        // desktop-route compatible aliases (testcase1status … output3 …)
        for (int i = 0; i < 3; i++) {
            Map<String, Object> r = i < results.size() ? results.get(i) : null;
            String status = r == null ? "" : String.valueOf(r.get("status")).toLowerCase();
            Object output = r == null ? "" : r.get("output");
            out.put("testcase" + (i + 1) + "status", status);
            out.put("output" + (i + 1), output == null ? "" : output);
        }
        return out;
    }

    private static Map<String, Object> caseResult(String status, String output) {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("status", status);
        out.put("output", output == null ? "" : output);
        return out;
    }

    /* ─────────────────────────── request parsing ────────────────────────── */

    /** Mirror of the testcases normalizer ({input|input1, expectedOutput|output}). */
    private static List<Map<String, String>> normalizeTestcases(Object raw) {
        if (!(raw instanceof List<?> list)) return new ArrayList<>();
        List<Map<String, String>> out = new ArrayList<>();
        for (Object item : list) {
            if (!(item instanceof Map<?, ?> tc)) {
                out.add(Map.of("input", "", "expectedOutput", ""));
                continue;
            }
            String input = str(firstNonNull(tc.get("input"), tc.get("input1")));
            String expectedOutput = str(firstNonNull(tc.get("expectedOutput"), tc.get("output")));
            out.add(Map.of("input", input, "expectedOutput", expectedOutput));
        }
        return out;
    }

    /** Mirror of checkKeywords() in handler.mjs. */
    private static String checkKeywords(String code, Map<String, Object> checks) {
        if (checks == null) return null;
        List<String> blacklist = csv(checks.get("blacklist"));
        List<String> whitelist = csv(checks.get("whitelist"));
        if (blacklist.stream().anyMatch(code::contains)) {
            return "Blacklist keyword(s) found in the code!";
        }
        if (whitelist.stream().anyMatch(keyword -> !code.contains(keyword))) {
            return "Whitelist keyword(s) missing from the code!";
        }
        return null;
    }

    private static List<String> csv(Object raw) {
        return raw == null ? List.of() : List.of(String.valueOf(raw).split(","))
                .stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

    /* ───────────────────────────── small utils ──────────────────────────── */

    private static Path workDir() {
        try {
            return Files.createTempDirectory("atomlambda-");
        } catch (IOException err) {
            throw new IllegalStateException("cannot create work dir: " + err.getMessage(), err);
        }
    }

    private static void cleanup(Path dir) {
        if (dir == null) return;
        try (var paths = Files.walk(dir)) {
            paths.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        } catch (IOException ignored) {
            /* best effort */
        }
    }

    private static Object firstNonNull(Object a, Object b) {
        return a != null ? a : b;
    }

    private static String str(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    private static Long longOrNull(Object value) {
        return value instanceof Number number ? number.longValue() : null;
    }
}
