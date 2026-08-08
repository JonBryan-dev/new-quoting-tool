import Link from "next/link";
import {
  ArrowRight, Shield, Star, Award, MapPin, Phone, Leaf,
  PoundSterling, TrendingDown, Thermometer, Ruler, ClipboardCheck,
  Wrench, CalendarCheck, Flame, Volume2, BatteryCharging,
} from "lucide-react";

import { towns } from "@/lib/towns";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/5 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-green-50 px-4 py-1.5 rounded-full text-sm mb-6 backdrop-blur">
              <Leaf className="w-4 h-4 text-[#7ee2a8]" />
              &pound;7,500 government grant &bull; MCS &bull; Which? Trusted Traders
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Cut your heating bills with an{" "}
              <span className="text-[#7ee2a8]">air source heat pump</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
              Book a <strong className="text-white">free heat loss survey</strong> and get a
              fixed-price heat pump quote with the &pound;7,500 Boiler Upgrade Scheme grant
              already applied. Local, trusted engineers covering all of Staffordshire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#F26430] hover:bg-[#d94f1a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Book Your Free Survey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/quote/heatpump"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur"
              >
                Get an Instant Estimate
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              Heat pumps from &pound;1,999 after the grant &bull; Free survey, no obligation &bull;{" "}
              <a href="tel:07872626573" className="underline hover:text-white">07872 626573</a>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#144E82] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">MCS &amp; Gas Safe</p>
                <p className="text-xs text-gray-500">Fully accredited engineers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-[#F26430] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">4.9&star; on Trustpilot</p>
                <p className="text-xs text-gray-500">270+ five-star reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#1C834B] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Which? Trusted</p>
                <p className="text-xs text-gray-500">Independently endorsed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#144E82] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Local Since 2003</p>
                <p className="text-xs text-gray-500">Covering all Staffordshire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grant explainer */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-[#1C834B] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <PoundSterling className="w-4 h-4" />
                Boiler Upgrade Scheme
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The government pays &pound;7,500 towards your heat pump
              </h2>
              <p className="text-lg text-gray-500 mb-6">
                If you&apos;re replacing a gas, oil or LPG boiler, the Boiler Upgrade Scheme
                takes &pound;7,500 straight off the price of an air source heat pump. We handle
                the whole grant application for you &mdash; there&apos;s no paperwork on your side.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Grant deducted directly from your quote — nothing to claim back",
                  "3–4x more efficient than a gas boiler",
                  "No gas bills, no flue, no annual gas safety worries",
                  "Future-proof: new gas boilers face phase-out from 2035",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <Leaf className="w-5 h-5 text-[#1C834B] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote/heatpump"
                className="inline-flex items-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-6 py-3.5 rounded-xl font-semibold transition-colors"
              >
                See What You&apos;d Pay
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border border-green-100 p-8">
              <p className="text-sm font-medium text-gray-500 mb-6">Typical 3-bed semi in Stafford</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Heat pump + full installation</span>
                  <span className="text-xl font-bold text-gray-900">&pound;11,249</span>
                </div>
                <div className="flex justify-between items-center text-[#1C834B]">
                  <span className="flex items-center gap-2 font-medium">
                    <Leaf className="w-4 h-4" />
                    Boiler Upgrade Scheme grant
                  </span>
                  <span className="text-xl font-bold">-&pound;7,500</span>
                </div>
                <div className="border-t-2 border-dashed border-green-200 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">You pay</span>
                  <span className="text-4xl font-bold text-gray-900">&pound;3,749</span>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-3 mt-2">
                  <TrendingDown className="w-6 h-6 text-[#1C834B] shrink-0" />
                  <p className="text-sm text-gray-600">
                    Plus save around <strong className="text-gray-900">&pound;300&ndash;£600 a year</strong> on
                    running costs vs an older gas boiler
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-500">
              From first look to warm home in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CalendarCheck className="w-7 h-7" />,
                step: "1",
                title: "Book your free survey",
                description: "Pick a day that suits you. A local engineer visits — it takes about 45 minutes.",
              },
              {
                icon: <Ruler className="w-7 h-7" />,
                step: "2",
                title: "We measure your home",
                description: "A proper room-by-room heat loss calculation, so your heat pump is sized right — never guesswork.",
              },
              {
                icon: <ClipboardCheck className="w-7 h-7" />,
                step: "3",
                title: "Fixed-price quote",
                description: "Your exact price with the £7,500 grant already applied. No hidden extras, no pressure.",
              },
              {
                icon: <Wrench className="w-7 h-7" />,
                step: "4",
                title: "We install & handle the grant",
                description: "MCS-certified installation, grant paperwork done for you, 2-year workmanship warranty.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-gray-200 p-6 relative">
                <span className="absolute top-6 right-6 text-4xl font-bold text-gray-100">{item.step}</span>
                <div className="w-14 h-14 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#144E82] hover:bg-[#0e3a63] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Your Free Heat Loss Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why heat pump benefits */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Staffordshire homes are switching
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <PoundSterling className="w-6 h-6" />,
                title: "£7,500 off, guaranteed",
                desc: "The Boiler Upgrade Scheme grant comes straight off your quote. We're accredited to claim it for you.",
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: "Lower running costs",
                desc: "Heat pumps turn 1kW of electricity into 3–4kW of heat. Most homes save hundreds per year.",
              },
              {
                icon: <Volume2 className="w-6 h-6" />,
                title: "Quiet & low maintenance",
                desc: "Modern units run at around 35dB — quieter than a fridge — with no annual gas safety certificate needed.",
              },
              {
                icon: <BatteryCharging className="w-6 h-6" />,
                title: "Future-proof your home",
                desc: "Zero emissions at home, pairs beautifully with solar, and adds value as gas boilers phase out.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted heat pump brands we install
            </h2>
            <p className="text-lg text-gray-500">
              We only fit proven, efficient units from leading manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Vaillant", range: "aroTHERM plus", desc: "German engineering, natural refrigerant, ultra quiet", warranty: "Up to 7 years" },
              { name: "Viessmann", range: "Vitocal 150-A", desc: "Exceptional efficiency with COP up to 5.0", warranty: "Up to 10 years" },
              { name: "Daikin", range: "Altherma 3", desc: "High output for larger homes, heating & cooling", warranty: "Up to 5 years" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Thermometer className="w-7 h-7 text-[#1C834B]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm font-medium text-[#1C834B] mb-1">{brand.range}</p>
                <p className="text-sm text-gray-500 mb-1">{brand.desc}</p>
                <p className="text-xs text-[#144E82] font-medium">{brand.warranty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Covering the whole of Staffordshire
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Based in Stafford, our engineers carry out free heat loss surveys and heat pump
              installations across the county and surrounding areas.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/heat-pumps/${town.slug}`}
                className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-[#1C834B]/50 hover:text-[#1C834B] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1C834B]" />
                {town.name}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Tap your town for local prices and advice, or see{" "}
            <Link href="/heat-pumps" className="text-[#144E82] underline">everywhere we cover</Link>.
            Not listed? If you&apos;re in or around Staffordshire, we almost certainly cover you &mdash;{" "}
            <a href="tel:07872626573" className="text-[#144E82] underline">give us a ring</a>.
          </p>
        </div>
      </section>

      {/* Boilers secondary */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Not ready for a heat pump? We still fit boilers.
                </h3>
                <p className="text-sm text-gray-500 max-w-xl">
                  Get a fixed-price quote for a new Worcester Bosch, Vaillant, Ideal or Navien
                  boiler in 90 seconds &mdash; from &pound;1,595 fully installed.
                </p>
              </div>
            </div>
            <Link
              href="/quote/boiler"
              className="inline-flex items-center gap-2 bg-[#144E82] hover:bg-[#0e3a63] text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
            >
              Boiler Quotes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#144E82] to-[#1C834B] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your free heat loss survey is the first step
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            No cost, no obligation, no pushy sales &mdash; just an honest, accurate picture of
            what a heat pump would look like for your home and your bills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#F26430] hover:bg-[#d94f1a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Your Free Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur"
            >
              <Phone className="w-5 h-5" />
              07872 626573
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
