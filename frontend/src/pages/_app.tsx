import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ReactLenis } from 'lenis/react';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div className={`${inter.variable} font-sans`}>
        <Head>
          <title>Ansportia - from the house of Infeca</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </div>
    </ReactLenis>
  );
}
