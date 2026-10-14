import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us: Book a Car',
  description:
    'Call, WhatsApp or send an enquiry to FJ Cab Services. Fast responses for car hire across Lagos and Nigeria.',
};

export default function Contact() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Contact Us</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <a
            href={`tel:${site.phone}`}
            className="block rounded-2xl bg-navy-900 p-6 text-white hover:bg-navy-800"
          >
            <p className="eyebrow">Call us</p>
            <p className="mt-1 text-2xl font-bold">{site.phone}</p>
          </a>
          <a
            href={whatsappLink('Hello FJ Cab Services')}
            className="block rounded-2xl bg-navy-900 p-6 text-white hover:bg-navy-800"
          >
            <p className="eyebrow">WhatsApp</p>
            <p className="mt-1 text-2xl font-bold">Chat with us</p>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="block rounded-2xl bg-navy-900 p-6 text-white hover:bg-navy-800"
          >
            <p className="eyebrow">Email</p>
            <p className="mt-1 text-lg font-bold">{site.email}</p>
          </a>
          <iframe
            title="Map"
            className="h-56 w-full rounded-2xl"
            loading="lazy"
            src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
          />
        </div>
      </section>
    </>
  );
}
