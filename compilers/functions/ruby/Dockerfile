# AtomCode — Ruby function (CRuby from Amazon Linux 2023 repos)
# AL2023 ships Ruby 3.2 — close to the app's Ruby 3.4 wasm profile; the
# langspec keeps the ruby-3.4 profile id so the app's dropdown keeps working.
FROM public.ecr.aws/lambda/nodejs:20

RUN (dnf install -y ruby3.2 || dnf install -y ruby) && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/ruby.json ${LAMBDA_TASK_ROOT}/langspec.json

CMD ["handler.handler"]
