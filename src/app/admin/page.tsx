"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Package,
  DollarSign,
  ClipboardList,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Edit3,
  X,
  Check,
  LogOut,
  User,
} from "lucide-react";
import type { Product } from "@/lib/types";

// ── TYPES ──────────────────────────────────────────────────

interface PricingConfig {
  baseInstallCost: number;
  relocationFee: number;
  brokenBoilerSurcharge: number;
  standardFlueSurcharge: number;
  propertyMultipliers: Record<string, number>;
  bedroomAdjustments: Record<string, number>;
  boilerAgeAdjustments: Record<string, number>;
  monthlyFinanceMonths: number;
}

interface QuizOption {
  value: string;
  label: string;
  description: string;
}

interface QuizStepConfig {
  id: string;
  title: string;
  subtitle: string;
  answerKey: string;
  options: QuizOption[];
}

interface AdminConfig {
  products: Product[];
  pricing: PricingConfig;
  quizSteps: QuizStepConfig[];
}

// ── MAIN COMPONENT ─────────────────────────────────────────

export default function AdminPage() {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"leads" | "products" | "pricing" | "quiz">("leads");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [adminUser, setAdminUser] = useState<string>("");

  useEffect(() => {
    fetchConfig();
    // Fetch current admin user info
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAdminUser(d.username || ""))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function fetchConfig() {
    try {
      const res = await fetch("/api/admin/config");
      const data = await res.json();
      setConfig(data);
    } catch {
      setMessage({ type: "error", text: "Failed to load config" });
    } finally {
      setLoading(false);
    }
  }

  async function saveSection(section: string, data: unknown) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      const result = await res.json();
      if (result.success) {
        setConfig(result.config);
        setMessage({ type: "success", text: "Changes saved!" });
      } else {
        setMessage({ type: "error", text: "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  async function handleReset() {
    if (!confirm("Reset everything to defaults? This will undo all your changes.")) return;
    await saveSection("reset", null);
  }

  if (loading || !config) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#144E82] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#144E82] rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage products, pricing & quiz options</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {adminUser && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mr-1">
                  <User className="w-4 h-4" />
                  <span>{adminUser}</span>
                </div>
              )}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Defaults
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#144E82] text-white rounded-lg hover:bg-[#0e3a63]"
              >
                View Live Site
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Toast message */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
          message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit">
          {[
            { key: "leads" as const, label: "Leads", icon: User },
            { key: "products" as const, label: "Products", icon: Package },
            { key: "pricing" as const, label: "Pricing", icon: DollarSign },
            { key: "quiz" as const, label: "Quiz Options", icon: ClipboardList },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-[#144E82] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tab === "leads" && <LeadsTab />}
        {tab === "products" && (
          <ProductsTab
            products={config.products}
            onSave={(products) => saveSection("products", products)}
            saving={saving}
          />
        )}
        {tab === "pricing" && (
          <PricingTab
            pricing={config.pricing}
            onSave={(pricing) => saveSection("pricing", pricing)}
            saving={saving}
          />
        )}
        {tab === "quiz" && (
          <QuizTab
            steps={config.quizSteps}
            onSave={(steps) => saveSection("quizSteps", steps)}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}

// ── LEADS TAB ──────────────────────────────────────────────

interface LeadBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  addressLine: string | null;
  postcode: string;
  preferredDate: string | null;
  timeSlot: string | null;
  notes: string | null;
  source: string | null;
  productName: string | null;
  quotedPrice: number | null;
  propertyType: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
  createdAt: string;
}

interface LeadQuote {
  id: string;
  category: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  postcode: string | null;
  totalPrice: number | null;
  status: string;
  createdAt: string;
}

function LeadsTab() {
  const [loading, setLoading] = useState(true);
  const [dbAvailable, setDbAvailable] = useState(true);
  const [bookings, setBookings] = useState<LeadBooking[]>([]);
  const [quotes, setQuotes] = useState<LeadQuote[]>([]);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((d) => {
        setDbAvailable(d.dbAvailable !== false);
        setBookings(d.bookings || []);
        setQuotes(d.quotes || []);
      })
      .catch(() => setDbAvailable(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#144E82] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!dbAvailable) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-sm text-yellow-800">
        The database isn&apos;t connected in this environment, so leads can&apos;t be listed here.
        Check the PRISMA_DATABASE_URL environment variable in Vercel.
      </div>
    );
  }

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Survey bookings</h2>
        <p className="text-sm text-gray-500 mb-4">
          Free heat loss survey requests from the website. Call each lead back within 1 working day.
        </p>
        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-500">
            No survey bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Preferred</th>
                  <th className="px-4 py-3">Interested in</th>
                  <th className="px-4 py-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{fmtDate(b.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{b.name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${b.phone}`} className="text-[#144E82] font-medium block">{b.phone}</a>
                      {b.email && <a href={`mailto:${b.email}`} className="text-gray-500 block">{b.email}</a>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.addressLine && <span className="block">{b.addressLine}</span>}
                      <span className="font-medium">{b.postcode}</span>
                      {b.propertyType && (
                        <span className="block text-xs text-gray-400 capitalize">
                          {b.propertyType}, {b.bedrooms ?? "?"} bed / {b.bathrooms ?? "?"} bath
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {b.preferredDate || "Any date"}
                      {b.timeSlot && b.timeSlot !== "either" && (
                        <span className="block text-xs text-gray-400 uppercase">{b.timeSlot}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.productName || "—"}
                      {b.quotedPrice != null && (
                        <span className="block text-xs text-gray-400">est. £{b.quotedPrice.toLocaleString()}</span>
                      )}
                      {b.notes && <span className="block text-xs text-gray-400 mt-1">&ldquo;{b.notes}&rdquo;</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">
                        {b.source || "direct"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Quote requests</h2>
        <p className="text-sm text-gray-500 mb-4">
          Boiler/heat pump quote submissions saved to the quotes table.
        </p>
        {quotes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-500">
            No quote requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Postcode</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{fmtDate(q.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{q.name || "—"}</td>
                    <td className="px-4 py-3">
                      {q.phone && <a href={`tel:${q.phone}`} className="text-[#144E82] font-medium block">{q.phone}</a>}
                      {q.email && <a href={`mailto:${q.email}`} className="text-gray-500 block">{q.email}</a>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{q.postcode || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{q.category}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {q.totalPrice != null ? `£${q.totalPrice.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{q.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PRODUCTS TAB ───────────────────────────────────────────

function ProductsTab({
  products: initialProducts,
  onSave,
  saving,
}: {
  products: Product[];
  onSave: (products: Product[]) => void;
  saving: boolean;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => setProducts(initialProducts), [initialProducts]);

  const handleFieldChange = (id: string, field: string, value: unknown) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: `boiler-${Date.now()}`,
      name: "New Boiler",
      brand: "Brand",
      category: "boiler",
      type: "combi",
      description: "Enter a description for this boiler",
      imageUrl: null,
      basePrice: 1500,
      efficiency: "92%",
      warranty: 5,
      kw: 28,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      popular: false,
    };
    setProducts((prev) => [...prev, newProduct]);
    setEditingId(newProduct.id);
    setExpandedId(newProduct.id);
  };

  const removeProduct = (id: string) => {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Boiler Products</h2>
          <p className="text-sm text-gray-500">{products.filter((p) => p.category === "boiler").length} boilers, {products.filter((p) => p.category === "heatpump").length} heat pumps</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewProduct}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Boiler
          </button>
          <button
            onClick={() => onSave(products)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#144E82] text-white text-sm rounded-lg hover:bg-[#0e3a63] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Summary row */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${product.category === "heatpump" ? "bg-purple-500" : "bg-blue-500"}`} />
                <div>
                  <p className="font-semibold text-gray-900">{product.brand} {product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.type} &middot; {product.kw}kW &middot; {product.warranty}yr warranty &middot; &pound;{product.basePrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {product.popular && (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Popular</span>
                )}
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">{product.category}</span>
                {expandedId === product.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded editor */}
            {expandedId === product.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FieldInput label="Brand" value={product.brand} onChange={(v) => handleFieldChange(product.id, "brand", v)} />
                  <FieldInput label="Name" value={product.name} onChange={(v) => handleFieldChange(product.id, "name", v)} />
                  <FieldSelect
                    label="Type"
                    value={product.type}
                    options={[
                      { value: "combi", label: "Combi" },
                      { value: "system", label: "System" },
                      { value: "air-source", label: "Air Source Heat Pump" },
                    ]}
                    onChange={(v) => handleFieldChange(product.id, "type", v)}
                  />
                  <FieldSelect
                    label="Category"
                    value={product.category}
                    options={[
                      { value: "boiler", label: "Boiler" },
                      { value: "heatpump", label: "Heat Pump" },
                    ]}
                    onChange={(v) => handleFieldChange(product.id, "category", v)}
                  />
                  <FieldNumber label="Base Price (£)" value={product.basePrice} onChange={(v) => handleFieldChange(product.id, "basePrice", v)} />
                  <FieldNumber label="kW Output" value={product.kw || 0} onChange={(v) => handleFieldChange(product.id, "kw", v)} />
                  <FieldInput label="Efficiency" value={product.efficiency || ""} onChange={(v) => handleFieldChange(product.id, "efficiency", v)} />
                  <FieldNumber label="Warranty (years)" value={product.warranty} onChange={(v) => handleFieldChange(product.id, "warranty", v)} />
                  <FieldToggle label="Popular" value={product.popular} onChange={(v) => handleFieldChange(product.id, "popular", v)} />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={product.description}
                    onChange={(e) => handleFieldChange(product.id, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] focus:ring-2 focus:ring-blue-100 outline-none"
                    rows={2}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={product.features.join(", ")}
                    onChange={(e) =>
                      handleFieldChange(
                        product.id,
                        "features",
                        e.target.value.split(",").map((f) => f.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRICING TAB ────────────────────────────────────────────

function PricingTab({
  pricing: initialPricing,
  onSave,
  saving,
}: {
  pricing: PricingConfig;
  onSave: (pricing: PricingConfig) => void;
  saving: boolean;
}) {
  const [pricing, setPricing] = useState<PricingConfig>(initialPricing);

  useEffect(() => setPricing(initialPricing), [initialPricing]);

  const handleChange = (field: keyof PricingConfig, value: number) => {
    setPricing((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapChange = (
    field: "propertyMultipliers" | "bedroomAdjustments" | "boilerAgeAdjustments",
    key: string,
    value: number
  ) => {
    setPricing((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Pricing Configuration</h2>
          <p className="text-sm text-gray-500">Adjust installation costs, fees, and multipliers</p>
        </div>
        <button
          onClick={() => onSave(pricing)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#144E82] text-white text-sm rounded-lg hover:bg-[#0e3a63] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Base costs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Base Costs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldNumber
              label="Base Install Cost (£)"
              value={pricing.baseInstallCost}
              onChange={(v) => handleChange("baseInstallCost", v)}
            />
            <FieldNumber
              label="Relocation Fee (£)"
              value={pricing.relocationFee}
              onChange={(v) => handleChange("relocationFee", v)}
            />
            <FieldNumber
              label="Broken Boiler Surcharge (£)"
              value={pricing.brokenBoilerSurcharge}
              onChange={(v) => handleChange("brokenBoilerSurcharge", v)}
            />
            <FieldNumber
              label="Standard Flue Surcharge (£)"
              value={pricing.standardFlueSurcharge}
              onChange={(v) => handleChange("standardFlueSurcharge", v)}
            />
          </div>
        </div>

        {/* Property multipliers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Property Type Multipliers</h3>
          <p className="text-sm text-gray-500 mb-4">Multiplied against the base install cost. 1.0 = no change, 1.15 = 15% more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(pricing.propertyMultipliers).map(([key, value]) => (
              <FieldNumber
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                step={0.05}
                onChange={(v) => handleMapChange("propertyMultipliers", key, v)}
              />
            ))}
          </div>
        </div>

        {/* Bedroom adjustments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Bedroom Adjustments (£)</h3>
          <p className="text-sm text-gray-500 mb-4">Added/subtracted from the total price based on number of bedrooms.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Object.entries(pricing.bedroomAdjustments).map(([key, value]) => (
              <FieldNumber
                key={key}
                label={`${key} bed${key === "5" ? "+" : ""}`}
                value={value}
                onChange={(v) => handleMapChange("bedroomAdjustments", key, v)}
              />
            ))}
          </div>
        </div>

        {/* Boiler age adjustments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Boiler Age Adjustments (£)</h3>
          <p className="text-sm text-gray-500 mb-4">Extra cost based on how old the existing boiler is (older = harder removal).</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Object.entries(pricing.boilerAgeAdjustments).map(([key, value]) => (
              <FieldNumber
                key={key}
                label={key === "unsure" ? "Unsure" : `${key} yrs`}
                value={value}
                onChange={(v) => handleMapChange("boilerAgeAdjustments", key, v)}
              />
            ))}
          </div>
        </div>

        {/* Finance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Finance Settings</h3>
          <div className="max-w-xs">
            <FieldNumber
              label="Monthly Payment Term (months)"
              value={pricing.monthlyFinanceMonths}
              onChange={(v) => handleChange("monthlyFinanceMonths", v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QUIZ TAB ───────────────────────────────────────────────

function QuizTab({
  steps: initialSteps,
  onSave,
  saving,
}: {
  steps: QuizStepConfig[];
  onSave: (steps: QuizStepConfig[]) => void;
  saving: boolean;
}) {
  const [steps, setSteps] = useState<QuizStepConfig[]>(initialSteps);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => setSteps(initialSteps), [initialSteps]);

  const handleStepChange = (id: string, field: string, value: unknown) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleOptionChange = (stepId: string, optionIndex: number, field: string, value: string) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id !== stepId) return s;
        const newOptions = [...s.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
        return { ...s, options: newOptions };
      })
    );
  };

  const addOption = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id !== stepId) return s;
        return {
          ...s,
          options: [...s.options, { value: `option-${Date.now()}`, label: "New Option", description: "Description" }],
        };
      })
    );
  };

  const removeOption = (stepId: string, optionIndex: number) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id !== stepId) return s;
        return { ...s, options: s.options.filter((_, i) => i !== optionIndex) };
      })
    );
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    setSteps(newSteps);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Quiz Steps</h2>
          <p className="text-sm text-gray-500">{steps.length} steps in the quiz. Drag to reorder, click to edit options.</p>
        </div>
        <button
          onClick={() => onSave(steps)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#144E82] text-white text-sm rounded-lg hover:bg-[#0e3a63] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Step header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(expandedId === step.id ? null : step.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#144E82] text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{step.title}</p>
                  <p className="text-sm text-gray-500">
                    {step.options.length} options &middot; saves to &ldquo;{step.answerKey}&rdquo;
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); moveStep(index, "up"); }}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveStep(index, "down"); }}
                  disabled={index === steps.length - 1}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                {expandedId === step.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded editor */}
            {expandedId === step.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FieldInput
                    label="Question Title"
                    value={step.title}
                    onChange={(v) => handleStepChange(step.id, "title", v)}
                  />
                  <FieldInput
                    label="Subtitle / Help Text"
                    value={step.subtitle}
                    onChange={(v) => handleStepChange(step.id, "subtitle", v)}
                  />
                </div>

                <h4 className="font-medium text-gray-800 mb-3">Options</h4>
                <div className="space-y-2">
                  {step.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) => handleOptionChange(step.id, optIndex, "value", e.target.value)}
                          placeholder="Value"
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-[#144E82] outline-none"
                        />
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => handleOptionChange(step.id, optIndex, "label", e.target.value)}
                          placeholder="Label"
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-[#144E82] outline-none"
                        />
                        <input
                          type="text"
                          value={option.description}
                          onChange={(e) => handleOptionChange(step.id, optIndex, "description", e.target.value)}
                          placeholder="Description"
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-[#144E82] outline-none"
                        />
                      </div>
                      <button
                        onClick={() => removeOption(step.id, optIndex)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addOption(step.id)}
                  className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-[#144E82] border border-dashed border-[#144E82] rounded-lg hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── REUSABLE FORM FIELDS ───────────────────────────────────

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] focus:ring-2 focus:ring-blue-100 outline-none"
      />
    </div>
  );
}

function FieldNumber({
  label,
  value,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] focus:ring-2 focus:ring-blue-100 outline-none"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#144E82] focus:ring-2 focus:ring-blue-100 outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          value ? "bg-[#144E82]" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            value ? "left-6" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
