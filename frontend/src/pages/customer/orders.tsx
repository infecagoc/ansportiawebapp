import DashboardLayout from '@/components/DashboardLayout';
import PagePlaceholder from '@/components/PagePlaceholder';
import { CUSTOMER_NAV } from '@/components/nav';

export default function CustomerOrders() {
  return (
    <DashboardLayout title="My Orders" nav={CUSTOMER_NAV}>
      <PagePlaceholder note="Read-only list of the customer's orders and statuses." />
    </DashboardLayout>
  );
}
