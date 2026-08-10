import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "How Much Does a Heat Pump Cost in Staffordshire? (2026 Prices)",
  description:
    "2026 heat pump prices in Staffordshire have changed: through Heat Geek's ZeroDisrupt we now install from around £3,000, the same price as a new gas boiler. What's included, what moves the price, and how the £7,500 grant works.",
  alternates: { canonical: "/guides/heat-pump-cost-staffordshire-2026" },
  openGraph: {
    type: "article",
    title: "How much does a heat pump cost in Staffordshire in 2026?",
    description:
      "Installed prices by property type, the factors that move them, and what the £7,500 grant leaves you paying, from a local MCS installer.",
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

      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
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
            The short answer just changed. Until recently a heat pump install cost
            &pound;12&ndash;15k, which put it out of reach for most families. Through
            Heat Geek&apos;s <strong>ZeroDisrupt</strong> system we can now install a
            heat pump in Staffordshire{" "}
            <strong>from around &pound;3,000, about the same price as a new gas
            boiler</strong>, with the &pound;7,500 Boiler Upgrade Scheme grant already
            deducted. Here&apos;s how that&apos;s possible, what&apos;s included, and
            what moves the price for your home.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            Heat pump vs new gas boiler: the 2026 price comparison
          </h2>
          <p>
            The honest way to think about it is against the thing you&apos;d otherwise
            buy, another gas boiler:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Option</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Typical installed price</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">What happens to your bills</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["New gas boiler", "£2,000–£4,000", "Locked into gas prices for 10–15 years"],
                  ["ZeroDisrupt heat pump (after £7,500 grant)", "from ~£3,000", "Lower running costs, month after month"],
                  ["Heat pump the old way (pre-ZeroDisrupt)", "£12,000–£15,000", "Same savings, but few could afford the install"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{row[0]}</td>
                    <td className="px-4 py-3 font-bold text-[#4e7522]">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            The ZeroDisrupt price includes the heat pump, hot water cylinder, controls,
            installation labour, commissioning, MCS certification and the grant
            application. Larger homes or ones needing radiator upgrades cost more than
            the starting price, your{" "}
            <Link href="/quote/heatpump" className="text-[#4e7522] font-medium underline">
              instant estimate
            </Link>{" "}
            gives you your own number in about two minutes.
          </p>
          <p>
            How is boiler-price possible without cutting corners? By cutting{" "}
            <em>waste</em>: ZeroDisrupt designs are generated from data on thousands of
            real UK homes, so there&apos;s no over-sized kit, no unnecessary upgrades
            and no padded quotes. Read the full story on our{" "}
            <Link href="/zerodisrupt" className="text-[#4e7522] font-medium underline">
              ZeroDisrupt page
            </Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            What actually moves the price?
          </h2>
          <p><strong>1. The size of the system.</strong>{" "}
            Bigger homes lose more heat and need more kilowatts, a bigger cylinder and
            sometimes larger pipework. This is the single biggest factor, and it&apos;s
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
            straightforward. Combi-boiler homes need space finding for a cylinder,
            usually the airing cupboard, loft or garage, and that can add pipework
            time.
          </p>
          <p><strong>4. Your old fuel.</strong>{" "}
            Replacing oil or LPG tends to be slightly simpler (no gas to cap) and
            delivers the biggest running-cost savings; replacing a gas combi is the
            most involved because of the cylinder point above.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            The &pound;7,500 grant, the bit that changes everything
          </h2>
          <p>
            The Boiler Upgrade Scheme pays &pound;7,500 towards an air source heat pump
            when you&apos;re replacing a fossil-fuel boiler. It&apos;s not a rebate you
            claim afterwards: as your MCS-certified installer, <strong>we apply for it
            and deduct it from your quote</strong>, so the prices you see from us are
            the prices you pay. Most owner-occupied homes qualify.{" "}
            <Link href="/boiler-upgrade-scheme" className="text-[#4e7522] font-medium underline">
              Full grant guide here
            </Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-2">
            Beware quotes without a survey
          </h2>
          <p>
            Any installer who gives you a fixed heat pump price from a phone call is
            guessing, and guessed systems are where the horror stories come from
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
                className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Book Free Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <a href="tel:07872626573" className="inline-flex items-center gap-2 text-sm font-semibold text-[#144E82] mt-4">
              <Phone className="w-4 h-4" />
              Or Call Now
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
