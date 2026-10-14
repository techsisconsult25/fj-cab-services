"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, requireAdmin } from "@/lib/supabase/server";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function uploadImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File | null) {
  if (!file || file.size === 0) return null;
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");
  const path = `${Date.now()}-${slugify(file.name)}`;
  const { error } = await supabase.storage.from("vehicle-images").upload(path, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  return supabase.storage.from("vehicle-images").getPublicUrl(path).data.publicUrl;
}

function parse(form: FormData) {
  const name = String(form.get("name") || "").trim();
  return {
    name,
    slug: slugify(String(form.get("slug") || "") || name),
    category: String(form.get("category")),
    tag: String(form.get("tag") || "") || null,
    capacity: Number(form.get("capacity") || 4),
    luggage: Number(form.get("luggage") || 2),
    drive_type: String(form.get("drive_type") || "Chauffeur-driven"),
    insurance: String(form.get("insurance") || "Comprehensive"),
    coverage_area: String(form.get("coverage_area") || "Lagos & Nationwide"),
    features: String(form.get("features") || "").split(",").map((s) => s.trim()).filter(Boolean),
    daily_rate: Number(form.get("daily_rate")),
    weekly_rate: Number(form.get("weekly_rate")),
    description: String(form.get("description") || "") || null,
    featured: form.get("featured") === "on",
    published: form.get("published") === "on",
  };
}

export async function saveVehicle(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Not authorised");
  const id = String(form.get("id") || "");
  const values = parse(form);
  const image = await uploadImage(admin.supabase, form.get("image") as File | null);
  const row = image ? { ...values, image_url: image } : values;

  const { error } = id
    ? await admin.supabase.from("vehicles").update(row).eq("id", id)
    : await admin.supabase.from("vehicles").insert({ ...row, image_url: image || "/images/sedan.jpg" });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deleteVehicle(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Not authorised");
  await admin.supabase.from("vehicles").delete().eq("id", String(form.get("id")));
  revalidatePath("/", "layout");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
