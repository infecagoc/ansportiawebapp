import Head from 'next/head';
import LandingPage from '@/components/landing/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ansportia - from the house of Infeca</title>
        <meta
          name="description"
          content="Ansportia is your global sourcing, quality-control and logistics partner — we source, inspect and ship products across China, Nepal, Australia, the UK, India and the USA."
        />
      </Head>
      <LandingPage />
    </>
  );
}
