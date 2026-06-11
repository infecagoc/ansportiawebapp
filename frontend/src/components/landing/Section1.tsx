'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const word = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Headline tokens — `i` flags italic-serif accent words.
const headline: Array<{ t: string; i?: boolean }> = [
  { t: 'Ansportia', i: true },
  { t: 'runs your' },
  { t: 'entire' },
  { t: 'cross-border', i: true },
  { t: 'trade —' },
  { t: 'with' },
  { t: 'effortless' },
  { t: 'precision.', i: true },
];

export default function Section1() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 pb-20 pt-40 sm:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="max-w-6xl text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[5.2rem]">
          {headline.map((w, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={word}
              initial="hidden"
              animate="show"
              className={`mr-[0.28em] inline-block ${
                w.i ? 'font-serif italic text-gold-gradient' : ''
              }`}
            >
              {w.t}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-14 flex flex-col gap-8 sm:flex-row sm:justify-end sm:gap-20"
        >
          <Link
            href="#studio"
            className="group flex items-center gap-3 text-lg font-semibold text-ink"
          >
            Read about the platform
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="#work"
            className="group flex items-center gap-3 text-lg font-semibold text-ink"
          >
            Explore the platform
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-ink transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
