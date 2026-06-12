import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-center text-lg font-brand-bold text-blue-600">
          ANSPORTIA
        </Link>
        <h1 className="mb-6 text-center text-xl font-brand-semibold">{title}</h1>
        {children}
        {footer && <div className="mt-4 text-center text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  );
}
