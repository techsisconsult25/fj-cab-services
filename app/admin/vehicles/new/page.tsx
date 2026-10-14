import AdminShell, { NotAdmin } from "@/components/AdminShell";
import VehicleForm from "@/components/VehicleForm";
import { requireAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewVehicle() {
  if (!(await requireAdmin())) return <NotAdmin />;
  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl font-bold">Add vehicle</h1>
      <VehicleForm />
    </AdminShell>
  );
}
