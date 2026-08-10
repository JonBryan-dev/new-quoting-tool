import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Award, CalendarCheck, Heart, MapPin, Phone, Shield, Wrench,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "About Us | Meet the Team Behind PG Renewables, Stafford",
  description:
    "PG Renewables is run by Jon Bryan and the Stafford team behind PlumbGas Services, trusted local heating engineers since 2003. Gas Safe, MCS accredited and Which? Trusted Traders, now bringing boiler-price heat pumps to Staffordshire.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PG Renewables, Stafford",
    description:
      "The local team bringing properly designed, boiler-price heat pumps to Staffordshire homes.",
    url: `${SITE_URL}/about`,
  },
};

const VALUES = [
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Engineers first",
    desc: "We are working engineers, not a sales office. The person who surveys your home is the kind of person who installs it.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Accredited properly",
    desc: "Gas Safe registered, MCS accredited for heat pumps and endorsed as Which? Trusted Traders, with 270+ five-star Trustpilot reviews.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Genuinely local",
    desc: "Based in Stafford and covering the whole county. When you call, you get us, and if something needs a second visit, we are minutes away, not hours.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Design before price",
    desc: "Every job starts with a free room-by-room heat loss survey, because a heat pump only earns its keep when it is sized and designed right.",
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PG Renewables",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
      founder: { "@type": "Person", name: "Jon Bryan" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "27 Barnbank Lane",
        addressLocality: "Stafford",
        postalCode: "ST17 9HB",
        addressCountry: "GB",
      },
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            The team behind <span className="text-[#c4dd9b]">PG Renewables</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Stafford heating engineers since 2003, now bringing properly designed
            heat pumps to Staffordshire at the price of a gas boiler.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              From gas boilers to heat pumps, the honest way round
            </h2>
            <p className="text-gray-600 mb-4">
              PG Renewables is run by Jon Bryan and the team behind{" "}
              <a
                href="https://www.plumbgas.services"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4e7522] font-medium underline"
              >
                PlumbGas Services
              </a>
              , the Stafford heating firm that has looked after local boilers,
              bathrooms and heating systems since 2003. We have spent two decades
              inside Staffordshire homes, so we know exactly how they are built,
              how they lose heat and what it takes to keep them warm.
            </p>
            <p className="text-gray-600 mb-4">
              That experience is why we took heat pumps seriously before they were
              fashionable. We trained with Heat Geek, the UK&apos;s most respected
              heat pump education platform, earned MCS accreditation, and set up
              PG Renewables as the dedicated renewables arm of the business.
            </p>
            <p className="text-gray-600 mb-6">
              The turning point is ZeroDisrupt: heat pumps installed from around
              &pound;3,000 after the &pound;7,500 grant, the same price as a gas
              boiler. For the first time we can honestly tell a customer with a
              tired boiler that the better technology is also the sensible
              financial choice. That is a conversation we enjoy having.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-6 py-3.5 rounded-xl font-semibold transition-colors"
              >
                <CalendarCheck className="w-5 h-5" />
                Book a Free Survey
              </Link>
              <a
                href="tel:07872626573"
                className="inline-flex items-center justify-center gap-2 border border-[#4e7522] text-[#4e7522] hover:bg-green-50 px-6 py-3.5 rounded-xl font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/install-heat-pump-passage.jpg"
                alt="Twin-fan air source heat pump installed by PG Renewables in Staffordshire"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
              <Image
                src="/install-cylinder-plant-room.jpg"
                alt="Neat copper pipework and cylinder installed by PG Renewables"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            How we work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/accreditations"
              className="inline-flex items-center gap-2 text-[#4e7522] font-semibold hover:underline"
            >
              <Award className="w-4 h-4" />
              See our accreditations in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#144E82] to-[#4e7522] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Come and meet us, in your own kitchen
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            The free heat loss survey takes about 45 minutes. You get a fixed
            price, we get to prove we know what we are doing.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Book Your Free Survey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
