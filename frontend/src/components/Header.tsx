'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { href: '#work', label: 'Platform' },
  { href: '#studio', label: 'Company' },
];

function LocalClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kathmandu',
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export default function Header() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@ansportia.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1400px] items-start justify-between gap-4 px-5 py-5">
        {/* Floating logo (dark mark, no rectangle) */}
        <Link
          href="/landing"
          aria-label="Ansportia home"
          className="group flex flex-none items-center pt-1 transition-transform duration-300 hover:-translate-y-0.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Images/darklogo.svg"
            alt="Ansportia"
            className="h-12 w-auto drop-shadow-[0_8px_18px_rgba(14,29,36,0.25)]"
          />
        </Link>

        {/* Center info strip (desktop) */}
        <div className="hidden flex-1 items-center justify-center gap-10 pt-5 text-sm font-medium text-ink/70 lg:flex">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-maroon" />
            Kathmandu&nbsp;&nbsp;<LocalClock />
          </span>
          <button
            onClick={copyEmail}
            className="group flex items-center gap-2 transition-colors hover:text-ink"
          >
            hello@ansportia.com
            <span className="text-xs text-ink/50 group-hover:text-gold">
              {copied ? '✓ copied' : '⧉'}
            </span>
          </button>
        </div>

        {/* Floating pill nav */}
        <nav className="flex flex-none items-center gap-1 rounded-full bg-cream/80 p-1.5 shadow-[0_18px_40px_-16px_rgba(14,29,36,0.45)] ring-1 ring-ink/5 backdrop-blur">
          <div className="hidden items-center sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/auth/login"
            className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
          >
            Get Started
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-[10px] text-ink">
              →
            </span>
          </Link>
          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full sm:hidden"
          >
            <span className={`h-0.5 w-5 bg-ink transition-all ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition-all ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 rounded-3xl bg-cream/95 p-3 shadow-xl ring-1 ring-ink/5 backdrop-blur sm:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-semibold text-ink/80 transition-colors hover:bg-ink/5"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
