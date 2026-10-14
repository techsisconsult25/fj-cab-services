'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/lib/site';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (path.startsWith('/admin')) return null;
  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur text-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gold text-navy-900 font-display font-bold">
            FJ
          </span>
          <span className="font-display text-xl font-bold">
            Cab <span className="text-gold">Services</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={
                path === n.href ? 'text-gold' : 'hover:text-gold transition'
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${site.phone}`}
          className="hidden md:inline-flex btn-gold !py-2"
        >
          📞 {site.phone}
        </a>
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-5 pb-5 font-semibold">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <a href={`tel:${site.phone}`} className="btn-gold">
            📞 Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
