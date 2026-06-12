'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/components/landing/motion';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Sourcing', href: '/#work' },
      { label: 'Quality Control', href: '/#work' },
      { label: 'Freight & Logistics', href: '/#work' },
      { label: 'Global Reach', href: '/#globe' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#studio' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sign in', href: '/auth/login' },
    ],
  },
];

const socials = ['in', 'X', 'f'];

export default function Footer() {
  return (
    <footer className="bg-cream px-6 pb-8 pt-16 sm:px-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-[1400px]"
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="md:max-w-sm">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Images/ansportia-logo-full.svg" alt="Ansportia" className="h-12 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
              Your global sourcing, quality-control and shipping partner &mdash; from
              the factory floor to your customer&apos;s door.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-dark">
              from the house of Infeca
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-sm text-ink/60 transition-all hover:border-gold hover:text-gold-dark"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-12 sm:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-brand-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink/60 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ansportia · Infeca. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-ink">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-ink">Terms</Link>
            <Link href="#" className="transition-colors hover:text-ink">Security</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
