import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Leaf, MapPin, Phone, PoundSterling,
  Ruler, TrendingDown, Volume2,
} from "lucide-react";
import { towns } from "@/lib/towns";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";

export const metadata: Metadata = {
  title: "Air Source Heat Pump Installation Staffordshire | £7,500 Grant",
  description:
    "MCS-accredited air source heat pump installers covering the whole of Staffordshire — Stafford, Stone, Cannock, Lichfield, Stoke-on-Trent and more. Free heat loss survey, £7,500 Boiler Upgrade Scheme grant handled for you.",
  alternates: { canonical: "/heat-pumps" },
  openGraph: {
    title: "Air Source Heat Pump Installation Across Staffordshire",
    description:
      "Free heat loss surveys and fixed-price heat pump installation with the £7,500 grant applied. Local, trusted engineers since 2003.",
    url: "https://www.plumbgasrenewables.services/heat-pumps",
  },
};

export default function HeatPumpsHubPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Heat Pumps</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Air source heat pump installation across{" "}
            <span className="text-[#7ee2a8]">Staffordshire</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Free heat loss surveys, fixed prices with the &pound;7,500 Boiler Upgrade
            Scheme grant already applied, and MCS-accredited installation from the
            local team trusted since 2003.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Book Your Free Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/quote/heatpump"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              Get an Instant Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {[
              {
                icon: <PoundSterling className="w-6 h-6" />,
                title: "£7,500 grant included",
                desc: "We claim the Boiler Upgrade Scheme for you — the grant comes straight off your fixed quote.",
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: "Cheaper to run",
                desc: "3–4kW of heat from every 1kW of electricity. Oil and LPG homes save the most.",
              },
              {
                icon: <Ruler className="w-6 h-6" />,
                title: "Survey-first sizing",
                desc: "Free room-by-room heat loss survey before any price is fixed — never guesswork.",
              },
              {
                icon: <Volume2 className="w-6 h-6" />,
                title: "Quiet, proven kit",
                desc: "Vaillant, Viessmann and Daikin units running at around 35dB — quieter than a fridge.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            New to heat pumps? Read our plain-English guide to the{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#1C834B] font-medium underline">
              &pound;7,500 Boiler Upgrade Scheme grant
            </Link>{" "}
            or get an{" "}
            <Link href="/quote/heatpump" className="text-[#1C834B] font-medium underline">
              instant online estimate
            </Link>{" "}
            for your home.
          </p>
        </div>
      </section>

      {/* Instant estimate — Heat Geek */}
      <HeatGeekEstimateSection />

      {/* Towns grid */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Where we install heat pumps
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Local pages for every area we cover — including typical costs, housing
              advice and the villages we serve around each town.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/heat-pumps/${town.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1C834B]/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#1C834B]" />
                  <span className="font-bold text-gray-900 group-hover:text-[#1C834B] transition-colors">
                    {town.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{town.postcodes.join(", ")}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#144E82] group-hover:translate-x-0.5 transition-transform">
                  Heat pumps in {town.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-[#1C834B] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            Free survey &bull; No obligation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Not sure where to start? Start with the survey.
          </h2>
          <p className="text-gray-500 mb-6">
            It&apos;s free, takes 45 minutes, and gives you a fixed price with the
            &pound;7,500 grant already applied.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Your Free Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
