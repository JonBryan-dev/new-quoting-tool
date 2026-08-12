import type { Metadata } from "next";

// Temporary diagnostic page (noindex, unlinked): checks whether Heat Geek
// allow their estimate journey to be displayed inside our site. Cannot be
// tested from the build environment because heatgeek.com is unreachable
// there, so Jon runs it in a real browser instead.
//
// Takes the URL as a query parameter rather than hard-coding it, because
// the Heat Geek handle is a signed, per-address token that should not live
// in the repository. Only their domain is accepted.
//
// Delete this page once the answer is known.

export const metadata: Metadata = {
  title: "Embed test",
  robots: { index: false, follow: false },
};

const ALLOWED_PREFIX = "https://upgrades.heatgeek.com/";

export default async function EmbedTestPage({
  searchParams,
}: {
  searchParams: Promise<{ u?: string }>;
}) {
  const { u } = await searchParams;
  const valid = typeof u === "string" && u.startsWith(ALLOWED_PREFIX);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Can the Heat Geek estimate sit inside our site?
      </h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        This page is a test, not part of the website. Nobody can find it and
        Google will not index it.
      </p>

      {!valid ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
          <p className="font-semibold mb-2">Nothing to test yet</p>
          <p>
            Add a Heat Geek estimate address to the end of this page&apos;s web
            address, like this:
          </p>
          <p className="font-mono text-xs bg-white border border-amber-200 rounded p-2 mt-2 break-all">
            /embed-test?u=THE_HEAT_GEEK_LINK
          </p>
          <p className="mt-2">
            Only links beginning{" "}
            <span className="font-mono">{ALLOWED_PREFIX}</span> are accepted.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-[#eff5e4] border border-[#dde6cf] rounded-xl p-5 mb-5 text-sm text-[#213311]">
            <p className="font-semibold mb-1">What to look for</p>
            <p>
              If the Heat Geek questions appear in the bordered box below, they
              allow it and I can build this properly. If the box stays blank, or
              says something like &quot;refused to connect&quot;, they block it
              and we take a different route. Either answer is useful, so just
              tell me which one you see.
            </p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
            <iframe
              src={u}
              title="Heat Geek estimate embed test"
              className="w-full"
              style={{ height: "80vh", minHeight: "600px", border: "none" }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            A blank white box counts as blocked. Some browsers show nothing at
            all rather than an error message.
          </p>
        </>
      )}
    </div>
  );
}
