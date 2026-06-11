'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/components/landing/motion';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Imports & Exports', href: '#work' },
      { label: 'Payments & Ledger', href: '#work' },
      { label: 'Documents Vault', href: '#work' },
      { label: 'Profit Analytics', href: '#studio' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#studio' },
      { label: 'Pricing', href: '/landing/pricing' },
      { label: 'Contact', href: '#contact' },
      { label: 'Sign in', href: '/auth/login' },
    ],
  },
];

const socials = ['in', 'X', 'f'];

export default function Footer() {
  return (
    <footer className="bg-cream px-5 pb-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-ink-900 px-6 py-14 sm:px-16"
      >
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/landing" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Images/lightlogo.svg" alt="Ansportia" className="h-11 w-auto" />
              <span className="font-serif text-2xl font-bold tracking-[0.14em] text-cream">
                ANSPORTIA
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              The complete cloud platform for Nepal&ndash;China trade &mdash; refined
              into one elegant workspace.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">
              from the house of Infeca
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-sm text-cream/70 transition-all hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ansportia · Infeca. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-cream">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-cream">Terms</Link>
            <Link href="#" className="transition-colors hover:text-cream">Security</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
