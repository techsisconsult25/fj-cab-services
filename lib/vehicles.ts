import { createClient, hasSupabase } from "./supabase/server";
import { demoVehicles } from "./demo-data";
import type { Vehicle } from "./types";

export async function getVehicles(opts: { featured?: boolean } = {}): Promise<Vehicle[]> {
  if (!hasSupabase()) return demoVehicles.filter((v) => !opts.featured || v.featured);
  const supabase = await createClient();
  let q = supabase.from("vehicles").select("*").eq("published", true).order("daily_rate");
  if (opts.featured) q = q.eq("featured", true);
  const { data, error } = await q;
  if (error) {
    console.error("getVehicles:", error.message);
    return [];
  }
  return data as Vehicle[];
}

export async function getVehicle(slug: string): Promise<Vehicle | null> {
  if (!hasSupabase()) return demoVehicles.find((v) => v.slug === slug) ?? null;
  const supabase = await createClient();
  const { data } = await supabase.from("vehicles").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return (data as Vehicle) ?? null;
}
