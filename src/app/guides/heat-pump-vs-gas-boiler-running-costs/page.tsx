import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Heat Pump vs Gas Boiler Running Costs — The Honest Maths (2026)",
  description:
    "Does a heat pump actually cost less to run than a gas boiler? The efficiency-vs-unit-price equation explained with worked examples for a typical Staffordshire semi, and the three things that decide whether you save.",
  alternates: { canonical: "/guides/heat-pump-vs-gas-boiler-running-costs" },
  openGraph: {
    type: "article",
    title: "Heat pump vs gas boiler running costs — the honest maths",
    description:
      "Worked examples, the break-even efficiency, and what actually decides whether a heat pump saves you money.",
    url: `${SITE_URL}/guides/heat-pump-vs-gas-boiler-running-costs`,
  },
};

export default function RunningCostsGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Heat pump vs gas boiler running costs — the honest maths",
    datePublished: "2026-08-07",
    dateModified: "2026-08-07",
    author: { "@type": "Organization", name: "PlumbGas Renewables", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PlumbGas Renewables", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/guides/heat-pump-vs-gas-boiler-running-costs`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-white">Guides</Link>
          </nav>
          <p className="text-sm text-blue-200 mb-3">August 2026 &bull; 7 min read</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Heat pump vs gas boiler running costs — the honest maths
          </h1>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg text-gray-600">
            Electricity costs three to four times more than gas per unit. Heat pumps
            run on electricity. So how can a heat pump possibly be cheaper to run than
            a gas boiler? This is the most common — and most reasonable — question we
            get asked, so here&apos;s the maths in full, with nothing hidden.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            The one number that decides everything
          </h2>
          <p>
            A gas boiler turns 1kWh of gas into about 0.9kWh of heat — roughly 90%
            efficient. A heat pump doesn&apos;t <em>make</em> heat from electricity;
            it <em>moves</em> heat from the outside air into your home. That&apos;s why
            it can turn 1kWh of electricity into 3&ndash;4kWh of heat. That multiplier,
            averaged across a whole year, is called the <strong>SCOP</strong> (Seasonal
            Coefficient of Performance).
          </p>
          <p>
            So the comparison is really: <strong>gas price &divide; 0.9</strong> versus{" "}
            <strong>electricity price &divide; SCOP</strong>. Using typical 2026 prices
            — gas around 7p/kWh, electricity around 24.5p/kWh:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">System</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Sums</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Cost per kWh of heat</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Gas boiler (90%)", "7.0p ÷ 0.90", "7.8p"],
                  ["Heat pump, poorly installed (SCOP 2.5)", "24.5p ÷ 2.5", "9.8p"],
                  ["Heat pump, typical good install (SCOP 3.5)", "24.5p ÷ 3.5", "7.0p"],
                  ["Heat pump, well-designed (SCOP 4.0+)", "24.5p ÷ 4.0", "6.1p"],
                  ["Heat pump on a heat pump tariff (~18p, SCOP 3.5)", "18.0p ÷ 3.5", "5.1p"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Read that table twice, because it contains the entire honest story:{" "}
            <strong>a badly installed heat pump costs more to run than a gas
            boiler, and a well-designed one costs less</strong> — especially on one of
            the heat-pump electricity tariffs now offered by Octopus and others. The
            difference between SCOP 2.5 and SCOP 4 isn&apos;t the hardware; it&apos;s
            the design: correct sizing, right-sized radiators and a low flow
            temperature. This is why we bang on about{" "}
            <Link href="/services/heat-loss-surveys" className="text-[#1C834B] font-medium underline">
              heat loss surveys
            </Link>{" "}
            so much.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            A worked example: 3-bed semi in Stafford
          </h2>
          <p>
            Take a typical 3-bed semi using around 12,000kWh of heat per year:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Gas boiler:</strong> 12,000 &divide; 0.9 &times; 7.0p = <strong>~&pound;930/year</strong> (plus ~&pound;110/year gas standing charge, plus the annual service).</li>
            <li><strong>Heat pump at SCOP 3.5, standard tariff:</strong> 12,000 &divide; 3.5 &times; 24.5p = <strong>~&pound;840/year</strong>.</li>
            <li><strong>Heat pump at SCOP 3.5, heat pump tariff (~18p):</strong> <strong>~&pound;620/year</strong> — and if you drop gas entirely, the gas standing charge disappears too.</li>
          </ul>
          <p>
            Against modern gas that&apos;s a saving of roughly &pound;200&ndash;&pound;400
            a year for a well-designed system. Against <strong>oil, LPG or electric
            heating</strong> the gap is far bigger — oil and LPG homes routinely save
            &pound;400&ndash;&pound;800 a year, which is why rural Staffordshire is
            where heat pumps make the fastest financial sense.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            The three things that decide whether you save
          </h2>
          <p><strong>1. Design quality.</strong> The SCOP your system actually achieves is set on day one by the survey and design. Demand to see the heat loss calculation — from us or anyone else.</p>
          <p><strong>2. Your current fuel.</strong> Replacing oil, LPG or electric heating: clear savings. Replacing efficient mains gas: modest savings with good design, roughly break-even with average design.</p>
          <p><strong>3. Your tariff.</strong> Heat-pump tariffs (like Cosy Octopus) knock 20&ndash;30% off the electricity that feeds your heat pump. We set systems up tariff-ready as standard.</p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            And the bit nobody mentions: the £7,500 head start
          </h2>
          <p>
            Running costs are only half the equation — the other half is that the{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#1C834B] font-medium underline">
              Boiler Upgrade Scheme
            </Link>{" "}
            currently pays &pound;7,500 of the installation. A like-for-like gas boiler
            replacement has no grant at all. Factor that in and the total
            cost-of-ownership comparison over 15 years tilts firmly towards the heat
            pump for most homes — before counting a single unit of cheaper heat.
          </p>
          <p className="text-sm text-gray-500">
            Prices used: gas ~7p/kWh, electricity ~24.5p/kWh (typical capped rates,
            mid-2026), heat pump tariffs ~18p/kWh. Energy prices move — the{" "}
            <em>ratios</em> are what matter, and we&apos;ll run your numbers with
            current prices at your survey. As we publish measured SCOP data from our
            own installs on our{" "}
            <Link href="/case-studies" className="text-[#1C834B] underline">case studies page</Link>,
            you&apos;ll be able to check our claims against real Staffordshire homes.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl p-6 sm:p-8 text-center !mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Want your numbers, not averages?
            </h3>
            <p className="text-gray-600 mb-5">
              The free survey calculates your home&apos;s real heat demand and gives you
              a running-cost estimate you can hold us to.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Book Free Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:07872626573"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
