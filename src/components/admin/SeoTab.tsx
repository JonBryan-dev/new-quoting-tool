"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { SEO_TASK_CATEGORIES } from "@/lib/seo-centre";

// SEO Command Centre, rendered as a tab inside the admin dashboard.
// Four sections: setup status, keyword rank tracker, Claude content
// studio, and the task checklist seeded from the SEO growth plan.

interface SeoStatus {
  dbConnected: boolean;
  tablesReady: boolean;
  anthropicKey: boolean;
  googleServiceAccount: boolean;
  ga4MeasurementId: string;
  counts: { keywords: number; openTasks: number; doneTasks: number; drafts: number; leads: number };
}

interface RankCheck {
  id: string;
  position: number | null;
  clicks: number | null;
  impressions: number | null;
  checkedAt: string;
}

interface Keyword {
  id: string;
  phrase: string;
  targetPath: string | null;
  checks: RankCheck[];
}

interface SeoTask {
  id: string;
  title: string;
  category: string;
  frequency: string | null;
  status: string;
}

interface Draft {
  id: string;
  kind: string;
  targetPath: string | null;
  brief: string;
  content: string;
  status: string;
  title: string | null;
  slug: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
}

const ASSISTANT_MODES = [
  { key: "meta", label: "Title & meta description" },
  { key: "article", label: "Full guide article" },
  { key: "improve", label: "Improve existing text" },
  { key: "keywords", label: "Keyword ideas" },
  { key: "gbp-post", label: "Google Business posts" },
  { key: "custom", label: "Custom brief" },
];

export default function SeoTab() {
  const [status, setStatus] = useState<SeoStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/seo/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#144E82] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatusSection status={status} />
      <ProgressSection />
      <GoogleSection />
      <ContentStudio anthropicReady={Boolean(status?.anthropicKey)} />
      <KeywordTracker enabled={Boolean(status?.tablesReady)} />
      <TaskChecklist enabled={Boolean(status?.tablesReady)} />
    </div>
  );
}

// ── Weekly progress ────────────────────────────────────────

interface Snapshot {
  id: string;
  weekStart: string;
  sessions: number;
  activeUsers: number;
  leads: number;
  gscClicks: number;
  gscImpressions: number;
  gscQueries: number;
  avgPosition: number | null;
  top10Count: number;
  tasksDone: number;
  tasksOpen: number;
  aiImpressions: number | null;
}

function Delta({ now, prev, downIsGood }: { now: number | null; prev: number | null; downIsGood?: boolean }) {
  if (now == null || prev == null || now === prev) return null;
  const up = now > prev;
  const good = downIsGood ? !up : up;
  return (
    <span className={`ml-1 text-[10px] font-bold ${good ? "text-green-600" : "text-red-500"}`}>
      {up ? "▲" : "▼"}
    </span>
  );
}

function ProgressSection() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [available, setAvailable] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [message, setMessage] = useState("");
  const [aiValue, setAiValue] = useState("");
  const [savingAi, setSavingAi] = useState(false);

  const load = useCallback(() => {
    fetch("/api/admin/seo/progress")
      .then((r) => r.json())
      .then((d) => {
        setAvailable(d.dbAvailable !== false);
        setSnapshots(d.snapshots || []);
      })
      .catch(() => setAvailable(false));
  }, []);

  useEffect(load, [load]);

  async function capture() {
    setCapturing(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seo/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "capture" }),
      });
      const data = await res.json();
      if (!res.ok) setMessage(data.error || "Capture failed");
      else {
        setMessage("Snapshot recorded for this week.");
        load();
      }
    } catch {
      setMessage("Capture failed, try again.");
    } finally {
      setCapturing(false);
    }
  }

  async function saveAiImpressions() {
    setSavingAi(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seo/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ai-impressions",
          value: aiValue === "" ? null : Number(aiValue),
        }),
      });
      const data = await res.json();
      if (!res.ok) setMessage(data.error || "Could not save");
      else {
        setMessage("AI visibility saved for this week.");
        setAiValue("");
        load();
      }
    } catch {
      setMessage("Could not save, try again.");
    } finally {
      setSavingAi(false);
    }
  }

  const fmtWeek = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-gray-900">Weekly progress</h3>
        <button
          onClick={capture}
          disabled={capturing || !available}
          className="flex items-center gap-1.5 text-xs text-[#4e7522] font-semibold hover:underline disabled:opacity-50"
        >
          {capturing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          {capturing ? "Capturing…" : "Capture snapshot now"}
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        One row per week, recorded automatically every Monday morning. Google figures are
        rolling 28-day totals at the time of capture; arrows compare with the week before.
      </p>
      {message && <p className="text-xs text-gray-500 mb-3">{message}</p>}

      {!available ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          Needs the database connected.
        </div>
      ) : snapshots.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-500">
          No snapshots yet. Tap &ldquo;Capture snapshot now&rdquo; to record your baseline week.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="py-2 pr-3">Week</th>
                <th className="py-2 pr-3 text-right">Sessions</th>
                <th className="py-2 pr-3 text-right">Visitors</th>
                <th className="py-2 pr-3 text-right">Leads</th>
                <th className="py-2 pr-3 text-right">Clicks</th>
                <th className="py-2 pr-3 text-right">Impressions</th>
                <th className="py-2 pr-3 text-right">Avg pos.</th>
                <th className="py-2 pr-3 text-right">Top-10 queries</th>
                <th className="py-2 pr-3 text-right">AI answers</th>
                <th className="py-2 text-right">Tasks done</th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map((s, i) => {
                const prev = snapshots[i + 1] ?? null;
                return (
                  <tr key={s.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-3 font-medium text-gray-900 whitespace-nowrap">
                      w/c {fmtWeek(s.weekStart)}
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.sessions.toLocaleString()}
                      <Delta now={s.sessions} prev={prev?.sessions ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.activeUsers.toLocaleString()}
                      <Delta now={s.activeUsers} prev={prev?.activeUsers ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right font-semibold text-gray-900">
                      {s.leads}
                      <Delta now={s.leads} prev={prev?.leads ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.gscClicks}
                      <Delta now={s.gscClicks} prev={prev?.gscClicks ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.gscImpressions.toLocaleString()}
                      <Delta now={s.gscImpressions} prev={prev?.gscImpressions ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.avgPosition ?? "–"}
                      <Delta now={s.avgPosition} prev={prev?.avgPosition ?? null} downIsGood />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.top10Count}
                      <Delta now={s.top10Count} prev={prev?.top10Count ?? null} />
                    </td>
                    <td className="py-2 pr-3 text-right text-gray-700">
                      {s.aiImpressions ?? "–"}
                      <Delta now={s.aiImpressions} prev={prev?.aiImpressions ?? null} />
                    </td>
                    <td className="py-2 text-right text-gray-700">
                      {s.tasksDone}
                      <span className="text-gray-400 text-xs"> / {s.tasksDone + s.tasksOpen}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {available && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            AI answers: how often Google&apos;s AI shows your site
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            Google reports this in Search Console but does not yet hand it over automatically, so
            this is the one number that needs typing in. Open Search Console, go to Performance,
            then the Generative AI report, set the date range to the last 28 days and copy the
            total impressions here. Takes about a minute, once a week.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min={0}
              value={aiValue}
              onChange={(e) => setAiValue(e.target.value)}
              placeholder="e.g. 240"
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
            />
            <button
              onClick={saveAiImpressions}
              disabled={savingAi}
              className="px-4 py-2 bg-[#83b54b] text-[#213311] text-sm font-semibold rounded-lg hover:bg-[#74a43f] disabled:opacity-50"
            >
              {savingAi ? "Saving…" : "Save for this week"}
            </button>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[#4e7522] font-medium hover:underline"
            >
              Open Search Console
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            While you are in there: Search Console now has a setting that removes your site from
            Google&apos;s AI answers. It is on by default in the UK, meaning you are included.
            Leave it alone. Turning it off would hide you from the fastest growing way people
            search.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Search performance (Search Console + GA4) ──────────────

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GoogleData {
  configured: { serviceAccount: boolean; ga4PropertyId: boolean };
  gsc: { siteUrl: string; queries: GscRow[]; pages: GscRow[] } | null;
  ga4: { sessions: number; activeUsers: number; leads: number } | null;
  errors: string[];
}

const GOOGLE_SETUP_STEPS = [
  "Go to console.cloud.google.com and create a project (e.g. \"pg-renewables-seo\").",
  "In \"APIs & Services → Library\", enable BOTH the \"Google Search Console API\" and the \"Google Analytics Data API\".",
  "In \"IAM & Admin → Service Accounts\", create a service account, then under its \"Keys\" tab add a new JSON key, a file downloads.",
  "In Vercel → Project Settings → Environment Variables, add GOOGLE_SERVICE_ACCOUNT_KEY and paste the ENTIRE contents of that JSON file as the value.",
  "In Search Console → Settings → Users and permissions, add the service account's email address (it ends @...iam.gserviceaccount.com) as a Restricted user.",
  "In GA4 → Admin → Property access management, add the same email as a Viewer.",
  "In GA4 → Admin → Property Settings, copy the numeric Property ID and add it to Vercel as GA4_PROPERTY_ID.",
  "Redeploy the site (Vercel → Deployments → Redeploy) and refresh this page.",
];

function GoogleSection() {
  const [data, setData] = useState<GoogleData | null>(null);
  const [syncMsg, setSyncMsg] = useState("");
  const [syncing, setSyncing] = useState(false);

  const load = useCallback(() => {
    fetch("/api/admin/seo/google")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  useEffect(load, [load]);

  async function syncKeywords() {
    setSyncing(true);
    setSyncMsg("");
    try {
      const res = await fetch("/api/admin/seo/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync-keywords" }),
      });
      const result = await res.json();
      setSyncMsg(
        res.ok
          ? `Synced ${result.synced} of ${result.totalTracked} tracked keywords from Search Console.`
          : result.error || "Sync failed",
      );
    } catch {
      setSyncMsg("Sync failed, try again.");
    } finally {
      setSyncing(false);
    }
  }

  const configured = data?.configured.serviceAccount;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-gray-900">Search performance</h3>
        {configured && (
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Live data from Google Search Console and GA4, last 28 days.
      </p>

      {!data ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : !configured ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            One-time setup (about 10 minutes, one Google Cloud service account unlocks both feeds):
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-blue-900">
            {GOOGLE_SETUP_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <>
          {data.errors.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 mb-4 space-y-1">
              {data.errors.map((e) => (
                <p key={e}>{e}</p>
              ))}
              {!data.configured.ga4PropertyId && (
                <p>GA4_PROPERTY_ID is not set, add it in Vercel for visitor numbers.</p>
              )}
            </div>
          )}

          {data.ga4 && (
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Sessions", value: data.ga4.sessions },
                { label: "Visitors", value: data.ga4.activeUsers },
                { label: "Leads (generate_lead)", value: data.ga4.leads },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {data.gsc && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">Top search queries</p>
                  <button
                    onClick={syncKeywords}
                    disabled={syncing}
                    className="text-xs text-[#144E82] hover:underline disabled:opacity-50"
                  >
                    {syncing ? "Syncing…" : "Sync positions to tracker"}
                  </button>
                </div>
                {syncMsg && <p className="text-xs text-gray-500 mb-2">{syncMsg}</p>}
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                      <th className="py-1.5 pr-3">Query</th>
                      <th className="py-1.5 pr-3 text-right">Clicks</th>
                      <th className="py-1.5 pr-3 text-right">Impr.</th>
                      <th className="py-1.5 text-right">Pos.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.gsc.queries.slice(0, 15).map((row) => (
                      <tr key={row.keys[0]} className="border-b border-gray-100 last:border-0">
                        <td className="py-1.5 pr-3 text-gray-800">{row.keys[0]}</td>
                        <td className="py-1.5 pr-3 text-right text-gray-600">{row.clicks}</td>
                        <td className="py-1.5 pr-3 text-right text-gray-500">{row.impressions}</td>
                        <td className="py-1.5 text-right font-medium text-gray-800">
                          {row.position.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                    {data.gsc.queries.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-3 text-gray-400 text-center">
                          No query data yet, normal for a new site; check back weekly.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Top pages</p>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                      <th className="py-1.5 pr-3">Page</th>
                      <th className="py-1.5 pr-3 text-right">Clicks</th>
                      <th className="py-1.5 text-right">Impr.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.gsc.pages.map((row) => (
                      <tr key={row.keys[0]} className="border-b border-gray-100 last:border-0">
                        <td className="py-1.5 pr-3 text-gray-800 break-all">
                          {row.keys[0]?.replace("https://www.plumbgasrenewables.services", "") || "/"}
                        </td>
                        <td className="py-1.5 pr-3 text-right text-gray-600">{row.clicks}</td>
                        <td className="py-1.5 text-right text-gray-500">{row.impressions}</td>
                      </tr>
                    ))}
                    {data.gsc.pages.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-3 text-gray-400 text-center">
                          No page data yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Setup status ───────────────────────────────────────────

function StatusSection({ status }: { status: SeoStatus | null }) {
  const items = [
    {
      ok: Boolean(status?.dbConnected && status?.tablesReady),
      label: "Database",
      detail: status?.dbConnected
        ? status?.tablesReady
          ? "Connected, keywords, tasks and drafts are being saved"
          : "Connected, but SEO tables missing, run npm run db:push on the laptop"
        : "Not connected, add PRISMA_DATABASE_URL in Vercel, then run npm run db:push",
    },
    {
      ok: Boolean(status?.anthropicKey),
      label: "Claude (Content Studio)",
      detail: status?.anthropicKey
        ? "API key set, drafting is live"
        : "Add ANTHROPIC_API_KEY in Vercel to switch on AI drafting",
    },
    {
      ok: Boolean(status?.googleServiceAccount),
      label: "Google APIs (Phase C)",
      detail: status?.googleServiceAccount
        ? "Service account set, Search Console + GA4 feeds ready"
        : "Coming next: one Google Cloud service account unlocks Search Console + GA4 data here",
    },
    {
      ok: true,
      label: "GA4 tracking",
      detail: `Live on the site (${status?.ga4MeasurementId ?? "G-F7Z434DHFX"}) with generate_lead events`,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-5 h-5 text-[#4e7522]" />
        <h2 className="text-lg font-bold text-gray-900">SEO Command Centre</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Everything for growing plumbgasrenewables.services in one place. Full plan:{" "}
        <a
          href="https://claude.ai/code/artifact/d48914c7-763c-4403-8f30-09172d958ca8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#144E82] underline inline-flex items-center gap-1"
        >
          SEO Growth Plan <ExternalLink className="w-3 h-3" />
        </a>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              {item.ok ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
            </div>
            <p className="text-xs text-gray-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Content Studio (Claude) ────────────────────────────────

function ContentStudio({ anthropicReady }: { anthropicReady: boolean }) {
  const [mode, setMode] = useState("meta");
  const [brief, setBrief] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edit, setEdit] = useState({ title: "", slug: "", metaDescription: "", content: "" });
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadDrafts = useCallback(() => {
    fetch("/api/admin/seo/drafts")
      .then((r) => r.json())
      .then((d) => setDrafts(d.drafts || []))
      .catch(() => {});
  }, []);

  useEffect(loadDrafts, [loadDrafts]);

  async function setDraftStatus(draftId: string, status: string) {
    try {
      const res = await fetch("/api/admin/seo/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", draftId, status }),
      });
      if (res.ok) loadDrafts();
    } catch {
      // list refresh next time round
    }
  }

  function startEditing(d: Draft) {
    setEditingId(d.id);
    setEditError("");
    setEdit({
      title: d.title || "",
      slug: d.slug || "",
      metaDescription: d.metaDescription || "",
      content: d.content,
    });
  }

  async function saveEdit(draftId: string) {
    setSaving(true);
    setEditError("");
    try {
      const res = await fetch("/api/admin/seo/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", draftId, ...edit }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.error || "Could not save");
      } else {
        setEditingId(null);
        loadDrafts();
      }
    } catch {
      setEditError("Could not save, check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function generate() {
    if (!brief.trim() || busy) return;
    setBusy(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/admin/seo/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          brief,
          targetPath: targetPath || undefined,
          currentText: mode === "improve" ? currentText : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data.content);
        loadDrafts();
      }
    } catch {
      setError("Request failed, check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-[#144E82]" />
        <h3 className="font-bold text-gray-900">Content Studio</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Claude drafts it, you review and publish. A fresh guide article also arrives here
        automatically every Wednesday morning (you get an email). Nothing goes live until you
        press Approve &amp; publish, that keeps Google&apos;s content guidelines on side.
      </p>

      {!anthropicReady && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 mb-4">
          Add <code className="font-mono">ANTHROPIC_API_KEY</code> in Vercel (Project Settings →
          Environment Variables) to switch this on. Get a key at console.anthropic.com, paste it
          straight into Vercel, never into email or chat.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What do you need?</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] outline-none"
          >
            {ASSISTANT_MODES.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target page (optional)
          </label>
          <input
            type="text"
            value={targetPath}
            onChange={(e) => setTargetPath(e.target.value)}
            placeholder="/heat-pumps/stafford"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] outline-none"
          />
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Brief</label>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        rows={3}
        placeholder="e.g. Guide about heat pump running costs in an average Stafford 3-bed semi, comparing against a gas boiler"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] outline-none mb-3"
      />

      {mode === "improve" && (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text to improve</label>
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            rows={5}
            placeholder="Paste the current page text here"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] outline-none mb-3"
          />
        </>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={generate}
          disabled={busy || !anthropicReady || !brief.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#144E82] text-white text-sm font-medium rounded-lg hover:bg-[#0e3a63] disabled:opacity-50"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {busy ? "Drafting…" : "Draft with Claude"}
        </button>
        <button
          onClick={() => setShowDrafts(!showDrafts)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {showDrafts ? "Hide" : "Show"} saved drafts ({drafts.length})
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-900">Draft</p>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-[#144E82] hover:underline"
            >
              Copy to clipboard
            </button>
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
            {result}
          </pre>
        </div>
      )}

      {showDrafts && (
        <div className="mt-4 space-y-2">
          {drafts.length === 0 && (
            <p className="text-sm text-gray-400">
              No saved drafts yet, drafts save automatically once the database is connected.
            </p>
          )}
          {drafts.map((d) => (
            <details key={d.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <summary className="cursor-pointer text-sm text-gray-700">
                <span className="font-medium">
                  {d.title || <span className="capitalize">{d.kind}</span>}
                </span>
                {d.targetPath && <span className="text-gray-400"> · {d.targetPath}</span>}
                <span className="text-gray-400">
                  {" "}
                  · {new Date(d.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    d.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {d.status === "published" ? "live" : d.status}
                </span>
              </summary>
              <p className="text-xs text-gray-500 mt-2 mb-1">Brief: {d.brief}</p>

              {editingId === d.id ? (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={edit.title}
                      onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Web address
                      </label>
                      <input
                        type="text"
                        value={edit.slug}
                        onChange={(e) => setEdit({ ...edit, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono outline-none focus:border-[#144E82]"
                      />
                      <p className="text-xs text-gray-400 mt-1">/guides/{edit.slug || "..."}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Google description
                      </label>
                      <textarea
                        value={edit.metaDescription}
                        onChange={(e) => setEdit({ ...edit, metaDescription: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
                      />
                      <p
                        className={`text-xs mt-1 ${
                          edit.metaDescription.length > 155 ? "text-amber-600" : "text-gray-400"
                        }`}
                      >
                        {edit.metaDescription.length}/155 characters
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Article
                    </label>
                    <textarea
                      value={edit.content}
                      onChange={(e) => setEdit({ ...edit, content: e.target.value })}
                      rows={18}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono leading-relaxed outline-none focus:border-[#144E82]"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Lines starting with ## become headings, lines starting with - become bullet
                      points, and **text** comes out bold.
                    </p>
                  </div>
                  {editError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                      {editError}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => saveEdit(d.id)}
                      disabled={saving}
                      className="px-4 py-2 bg-[#83b54b] text-[#213311] text-sm font-semibold rounded-lg hover:bg-[#74a43f] disabled:opacity-50"
                    >
                      {saving ? "Saving…" : "Save changes"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <pre className="text-xs text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto mt-2">
                  {d.content}
                </pre>
              )}

              {d.kind === "article" && d.slug && editingId !== d.id && (
                <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                  {d.status === "published" ? (
                    <>
                      <a
                        href={`/guides/${d.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#4e7522] hover:underline"
                      >
                        View live page ↗
                      </a>
                      <button
                        onClick={() => startEditing(d)}
                        className="text-xs font-medium text-[#144E82] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDraftStatus(d.id, "draft")}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Unpublish
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setDraftStatus(d.id, "published")}
                        className="px-3 py-1.5 bg-[#83b54b] text-[#213311] text-xs font-semibold rounded-lg hover:bg-[#74a43f]"
                      >
                        Approve &amp; publish
                      </button>
                      <button
                        onClick={() => startEditing(d)}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
                      >
                        Edit first
                      </button>
                    </>
                  )}
                  <span className="text-xs text-gray-400">/guides/{d.slug}</span>
                </div>
              )}
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Keyword rank tracker ───────────────────────────────────

// Position colour bands: top 3 is the money, top 10 is page one,
// anything past that is visible but rarely clicked.
function positionClass(position: number | null): string {
  if (position == null) return "bg-gray-100 text-gray-400";
  if (position <= 3) return "bg-green-100 text-green-700";
  if (position <= 10) return "bg-blue-50 text-blue-700";
  if (position <= 20) return "bg-amber-50 text-amber-700";
  return "bg-orange-50 text-orange-700";
}

// Positions improve by getting smaller, so a fall in the number is good.
function PositionMove({ from, to }: { from: number | null; to: number | null }) {
  if (from == null || to == null || from === to) return null;
  const better = to < from;
  return (
    <span
      className={`text-xs font-semibold ${better ? "text-green-600" : "text-red-500"}`}
      title={`Was #${from}`}
    >
      {better ? "▲" : "▼"} {Math.abs(from - to)}
    </span>
  );
}

function KeywordTracker({ enabled }: { enabled: boolean }) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newPhrase, setNewPhrase] = useState("");
  const [newPath, setNewPath] = useState("");
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"all" | "ranking" | "waiting">("all");

  const load = useCallback(() => {
    if (!enabled) return;
    fetch("/api/admin/seo/keywords")
      .then((r) => r.json())
      .then((d) => setKeywords(d.keywords || []))
      .catch(() => {});
  }, [enabled]);

  useEffect(load, [load]);

  async function post(body: Record<string, unknown>) {
    await fetch("/api/admin/seo/keywords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  // checks come back newest-first from the API
  const latestOf = (k: Keyword) => k.checks[0] ?? null;
  const rankingCount = keywords.filter((k) => latestOf(k)?.position != null).length;
  const best = keywords
    .map((k) => latestOf(k)?.position)
    .filter((p): p is number => p != null)
    .sort((a, b) => a - b)[0];

  const visible = keywords
    .filter((k) => {
      const ranked = latestOf(k)?.position != null;
      return filter === "all" || (filter === "ranking" ? ranked : !ranked);
    })
    // Ranking keywords first, best position at the top, then the rest A-Z
    .sort((a, b) => {
      const pa = latestOf(a)?.position ?? null;
      const pb = latestOf(b)?.position ?? null;
      if (pa != null && pb != null) return pa - pb;
      if (pa != null) return -1;
      if (pb != null) return 1;
      return a.phrase.localeCompare(b.phrase);
    });

  const FILTERS = [
    { key: "all" as const, label: `All (${keywords.length})` },
    { key: "ranking" as const, label: `Showing in Google (${rankingCount})` },
    { key: "waiting" as const, label: `Not yet (${keywords.length - rankingCount})` },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-1">Keyword tracker</h3>
      <p className="text-sm text-gray-500 mb-4">
        Positions come straight from Google Search Console and refresh every Monday, or whenever
        you press &quot;Sync positions from Google&quot; above. A blank position is not a fault, it
        means Google has not shown your site for that search in the last 28 days yet.
      </p>

      {!enabled ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          Needs the database, complete the PRISMA_DATABASE_URL setup to switch this on.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                {rankingCount}
                <span className="text-base font-normal text-gray-400">/{keywords.length}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">showing in Google</p>
            </div>
            {best != null && (
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">#{best}</p>
                <p className="text-xs text-gray-500 mt-1">best position</p>
              </div>
            )}
            <div className="flex gap-1.5 ml-auto">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                    filter === f.key
                      ? "bg-[#4e7522] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                  <th className="py-2 pr-4">Keyword</th>
                  <th className="py-2 pr-4">Position now</th>
                  <th className="py-2 pr-4 text-right">Seen</th>
                  <th className="py-2 pr-4 text-right">Clicks</th>
                  <th className="py-2 pr-4">Target page</th>
                  <th className="py-2 pr-4">History</th>
                  <th className="py-2 pr-4">Log</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {visible.map((k) => {
                  const latest = latestOf(k);
                  const previous = k.checks[1] ?? null;
                  return (
                    <tr key={k.id} className="border-b border-gray-100 last:border-0 align-middle">
                      <td className="py-2.5 pr-4 font-medium text-gray-900">{k.phrase}</td>
                      <td className="py-2.5 pr-4">
                        {latest?.position != null ? (
                          <span className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold px-2.5 py-1 rounded-lg ${positionClass(latest.position)}`}
                            >
                              #{latest.position}
                            </span>
                            <PositionMove from={previous?.position ?? null} to={latest.position} />
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">not yet</span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-gray-600">
                        {latest?.impressions ?? "—"}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-gray-600">
                        {latest?.clicks ?? "—"}
                      </td>
                      <td className="py-2.5 pr-4 text-gray-400 text-xs">{k.targetPath || "—"}</td>
                      <td className="py-2.5 pr-4">
                        <div className="flex gap-1 flex-wrap">
                          {k.checks.length === 0 && <span className="text-gray-300 text-xs">—</span>}
                          {k.checks.slice(0, 6).map((c) => (
                            <span
                              key={c.id}
                              title={new Date(c.checkedAt).toLocaleDateString("en-GB")}
                              className={`text-xs px-1.5 py-0.5 rounded ${positionClass(c.position)}`}
                            >
                              {c.position == null ? "100+" : c.position}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={positions[k.id] ?? ""}
                            onChange={(e) => setPositions({ ...positions, [k.id]: e.target.value })}
                            placeholder="#"
                            className="w-14 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-[#144E82]"
                          />
                          <button
                            onClick={() => {
                              const raw = positions[k.id];
                              post({
                                action: "check",
                                keywordId: k.id,
                                position: raw === "" || raw == null ? null : Number(raw),
                              });
                              setPositions({ ...positions, [k.id]: "" });
                            }}
                            className="p-1.5 text-[#144E82] hover:bg-blue-50 rounded"
                            title="Save a position you checked by hand"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Stop tracking "${k.phrase}"?`)) {
                              post({ action: "delete", keywordId: k.id });
                            }
                          }}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-sm text-gray-400">
                      Nothing in this view yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            &quot;Seen&quot; is how many times your site appeared in Google results for that search
            over the last 28 days. A keyword with lots of impressions but a poor position is
            usually the best one to work on next.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="text"
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              placeholder="New keyword, e.g. heat pump grants cannock"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
            />
            <input
              type="text"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="Target page (optional)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
            />
            <button
              onClick={() => {
                if (!newPhrase.trim()) return;
                post({ action: "add", phrase: newPhrase, targetPath: newPath });
                setNewPhrase("");
                setNewPath("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#83b54b] text-[#213311] text-sm rounded-lg hover:bg-[#3f5e1b]"
            >
              <Plus className="w-4 h-4" />
              Track
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Task checklist ─────────────────────────────────────────

function TaskChecklist({ enabled }: { enabled: boolean }) {
  const [tasks, setTasks] = useState<SeoTask[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("content");

  const load = useCallback(() => {
    if (!enabled) return;
    fetch("/api/admin/seo/tasks")
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks || []))
      .catch(() => {});
  }, [enabled]);

  useEffect(load, [load]);

  async function post(body: Record<string, unknown>) {
    await fetch("/api/admin/seo/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-gray-900">SEO checklist</h3>
        {enabled && (
          <button
            onClick={() => post({ action: "reset-weekly" })}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"
            title="Reopen all weekly tasks, do this each Monday"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset weekly tasks
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        The full growth plan as a working list. Weekly tasks reset each Monday; one-off tasks stay
        done.
      </p>

      {!enabled ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          Needs the database, complete the PRISMA_DATABASE_URL setup to switch this on.
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {SEO_TASK_CATEGORIES.map((cat) => {
              const catTasks = tasks.filter((t) => t.category === cat.key);
              if (catTasks.length === 0) return null;
              return (
                <div key={cat.key}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    {cat.label}
                  </p>
                  <div className="space-y-1">
                    {catTasks.map((t) => (
                      <div key={t.id} className="flex items-center gap-2 group">
                        <button onClick={() => post({ action: "toggle", taskId: t.id })}>
                          {t.status === "done" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                          )}
                        </button>
                        <span
                          className={`text-sm flex-1 ${
                            t.status === "done" ? "text-gray-400 line-through" : "text-gray-700"
                          }`}
                        >
                          {t.title}
                          {t.frequency === "weekly" && (
                            <span className="ml-2 text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                              weekly
                            </span>
                          )}
                        </span>
                        <button
                          onClick={() => post({ action: "delete", taskId: t.id })}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-5 pt-4 border-t border-gray-100">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add a task…"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#144E82]"
            >
              {SEO_TASK_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (!newTitle.trim()) return;
                post({ action: "add", title: newTitle, category: newCategory });
                setNewTitle("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#83b54b] text-[#213311] text-sm rounded-lg hover:bg-[#3f5e1b]"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}
