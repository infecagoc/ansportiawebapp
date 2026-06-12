'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandLoader from '@/components/BrandLoader';
import Section1 from './Section1';
import HowItWorks from './HowItWorks';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';

// Shared smooth easing for the post-intro reveal.
const SMOOTH = [0.22, 1, 0.36, 1] as const;

/**
 * The full Ansportia marketing landing page — header, six animated
 * sections (hero → stats → features → process → why-us → CTA) and footer.
 *
 * On open: the brand intro (BrandLoader) plays, then dissolves; the header
 * slides in, and the content slides up shortly after.
 */
export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Dissolve after ~1.5 paint cycles (one full paint, then a half), then
    // reveal the landing page. (CYCLE in BrandLoader is 1.4s → ~2100ms.)
    const t = setTimeout(() => {
      setShowIntro(false);
      setRevealed(true);
    }, 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Lock scrolling (Lenis + native) and hide the scrollbar during the intro.
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
  }, [showIntro, lenis]);

  return (
    <>
      <AnimatePresence>
        {showIntro && <BrandLoader key="brand-loader" />}
      </AnimatePresence>

      {/* Header mounts on reveal so its own slide-in fires at the right moment */}
      {revealed && <Header />}

      {/* Content slides up from the bottom a beat after the header */}
      <motion.main
        className="bg-cream"
        initial={{ opacity: 0, y: 90 }}
        animate={revealed ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, ease: SMOOTH, delay: 0.55 }}
      >
        <Section1 />
        <HowItWorks />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
      >
        <Footer />
      </motion.div>
    </>
  );
}
