'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, whatsappLink } from '@/lib/site';

export default function Footer() {
  if (usePathname().startsWith('/admin')) return null;
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-white">
            FJ Cab <span className="text-gold">Services</span>
          </p>
          <p className="mt-3 max-w-sm text-sm">
            Reliable, professional car rental and mobility across Nigeria, from
            airport pickups to VIP and armoured movement.
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={site.socials.facebook} className="hover:text-gold">
              Facebook
            </a>
            <a href={site.socials.instagram} className="hover:text-gold">
              Instagram
            </a>
            <a href={site.socials.linkedin} className="hover:text-gold">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <p className="eyebrow mb-3">Explore</p>
          <Link href="/fleet" className="block hover:text-gold">
            Our Fleet
          </Link>
          <Link href="/services" className="block hover:text-gold">
            Services
          </Link>
          <Link href="/about" className="block hover:text-gold">
            About Us
          </Link>
          <Link href="/contact" className="block hover:text-gold">
            Contact
          </Link>
        </div>
        <div className="text-sm space-y-2">
          <p className="eyebrow mb-3">Reach us</p>
          <a href={`tel:${site.phone}`} className="block hover:text-gold">
            {site.phone}
          </a>
          <a
            href={whatsappLink('Hello FJ Cab Services')}
            className="block hover:text-gold"
          >
            WhatsApp
          </a>
          <a href={`mailto:${site.email}`} className="block hover:text-gold">
            {site.email}
          </a>
          <p>{site.address}</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
