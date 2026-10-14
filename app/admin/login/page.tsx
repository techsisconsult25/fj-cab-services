"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setLoading(false);
    if (error) return setError(error.message);
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen grid place-items-center bg-navy-900 px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 grid gap-4">
        <h1 className="text-2xl font-bold">Fleet Manager Login</h1>
        <input name="email" type="email" placeholder="Email" required className="input" />
        <input name="password" type="password" placeholder="Password" required className="input" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn-gold">{loading ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}
