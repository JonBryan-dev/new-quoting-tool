import type { Metadata } from "next";
import Link from "next/link";
import {
  Award, ArrowRight, ExternalLink, Phone, ShieldCheck, Star, Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditations & Trust | MCS, Heat Geek, Gas Safe, Which? Trusted",
  description:
    "The accreditations behind PlumbGas Renewables: MCS certification, Heat Geek training, Gas Safe registration, Which? Trusted Trader endorsement and Octopus Energy partnership — and what each one actually guarantees you.",
  alternates: { canonical: "/accreditations" },
};

const ACCREDITATIONS = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    name: "MCS Certified Installer",
    body: "The Microgeneration Certification Scheme is the UK's quality mark for renewable installations — and the legal requirement for claiming the £7,500 Boiler Upgrade Scheme grant. MCS certification means our designs, installations and paperwork are independently audited, and every install is registered with a certificate you'll need for grants, warranties and selling your home.",
    linkLabel: "Verify on the MCS installer directory",
    href: "https://mcscertified.com/find-an-installer/",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    name: "Heat Geek Trained",
    body: "Heat Geek is the UK's most respected heat pump design and training community, famous for one obsession: designing systems that run at the lowest possible flow temperature for the highest real-world efficiency. Our engineers train to Heat Geek standards — room-by-room heat loss, emitter verification, weather compensation — which is why we survey before we quote, every time.",
    linkLabel: "View our Heat Geek partner profile",
    href: "https://upgrades.heatgeek.com/partner/plumbgas-services-limited/",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    name: "Gas Safe Registered",
    body: "Every engineer working on gas in your home is on the Gas Safe Register — the legal requirement for gas work in the UK. It matters even for heat pump jobs: safely decommissioning your old gas boiler and capping or removing the supply is part of most installations we do.",
    linkLabel: "Check the Gas Safe Register",
    href: "https://www.gassaferegister.co.uk/",
  },
  {
    icon: <Award className="w-7 h-7" />,
    name: "Which? Trusted Trader",
    body: "Endorsement from the UK's best-known consumer champion. Which? assesses trading practices, checks references and monitors feedback — and gives you access to an independent dispute resolution service. We've been endorsed for years across our plumbing and heating work.",
    linkLabel: "See our Which? Trusted Trader profile",
    href: "https://trustedtraders.which.co.uk/",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    name: "Octopus Energy Partner",
    body: "We work with Octopus Energy's installer network, and we'll set your system up to make the most of heat-pump-friendly tariffs like Cosy Octopus — because a well-designed heat pump on the right tariff is where running costs get genuinely cheap.",
    linkLabel: "About Octopus heat pump tariffs",
    href: "https://octopus.energy/smart/cosy-octopus/",
  },
  {
    icon: <Star className="w-7 h-7" />,
    name: "4.9★ on Trustpilot",
    body: "270+ five-star reviews from customers across Staffordshire, built over two decades of plumbing and heating work as PlumbGas Services. Read them unfiltered — including how we handle it on the rare occasion something goes wrong.",
    linkLabel: "Read our Trustpilot reviews",
    href: "https://www.trustpilot.com/review/plumbgas.services",
  },
];

export default function AccreditationsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0c3560] via-[#144E82] to-[#1C834B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Accreditations</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Why you can trust us with your heating
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Anyone can claim to be good. These are the independent bodies that audit,
            certify and endorse our work — and what each one actually guarantees you.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACCREDITATIONS.map((a) => (
              <div key={a.name} className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col">
                <div className="w-14 h-14 bg-green-50 text-[#1C834B] rounded-xl flex items-center justify-center mb-4">
                  {a.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{a.name}</h2>
                <p className="text-gray-500 text-sm mb-4 flex-1">{a.body}</p>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C834B] hover:underline"
                >
                  {a.linkLabel}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Credentials are the floor, not the ceiling
          </h2>
          <p className="text-gray-500 mb-6">
            The real proof is the design work on every job — which is why every quote
            starts with a free, room-by-room heat loss survey.
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
              href="tel:07872626573"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#144E82] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
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
