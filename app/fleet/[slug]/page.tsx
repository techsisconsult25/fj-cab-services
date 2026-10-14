import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVehicle } from '@/lib/vehicles';
import { bookMessage, naira, site, whatsappLink } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVehicle((await params).slug);
  if (!v) return { title: 'Vehicle not found', robots: { index: false } };
  return {
    title: `${v.name} Hire, ${naira(v.daily_rate)}/day`,
    description: `Rent the ${v.name} (${v.category}) from FJ Cab Services. ${v.capacity} passengers, ${v.drive_type}. ${naira(v.daily_rate)} per day.`,
    openGraph: { images: [v.image_url] },
  };
}

export default async function VehicleDetail({ params }: Props) {
  const v = await getVehicle((await params).slug);
  if (!v) notFound();
  const specs = [
    ['Capacity', `${v.capacity} passengers`],
    ['Luggage', `${v.luggage} bags`],
    ['Drive type', v.drive_type],
    ['Insurance', v.insurance],
    ['Coverage area', v.coverage_area],
    ['Category', v.category],
  ];
  return (
    <>
      <section className="relative h-[55vh] min-h-80 bg-navy-900">
        <Image
          src={v.image_url}
          alt={v.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 mx-auto max-w-7xl px-5 pb-10 text-white">
          <Link href="/fleet" className="text-sm text-white/70 hover:text-gold">
            ← Back to fleet
          </Link>
          {v.tag && (
            <p className="mt-3 w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-900">
              {v.tag}
            </p>
          )}
          <h1 className="mt-2 text-4xl md:text-6xl font-bold">{v.name}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {v.description && (
            <p className="text-lg text-navy-700/80">{v.description}</p>
          )}
          <h2 className="mt-8 text-2xl font-bold">Specifications</h2>
          <dl className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map(([k, val]) => (
              <div
                key={k}
                className="rounded-xl bg-white p-4 ring-1 ring-black/5"
              >
                <dt className="text-xs uppercase tracking-wider text-navy-700/60">
                  {k}
                </dt>
                <dd className="mt-1 font-bold">{val}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-10 text-2xl font-bold">Features</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {v.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-gold-dark">✔</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-2xl bg-navy-900 p-7 text-white h-fit lg:sticky lg:top-24">
          <p className="eyebrow">Rates</p>
          <div className="mt-4 flex justify-between border-b border-white/10 pb-4">
            <span>Daily</span>
            <span className="text-2xl font-extrabold text-gold">
              {naira(v.daily_rate)}
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span>Weekly</span>
            <span className="text-2xl font-extrabold text-gold">
              {naira(v.weekly_rate)}
            </span>
          </div>
          <a
            href={whatsappLink(bookMessage(v.name, v.daily_rate))}
            target="_blank"
            rel="noopener"
            className="btn-gold mt-7 w-full"
          >
            Book Now on WhatsApp
          </a>
          <a href={`tel:${site.phone}`} className="btn-outline mt-3 w-full">
            📞 Call {site.phone}
          </a>
          <p className="mt-4 text-xs text-white/60">
            Availability, deposit and driver details are confirmed by our team.
          </p>
        </aside>
      </section>
    </>
  );
}
