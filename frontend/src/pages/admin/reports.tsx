import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Reports() {
  return (
    <DashboardLayout title="Reports" nav={ADMIN_NAV}>
      <PagePlaceholder note="Sales, P&L, receivables, payables and ledgers." />
    </DashboardLayout>
  );
}
