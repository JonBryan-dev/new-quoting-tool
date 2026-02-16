"use client";

import { CheckCircle, XCircle } from "lucide-react";
import OptionCard from "../OptionCard";
import { useQuoteStore } from "@/lib/store";

export default function WorkingStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const handleSelect = (value: boolean) => {
    setAnswer("isWorking", value);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Is your current boiler working?
      </h2>
      <p className="text-gray-500 mb-8">
        This helps us understand urgency and any additional work needed.
      </p>
      <div className="space-y-3 max-w-xl">
        <OptionCard
          label="Yes, it's working"
          description="My boiler is working but I want to upgrade"
          icon={<CheckCircle className="w-6 h-6" />}
          selected={answers.isWorking === true}
          onClick={() => handleSelect(true)}
        />
        <OptionCard
          label="No, it's broken"
          description="My boiler has stopped working or has issues"
          icon={<XCircle className="w-6 h-6" />}
          selected={answers.isWorking === false}
          onClick={() => handleSelect(false)}
        />
      </div>
    </div>
  );
}
