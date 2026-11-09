# Camino 0.9.1 — readable signs and a living forest

The reported blank signs are addressed by removing essential answer text from GPU texture rendering. Native answer labels now follow an exact projective mapping to each physical3D board. They remain readable independently of scene lighting/texture behavior and retain the normal keyboard/screen-reader controls. Future-fork preview labels appear only as the camera approaches.

The original procedural forest now animates while idle as well as during decisions:

- Tree trunks, branches and smaller irregular canopy clusters sway using a shared wind shader. Desktop shadows use the same deformation.
- Mist layers drift, fireflies move and breathe softly, and falling leaves turn in the air.
- Original bird meshes fly through the background with independent wingbeats.
- Lantern movement/light remains subtle; its held position is lower so it does not cover answer boards.
- Tree placements are cleared from sightlines to signs. The atmosphere uses cooler moonlit color and brighter bark detail.

Every system uses elapsed time and freezes with reduced motion. The forest/labels use locally served code, original generated geometry and no assets from the referenced quiz.

Verification: regression tests; exact quad-to-native-label mapping; visible DOM answer text in WebGL mode; bounded life/motion calculations; reduced-motion freezing; shared visible/shadow wind shader patching. These are not a substitute for a real-browser/GPU visual inspection, which remains unavailable in this managed environment.

Academic-checklist work is held separately while the reported visual issues take priority.
