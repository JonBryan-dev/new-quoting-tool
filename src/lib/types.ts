export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  description: string;
  imageUrl: string | null;
  basePrice: number;
  efficiency: string | null;
  warranty: number;
  kw: number | null;
  features: string[];
  popular: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  startingFrom: number;
}

export interface QuoteAnswers {
  category: string;
  fuelType: string;
  currentType: string;
  isWorking: boolean | null;
  relocate: boolean | null;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  postcode: string;
  email: string;
  phone: string;
  name: string;
}

export interface PriceBreakdown {
  productPrice: number;
  baseInstall: number;
  relocationFee: number;
  complexityAdjustment: number;
  total: number;
}

export interface QuoteResult {
  product: Product;
  installPrice: number;
  totalPrice: number;
  monthlyPrice: number;
  breakdown: PriceBreakdown;
}

export interface HeatPumpQuote {
  product: Product;
  totalPrice: number;
  grantAmount: number;
  afterGrant: number;
  monthlyPrice: number;
  savings: string;
}
