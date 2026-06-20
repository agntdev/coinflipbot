# fix-c3e15c39f6af45f6 — start.ts callbackQuery("help") handler is untested and has no error handling

**Weight:** 0.0000 (share of project budget)
**Reward:** 0 CFB

`src/handlers/start.ts:14-17` registers a `callbackQuery("help")` handler that calls `ctx.answerCallbackQuery()` followed by `ctx.reply(...)` (which happens to duplicate the `/help` command output). However:

1. **No test coverage**: `tests/specs/start.json` tests only the `/start` command reply; there is no test spec that triggers the "Help" button callback, so this code path is untested.
2. **No error handling**: If the callback query has already expired or been acknowledged, `ctx.answerCallbackQuery()` will throw, and the subsequent `ctx.reply()` will not execute (the global error boundary catches the throw but the user never sees the help text). Wrap in try/catch or use `ctx.answerCallbackQuery().catch(() => {})`.

## Dialog tests

This is a FIX task: the behavior it repairs is already covered by an existing spec under `tests/specs/`. Fix the code to make that existing spec pass — do NOT author a new `tests/specs/fix-c3e15c39f6af45f6.json` (a duplicate spec for the same behavior makes the tests-gate count it twice and it can never go green). Add a new spec file ONLY if you are introducing genuinely new user-facing behavior that no existing spec covers; if so, name it `tests/specs/fix-c3e15c39f6af45f6.json` (and any new command `tests/commands/fix-c3e15c39f6af45f6.json`).


## Handler module

This is a FIX task. Find the EXISTING handler under `src/handlers/` that implements the affected command/behavior and EDIT it in place. Do NOT create a new `src/handlers/fix-c3e15c39f6af45f6.ts` — a second `Composer` binding the same command conflicts with the original and breaks the bot. Create a new handler file ONLY if the affected command does not exist anywhere yet (then name it `src/handlers/fix-c3e15c39f6af45f6.ts` and default-export a grammY `Composer`; `buildBot()` auto-loads it). NEVER edit `src/bot.ts`; the global error boundary + unknown-command fallback already live in `buildBot()`.


## Implementation contract

Ship a COMPLETE, working implementation — not a stub. A task is INCOMPLETE (and will be rejected) even if it compiles and the dialog tests pass when it does any of these:
- **Stubbed code:** empty bodies, `TODO`/`FIXME`, commented-out logic, or `throw new Error("not implemented")`.
- **Fabricated data:** `Math.random()`, hardcoded sample arrays, or canned responses standing in for real computed or fetched values.
- **No in-memory data store:** a `Map`/array/module-level variable used as a database is a defect. Anything that must survive a restart (records, subscriptions, balances, schedules, settings) MUST use the toolkit's persistent storage (Redis-backed), not process memory. (The toolkit's auto-selected session storage is only for ephemeral conversation state.)
- **Broken integrations:** call external APIs against their real contract — correct endpoints, ids and params (e.g. a coin *id* like `the-open-network`, not a ticker like `TON`) — with credentials read from env. Do not invent endpoints or fake responses.
- **Dead code:** the feature's command/handler must be registered via its default-exported `Composer` in `src/handlers/<slug>.ts` (auto-loaded) and reachable from the bot's command surface.
If the spec is genuinely under-specified, implement the smallest REAL slice you can verify and note the gap — never fake behavior to make the PR look complete.
