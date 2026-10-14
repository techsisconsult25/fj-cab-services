import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { bookMessage, naira, site, whatsappLink } from "@/lib/site";

export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-xl transition flex flex-col">
      <Link href={`/fleet/${v.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-navy-800">
        <Image src={v.image_url} alt={v.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition duration-500" />
        {v.tag && <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-900">{v.tag}</span>}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-700/60">{v.category}</p>
        <Link href={`/fleet/${v.slug}`}><h3 className="mt-1 text-xl font-bold hover:text-gold-dark">{v.name}</h3></Link>
        <p className="mt-1 text-sm text-navy-700/70">👥 {v.capacity} passengers · 🧳 {v.luggage} bags</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {v.features.slice(0, 4).map((f) => (
            <li key={f} className="rounded-full bg-cream px-2.5 py-1 text-xs">{f}</li>
          ))}
        </ul>
        <p className="mt-4 text-2xl font-extrabold">{naira(v.daily_rate)}<span className="text-sm font-medium text-navy-700/60"> / day</span></p>
        <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
          <a href={`tel:${site.phone}`} className="btn-outline !px-3 text-navy-900">Call Us</a>
          <a href={whatsappLink(bookMessage(v.name, v.daily_rate))} target="_blank" rel="noopener" className="btn-gold !px-3">Book Now</a>
        </div>
      </div>
    </article>
  );
}
