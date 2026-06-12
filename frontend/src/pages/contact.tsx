'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const interests = [
  'Sourcing',
  'Quality Control',
  'Freight & Logistics',
  'Other / Consulting',
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact · Ansportia</title>
        <meta name="description" content="Get in touch with the Ansportia team." />
      </Head>

      <Header />

      {/* Intro (light) */}
      <section className="bg-cream px-6 pb-16 pt-40 text-center sm:px-10 sm:pt-44">
        <p className="text-xs font-brand-semibold uppercase tracking-[0.3em] text-ink/60">
          Contact us
        </p>
        <h1 className="mt-5 font-serif text-6xl font-brand-black uppercase tracking-tight text-ink sm:text-7xl lg:text-8xl">
          Let&apos;s Talk
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-ink/70">
          Ready to source, inspect and ship with a partner you can trust? Call us on{' '}
          <a href="tel:+97714000000" className="text-maroon underline underline-offset-4 hover:text-maroon-dark">
            +977 1 400 0000
          </a>
          , email{' '}
          <a href="mailto:hello@ansportia.com" className="text-maroon underline underline-offset-4 hover:text-maroon-dark">
            hello@ansportia.com
          </a>
          , or fill out the form below to get started.
        </p>
      </section>

      {/* Form (dark) */}
      <section className="bg-ink px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="text-center font-serif text-3xl font-brand-bold text-cream sm:text-4xl">
          Planning your next shipment? Let&apos;s talk.
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" required placeholder="Your name" />
            <Field label="Organisation" required placeholder="Company name" />
            <Field label="Email" required type="email" placeholder="you@company.com" />
            <Field label="Phone" type="tel" placeholder="+977 …" />
          </div>

          {/* Interests */}
          <fieldset className="mt-8">
            <legend className="text-sm font-brand-medium text-cream/70">I&apos;m interested in</legend>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {interests.map((label) => (
                <label key={label} className="flex cursor-pointer items-center gap-3 text-sm text-cream/80">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-cream/30 bg-transparent text-gold accent-gold"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Message */}
          <div className="mt-8">
            <label className="text-sm font-brand-medium text-cream/70">What can we help you with?</label>
            <textarea
              rows={5}
              placeholder="Enter message here"
              className="mt-2 w-full rounded-2xl bg-cream/5 px-5 py-4 text-cream placeholder:text-cream/40 ring-1 ring-cream/10 transition focus:outline-none focus:ring-gold/50"
            />
          </div>

          <button
            type="submit"
            className="mx-auto mt-9 block w-full max-w-md rounded-full border border-cream/30 px-6 py-4 text-sm font-brand-semibold text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Book a Demo
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

function Field({
  label,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-brand-medium text-cream/70">
        {label}
        {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 rounded-full bg-cream/5 px-5 py-3.5 text-cream placeholder:text-cream/40 ring-1 ring-cream/10 transition focus:outline-none focus:ring-gold/50"
      />
    </div>
  );
}
