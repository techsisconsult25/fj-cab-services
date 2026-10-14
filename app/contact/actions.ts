"use server";
import { createClient, hasSupabase } from "@/lib/supabase/server";

export type ContactState = { ok: boolean; message: string } | null;

export async function sendEnquiry(_: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") || "").trim().slice(0, 120);
  const phone = String(form.get("phone") || "").trim().slice(0, 30);
  const email = String(form.get("email") || "").trim().slice(0, 200) || null;
  const vehicle = String(form.get("vehicle") || "").trim().slice(0, 120) || null;
  const message = String(form.get("message") || "").trim().slice(0, 2000);
  if (!name || phone.length < 5 || !message) return { ok: false, message: "Please fill in your name, phone and message." };

  if (!hasSupabase()) return { ok: true, message: "Thanks! (Demo mode: connect Supabase to store enquiries.)" };
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({ name, phone, email, vehicle, message });
  if (error) {
    console.error("enquiry insert:", error.message);
    return { ok: false, message: "Something went wrong. Please call or WhatsApp us instead." };
  }
  return { ok: true, message: "Thank you! Our team will contact you shortly." };
}
