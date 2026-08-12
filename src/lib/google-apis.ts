import crypto from "crypto";

// Google Search Console + GA4 Data API access via a service account,
// using Node's built-in crypto for the JWT, no googleapis dependency.
//
// Required env vars (all set in Vercel):
//   GOOGLE_SERVICE_ACCOUNT_KEY  full JSON key file contents
//   GA4_PROPERTY_ID             numeric GA4 property id (Admin → Property Settings)
//   GSC_SITE_URL                optional, defaults try the domain property
//                               then the https URL-prefix property

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

const GSC_SITE_CANDIDATES = [
  "sc-domain:plumbgasrenewables.services",
  "https://www.plumbgasrenewables.services/",
];

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

export function getServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.client_email === "string" && typeof parsed.private_key === "string") {
      // Env-var paste sometimes double-escapes the key's newlines
      return { client_email: parsed.client_email, private_key: parsed.private_key.replace(/\\n/g, "\n") };
    }
    return null;
  } catch {
    return null;
  }
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

export async function getGoogleAccessToken(): Promise<string> {
  const sa = getServiceAccount();
  if (!sa) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set or is not valid JSON");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPES.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(sa.private_key).toString("base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google token exchange returned no access token");
  return data.access_token;
}

// ── Search Console ─────────────────────────────────────────

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function gscQuery(
  token: string,
  siteUrl: string,
  dimension: "query" | "page",
  rowLimit: number,
): Promise<GscRow[]> {
  const end = new Date();
  const start = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: [dimension],
        rowLimit,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Search Console query failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { rows?: GscRow[] };
  return data.rows ?? [];
}

// Resolves which Search Console property the service account can read
// (domain property vs URL-prefix), then returns queries and pages.
//
// The query limit is deliberately high. Tracked keywords are matched
// against this list, so a small limit meant anything outside the site's
// very top queries never got a recorded position, which is why most of
// the tracker sat empty. Callers that display the list should slice it.
const QUERY_ROW_LIMIT = 1000;

export async function fetchSearchConsole(token: string): Promise<{
  siteUrl: string;
  queries: GscRow[];
  pages: GscRow[];
}> {
  const candidates = process.env.GSC_SITE_URL
    ? [process.env.GSC_SITE_URL]
    : GSC_SITE_CANDIDATES;

  let lastError: Error | null = null;
  for (const siteUrl of candidates) {
    try {
      const queries = await gscQuery(token, siteUrl, "query", QUERY_ROW_LIMIT);
      const pages = await gscQuery(token, siteUrl, "page", 25);
      return { siteUrl, queries, pages };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }
  throw lastError ?? new Error("No Search Console property reachable");
}

// ── GA4 Data API ───────────────────────────────────────────

export interface Ga4Summary {
  sessions: number;
  activeUsers: number;
  leads: number; // generate_lead event count
}

export async function fetchGa4Summary(token: string): Promise<Ga4Summary> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("GA4_PROPERTY_ID is not set");

  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const dateRanges = [{ startDate: "28daysAgo", endDate: "today" }];

  const totalsRes = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dateRanges,
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    }),
  });
  if (!totalsRes.ok) {
    throw new Error(`GA4 report failed (${totalsRes.status}): ${await totalsRes.text()}`);
  }
  const totals = (await totalsRes.json()) as {
    rows?: { metricValues?: { value?: string }[] }[];
  };
  const totalRow = totals.rows?.[0]?.metricValues ?? [];
  const sessions = Number(totalRow[0]?.value ?? 0);
  const activeUsers = Number(totalRow[1]?.value ?? 0);

  let leads = 0;
  const leadsRes = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dateRanges,
      metrics: [{ name: "eventCount" }],
      dimensions: [{ name: "eventName" }],
      dimensionFilter: {
        filter: { fieldName: "eventName", stringFilter: { value: "generate_lead" } },
      },
    }),
  });
  if (leadsRes.ok) {
    const leadsData = (await leadsRes.json()) as {
      rows?: { metricValues?: { value?: string }[] }[];
    };
    leads = Number(leadsData.rows?.[0]?.metricValues?.[0]?.value ?? 0);
  }

  return { sessions, activeUsers, leads };
}
