import Link from 'next/link';
import type { Metadata } from 'next';
import VehicleCard from '@/components/VehicleCard';
import { getVehicles } from '@/lib/vehicles';
import { categories } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Fleet: Sedans, SUVs, Buses & Luxury Cars',
  description:
    'Browse every FJ Cab Services vehicle with clear daily rates. Sedans, SUVs, armoured vehicles, buses and luxury cars for hire in Nigeria.',
};

export default async function Fleet({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await getVehicles();
  const list = category ? all.filter((v) => v.category === category) : all;
  const tabs = ['All', ...categories];
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="eyebrow">Rental catalog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Our Fleet</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Every vehicle, every rate, no back and forth. Tap Book Now to
            reserve on WhatsApp.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = (t === 'All' && !category) || t === category;
            return (
              <Link
                key={t}
                href={
                  t === 'All'
                    ? '/fleet'
                    : `/fleet?category=${encodeURIComponent(t)}`
                }
                className={`rounded-full px-5 py-2 text-sm font-semibold ring-1 ring-navy-800/20 ${active ? 'bg-navy-900 text-gold' : 'bg-white hover:bg-navy-900 hover:text-white'}`}
              >
                {t}
              </Link>
            );
          })}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-navy-700/60">
            No vehicles in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
