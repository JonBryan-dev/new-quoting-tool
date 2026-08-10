import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Check, ClipboardCheck, Leaf, Phone,
  PoundSterling, ShieldCheck, X,
} from "lucide-react";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";

export const metadata: Metadata = {
  title: "£7,500 Boiler Upgrade Scheme Grant Explained | Staffordshire",
  description:
    "Plain-English guide to the £7,500 Boiler Upgrade Scheme heat pump grant for Staffordshire homeowners: who qualifies, how it works, and how we claim it for you so it comes straight off your quote.",
  alternates: { canonical: "/boiler-upgrade-scheme" },
  openGraph: {
    title: "The £7,500 Heat Pump Grant, Explained Simply",
    description:
      "Who qualifies for the Boiler Upgrade Scheme, what it covers, and how Staffordshire homeowners get it taken straight off their heat pump quote.",
    url: "https://www.plumbgasrenewables.services/boiler-upgrade-scheme",
  },
};

const FAQS = [
  {
    q: "What is the Boiler Upgrade Scheme?",
    a: "The Boiler Upgrade Scheme (BUS) is a government grant that pays £7,500 towards the cost of replacing a fossil-fuel boiler (gas, oil or LPG) with an air source heat pump in England and Wales. It runs until 2028 and the money goes to your MCS-certified installer, who deducts it from your bill — you never handle it.",
  },
  {
    q: "Who qualifies for the £7,500 grant?",
    a: "You qualify if you own your home (including landlords and second homes in most cases), you're replacing a fossil fuel heating system, and the property has a valid EPC. New-build homes generally don't qualify, but self-builds do. Most Staffordshire homeowners we survey are eligible.",
  },
  {
    q: "Do I have to apply for the grant myself?",
    a: "No — the installer applies, not the homeowner. As an MCS-accredited installer we handle the entire application and simply take £7,500 off your quote. You'll see it as a line item deduction, and you only ever pay the after-grant price.",
  },
  {
    q: "Do I need loft or cavity wall insulation first?",
    a: "Since 2024 there is no longer a requirement to install loft or cavity wall insulation before getting the grant. That said, insulation lowers the heat pump size you need and your running costs, so we'll give you honest advice at your free heat loss survey if it's worth doing first.",
  },
  {
    q: "Can I get the grant for a hybrid system or a boiler?",
    a: "No — the BUS grant only covers full heat pump systems (air source, ground source or, in some cases, biomass). It cannot be used for a new gas boiler or a hybrid gas/heat-pump setup.",
  },
  {
    q: "How long will the grant be available?",
    a: "The scheme is currently funded until 2028, but each year has a fixed budget and vouchers are issued first-come, first-served. A voucher, once issued for your property, is valid for three months — plenty of time for a typical installation.",
  },
];

export default function BoilerUpgradeSchemePage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Boiler Upgrade Scheme</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-50 px-4 py-1.5 rounded-full text-sm mb-5 backdrop-blur">
            <PoundSterling className="w-4 h-4 text-[#7ee2a8]" />
            Government grant &bull; Funded until 2028
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            The &pound;7,500 heat pump grant,{" "}
            <span className="text-[#7ee2a8]">explained simply</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            The Boiler Upgrade Scheme takes &pound;7,500 off the cost of replacing your
            gas, oil or LPG boiler with an air source heat pump. Here&apos;s exactly how
            it works for Staffordshire homeowners &mdash; and how we handle every bit of
            the paperwork for you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Check Your Eligibility &mdash; Free Survey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Do you qualify?
            </h2>
            <p className="text-gray-600 mb-6">
              Most owner-occupied homes in Staffordshire qualify. The quick checklist:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "You own the property (landlords count too)",
                "You're replacing a gas, oil or LPG boiler — or electric storage heating",
                "The property is in England or Wales with an EPC",
                "The new system is installed by an MCS-certified installer (that's us)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#1C834B] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-gray-900 mb-3">What it doesn&apos;t cover</h3>
            <ul className="space-y-3">
              {[
                "Most new-build homes (self-builds are the exception)",
                "New gas boilers or hybrid gas/heat-pump systems",
                "Homes that already had grant-funded low-carbon heating",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border border-green-100 p-8">
              <h3 className="font-bold text-gray-900 mb-5">How the grant reaches you</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: <ClipboardCheck className="w-5 h-5" />,
                    title: "1. Free heat loss survey",
                    desc: "We size your system and give you a fixed quote showing the £7,500 already deducted.",
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: "2. We apply on your behalf",
                    desc: "As the MCS installer, we submit the Boiler Upgrade Scheme application — you just confirm one email from Ofgem.",
                  },
                  {
                    icon: <Leaf className="w-5 h-5" />,
                    title: "3. You pay the after-grant price",
                    desc: "The grant is paid to us directly, so your bill is simply £7,500 lighter. No claiming, no waiting for a refund.",
                  },
                ].map((s) => (
                  <div key={s.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-white text-[#1C834B] rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#1C834B]/40 p-6">
              <p className="text-sm font-semibold text-[#1C834B] mb-2">
                With the grant + ZeroDisrupt:
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                from ~&pound;3,000 installed
              </p>
              <p className="text-sm text-gray-500 mb-4">
                About the same price as a new gas boiler — through Heat Geek&apos;s
                smart-design ZeroDisrupt system, installed locally by us.
              </p>
              <Link
                href="/zerodisrupt"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C834B] hover:underline"
              >
                How boiler-price heat pumps work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instant estimate — Heat Geek */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <HeatGeekEstimateSection
            compact
            heading="See your price with the grant applied"
            sub="Two minutes, no obligation — your estimate comes back with the £7,500 Boiler Upgrade Scheme grant already deducted."
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Boiler Upgrade Scheme FAQs
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
            Find out what you&apos;d pay after the grant
          </h2>
          <p className="text-gray-500 mb-6">
            Book your free heat loss survey &mdash; we&apos;ll confirm your eligibility on
            the spot and give you a fixed price with the &pound;7,500 already applied.
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
