'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Service = {
  lead: string;
  body: string;
  tags: string[];
};

const services: Service[] = [
  {
    lead: 'Trade operations',
    body: 'We turn the chaos of cross-border commerce into one calm workflow. Orders, supplier purchases, shipments and customs — captured the moment they happen and kept perfectly in sync.',
    tags: ['Imports', 'Exports', 'Customer orders', 'Supplier purchases', 'Logistics'],
  },
  {
    lead: 'Financial clarity',
    body: 'Every figure reconciles itself. Multi-currency payments, expenses and receivables roll into a living ledger so your real margin is never more than a glance away.',
    tags: ['Multi-currency', 'Payments', 'Expenses', 'Profit analytics', 'Receivables'],
  },
  {
    lead: 'Compliance & documents',
    body: 'Invoices, packing lists and certificates live in one encrypted vault — searchable, versioned and ready for any audit or border the moment you need them.',
    tags: ['Document vault', 'Invoices', 'Certificates', 'Audit trail', 'Signed URLs'],
  },
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function RevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });
  const words = text.split(' ');
  return (
    <p
      ref={ref}
      className="flex flex-wrap font-serif text-3xl font-medium leading-snug text-cream sm:text-4xl"
    >
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

export default function Section3() {
  return (
    <section id="studio" className="scroll-mt-28 bg-cream px-5 py-10">
      <div className="mx-auto max-w-[1400px] rounded-[36px] bg-ink-900 px-6 py-24 sm:px-16 sm:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          What we do
        </span>

        <div className="mt-12 space-y-28">
          {services.map((s) => (
            <div key={s.lead} className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <RevealParagraph text={`${s.lead} — ${s.body}`} />
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cream/15 px-4 py-1.5 text-sm text-cream/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="#contact"
                className="group flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-cream/80 transition-colors hover:text-cream"
              >
                See capabilities
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-ink transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
