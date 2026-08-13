// SEO Command Centre, shared types and the default task plan.
// The task list is seeded into the SeoTask table the first time the
// admin SEO tab loads with a working database; after that the DB copy
// is the source of truth and Jon can add/complete/delete freely.

export interface SeoTaskSeed {
  title: string;
  category: "weekly" | "content" | "backlinks" | "gbp" | "technical";
  frequency: "weekly" | "monthly" | "once";
  sortOrder: number;
}

export const DEFAULT_SEO_TASKS: SeoTaskSeed[] = [
  // ── Weekly office routine ────────────────────────────────
  { title: "Check Search Console: new queries, clicks, coverage errors", category: "weekly", frequency: "weekly", sortOrder: 10 },
  { title: "Check GA4: sessions, generate_lead events, top landing pages", category: "weekly", frequency: "weekly", sortOrder: 20 },
  { title: "Reply to every new review (Google, Trustpilot, Checkatrade)", category: "weekly", frequency: "weekly", sortOrder: 30 },
  { title: "Post one GBP update (job photo, offer, or tip)", category: "weekly", frequency: "weekly", sortOrder: 40 },
  { title: "Ask one happy customer for a Google review", category: "weekly", frequency: "weekly", sortOrder: 50 },
  { title: "Record rank positions for tracked keywords (incognito search)", category: "weekly", frequency: "weekly", sortOrder: 60 },

  // ── Content engine ───────────────────────────────────────
  { title: "Publish first real case study with photos + measured figures", category: "content", frequency: "once", sortOrder: 100 },
  // Facts only Jon can confirm; the site deliberately does not claim
  // these until he does.
  { title: "Confirm whether we hold F-Gas certification, so it can go on the air conditioning page", category: "content", frequency: "once", sortOrder: 102 },
  { title: "Confirm Heat Geek Elite and Octopus Energy Partner status, then add both to the site and schema", category: "content", frequency: "once", sortOrder: 104 },
  { title: "Sanity-check the £9,000 oil/LPG grant figure in the MCS or Ofgem portal before pushing it in marketing", category: "content", frequency: "once", sortOrder: 106 },
  { title: "Send a photo of Jon for the About page", category: "content", frequency: "once", sortOrder: 108 },
  { title: "Draft new guide with Claude in Content Studio, review, publish", category: "content", frequency: "monthly", sortOrder: 110 },
  { title: "Add an About / Meet Jon page with a photo and story", category: "content", frequency: "once", sortOrder: 120 },
  { title: "Expand thin service pages: timelines, warranty, install-day detail", category: "content", frequency: "once", sortOrder: 130 },

  // ── Backlinks playbook ───────────────────────────────────
  // Expanded 2026-08-10 after Jon asked for the full backlink plan.
  { title: "Claim / update MCS installer directory listing with new domain", category: "backlinks", frequency: "once", sortOrder: 200 },
  { title: "Update Checkatrade & Which? Trusted Traders profiles to mention plumbgasrenewables.services", category: "backlinks", frequency: "once", sortOrder: 210 },
  { title: "Update Trustpilot profile website to plumbgasrenewables.services", category: "backlinks", frequency: "once", sortOrder: 212 },
  { title: "Check Gas Safe register entry lists the new website", category: "backlinks", frequency: "once", sortOrder: 214 },
  { title: "Link to renewables site from plumbgas.services heat pump pages", category: "backlinks", frequency: "once", sortOrder: 220 },
  { title: "Ask Vaillant / Viessmann / Daikin for installer-finder listings", category: "backlinks", frequency: "once", sortOrder: 230 },
  { title: "Ask Heat Geek rep about a partner profile page that links to the site", category: "backlinks", frequency: "once", sortOrder: 232 },
  { title: "Approach Staffordshire local press with a ZeroDisrupt story (£3k heat pumps)", category: "backlinks", frequency: "once", sortOrder: 240 },
  { title: "Set up citations: Bing Places, Apple Business Connect, Yell, FreeIndex", category: "backlinks", frequency: "once", sortOrder: 242 },
  { title: "Sponsor a local club or event (kit / website sponsorship earns a link)", category: "backlinks", frequency: "once", sortOrder: 244 },
  { title: "Join Staffordshire Chambers of Commerce (member directory listing)", category: "backlinks", frequency: "once", sortOrder: 246 },
  { title: "Pitch a ZeroDisrupt install case study to Installer / HVP magazine", category: "backlinks", frequency: "once", sortOrder: 248 },
  { title: "Ask merchant / suppliers about a customer spotlight feature", category: "backlinks", frequency: "once", sortOrder: 249 },
  { title: "Join / post in local Facebook groups & Nextdoor as the local heat pump expert", category: "backlinks", frequency: "monthly", sortOrder: 250 },
  // From the Aug 2026 research pack: specific finds with existing footholds
  { title: "Email SBEN (sben.co.uk) to add renewables site to existing green-supplier listing", category: "backlinks", frequency: "once", sortOrder: 251 },
  { title: "Update RECC member directory entry with renewables site", category: "backlinks", frequency: "once", sortOrder: 252 },
  { title: "Claim Reach plc directory listing: fix old Salcombe Avenue address, add new URL", category: "backlinks", frequency: "once", sortOrder: 253 },
  { title: "Reactivate Checkatrade profile, merge duplicates, add heat pump category", category: "backlinks", frequency: "once", sortOrder: 254 },
  { title: "Free directory claims afternoon: heatpumpinstallerdirectory, findcertifiedinstallers, findheatpumpsinstallers, renewablesexcellence", category: "backlinks", frequency: "once", sortOrder: 255 },
  { title: "Register on Staffordshire Trader Register (Trading Standards backed)", category: "backlinks", frequency: "once", sortOrder: 256 },
  { title: "Contact Stafford Rangers FC re sponsorship (commercial@staffordrangersfc.co.uk)", category: "backlinks", frequency: "once", sortOrder: 257 },
  { title: "Join Renewable Heating Hub forum, answer homeowner questions monthly", category: "backlinks", frequency: "monthly", sortOrder: 258 },
  { title: "NEVER buy links or Fiverr backlink packages (penalty risk on a new domain)", category: "backlinks", frequency: "once", sortOrder: 260 },

  // ── Google Business Profile ──────────────────────────────
  { title: "Create separate PG Renewables GBP (NAP: 27 Barnbank Lane, Stafford ST17 9HB, 07872 626573)", category: "gbp", frequency: "once", sortOrder: 300 },
  { title: "Add services + service areas (all 16 towns) to GBP", category: "gbp", frequency: "once", sortOrder: 310 },
  { title: "Upload 10+ real job photos to GBP", category: "gbp", frequency: "once", sortOrder: 320 },

  // ── Technical / setup ────────────────────────────────────
  { title: "Add PRISMA_DATABASE_URL in Vercel + run npm run db:push (unlocks leads + SEO data)", category: "technical", frequency: "once", sortOrder: 400 },
  { title: "Add ANTHROPIC_API_KEY in Vercel (unlocks Content Studio)", category: "technical", frequency: "once", sortOrder: 410 },
  { title: "Mark generate_lead as a key event in GA4 once data flows", category: "technical", frequency: "once", sortOrder: 420 },
  { title: "301-redirect the other 19 domains to plumbgasrenewables.services", category: "technical", frequency: "once", sortOrder: 430 },
  { title: "Set up Google Cloud service account for Search Console + GA4 APIs (Phase C)", category: "technical", frequency: "once", sortOrder: 440 },
  { title: "Register with Bing Webmaster Tools (Import from Google Search Console button): covers Bing, DuckDuckGo, Yahoo and ChatGPT search", category: "technical", frequency: "once", sortOrder: 450 },
  { title: "Check the AI answers setting in Search Console is left ON (it removes you from Google's AI results if switched off)", category: "technical", frequency: "once", sortOrder: 460 },
  { title: "Compress hero-survey.mp4 (17MB) and heat-pump-install.mp4 (13MB) to under 3MB each in HandBrake, then send them over to swap in", category: "technical", frequency: "once", sortOrder: 470 },
  { title: "Ask Heat Geek: can the estimate journey be embedded in our site, and what is the customer-facing generate-estimate URL?", category: "technical", frequency: "once", sortOrder: 480 },
  { title: "Capture the baseline snapshot in the SEO tab (Weekly progress, Capture snapshot now)", category: "technical", frequency: "once", sortOrder: 490 },
  { title: "Log AI answer impressions from the Search Console Generative AI report into the SEO tab", category: "weekly", frequency: "weekly", sortOrder: 70 },
];

// Starter keyword set, seeded once, then managed from the admin UI.
// Expanded 2026-08-10 at Jon's request ("more keywords needed"), based on
// the queries Search Console is already showing the site for.
export const DEFAULT_SEO_KEYWORDS: { phrase: string; targetPath: string }[] = [
  { phrase: "heat pump installation stafford", targetPath: "/heat-pumps/stafford" },
  { phrase: "stafford heat pump installation", targetPath: "/heat-pumps/stafford" },
  { phrase: "heat pumps stafford", targetPath: "/heat-pumps/stafford" },
  { phrase: "heat pump surveys stafford", targetPath: "/services/heat-loss-surveys" },
  { phrase: "free heat loss survey stafford", targetPath: "/services/heat-loss-surveys" },
  { phrase: "air source heat pump staffordshire", targetPath: "/services/heat-pump-installation" },
  { phrase: "air source heat pump stafford", targetPath: "/heat-pumps/stafford" },
  { phrase: "heat pump installers staffordshire", targetPath: "/services/heat-pump-installation" },
  { phrase: "heat pump installer near me", targetPath: "/" },
  { phrase: "boiler upgrade scheme stafford", targetPath: "/boiler-upgrade-scheme" },
  { phrase: "heat pump grant staffordshire", targetPath: "/boiler-upgrade-scheme" },
  { phrase: "heat pump cost staffordshire", targetPath: "/guides/heat-pump-cost-staffordshire-2026" },
  { phrase: "£3000 heat pump", targetPath: "/zerodisrupt" },
  { phrase: "cheap heat pump installation", targetPath: "/zerodisrupt" },
  { phrase: "heat pump installation stone", targetPath: "/heat-pumps/stone" },
  { phrase: "heat pump installation cannock", targetPath: "/heat-pumps/cannock" },
  { phrase: "heat pump installation lichfield", targetPath: "/heat-pumps/lichfield" },
  { phrase: "heat pump installation stoke-on-trent", targetPath: "/heat-pumps/stoke-on-trent" },
  { phrase: "heat pump installation rugeley", targetPath: "/heat-pumps/rugeley" },
  { phrase: "heat pump installation uttoxeter", targetPath: "/heat-pumps/uttoxeter" },
  // Added Aug 2026 with the boiler installation, oil grant and air con pages
  { phrase: "oil boiler replacement grant", targetPath: "/oil-boiler-grant" },
  { phrase: "£9000 heat pump grant", targetPath: "/oil-boiler-grant" },
  { phrase: "oil to heat pump staffordshire", targetPath: "/oil-boiler-grant" },
  { phrase: "off gas grid heat pump grant", targetPath: "/oil-boiler-grant" },
  { phrase: "lpg boiler replacement grant", targetPath: "/oil-boiler-grant" },
  { phrase: "new boiler stafford", targetPath: "/services/boiler-installation" },
  { phrase: "boiler installation stafford", targetPath: "/services/boiler-installation" },
  { phrase: "boiler replacement staffordshire", targetPath: "/services/boiler-installation" },
  { phrase: "air conditioning installation stafford", targetPath: "/services/air-conditioning" },
  { phrase: "air con installation staffordshire", targetPath: "/services/air-conditioning" },
  { phrase: "home air conditioning stafford", targetPath: "/services/air-conditioning" },
];

export const SEO_TASK_CATEGORIES = [
  { key: "weekly", label: "Weekly routine" },
  { key: "content", label: "Content engine" },
  { key: "backlinks", label: "Backlinks" },
  { key: "gbp", label: "Google Business Profile" },
  { key: "technical", label: "Technical & setup" },
] as const;
