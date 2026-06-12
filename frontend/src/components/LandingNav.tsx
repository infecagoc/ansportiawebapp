import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function LandingNav() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-lg font-brand-bold text-blue-600">
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
          className="rounded-md bg-blue-600 px-4 py-2 font-brand-medium text-white hover:bg-blue-700"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
