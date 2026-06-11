'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Card with a circular arrow bubble that follows the cursor inside it —
 * the hover interaction used on noteworthy.studio's project grid.
 * Each card self-reveals on scroll (independent of parent orchestration).
 */
function FollowCard({
  href,
  index,
  className,
  children,
  label = 'View',
}: {
  href: string;
  index: number;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const y = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const bubbleStyle: MotionStyle = {
    left: x,
    top: y,
    translateX: '-50%',
    translateY: '-50%',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      custom={index}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={(e) => {
        onMove(e);
        setHovered(true);
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(false)}
      className={`group relative cursor-none overflow-hidden ${className ?? ''}`}
    >
      {children}

      {/* Cursor-following bubble */}
      <motion.span
        style={bubbleStyle}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-cream text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
      >
        <span className="flex flex-col items-center text-[11px] font-semibold uppercase tracking-wider">
          <span className="text-xl leading-none">→</span>
          {label}
        </span>
      </motion.span>
    </motion.a>
  );
}

export default function Section2() {
  return (
    <section id="work" className="scroll-mt-28 bg-cream px-5 py-10">
      <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-12">
        {/* Large feature card */}
        <FollowCard
          href="#studio"
          index={0}
          label="Explore"
          className="flex aspect-[16/10] flex-col justify-end rounded-[28px] bg-ink p-8 lg:col-span-7 lg:aspect-auto lg:min-h-[420px]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-1/3 left-1/2 h-[140%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#A88B58,transparent)] opacity-40 blur-2xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,#720E20,transparent)] opacity-50 blur-2xl" />
          </div>
          <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            End-to-end
          </span>
          <h3 className="relative z-10 mt-2 font-serif text-4xl font-bold text-cream sm:text-5xl">
            Imports &amp; <span className="italic text-gold-gradient">Exports</span>
          </h3>
          <p className="relative z-10 mt-3 max-w-md text-cream/70">
            Track every cross-border shipment — customs, logistics and landed cost —
            from purchase order to delivery, live.
          </p>
        </FollowCard>

        {/* Two stacked smaller cards */}
        <div className="grid gap-5 lg:col-span-5">
          {[
            {
              tag: 'Money',
              title: 'Payments & Ledger',
              desc: 'Multi-currency reconciliation in USD, CNY and NPR — balanced automatically.',
              grad: 'from-maroon to-ink',
            },
            {
              tag: 'Records',
              title: 'Documents Vault',
              desc: 'Invoices, packing lists and certificates — encrypted, searchable, audit-ready.',
              grad: 'from-gold-dark to-ink',
            },
          ].map((c, i) => (
            <FollowCard
              key={c.title}
              href="#studio"
              index={i + 1}
              className={`flex min-h-[200px] flex-col justify-end rounded-[28px] bg-gradient-to-br ${c.grad} p-7`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
                {c.tag}
              </span>
              <h3 className="mt-1.5 font-serif text-2xl font-bold text-cream">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-cream/65">{c.desc}</p>
            </FollowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
