import type { Metadata } from 'next';
import { whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services: Airport, Weddings, Corporate & VIP Transport',
  description:
    'Airport transfers, wedding and event cars, corporate transport, armoured VIP movement and self-drive rentals from FJ Cab Services.',
};

const services = [
  [
    '✈️',
    'Airport Transfers',
    'Meet-and-greet pickups and drop-offs at all major airports, tracked to your flight time.',
  ],
  [
    '💍',
    'Weddings & Events',
    'Elegant cars and convoy coordination for weddings, parties and special occasions.',
  ],
  [
    '💼',
    'Corporate Transport',
    'Daily, weekly and monthly packages for executives, staff and visiting partners.',
  ],
  [
    '🛡️',
    'VIP & Security Escort',
    'Armoured vehicles and trained drivers for high-profile and sensitive movement.',
  ],
  [
    '🔑',
    'Self-Drive Rental',
    'Selected sedans and SUVs available for self-drive with valid licence and ID.',
  ],
  [
    '🚌',
    'Group & Tour Travel',
    'Buses and vans for staff shuttles, excursions, church and school trips.',
  ],
];

export default function Services() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="eyebrow">What we do</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Our Services</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([i, t, d]) => (
          <div
            key={t}
            className="rounded-2xl bg-white p-7 ring-1 ring-black/5 flex flex-col"
          >
            <p className="text-4xl">{i}</p>
            <h2 className="mt-4 text-2xl font-bold">{t}</h2>
            <p className="mt-2 flex-1 text-navy-700/75">{d}</p>
            <a
              href={whatsappLink(
                `Hello FJ Cab Services, I'm interested in ${t}.`,
              )}
              className="mt-5 font-bold text-gold-dark"
            >
              Enquire on WhatsApp →
            </a>
          </div>
        ))}
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold">Self-drive requirements</h2>
          <ul className="mt-5 space-y-2 text-navy-700/80 list-disc pl-5">
            <li>Valid driver&apos;s licence (minimum 2 years)</li>
            <li>Government-issued ID and proof of address</li>
            <li>Refundable security deposit</li>
            <li>Minimum age of 25</li>
          </ul>
        </div>
      </section>
    </>
  );
}
