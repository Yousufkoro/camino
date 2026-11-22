# Camino — LinkedIn project kit

## Project entry

**Project name:** Camino — College & Career Planning

**Project URL:** https://camino-your-direction.yourdirection.workers.dev/

**Source:** https://github.com/Yousufkoro/camino

**Role:** Creator & Developer

**Description to paste:**

Built and deployed Camino, a Washington-first college and career planning web app. Developed an interactive 3D discovery experience, local transcript parsing and OCR, and prerequisite-aware course planning with school alternatives and downloadable plans. Integrated consent-based AI writing feedback with structured outputs, quote matching and safeguards for uncertain results. Implemented responsive layouts, automated regression tests and GitHub-to-Cloudflare deployment. The live app includes a sample plan visitors can explore without uploading documents.

**Suggested skills:** JavaScript · Three.js · Cloudflare Workers · API Integration · Automated Testing

Use your actual project start month and year. Do not invent user counts, impact metrics or time savings.

## Cover image

Download: https://camino-your-direction.yourdirection.workers.dev/social-card.png

The 1200 × 630 image is also the site's social-share card. Editable vector source: `dist/social-card.svg`.

## Short demo sequence

1. Open the homepage and explain the problem: students must connect interests, coursework and next steps across separate systems.
2. Choose **Try a Sample Plan** to demonstrate the application without private records.
3. Show the animated discovery quiz and searchable directions.
4. Show a synthetic transcript import, inspect the source institutions/credits, and confirm courses before planning.
5. Show next/previous quarters, school alternatives and a plan image export.
6. Show the separate writing review, distinguishing quoted evidence, prompt checks and optional refinement. Explain that AI feedback supports revision and is not an admissions prediction.

Use synthetic data for screenshots or recordings. Show the actual live behavior rather than implying every degree path is fully modeled.

## Engineering points to explain in an interview

- Why transcript extraction and OCR run locally, followed by human confirmation.
- How prerequisites and workload limits affect scheduling, and when exact versus heuristic scheduling is used.
- Why a quote match does not prove semantic correctness in an AI review.
- How structured outputs, requirement checks, uncertainty labels, cancellation and stale-result protection make model feedback more inspectable.
- How GitHub checks and Cloudflare builds support repeatable deployment.

## Accurate scope

This is a live student planning project with selected structured pathways, not a certified degree-audit service or a validated personal admissions predictor. Writing feedback can be wrong and needs human review. Third-party libraries and Workers AI models are integrated, not trained or authored from scratch.

## Additional screenshots

- [Desktop homepage](screenshots/home-desktop.png)
- [Mobile homepage](screenshots/home-mobile.png)
