# Contributing (Team Voltix — internal)

## Branches
```
main              -> always demo-ready, protected, requires 1 approval
  backend-dev     -> Backend Lead's integration branch
  flutter-dev     -> Flutter Lead's integration branch
    feature/journal
    feature/goals
    feature/games
  feature/ml-pipeline
  feature/dashboard
```

## Rules
1. Never push directly to `main`. Open a PR, get 1 approval (from the
   relevant layer lead), then merge.
2. Feature branches (`feature/journal`, etc.) merge into their layer's
   `-dev` branch first. Layer lead merges `-dev` -> `main` once stable.
3. Before writing code that touches the API, check `/docs/api_contract.md`.
   If you need to change a field/endpoint shape, update the doc in the same
   PR and flag it in standup — don't silently change shapes other people are
   building against.
4. Merge small, merge often — at least once a day, not just at the end.
5. Two 10-minute syncs a day: "does your feature still work against current
   `main`?" Catches drift early.
6. Final integration day: freeze the contract, everyone merges into `main`,
   full end-to-end run-through together before the deadline.

## Commit messages
`[layer] short description` — e.g. `[backend] add /journal/text endpoint`,
`[flutter] wire journal screen to API client`.
