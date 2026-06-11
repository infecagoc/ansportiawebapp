import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Payments() {
  return (
    <DashboardLayout title="Payments" nav={ADMIN_NAV}>
      <PagePlaceholder note="Customer collections & supplier settlements — wiring next." />
    </DashboardLayout>
  );
}
