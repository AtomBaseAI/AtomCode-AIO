# AtomCode — TypeScript function (ts.transpileModule → Node, mirrors the
# app's worker: TypeScript 5.9 transpileModule → ES2022, no type-check)
FROM public.ecr.aws/lambda/nodejs:20

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/typescript.json ${LAMBDA_TASK_ROOT}/langspec.json
RUN cd ${LAMBDA_TASK_ROOT} && npm install --silent --no-package-lock typescript@5.9.3

CMD ["handler.handler"]
