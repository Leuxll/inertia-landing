// Shared animation presets for the Momentum landing page.
// All animations use compositor-only properties (transform, opacity) for performance.
// Easing: smooth ease-out / ease-in-out — no bounce or spring physics.

export const cinematicTransition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1.0] as const,
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.42, 0, 0.58, 1.0] as const,
};

// Fade up from below — editorial reveal
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
};

// Simple fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: cinematicTransition,
  },
};

// Slide in from left — directional reveal for feature sections
export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
};

// Slide in from right — directional reveal for feature sections
export const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
};

// Stagger children container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};
