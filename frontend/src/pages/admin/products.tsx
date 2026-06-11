import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Products() {
  return (
    <DashboardLayout title="Products" nav={ADMIN_NAV}>
      <PagePlaceholder />
    </DashboardLayout>
  );
}
