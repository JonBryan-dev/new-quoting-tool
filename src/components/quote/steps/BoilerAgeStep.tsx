"use client";

import { Clock } from "lucide-react";
import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function BoilerAgeStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const options = [
    {
      value: "0-5",
      label: "Less than 5 years",
      description: "Relatively new — installed after 2020",
    },
    {
      value: "5-10",
      label: "5 – 10 years",
      description: "Getting older but may still be efficient",
    },
    {
      value: "10-15",
      label: "10 – 15 years",
      description: "Likely losing efficiency — a good time to replace",
    },
    {
      value: "15+",
      label: "Over 15 years",
      description: "Past its expected lifespan — replacement recommended",
    },
    {
      value: "unsure",
      label: "I'm not sure",
      description: "Don't worry, we'll help you work it out",
    },
  ];

  const handleSelect = (value: string) => {
    setAnswer("boilerAge", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        How old is your current boiler?
      </h2>
      <p className="text-gray-500 mb-8">
        Older boilers are less efficient and more expensive to run. This helps us prioritise your quote.
      </p>
      <div className="space-y-3 max-w-xl">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={answers.boilerAge === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
