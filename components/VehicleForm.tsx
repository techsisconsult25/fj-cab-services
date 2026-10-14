import { saveVehicle } from "@/app/admin/actions";
import { categories } from "@/lib/site";
import type { Vehicle } from "@/lib/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1 text-sm font-semibold">{label}{children}</label>;
}

export default function VehicleForm({ v }: { v?: Vehicle }) {
  return (
    <form action={saveVehicle} className="rounded-2xl bg-white p-7 ring-1 ring-black/5 grid gap-5">
      {v && <input type="hidden" name="id" value={v.id} />}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name *"><input name="name" required defaultValue={v?.name} className="input" /></Field>
        <Field label="URL slug (auto if empty)"><input name="slug" defaultValue={v?.slug} className="input" /></Field>
        <Field label="Category *">
          <select name="category" defaultValue={v?.category ?? "Sedans"} className="input">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Tag (e.g. Ultra Luxury, Armoured)"><input name="tag" defaultValue={v?.tag ?? ""} className="input" /></Field>
        <Field label="Passengers"><input name="capacity" type="number" min={1} defaultValue={v?.capacity ?? 4} className="input" /></Field>
        <Field label="Luggage (bags)"><input name="luggage" type="number" min={0} defaultValue={v?.luggage ?? 2} className="input" /></Field>
        <Field label="Drive type"><input name="drive_type" defaultValue={v?.drive_type ?? "Chauffeur-driven"} className="input" /></Field>
        <Field label="Insurance"><input name="insurance" defaultValue={v?.insurance ?? "Comprehensive"} className="input" /></Field>
        <Field label="Coverage area"><input name="coverage_area" defaultValue={v?.coverage_area ?? "Lagos & Nationwide"} className="input" /></Field>
        <Field label="Photo (leave empty to keep current)"><input name="image" type="file" accept="image/*" className="input" /></Field>
        <Field label="Daily rate (₦) *"><input name="daily_rate" type="number" required min={0} defaultValue={v?.daily_rate} className="input" /></Field>
        <Field label="Weekly rate (₦) *"><input name="weekly_rate" type="number" required min={0} defaultValue={v?.weekly_rate} className="input" /></Field>
      </div>
      <Field label="Features (comma separated)"><input name="features" defaultValue={v?.features.join(", ")} className="input" /></Field>
      <Field label="Description"><textarea name="description" rows={3} defaultValue={v?.description ?? ""} className="input" /></Field>
      <div className="flex gap-6 text-sm font-semibold">
        <label className="flex gap-2"><input type="checkbox" name="published" defaultChecked={v?.published ?? true} /> Show on website</label>
        <label className="flex gap-2"><input type="checkbox" name="featured" defaultChecked={v?.featured} /> Feature on home page</label>
      </div>
      <button className="btn-gold w-fit">Save vehicle</button>
    </form>
  );
}
