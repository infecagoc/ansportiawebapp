import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Users() {
  return (
    <DashboardLayout title="User Management" nav={ADMIN_NAV}>
      <PagePlaceholder note="Super-Admin only: manage staff accounts and roles." />
    </DashboardLayout>
  );
}
