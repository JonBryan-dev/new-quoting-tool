"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/zerodisrupt", label: "£3k Heat Pumps", highlight: true },
  { href: "/boiler-upgrade-scheme", label: "£7,500 Grant" },
  { href: "/heat-pumps", label: "Areas" },
  { href: "/guides", label: "Guides" },
];

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.highlight
                    ? "text-[#1C834B] hover:text-[#166a3c] text-sm font-bold"
                    : "text-gray-600 hover:text-gray-900 text-sm font-medium"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:07872626573"
              className="flex items-center gap-2 border border-[#1C834B] text-[#1C834B] hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <Link
              href="/book"
              className="flex items-center gap-2 bg-[#1C834B] hover:bg-[#166a3c] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Survey
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:07872626573"
              className="flex items-center gap-1.5 bg-[#1C834B] text-white px-3.5 py-2 rounded-lg text-sm font-semibold"
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.highlight
                    ? "block text-[#1C834B] font-bold"
                    : "block text-gray-700 hover:text-gray-900 font-medium"
                }
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
                className="flex items-center justify-center gap-2 border border-[#1C834B] text-[#1C834B] px-4 py-3 rounded-lg font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 bg-[#1C834B] text-white px-4 py-3 rounded-lg font-semibold"
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
