import type { Variants } from 'framer-motion';

/** Fade up — the default entrance for most content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Stagger container — reveals children one after another. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Scale-in for cards / media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Shared viewport config so sections animate once when ~25% visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
