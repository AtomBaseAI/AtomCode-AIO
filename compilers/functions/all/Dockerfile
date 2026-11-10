# AtomCode — ALL-IN-ONE function (every language in one Lambda image)
#
# One Function URL for the whole app: the handler dispatches on the
# request's `language` field (c, cpp, java, python, ruby, sql, javascript,
# typescript). Recommended default for AtomCode — a single env var wiring.
FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y gcc gcc-c++ java-21-amazon-corretto python3.12 \
    && (dnf install -y ruby3.2 || dnf install -y ruby) \
    && dnf clean all

COPY _shared/handler.mjs ${LAMBDA_TASK_ROOT}/handler.mjs
COPY _shared/langspec/ ${LAMBDA_TASK_ROOT}/langspec/
RUN cd ${LAMBDA_TASK_ROOT} \
    && npm install --silent --no-package-lock sql.js@1.13.0 typescript@5.9.3

CMD ["handler.handler"]
