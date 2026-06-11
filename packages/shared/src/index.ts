// Shared constants & types used by both apps/web and apps/api.
// Keep these in sync with apps/api/prisma/schema.prisma enums.

export const USER_ROLES = ['SUPER_ADMIN', 'STAFF', 'CUSTOMER'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ORDER_STATUSES = [
  'DRAFT',
  'CONFIRMED',
  'PURCHASED',
  'IN_PRODUCTION',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const EXPENSE_TYPES = [
  'FREIGHT',
  'INSURANCE',
  'DOCUMENTATION',
  'CUSTOM_CLEARANCE',
  'WAREHOUSING',
  'LOCAL_DELIVERY',
  'MISCELLANEOUS',
] as const;
export type ExpenseType = (typeof EXPENSE_TYPES)[number];

export const DOCUMENT_TYPES = [
  'INVOICE',
  'PACKING_LIST',
  'QUOTATION',
  'PURCHASE_ORDER',
  'PAYMENT_RECEIPT',
  'SUPPLIER_RECEIPT',
  'SHIPPING_DOCUMENT',
  'CUSTOMS_DOCUMENT',
  'OTHER',
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const PAYMENT_METHODS = [
  'BANK_TRANSFER',
  'CASH',
  'CHEQUE',
  'CARD',
  'OTHER',
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
