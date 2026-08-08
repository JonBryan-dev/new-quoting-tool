// Real installation case studies with measured performance data.
//
// IMPORTANT: only add real installs with real numbers — published performance
// data is this company's SEO and sales moat precisely because it's genuine.
// Add one object per install; the /case-studies pages render automatically.

export interface CaseStudy {
  slug: string;
  title: string;              // e.g. "1930s semi in Stone: oil boiler → 9kW Vitocal"
  town: string;
  propertyType: string;       // e.g. "3-bed 1930s semi-detached"
  installedAt: string;        // ISO month, e.g. "2026-09"
  system: string;             // e.g. "Viessmann Vitocal 150-A 9kW + 210L cylinder"
  designFlowTemp: number;     // °C, e.g. 40
  heatLossKw: number;         // surveyed heat loss
  scop?: number;              // measured SCOP once available, e.g. 4.1
  previousFuel: string;       // "mains gas" | "oil" | "LPG" | "electric"
  annualCostBefore?: number;  // £ from customer's bills
  annualCostAfter?: number;   // £ measured
  radiatorsChanged: number;
  summary: string;            // 2-3 sentence story
  customerQuote?: string;
}

export const caseStudies: CaseStudy[] = [
  // First real installs being written up — add them here.
];
