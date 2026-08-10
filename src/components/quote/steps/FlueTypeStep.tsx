"use client";

import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function FlueTypeStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const options = [
    {
      value: "standard",
      label: "Standard Flue",
      description: "Vertical flue going up through the roof (older style)",
    },
    {
      value: "balanced",
      label: "Balanced / Room-Sealed Flue",
      description: "Horizontal flue going through an outside wall (most common)",
    },
    {
      value: "vertical",
      label: "Vertical Balanced Flue",
      description: "Goes up through the roof but is sealed (modern installations)",
    },
    {
      value: "unsure",
      label: "I'm not sure",
      description: "No worries, our engineer will check on installation day",
    },
  ];

  const handleSelect = (value: string) => {
    setAnswer("flueType", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        What type of flue does your boiler have?
      </h2>
      <p className="text-gray-500 mb-8">
        The flue is the pipe that carries exhaust gases away from your boiler.
      </p>
      <div className="space-y-3 max-w-xl">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={answers.flueType === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
