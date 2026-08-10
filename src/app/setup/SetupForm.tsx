"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Lock } from "lucide-react";

// One-time initialisation form. Once an admin user exists the API
// refuses further runs, and this form shows the done state instead.

export default function SetupForm() {
  const [state, setState] = useState<"loading" | "ready" | "done" | "no-db">("loading");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/setup")
      .then((r) => r.json())
      .then((d) => {
        if (!d.dbConnected) setState("no-db");
        else if (d.initialised) setState("done");
        else setState("ready");
      })
      .catch(() => setState("no-db"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Setup failed");
      } else {
        setState("done");
      }
    } catch {
      setError("Request failed, try again.");
    } finally {
      setBusy(false);
    }
  }

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2 text-gray-400 justify-center py-10">
        <Loader2 className="w-5 h-5 animate-spin" /> Checking…
      </div>
    );
  }

  if (state === "no-db") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
        The database isn&apos;t connected yet, so setup can&apos;t run. Check DATABASE_URL in
        Vercel and redeploy first.
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#4e7522] mx-auto mb-3" />
        <p className="font-semibold text-gray-900 mb-1">All set up</p>
        <p className="text-sm text-gray-600 mb-4">
          The database is initialised and your admin account exists. This page is now locked.
        </p>
        <a
          href="/admin/login"
          className="inline-block bg-[#4e7522] hover:bg-[#3f5e1b] text-white px-6 py-3 rounded-xl font-semibold"
        >
          Go to Admin Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Admin username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-gray-400">(at least 8 characters)</span>
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
        <input
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4e7522] outline-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 bg-[#4e7522] hover:bg-[#3f5e1b] text-white px-6 py-3.5 rounded-xl font-semibold disabled:opacity-50"
      >
        {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
        {busy ? "Setting up…" : "Create Tables & Admin Account"}
      </button>
    </form>
  );
}
