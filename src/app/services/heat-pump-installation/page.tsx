import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CalendarCheck, Check, ClipboardCheck, Leaf, Phone,
  PoundSterling, Ruler, ShieldCheck, Thermometer, Wrench,
} from "lucide-react";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";
import InstallGallery from "@/components/InstallGallery";
import { photosFor } from "@/lib/install-photos";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Air Source Heat Pump Installation Staffordshire | MCS Certified",
  description:
    "MCS-certified air source heat pump installation across Staffordshire from around £3,000 after the £7,500 grant — the same price as a gas boiler. Survey-first design, Vaillant, Viessmann & Daikin systems, 2-year workmanship warranty. Book a free heat loss survey.",
  alternates: { canonical: "/services/heat-pump-installation" },
  openGraph: {
    title: "Air Source Heat Pump Installation in Staffordshire",
    description:
      "Survey-first, MCS-certified heat pump installation with the £7,500 grant handled for you.",
    url: `${SITE_URL}/services/heat-pump-installation`,
  },
};

const FAQS = [
  {
    q: "How long does a heat pump installation take?",
    a: "Most installations take 2–4 days. A straightforward swap where the cylinder location and radiators are already suitable sits at the shorter end; adding a cylinder, upgrading several radiators or running new pipework pushes towards 4 days. You'll have hot water restored each evening, and we agree the schedule with you before we start.",
  },
  {
    q: "Will I need new radiators?",
    a: "Sometimes, but less often than people expect. Heat pumps run at lower flow temperatures than boilers, so each radiator needs enough surface area for its room. Our heat loss survey checks every radiator against its room's demand — typically only two or three need upsizing in an average home, and many need none. Any changes are itemised in your fixed quote before you commit.",
  },
  {
    q: "Do I need planning permission?",
    a: "Almost never. Air source heat pumps are permitted development for most homes in England provided the unit meets siting and noise conditions — which the units we install (around 35dB) comfortably do. Listed buildings and conservation areas can need consent; we'll flag this at your survey if it applies.",
  },
  {
    q: "What happens to my old boiler?",
    a: "We decommission and remove it as part of the installation, including safely capping the gas supply if you want the meter kept for cooking, or supporting a full gas disconnection if you're going all-electric. Removal and disposal are included in your fixed price.",
  },
  {
    q: "What warranty do I get?",
    a: "The heat pump carries its manufacturer warranty — up to 7 years on Vaillant, up to 10 years on Viessmann — and our own 2-year workmanship warranty covers the installation itself. MCS certification also gives you access to an independent complaints and resolution process, though in 20+ years we've built our name on not needing one.",
  },
];

const STEPS = [
  {
    icon: <Ruler className="w-5 h-5" />,
    title: "Free heat loss survey",
    desc: "Room-by-room measurement of your home's heat demand — the foundation every good installation is built on.",
  },
  {
    icon: <ClipboardCheck className="w-5 h-5" />,
    title: "System design & fixed quote",
    desc: "Heat pump size, cylinder, emitter check and flow temperature designed for your home, priced with the £7,500 grant deducted.",
  },
  {
    icon: <PoundSterling className="w-5 h-5" />,
    title: "Grant application handled",
    desc: "We submit your Boiler Upgrade Scheme application as your MCS installer — you just confirm one email.",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Installation (2–4 days)",
    desc: "Outdoor unit, cylinder, controls and any radiator upgrades — tidy, planned and agreed in advance.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Commissioning & handover",
    desc: "Full commissioning, MCS certificate, controls walkthrough, and settings tuned for efficiency, not just heat.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Aftercare",
    desc: "2-year workmanship warranty, manufacturer warranty registered for you, and a local team on the phone if you need us.",
  },
];

export default function HeatPumpInstallationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Air Source Heat Pump Installation",
    serviceType: "Air source heat pump installation",
    areaServed: "Staffordshire",
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "MCS-certified air source heat pump installation across Staffordshire with survey-first design and the £7,500 Boiler Upgrade Scheme grant applied.",
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
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Heat Pump Installation</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Air source heat pump installation,{" "}
            <span className="text-[#7ee2a8]">done properly</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Survey-first design, MCS-certified installation and the &pound;7,500 grant
            handled for you — across Stafford, Stone, Cannock, Lichfield and the whole
            of Staffordshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Book a Free Heat Loss Survey
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

      {/* Why survey-first */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A heat pump is only as good as its design
            </h2>
            <p className="text-gray-600 mb-4">
              Heat pumps have had bad press from exactly one thing: poor installations.
              An oversized unit short-cycles and wastes electricity; an undersized one
              struggles on cold days; radiators left unchecked force the flow temperature
              up and the efficiency down. None of that is the technology&apos;s fault —
              it&apos;s the installer&apos;s.
            </p>
            <p className="text-gray-600 mb-4">
              That&apos;s why every PlumbGas Renewables installation starts with a{" "}
              <Link href="/services/heat-loss-surveys" className="text-[#1C834B] font-medium underline">
                room-by-room heat loss survey
              </Link>{" "}
              and a proper system design: the right output, the right cylinder, the
              right emitters and the lowest flow temperature your home can run at.
              Lower flow temperature means higher efficiency — and lower bills, winter
              after winter.
            </p>
            <p className="text-gray-600 mb-6">
              We install{" "}
              <strong>Vaillant aroTHERM plus</strong>, <strong>Viessmann Vitocal</strong>{" "}
              and <strong>Daikin Altherma</strong> systems from 5kW to 16kW, so your home
              gets the unit that fits it — not the one brand we happen to sell.
            </p>
            <ul className="space-y-3">
              {[
                "MCS-certified installation — required for the £7,500 grant",
                "Fixed, itemised quote before any work starts",
                "2-year workmanship warranty on top of manufacturer cover",
                "Local Stafford-based engineers, serving Staffordshire since 2003",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#1C834B] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="font-bold text-gray-900 mb-5">What your installation includes</h3>
            <div className="space-y-5">
              {STEPS.map((s) => (
                <div key={s.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center shrink-0">
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
        </div>
      </section>

      {/* Watch an install */}
      <section className="relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          src="/heat-pump-install.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3560]/85 via-[#144E82]/70 to-[#1C834B]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            This is us on the tools
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A real Staffordshire installation — from first fix to a warm home,
            by our own MCS-certified engineers.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Book Your Free Survey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Recent installs */}
      <section className="py-4 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Recent installs across Staffordshire
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every photo below is our own work — no stock imagery. Neat siting
              outside, tidy pipework inside.
            </p>
          </div>
          <InstallGallery photos={photosFor("install-page")} columns={4} />
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What does installation cost?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Through Heat Geek&apos;s <strong>ZeroDisrupt</strong> system and the
              &pound;7,500 Boiler Upgrade Scheme grant, we now install heat pumps{" "}
              <strong className="text-gray-900">from around &pound;3,000 — about the
              same price as a new gas boiler</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { home: "New gas boiler", size: "the old default", price: "£2,000–£4,000", note: "locked into gas prices" },
              { home: "ZeroDisrupt heat pump", size: "smart-designed system", price: "from ~£3,000", note: "after £7,500 grant — lower bills monthly" },
              { home: "Heat pump, the old way", size: "pre-ZeroDisrupt", price: "£12,000–£15,000", note: "why so few could switch until now" },
            ].map((row) => (
              <div key={row.home} className={`rounded-2xl border p-6 text-center ${row.home === "ZeroDisrupt heat pump" ? "bg-white border-2 border-[#1C834B]" : "bg-white border-gray-200"}`}>
                <p className="font-bold text-gray-900 mb-1">{row.home}</p>
                <p className="text-sm text-gray-500 mb-3">{row.size}</p>
                <p className="text-3xl font-bold text-[#1C834B]">{row.price}</p>
                <p className="text-xs text-gray-400 mt-1">{row.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Larger homes and radiator upgrades add to the starting price — your instant
            estimate gives you your own number. Read more:{" "}
            <Link href="/zerodisrupt" className="text-[#1C834B] font-medium underline">
              ZeroDisrupt explained
            </Link>{" "}
            &middot;{" "}
            <Link href="/guides/heat-pump-cost-staffordshire-2026" className="text-[#1C834B] font-medium underline">
              full 2026 cost guide
            </Link>
          </p>
        </div>
      </section>

      {/* Instant estimate — Heat Geek */}
      <HeatGeekEstimateSection
        heading="Get your installation price now"
        sub="A personalised heat pump estimate for your home in about two minutes — £7,500 grant included, installed by our local MCS-accredited team."
      />

      {/* FAQs */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Installation questions, answered
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
      <section className="bg-gradient-to-br from-[#144E82] to-[#1C834B] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Start with the free survey
          </h2>
          <p className="text-blue-100 mb-6">
            45 minutes, no obligation — and you&apos;ll know exactly what a properly
            designed heat pump costs for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Your Free Survey
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            <Leaf className="w-4 h-4 inline mr-1" />
            &pound;7,500 grant handled for you on every eligible installation
          </p>
        </div>
      </section>
    </div>
  );
}
