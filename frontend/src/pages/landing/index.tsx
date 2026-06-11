import Link from 'next/link';
import LandingNav from '@/components/LandingNav';

export default function LandingHome() {
  return (
    <>
      <LandingNav />
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Nepal &ndash; China Trade
        </span>
        <h1 className="text-5xl font-bold tracking-tight">
          Trading Management System
        </h1>
        <p className="text-lg text-gray-600">
          Manage imports, exports, customer orders, supplier purchases, payments,
          expenses, documents and profitability &mdash; all in one cloud platform.
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Get started
          </Link>
          <Link
            href="/landing/features"
            className="rounded-md border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
          >
            See features
          </Link>
        </div>
      </main>
    </>
  );
}
