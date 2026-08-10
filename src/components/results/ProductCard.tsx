"use client";

import { Star, Check, Shield, Award } from "lucide-react";
import type { QuoteResult } from "@/lib/types";

interface ProductCardProps {
  result: QuoteResult;
  recommended: boolean;
  onSelect: (result: QuoteResult) => void;
}

export default function ProductCard({ result, recommended, onSelect }: ProductCardProps) {
  const { product, totalPrice, monthlyPrice, breakdown } = result;

  return (
    <div
      className={`relative bg-white rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
        recommended
          ? "border-[#144E82] shadow-md"
          : product.popular
          ? "border-green-300"
          : "border-gray-200"
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#144E82] text-white text-xs font-bold px-4 py-1 rounded-full">
            RECOMMENDED FOR YOU
          </span>
        </div>
      )}
      {!recommended && product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#4e7522] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" /> POPULAR
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Product image placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">{product.brand}</p>
            <p className="text-gray-600 font-bold text-lg mt-1">{product.name}</p>
          </div>
        </div>

        {/* Brand & Name */}
        <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>

        {/* Specs */}
        <div className="flex items-center gap-3 mb-3">
          {product.efficiency && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
              {product.efficiency}
            </span>
          )}
          {product.kw && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
              {product.kw}kW
            </span>
          )}
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" /> {product.warranty}yr
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>

        {/* Features */}
        <div className="space-y-1.5 mb-5">
          {product.features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm text-gray-500">Total price</span>
            <span className="text-2xl font-bold text-gray-900">
              &pound;{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm text-gray-500">
              or from
            </span>
            <span className="text-base font-semibold text-[#144E82]">
              &pound;{monthlyPrice.toFixed(2)}/mo
            </span>
          </div>

          {/* Price breakdown */}
          <details className="mb-4">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              View price breakdown
            </summary>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Product</span>
                <span>&pound;{breakdown.productPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Installation</span>
                <span>&pound;{breakdown.baseInstall.toLocaleString()}</span>
              </div>
              {breakdown.relocationFee > 0 && (
                <div className="flex justify-between">
                  <span>Relocation</span>
                  <span>&pound;{breakdown.relocationFee.toLocaleString()}</span>
                </div>
              )}
              {breakdown.complexityAdjustment !== 0 && (
                <div className="flex justify-between">
                  <span>Adjustments</span>
                  <span>{breakdown.complexityAdjustment > 0 ? "+" : ""}&pound;{breakdown.complexityAdjustment.toLocaleString()}</span>
                </div>
              )}
            </div>
          </details>

          <button
            onClick={() => onSelect(result)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              recommended
                ? "bg-[#144E82] hover:bg-[#0e3a63] text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            Choose this boiler
          </button>
        </div>
      </div>

      {/* Warranty badge */}
      {product.warranty >= 10 && (
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
      )}
    </div>
  );
}
