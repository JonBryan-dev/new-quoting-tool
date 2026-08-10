import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heat Pump Installation Stafford & Staffordshire | PG Renewables",
    template: "%s | PlumbGas Renewables",
  },
  description:
    "Free heat loss surveys and air source heat pump installation across Staffordshire. £7,500 Boiler Upgrade Scheme grant handled for you. MCS & Gas Safe engineers, Which? Trusted Traders, 4.9★ on Trustpilot.",
  keywords: [
    "air source heat pump Staffordshire",
    "heat pump installation Stafford",
    "free heat loss survey",
    "boiler upgrade scheme grant",
    "heat pump installers Stone Uttoxeter Cannock Lichfield",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PlumbGas Renewables",
    title: "Air Source Heat Pumps Staffordshire | Free Heat Loss Survey",
    description:
      "Book a free heat loss survey and get a fixed-price heat pump quote with the £7,500 government grant already applied. Trusted local engineers covering all of Staffordshire.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Source Heat Pumps Staffordshire | Free Heat Loss Survey",
    description:
      "Free heat loss surveys and heat pump installation across Staffordshire with the £7,500 grant handled for you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "PlumbGas Renewables",
  url: SITE_URL,
  telephone: "+441785663990",
  email: "info@plumbgasrenewables.services",
  founder: { "@type": "Person", name: "Jon Bryan" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Barnbank Lane",
    addressLocality: "Stafford",
    addressRegion: "Staffordshire",
    postalCode: "ST17 9HB",
    addressCountry: "GB",
  },
  areaServed: [
    "Stafford", "Stone", "Uttoxeter", "Cannock", "Rugeley", "Lichfield",
    "Penkridge", "Eccleshall", "Gnosall", "Stoke-on-Trent", "Newcastle-under-Lyme",
    "Cheadle", "Leek", "Burton upon Trent", "Tamworth", "Staffordshire",
  ],
  description:
    "Air source heat pump installation and free heat loss surveys across Staffordshire. £7,500 Boiler Upgrade Scheme grant applications handled for customers.",
  openingHours: "Mo-Fr 08:00-19:00",
  memberOf: [
    { "@type": "Organization", name: "MCS (Microgeneration Certification Scheme)" },
    { "@type": "Organization", name: "Gas Safe Register" },
    { "@type": "Organization", name: "Which? Trusted Traders" },
  ],
  knowsAbout: [
    "Air source heat pumps",
    "Heat loss surveys",
    "Boiler Upgrade Scheme",
    "Underfloor heating",
    "Heat pump servicing",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Free Heat Loss Survey",
        description: "Free room-by-room heat loss survey for heat pump sizing, with no obligation.",
      },
      price: "0",
      priceCurrency: "GBP",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Air Source Heat Pump Installation",
        description: "MCS-certified air source heat pump installation with the £7,500 Boiler Upgrade Scheme grant applied.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
