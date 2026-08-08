import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Check, Layers, Phone, Ruler, Thermometer,
  TrendingDown, Waves,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Underfloor Heating Installation Staffordshire | Wet UFH Systems",
  description:
    "Wet underfloor heating design and installation across Staffordshire — new builds, extensions, renovations and retrofit overlay systems. The perfect partner for a heat pump. Designed and installed by local MCS accredited engineers.",
  alternates: { canonical: "/services/underfloor-heating" },
  openGraph: {
    title: "Underfloor Heating Installation in Staffordshire",
    description:
      "Wet UFH for new floors, extensions and retrofits — designed properly, installed by the local heat pump specialists.",
    url: `${SITE_URL}/services/underfloor-heating`,
  },
};

const FAQS = [
  {
    q: "Can underfloor heating be retrofitted to an existing house?",
    a: "Yes. Alongside traditional screed systems for new floors and extensions, we install low-profile overlay systems from around 15–20mm high that go on top of your existing floor — no digging up the ground floor. Overlay boards have come a long way and heat up faster than thick screed systems.",
  },
  {
    q: "Why do underfloor heating and heat pumps work so well together?",
    a: "A floor is one enormous radiator, so it can heat a room with water at just 30–40°C — exactly the temperature range where a heat pump is at its most efficient. Pairing UFH with an air source heat pump typically achieves the best efficiency (SCOP) of any system we install. That said, UFH also works beautifully with a boiler if you're not ready for a heat pump yet.",
  },
  {
    q: "Can I have underfloor heating downstairs and radiators upstairs?",
    a: "Absolutely — it's the most popular arrangement we fit. The system is designed with separate circuits: UFH zones downstairs running at low temperature, and correctly sized radiators upstairs. Each room gets its own control so you only heat what you're using.",
  },
  {
    q: "What floor coverings work with UFH?",
    a: "Tile and stone are best (highest heat transfer), engineered wood and LVT work very well, and carpet is fine provided the combined tog of carpet and underlay stays under about 1.5. We check your intended floor coverings during design so the system is sized to suit them — this genuinely matters and is often skipped.",
  },
  {
    q: "How much does underfloor heating cost?",
    a: "It depends on floor area, system type (in-screed vs overlay) and how many zones you need, so we quote from a site visit rather than guessing. As a rough guide, a single-room overlay retrofit starts around £1,500–£2,500 installed, while whole-ground-floor systems in new extensions are quoted per design. Every quote is fixed and itemised.",
  },
];

export default function UnderfloorHeatingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Underfloor Heating Installation",
    serviceType: "Wet underfloor heating design and installation",
    areaServed: "Staffordshire",
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+441785663990",
    },
    description:
      "Design and installation of wet underfloor heating systems — screed and retrofit overlay — across Staffordshire, optimised for heat pumps.",
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
            <span className="text-white">Underfloor Heating</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Underfloor heating,{" "}
            <span className="text-[#7ee2a8]">designed like a heating system</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Warm floors, no radiators on the walls, and the lowest running costs of any
            emitter — especially paired with a heat pump. Screed systems for new floors
            and extensions, low-profile overlays for retrofits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:01785663990"
              className="inline-flex items-center justify-center gap-2 bg-[#F26430] hover:bg-[#d94f1a] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Discuss Your Project
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              Request a Site Visit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              The most comfortable way to heat a room
            </h2>
            <p className="text-gray-600 mb-4">
              Underfloor heating turns the whole floor into a gentle, even emitter.
              No hot-and-cold spots, no radiators dictating where furniture goes, and
              a room that feels warm at a lower air temperature — which is itself a
              saving, because every degree off the thermostat cuts consumption by
              around 6&ndash;10%.
            </p>
            <p className="text-gray-600 mb-4">
              Because the emitting surface is so large, UFH runs on water at just
              30&ndash;40&deg;C. That makes it the natural partner for an{" "}
              <Link href="/services/heat-pump-installation" className="text-[#1C834B] font-medium underline">
                air source heat pump
              </Link>{" "}
              — the lower the flow temperature, the higher the heat pump&apos;s
              efficiency. A UFH-plus-heat-pump ground floor is the most efficient
              setup we install. It works just as happily with a boiler if that&apos;s
              what you have today.
            </p>
            <p className="text-gray-600 mb-6">
              Like everything we fit, UFH gets designed before it gets quoted: room
              heat losses calculated, pipe spacing and circuit lengths worked out,
              floor coverings taken into account, and each room zoned with its own
              control. A well-designed floor lasts the life of the building.
            </p>
            <ul className="space-y-3">
              {[
                "In-screed systems for new builds, extensions and renovations",
                "Low-profile overlay retrofits from ~15mm — no digging up floors",
                "Room-by-room zoning with modern smart controls",
                "Designed to your floor coverings — tile, wood, LVT or carpet",
                "Works with heat pumps and boilers alike",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#1C834B] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="font-bold text-gray-900 mb-5">Which system suits your project?</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: <Layers className="w-5 h-5" />,
                    title: "New floor going in? — In-screed",
                    desc: "Pipes clipped or stapled into the new floor build-up. Slowest to respond but beautifully stable and invisible. Ideal for extensions and renovations.",
                  },
                  {
                    icon: <Waves className="w-5 h-5" />,
                    title: "Existing floor staying? — Overlay",
                    desc: "Pre-routed low-profile boards laid on top of the existing floor, from around 15mm. Fast response, minimal disruption, perfect for retrofits.",
                  },
                  {
                    icon: <Thermometer className="w-5 h-5" />,
                    title: "Mixed system? — UFH + radiators",
                    desc: "UFH downstairs, correctly sized radiators upstairs, one properly balanced system. Our most popular arrangement.",
                  },
                ].map((s) => (
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
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6 flex gap-4">
              <div className="w-12 h-12 bg-white text-[#1C834B] rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Planning a heat pump too?
                </p>
                <p className="text-sm text-gray-600">
                  Designing the UFH and heat pump together gets the best result — and
                  the &pound;7,500{" "}
                  <Link href="/boiler-upgrade-scheme" className="text-[#1C834B] font-medium underline">
                    Boiler Upgrade Scheme grant
                  </Link>{" "}
                  applies to the heat pump side of the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Underfloor heating questions
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
            Tell us about your floor
          </h2>
          <p className="text-gray-500 mb-6">
            Extension, renovation or retrofit — we&apos;ll design it properly and give
            you a fixed price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01785663990"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              01785 663 990
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Ruler className="w-5 h-5" />
              Request a Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
