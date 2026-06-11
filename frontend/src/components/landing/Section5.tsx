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
    <section id="globe" className="scroll-mt-28 bg-cream px-5 py-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto grid max-w-[1400px] items-center gap-8 overflow-hidden rounded-[36px] bg-ink-900 px-6 py-16 sm:px-16 lg:grid-cols-2"
      >
        <motion.div variants={fadeUp} className="relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            One connected corridor
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-cream sm:text-5xl">
            Every route, <span className="italic text-gold-gradient">live</span> on
            one globe.
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            Watch shipments move along your Nepal&ndash;China trade lanes in real
            time. Drag the globe to explore each corridor &mdash; from Kathmandu to
            Beijing, Shanghai, Hong Kong and beyond.
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
