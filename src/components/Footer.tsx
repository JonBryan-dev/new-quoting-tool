import Link from "next/link";
import { Flame, Shield, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#144E82] rounded-lg flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#F26430]" />
              </div>
              <span className="text-lg font-bold text-white">
                Plumb<span className="text-[#F26430]">Gas</span>
              </span>
            </div>
            <p className="text-sm mb-4">
              Independent plumbing &amp; heating company serving Stafford, Stone &amp; Uttoxeter since 2003. Which? Trusted Traders endorsed.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs bg-gray-800 px-2.5 py-1.5 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#F26430]" />
                <span className="text-gray-300">Gas Safe</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-gray-800 px-2.5 py-1.5 rounded-lg">
                <Award className="w-3.5 h-3.5 text-[#1C834B]" />
                <span className="text-gray-300">Which? Trusted</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-gray-800 px-2.5 py-1.5 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#144E82]" />
                <span className="text-gray-300">MCS</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Boiler Installation</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Boiler Servicing</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Boiler Repair</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Heat Pumps</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Central Heating</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.plumbgas.services/about-us/" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://www.trustpilot.com/review/plumbgas.services" className="hover:text-white transition-colors">Reviews</a></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#brands" className="hover:text-white transition-colors">Our Brands</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:01785663990" className="hover:text-white transition-colors font-medium">
                  01785 663 990
                </a>
              </li>
              <li>
                <a href="mailto:contact@plumbgas.services" className="hover:text-white transition-colors">
                  contact@plumbgas.services
                </a>
              </li>
              <li>29c Marston Rd, Stafford ST16 3BS</li>
              <li>Mon &ndash; Fri: 8am &ndash; 7pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} PlumbGas Services Limited. All rights reserved. Company No. 10883260.
        </div>
      </div>
    </footer>
  );
}
