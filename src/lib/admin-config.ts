/**
 * Admin configuration store
 *
 * This module manages the admin-editable configuration for products, pricing,
 * and quiz options. On Vercel, we use the KV-style approach with environment
 * variables as the source of truth, but for simplicity we store everything
 * in-memory with API endpoints to read/write.
 *
 * In production, you'd want to back this with your Prisma database.
 * For now, the admin panel reads/writes to this in-memory store,
 * and the quoting engine reads from it at runtime.
 */

import type { Product } from "./types";
import { sampleProducts as defaultProducts } from "./products";

// ── TYPES ──────────────────────────────────────────────────

export interface PricingConfig {
  baseInstallCost: number;
  relocationFee: number;
  brokenBoilerSurcharge: number;
  standardFlueSurcharge: number;
  propertyMultipliers: Record<string, number>;
  bedroomAdjustments: Record<string, number>;
  boilerAgeAdjustments: Record<string, number>;
  monthlyFinanceMonths: number;
}

export interface QuizOption {
  value: string;
  label: string;
  description: string;
}

export interface QuizStepConfig {
  id: string;
  title: string;
  subtitle: string;
  answerKey: string;
  options: QuizOption[];
}

export interface AdminConfig {
  products: Product[];
  pricing: PricingConfig;
  quizSteps: QuizStepConfig[];
}

// ── DEFAULT VALUES ─────────────────────────────────────────

const defaultPricing: PricingConfig = {
  baseInstallCost: 500,
  relocationFee: 350,
  brokenBoilerSurcharge: 150,
  standardFlueSurcharge: 250,
  propertyMultipliers: {
    "detached": 1.15,
    "semi-detached": 1.05,
    "terraced": 1.0,
    "flat": 0.95,
    "bungalow": 1.1,
  },
  bedroomAdjustments: {
    "1": -100,
    "2": 0,
    "3": 100,
    "4": 200,
    "5": 350,
  },
  boilerAgeAdjustments: {
    "0-5": 0,
    "5-10": 50,
    "10-15": 100,
    "15+": 200,
    "unsure": 0,
  },
  monthlyFinanceMonths: 60,
};

const defaultQuizSteps: QuizStepConfig[] = [
  {
    id: "fuelType",
    title: "What fuel does your current boiler use?",
    subtitle: "This helps us recommend the right replacement for your home.",
    answerKey: "fuelType",
    options: [
      { value: "gas", label: "Gas", description: "Natural gas from the mains" },
      { value: "oil", label: "Oil", description: "Oil tank heating system" },
      { value: "electric", label: "Electric", description: "Electric heating system" },
      { value: "lpg", label: "LPG", description: "Liquid petroleum gas" },
      { value: "unsure", label: "I'm not sure", description: "We'll help you figure it out" },
    ],
  },
  {
    id: "currentType",
    title: "What type of boiler do you currently have?",
    subtitle: "Select the option that best describes your existing setup.",
    answerKey: "currentType",
    options: [
      { value: "combi", label: "Combi Boiler", description: "Heats water on demand, no separate tank or cylinder" },
      { value: "system", label: "System Boiler", description: "Has a hot water cylinder but no cold water tank" },
      { value: "regular", label: "Regular / Conventional", description: "Has both a hot water cylinder and a cold water tank" },
      { value: "unsure", label: "I'm not sure", description: "Don't worry, we can help you figure this out" },
    ],
  },
  {
    id: "flueType",
    title: "What type of flue does your boiler have?",
    subtitle: "The flue is the pipe that carries exhaust gases away from your boiler.",
    answerKey: "flueType",
    options: [
      { value: "standard", label: "Standard Flue", description: "Vertical flue going up through the roof (older style)" },
      { value: "balanced", label: "Balanced / Room-Sealed Flue", description: "Horizontal flue going through an outside wall (most common)" },
      { value: "vertical", label: "Vertical Balanced Flue", description: "Goes up through the roof but is sealed (modern installations)" },
      { value: "unsure", label: "I'm not sure", description: "No worries — our engineer will check on installation day" },
    ],
  },
  {
    id: "boilerAge",
    title: "How old is your current boiler?",
    subtitle: "Older boilers are less efficient and more expensive to run.",
    answerKey: "boilerAge",
    options: [
      { value: "0-5", label: "Less than 5 years", description: "Relatively new — installed after 2020" },
      { value: "5-10", label: "5 – 10 years", description: "Getting older but may still be efficient" },
      { value: "10-15", label: "10 – 15 years", description: "Likely losing efficiency — a good time to replace" },
      { value: "15+", label: "Over 15 years", description: "Past its expected lifespan — replacement recommended" },
      { value: "unsure", label: "I'm not sure", description: "Don't worry, we'll help you work it out" },
    ],
  },
  {
    id: "isWorking",
    title: "Is your current boiler working?",
    subtitle: "If your boiler has broken down, we can prioritise your installation.",
    answerKey: "isWorking",
    options: [
      { value: "true", label: "Yes, it's working", description: "My boiler is currently operational" },
      { value: "false", label: "No, it's broken", description: "My boiler has stopped working or is faulty" },
    ],
  },
  {
    id: "relocate",
    title: "Do you want to move your boiler?",
    subtitle: "Moving your boiler to a different location costs extra but can improve your home layout.",
    answerKey: "relocate",
    options: [
      { value: "false", label: "Same location", description: "Keep the boiler where it is now" },
      { value: "true", label: "Different location", description: "I'd like to move it somewhere else" },
    ],
  },
  {
    id: "propertyType",
    title: "Which best describes your home?",
    subtitle: "Your property type helps us calculate installation requirements.",
    answerKey: "propertyType",
    options: [
      { value: "detached", label: "Detached House", description: "A standalone property not joined to others" },
      { value: "semi-detached", label: "Semi-Detached", description: "Joined to one other property on one side" },
      { value: "terraced", label: "Terraced House", description: "Joined to properties on both sides" },
      { value: "flat", label: "Flat / Apartment", description: "A property within a larger building" },
      { value: "bungalow", label: "Bungalow", description: "A single-storey property" },
    ],
  },
  {
    id: "bedrooms",
    title: "How many bedrooms does your home have?",
    subtitle: "This helps us recommend the right size system for your home.",
    answerKey: "bedrooms",
    options: [
      { value: "1", label: "1", description: "" },
      { value: "2", label: "2", description: "" },
      { value: "3", label: "3", description: "" },
      { value: "4", label: "4", description: "" },
      { value: "5", label: "5+", description: "" },
    ],
  },
  {
    id: "bathrooms",
    title: "How many bathrooms does your home have?",
    subtitle: "Include all bathrooms, shower rooms, and en-suites.",
    answerKey: "bathrooms",
    options: [
      { value: "1", label: "1", description: "" },
      { value: "2", label: "2", description: "" },
      { value: "3", label: "3", description: "" },
      { value: "4", label: "4+", description: "" },
    ],
  },
];

// ── IN-MEMORY STORE ────────────────────────────────────────
// This acts as the single source of truth at runtime.
// The admin API reads/writes to this object.

let currentConfig: AdminConfig = {
  products: [...defaultProducts],
  pricing: { ...defaultPricing },
  quizSteps: defaultQuizSteps.map((s) => ({ ...s, options: [...s.options] })),
};

// ── PUBLIC API ─────────────────────────────────────────────

export function getAdminConfig(): AdminConfig {
  return currentConfig;
}

export function updateProducts(products: Product[]): void {
  currentConfig.products = products;
}

export function updatePricing(pricing: PricingConfig): void {
  currentConfig.pricing = pricing;
}

export function updateQuizSteps(steps: QuizStepConfig[]): void {
  currentConfig.quizSteps = steps;
}

export function addProduct(product: Product): void {
  currentConfig.products.push(product);
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const index = currentConfig.products.findIndex((p) => p.id === id);
  if (index !== -1) {
    currentConfig.products[index] = { ...currentConfig.products[index], ...updates };
  }
}

export function deleteProduct(id: string): void {
  currentConfig.products = currentConfig.products.filter((p) => p.id !== id);
}

export function resetToDefaults(): void {
  currentConfig = {
    products: [...defaultProducts],
    pricing: { ...defaultPricing },
    quizSteps: defaultQuizSteps.map((s) => ({ ...s, options: [...s.options] })),
  };
}
