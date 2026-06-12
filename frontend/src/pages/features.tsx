import LandingNav from '@/components/LandingNav';

const FEATURES = [
  ['Orders', 'Full order lifecycle from draft to delivered & completed.'],
  ['Customers & Suppliers', 'Ledgers, credit limits, and contact management.'],
  ['Payments', 'Track customer collections and supplier settlements.'],
  ['Expenses', 'Freight, insurance, customs, warehousing and more.'],
  ['Documents', 'Invoices, packing lists, customs docs — securely stored.'],
  ['Reports', 'Profit & loss, receivables, payables, and analytics.'],
];

export default function Features() {
  return (
    <>
      <LandingNav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-brand-bold">Features</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map(([title, desc]) => (
            <div key={title} className="rounded-lg border bg-white p-5">
              <h3 className="mb-1 font-brand-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
