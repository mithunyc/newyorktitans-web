/**
 * lib/motion.ts
 *
 * Single source of truth for motion. Every component that animates must
 * import from here. Direct Framer Motion variant definitions in components
 * are forbidden by AGENTS.md Section 9.
 *
 * Authority: NYT pack Section 11.10, AGENTS.md Section 9.
 */

"use client";

import { useEffect, useState } from "react";
import type { MotionProps, Transition, Variants } from "framer-motion";
import { motion as tokensMotion } from "./tokens";

// ---------------------------------------------------------------------------
// Reduced-motion hook.
// Single source so every motion component honors `prefers-reduced-motion`.
// ---------------------------------------------------------------------------

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// Reveal variants.
// The single approved reveal pattern: fade-up.
// ---------------------------------------------------------------------------

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const revealTransition: Transition = {
  duration: tokensMotion.duration.reveal / 1000,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * Build a reveal motion prop set, with reduced-motion respected at runtime.
 *
 * Usage:
 *   const reveal = useReveal();
 *   return <motion.div {...reveal}>...</motion.div>;
 */
export function useReveal(): MotionProps {
  const reduced = useReducedMotion();

  if (reduced) {
    // Skip animation entirely; render in final state.
    return {
      initial: false,
      animate: "visible",
      variants: revealVariants,
    };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10%" },
    variants: revealVariants,
    transition: revealTransition,
  };
}

/**
 * Stagger container helper. Use as the parent variant; children must use
 * `revealVariants`. Stagger ceiling enforced by tokens.
 */
export function useRevealStagger(itemCount: number): MotionProps {
  const reduced = useReducedMotion();

  if (reduced || itemCount === 0) {
    return {
      initial: false,
      animate: "visible",
    };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10%" },
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: tokensMotion.staggerMs / 1000,
        },
      },
    },
  };
}
