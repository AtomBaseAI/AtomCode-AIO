# AtomCode — Python function (CPython 3.12 from Amazon Linux 2023 repos)
FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y python3.12 && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/python.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
