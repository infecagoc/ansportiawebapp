import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Suppliers() {
  return (
    <DashboardLayout title="Suppliers" nav={ADMIN_NAV}>
      <PagePlaceholder />
    </DashboardLayout>
  );
}
