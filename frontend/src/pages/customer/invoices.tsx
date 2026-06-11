import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { CUSTOMER_NAV } from '@/components/nav';

export default function CustomerInvoices() {
  return (
    <DashboardLayout title="Invoices" nav={CUSTOMER_NAV}>
      <PagePlaceholder note="View and download invoices (signed URLs from Supabase Storage)." />
    </DashboardLayout>
  );
}
