import Link from "next/link";
import {
  Flame, ArrowRight, Shield, Clock, Star, CheckCircle,
  Wrench, ThumbsUp, PoundSterling, Thermometer
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a56db] to-[#0f3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 px-4 py-1.5 rounded-full text-sm mb-6 backdrop-blur">
              <Flame className="w-4 h-4 text-orange-400" />
              The UK&apos;s smartest boiler quoting tool
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              New boiler?<br />
              Get a fixed price in{" "}
              <span className="text-orange-400">90 seconds</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
              Answer 7 simple questions about your home and get an instant, personalised boiler quote. No contact details required. No obligation. No surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote/boiler"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Get Your Free Boiler Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              From &pound;1,595 fully installed. Finance available from &pound;26.58/mo
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#1a56db] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Fixed Prices</p>
                <p className="text-xs text-gray-500">No hidden costs ever</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#1a56db] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Next Day Install</p>
                <p className="text-xs text-gray-500">Order by 3pm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-[#1a56db] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">45,000+ Reviews</p>
                <p className="text-xs text-gray-500">5-star rated</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-[#1a56db] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Up to 12yr Warranty</p>
                <p className="text-xs text-gray-500">Manufacturer backed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boiler Types */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Which boiler is right for you?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Not sure? Don&apos;t worry &mdash; our quiz will recommend the perfect boiler based on your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/quote/boiler"
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-red-50 text-red-500 transition-transform group-hover:scale-110">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1a56db] transition-colors">
                Combi Boilers
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                The most popular choice. Heats water on demand with no need for a separate tank or cylinder. Perfect for small to medium homes.
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  From <span className="font-bold text-gray-900">&pound;1,595</span>
                </p>
                <span className="text-[#1a56db] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            <Link
              href="/quote/boiler"
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-blue-50 text-blue-500 transition-transform group-hover:scale-110">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1a56db] transition-colors">
                System Boilers
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Works with a hot water cylinder for homes with higher hot water demand. Ideal for larger families with multiple bathrooms.
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  From <span className="font-bold text-gray-900">&pound;2,199</span>
                </p>
                <span className="text-[#1a56db] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            <Link
              href="/quote/boiler"
              className="group bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 hover:shadow-xl hover:border-purple-300 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Save &pound;7,500
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">
                <Thermometer className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                Consider a Heat Pump?
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Replacing a gas boiler? A heat pump could save you money long-term with the &pound;7,500 government grant covering a huge chunk of the cost.
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  From <span className="font-bold text-gray-900">&pound;7,999</span>
                </p>
                <span className="text-purple-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-500">
              Three simple steps to your new boiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Answer 7 quick questions",
                description: "Tell us your fuel type, boiler type, property size, and a few other details. Takes under 90 seconds.",
              },
              {
                step: "2",
                title: "Get your fixed price",
                description: "Compare boilers from Worcester Bosch, Vaillant, Ideal & Navien. Every price includes full installation.",
              },
              {
                step: "3",
                title: "Book your installation",
                description: "Choose a date that works for you. Our Gas Safe registered engineers handle everything from start to finish.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#1a56db] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/quote/boiler"
              className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1642a3] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Start Your Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted brands
            </h2>
            <p className="text-lg text-gray-500">
              We only install boilers from the UK&apos;s most trusted manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Worcester Bosch", warranty: "Up to 10 years", desc: "UK's #1 boiler brand" },
              { name: "Vaillant", warranty: "Up to 12 years", desc: "German engineering excellence" },
              { name: "Ideal", warranty: "Up to 7 years", desc: "Reliable & great value" },
              { name: "Navien", warranty: "Up to 5 years", desc: "Affordable & efficient" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 font-bold text-sm">{brand.name.split(" ")[0]}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{brand.desc}</p>
                <p className="text-xs text-[#1a56db] font-medium">{brand.warranty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why get your boiler quote with us?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <PoundSterling className="w-6 h-6" />,
                title: "Fixed prices",
                desc: "Your quote won't change. The price you see includes everything &mdash; boiler, installation, parts, and labour.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Gas Safe engineers",
                desc: "Every installation is carried out by a fully accredited, Gas Safe registered engineer.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Next-day installation",
                desc: "Order by 3pm and we can have a brand new boiler installed in your home the very next day.",
              },
              {
                icon: <ThumbsUp className="w-6 h-6" />,
                title: "Price match promise",
                desc: "Found an identical quote cheaper? We'll beat it. Simple as that.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-50 text-[#1a56db] rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a56db] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for a new boiler?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of happy customers who got their fixed-price boiler quote online. It takes less than 90 seconds.
          </p>
          <Link
            href="/quote/boiler"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Get Your Free Boiler Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
