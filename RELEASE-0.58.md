# 0.58 — Preserve the plan viewer across preference changes

The0.54 fix preserved the expanded quarter viewer for next/previous steps, but changing pace, summer or motion settings still closed it. A full-app regression reproduced that collapse before this change.

Move same-route quarter-view preservation into the shared render path. Keep the viewer expanded and retain scroll position during redraws; preserve focus for identified preference controls. Existing school-picker focus restoration remains active. A deliberately closed viewer stays closed, and leaving/re-entering the roadmap uses the normal collapsed overview. Quarter exploration now uses this shared behavior instead of its separate preservation implementation.

Regression checks cover motion, summer, pace, provider selection, focus, unchanged coursework, deliberate closed state and route transitions, alongside the existing next/previous/direct-quarter regression. No prerequisite, credit, transcript or reviewer-model rules are changed. Full validation and desktop/mobile browser checks precede and follow deployment.
