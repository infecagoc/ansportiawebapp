import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { CUSTOMER_NAV } from '@/components/nav';

export default function CustomerDocuments() {
  return (
    <DashboardLayout title="Documents" nav={CUSTOMER_NAV}>
      <PagePlaceholder note="Download shipping & customs documents for your orders." />
    </DashboardLayout>
  );
}
