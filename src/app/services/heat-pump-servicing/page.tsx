import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Check, ClipboardCheck, Droplets, Filter, Gauge,
  Phone, ShieldCheck, Snowflake, Thermometer, Wrench, Zap,
} from "lucide-react";
import LocalAreaLinks from "@/components/LocalAreaLinks";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Heat Pump Servicing & Maintenance Staffordshire | Annual Service",
  description:
    "Annual air source heat pump servicing and maintenance across Staffordshire. Protect your manufacturer warranty, keep efficiency high and catch problems early, local Gas Safe & MCS accredited engineers, care plans available.",
  alternates: { canonical: "/services/heat-pump-servicing" },
  openGraph: {
    title: "Heat Pump Servicing & Maintenance in Staffordshire",
    description:
      "Annual servicing that protects your warranty and your efficiency, from the local team that installs and maintains heat pumps across the county.",
    url: `${SITE_URL}/services/heat-pump-servicing`,
  },
};

const FAQS = [
  {
    q: "Do heat pumps really need an annual service?",
    a: "Yes, for two reasons. First, virtually every manufacturer requires an annual service by a competent engineer to keep the warranty valid, skip it and a compressor failure in year 6 becomes your bill. Second, small issues (dropping pressure, clogged filters, refrigerant issues) quietly cost you efficiency for months before they cause a breakdown. An annual visit catches them early.",
  },
  {
    q: "What's checked during a heat pump service?",
    a: "Our service covers the outdoor unit (coil condition, fan, refrigerant checks, electrical connections), the water circuit (pressure, inhibitor levels, glycol concentration where fitted, filters and strainers), the cylinder (anode/expansion vessel, immersion backup, safety valves), and the controls (weather compensation settings, schedules, error history). You get a written record for your warranty file.",
  },
  {
    q: "Can you service a heat pump you didn't install?",
    a: "Yes. We service all the major brands, Vaillant, Viessmann, Daikin, Mitsubishi and others, regardless of who installed the system. If the original installer has disappeared or you've moved into a home with a heat pump, we'll take it on, and the first visit includes a settings health-check because poorly tuned controls are the most common efficiency thief we find.",
  },
  {
    q: "Do you offer a care plan?",
    a: "Yes, PlumbGas has run heating care plans across Staffordshire for years, and heat pumps slot straight in: annual service, priority call-outs and repairs cover in one monthly payment. Ask about a care plan at your service visit or call the office for current pricing.",
  },
  {
    q: "My heat pump is working, but my bills seem high. Can you help?",
    a: "This is one of the most valuable visits we do. High bills on a working heat pump almost always mean a system running hotter than it needs to: wrong weather compensation curve, cylinder reheating too aggressively, or radiators throttled back forcing high flow temperatures. We'll review the settings, tune the system down to its efficient operating point and show you the before/after on the unit's own consumption data.",
  },
];

export default function HeatPumpServicingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Heat Pump Servicing & Maintenance",
    serviceType: "Air source heat pump servicing and maintenance",
    areaServed: "Staffordshire",
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "Annual air source heat pump servicing, efficiency tuning and maintenance care plans across Staffordshire, for systems from any installer.",
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Servicing &amp; Maintenance</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Heat pump servicing &amp;{" "}
            <span className="text-[#c4dd9b]">maintenance</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Keep your warranty valid, your efficiency high and your winter worry-free.
            Annual servicing across Staffordshire for any brand, whoever installed it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call to Book a Service
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              Or request a visit online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why + what's included */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A well-maintained heat pump is a cheap-to-run heat pump
            </h2>
            <p className="text-gray-600 mb-4">
              Heat pumps are famously low-maintenance, no combustion, no flue, no
              annual gas safety certificate. But low-maintenance isn&apos;t
              no-maintenance. A blocked filter, low system pressure or a drifting
              weather compensation curve won&apos;t stop your heating; it will just
              quietly add 10&ndash;20% to your electricity bill until someone looks.
            </p>
            <p className="text-gray-600 mb-4">
              An annual service keeps the system at the efficiency it was designed
              for, keeps the manufacturer warranty valid (most brands require it),
              and catches wearing parts before they fail in January when you need
              heat most.
            </p>
            <p className="text-gray-600 mb-6">
              We install and maintain heat pumps across Staffordshire, and we service
              systems from other installers too. Moved into a home with a heat pump?
              We&apos;ll adopt it, check its settings and look after it from there.
            </p>
            <ul className="space-y-3">
              {[
                "Keeps manufacturer warranties valid (up to 10 years)",
                "Written service record for your warranty file",
                "All major brands, Vaillant, Viessmann, Daikin, Mitsubishi & more",
                "Care plans available: service + priority call-outs + repairs cover",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="font-bold text-gray-900 mb-5">Your annual service covers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Snowflake className="w-5 h-5" />, title: "Outdoor unit", desc: "Coil, fan, defrost operation, refrigerant checks" },
                { icon: <Droplets className="w-5 h-5" />, title: "Water circuit", desc: "Pressure, inhibitor, glycol, leaks" },
                { icon: <Filter className="w-5 h-5" />, title: "Filters & strainers", desc: "Cleaned and checked for flow restriction" },
                { icon: <Thermometer className="w-5 h-5" />, title: "Hot water cylinder", desc: "Expansion vessel, valves, immersion backup" },
                { icon: <Gauge className="w-5 h-5" />, title: "Controls & tuning", desc: "Weather compensation, schedules, error history" },
                { icon: <Zap className="w-5 h-5" />, title: "Electrical checks", desc: "Connections, isolation, safe operation" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="w-9 h-9 bg-green-50 text-[#4e7522] rounded-lg flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-white rounded-xl border border-green-200 p-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Efficiency tune included:</strong>{" "}
                we don&apos;t just check the system works, we check it&apos;s running
                at the lowest flow temperature your home allows, because that&apos;s
                where the savings live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Servicing questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white border border-gray-200 rounded-xl p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Book your heat pump service
          </h2>
          <p className="text-gray-500 mb-6">
            One call, we&apos;ll get you booked in with a local engineer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <ClipboardCheck className="w-5 h-5" />
              Request a Visit Online
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-1.5">
            <Wrench className="w-4 h-4" />
            Thinking of an upgrade instead?{" "}
            <Link href="/services/heat-pump-installation" className="text-[#4e7522] underline">
              Heat pump installation
            </Link>
          </p>
        </div>
      </section>

      <LocalAreaLinks serviceSlug="heat-pump-servicing" heading="Heat pump servicing near you" />
    </div>
  );
}
