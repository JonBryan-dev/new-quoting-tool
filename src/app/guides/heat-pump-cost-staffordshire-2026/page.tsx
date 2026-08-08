import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "How Much Does a Heat Pump Cost in Staffordshire? (2026 Prices)",
  description:
    "Real 2026 installed prices for air source heat pumps in Staffordshire: £8,000–£14,000 before the grant, £1,999–£6,500 after. What changes the price, what's included, and how the £7,500 grant works.",
  alternates: { canonical: "/guides/heat-pump-cost-staffordshire-2026" },
  openGraph: {
    type: "article",
    title: "How much does a heat pump cost in Staffordshire in 2026?",
    description:
      "Installed prices by property type, the factors that move them, and what the £7,500 grant leaves you paying — from a local MCS installer.",
    url: `${SITE_URL}/guides/heat-pump-cost-staffordshire-2026`,
  },
};

export default function CostGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How much does a heat pump cost in Staffordshire? (2026 prices)",
    datePublished: "2026-08-07",
    dateModified: "2026-08-07",
    author: {
      "@type": "Organization",
      name: "PlumbGas Renewables",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PlumbGas Renewables",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/guides/heat-pump-cost-staffordshire-2026`,
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
          <p className="text-sm text-blue-200 mb-3">August 2026 &bull; 6 min read</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            How much does a heat pump cost in Staffordshire? (2026 prices)
          </h1>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg text-gray-600">
            The short answer: for most Staffordshire homes in 2026, a fully installed
            air source heat pump system costs <strong>&pound;8,000&ndash;&pound;14,000
            before the grant</strong> — and because the &pound;7,500 Boiler Upgrade
            Scheme grant comes straight off that,{" "}
            <strong>most of our customers pay between &pound;1,999 and
            &pound;6,500</strong>. Here&apos;s where those numbers come from, what moves
            them up or down, and what they include.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            Typical installed prices by home type
          </h2>
          <p>
            These are our current after-grant starting prices, based on the systems we
            install (Vaillant aroTHERM plus, Viessmann Vitocal, Daikin Altherma):
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Home</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Typical system</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Before grant</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">You pay (after &pound;7,500)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Flat / small terrace", "5kW + 150–180L cylinder", "£9,000–£10,000", "from £1,999"],
                  ["2–3 bed semi or terrace", "7kW + 180–210L cylinder", "£10,500–£11,500", "from £3,749"],
                  ["3–4 bed semi/detached", "9kW + 210–250L cylinder", "£12,000–£13,000", "from £4,999"],
                  ["4–5 bed detached", "12–16kW + 250–300L cylinder", "£13,000–£14,500+", "from £5,449"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[2]}</td>
                    <td className="px-4 py-3 font-bold text-[#1C834B]">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Every price above includes the heat pump, hot water cylinder, controls,
            installation labour, commissioning, MCS certification and the grant
            application. They&apos;re starting prices — your fixed quote comes from a
            free heat loss survey, not a table.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            What actually moves the price?
          </h2>
          <p><strong>1. The size of the system.</strong>{" "}
            Bigger homes lose more heat and need more kilowatts, a bigger cylinder and
            sometimes larger pipework. This is the single biggest factor — and it&apos;s
            why we won&apos;t quote a fixed price without measuring your home first.
          </p>
          <p><strong>2. Radiator upgrades.</strong>{" "}
            Heat pumps run cooler than boilers, so each radiator needs enough surface
            area for its room. In a typical Staffordshire semi we change two or three
            radiators (&pound;150&ndash;&pound;300 each, fitted); many homes need none;
            a few older properties need more. The survey tells you exactly, radiator by
            radiator, before you commit.
          </p>
          <p><strong>3. Cylinder location and pipework.</strong>{" "}
            If you have an airing cupboard (or an old cylinder to replace), it&apos;s
            straightforward. Combi-boiler homes need space finding for a cylinder —
            usually the airing cupboard, loft or garage — and that can add pipework
            time.
          </p>
          <p><strong>4. Your old fuel.</strong>{" "}
            Replacing oil or LPG tends to be slightly simpler (no gas to cap) and
            delivers the biggest running-cost savings; replacing a gas combi is the
            most involved because of the cylinder point above.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            The &pound;7,500 grant — the bit that changes everything
          </h2>
          <p>
            The Boiler Upgrade Scheme pays &pound;7,500 towards an air source heat pump
            when you&apos;re replacing a fossil-fuel boiler. It&apos;s not a rebate you
            claim afterwards: as your MCS-certified installer, <strong>we apply for it
            and deduct it from your quote</strong>, so the prices you see from us are
            the prices you pay. Most owner-occupied homes qualify.{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#1C834B] font-medium underline">
              Full grant guide here
            </Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            Beware quotes without a survey
          </h2>
          <p>
            Any installer who gives you a fixed heat pump price from a phone call is
            guessing — and guessed systems are where the horror stories come from
            (oversized units short-cycling, undersized ones limping through January).
            A room-by-room heat loss survey takes 45 minutes, it&apos;s free, and it&apos;s
            the difference between a heat pump that delivers its promised efficiency
            and one that doesn&apos;t. That&apos;s not our sales angle; it&apos;s the
            industry&apos;s hardest-learned lesson.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl p-6 sm:p-8 text-center !mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Get your exact price
            </h3>
            <p className="text-gray-600 mb-5">
              Two ways: a 60-second online estimate, or the free survey that turns it
              into a fixed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quote/heatpump"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Instant Estimate
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Book Free Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <a href="tel:07872626573" className="inline-flex items-center gap-2 text-sm font-semibold text-[#144E82] mt-4">
              <Phone className="w-4 h-4" />
              Or call 07872 626573
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
