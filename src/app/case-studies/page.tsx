import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Gauge, LineChart, MapPin, Phone, Thermometer,
} from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Heat Pump Case Studies & Real Performance Data | Staffordshire",
  description:
    "Real Staffordshire heat pump installations with measured performance data — surveyed heat loss, design flow temperatures, SCOP and before/after running costs. Published openly, because our numbers stand up.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Case Studies</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Real installs.{" "}
            <span className="text-[#7ee2a8]">Real numbers.</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Most installers publish glossy photos. We publish performance data —
            surveyed heat loss, design flow temperature, measured efficiency and
            before/after running costs from real Staffordshire homes. Because a
            heat pump claim you can&apos;t verify is just marketing.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-3xl p-8 sm:p-10 text-center mb-10">
                <div className="w-14 h-14 bg-white text-[#1C834B] rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <LineChart className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  First case studies being written up now
                </h2>
                <p className="text-gray-600 mb-2">
                  We&apos;re documenting our recent installations with a full season of
                  measured data — not day-one estimates. Each study will publish the
                  surveyed heat loss, the system fitted, the design flow temperature,
                  the measured SCOP and the customer&apos;s real before/after costs.
                </p>
                <p className="text-gray-500 text-sm">
                  Want your install considered as a case study? Mention it at your
                  survey — case-study customers get their performance data monitored
                  and reviewed by us for free.
                </p>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                What every case study will show
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Gauge className="w-5 h-5" />,
                    title: "Measured SCOP",
                    desc: "Real seasonal efficiency from the unit's own metering — not brochure figures.",
                  },
                  {
                    icon: <Thermometer className="w-5 h-5" />,
                    title: "Design detail",
                    desc: "Surveyed heat loss, flow temperature and what (if anything) we changed.",
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Before / after costs",
                    desc: "The customer's actual bills on their old fuel vs the heat pump.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="w-10 h-10 bg-green-50 text-[#1C834B] rounded-lg flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((cs) => (
                <div key={cs.slug} className="bg-white border border-gray-200 rounded-2xl p-7">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 text-[#1C834B]" />
                    {cs.town} &bull; {cs.propertyType}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{cs.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{cs.summary}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">System</p>
                      <p className="font-semibold text-gray-900">{cs.system}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Heat loss / flow temp</p>
                      <p className="font-semibold text-gray-900">{cs.heatLossKw}kW @ {cs.designFlowTemp}&deg;C</p>
                    </div>
                    {cs.scop && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-green-600">Measured SCOP</p>
                        <p className="font-bold text-green-700 text-lg">{cs.scop}</p>
                      </div>
                    )}
                    {cs.annualCostBefore && cs.annualCostAfter && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-green-600">Running cost</p>
                        <p className="font-bold text-green-700">
                          &pound;{cs.annualCostBefore.toLocaleString()} &rarr; &pound;{cs.annualCostAfter.toLocaleString()}/yr
                        </p>
                      </div>
                    )}
                  </div>
                  {cs.customerQuote && (
                    <p className="text-sm text-gray-600 italic mt-4 border-l-2 border-green-200 pl-3">
                      &ldquo;{cs.customerQuote}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Want numbers like these for your home?
          </h2>
          <p className="text-gray-500 mb-6">
            It starts with a free, room-by-room heat loss survey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Your Free Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:01785663990"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              01785 663 990
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
