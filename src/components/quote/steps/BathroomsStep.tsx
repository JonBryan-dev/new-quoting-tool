"use client";

import { useQuoteStore } from "@/lib/store";

export default function BathroomsStep() {
  const { answers, setAnswer, nextStep } = useQuoteStore();

  const handleSelect = (bathrooms: number) => {
    setAnswer("bathrooms", bathrooms);
    setTimeout(nextStep, 300);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        How many bathrooms do you have (or plan to have)?
      </h2>
      <p className="text-gray-500 mb-8">
        Include any en-suites or bathrooms you plan to add in the future.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={`py-6 px-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
              answers.bathrooms === num
                ? "border-[#1a56db] bg-blue-50 text-[#1a56db] shadow-md"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="text-3xl font-bold">{num}</span>
            <p className="text-sm mt-1 text-gray-500">{num === 4 ? "4+" : ""}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
