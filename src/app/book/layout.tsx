import type { Metadata } from "next";

// The booking page itself is a client component, so it cannot export
// metadata. Without this it inherited the site-wide default title, which
// wasted a page drawing 160 Search Console impressions a week.

export const metadata: Metadata = {
  title: "Book a Free Heat Loss Survey | Staffordshire",
  description:
    "Book a free, no-obligation heat loss survey anywhere in Staffordshire. Room by room, about 45 minutes, leading to a fixed-price heat pump quote.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Free Heat Loss Survey in Staffordshire",
    description:
      "Free room-by-room survey, no obligation, leading to a fixed-price quote with the grant already taken off.",
    url: "https://www.plumbgasrenewables.services/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
