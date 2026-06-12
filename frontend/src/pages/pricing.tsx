import LandingNav from '@/components/LandingNav';

const PLANS = [
  ['Starter', 'Free', ['1 user', 'Up to 50 orders/mo', '1 GB documents']],
  ['Business', '$29/mo', ['5 users', 'Unlimited orders', '20 GB documents']],
  ['Enterprise', 'Contact us', ['Unlimited users', 'Priority support', 'Custom integrations']],
];

export default function Pricing() {
  return (
    <>
      <LandingNav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-brand-bold">Pricing</h1>
        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map(([name, price, feats]) => (
            <div key={name as string} className="rounded-lg border bg-white p-6">
              <h3 className="font-brand-semibold">{name as string}</h3>
              <p className="my-2 text-2xl font-brand-bold">{price as string}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {(feats as string[]).map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
