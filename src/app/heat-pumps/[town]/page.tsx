import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, CalendarCheck, ClipboardCheck, Leaf, MapPin,
  Phone, PoundSterling, Ruler, TrendingDown, Wrench,
} from "lucide-react";
import { towns, getTownBySlug, getNeighbouringTowns } from "@/lib/towns";
import HeatGeekEstimateSection from "@/components/heatgeek/HeatGeekEstimateSection";

const SITE_URL = "https://www.plumbgasrenewables.services";

export function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};
  return {
    title: `Air Source Heat Pumps ${town.name} | £7,500 Grant | Free Survey`,
    description: `Air source heat pump installation in ${town.name} (${town.postcodes.join(", ")}). Free heat loss survey, £7,500 Boiler Upgrade Scheme grant handled for you. MCS accredited local engineers — book online.`,
    alternates: { canonical: `/heat-pumps/${town.slug}` },
    openGraph: {
      title: `Air Source Heat Pumps in ${town.name} — Free Heat Loss Survey`,
      description: `Fixed-price heat pump installation in ${town.name} with the £7,500 government grant already applied. Trusted Staffordshire engineers since 2003.`,
      url: `${SITE_URL}/heat-pumps/${town.slug}`,
    },
  };
}

function faqsFor(townName: string, postcodes: string[]) {
  return [
    {
      q: `Do you install heat pumps in ${townName}?`,
      a: `Yes — ${townName} (${postcodes.join(", ")} postcodes) is firmly inside our coverage area. Our engineers are based in Stafford and carry out free heat loss surveys and full air source heat pump installations across the area.`,
    },
    {
      q: `How much does an air source heat pump cost in ${townName}?`,
      a: `Most fully installed systems come to £8,000–£14,000 before the grant, depending on the size of your home and whether radiators or a hot water cylinder need upgrading. The £7,500 Boiler Upgrade Scheme grant comes straight off that, so typical customers pay £1,999–£6,500. Your free heat loss survey gives you an exact fixed price.`,
    },
    {
      q: `Do I qualify for the £7,500 heat pump grant?`,
      a: `Most homeowners in ${townName} do. You'll qualify if you own the property and you're replacing a gas, oil or LPG boiler (or electric heating). We're accredited to claim the Boiler Upgrade Scheme grant on your behalf and take it off your quote — you never handle the paperwork or wait for the money.`,
    },
    {
      q: `What does the free heat loss survey involve?`,
      a: `A local engineer visits your home for around 45 minutes and measures each room — windows, walls, insulation — to calculate exactly how much heat your home needs. You then get a fixed-price quote for the right-sized heat pump. It's completely free and there's no obligation.`,
    },
    {
      q: `Do heat pumps work in cold weather?`,
      a: `Yes. Modern air source heat pumps deliver full heating output at temperatures well below freezing and operate down to around -20°C — far colder than Staffordshire winters get. The key is correct sizing, which is exactly what the heat loss survey guarantees.`,
    },
  ];
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  const faqs = faqsFor(town.name, town.postcodes);
  const neighbours = getNeighbouringTowns(town.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Air Source Heat Pump Installation in ${town.name}`,
    serviceType: "Air source heat pump installation",
    areaServed: [town.name, ...town.nearby],
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description: `Free heat loss surveys and MCS-certified air source heat pump installation in ${town.name} and surrounding villages, with the £7,500 Boiler Upgrade Scheme grant applied.`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/heat-pumps" className="hover:text-white">Heat Pumps</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{town.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Air source heat pumps in{" "}
            <span className="text-[#7ee2a8]">{town.name}</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            {town.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#F26430] hover:bg-[#d94f1a] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Book a Free Survey in {town.name}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/quote/heatpump"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              Get an Instant Estimate
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Covering {town.postcodes.join(", ")} &bull; {town.travelNote}
          </p>
        </div>
      </section>

      {/* Local detail */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Heat pumps for {town.name} homes
            </h2>
            <p className="text-gray-600 mb-4">{town.housing}</p>
            <p className="text-gray-600 mb-6">
              Every installation starts with a <strong>free heat loss survey</strong> — a
              45-minute, room-by-room assessment that tells you the exact heat pump size
              your home needs and a fixed price with the{" "}
              <Link href="/boiler-upgrade-scheme" className="text-[#1C834B] font-medium underline">
                &pound;7,500 Boiler Upgrade Scheme grant
              </Link>{" "}
              already applied. No guesswork, no pressure, no obligation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <PoundSterling className="w-5 h-5" />,
                  title: "£7,500 off, handled by us",
                  desc: "We claim the government grant for you — it comes straight off your quote.",
                },
                {
                  icon: <TrendingDown className="w-5 h-5" />,
                  title: "Lower bills",
                  desc: "3–4x more efficient than a gas or oil boiler; most homes save every year.",
                },
                {
                  icon: <Ruler className="w-5 h-5" />,
                  title: "Sized properly",
                  desc: "Room-by-room heat loss survey before any price is fixed.",
                },
                {
                  icon: <Wrench className="w-5 h-5" />,
                  title: "Local engineers",
                  desc: "Stafford-based, MCS & Gas Safe accredited, serving the county since 2003.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4 flex gap-3">
                  <div className="w-10 h-10 bg-green-50 text-[#1C834B] rounded-lg flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Instant estimate — Heat Geek */}
            <div className="mb-8">
              <HeatGeekEstimateSection
                compact
                heading={`What would a heat pump cost in ${town.name}?`}
                sub="Get a personalised price for your home in about two minutes — £7,500 grant included, installed locally by us."
              />
            </div>

            {/* FAQs */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Heat pump questions from {town.name} homeowners
            </h2>
            <div className="space-y-3 mb-8">
              {faqs.map((f) => (
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

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Free heat loss survey</h3>
              <p className="text-sm text-gray-600 mb-4">
                The first step to an accurate, fixed heat pump price for your {town.name} home.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-5">
                <li className="flex gap-2"><CalendarCheck className="w-4 h-4 text-[#1C834B] shrink-0 mt-0.5" /> Takes about 45 minutes</li>
                <li className="flex gap-2"><ClipboardCheck className="w-4 h-4 text-[#1C834B] shrink-0 mt-0.5" /> Fixed quote, grant applied</li>
                <li className="flex gap-2"><Leaf className="w-4 h-4 text-[#1C834B] shrink-0 mt-0.5" /> Free &amp; no obligation</li>
              </ul>
              <Link
                href="/book"
                className="block text-center bg-[#1C834B] hover:bg-[#166a3c] text-white px-5 py-3 rounded-xl font-semibold transition-colors"
              >
                Book Free Survey
              </Link>
              <a
                href="tel:07872626573"
                className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#144E82]"
              >
                <Phone className="w-4 h-4" />
                07872 626573
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Areas we cover around {town.name}</h3>
              <div className="flex flex-wrap gap-2">
                {town.nearby.map((area) => (
                  <span key={area} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium">
                    <MapPin className="w-3 h-3 text-[#1C834B]" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Nearby towns</h3>
              <ul className="space-y-2 text-sm">
                {neighbours.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/heat-pumps/${n.slug}`}
                      className="text-[#144E82] hover:underline"
                    >
                      Heat pumps in {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#144E82] to-[#1C834B] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to see what a heat pump costs for your {town.name} home?
          </h2>
          <p className="text-blue-100 mb-6">
            Free survey, fixed price, &pound;7,500 grant handled for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#F26430] hover:bg-[#d94f1a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Your Free Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur"
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
