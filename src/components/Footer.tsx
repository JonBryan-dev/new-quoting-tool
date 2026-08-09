import Link from "next/link";
import { Leaf, Shield, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#144E82] rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#7ee2a8]" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">PG</span>{" "}
                <span className="text-[#4cc97e]">Renewables</span>
              </span>
            </div>
            <p className="text-sm mb-4">
              Air source heat pump installation and free heat loss surveys across
              Staffordshire, from the team behind PlumbGas Services &mdash; trusted local
              heating engineers since 2003.
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
              <li><Link href="/book" className="hover:text-white transition-colors">Free Heat Loss Survey</Link></li>
              <li><Link href="/zerodisrupt" className="hover:text-white transition-colors">ZeroDisrupt &mdash; &pound;3k Heat Pumps</Link></li>
              <li><Link href="/services/heat-pump-installation" className="hover:text-white transition-colors">Heat Pump Installation</Link></li>
              <li><Link href="/services/heat-pump-servicing" className="hover:text-white transition-colors">Heat Pump Servicing</Link></li>
              <li><Link href="/services/underfloor-heating" className="hover:text-white transition-colors">Underfloor Heating</Link></li>
              <li><Link href="/boiler-upgrade-scheme" className="hover:text-white transition-colors">&pound;7,500 Grant Guide</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Boiler Installation</Link></li>
              <li><Link href="/accreditations" className="hover:text-white transition-colors">Accreditations</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides &amp; Advice</Link></li>
              <li><a href="https://www.trustpilot.com/review/plumbgas.services" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Heat Pumps Near You</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/heat-pumps/stafford" className="hover:text-white transition-colors">Stafford</Link></li>
              <li><Link href="/heat-pumps/stone" className="hover:text-white transition-colors">Stone</Link></li>
              <li><Link href="/heat-pumps/cannock" className="hover:text-white transition-colors">Cannock</Link></li>
              <li><Link href="/heat-pumps/lichfield" className="hover:text-white transition-colors">Lichfield</Link></li>
              <li><Link href="/heat-pumps/stoke-on-trent" className="hover:text-white transition-colors">Stoke-on-Trent</Link></li>
              <li><Link href="/heat-pumps" className="hover:text-white transition-colors">All areas &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:07872626573" className="hover:text-white transition-colors font-medium">
                  07872 626573
                </a>
              </li>
              <li>
                <a href="mailto:info@plumbgasrenewables.services" className="hover:text-white transition-colors">
                  info@plumbgasrenewables.services
                </a>
              </li>
              <li>27 Barnbank Lane, Stafford ST17 9HB</li>
              <li>Mon &ndash; Fri: 8am &ndash; 7pm</li>
              <li className="pt-2 text-xs text-gray-500">
                Serving Stafford, Stone, Uttoxeter, Cannock, Lichfield, Stoke-on-Trent
                &amp; all of Staffordshire
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center space-y-1.5">
          <p>
            PG Renewables is the renewables arm of{" "}
            <a
              href="https://www.plumbgas.services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 underline hover:text-white"
            >
              PlumbGas Services
            </a>
            , Stafford&apos;s trusted heating company since 2003.
          </p>
          <p>
            &copy; {new Date().getFullYear()} PlumbGas Renewables. All rights reserved.
            PG Renewables is the trading name of Jon Bryan, 27 Barnbank Lane, Stafford ST17 9HB.
          </p>
        </div>
      </div>
    </footer>
  );
}
