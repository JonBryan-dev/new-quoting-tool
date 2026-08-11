import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Check, Home, Phone, PoundSterling, Snowflake, Sun, Volume2,
} from "lucide-react";

const SITE_URL = "https://www.plumbgasrenewables.services";

export const metadata: Metadata = {
  title: "Air Conditioning Installation | Stafford & Staffordshire",
  description:
    "Home air conditioning across Stafford, Stone and Staffordshire that cools in summer and heats in winter. Quiet, efficient units sized properly for the room. Call for a free quote.",
  alternates: { canonical: "/services/air-conditioning" },
  openGraph: {
    title: "Home Air Conditioning in Staffordshire",
    description:
      "Air conditioning that cools in summer and heats efficiently in winter, installed across Staffordshire.",
    url: `${SITE_URL}/services/air-conditioning`,
  },
};

const FAQS = [
  {
    q: "Does air conditioning heat as well as cool?",
    a: "Yes, and this is the part most people do not realise. A modern air conditioning unit is an air-to-air heat pump: run it one way and it moves heat out of the room, run it the other way and it moves heat in. In heating mode it is far more efficient than an electric heater, which is why they are used as the main heating system across much of Europe and Japan.",
  },
  {
    q: "How much does home air conditioning cost to run?",
    a: "Less than most people expect, because it moves heat rather than creating it. The exact figure depends on the unit's efficiency rating, the size of the room and how long you run it. We will give you a realistic running cost for the specific unit we quote, based on your room and current electricity price, rather than a headline number off a brochure.",
  },
  {
    q: "Is there a grant for air conditioning?",
    a: "Possibly, and this is new. Air-to-air heat pumps were added to the Boiler Upgrade Scheme in April 2026 with a grant of £2,500 for residential properties. The scheme's rules are built around replacing a fossil fuel heating system, so whether a particular project qualifies depends on your setup rather than simply on fitting a unit. Ask us and we will tell you honestly whether yours is likely to.",
  },
  {
    q: "How noisy is it?",
    a: "Indoors, a well-chosen unit at normal settings is quieter than a fridge, and most people stop noticing it within a day. Outdoors there is a small fan unit that is audible up close and generally not from inside the house with the windows shut. Siting matters a great deal here, and it is worth doing properly rather than putting the outdoor unit under a bedroom window to save on pipework.",
  },
  {
    q: "Do I need planning permission?",
    a: "For most houses, no, as air conditioning units usually fall under permitted development, but there are conditions around siting, size and noise, and the rules are different for flats, listed buildings and conservation areas. We will flag it at the quote stage if your property is one where it needs checking.",
  },
  {
    q: "Can one unit do the whole house?",
    a: "No, and be cautious of anyone who says it can. Each indoor unit heats and cools the space it is in. A single unit suits one room or an open-plan space. For several rooms you either fit several units, or a multi-split system where one outdoor unit serves multiple indoor heads, which is usually tidier and cheaper than separate systems.",
  },
];

export default function AirConditioningPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Air Conditioning Installation",
    serviceType: "Air conditioning and air-to-air heat pump installation",
    areaServed: ["Stafford", "Stone", "Staffordshire"],
    provider: {
      "@type": "HVACBusiness",
      name: "PlumbGas Renewables",
      url: SITE_URL,
      telephone: "+447872626573",
    },
    description:
      "Home and small business air conditioning installation across Stafford, Stone and Staffordshire, cooling in summer and efficient heating in winter.",
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
            <span className="text-white">Air Conditioning</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Air conditioning in{" "}
            <span className="text-[#c4dd9b]">Stafford &amp; Staffordshire</span>
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Cool in July, warm in January. Modern air conditioning is an
            air-to-air heat pump, so the same unit that gets you through a
            heatwave is also one of the cheapest ways to heat a room.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call for a Quote
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors backdrop-blur"
            >
              Request a Visit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Two jobs, one box */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
            One unit, two jobs
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            People buy air conditioning for the two weeks a year the bedroom is
            unbearable, then discover they use it far more in winter.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="w-12 h-12 bg-blue-50 text-[#144E82] rounded-xl flex items-center justify-center mb-4">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Summer</h3>
              <p className="text-gray-600 text-sm">
                Bedrooms that hold heat all night, south-facing rooms, loft
                conversions and home offices with too much glass. A properly
                sized unit takes a room from uncomfortable to pleasant in
                minutes, and dehumidifies while it does it.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="w-12 h-12 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Winter</h3>
              <p className="text-gray-600 text-sm">
                In heating mode it moves heat into the room rather than burning
                anything, so it delivers several units of warmth per unit of
                electricity. Ideal for a garden room, a converted garage or an
                extension you would rather not put on the main heating system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant callout */}
      <section className="bg-[#eff5e4] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 bg-[#83b54b] text-[#213311] rounded-xl flex items-center justify-center shrink-0">
              <PoundSterling className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#213311] mb-2">
                New in 2026: air-to-air systems joined the grant scheme
              </h2>
              <p className="text-[#3f5e1b] text-sm mb-3">
                In April 2026 air-to-air heat pumps were added to the Boiler
                Upgrade Scheme, with a grant of &pound;2,500 for residential
                properties. The scheme is built around replacing a fossil fuel
                heating system, so whether your project qualifies depends on
                your setup rather than simply on fitting a unit. We are MCS
                certified and we will tell you honestly whether yours is likely
                to, before you spend anything.
              </p>
              <Link
                href="/boiler-upgrade-scheme"
                className="inline-flex items-center gap-1.5 text-[#4e7522] font-semibold text-sm hover:underline"
              >
                How the grant scheme works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              The bit that decides whether you like it
            </h2>
            <p className="text-gray-600 mb-4">
              Air conditioning is one of those products where the unit matters
              less than the install. An oversized system short-cycles, feels
              draughty and costs more to run. An undersized one runs flat out and
              never quite gets there. Put the outdoor unit in a lazy position and
              you will hear it for the next fifteen years.
            </p>
            <p className="text-gray-600 mb-6">
              We size from the room rather than from a rule of thumb, and we
              agree exactly where both units go before anyone drills anything.
              It is the same discipline we apply to{" "}
              <Link href="/services/heat-loss-surveys" className="text-[#4e7522] font-medium underline">
                heat loss surveys for heat pumps
              </Link>
              , because it is the same physics.
            </p>
            <ul className="space-y-3">
              {[
                "Room-by-room sizing, not guesswork",
                "Agreed siting for indoor and outdoor units before we start",
                "Tidy pipework runs, discussed with you first",
                "Quiet models specified where the unit is near a bedroom",
                "Handover so you actually know how to use the thing",
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
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Single rooms or whole homes</h3>
              </div>
              <p className="text-sm text-gray-600">
                One unit for a bedroom or office, or a multi-split system where a
                single outdoor unit serves several rooms. We will tell you which
                is better value for what you actually want.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Neighbours considered</h3>
              </div>
              <p className="text-sm text-gray-600">
                Outdoor unit placement takes account of boundaries and bedroom
                windows, yours and next door&apos;s. It costs nothing to think about
                at quote stage and a great deal to fix afterwards.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 text-[#4e7522] rounded-xl flex items-center justify-center">
                  <Snowflake className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Heating the whole house instead?</h3>
              </div>
              <p className="text-sm text-gray-600">
                If you want efficient heating everywhere rather than in one room,
                an{" "}
                <Link href="/services/heat-pump-installation" className="text-[#4e7522] font-medium underline">
                  air source heat pump
                </Link>{" "}
                on your radiators is the better answer, and it carries the larger
                grant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Air conditioning questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white rounded-xl border border-gray-200 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-[#4e7522] group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
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
            Talk to us about air conditioning
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Tell us the room and what bothers you about it, and we will tell you
            what it would take to fix. Covering Stafford, Stone and all of
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
