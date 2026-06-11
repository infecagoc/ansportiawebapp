'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './motion';

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 12, suffix: 'M+', label: 'Trade value managed (USD)' },
  { value: 4800, suffix: '+', label: 'Orders processed' },
  { value: 99.9, suffix: '%', label: 'Platform uptime' },
  { value: 36, suffix: 'hr', label: 'Avg. clearance time' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const decimals = value % 1 !== 0 ? 1 : 0;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Section4() {
  return (
    <section className="bg-cream px-5 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 border-y border-ink/10 py-16 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="px-4 text-center">
            <div className="font-serif text-5xl font-bold text-ink sm:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mx-auto mt-3 max-w-[12rem] text-sm text-ink/55">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
