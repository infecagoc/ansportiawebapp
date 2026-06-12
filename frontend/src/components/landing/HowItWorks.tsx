'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './motion';

const steps = [
  {
    no: '01',
    title: 'You think',
    desc: 'Share your idea or the market you want to enter. We counsel you — product ideas, the right ranges, and what actually sells.',
  },
  {
    no: '02',
    title: 'You invest',
    desc: 'We source the right suppliers across China and beyond, negotiate the best price, and quality-check every product before it ships.',
  },
  {
    no: '03',
    title: 'We grow it',
    desc: 'Door-to-door delivery to markets worldwide — so you can focus on building a brand your customers love.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-ink px-6 py-20 sm:px-16 sm:py-28">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.span
            variants={fadeUp}
            className="text-xs font-brand-semibold uppercase tracking-[0.3em] text-gold"
          >
            How it works
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-3xl font-serif text-4xl font-brand-bold leading-tight text-cream sm:text-5xl"
          >
            You think. You invest.{' '}
            <span className="text-gold-gradient">We grow it</span> — worldwide.
          </motion.h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={s.no} variants={fadeUp} className="relative">
                {/* connector line between steps (desktop) */}
                {i < steps.length - 1 && (
                  <span className="absolute right-0 top-7 hidden h-px w-1/2 translate-x-1/2 bg-gradient-to-r from-gold/30 to-transparent md:block" />
                )}
                <div className="font-serif text-6xl font-brand-bold text-gold/25">{s.no}</div>
                <h3 className="mt-4 font-serif text-2xl font-brand-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-cream/65">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
