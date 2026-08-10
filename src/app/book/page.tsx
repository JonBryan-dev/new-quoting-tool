"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Home,
  Leaf,
  Phone,
  PoundSterling,
  Ruler,
  Shield,
} from "lucide-react";
import { getProductById } from "@/lib/products";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const SURVEY_TYPES = [
  {
    value: "heatpump",
    label: "Heat pump survey",
    desc: "Free heat loss survey for an air source heat pump, our most popular visit",
  },
  {
    value: "boiler",
    label: "Boiler replacement survey",
    desc: "Fixed-price quote visit for a new gas boiler",
  },
  {
    value: "ufh",
    label: "Underfloor heating survey",
    desc: "For new floors, extensions or retrofits",
  },
  {
    value: "other",
    label: "Not sure / something else",
    desc: "We'll work out what you need together",
  },
];

function minBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || "";
  const product = productId ? getProductById(productId) : undefined;
  const total = parseFloat(searchParams.get("total") || "0");
  const beforeGrant = parseFloat(searchParams.get("beforeGrant") || "0");
  const source = searchParams.get("source") || "direct";
  const propertyType = searchParams.get("propertyType") || "";
  const bedrooms = parseInt(searchParams.get("bedrooms") || "0");
  const bathrooms = parseInt(searchParams.get("bathrooms") || "0");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine: "",
    postcode: "",
    preferredDate: "",
    timeSlot: "either",
    notes: "",
    surveyType: "heatpump",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          productId: productId || undefined,
          productName: product
            ? `${product.brand} ${product.name}`
            : SURVEY_TYPES.find((t) => t.value === form.surveyType)?.label,
          quotedPrice: total > 0 ? total : undefined,
          priceBeforeGrant: beforeGrant > 0 ? beforeGrant : undefined,
          propertyType: propertyType || undefined,
          bedrooms: bedrooms > 0 ? bedrooms : undefined,
          bathrooms: bathrooms > 0 ? bathrooms : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      // GA4 conversion event, then a real confirmation URL so analytics
      // can also track the booking as a /book/thank-you page view
      window.gtag?.("event", "generate_lead", { lead_source: source });
      const confirmParams = new URLSearchParams();
      if (form.name) confirmParams.set("name", form.name);
      if (form.preferredDate) confirmParams.set("date", form.preferredDate);
      router.push(`/book/thank-you?${confirmParams.toString()}`);
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong, please call us on 07872 626573");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Book your free heat loss survey
          </h1>
          <p className="text-gray-500 mt-1">
            Completely free, takes about 45 minutes, no obligation. We cover all of Staffordshire.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your details</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What type of survey do you need?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SURVEY_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setForm({ ...form, surveyType: type.value })}
                        className={`text-left rounded-xl border-2 p-3.5 transition-all ${
                          form.surveyType === type.value
                            ? "border-[#4e7522] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="block font-semibold text-gray-900 text-sm">
                          {type.label}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">{type.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                      placeholder="07123 456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First line of address</label>
                    <input
                      type="text"
                      required
                      value={form.addressLine}
                      onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                      placeholder="1 High Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                    <input
                      type="text"
                      required
                      value={form.postcode}
                      onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                      placeholder="ST17 4AA"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred date <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="date"
                      min={minBookingDate()}
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time of day</label>
                    <div className="flex gap-2">
                      {[
                        { value: "am", label: "Morning" },
                        { value: "pm", label: "Afternoon" },
                        { value: "either", label: "Either" },
                      ].map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setForm({ ...form, timeSlot: slot.value })}
                          className={`flex-1 px-2 py-3 rounded-xl text-sm font-medium border transition-colors ${
                            form.timeSlot === slot.value
                              ? "bg-[#4e7522] text-white border-[#4e7522]"
                              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anything we should know? <span className="text-gray-400">(optional)</span></label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] focus:ring-2 focus:ring-green-100 outline-none transition-all resize-none"
                    placeholder="e.g. current boiler type, solar panels, underfloor heating, parking..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-colors mt-2 text-white bg-[#4e7522] hover:bg-[#3f5e1b] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {submitting ? "Sending..." : "Book My Free Survey"}
                  {!submitting && <ArrowRight className="w-5 h-5" />}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  No payment, no obligation. We&apos;ll only use your details to arrange your survey.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-6 lg:sticky lg:top-24">
              {product && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <p className="text-xs font-medium text-green-700 bg-green-50 inline-block px-2.5 py-1 rounded-full mb-3">
                    Your estimate
                  </p>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="font-bold text-gray-900">{product.name}</p>
                  {total > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {beforeGrant > 0 && (
                        <p className="text-sm text-gray-400 line-through">&pound;{beforeGrant.toLocaleString()}</p>
                      )}
                      <p className="text-2xl font-bold text-gray-900">&pound;{total.toLocaleString()}</p>
                      <p className="text-xs text-green-600 font-medium">After &pound;7,500 BUS grant, confirmed at your survey</p>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">What happens at your survey</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-green-50 text-[#4e7522] rounded-lg flex items-center justify-center shrink-0">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Room-by-room heat loss check</p>
                      <p className="text-gray-500">We measure your home properly, no guesswork sizing.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-green-50 text-[#4e7522] rounded-lg flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Radiators, cylinder &amp; unit position</p>
                      <p className="text-gray-500">We check what needs upgrading and where the heat pump will go.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-green-50 text-[#4e7522] rounded-lg flex items-center justify-center shrink-0">
                      <PoundSterling className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Fixed-price quote, grant applied</p>
                      <p className="text-gray-500">Your &pound;7,500 Boiler Upgrade Scheme grant handled by us.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-green-500" />
                  <span>100% free, no-obligation survey</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Gas Safe &amp; MCS accredited local engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-green-500" />
                  <span>Confirmed within 1 working day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  <span>&pound;7,500 grant application handled for you</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Phone className="w-4 h-4 text-[#144E82]" />
                  <a href="tel:07872626573" className="font-semibold text-[#144E82]">
                    Prefer to talk? Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#4e7522] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
