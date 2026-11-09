# Camino 0.8 — an eye-level forest, visible writing review and state salaries

## Requested UI updates

- Replaced constant-width, overhead road strokes with tapered ground-plane paths, near/far faceted trees, atmospheric depth, a held lantern and gentle pointer parallax. Walking forward and turning confirms the selected fork.
- All four signs now share a coordinate frame with their road anchor. The SVG no longer crops independently of HTML signs. Responsive sign widths/post lengths preserve four choices; touch, keyboard, native-cursor and reduced-motion controls remain available.
- Added **Essay & Application Review** to the main navigation and mobile menu.
- Prioritized **UW Seattle → UW Bothell → Bellevue College** in school lists and added direct priority-school entry points. Existing saved choices remain intact.
- Added salaries directly to discovery results, Explore and Careers, plus a dedicated salary view. All 50 states and DC and 829 detailed occupations are selectable. Data are BLS May 2025 **annual means**, not medians, starting salaries or guaranteed degree outcomes. Unpublished estimates stay unavailable; no neighboring/national substitute is inferred.

## Remaining-checklist progress

- Fixed live Workers AI inference by replacing an unavailable model with Cloudflare's currently documented `@cf/meta/llama-3.3-70b-instruct-fp8-fast` model. Fixed the response parser to accept the documented structured JSON response. A synthetic production request returned HTTP200.
- Required a structured review with strengths, improvements and prompt coverage. Tightened instructions after a synthetic review omitted strengths and overlooked a stated responsibility. No real student writing was used for these checks. Prompt and outcome-claim guards remain enabled; feedback is not a validated admission forecast.
- Captured Bellevue's155 official public program overviews. Of144 linked public program requests,130 returned usable program records and14 returned NOT_FOUND bodies; excluded those failed records from usable-map claims. The155 overviews remain searchable, including91 with usable linked map records. Preserved175 maps and761 elective-choice menus; rendered source courses, additional prerequisites and milestones. These are faculty-recommended plans from the public2025 map snapshot, not certified audits/current offerings.
- Added on-site Seattle Colleges2025–27 catalog reading: all340 PDF pages and286 indexed campus sections. Sections include focus areas and noncredit training; not286 separate awards. Their course mentions are not inferred as mandatory rules.
- Added route-specific Allen School, Informatics transfer and engineering annual application rules and exact South Seattle graduation dates. Preserved departmental/college Computer Engineering deadline conflict instead of choosing an unverified universal date.
- Added qualitative Allen School transfer GPA context, explicitly labeled as majority thresholds without cohort years, not average GPA, minimum requirements or personal probabilities.

## Verification and limits

Syntax/unit/security/transcript and functional DOM suites cover navigation, state/occupation changes, suppression, school priority, Bellevue source reading, Seattle source pages, sign-to-road coordinate correspondence, touch/keyboard pathways and restored records. Local tests do not establish real-browser rendering quality.

Full institution-approved audits, exhaustive verified current requirements/deadlines across every institution, and universal admitted-GPA/competitive-grade data remain incomplete. Accurate personal admission percentages require a representative outcome dataset and calibration; simulations alone would not supply those.

Real-browser/mobile rendering checks remain blocked: managed desktop control (`cua_repl.js`) is not offered. The Sites workflow requires skipping browser QA when it is unavailable, so no substitute browser was installed.

Deployment and live AI sample results are recorded in the completion report. Auto-deployment continues through the existing GitHub → Cloudflare integration.
