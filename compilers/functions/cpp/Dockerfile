# AtomCode — C++ compiler function (GNU g++)
FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y gcc-c++ && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/cpp.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
