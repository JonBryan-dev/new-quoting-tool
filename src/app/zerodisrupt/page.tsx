import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CalendarCheck, Check, ClipboardCheck, Gauge, Home,
  Phone, PoundSterling, ShieldCheck, Snowflake, TrendingDown, Zap,
} from "lucide-react";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";
import InstallGallery from "@/components/InstallGallery";
import { photosFor } from "@/lib/install-photos";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Heat Pumps at Boiler Prices in Staffordshire | ZeroDisrupt",
  description:
    "Heat Geek's ZeroDisrupt has changed the maths: we can now install a heat pump in Staffordshire from around £3,000, the same price as a new gas boiler, with lower bills every month. Get your instant estimate.",
  alternates: { canonical: "/zerodisrupt" },
  openGraph: {
    title: "A heat pump for the price of a gas boiler, now in Staffordshire",
    description:
      "ZeroDisrupt by Heat Geek, installed locally by PG Renewables: heat pumps from around £3,000, cheaper to run every month.",
    url: `${SITE_URL}/zerodisrupt`,
  },
};

const FAQS = [
  {
    q: "How can a heat pump possibly cost the same as a boiler?",
    a: "Not by cutting corners, by cutting waste. ZeroDisrupt designs are generated from data on thousands of real UK homes, refined by the country's best heating engineers, so there's no guesswork, no over-sized kit and no unnecessary upgrades. Smarter design plus the £7,500 Boiler Upgrade Scheme grant brings a typical install to around £3,000, boiler money.",
  },
  {
    q: "Do heat pumps actually work in cold weather?",
    a: "Yes, they've heated homes in Sweden and Norway for decades, in winters far colder than Staffordshire's. Modern units hold full output well below freezing. What's new isn't the technology; it's the price.",
  },
  {
    q: "Will I still have enough hot water for the family?",
    a: "Yes. A properly designed system includes a hot water cylinder sized for your household, so showers and baths work exactly as they do today, families across Europe run their daily hot water on heat pumps as standard.",
  },
  {
    q: "What is the Heat Geek Guarantee?",
    a: "Every ZeroDisrupt install is backed by the Heat Geek Guarantee: if your system doesn't perform as designed, it gets put right. Your estimate, design and installation all run through Heat Geek's platform, so the promised performance is on record, not just a salesman's word.",
  },
  {
    q: "How fast is the process?",
    a: "One visit. We survey your home in a single appointment, the tailored design is generated instantly on Heat Geek's platform, and you get your quote on the spot. No waiting weeks, no design back-and-forth, no hidden extras.",
  },
];

export default function ZeroDisruptPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22 relative">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">ZeroDisrupt</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#4e7522] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-5">
            <Zap className="w-3.5 h-3.5" />
            New for Staffordshire
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 max-w-3xl text-balance">
            A heat pump for the price of a gas boiler.{" "}
            <span className="text-[#c4dd9b]">Around &pound;3,000.</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl">
            Until now, heat pumps cost &pound;12&ndash;15k to install, out of reach for
            most families. Heat Geek&apos;s <strong className="text-white">ZeroDisrupt</strong>{" "}
            has changed that, and we&apos;re bringing it to Staffordshire: boiler-price
            installation, lower bills every month, backed by the Heat Geek Guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote/heatpump"
              className="inline-flex items-center justify-center gap-2 bg-[#4e7522] hover:bg-[#3f5e1b] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get Your Instant Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* The story */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A smarter way to heat your home in Staffordshire
            </h2>
            <p className="text-gray-600 mb-4">
              Heating isn&apos;t something most people plan for, it becomes urgent when
              the boiler breaks, usually in the middle of winter. For years, the only
              realistic option across Stafford, Stone, Cannock and the rest of the
              county has been another gas boiler. The problem? Gas prices keep
              climbing, and replacing like-for-like locks you into higher bills for
              years.
            </p>
            <p className="text-gray-600 mb-4">
              Now there&apos;s another choice. We&apos;re proud to bring Heat Geek&apos;s{" "}
              <strong>ZeroDisrupt</strong> system to Staffordshire: a heat pump
              installed for around the same cost as a boiler, and because heat pumps
              are three to four times more efficient, your monthly bills go down too.
            </p>
            <p className="text-gray-600 mb-6">
              This isn&apos;t done by lowering standards. It&apos;s done by <em>raising</em>{" "}
              them: every ZeroDisrupt design is built from data on thousands of real
              homes, refined with the knowledge of the UK&apos;s best heating engineers.
            </p>
            <ul className="space-y-3">
              {[
                "Smarter designs, no guesswork, no wasted upgrades",
                "Better comfort, steady warmth, reliable hot water",
                "High-quality installs by Heat Geek-trained local engineers",
                "Every install backed by the Heat Geek Guarantee",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border border-green-100 p-8">
              <p className="text-sm font-medium text-gray-500 mb-5">
                Why more Staffordshire homes are choosing heat pumps
              </p>
              <div className="space-y-4">
                {[
                  { icon: <PoundSterling className="w-5 h-5" />, text: "Same upfront cost as a boiler" },
                  { icon: <TrendingDown className="w-5 h-5" />, text: "Lower running costs month after month" },
                  { icon: <Snowflake className="w-5 h-5" />, text: "Proven in Europe's coldest climates" },
                  { icon: <Home className="w-5 h-5" />, text: "Comfortable heating & hot water for families" },
                  { icon: <ShieldCheck className="w-5 h-5" />, text: "Future-proof against rising gas prices" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white text-[#4e7522] rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                      {item.icon}
                    </div>
                    <p className="font-medium text-gray-800">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">How it works for your home</h3>
              <div className="space-y-4 text-sm">
                {[
                  { icon: <ClipboardCheck className="w-4 h-4" />, title: "One survey visit", desc: "We survey your home in a single appointment." },
                  { icon: <Gauge className="w-4 h-4" />, title: "Instant tailored design", desc: "Your system design is generated on the spot from real data." },
                  { icon: <PoundSterling className="w-4 h-4" />, title: "Quote there and then", desc: "No waiting weeks, no back-and-forth, no hidden extras." },
                ].map((s) => (
                  <div key={s.title} className="flex gap-3">
                    <div className="w-9 h-9 bg-green-50 text-[#4e7522] rounded-lg flex items-center justify-center shrink-0">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Why work with us?
          </h2>
          <p className="text-gray-600 mb-4">
            PG Renewables is run by Jon Bryan and the team behind PlumbGas Services,
            trusted heating engineers serving Stafford, Stone, Uttoxeter and the whole
            of Staffordshire since 2003, with 270+ five-star reviews, Which? Trusted
            Trader endorsement and MCS &amp; Gas Safe accreditation.
          </p>
          <p className="text-gray-600 mb-8">
            With Heat Geek&apos;s tools we can now offer something nobody else locally
            can: <strong>a heat pump for the same price as a gas boiler</strong>,
            designed properly, installed properly, and guaranteed to perform.
          </p>
          <Link
            href="/accreditations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#144E82] hover:underline"
          >
            See our accreditations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Real installs */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What a PG Renewables install looks like
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Boiler-price doesn&apos;t mean corner-cutting, these are our own
              recent Staffordshire installs.
            </p>
          </div>
          <InstallGallery photos={photosFor("zerodisrupt")} />
        </div>
      </section>

      {/* Estimate widget */}
      <HeatGeekEstimateSection
        heading="Check your home and get an instant estimate"
        sub="Two minutes, no obligation, see what ZeroDisrupt would cost for your home, installed locally by us."
      />

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            The questions everyone asks
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
            Boiler on its last legs? Check this first.
          </h2>
          <p className="text-gray-500 mb-6">
            Before you commit to another gas boiler, take two minutes to see what a
            heat pump would cost, you might never pay a gas bill again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote/heatpump"
              className="inline-flex items-center justify-center gap-2 bg-[#4e7522] hover:bg-[#3f5e1b] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get My Instant Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book a Free Survey Instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
