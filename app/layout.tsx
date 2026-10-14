import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["600", "700"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Car Rental in Lagos, Nigeria`, template: `%s | ${site.name}` },
  description: "Executive car hire in Nigeria: sedans, SUVs, armoured vehicles, buses and luxury cars with chauffeurs. Book on WhatsApp in one tap.",
  openGraph: { type: "website", siteName: site.name, images: ["/images/hero.jpg"] },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: site.name,
  telephone: site.phone,
  email: site.email,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        {/* TAWK.TO LIVE CHAT: paste your Tawk.to widget <Script> here (see README) */}
      </body>
    </html>
  );
}
