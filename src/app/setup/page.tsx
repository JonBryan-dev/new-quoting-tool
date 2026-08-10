import type { Metadata } from "next";
import SetupForm from "./SetupForm";

export const metadata: Metadata = {
  title: "One-time Setup",
  robots: { index: false, follow: false },
};

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">One-time setup</h1>
        <p className="text-sm text-gray-500 mb-6">
          Creates the site&apos;s database tables and your admin login. Runs once, then locks
          itself forever.
        </p>
        <SetupForm />
      </div>
    </div>
  );
}
