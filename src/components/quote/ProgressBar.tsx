"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-[#144E82] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators - hidden on mobile */}
      <div className="hidden sm:flex justify-between">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index < currentStep
                  ? "bg-[#144E82] text-white"
                  : index === currentStep
                  ? "bg-[#144E82] text-white ring-4 ring-blue-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span
              className={`text-xs mt-1 ${
                index <= currentStep ? "text-[#144E82] font-medium" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile step count */}
      <div className="sm:hidden text-center text-sm text-gray-500">
        Step {currentStep + 1} of {totalSteps}:{" "}
        <span className="font-medium text-gray-900">{stepLabels[currentStep]}</span>
      </div>
    </div>
  );
}
