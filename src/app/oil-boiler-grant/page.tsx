import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle, ArrowRight, CalendarCheck, Check, Droplet,
  Phone, PoundSterling, TrendingDown,
} from "lucide-react";
import LocalAreaLinks from "@/components/LocalAreaLinks";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "£9,000 Oil & LPG Heat Pump Grant | Staffordshire",
  description:
    "Off the gas grid in Staffordshire? The Boiler Upgrade Scheme now pays £9,000 towards a heat pump for oil and LPG heated homes, until 31 March 2027. We claim it for you. Book a free survey.",
  alternates: { canonical: "/oil-boiler-grant" },
  openGraph: {
    title: "£9,000 Heat Pump Grant for Oil & LPG Homes",
    description:
      "Staffordshire homes off the gas grid can now get £9,000 towards a heat pump, £1,500 more than mains gas homes. Ends 31 March 2027.",
    url: `${SITE_URL}/oil-boiler-grant`,
  },
};

const FAQS = [
  {
    q: "How much is the grant for an oil heated home?",
    a: "£9,000. The standard Boiler Upgrade Scheme grant is £7,500, and since 21 July 2026 eligible off-gas-grid homes replacing oil or LPG heating get an extra £1,500 on top, taking it to £9,000. Homes on mains gas or electric heating stay at £7,500.",
  },
  {
    q: "When does the £9,000 rate end?",
    a: "31 March 2027. It is a temporary uplift, not a permanent change, so the £1,500 extra disappears after that date unless the government extends it. A heat pump project needs a survey, a system design and an Ofgem application before anyone fits anything, so the practical deadline for starting is earlier than the calendar one.",
  },
  {
    q: "Who qualifies for the higher rate?",
    a: "Broadly: you own the property, it is in England or Wales, it is off the mains gas grid, and you are replacing oil or LPG heating with an air source or ground source heat pump fitted by an MCS-certified installer. The property also needs a valid EPC. We check all of this for you at the free survey and tell you straight if your home does not qualify.",
  },
  {
    q: "Do I have to apply for it myself?",
    a: "No. As an MCS-certified installer we make the application to Ofgem on your behalf and take the grant off your invoice. You never handle the paperwork and you never pay the money out and wait for it back. You only ever pay the after-grant price.",
  },
  {
    q: "I already have a grant voucher at £7,500. Can I get the higher rate?",
    a: "Possibly. Vouchers issued before 21 July 2026 keep their original £7,500 value, but eligible households have been able to cancel and reapply at the higher rate. If you have a voucher already, talk to us before you do anything, because cancelling has timing implications we would want to manage properly.",
  },
  {
    q: "Will a heat pump really cost less to run than my oil boiler?",
    a: "For most off-grid homes, yes, and the gap is wider than it is for mains gas homes because oil is a relatively expensive fuel and heat pumps deliver several units of heat per unit of electricity. But it depends on your home, your system design and your electricity tariff, so we will not promise a figure before we have surveyed you. What we will do is show you the numbers for your actual house.",
  },
  {
    q: "Can I get the grant for a new oil boiler instead?",
    a: "No. Government grants cover heat pumps, not fossil fuel boilers of any kind. If you replace your oil boiler with another oil boiler you pay the full cost yourself, and you are locked into oil prices for another 15 years.",
  },
];

const QUALIFY = [
  "You own the home (landlords and most second homes count too)",
  "It is in England or Wales",
  "It is off the mains gas grid",
  "It is currently heated by oil or LPG",
  "There is a valid EPC for the property",
  "The heat pump is fitted by an MCS-certified installer, like us",
];

export default function OilBoilerGrantPage() {
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
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Oil &amp; LPG Grant</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-50 px-4 py-1.5 rounded-full text-sm mb-5 backdrop-blur">
            <AlertCircle className="w-4 h-4 text-[#c4dd9b]" />
            Higher rate ends 31 March 2027
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Oil or LPG heating? The grant is now{" "}
            <span className="text-[#c4dd9b]">&pound;9,000</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Staffordshire homes off the mains gas grid now get &pound;1,500 more
            towards a heat pump than everyone else. We are MCS certified, so we
            claim it for you and take it straight off your price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book My Free Survey
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

      {/* What changed */}
      <section className="py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            What changed, in one paragraph
          </h2>
          <p className="text-gray-600 mb-8">
            The Boiler Upgrade Scheme has paid &pound;7,500 towards an air source
            heat pump for a while now. On 21 July 2026 the government added an
            extra &pound;1,500 for homes that are off the mains gas grid and
            heated by oil or LPG, taking those homes to &pound;9,000. It is a
            temporary uplift and it is due to end on 31 March 2027. Homes on
            mains gas or electric heating stay at &pound;7,500.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-sm text-gray-500 mb-1">Mains gas or electric home</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">&pound;7,500</p>
              <p className="text-sm text-gray-500">The standard grant, unchanged</p>
            </div>
            <div className="bg-[#eff5e4] border-2 border-[#83b54b] rounded-2xl p-6">
              <p className="text-sm text-[#4e7522] mb-1">Off-grid oil or LPG home</p>
              <p className="text-3xl font-bold text-[#213311] mb-1">&pound;9,000</p>
              <p className="text-sm text-[#4e7522]">Until 31 March 2027</p>
            </div>
          </div>

          <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center shrink-0">
                <PoundSterling className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">What that means on a real quote</h3>
                <p className="text-sm text-gray-600">
                  A{" "}
                  <Link href="/zerodisrupt" className="text-[#4e7522] font-medium underline">
                    ZeroDisrupt system starts at around &pound;3,000 installed
                  </Link>{" "}
                  once the &pound;7,500 grant is taken off. For an eligible oil or
                  LPG home the extra &pound;1,500 comes off as well, which can
                  bring the balance to around &pound;1,500. Your own figure
                  depends on your home, and the free heat loss survey is what
                  turns that into a fixed price rather than a guess.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why off-grid homes win */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why oil homes gain the most from the switch
            </h2>
            <p className="text-gray-600 mb-4">
              If you heat with oil you already know the two problems: the price
              moves with the world oil market, and you have to find several
              hundred pounds in one go every time the tank needs filling. There
              is no monthly direct debit smoothing it out, and no competition on
              your doorstep to keep the price honest.
            </p>
            <p className="text-gray-600 mb-4">
              A heat pump changes both. Your heating goes onto the same
              electricity bill as everything else, paid monthly, and a
              well-designed system delivers several units of heat for every unit
              of electricity it uses. That efficiency is why the running-cost gap
              against oil is usually wider than it is against mains gas.
            </p>
            <p className="text-gray-600">
              You also get the tank space back, and no more annual oil boiler
              service, no more sludge, no more worrying about theft from the tank.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Droplet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Rural Staffordshire, mostly</h3>
              </div>
              <p className="text-sm text-gray-600">
                Oil and LPG heating is common in the villages we cover:
                Eccleshall, Gnosall, Brewood, the Staffordshire Moorlands around
                Leek and Cheadle, and the hamlets between Stone, Uttoxeter and
                Stafford. If your neighbours have oil tanks, this page is for you.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">We will show you your numbers</h3>
              </div>
              <p className="text-sm text-gray-600">
                We will not quote you a saving off a leaflet. At the survey we
                work out your home&apos;s heat loss room by room, then show you what
                the system should cost to run against what you spend on oil now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Do you qualify */}
      <section className="py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Do you qualify for the &pound;9,000?
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            <ul className="space-y-3">
              {QUALIFY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-5 pt-5 border-t border-gray-100">
              Not sure whether your home is off the gas grid, or whether your EPC
              is still valid? Ring us, it takes about two minutes to check and we
              will not badger you afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* Timing */}
      <section className="bg-[#0c3560] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Why leaving it until next March is a bad idea
          </h2>
          <p className="text-blue-100 mb-8">
            The deadline is for the grant application, and there is real work in
            front of it. Nothing here is slow on its own, but stacked together it
            adds up, and every installer in the country is working to the same
            date.
          </p>
          <ol className="space-y-4">
            {[
              { step: "Free heat loss survey", detail: "We measure your home properly, room by room. Usually within a couple of weeks of you calling." },
              { step: "System design and fixed quote", detail: "Radiator sizing, cylinder position, pipework route, and a price that does not move." },
              { step: "Ofgem grant application", detail: "We submit it, the voucher is issued for your property and it has a limited validity period." },
              { step: "Installation", detail: "Typically two to three days for a ZeroDisrupt system, scheduled around you." },
            ].map((item, i) => (
              <li key={item.step} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#83b54b] text-[#213311] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{item.step}</p>
                  <p className="text-sm text-blue-200">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Oil and LPG grant questions
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
          <p className="text-center text-sm text-gray-400 mt-8">
            Grant rules can change. We keep this page current, and we confirm the
            exact figure for your property in writing before you commit to
            anything. See also{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#4e7522] underline">
              the standard &pound;7,500 grant
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Find out what &pound;9,000 leaves you paying
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Free heat loss survey, fixed price afterwards, grant handled by us.
            No obligation and no pressure, whatever you decide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book My Free Survey
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#4e7522] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Not on oil?{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#4e7522] underline">
              The &pound;7,500 grant works the same way
            </Link>
            .{" "}
            <ArrowRight className="w-3 h-3 inline" />
          </p>
        </div>
      </section>

      <LocalAreaLinks
        serviceSlug="oil-boiler-grant"
        heading="Off-grid areas we cover for this grant"
      />
    </div>
  );
}
