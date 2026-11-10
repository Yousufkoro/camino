# Camino 0.11.0

Production: https://camino-your-direction.yourdirection.workers.dev/

Pathfinder ranks all 953 loaded catalog entries. Results consider the current answers, offer three different major families, and allow an exact catalog choice. Comparison menus and search use the full catalog, preserving campus and credential. Recommendations are exploratory title-based heuristics, not a validated aptitude assessment. Catalog coverage does not mean every program has a fully verified course plan.

The admission panel matches public historical cohorts by campus, entry route, residency and transfer origin where published. UW Seattle first-year, transfer, direct-engineering and CS/CE entry cohorts and UW Bothell campus cohorts are distinguished. Count-based estimates use Jeffreys smoothing and observed-cohort Wilson intervals. Rounded published rates have no invented denominator. The optional odds scenarios are explicitly illustrative. GPA/essay scores are not assigned invented probability coefficients. Missing major data remains unmatched; users can enter a published cohort labelled unverified. This is not a calibrated personal admission predictor.

Official source pages checked November 9, 2026 (Pacific): UW first-year by-the-numbers, transfer by-the-numbers and Allen School transfer admissions; the evidence register preserves source/cycle/population labels. Admitted and enrolled GPA populations are distinguished.

The homepage adds an original draggable 3D library and staircase miniature using locally served Three.js. Existing keyboard/touch theme controls remain. Reduced-motion preferences, offscreen pause and a non-WebGL fallback are supported. No reference-site assets are used.

The workers.dev namespace is now yourdirection. GitHub main remains linked to Workers Builds. Browser-local saved data belongs to its origin; export/import is needed to move an old-origin workspace.

Validation: full `npm run validate` passed (auth, transcript fixtures, planning, reviewer, DOM routes, catalog and estimation tests). Chromium with software WebGL rendered the new scene on desktop and a 390px viewport; search, 953-entry comparison selectors, a matched 70% transfer cohort, navigation disposal, zero page errors and horizontal-overflow checks passed. Physical mobile GPU performance has not been measured.
