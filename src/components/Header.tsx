"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Flame } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#144E82] rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#F26430]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-gray-900">
                Plumb<span className="text-[#F26430]">Gas</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/quote/boiler" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Boiler Quotes
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              How It Works
            </Link>
            <Link href="/#brands" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Our Brands
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:01785663990" className="flex items-center gap-2 text-sm font-semibold text-[#144E82]">
              <Phone className="w-4 h-4" />
              01785 663 990
            </a>
            <Link
              href="/quote/boiler"
              className="bg-[#F26430] hover:bg-[#d94f1a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/quote/boiler" className="block text-gray-700 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Boiler Quotes
            </Link>
            <Link href="/#how-it-works" className="block text-gray-700 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/#brands" className="block text-gray-700 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Our Brands
            </Link>
            <a href="tel:01785663990" className="block text-[#144E82] font-semibold" onClick={() => setMenuOpen(false)}>
              01785 663 990
            </a>
            <Link
              href="/quote/boiler"
              className="block bg-[#F26430] text-white text-center px-5 py-3 rounded-lg font-medium mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
