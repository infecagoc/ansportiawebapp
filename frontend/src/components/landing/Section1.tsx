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

// Headline tokens — `i` flags gold-gradient accent words.
const headline: Array<{ t: string; i?: boolean }> = [
  { t: 'We' },
  { t: 'source,', i: true },
  { t: 'inspect' },
  { t: '&' },
  { t: 'ship', i: true },
  { t: 'your' },
  { t: 'products' },
  { t: 'worldwide.', i: true },
];

export default function Section1() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-20 pt-40 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="max-w-6xl text-[2.6rem] font-brand-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[5.2rem]">
          {headline.map((w, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={word}
              initial="hidden"
              animate="show"
              className={`mr-[0.28em] inline-block ${
                w.i ? 'text-gold-gradient' : ''
              }`}
            >
              {w.t}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/65"
        >
          A trading company for ambitious entrepreneurs. From product ideas and
          sourcing to quality control and worldwide delivery — we help you invest,
          ship and grow your brand, from China to global markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-12 flex flex-col gap-8 sm:flex-row sm:justify-end sm:gap-20"
        >
          <Link
            href="#studio"
            className="group flex items-center gap-3 text-lg font-brand-semibold text-ink"
          >
            How we work
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-3 text-lg font-brand-semibold text-ink"
          >
            Get a quote
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-ink transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
