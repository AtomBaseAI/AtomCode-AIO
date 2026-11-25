# DSA Using C — Builders

Data files under `../data/` are the canonical seed source. The scripts here
regenerate or re-verify them:

- (none)

Flow: staging export (`/home/z/tmp/dsa-export/dsa-c/day-NN.code.json`)
→ builder → `../data/day-NN.code.json` → verify with
`node /home/z/tmp/jv-c.mjs ../data/day-NN.code.json`
(or the repo-wide `scripts/preflight-dsa.mjs dsa-c`).
