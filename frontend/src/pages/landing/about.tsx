import LandingNav from '@/components/LandingNav';

export default function About() {
  return (
    <>
      <LandingNav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-4 text-3xl font-bold">About ANSPORTIA</h1>
        <p className="text-gray-600">
          ANSPORTIA is a cloud-based trading management system built to streamline
          import/export operations between Nepal and China &mdash; from customer
          orders and supplier purchases through to shipping, payments, and profit
          reporting.
        </p>
      </main>
    </>
  );
}
