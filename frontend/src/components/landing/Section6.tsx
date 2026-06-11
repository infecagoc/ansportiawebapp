'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './motion';

export default function Section6() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-28 bg-cream px-5 py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-serif text-5xl font-bold leading-tight text-ink sm:text-7xl"
        >
          Stay in the <span className="italic text-gold-gradient">loop!</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-ink/60">
          Get a monthly note on new features, trade insights and the craft behind
          Ansportia. No noise &mdash; just the good stuff.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={submit}
          className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full bg-cream p-2 shadow-[0_24px_60px_-24px_rgba(14,29,36,0.5)] ring-1 ring-ink/10 focus-within:ring-gold"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 bg-transparent px-5 py-2.5 text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
          >
            {sent ? 'Subscribed ✓' : 'Subscribe'}
            {!sent && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-[10px] text-ink transition-transform group-hover:translate-x-0.5">
                →
              </span>
            )}
          </button>
        </motion.form>

        <motion.p variants={fadeUp} className="mt-6 text-sm text-ink/45">
          Or write to us at{' '}
          <a
            href="mailto:hello@ansportia.com"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            hello@ansportia.com
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
