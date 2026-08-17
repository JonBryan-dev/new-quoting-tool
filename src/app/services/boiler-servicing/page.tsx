import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CalendarCheck, Check, Flame, Phone, Shield, Wrench,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Boiler Repairs & Servicing | Stafford, Stone, Uttoxeter",
  description:
    "Gas boiler repairs and annual servicing across Stafford, Stone, Uttoxeter and Staffordshire from the Gas Safe team behind PlumbGas Services, looking after local boilers since 2003.",
  alternates: { canonical: "/services/boiler-servicing" },
  openGraph: {
    title: "Boiler Repairs & Servicing in Staffordshire",
    description:
      "Gas boiler repairs and annual servicing from trusted local Gas Safe engineers, since 2003.",
    url: `${SITE_URL}/services/boiler-servicing`,
  },
};

const FAQS = [
  {
    q: "Do you service boilers in Stone and the surrounding villages?",
    a: "Yes. We are based in Stafford and Stone is one of our busiest areas, along with Eccleshall, Barlaston, Yarnfield and the villages between. Same for the rest of Staffordshire: if you are in the county, we cover you.",
  },
  {
    q: "How often should a gas boiler be serviced?",
    a: "Once a year. An annual service keeps the manufacturer warranty valid, keeps the boiler running efficiently, and catches safety issues such as flue problems or gas leaks before they become dangerous. Most people book it before winter.",
  },
  {
    q: "My boiler has broken down. Can you repair it?",
    a: "Yes, we repair all the major makes: Worcester Bosch, Vaillant, Ideal, Baxi, Navien and more. Call us with the make, model and any error code showing and we will tell you honestly whether it is worth repairing, and what your options are if it is not.",
  },
  {
    q: "My boiler is old. Should I service it or replace it?",
    a: "A fair question, and the answer depends on age, condition and repair history. If a boiler is past its economic life we will say so, and you have two routes: a new boiler quoted online in about 90 seconds, or, since the £7,500 grant now brings a heat pump to around the same price as a boiler, a free heat loss survey to compare both properly before you decide.",
  },
];

export default function BoilerServicingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gas Boiler Servicing & Repairs",
    serviceType: "Boiler servicing and repair",
    areaServed: ["Stafford", "Stone", "Staffordshire"],
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "Annual gas boiler servicing, repairs and safety checks across Stafford, Stone and Staffordshire from Gas Safe registered engineers.",
  };
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#4e7522] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Boiler Servicing</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Boiler servicing &amp; repairs in{" "}
            <span className="text-[#c4dd9b]">Stafford, Stone &amp; Staffordshire</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            The same Gas Safe engineers who have looked after local boilers since
            2003. Annual services, breakdowns and honest advice when a boiler is
            past its best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call to Book a Service
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              <CalendarCheck className="w-5 h-5" />
              Request a Visit Online
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              An annual service is the cheapest heating insurance there is
            </h2>
            <p className="text-gray-600 mb-4">
              A neglected boiler costs you twice: quietly, through falling
              efficiency all year, and suddenly, when it fails on the coldest week
              of January. A yearly service keeps the manufacturer warranty valid,
              keeps your gas bill where it should be, and gives a Gas Safe
              engineer the chance to spot small faults while they are still small.
            </p>
            <p className="text-gray-600 mb-6">
              We service and repair all the major makes across Stafford, Stone and
              the whole of Staffordshire, whether or not we fitted the boiler.
            </p>
            <ul className="space-y-3">
              {[
                "Full strip-down inspection where the manufacturer requires it",
                "Flue gas analysis and combustion check",
                "Gas tightness and working-pressure checks",
                "Controls, thermostat and safety device tests",
                "Written service record for your warranty file",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#4e7522] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Repairs &amp; breakdowns</h3>
              </div>
              <p className="text-sm text-gray-600">
                Fault-finding and repairs on all major makes. Call with your make,
                model and error code and we will give you an honest steer before
                any visit.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Gas Safe, since 2003</h3>
              </div>
              <p className="text-sm text-gray-600">
                Every engineer is Gas Safe registered, and the business behind
                this page has served Staffordshire homes for over twenty years as
                PlumbGas Services.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Boiler beyond saving?</h3>
              </div>
              <p className="text-sm text-gray-600">
                Get a fixed price for a{" "}
                <Link href="/quote/boiler" className="text-[#4e7522] font-medium underline">
                  new boiler online in 90 seconds
                </Link>
                , or compare it against a{" "}
                <Link href="/zerodisrupt" className="text-[#4e7522] font-medium underline">
                  heat pump at the same price
                </Link>{" "}
                before you commit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Boiler servicing questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white rounded-xl border border-gray-200 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-[#4e7522] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Book your boiler service
          </h2>
          <p className="text-gray-500 mb-8">
            One call and it is in the diary. Covering Stafford, Stone and all of
            Staffordshire.
          </p>
          <a
            href="tel:07872626573"
            className="inline-flex items-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </section>
    </div>
  );
}
