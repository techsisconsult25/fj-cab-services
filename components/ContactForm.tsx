"use client";
import { useActionState } from "react";
import { sendEnquiry } from "@/app/contact/actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, null);
  if (state?.ok) return <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5 text-lg font-semibold">✅ {state.message}</div>;
  return (
    <form action={action} className="rounded-2xl bg-white p-7 ring-1 ring-black/5 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Full name *" required className="input" />
        <input name="phone" placeholder="Phone number *" required className="input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" placeholder="Email (optional)" className="input" />
        <input name="vehicle" placeholder="Vehicle of interest" className="input" />
      </div>
      <textarea name="message" rows={5} placeholder="Pickup date, location, number of days… *" required className="input" />
      {state && !state.ok && <p className="text-sm text-red-600">{state.message}</p>}
      <button disabled={pending} className="btn-gold">{pending ? "Sending…" : "Send Enquiry"}</button>
    </form>
  );
}
