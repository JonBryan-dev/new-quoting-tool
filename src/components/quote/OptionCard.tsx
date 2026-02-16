"use client";

import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ label, description, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        selected
          ? "border-[#144E82] bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
              selected ? "bg-[#144E82] text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-base ${selected ? "text-[#144E82]" : "text-gray-900"}`}>
            {label}
          </p>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            selected
              ? "border-[#144E82] bg-[#144E82]"
              : "border-gray-300"
          }`}
        >
          {selected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </button>
  );
}
