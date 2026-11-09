# Automatic updates to the existing Camino workers.dev site

Repository access and Cloudflare access are separate. Connecting Codex/GitHub lets the agent edit source; Cloudflare must be connected to the intended repository once before pushes can deploy.

## Recommended: Cloudflare Workers Builds

1. Put this portable Camino source at the GitHub repository root. Do not upload private student workspaces, `.env` files, credentials, `.git`, `.openai`, `dist/server`, development caches or `node_modules`. Keep `dist`, `worker`, `scripts`, `tests`, `package.json`, `package-lock.json`, and `wrangler.jsonc`.
2. In Cloudflare, open **Workers & Pages → camino-your-direction** (the existing Worker).
3. Find its Git/Builds settings and connect GitHub. Select the Camino repository and production branch `main`. Cloudflare UI labels may vary; use the existing Worker rather than creating a second site if you want to keep the URL.
4. Set repository root as the root directory (or the Camino subfolder if the repo contains several projects).
5. Build command: `npm ci && npm run validate`
6. Deploy command: `npx --yes wrangler@4.159.0 deploy`
7. Keep the Worker name in `wrangler.jsonc` equal to your existing Worker name. Allow Cloudflare's build integration to authenticate the deployment; no secret belongs in source or the browser.
8. Confirm the first build/deployment succeeds, then open your existing workers.dev URL. Review AI account/model access and quotas separately; CI tests use synthetic records and model fixtures.

After the one-time connection:

**Edit/test → commit/push to main → Cloudflare builds/tests → deploy → existing URL updates.**

The agent can prepare and push changes only while this chat has repository write access and an active task. It does not keep editing indefinitely after a chat ends. Cloudflare deployment can continue after a push even if the laptop is closed.

## Checks before production

`.github/workflows/checks.yml` runs the same validation on pull requests and main pushes, without deployment credentials. For production-branch protection, require `Camino checks / validate` before merging pull requests. Cloudflare also runs `npm run validate`, so a failing check fails the build before the deploy command.

Choose one deployment owner. Do not enable a second GitHub Actions deployment workflow on top of Cloudflare Workers Builds; otherwise each push may deploy twice.

## Current connection status

This file documents the prepared setup, not proof that a remote repository or Cloudflare build is connected. Completion requires the actual repository URL, verified write access, and a successful Cloudflare build/deployment. The current task must verify those results before reporting automatic deployment as active.
