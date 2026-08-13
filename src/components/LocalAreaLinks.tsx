import Link from "next/link";
import { MapPin } from "lucide-react";
import { getLocalService } from "@/lib/local-pages";
import { getTownBySlug } from "@/lib/towns";

// Links a service hub page down to its local variants. Without this the
// place pages would only be reachable from the sitemap, which is a much
// weaker signal than being linked from the page they belong to.

export default function LocalAreaLinks({
  serviceSlug,
  heading,
}: {
  serviceSlug: string;
  heading?: string;
}) {
  const service = getLocalService(serviceSlug);
  if (!service || service.areas.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-[#4e7522]" />
          <h2 className="text-xl font-bold text-gray-900">
            {heading || `${service.label} near you`}
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Local pages with detail specific to each area, including the villages around it.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {service.areas.map((area) => {
            const town = getTownBySlug(area.townSlug);
            if (!town) return null;
            return (
              <Link
                key={area.townSlug}
                href={`${service.parentPath}/${area.townSlug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#4e7522]/40 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-gray-900 text-sm">{town.name}</p>
                <p className="text-xs text-gray-400">{town.postcodes.join(", ")}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
