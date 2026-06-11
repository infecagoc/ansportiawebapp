import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Orders() {
  return (
    <DashboardLayout title="Orders" nav={ADMIN_NAV}>
      <PagePlaceholder />
    </DashboardLayout>
  );
}
