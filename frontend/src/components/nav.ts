import type { NavItem } from './DashboardLayout';

// Admin / Super-Admin sidebar (full access per the architecture doc).
export const ADMIN_NAV: NavItem[] = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/suppliers', label: 'Suppliers' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/expenses', label: 'Expenses' },
  { href: '/admin/payments', label: 'Payments' },
  { href: '/admin/documents', label: 'Documents' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/users', label: 'User Management' },
  { href: '/admin/settings', label: 'Settings' },
];

// Customer portal sidebar (Phase 2 — read-only views).
export const CUSTOMER_NAV: NavItem[] = [
  { href: '/customer', label: 'Overview' },
  { href: '/customer/orders', label: 'My Orders' },
  { href: '/customer/invoices', label: 'Invoices' },
  { href: '/customer/documents', label: 'Documents' },
];
