import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Check, Clock, Flame, Phone, PoundSterling, ShieldCheck,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "New Boiler Installation | Stafford & Staffordshire",
  description:
    "Fixed-price gas boiler installation across Stafford, Stone and Staffordshire from Gas Safe engineers trading since 2003. Get your price online in about 90 seconds, no pushy sales visit.",
  alternates: { canonical: "/services/boiler-installation" },
  openGraph: {
    title: "New Boiler Installation in Staffordshire",
    description:
      "Fixed-price boiler installation from Gas Safe engineers since 2003. Online price in about 90 seconds.",
    url: `${SITE_URL}/services/boiler-installation`,
  },
};

const FAQS = [
  {
    q: "How long does a new boiler installation take?",
    a: "A straight swap, same boiler type in the same position, is usually a single day. Moving the boiler to a different room, or changing from a conventional system to a combi, typically takes two days because of the extra pipework and the tank removal. We will tell you which yours is before we start, not on the day.",
  },
  {
    q: "Combi, system or regular boiler, which do I need?",
    a: "It depends on how many bathrooms you have and how your hot water is used. A combi suits most one-bathroom homes and frees up the airing cupboard. Homes with two or more bathrooms, or several people showering at once, usually run better on a system boiler with a cylinder. We will recommend honestly based on your home, not on what we would rather fit.",
  },
  {
    q: "Do you take the old boiler away?",
    a: "Yes. Removal and responsible disposal of the old boiler, and of the tanks if you are converting to a combi, is included in the price we quote. We leave the space clean and tidy.",
  },
  {
    q: "Is there a government grant for a new gas boiler?",
    a: "No, and be wary of anyone who says otherwise. Government grants cover heat pumps, not fossil fuel boilers. The Boiler Upgrade Scheme pays £7,500 towards an air source heat pump, or £9,000 if your home is off the gas grid on oil or LPG. That is worth knowing before you commit, because a heat pump often lands at a similar price to a boiler once the grant is applied.",
  },
  {
    q: "What warranty comes with a new boiler?",
    a: "Manufacturer warranties on the boilers we fit run from 7 to 12 years depending on the model, and they stay valid as long as the boiler is serviced annually. Our own workmanship warranty sits on top of that. We will confirm the exact warranty for your chosen boiler in writing with the quote.",
  },
  {
    q: "Can you move the boiler somewhere else?",
    a: "Usually yes, into a kitchen cupboard, a utility room, a garage or a loft. It adds pipework and often a day to the job, so it changes the price. Tell us where you would like it when you get your quote and we will price both options so you can compare.",
  },
];

export default function BoilerInstallationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gas Boiler Installation",
    serviceType: "Boiler installation and replacement",
    areaServed: ["Stafford", "Stone", "Staffordshire"],
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "Fixed-price gas boiler installation and replacement across Stafford, Stone and Staffordshire from Gas Safe registered engineers.",
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
            <span className="text-white">Boiler Installation</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            New boiler installation in{" "}
            <span className="text-[#c4dd9b]">Stafford &amp; Staffordshire</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Fixed price, fitted properly, by Gas Safe engineers who have been
            heating Staffordshire homes since 2003. Get your price online in
            about 90 seconds, with no salesman sat in your living room.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote/boiler"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <PoundSterling className="w-5 h-5" />
              Get My Boiler Price
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A price you can trust, from engineers who live here
            </h2>
            <p className="text-gray-600 mb-4">
              Most people replacing a boiler have had the same experience: three
              companies, three wildly different prices, and at least one evening
              lost to a hard sell. We price the job online from the details of
              your home, and the number you see is the number you pay unless we
              find something genuinely unexpected, in which case we tell you
              before we do anything about it.
            </p>
            <p className="text-gray-600 mb-6">
              We fit Worcester Bosch, Vaillant, Ideal and Navien, all installed
              by our own Gas Safe engineers. No subcontractors, no lead-selling,
              no finance pressure.
            </p>
            <ul className="space-y-3">
              {[
                "Fixed price confirmed in writing before we start",
                "Old boiler and tanks removed and disposed of",
                "System flush and magnetic filter fitted as standard",
                "Gas Safe registered, building control notified for you",
                "Manufacturer warranty registered on your behalf",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">90 seconds, not 90 minutes</h3>
              </div>
              <p className="text-sm text-gray-600">
                Answer a few questions about your home and get a fixed price on
                screen.{" "}
                <Link href="/quote/boiler" className="text-[#4e7522] font-medium underline">
                  Start your boiler quote
                </Link>
                .
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Gas Safe since 2003</h3>
              </div>
              <p className="text-sm text-gray-600">
                Twenty years of Staffordshire boilers behind every install, and a
                Which? Trusted Trader endorsement to go with it.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Keep it serviced</h3>
              </div>
              <p className="text-sm text-gray-600">
                An annual{" "}
                <Link href="/services/boiler-servicing" className="text-[#4e7522] font-medium underline">
                  boiler service
                </Link>{" "}
                keeps the manufacturer warranty valid for its full term. We can
                put yours in the diary each year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest comparison */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
            Before you buy a boiler, spend two minutes on this
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            We fit both, so we have no reason to push you either way. But it
            would be daft not to tell you what the grant has done to the maths.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">A new gas boiler makes sense if</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Your boiler has failed and you need heat back this week</li>
                <li>You are selling the house within a couple of years</li>
                <li>Your home has no sensible outdoor space for a heat pump</li>
                <li>You want the lowest possible price today, not the lowest running cost</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-[#83b54b] rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">A heat pump makes sense if</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>You are staying put and thinking about the next 15 years</li>
                <li>You are on oil or LPG, where the grant is now £9,000 and the savings are biggest</li>
                <li>You would like the £7,500 grant taken straight off the price</li>
                <li>Your boiler still works, so you have time to do it properly</li>
              </ul>
            </div>
          </div>
          <div className="mt-7 text-center">
            <p className="text-gray-600 mb-4">
              With the grant applied, a{" "}
              <Link href="/zerodisrupt" className="text-[#4e7522] font-semibold underline">
                ZeroDisrupt heat pump starts at around £3,000 installed
              </Link>
              , which is boiler money. Off the gas grid it can be less. If you are
              on oil or LPG, read the{" "}
              <Link href="/oil-boiler-grant" className="text-[#4e7522] font-semibold underline">
                £9,000 grant for oil and LPG homes
              </Link>{" "}
              before you decide anything.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-[#4e7522] font-semibold hover:underline"
            >
              Compare both with a free heat loss survey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            New boiler questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white rounded-xl border border-gray-200 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-[#4e7522] group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Get your fixed boiler price
          </h2>
          <p className="text-gray-500 mb-8">
            Online in about 90 seconds, or call and talk it through with an
            engineer. Covering Stafford, Stone and all of Staffordshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote/boiler"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <PoundSterling className="w-5 h-5" />
              Get My Boiler Price
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#4e7522] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
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
