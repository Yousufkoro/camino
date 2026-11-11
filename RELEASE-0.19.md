# 0.19 — Combined full-screen path and compass

The homepage now renders both experiences together. Paths cover the full width and height of the viewport-sized hero, with a quieter region behind text. The compass sits in the middle-right on desktop and below the heading/CTA on mobile. Removes the preview selector and ignores old exclusive-mode preferences. No profile, quiz or saved-direction data is changed.

Raised compass rings, a compass rose and cardinal marks make its depth clearer. Both layers share one renderer and animation loop; mobile geometry stays reduced. The static reduced-motion/WebGL fallback includes full-width paths and a compass together. Existing saved-direction mapping, pause/resume and route cleanup remain.

Verification: state and motion unit checks; regression suite; real Chromium WebGL screenshots at1440/390 showing both layers, full-width canvas and no horizontal overflow; tablet saved-direction update, reduced-motion dual fallback, resume, offscreen pause and route disposal. Physical-device GPU performance is not certified by software-rendered Chromium.
