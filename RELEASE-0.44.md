# 0.44 — Preserve focus through school changes

Changing a planned course's school redrew the plan, closed its course details and left focus on BODY. Keyboard and assistive-technology users lost their place. Capture the course control context before redrawing, find the replacement control, reopen its enclosing details and restore focus/visibility. Prefer the same control location; if the course moved out of that view, use its remaining full-plan control. Independent school settings and scheduling constraints remain unchanged.

Verification: DOM regression for actual replacement control/focus/open details/persisted provider settings; desktop/mobile/narrow viewport school changes, continued sequence placement, PNG download, cancel/confirm complete-data deletion and reload persistence. Existing full regression checks remain. These are automated Chromium viewport checks, not physical-device or Safari certification. Reviewer quota/Beta gates remain unresolved; broad audits remain paused under the five-feature scope.

The320px expanded-plan check also exposed a long source-check link overflowing the viewport by31px. Bound the degree-summary button to its container and allow its text to wrap at narrow widths; retain a full touch target and the existing action. The same four-width flow is rerun with the layout fix.
