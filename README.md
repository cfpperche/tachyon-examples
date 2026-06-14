# tachyon-examples

A real, runnable demo workspace for [**Tachyon**](https://github.com/cfpperche/tachyon) —
multi-agent terminal orchestration in VS Code. Clone it, open it, and drive a fleet of AI
agents as native editor terminals coordinated through the MCP Bridge.

It's a tiny Express API (real routes, real `vitest` tests, real lint) so the agents have
genuine work to run — `npm test` actually tests, `verify:` actually verifies.

> **Why a standalone repo?** Tachyon's worktree isolation forks a *git* worktree per agent,
> so the demo has to be its own git repository (not nested inside another). This repo is that —
> which is what lets the `feature` agent below run on its own branch for real.

## Try it

```bash
git clone https://github.com/cfpperche/tachyon-examples ~/tachyon-examples
cd ~/tachyon-examples && npm install
code .                      # open in VS Code with the Tachyon extension installed
# Cmd/Ctrl-Shift-P → "Tachyon: Start"
```

## What the `tachyon.yml` shows

| Entry | Capability |
|---|---|
| `agents.claude` (autostart) | the orchestrator — drives the fleet via the Bridge MCP tools |
| `agents.codex` | a second model as a reviewer Claude can delegate to |
| **`agents.feature`** (`worktree: true`, `verify: test`) | **the worktree loop** — isolated on its own git branch (⎇), `Verify` runs `npm test` in the worktree (✓/✗/⊘), review the diff, then merge with plain git |
| `terminals.dev` / `terminals.shell` | non-AI processes (the dev server restarts on `src/**` changes) |
| `commands` + `runbooks.ship` | curated one-shots + a sequential, exit-code-gated procedure |
| `schedules.hourly-tests` | a runtime-neutral cron over the suite (human-approved) |

## The app

- `src/server.js` — Express app + server bootstrap
- `src/routes/missions.js` — the routes the agents review/extend
- `test/server.test.js` — `vitest` + `supertest` (this is what `verify: test` runs)

Scripts: `npm run dev` · `npm test` · `npm run lint`.
