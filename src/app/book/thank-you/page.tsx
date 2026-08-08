import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

// Dedicated confirmation URL so analytics can treat the booking as a
// page-based conversion (/book/thank-you). Not indexed — it only makes
// sense after submitting the form.
export const metadata: Metadata = {
  title: "Survey request received",
  robots: { index: false, follow: false },
};

export default async function BookThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; date?: string }>;
}) {
  const { name, date } = await searchParams;
  const firstName = (name || "").split(" ")[0];
  let prettyDate = "";
  if (date) {
    const parsed = new Date(date + "T00:00:00");
    if (!isNaN(parsed.getTime())) {
      prettyDate = parsed.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Survey request received!
          </h1>
          <p className="text-gray-500 mb-6">
            Thanks{firstName ? ` ${firstName}` : ""} &mdash; we&apos;ll call you within 1
            working day to confirm your free heat loss survey
            {prettyDate && (
              <> for <strong>{prettyDate}</strong></>
            )}.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-green-800 font-medium mb-1">What happens next</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>1. We confirm a time that suits you</li>
              <li>2. A heating engineer visits and measures your home room by room (about 45 minutes)</li>
              <li>3. You get a fixed-price heat pump quote with the &pound;7,500 grant already applied &mdash; no obligation</li>
            </ul>
          </div>
          <Link
            href="/"
            className="inline-block bg-[#1C834B] hover:bg-[#166a3c] text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
