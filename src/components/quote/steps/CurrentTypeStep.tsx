"use client";

import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function CurrentTypeStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const options = [
    {
      value: "combi",
      label: "Combi Boiler",
      description: "Heats water on demand, no separate tank or cylinder",
    },
    {
      value: "system",
      label: "System Boiler",
      description: "Has a hot water cylinder but no cold water tank",
    },
    {
      value: "regular",
      label: "Regular / Conventional",
      description: "Has both a hot water cylinder and a cold water tank",
    },
    {
      value: "unsure",
      label: "I'm not sure",
      description: "Don't worry, we can help you figure this out",
    },
  ];

  const handleSelect = (value: string) => {
    setAnswer("currentType", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        What type of boiler do you currently have?
      </h2>
      <p className="text-gray-500 mb-8">
        Select the option that best describes your existing setup.
      </p>
      <div className="space-y-3 max-w-xl">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={answers.currentType === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
