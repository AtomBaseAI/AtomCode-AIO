# AtomCode — SQL function (SQLite via sql.js — pure WASM, no native build)
# Fresh in-memory database per run; output grid rendering is byte-identical
# to the app's sqlite.worker.ts (columns " | ", "---" separator, NULL).
FROM public.ecr.aws/lambda/nodejs:20

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/sql.json ${LAMBDA_TASK_ROOT}/langspec.json
RUN cd ${LAMBDA_TASK_ROOT} && npm install --silent --no-package-lock sql.js@1.13.0

CMD ["handler.handler"]
