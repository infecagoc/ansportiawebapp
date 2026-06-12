'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './motion';

const TradeGlobe = dynamic(() => import('./TradeGlobe'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-cream/40">
      Loading globe…
    </div>
  ),
});

export default function Section5() {
  return (
    <section id="globe" className="scroll-mt-28 bg-cream px-6 py-10 sm:px-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto grid max-w-[1400px] items-center gap-8 overflow-hidden rounded-[36px] bg-ink-900 px-6 py-16 sm:px-16 lg:grid-cols-2"
      >
        <motion.div variants={fadeUp} className="relative z-10">
          <span className="text-xs font-brand-semibold uppercase tracking-[0.3em] text-gold">
            Global reach
          </span>
          <h2 className="mt-4 font-serif text-4xl font-brand-bold leading-tight text-cream sm:text-5xl">
            We move goods <span className="text-gold-gradient">everywhere</span> you
            grow.
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            From factory floors in China and India to doorsteps in Nepal, Australia,
            the UK and the USA &mdash; drag the globe to explore the routes we run
            every day.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream/45">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cream/20">
              ↻
            </span>
            Drag to rotate
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative h-[360px] w-full sm:h-[460px] lg:h-[520px]"
        >
          <TradeGlobe />
        </motion.div>
      </motion.div>
    </section>
  );
}
