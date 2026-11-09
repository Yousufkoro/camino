# Camino 0.9 — priority usability fixes

## Direction selection

The actual setup selector now uses the full loaded953-record catalog, not only the eight exploratory interest directions. Search and college filters include exact credential/option titles. Choosing a catalog record saves its program ID, campus and calendar and creates/updates its primary goal. Existing entered checklists are preserved when changing programs. Advanced profile/scenario selectors and recommendation alternatives also expose catalog choices. Broad interest themes remain separately labeled.

Catalog entries include bachelor credentials/options, associate programs and certificates;953 is not a count of unique majors. Coverage remains scoped to the reviewed directories. This change does not claim every U.S. institution's programs are included.

## Pathfinder

The supported primary view is now an actual locally rendered Three.js/WebGL2 scene, with textured ground, tapered ground meshes, instanced trees/canopies, physical textured signboards, lantern lighting and desktop shadows. HTML answer controls project onto the physical board locations, retaining keyboard and screen-reader access.

A decision follows an arc-length camera path for4.2seconds with quintic easing, a gradual turn and head movement capped at1.2cm. The renderer/camera persist across question renders; the next fork is created ahead rather than replacing the world with a CSS zoom. Double answers are blocked until travel completes. Navigation disposes GPU resources and cancels pending progress. Hidden tabs pause the travel clock. Layout projection adapts to portrait/tablet views; pixel ratio and shadows are limited on compact layouts. Reduced motion skips camera travel. A non-WebGL view remains available.

The Three.js version is pinned locally at0.180.0 with MIT attribution. The renderer sends no student data and makes no runtime CDN request.

## Review label

Essay & Application Review now shows **(Beta)** in the navigation and page heading, with a short reminder to check suggestions.

## Verification

Regression and new functional tests cover all953 setup options, searching/selecting Informatics, exact campus/goal persistence, Beta labels, travel completion versus button animation, duplicate-click locking and navigation cancellation. Tests use the actual Three.js camera/geometry math to verify all four boards fit without overlap at desktop, tablet and mobile dimensions and roads face upward. Camera easing is checked for frame-rate independence and smooth endpoints.

These geometry/functional tests are not GPU rendering or real-device visual/performance verification. Managed browser control remains unavailable; the Sites workflow requires skipping browser QA in that environment. The remaining academic checklist work follows this priority release.
