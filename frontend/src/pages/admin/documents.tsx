import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { ADMIN_NAV } from '@/components/nav';

export default function Documents() {
  return (
    <DashboardLayout title="Documents" nav={ADMIN_NAV}>
      <PagePlaceholder note="Upload to Supabase Storage and list documents per order." />
    </DashboardLayout>
  );
}
