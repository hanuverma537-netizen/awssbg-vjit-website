# Contributing

Short version. See the [README](./README.md) for full details.

## Branches

- Features: `feat/<owner>-<short>` (e.g. `feat/mohiuddin-events`)
- Fixes: `fix/<owner>-<short>`
- Never commit directly to `main`. Open a PR.

## Commits

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
Do not add `Co-authored-by` lines from AI tooling.

## Before you push

Run all three and make sure they pass:

```
pnpm typecheck
pnpm lint
pnpm build
```

## Hard rules

- No em dashes anywhere (code, copy, comments, commit messages).
- No fake numbers or placeholder stats. If real data does not exist, show
  qualitative copy or an empty state.
- No `console.log`. Use the logger in `src/lib/utils/logger.ts`.
- All Firestore access goes through the typed helpers in `src/lib/firestore/`.
- Admin routes are protected server-side. Client gating is never enough.

## Reviews

Every PR needs one approval and green CI before merge.
