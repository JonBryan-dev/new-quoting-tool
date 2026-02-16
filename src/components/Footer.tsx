import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-lg font-bold text-white">QuoteEngine</span>
            </div>
            <p className="text-sm">
              The smart way to get a fixed-price boiler quote. Instant online quotes, expert installation, no hidden costs.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Boilers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Get a Quote</Link></li>
              <li><Link href="/#brands" className="hover:text-white transition-colors">Our Brands</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">Combi Boilers</Link></li>
              <li><Link href="/quote/boiler" className="hover:text-white transition-colors">System Boilers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Price Match Promise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>0800 123 4567</li>
              <li>hello@quoteengine.co.uk</li>
              <li>Mon - Fri: 8am - 8pm</li>
              <li>Sat: 9am - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} QuoteEngine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
