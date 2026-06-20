# tachyon-examples

Real, runnable demo workspaces for [**Tachyon**](https://github.com/cfpperche/tachyon) —
multi-agent terminal orchestration in VS Code. Clone it, open it, and drive a fleet of AI
agents as native editor terminals coordinated through the MCP Bridge.

It's an npm-workspaces monorepo of two tiny services with **real `vitest` tests and lint**, so
the agents have genuine work — `npm test` actually tests, `verify:` actually verifies.

- **`orbit-api/`** — a tiny Express API (routes, tests) — the main service the agents work on.
- **`orbit-worker/`** — a companion telemetry worker — the second folder for the multi-root demo.

```bash
git clone https://github.com/cfpperche/tachyon-examples ~/tachyon-examples
cd ~/tachyon-examples && npm install        # installs both workspaces
```

## Two ways to open it — two capabilities

### 1. Single workspace + the worktree loop
Open the **repo root** (`code ~/tachyon-examples`) → uses the root [`tachyon.yml`](tachyon.yml).
Because the repo root *is* a git repo, the **`feature` agent** (`worktree: true`, `verify: test`)
runs on **its own git branch** (the ⎇ badge); **Verify** runs the monorepo's `npm test` *in the
worktree* (the ✓/✗/⊘ badge). Review its diff in the editor, then merge with plain git —
**isolate → review → verify.**

### 2. Multi-root (two folders, two Bridges)
Open [`orbit.code-workspace`](orbit.code-workspace) → `orbit-api` **and** `orbit-worker` as two
folders, each with its own `tachyon.yml`, its own MCP Bridge, and its own tmux namespace —
Tachyon keeps them isolated. This is the **multi-workspace** capability.

## What the configs show

| Where | Capability |
|---|---|
| root `tachyon.yml` → `feature` (`worktree`+`verify`) | the worktree loop — isolate → review → verify, real git branch + real `npm test` gate |
| root `tachyon.yml` → `researcher` (`harness`) | isolated harness — its own Tavily web-search MCP, scoped to that agent (the ⚙ badge); no other agent sees it (Tachyon ≥ 0.22, claude-only) |
| root / per-folder `agents` | AI CLIs (claude orchestrates, codex reviews) over the Bridge |
| `terminals:` | non-AI processes (dev server restarts on `src/**`; a scratch shell) |
| `commands` + `runbooks.ship` | curated one-shots + a sequential, exit-code-gated procedure |
| `schedules.hourly-tests` | runtime-neutral cron over the suite |
| `orbit.code-workspace` | multi-root: two services, two Bridges |

Scripts (root): `npm test` · `npm run lint` · `npm run dev` (all fan out via npm workspaces).

## Dogfood the Activity view

The **Activity view** is the normalized, runtime-agnostic cockpit (a chat — your prompts on the
right, the agent on the left) you get by clicking the **◆ pulse** action on an agent row. The raw
terminal stays one click away (**Open terminal**); **Open transcript** opens the JSONL the runtime
records the session into.

**Drive it (EDH):** open the repo root, let the `claude` agent autostart, then paste this prompt —
it exercises every Activity surface in one turn:

```
Add a GET /health route to orbit-api (src/routes) returning {status:"ok",uptime:process.uptime()},
add a vitest test for it in orbit-api/test, then run `npm test` from the repo root.
```

Click **◆ Activity** on the `claude` agent and confirm:

- **Chat sides** — your prompt as a right bubble, the agent's replies as left bubbles, **markdown
  rendered** (bold, lists, clickable links — not raw `**...**`).
- **💭 Thinking** — a collapsed reasoning toggle on the agent side; expand it.
- **Tool chips** — one per tool with its args (`Read src/routes`, `Bash npm test`, …); a file op is
  **clickable** (opens the file); a running tool spins.
- **Diffs & results** — the `Write`/`Edit` chip shows `+N −M` and a chevron that expands the **diff**;
  `Bash` shows the test result. A failed tool turns red with the error.
- **Live** — the feed sticks to the newest message; scroll up and a **↓ Latest** button appears.
- **Images** — paste a screenshot into the prompt; it renders as an image bubble.

**Headless (no EDH):** render any transcript's Activity feed as text from the Tachyon repo —

```bash
npm run activity:preview -- ~/.claude/projects/<enc-cwd>/<session>.jsonl
```

(Drives the same pure normalizer + view-model the webview uses — handy for spotting transcript
shapes the cockpit drops to `raw`.)
