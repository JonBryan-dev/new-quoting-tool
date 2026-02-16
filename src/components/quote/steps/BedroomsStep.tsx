"use client";

import { useQuoteStore } from "@/lib/store";

export default function BedroomsStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const handleSelect = (bedrooms: number) => {
    setAnswer("bedrooms", bedrooms);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        How many bedrooms does your home have?
      </h2>
      <p className="text-gray-500 mb-8">
        This helps us recommend the right size system for your home.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-xl">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={`py-6 px-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
              answers.bedrooms === num
                ? "border-[#1a56db] bg-blue-50 text-[#1a56db] shadow-md"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="text-3xl font-bold">{num}</span>
            <p className="text-sm mt-1 text-gray-500">{num === 5 ? "5+" : ""}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
