"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Shield, Phone, Calendar, Thermometer, ArrowRight } from "lucide-react";
import { getProductById } from "@/lib/products";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const total = parseFloat(searchParams.get("total") || "0");
  const category = searchParams.get("category") || "";

  const product = getProductById(productId);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", postcode: "" });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <Link href="/" className="text-[#1a56db] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Boiler quote submitted!</h1>
            <p className="text-gray-500 mb-6">
              We&apos;ve received your quote request for the {product.brand} {product.name}.
              Our team will be in touch within 24 hours to confirm your installation date.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Boiler</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Brand</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                <span className="text-gray-500 font-medium">Total price</span>
                <span className="font-bold text-lg">&pound;{total.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/"
              className="inline-block bg-[#1a56db] hover:bg-[#1642a3] text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Back to home
            </Link>
          </div>

          {/* Heat pump upsell on confirmation */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Thinking about going green?
                </h3>
                <p className="text-gray-600 text-sm">
                  The government is offering <strong>&pound;7,500 grants</strong> towards air source heat pumps
                  through the Boiler Upgrade Scheme. A heat pump could replace your gas boiler entirely and lower
                  your energy bills long term.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href="/quote/boiler"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Get a Heat Pump Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-gray-500 self-center">
                Same quick process &mdash; check if you qualify for the &pound;7,500 grant
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href={`/results?category=${category}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to boiler results
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Complete your boiler quote
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your details</h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter your details so we can arrange your boiler installation.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="07123 456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    required
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="SW1A 1AA"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1a56db] hover:bg-[#1642a3] text-white py-4 rounded-xl font-semibold text-lg transition-colors mt-4"
                >
                  Submit Boiler Quote Request
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order summary</h2>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="font-bold text-gray-900">{product.name}</p>
                <div className="flex gap-2 mt-2">
                  {product.kw && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {product.kw}kW
                    </span>
                  )}
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    {product.warranty}yr warranty
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Boiler + installation</span>
                  <span className="font-medium">&pound;{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">&pound;{total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  or from &pound;{(total / 60).toFixed(2)}/mo
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Fixed price, no hidden costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>Next-day installation available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>24/7 aftercare support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
