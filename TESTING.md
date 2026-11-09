# Validation record

Run from the source checkout:

```sh
npm install
npm run check
npm test
npm run test:dom
npm run build
npx wrangler@4 deploy --dry-run
```

No lint or TypeScript configuration existed. No lint/typecheck pass is claimed.

Tests executed during this implementation:

- `node scripts/check.cjs`: authored JavaScript syntax (frontend, Workers, scripts, tests).
- `node scripts/test.cjs`: transcript parsing/reconciliation and safeguards; original OCR pooling/performance mocks; plan view rendering; consecutive physics/CS and independent school overrides; new quiz/questions/ranking, date labels, plan validators and scenario deltas; shared workspace schema; document signatures/size bounds; account API isolation/CSRF/concurrency/deletion; standalone headers/methods/error handling.
- `node scripts/dom-test.cjs`: jsdom journey through homepage/nav/How It Works, 12/32-question quiz/back/session resume/completion, distinct three results, saved results, directory comparison, preview without mutating records, profile→roadmap, valid and invalid manual moves, original record preservation during scenarios, milestones, corrected-import confirmation gate, keyboard quiz input, privacy/source views, failed-account-save recovery after reload and interrupted bootstrap. jsdom installed as a development-only dependency.
- `python3 scripts/build-worker.py`: private Sites embedded-asset build, separate from standalone deployment.
- Wrangler `deploy --dry-run`: compiled standalone Worker and enumerated static assets without publishing.

The account API tests use a deterministic in-memory R2 replacement, not production R2. OCR tests mock recognition/runtime interfaces and parser fixtures are synthetic. Native PDF/image processing under the new CSP is not proven by these tests.

Not executed: real browser/screenshot/mobile layout tests, actual signup/login/logout or Cloudflare account integration, live transcript OCR against user documents, screen-reader/conformance audit or actual reminder delivery. There is no standalone signup provider or background notification service to test. No real student transcript or PII fixture was committed.

The 0.3 redesign adds tests/journey-dom.test.cjs for four student stages, simplified navigation, one next action, branch interactions, preserved records and motion guards. Real rendered desktop/mobile usability remains unverified.

## 0.4 connected-goal and application checks

Run `npm test` and `npm run test:dom`. New synthetic tests cover exact shared-course allocation, policies, credit buckets, prerequisites/co-requisites, mixed credit systems, official Informatics availability, backup/primary checkpoints, GPA failures/exclusions/grade scenarios, sourced reminders on My Plan, and local-only essay save/delete. See MULTI-DEGREE.md for accuracy and visual-verification limits.

## 0.5 additional checks

Run the standard syntax/unit/DOM commands. The academic-service suite uses model fixtures, not paid live inference, and verifies source allowlists/redirects, consent/CSRF/rate limits, evidence checks and outcome-claim rejection. The immersive/research DOM suite covers chapters/back/focus, Informatics templates and capstone order, derived dates, explicit AI consent, DTA template scope and canvas-export bounds with wrapped text. Associate tests cover two-discipline/lab constraints and no distribution double counting. A real official-source fetch was verified separately. See RELEASE-0.5.md for the managed-browser limitation.

## 0.6 priority checks

New road-quiz DOM tests verify fork hit targets, lantern cursor/hotspot, keyboard/reduced motion, standard-cursor persistence and navigation cancellation. UW catalog tests verify all active entries have source records, counts, closed-option exclusions, exact requirements viewer and primary plan updates. Deadline tests distinguish annual derived reminders from fixed-year events and applicant routes. Real browser/mobile and live account AI checks remain unverified.
