import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

export interface NavItem {
  href: string;
  label: string;
}

interface Props {
  title: string;
  nav: NavItem[];
  children: ReactNode;
}

/**
 * Generic sidebar + content shell reused by the admin and customer areas.
 */
export default function DashboardLayout({ title, nav, children }: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 shrink-0 border-r bg-white px-4 py-6">
        <div className="mb-6 px-2 text-lg font-brand-bold text-blue-600">ANSPORTIA</div>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-brand-medium ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 px-8 py-6">
        <h1 className="mb-6 text-2xl font-brand-semibold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
