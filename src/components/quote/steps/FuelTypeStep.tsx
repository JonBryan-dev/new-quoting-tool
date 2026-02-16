"use client";

import { Flame, Droplets, Zap } from "lucide-react";
import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function FuelTypeStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const options = [
    { value: "gas", label: "Gas", description: "Natural gas from the mains", icon: <Flame className="w-6 h-6" /> },
    { value: "oil", label: "Oil", description: "Oil tank heating system", icon: <Droplets className="w-6 h-6" /> },
    { value: "electric", label: "Electric", description: "Electric heating system", icon: <Zap className="w-6 h-6" /> },
    { value: "lpg", label: "LPG", description: "Liquid petroleum gas", icon: <Flame className="w-6 h-6" /> },
    { value: "unsure", label: "I'm not sure", description: "We'll help you figure it out", icon: null },
  ];

  const handleSelect = (value: string) => {
    setAnswer("fuelType", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        What fuel does your current boiler use?
      </h2>
      <p className="text-gray-500 mb-8">
        This helps us recommend the right replacement for your home.
      </p>
      <div className="space-y-3 max-w-xl">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={answers.fuelType === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
