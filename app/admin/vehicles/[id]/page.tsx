import { notFound } from "next/navigation";
import AdminShell, { NotAdmin } from "@/components/AdminShell";
import VehicleForm from "@/components/VehicleForm";
import { requireAdmin } from "@/lib/supabase/server";
import type { Vehicle } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditVehicle({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return <NotAdmin />;
  const { data } = await admin.supabase.from("vehicles").select("*").eq("id", (await params).id).maybeSingle();
  if (!data) notFound();
  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl font-bold">Edit {(data as Vehicle).name}</h1>
      <VehicleForm v={data as Vehicle} />
    </AdminShell>
  );
}
