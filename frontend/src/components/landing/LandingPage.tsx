import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';

/**
 * The full Ansportia marketing landing page — header, six animated
 * sections (hero → stats → features → process → why-us → CTA) and footer.
 */
export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </main>
      <Footer />
    </>
  );
}
