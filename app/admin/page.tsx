import Link from "next/link";
import Image from "next/image";
import AdminShell, { NotAdmin } from "@/components/AdminShell";
import { deleteVehicle } from "./actions";
import { requireAdmin } from "@/lib/supabase/server";
import { naira } from "@/lib/site";
import type { Enquiry, Vehicle } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fleet Manager", robots: { index: false } };

export default async function AdminHome() {
  const admin = await requireAdmin();
  if (!admin) return <NotAdmin />;
  const [{ data: vehicles }, { data: enquiries }] = await Promise.all([
    admin.supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
    admin.supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(50),
  ]);
  const vs = (vehicles ?? []) as Vehicle[];
  const es = (enquiries ?? []) as Enquiry[];

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vehicles ({vs.length})</h1>
        <Link href="/admin/vehicles/new" className="btn-gold">+ Add vehicle</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead className="bg-navy-900 text-left text-white">
            <tr><th className="p-3">Vehicle</th><th>Category</th><th>Daily</th><th>Weekly</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {vs.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <Image src={v.image_url} alt="" width={64} height={42} className="rounded object-cover h-[42px]" />
                  <span className="font-semibold">{v.name}</span>
                </td>
                <td>{v.category}</td>
                <td>{naira(v.daily_rate)}</td>
                <td>{naira(v.weekly_rate)}</td>
                <td>{v.published ? "Live" : "Hidden"}{v.featured && " · ★"}</td>
                <td className="pr-3">
                  <div className="flex gap-3 justify-end">
                    <Link href={`/admin/vehicles/${v.id}`} className="font-semibold text-gold-dark">Edit</Link>
                    <form action={deleteVehicle}>
                      <input type="hidden" name="id" value={v.id} />
                      <button className="font-semibold text-red-600">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 text-2xl font-bold">Recent enquiries</h2>
      <div className="mt-4 grid gap-3">
        {es.length ? es.map((e) => (
          <div key={e.id} className="rounded-xl bg-white p-5 ring-1 ring-black/5">
            <div className="flex flex-wrap justify-between gap-2">
              <p className="font-bold">{e.name} · <a href={`tel:${e.phone}`} className="text-gold-dark">{e.phone}</a>{e.email && ` · ${e.email}`}</p>
              <p className="text-xs text-navy-700/60">{new Date(e.created_at).toLocaleString("en-NG")}</p>
            </div>
            {e.vehicle && <p className="mt-1 text-sm">Vehicle: {e.vehicle}</p>}
            <p className="mt-2 text-sm text-navy-700/80 whitespace-pre-line">{e.message}</p>
          </div>
        )) : <p className="text-navy-700/60">No enquiries yet.</p>}
      </div>
    </AdminShell>
  );
}
