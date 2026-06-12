'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useLenis } from 'lenis/react';

const links = [
  { href: '/#studio', label: 'Company' },
  { href: '/#work', label: 'Products' },
  { href: '/#globe', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
  { href: '/#globe', label: 'Tracking' },
];

// Right-hand featured cards inside the menu (image-free, brand gradients).
const features = [
  { label: 'Sourcing', desc: 'Factories & suppliers', href: '/#work', bg: 'bg-ink' },
  { label: 'Quality Control', desc: 'On-the-ground QC', href: '/#work', bg: 'bg-gradient-to-br from-maroon to-ink' },
  { label: 'Global Reach', desc: 'Shipping worldwide', href: '/#globe', bg: 'bg-gradient-to-br from-gold-dark to-ink' },
  { label: 'Get in touch', desc: 'Talk to our team', href: '/contact', bg: 'bg-gradient-to-br from-ink-700 to-ink' },
];

// Minimal line icons (dependency-free), styled with currentColor.
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-[21px] w-[21px]',
};

const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const SMOOTH = [0.22, 1, 0.36, 1] as const;

/**
 * Rolex-style header: "Menu" (hamburger + label) left, centered logo, icon+label
 * actions right — on a clean borderless bar that HIDES on scroll down and
 * REVEALS on scroll up. The menu opens as a full-screen panel (nav list left,
 * featured cards right) sliding in from the left.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current;
    if (diff > 4 && latest > 120) {
      setHidden(true);
      setOpen(false);
    } else if (diff < -4) {
      setHidden(false);
    }
    lastY.current = latest;
  });

  // Freeze smooth scrolling while the menu is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: SMOOTH }}
        className="fixed inset-x-0 top-0 z-50 bg-cream/90 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 items-center px-6 py-5 sm:px-10">
          {/* Left: hamburger + Menu label */}
          <div className="flex items-center justify-start">
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-3 text-ink transition-opacity duration-300 hover:opacity-60"
            >
              <span className="flex h-4 w-7 flex-col justify-center gap-[7px]">
                <span className="h-0.5 w-7 bg-ink" />
                <span className="h-0.5 w-7 bg-ink" />
              </span>
              <span className="hidden text-sm font-brand-medium uppercase tracking-[0.1em] sm:inline">Menu</span>
            </button>
          </div>

          {/* Center: logo */}
          <div className="flex items-center justify-center">
            <Link href="/" aria-label="Ansportia home" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Images/darklogo.svg"
                alt="Ansportia"
                className="h-14 w-auto drop-shadow-[0_8px_18px_rgba(14,29,36,0.18)]"
              />
            </Link>
          </div>

          {/* Right: account + Let's Talk CTA */}
          <div className="flex items-center justify-end gap-4 text-sm font-brand-medium text-ink/80 sm:gap-5">
            <Link href="/auth/login" aria-label="Account" className="flex items-center gap-2 transition-colors duration-300 hover:text-ink">
              <UserIcon />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <Link
              href="/contact"
              className="text-sm font-brand-medium text-ink underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-maroon"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu (outside the header's transform) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-cream"
            initial={{ opacity: 0, x: '-3%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-3%' }}
            transition={{ duration: 0.5, ease: SMOOTH }}
          >
            {/* Circular close button */}
            <button
              aria-label="Close menu"
              onClick={close}
              className="fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:bg-ink hover:text-cream sm:right-10 sm:top-7"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:py-28">
              {/* Left: nav list */}
              <div className="flex min-h-0 flex-col">
                <nav className="flex flex-col">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.label}
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.07, duration: 0.55, ease: SMOOTH }}
                    >
                      <Link
                        href={l.href}
                        onClick={close}
                        className="group inline-flex items-center py-2 font-serif text-3xl text-ink transition-all duration-300 ease-out hover:translate-x-2 hover:text-gold-dark sm:text-4xl"
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-10 flex flex-col gap-2.5 text-sm font-brand-medium text-maroon"
                >
                  <Link href="/auth/login" onClick={close} className="w-fit transition-colors duration-300 hover:text-maroon-dark">
                    Customer Login
                  </Link>
                  <Link href="/auth/login" onClick={close} className="w-fit transition-colors duration-300 hover:text-maroon-dark">
                    Join our team
                  </Link>
                </motion.div>

                <div className="mt-12 lg:mt-16">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Images/ansportia-logo-full.svg" alt="Ansportia" className="h-auto w-52" />
                </div>
              </div>

              {/* Right: featured cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.08, duration: 0.6, ease: SMOOTH }}
                  >
                    <Link
                      href={f.href}
                      onClick={close}
                      className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[26px] p-6 transition-transform duration-500 ease-out hover:scale-[1.02] ${f.bg}`}
                    >
                      <span className="font-serif text-xl text-cream">{f.label}</span>
                      <span className="mt-1 text-sm text-cream/70">{f.desc}</span>
                      <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
