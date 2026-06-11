import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Settings() {
  return (
    <DashboardLayout title="Settings" nav={ADMIN_NAV}>
      <PagePlaceholder note="Super-Admin only: company profile, currencies, preferences." />
    </DashboardLayout>
  );
}
