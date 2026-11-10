# AtomCode — C compiler function (GCC)
# Build:  docker build -f c/Dockerfile -t atomcode/c .   (context: compilers/functions/)
FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y gcc && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/c.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
