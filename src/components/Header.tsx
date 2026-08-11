"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, CalendarCheck, ChevronDown } from "lucide-react";

const SERVICE_LINKS = [
  { href: "/services/heat-pump-installation", label: "Heat Pump Installation" },
  { href: "/services/heat-loss-surveys", label: "Free Heat Loss Surveys" },
  { href: "/services/heat-pump-servicing", label: "Heat Pump Servicing" },
  { href: "/services/underfloor-heating", label: "Underfloor Heating" },
  { href: "/services/air-conditioning", label: "Air Conditioning" },
  { href: "/services/boiler-installation", label: "Boiler Installation" },
  { href: "/services/boiler-servicing", label: "Boiler Servicing & Repairs" },
  { href: "/services", label: "All services →" },
];

const GRANT_LINKS = [
  { href: "/boiler-upgrade-scheme", label: "£7,500 heat pump grant" },
  { href: "/oil-boiler-grant", label: "£9,000 oil & LPG grant" },
];

const EXPLORE_LINKS = [
  { href: "/heat-pumps", label: "Areas" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium py-5"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 -mt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#4e7522]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/pg-renewables-logo.svg"
              alt="PG Renewables"
              width={157}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <NavDropdown label="Services" links={SERVICE_LINKS} />
            <Link
              href="/zerodisrupt"
              className="text-[#4e7522] hover:text-[#3f5e1b] text-sm font-bold"
            >
              £3k Heat Pumps
            </Link>
            <NavDropdown label="Grants" links={GRANT_LINKS} />
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:07872626573"
              className="flex items-center gap-2 border border-[#4e7522] text-[#4e7522] hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <Link
              href="/book"
              className="flex items-center gap-2 bg-[#83b54b] hover:bg-[#74a43f] text-[#213311] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Survey
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:07872626573"
              className="flex items-center gap-1.5 bg-[#83b54b] text-[#213311] px-3.5 py-2 rounded-lg text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Services</p>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 font-medium pl-3"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-2">Grants</p>
            {GRANT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 font-medium pl-3"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-2">Explore</p>
            <Link
              href="/zerodisrupt"
              className="block text-[#4e7522] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              £3k Heat Pumps
            </Link>
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote/heatpump"
              className="block text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Instant Estimate
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-3">
              <a
                href="tel:07872626573"
                className="flex items-center justify-center gap-2 border border-[#4e7522] text-[#4e7522] px-4 py-3 rounded-lg font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 bg-[#83b54b] text-[#213311] px-4 py-3 rounded-lg font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                <CalendarCheck className="w-4 h-4" />
                Book Survey
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
