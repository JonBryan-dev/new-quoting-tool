"use client";

import { ArrowRightLeft, MapPin } from "lucide-react";
import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function RelocateStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const handleSelect = (value: boolean) => {
    setAnswer("relocate", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Do you want your new boiler in a different location?
      </h2>
      <p className="text-gray-500 mb-8">
        Moving your boiler to a new location will require additional pipework.
      </p>
      <div className="space-y-3 max-w-xl">
        <OptionCard
          label="Same location"
          description="Install the new boiler where the old one is"
          icon={<MapPin className="w-6 h-6" />}
          selected={answers.relocate === false}
          onClick={() => handleSelect(false)}
        />
        <OptionCard
          label="Different location"
          description="I want to move my boiler somewhere else"
          icon={<ArrowRightLeft className="w-6 h-6" />}
          selected={answers.relocate === true}
          onClick={() => handleSelect(true)}
        />
      </div>
    </div>
  );
}
