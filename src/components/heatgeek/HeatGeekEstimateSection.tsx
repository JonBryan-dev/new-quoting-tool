import { ArrowRight, ExternalLink, ShieldCheck, Timer, Zap } from "lucide-react";

// Branded lead-gen section for the Heat Geek estimate flow.
// The embedded script widget was removed here — Heat Geek's "banner"
// style renders as a fixed bar that floats over page content on mobile.
// The CTA link carries the same tenancy attribution; the contained
// "block" embed lives only on /quote/heatpump.

export const HEATGEEK_ESTIMATE_URL =
  "https://upgrades.heatgeek.com/switch/plumbgas-services-limited/generate-estimate/";
export const HEATGEEK_PARTNER_URL =
  "https://upgrades.heatgeek.com/partner/plumbgas-services-limited/";

interface HeatGeekEstimateSectionProps {
  heading?: string;
  sub?: string;
  /** compact renders without the outer section padding, for embedding in cards */
  compact?: boolean;
}

export default function HeatGeekEstimateSection({
  heading = "Get your instant heat pump estimate",
  sub = "See your home's heat pump price in about two minutes — powered by Heat Geek, the UK's most trusted heat pump platform, and installed by us locally.",
  compact = false,
}: HeatGeekEstimateSectionProps) {
  const inner = (
    <div className="relative overflow-hidden rounded-3xl border-2 border-[#1C834B]/30 bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 sm:p-10">
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#1C834B]/5 rounded-full" />
      <div className="absolute -bottom-20 -left-12 w-48 h-48 bg-[#144E82]/5 rounded-full" />
      <div className="relative text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#1C834B] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
          <Zap className="w-3.5 h-3.5" />
          2-minute estimate
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-balance">
          {heading}
        </h2>
        <p className="text-gray-600 mb-6">{sub}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={HEATGEEK_ESTIMATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Start My Estimate
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={HEATGEEK_PARTNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#144E82] hover:underline"
          >
            View our Heat Geek partner profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-[#1C834B]" /> No obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1C834B]" /> £7,500 grant included in your price
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#1C834B]" /> Installed locally by PG Renewables
          </span>
        </div>
      </div>
    </div>
  );

  if (compact) return inner;

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{inner}</div>
    </section>
  );
}
