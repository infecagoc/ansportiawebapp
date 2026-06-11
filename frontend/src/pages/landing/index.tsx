import Head from 'next/head';
import LandingPage from '@/components/landing/LandingPage';

export default function LandingHome() {
  return (
    <>
      <Head>
        <title>Ansportia - from the house of Infeca</title>
        <meta
          name="description"
          content="Ansportia is the complete cloud platform for Nepal–China trade — imports, exports, payments, documents and profitability in one elegant workspace."
        />
      </Head>
      <LandingPage />
    </>
  );
}
