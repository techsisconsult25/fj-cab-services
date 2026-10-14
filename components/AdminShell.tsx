import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-display text-xl">Fleet <span className="text-gold">Manager</span></Link>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/" className="hover:text-gold">View site</Link>
            <form action={signOut}><button className="hover:text-gold">Sign out</button></form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}

export function NotAdmin() {
  return (
    <div className="min-h-screen grid place-items-center p-5 text-center">
      <div>
        <h1 className="text-2xl font-bold">No admin access</h1>
        <p className="mt-2 text-navy-700/70">This account isn&apos;t listed as an admin, or Supabase isn&apos;t connected yet. See the README.</p>
        <form action={signOut} className="mt-5"><button className="btn-gold">Sign out</button></form>
      </div>
    </div>
  );
}
