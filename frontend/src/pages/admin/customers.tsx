import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Customers() {
  return (
    <DashboardLayout title="Customers" nav={ADMIN_NAV}>
      <PagePlaceholder />
    </DashboardLayout>
  );
}
