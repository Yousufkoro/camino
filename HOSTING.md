# Publish Camino on workers.dev

This bundle runs independently on workers.dev. No ChatGPT login, R2 bucket or database is needed. Courses and goals save in the browser. The default configuration also binds Cloudflare Workers AI for optional, consent-based writing reviews. Original files are processed locally; selected text/coursework is sent only when the student requests an AI review.

1. Install the current **Node.js LTS** release from https://nodejs.org/ if you do not already have it.
2. Unzip the downloaded Camino ZIP and open a terminal in the extracted `camino` folder. You should see `wrangler.jsonc`, `worker`, and `dist`.
3. Sign in to your Cloudflare account:

   ```sh
   npx wrangler@4 login
   ```

   Approve the sign-in in your browser. Run this on your own computer so the login callback works.
4. Deploy:

   ```sh
   npx wrangler@4 deploy
   ```

   If asked to select an account, select yours. If this is your first Worker, follow the prompt to choose a workers.dev subdomain. If Cloudflare requires you to set it in the dashboard, open Workers & Pages → account settings and set your workers.dev subdomain, then rerun deploy.
5. Open the URL printed by Wrangler, normally `https://camino-your-direction.YOUR-SUBDOMAIN.workers.dev`.

You can change `name` in `wrangler.jsonc` before deployment to choose a different Worker name. Rerunning deploy updates that Worker. If a Worker with that name already exists in your account, change the name first unless you intend to replace it.

## Bring over your current plan

On the original Camino site, open **Privacy & your data → Export my data**. On your new workers.dev site, open **My account → Restore a Camino workspace backup** and select the JSON export. Confirm replacement. The two websites have separate browser storage; data does not move automatically.

Use **Export workspace** to keep a backup. Browser-local saving does not sync between devices and is removed if you clear site data. Original transcript files are processed locally and are not in the backup.

## Future updates

Replace the source files with a newer bundle and rerun `npx wrangler@4 deploy` from its folder. The standalone entry point is `worker/standalone.mjs`. The `dist` folder contains the complete frontend, generated artwork, and local PDF/OCR libraries. Do not run `scripts/build-worker.py` for this standalone deployment: that separate build is for Sites account hosting.

## Update your existing public Worker

Back up your current workspace first. Extract this new release into a fresh folder and keep your existing `name` in `wrangler.jsonc` (`camino-your-direction` unless you renamed it). Use the same Cloudflare account (`playsleuth` in the existing address). From the extracted `camino` folder:

```sh
npx wrangler@4 login
npx wrangler@4 deploy --dry-run
npx wrangler@4 deploy
```

The last command publishes publicly. This release has not run it against your workers.dev site. The URL remains the same when the Worker name and account are unchanged. Browser storage on that same origin is retained; export a backup first regardless.

Review AUDIT.md and TESTING.md before publishing. Accounts/cloud sync, automatic notifications and institutional rules beyond the stated coverage are not configured. Do not deploy `worker/index.mjs` to workers.dev: its trusted identity assumption is specific to Sites dispatch. The configured public entry is `worker/standalone.mjs`.

## Unpublished UX redesign (0.3)

This bundle includes the simplified Discover → Choose → Plan experience. It has not been deployed to either hosted site. Start with UX-REDESIGN.md for changes and remaining verification limits. Your existing production download link still points to the earlier release until deployment is approved.

For local code checks, install development dependencies with `npm install`, then run `npm run check`, `npm test`, `npm run test:dom` and `npm run build`. `npm run build` only versions frontend assets. `npx wrangler@4 deploy --dry-run` checks the Worker without publishing it. Only `npx wrangler@4 deploy` publishes; run it when you decide to go live.

## Updating an existing Worker with this release

Extract the new ZIP to a new folder, then open a terminal inside its `camino` directory. Keep the same Worker `name` in `wrangler.jsonc` to update your existing URL. Run `npx wrangler@4 login` if needed, then `npx wrangler@4 deploy`. The download itself does not update your live site. Export your current workspace first as a backup. See MULTI-DEGREE.md for implemented features and incomplete catalog/admissions coverage.

## 0.5 full-feature deployment on Ubuntu

1. Download and extract the ZIP. Open a terminal inside the extracted `camino` directory.
2. Keep your existing Worker name in `wrangler.jsonc` if you want the same URL.
3. Run `npx wrangler@4 login` if you are not already signed in.
4. Run `npx wrangler@4 deploy`. The config binds `AI`, `AI_RATE_LIMITER` and `SOURCE_RATE_LIMITER`; no API key belongs in frontend code.
5. Open the URL printed by Wrangler, try the quiz, then open Applications → detailed AI review and test with a non-sensitive example. Cloudflare account access/quotas determine model availability; review Cloudflare's applicable terms and usage limits. Native limits are per IP/location, not a global spending cap.

For local writing checks and live college sources without model processing, deploy with `npx wrangler@4 deploy --config wrangler.local.jsonc`. This uses the same Worker name, so choose the intended config each time you update. `wrangler.ai.jsonc` is an explicit copy of the full configuration. Nothing deploys merely by downloading the bundle.

See RELEASE-0.5.md for data coverage, source conflicts, privacy behavior and remaining institutional verification.

## 0.6 changes and remaining work

See RELEASE-0.6.md and CHECKLIST.md. This release adds the first-person road quiz, full reviewed UW undergraduate catalog source records, and the broader sourced deadline finder. Deployment steps and Worker names remain the same. Downloading the bundle does not update production.
