import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Award, Check, ClipboardCheck, Home, Phone,
  Ruler, Thermometer, TrendingDown, X,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Free Heat Pump Survey Stafford & Staffordshire | Book Today",
  description:
    "Book a free heat pump survey in Stafford or anywhere in Staffordshire. Room-by-room heat loss calculations, MCS-certified, no obligation, takes 45 minutes.",
  alternates: { canonical: "/services/heat-loss-surveys" },
  openGraph: {
    title: "Heat Loss Surveys & System Design, the PlumbGas Renewables way",
    description:
      "Why a room-by-room heat loss survey is the difference between a heat pump that saves money and one that doesn't.",
    url: `${SITE_URL}/services/heat-loss-surveys`,
  },
};

const FAQS = [
  {
    q: "Is the heat loss survey really free?",
    a: "Yes, when it's part of a heat pump quote. We carry the cost because the survey is how we produce a price we can genuinely fix. If you want a standalone paid survey and design report to take elsewhere (for a self-managed or third-party installation), we offer that too, call us to discuss.",
  },
  {
    q: "How is this different from an online calculator?",
    a: "Online tools (including our own instant estimate) work from averages: property type, bedrooms, bathrooms. A heat loss survey measures your actual home, wall construction, window areas, insulation, room sizes, air change rates, and calculates each room's demand in watts. The online estimate gets you in the right ballpark; the survey gets you the right system.",
  },
  {
    q: "What is a flow temperature and why does it matter?",
    a: "A boiler typically sends water to your radiators at 70°C+. A well-designed heat pump system runs at 35–45°C, and the lower the flow temperature, the higher the efficiency (SCOP) and the lower your bills. Good design, right-sized emitters, proper zoning, weather compensation, is what makes low flow temperatures possible. That's the whole game.",
  },
  {
    q: "What do I get at the end of the survey?",
    a: "A fixed, itemised quote built on the survey's numbers: the exact heat pump model and size, cylinder specification, any radiator changes (listed individually), the design flow temperature, and the price with the £7,500 grant deducted. You'll understand not just what we recommend but why.",
  },
  {
    q: "My home is old / solid-walled, is a heat pump even viable?",
    a: "Often yes, sometimes not yet, and the survey is precisely how you find out. Solid-wall and older homes have higher heat losses, so honesty matters: if the numbers say insulate first, we'll tell you that instead of selling you an oversized system. No guesswork either way.",
  },
];

export default function HeatLossSurveysPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Heat Loss Surveys & Heat Pump System Design",
    serviceType: "Heat loss survey and heating system design",
    areaServed: "Staffordshire",
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "Room-by-room heat loss surveys and heat pump system design to Heat Geek standards, free with every heat pump quote across Staffordshire.",
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
            <span className="text-white">Heat Loss Surveys</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-50 px-4 py-1.5 rounded-full text-sm mb-5 backdrop-blur">
            <Award className="w-4 h-4 text-[#c4dd9b]" />
            Heat Geek trained design &bull; MCS certified
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Heat loss surveys &amp;{" "}
            <span className="text-[#c4dd9b]">system design</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            The unglamorous 45 minutes that decides whether your heat pump is brilliant
            or disappointing. We measure, calculate and design to Heat Geek standards,
            free with every quote.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Book a Free Survey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Sizing is everything
            </h2>
            <p className="text-gray-600 mb-4">
              Every disappointing heat pump story you&apos;ve heard, high bills, cold
              rooms, noisy cycling, traces back to a system that was never properly
              designed. Installers who guess the size from bedroom count alone fit
              units that are too big (so they cycle on and off, wearing themselves out
              and wasting electricity) or too small (so they run flat out and still
              fall short on the coldest days).
            </p>
            <p className="text-gray-600 mb-4">
              A real heat loss survey calculates what each room actually loses in watts,
              from measured wall areas and construction, window sizes and glazing,
              floors, ceilings, insulation and ventilation. Those numbers set the heat
              pump size, the radiator sizes and the design flow temperature. Get them
              right and the system runs low and slow, sipping electricity at high
              efficiency for twenty years.
            </p>
            <p className="text-gray-600 mb-6">
              This survey-first approach is the standard championed by{" "}
              <strong>Heat Geek</strong>, whose training our engineers follow, design
              for the lowest workable flow temperature, prove it with numbers, and
              never size by rule of thumb. It&apos;s also why we can put a fixed price
              on your quote and stand behind the performance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="flex items-center gap-2 font-semibold text-red-700 text-sm mb-2">
                  <X className="w-4 h-4" /> Rule-of-thumb install
                </p>
                <ul className="text-xs text-red-600 space-y-1">
                  <li>Sized by bedroom count</li>
                  <li>High flow temperature &ldquo;to be safe&rdquo;</li>
                  <li>Short-cycling, higher bills</li>
                  <li>Radiators never checked</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="flex items-center gap-2 font-semibold text-green-700 text-sm mb-2">
                  <Check className="w-4 h-4" /> Survey-first install
                </p>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>Sized from measured heat loss</li>
                  <li>Lowest workable flow temp</li>
                  <li>Steady, efficient running</li>
                  <li>Every emitter verified</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="font-bold text-gray-900 mb-5">What we do during the survey</h3>
            <div className="space-y-5">
              {[
                {
                  icon: <Home className="w-5 h-5" />,
                  title: "Measure every room",
                  desc: "Dimensions, wall construction, windows, floors, loft insulation, the real fabric of your home, not assumptions.",
                },
                {
                  icon: <Ruler className="w-5 h-5" />,
                  title: "Calculate room-by-room heat loss",
                  desc: "Each room's demand in watts at design outdoor temperature, following MCS calculation standards.",
                },
                {
                  icon: <Thermometer className="w-5 h-5" />,
                  title: "Check every radiator",
                  desc: "Existing emitters verified against their room's demand at low flow temperature, upgrades only where the numbers say so.",
                },
                {
                  icon: <TrendingDown className="w-5 h-5" />,
                  title: "Design for efficiency",
                  desc: "Heat pump model, cylinder, controls and target flow temperature chosen for the best achievable SCOP.",
                },
                {
                  icon: <ClipboardCheck className="w-5 h-5" />,
                  title: "Fixed quote, explained",
                  desc: "An itemised price with the £7,500 grant deducted, and a proper explanation of every line on it.",
                },
              ].map((s) => (
                <div key={s.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center shrink-0">
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

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Survey &amp; design questions
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
            Book the survey, the rest follows from it
          </h2>
          <p className="text-gray-500 mb-6">
            Free with every heat pump quote, anywhere in Staffordshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
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
