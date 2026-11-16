# Setup

## Prerequisites
- Node.js 20 or newer, npm, git
- Codex CLI signed in with your plan
- A Google account with access to https://stitch.withgoogle.com

## 1. Create the project
```bash
npx create-next-app@latest storefront --typescript --tailwind --biome --app --src-dir --import-alias "@/*"
cd storefront
npx shadcn@latest init
```
Then copy the kit into the project root (keep the folder structure): `AGENTS.md`, `.agents/`, `.codex/`, `docs/`.
If `create-next-app` already generated an `AGENTS.md`, merge the two files instead of overwriting blindly.

## 2. Environment
Create `.env.local` (git-ignored):
```env
NEXT_PUBLIC_BASE_URLL=https://ecommerce.routemisr.com/api/v1
```
Make sure `.gitignore` contains `.env*`.

## 3. Connect Stitch
1. Open https://stitch.withgoogle.com/settings, create an API key.
2. Put it in your shell profile (never in the repo):
   ```bash
   echo 'export STITCH_API_KEY="your-key"' >> ~/.bashrc && source ~/.bashrc
   ```
3. `.codex/config.toml` already points at `https://stitch.googleapis.com/mcp` and reads the key from `STITCH_API_KEY`. If Codex does not pick up a project-level config, copy the same block to `~/.codex/config.toml`.
4. Alternative with a guided wizard: `npx @_davideast/stitch-mcp init` (community tool). Official docs: https://stitch.withgoogle.com/docs/mcp/setup
5. Google also publishes open "stitch-skills". Optional: `npx skills add google-labs-code/stitch-skills --list` to see them.

## 4. Connect shadcn
```bash
npx shadcn@latest mcp init --client codex
```
or add manually to the Codex config (already present in `.codex/config.toml`):
```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```
Restart Codex afterwards.

## 5. Check everything
```bash
codex mcp list        # stitch and shadcn should appear
```
Inside a Codex session run `/mcp` and confirm both servers list their tools. Ask Codex: `Which skills do you see?` You should get route-ecommerce-api, nextjs-feature-workflow and stitch-to-shadcn.

## 6. Start
Run `codex` in the project root, then send:
`Read AGENTS.md and docs/PROJECT_STRUCTURE.md, then do Phase 0 only.`

## Troubleshooting
| Problem | Fix |
| --- | --- |
| Stitch returns 401 or "unauthenticated" | Create a new key at stitch.withgoogle.com/settings; confirm `test -n "$STITCH_API_KEY"` succeeds in the same terminal that starts Codex |
| Stitch tools missing | Make sure your account has Stitch access; restart Codex; run `codex mcp list` |
| Skills not showing | The folder name must equal the `name:` in `SKILL.md`; skills live in `.agents/skills/`; restart Codex |
| shadcn MCP fails to start | Check `npx --version` works; if Codex cannot find `npx`, use its full path in `command` |
| Agent invents API paths | Tell it to follow the verify-first workflow in the `route-ecommerce-api` skill and to ask you for the official docs |

## Notes
- These tools change quickly. If a command fails, check the official docs for Codex, Stitch and shadcn before assuming the kit is wrong.
- Keep your Stitch key out of screenshots, chat and commits. If it leaks, delete it in Stitch settings and create a new one.

## Existing workspace
This project already uses `src/app`, `src/components`, and `src/lib`. Keep that layout; the route tree in PROJECT_STRUCTURE.md is relative to `src/`. shadcn is initialized in `components.json`. Phase 0 does not add storefront features.

## Phase 0 verification (2026-10-28)
- Existing Next.js 16.4.2 / TypeScript / Tailwind app and shadcn initialization retained; no dependencies added.
- Starter page returned successfully from the dev server on port 3000.
- `npm run lint` and `npx tsc --noEmit` pass after formatting and refreshing stale generated dev route types.
- `codex mcp list` lists Stitch and shadcn as enabled. Tool connectivity is not verified; `STITCH_API_KEY` is absent from the current environment.
- `.env.local` is ignored by Git. Use the server-only `NEXT_PUBLIC_BASE_URLL` name for future API work.
- Production build is blocked in this execution environment: Turbopack CSS worker reports `binding to a port: Operation not permitted`, including on the approved retry. Run `npm run build` in a normal terminal.
- No GitHub remote is configured and GitHub CLI is unavailable. Supply the destination repository before publishing.
- Rotate the Stitch key previously stored in the project config; config now references the environment variable name only.
- Browser visual checks at 375px, 768px, and 1280px remain manual. Phase 0 is incomplete until the build and GitHub checks pass. Phase 1 has not started.
