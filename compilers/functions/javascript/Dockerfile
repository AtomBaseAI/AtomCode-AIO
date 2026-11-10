# AtomCode — JavaScript function (Node.js — the base runtime itself)
FROM public.ecr.aws/lambda/nodejs:20

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/javascript.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
