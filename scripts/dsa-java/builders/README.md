# DSA Using Java — Builders

Data files under `../data/` are the canonical seed source. The scripts here
regenerate or re-verify them:

- (none)

Flow: staging export (`/home/z/tmp/dsa-export/dsa-java/day-NN.code.json`)
→ builder → `../data/day-NN.code.json` → verify with
`node /home/z/tmp/jv-java.mjs ../data/day-NN.code.json`
(or the repo-wide `scripts/preflight-dsa.mjs dsa-java`).
