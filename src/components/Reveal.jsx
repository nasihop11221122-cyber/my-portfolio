// src/components/Reveal.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/motion.js";

/**
 * Reusable Reveal component to wrap sections or elements with scroll animation.
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  variants = fadeUp,
  className = "",
  viewport = { once: true, amount: 0.2 },
  delay = 0,
  as = "div",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  // If a delay is passed, clone variants with custom delay
  const customVariants = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible?.transition,
            delay,
          },
        },
      }
    : variants;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Reusable StaggerContainer to coordinate sequential reveals of child items.
 */
export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0.1,
  className = "",
  viewport = { once: true, amount: 0.2 },
  as = "div",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(staggerChildren, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default Reveal;
