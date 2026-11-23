// src/lib/motion.js
/**
 * Shared Framer Motion animation configuration for Home page.
 * Clean, smooth ease-out transitions matching ibranix.com design feel.
 */

export const defaultTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const cardHover = {
  y: -6,
  transition: {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const buttonHover = {
  scale: 1.03,
  transition: {
    duration: 0.2,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const buttonTap = {
  scale: 0.97,
  transition: {
    duration: 0.15,
  },
};
