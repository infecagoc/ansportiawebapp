import DashboardLayout from '@/components/DashboardLayout';
import { ADMIN_NAV } from '@/components/nav';

const STATS = [
  ['Total Sales', '—'],
  ['Total Purchase Cost', '—'],
  ['Gross Profit', '—'],
  ['Outstanding Receivables', '—'],
  ['Outstanding Payables', '—'],
  ['Orders This Month', '—'],
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Dashboard" nav={ADMIN_NAV}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-brand-semibold">{value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
