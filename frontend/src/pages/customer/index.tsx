import DashboardLayout from '@/components/DashboardLayout';
import { CUSTOMER_NAV } from '@/components/nav';

const STATS = [
  ['Open Orders', '—'],
  ['Outstanding Balance', '—'],
  ['Recent Payments', '—'],
];

export default function CustomerHome() {
  return (
    <DashboardLayout title="Overview" nav={CUSTOMER_NAV}>
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
