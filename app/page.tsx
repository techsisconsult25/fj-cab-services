import Image from 'next/image';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import { getVehicles } from '@/lib/vehicles';
import { categories, site, whatsappLink } from '@/lib/site';

export const revalidate = 60;

const catImages: Record<string, string> = {
  Sedans: '/images/sedan.jpg',
  SUVs: '/images/suv.jpg',
  'Buses & Vans': '/images/bus.jpg',
  'Luxury/Executive': '/images/hero.jpg',
};

export default async function Home() {
  const featured = await getVehicles({ featured: true });
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <Image
          src="/images/hero.jpg"
          alt="Executive sedan at night in Lagos"
          fill
          priority
          className="object-cover -z-10 opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/80 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 py-28 md:py-40">
          <p className="eyebrow">Premium car rental · Nigeria</p>
          <h1 className="mt-4 max-w-2xl text-4xl md:text-6xl font-bold leading-tight">
            Arrive in style.{' '}
            <span className="text-gold">Travel with confidence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Executive sedans, SUVs, armoured vehicles and buses with
            professional chauffeurs, for airport runs, weddings, corporate trips
            and VIP movement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/fleet" className="btn-gold">
              Browse the Fleet
            </Link>
            <a
              href={whatsappLink("Hello FJ Cab Services, I'd like a quote.")}
              className="btn-outline"
            >
              Get a Quote on WhatsApp
            </a>
          </div>
          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 text-center">
            {[
              ['50+', 'Vehicles'],
              ['24/7', 'Availability'],
              ['5★', 'Client rating'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl text-gold">{n}</p>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Find your ride</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">
          Browse by category
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/fleet?category=${encodeURIComponent(c)}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-800"
            >
              <Image
                src={catImages[c]}
                alt={c}
                fill
                sizes="25vw"
                className="object-cover opacity-80 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
              <p className="absolute bottom-5 left-5 font-display text-2xl text-white">
                {c} <span className="text-gold">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                Our flagship vehicles
              </h2>
            </div>
            <Link href="/fleet" className="font-bold text-gold-dark">
              View full fleet →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Why FJ Cab Services</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">
          Built on reliability
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            [
              '🛡️',
              'Fully insured',
              'Every vehicle carries comprehensive insurance.',
            ],
            [
              '🧑‍✈️',
              'Vetted chauffeurs',
              'Trained, courteous and security-conscious drivers.',
            ],
            [
              '⏱️',
              'Always on time',
              'Punctual pickups, 24 hours a day, 7 days a week.',
            ],
            [
              '💬',
              'Instant booking',
              'Clear prices, one tap to WhatsApp or call.',
            ],
          ].map(([i, t, d]) => (
            <div
              key={t}
              className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
            >
              <p className="text-3xl">{i}</p>
              <h3 className="mt-3 text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-navy-700/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-800 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Ready to ride?</h2>
            <p className="mt-2 text-white/70">
              Talk to our team now. We respond in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${site.phone}`} className="btn-outline">
              📞 Call {site.phone}
            </a>
            <a
              href={whatsappLink(
                "Hello FJ Cab Services, I'd like to book a vehicle.",
              )}
              className="btn-gold"
            >
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
