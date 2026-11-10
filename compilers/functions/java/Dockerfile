# AtomCode — Java compiler function (javac + OpenJDK JVM)
# Corretto 21's javac supports --release 8/11/17/21, covering the app's
# java-8/java-11/java-17 (+21) version profiles.
FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y java-21-amazon-corretto && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/java.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
