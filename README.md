# AI Git Commit Generator (Next.js + TypeScript)

**What this project does (MVP):**
- Lets a user paste code changes or a description, then uses the OpenAI API to generate a clean Conventional Commit message.
- Optional: code includes a reference implementation for pushing the message to a GitHub repo (requires a personal access token and configuration).

## Quick start (local)
1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.local.example` to `.env.local` and set `OPENAI_API_KEY`.
3. Run dev:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Deploy to Vercel
- Connect your repo to Vercel and set environment variables (`OPENAI_API_KEY`, optional `GITHUB_TOKEN`).

## Files of interest
- `pages/index.tsx` - frontend UI
- `pages/api/generate-commit.ts` - API route that calls OpenAI
- `pages/api/push-commit.ts` - OPTIONAL: example GitHub push (uses Octokit, commented)

## Notes
- This starter uses a simple prompt engineering approach. Tweak the prompt in `generate-commit.ts` for different styles.
- The GitHub push route is intentionally provided as an example. Pushing commits programmatically requires careful handling of repo state, branches, and access tokens.

Good luck! Record a 20-30s demo: paste a diff or brief description → generate commit → (optionally) push to GitHub.