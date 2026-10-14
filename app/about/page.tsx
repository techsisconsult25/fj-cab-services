import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'FJ Cab Services is a reliable, professional car rental and mobility company serving individuals, families and businesses across Nigeria.',
};

export default function About() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="eyebrow">Who we are</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            About FJ Cab Services
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-4 text-lg text-navy-700/85">
          <p>
            FJ Cab Services is a Nigerian car rental and mobility company built
            around one promise: getting you where you need to be safely,
            comfortably and on time.
          </p>
          <p>
            From a quick airport pickup to a full wedding convoy or
            high-security executive movement, we pair a well-maintained fleet
            with experienced, vetted chauffeurs.
          </p>
          <p>
            Our clients include business travellers, corporate organisations,
            event planners, diplomats and families who expect a premium
            experience at a fair price.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/suv.jpg"
            alt="FJ Cab Services executive SUV"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 grid gap-6 md:grid-cols-3">
          {[
            [
              'Our mission',
              'To make premium, dependable mobility easy to access for everyone in Nigeria.',
            ],
            [
              'Our values',
              'Safety, punctuality, discretion and honest pricing on every trip.',
            ],
            [
              'Our promise',
              'Clean vehicles, professional drivers and a team that answers when you call.',
            ],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-cream p-7">
              <h2 className="text-2xl font-bold">{t}</h2>
              <p className="mt-2 text-navy-700/75">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
