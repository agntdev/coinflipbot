## CoinFlipBot — refined brief

Summary
- Small, stateless Telegram bot that flips coins. Implemented in TypeScript using grammY. No database, storage, auth, or payments.
- Commands: /start, /help, /flip, /flip3. Replies must be short.

Audience
- Telegram users who want a quick coin flip (private chats and groups).

Core entities
- Command: one of start, help, flip, flip3.
- Result: coin face string "Heads" or "Tails" (for /flip3 a comma-separated list).
- Telegram user & chat (used only transiently via update context; not persisted).

Integrations & notification targets
- Telegram Bot API only, via grammY.
- Bot token provided through environment variable TELEGRAM_BOT_TOKEN.

Interaction flows
- /start
  - Bot replies with a short welcome and one-line command list. Example reply: "Welcome! Commands: /flip /flip3 /help".
- /help
  - Bot replies with a short list of available commands and one-line descriptions.
- /flip
  - Bot replies exactly either "Heads" or "Tails" (single word, capitalized).
- /flip3
  - Bot replies with three results joined by comma+space, e.g. "Heads, Tails, Heads".
- All replies are plain text, short, no extra formatting or emojis.
- Bot is stateless: each command is handled independently using only the incoming update.

Persistence
- NONE. No database, files, or other storage. All state ephemeral per request.

Payments
- NONE.

Non-goals
- No user accounts, no authentication, no payments, no logging to external services, no persistent analytics.

Dev stack & project structure
- TypeScript + grammY. Use Node.js v18+.
- Randomness: Node's crypto.randomInt for unbiased RNG.

Suggested repository layout (concrete):

- package.json (scripts: build, start, dev)
- tsconfig.json
- src/
  - index.ts        // bootstraps bot, sets up polling, registers commands
  - bot.ts          // optional helper creating grammY Bot instance
  - handlers/
    - start.ts      // default export: async function startHandler(ctx)
    - help.ts       // default export: async function helpHandler(ctx)
    - flip.ts       // default export: async function flipHandler(ctx)
    - flip3.ts      // default export: async function flip3Handler(ctx)

Handler contract (concrete)
- Each handler exports a default async function with signature: (ctx: Context) => Promise<void>
- index.ts imports handlers and registers like: bot.command('flip', flipHandler)

Implementation details & code notes
- Use grammY Bot constructor: new Bot(process.env.TELEGRAM_BOT_TOKEN)
- Use polling (bot.start()) for update retrieval by default.
- RNG: import { randomInt } from 'crypto'; coin = randomInt(0, 2) === 0 ? 'Heads' : 'Tails'
- /flip3: produce an array of three coin results and join with ", ".
- Keep all replies short and plain text. In case of internal error reply a short message: "Error".
- Logging: console.debug/info for startup and errors only.

Scripts & build
- package.json scripts (recommended):
  - "build": "tsc"
  - "start": "node dist/index.js"
  - "dev": "ts-node-dev --respawn src/index.ts"
- tsconfig: target ES2021, module commonjs, outDir dist, strict true.

Testing
- Manual testing by running locally with TELEGRAM_BOT_TOKEN set and invoking commands in Telegram.

## Assumptions & defaults
- Polling for updates (bot.start()) as default transport — simpler for initial build and local runs.
  Rationale: polling is easiest to run without server/webhook setup.
- Environment variable TELEGRAM_BOT_TOKEN used for the bot token — standard practice.
  Rationale: keeps secrets out of source code and works for local/CI deploys.
- Randomness via Node's crypto.randomInt — unbiased, secure RNG.
  Rationale: avoids biased Math.random() and is available in Node v18+.
- Reply language: English and plain text, no emojis — matches owner examples and "short" requirement.
  Rationale: owner used English examples; keep replies concise.
- Handlers exported as default async functions in src/handlers/ — each file handles one command.
  Rationale: matches owner request for per-command modules and is easy to import/register.
- Error responses are a single short word "Error" to keep replies short.
  Rationale: requirement to keep replies short and not expose internal details.

