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

// SEO Command Centre — rendered as a tab inside the admin dashboard.
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
      <ContentStudio anthropicReady={Boolean(status?.anthropicKey)} />
      <KeywordTracker enabled={Boolean(status?.tablesReady)} />
      <TaskChecklist enabled={Boolean(status?.tablesReady)} />
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
          ? "Connected — keywords, tasks and drafts are being saved"
          : "Connected, but SEO tables missing — run npm run db:push on the laptop"
        : "Not connected — add PRISMA_DATABASE_URL in Vercel, then run npm run db:push",
    },
    {
      ok: Boolean(status?.anthropicKey),
      label: "Claude (Content Studio)",
      detail: status?.anthropicKey
        ? "API key set — drafting is live"
        : "Add ANTHROPIC_API_KEY in Vercel to switch on AI drafting",
    },
    {
      ok: Boolean(status?.googleServiceAccount),
      label: "Google APIs (Phase C)",
      detail: status?.googleServiceAccount
        ? "Service account set — Search Console + GA4 feeds ready"
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
        <TrendingUp className="w-5 h-5 text-[#1C834B]" />
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

  const loadDrafts = useCallback(() => {
    fetch("/api/admin/seo/drafts")
      .then((r) => r.json())
      .then((d) => setDrafts(d.drafts || []))
      .catch(() => {});
  }, []);

  useEffect(loadDrafts, [loadDrafts]);

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
      setError("Request failed — check your connection and try again.");
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
        Claude drafts it, you review and publish. Nothing goes live automatically — that keeps
        Google&apos;s content guidelines on side.
      </p>

      {!anthropicReady && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 mb-4">
          Add <code className="font-mono">ANTHROPIC_API_KEY</code> in Vercel (Project Settings →
          Environment Variables) to switch this on. Get a key at console.anthropic.com — paste it
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
              No saved drafts yet — drafts save automatically once the database is connected.
            </p>
          )}
          {drafts.map((d) => (
            <details key={d.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <summary className="cursor-pointer text-sm text-gray-700">
                <span className="font-medium capitalize">{d.kind}</span>
                {d.targetPath && <span className="text-gray-400"> · {d.targetPath}</span>}
                <span className="text-gray-400">
                  {" "}
                  · {new Date(d.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {d.status}
                </span>
              </summary>
              <p className="text-xs text-gray-500 mt-2 mb-1">Brief: {d.brief}</p>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto mt-2">
                {d.content}
              </pre>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Keyword rank tracker ───────────────────────────────────

function KeywordTracker({ enabled }: { enabled: boolean }) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newPhrase, setNewPhrase] = useState("");
  const [newPath, setNewPath] = useState("");
  const [positions, setPositions] = useState<Record<string, string>>({});

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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-1">Keyword tracker</h3>
      <p className="text-sm text-gray-500 mb-4">
        Search each phrase in an incognito window weekly and record where the site appears. Once
        the Search Console API is connected (Phase C), positions fill in automatically.
      </p>

      {!enabled ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          Needs the database — complete the PRISMA_DATABASE_URL setup to switch this on.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                  <th className="py-2 pr-4">Keyword</th>
                  <th className="py-2 pr-4">Target page</th>
                  <th className="py-2 pr-4">History (newest first)</th>
                  <th className="py-2 pr-4">Log position</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {keywords.map((k) => (
                  <tr key={k.id} className="border-b border-gray-100 last:border-0 align-middle">
                    <td className="py-2.5 pr-4 font-medium text-gray-900">{k.phrase}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{k.targetPath || "—"}</td>
                    <td className="py-2.5 pr-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {k.checks.length === 0 && <span className="text-gray-300">no checks yet</span>}
                        {k.checks.map((c) => (
                          <span
                            key={c.id}
                            title={new Date(c.checkedAt).toLocaleDateString("en-GB")}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              c.position == null
                                ? "bg-gray-100 text-gray-400"
                                : c.position <= 3
                                  ? "bg-green-100 text-green-700"
                                  : c.position <= 10
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {c.position == null ? "100+" : `#${c.position}`}
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
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-[#144E82]"
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
                          title="Save position (blank = not in top 100)"
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
                ))}
              </tbody>
            </table>
          </div>

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
              className="flex items-center gap-2 px-4 py-2 bg-[#1C834B] text-white text-sm rounded-lg hover:bg-[#166a3c]"
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
            title="Reopen all weekly tasks — do this each Monday"
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
          Needs the database — complete the PRISMA_DATABASE_URL setup to switch this on.
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
              className="flex items-center gap-2 px-4 py-2 bg-[#1C834B] text-white text-sm rounded-lg hover:bg-[#166a3c]"
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
