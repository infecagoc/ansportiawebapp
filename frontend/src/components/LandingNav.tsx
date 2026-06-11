import Link from 'next/link';

const links = [
  { href: '/landing', label: 'Home' },
  { href: '/landing/about', label: 'About' },
  { href: '/landing/features', label: 'Features' },
  { href: '/landing/pricing', label: 'Pricing' },
  { href: '/landing/contact', label: 'Contact' },
];

export default function LandingNav() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/landing" className="text-lg font-bold text-blue-600">
        ANSPORTIA
      </Link>
      <nav className="flex items-center gap-5 text-sm text-gray-600">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-gray-900">
            {l.label}
          </Link>
        ))}
        <Link
          href="/auth/login"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
