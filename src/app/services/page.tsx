import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Flame, Layers, Phone, Ruler, Thermometer, Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Heat Pumps, Surveys, Servicing & Underfloor Heating",
  description:
    "Everything PlumbGas Renewables does across Staffordshire: air source heat pump installation, free heat loss surveys and system design, heat pump servicing, underfloor heating and boiler installation.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    href: "/services/heat-pump-installation",
    icon: <Thermometer className="w-7 h-7" />,
    title: "Air Source Heat Pump Installation",
    desc: "Survey-first, MCS-certified installation with the £7,500 grant handled for you. Vaillant, Viessmann and Daikin systems from 5–16kW.",
    highlight: "from around £3,000 after grant — same price as a gas boiler",
  },
  {
    href: "/services/heat-loss-surveys",
    icon: <Ruler className="w-7 h-7" />,
    title: "Heat Loss Surveys & System Design",
    desc: "Room-by-room heat loss calculations and Heat Geek-standard design — the 45 minutes that makes a heat pump brilliant instead of disappointing.",
    highlight: "Free with every quote",
  },
  {
    href: "/services/heat-pump-servicing",
    icon: <Wrench className="w-7 h-7" />,
    title: "Heat Pump Servicing & Maintenance",
    desc: "Annual servicing that protects your warranty and your efficiency — any brand, whoever installed it. Care plans available.",
    highlight: "All brands covered",
  },
  {
    href: "/services/underfloor-heating",
    icon: <Layers className="w-7 h-7" />,
    title: "Underfloor Heating",
    desc: "Wet UFH for new floors, extensions and low-profile retrofits — the perfect low-temperature partner for a heat pump.",
    highlight: "Screed & overlay systems",
  },
  {
    href: "/quote/boiler",
    icon: <Flame className="w-7 h-7" />,
    title: "Boiler Installation",
    desc: "Not ready for a heat pump? Fixed-price Worcester Bosch, Vaillant, Ideal and Navien boiler installation, quoted online in 90 seconds.",
    highlight: "from £1,595 installed",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            What we do
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Low-temperature heating done properly, across the whole of Staffordshire —
            from the free survey that starts every project to the servicing that keeps
            it efficient for decades.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl hover:border-[#1C834B]/40 transition-all flex flex-col"
              >
                <div className="w-14 h-14 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  {s.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1C834B] transition-colors">
                  {s.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4 flex-1">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">{s.highlight}</span>
                  <span className="text-[#1C834B] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}

            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl p-7 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Not sure what you need?
              </h2>
              <p className="text-gray-600 text-sm mb-5">
                Start with the free heat loss survey — it tells you what your home
                actually needs, with a fixed price and no obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                >
                  Book Free Survey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:07872626573"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-5 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  07872 626573
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
