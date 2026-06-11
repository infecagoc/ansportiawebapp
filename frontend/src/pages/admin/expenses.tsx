import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Expenses() {
  return (
    <DashboardLayout title="Expenses" nav={ADMIN_NAV}>
      <PagePlaceholder />
    </DashboardLayout>
  );
}
