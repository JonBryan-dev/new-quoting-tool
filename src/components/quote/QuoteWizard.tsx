"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuoteStore } from "@/lib/store";
import ProgressBar from "./ProgressBar";
import FuelTypeStep from "./steps/FuelTypeStep";
import CurrentTypeStep from "./steps/CurrentTypeStep";
import FlueTypeStep from "./steps/FlueTypeStep";
import BoilerAgeStep from "./steps/BoilerAgeStep";
import WorkingStep from "./steps/WorkingStep";
import RelocateStep from "./steps/RelocateStep";
import PropertyTypeStep from "./steps/PropertyTypeStep";
import BedroomsStep from "./steps/BedroomsStep";
import BathroomsStep from "./steps/BathroomsStep";

interface QuoteWizardProps {
  category: string;
}

const BOILER_STEPS = [
  { label: "Fuel", component: FuelTypeStep },
  { label: "Type", component: CurrentTypeStep },
  { label: "Flue", component: FlueTypeStep },
  { label: "Age", component: BoilerAgeStep },
  { label: "Working", component: WorkingStep },
  { label: "Relocate", component: RelocateStep },
  { label: "Property", component: PropertyTypeStep },
  { label: "Bedrooms", component: BedroomsStep },
  { label: "Bathrooms", component: BathroomsStep },
];

const GENERIC_STEPS = [
  { label: "Property", component: PropertyTypeStep },
  { label: "Bedrooms", component: BedroomsStep },
  { label: "Bathrooms", component: BathroomsStep },
];

export default function QuoteWizard({ category }: QuoteWizardProps) {
  const { currentStep, setStep, setAnswer, prevStep, answers } = useQuoteStore();
  const router = useRouter();

  const steps = category === "boiler" ? BOILER_STEPS : GENERIC_STEPS;
  const totalSteps = steps.length;

  useEffect(() => {
    setAnswer("category", category);
    setStep(0);
  }, [category, setAnswer, setStep]);

  useEffect(() => {
    if (currentStep >= totalSteps) {
      const params = new URLSearchParams({
        category: answers.category,
        fuelType: answers.fuelType || "",
        currentType: answers.currentType || "",
        flueType: answers.flueType || "",
        boilerAge: answers.boilerAge || "",
        isWorking: answers.isWorking === null ? "" : String(answers.isWorking),
        relocate: answers.relocate === null ? "" : String(answers.relocate),
        propertyType: answers.propertyType || "",
        bedrooms: String(answers.bedrooms || 0),
        bathrooms: String(answers.bathrooms || 0),
      });
      router.push(`/results?${params.toString()}`);
    }
  }, [currentStep, totalSteps, answers, router]);

  if (currentStep >= totalSteps) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Calculating your personalised quote...</p>
        </div>
      </div>
    );
  }

  const StepComponent = steps[currentStep].component;

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={steps.map((s) => s.label)}
      />

      {currentStep > 0 && (
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      <div className="min-h-[400px]">
        <StepComponent />
      </div>
    </div>
  );
}
