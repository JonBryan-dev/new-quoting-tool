import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, MapPin, Phone } from "lucide-react";
import { getLocalPage } from "@/lib/local-pages";
import { getNeighbouringTowns, getTownBySlug } from "@/lib/towns";

const SITE_URL = "https://www.plumbgasrenewables.services";

// Shared renderer for the service x place pages. One component so the
// three routes stay identical in structure, with all the variation
// living in the content data rather than in duplicated markup.

export function localServiceMetadata(serviceSlug: string, townSlug: string) {
  const page = getLocalPage(serviceSlug, townSlug);
  const town = getTownBySlug(townSlug);
  if (!page || !town) return { title: "Not found" };

  const title = `${page.service.label} in ${town.name}`;
  return {
    title: `${title} | PlumbGas Renewables`,
    description: `${page.service.blurb} Covering ${town.name} and ${town.nearby.slice(0, 3).join(", ")}.`,
    alternates: { canonical: `${page.service.parentPath}/${townSlug}` },
    openGraph: {
      title,
      description: page.service.blurb,
      url: `${SITE_URL}${page.service.parentPath}/${townSlug}`,
    },
  };
}

export default function LocalServicePage({
  serviceSlug,
  townSlug,
}: {
  serviceSlug: string;
  townSlug: string;
}) {
  const page = getLocalPage(serviceSlug, townSlug);
  const town = getTownBySlug(townSlug);
  if (!page || !town) notFound();

  const { service, area } = page;
  const neighbours = getNeighbouringTowns(townSlug, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.label} in ${town.name}`,
    serviceType: service.label,
    areaServed: [
      { "@type": "City", name: town.name },
      ...town.nearby.map((n) => ({ "@type": "Place", name: n })),
    ],
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
      address: {
        "@type": "PostalAddress",
        streetAddress: "27 Barnbank Lane",
        addressLocality: "Stafford",
        postalCode: "ST17 9HB",
        addressCountry: "GB",
      },
    },
    description: area.intro,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={service.parentPath} className="hover:text-white">
              {service.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{town.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            {service.label} in <span className="text-[#c4dd9b]">{town.name}</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">{area.intro}</p>
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

      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>{area.local}</p>
            {area.extra && <p>{area.extra}</p>}
          </div>

          <div className="mt-8 bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Getting to you</h2>
                <p className="text-sm text-gray-600 mb-3">{town.travelNote}</p>
                <p className="text-sm text-gray-500">
                  Around {town.name} we cover {town.nearby.slice(0, -1).join(", ")} and{" "}
                  {town.nearby[town.nearby.length - 1]}, plus the {town.postcodes.join(", ")}{" "}
                  postcodes generally.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={service.parentPath}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#4e7522]/40 transition-colors"
            >
              <p className="text-xs text-gray-400 mb-0.5">Read more about</p>
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                {service.parentLabel}
                <ArrowRight className="w-4 h-4 text-[#4e7522]" />
              </p>
            </Link>
            <Link
              href={`/heat-pumps/${town.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#4e7522]/40 transition-colors"
            >
              <p className="text-xs text-gray-400 mb-0.5">Also in {town.name}</p>
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                Heat pump installation
                <ArrowRight className="w-4 h-4 text-[#4e7522]" />
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-gray-900 mb-3">Nearby towns we cover</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours.map((t) => (
              <Link
                key={t.slug}
                href={`/heat-pumps/${t.slug}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#4e7522]/40 hover:text-[#4e7522] transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Talk to someone local
          </h2>
          <p className="text-gray-500 mb-8">
            Free survey, honest advice, and a fixed price afterwards. We are Gas Safe and MCS
            certified and have been heating Staffordshire homes since 2003.
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
        </div>
      </section>
    </div>
  );
}
