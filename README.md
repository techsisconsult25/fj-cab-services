# FJ Cab Services: Car Rental Website

Next.js 16 + Supabase + Tailwind CSS v4. Built by TechSis Consult.

## 1. Run it locally (works instantly with demo cars)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without Supabase keys the site shows built-in demo cars, so you can present it right away.

## 2. Connect Supabase

1. Create a free project at https://supabase.com
2. Open **SQL Editor**, paste all of `supabase/schema.sql`, click **Run**. This creates the tables, security rules, photo storage and 8 sample cars.
3. Go to **Project Settings → API**, copy the **Project URL** and **anon public key** into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. Create the admin account: **Authentication → Users → Add user** (email + password, tick "Auto confirm"). Then in SQL Editor run:
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. Restart `npm run dev` and sign in at http://localhost:3000/admin

## 3. Push to GitHub

```bash
git init && git add . && git commit -m "FJ Cab Services site"
git branch -M main
git remote add origin https://github.com/<you>/fj-cab-services.git
git push -u origin main
```

## 4. Deploy to Vercel

1. https://vercel.com → **Add New Project** → import the GitHub repo
2. Add the same environment variables from `.env.local`
3. Click **Deploy**. Connect the client's domain under **Settings → Domains**.

## Customising

- Phone / WhatsApp / email: `.env.local` (or defaults in `lib/site.ts`)
- Social links and address: `lib/site.ts`
- Colours and fonts: `app/globals.css` and `app/layout.tsx`
- Demo photos: `public/images/`. Replace with the client's real fleet via the admin page.
- **Tawk.to live chat:** paste the widget in `app/layout.tsx` where marked, e.g.
  ```tsx
  import Script from 'next/script';
  <Script
    id="tawk"
    strategy="lazyOnload"
  >{`var Tawk_API=Tawk_API||{};(function(){var s=document.createElement("script");s.async=true;s.src="https://embed.tawk.to/YOUR_ID/default";document.head.appendChild(s);})();`}</Script>;
  ```

## Structure

```
app/            pages (home, fleet, fleet/[slug], services, about, contact, admin)
components/     header, footer, cards, forms
lib/            site settings, Supabase clients, data helpers
supabase/       schema.sql (run once)
public/images/  demo vehicle photos
```
