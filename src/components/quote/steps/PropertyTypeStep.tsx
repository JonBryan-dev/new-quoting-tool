"use client";

import { Home, Building, Building2 } from "lucide-react";
import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function PropertyTypeStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const options = [
    { value: "detached", label: "Detached House", description: "A standalone property not joined to others", icon: <Home className="w-6 h-6" /> },
    { value: "semi-detached", label: "Semi-Detached", description: "Joined to one other property on one side", icon: <Home className="w-6 h-6" /> },
    { value: "terraced", label: "Terraced House", description: "Joined to properties on both sides", icon: <Building2 className="w-6 h-6" /> },
    { value: "flat", label: "Flat / Apartment", description: "A property within a larger building", icon: <Building className="w-6 h-6" /> },
    { value: "bungalow", label: "Bungalow", description: "A single-storey property", icon: <Home className="w-6 h-6" /> },
  ];

  const handleSelect = (value: string) => {
    setAnswer("propertyType", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Which best describes your home?
      </h2>
      <p className="text-gray-500 mb-8">
        Your property type helps us calculate installation requirements.
      </p>
      <div className="space-y-3 max-w-xl">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={answers.propertyType === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
