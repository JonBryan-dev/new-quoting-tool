"use client";

import { create } from "zustand";
import type { QuoteAnswers } from "./types";

interface QuoteState {
  currentStep: number;
  answers: QuoteAnswers;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setAnswer: <K extends keyof QuoteAnswers>(key: K, value: QuoteAnswers[K]) => void;
  reset: () => void;
}

const defaultAnswers: QuoteAnswers = {
  category: "",
  fuelType: "",
  currentType: "",
  isWorking: null,
  relocate: null,
  propertyType: "",
  bedrooms: 0,
  bathrooms: 0,
  postcode: "",
  email: "",
  phone: "",
  name: "",
};

export const useQuoteStore = create<QuoteState>((set) => ({
  currentStep: 0,
  answers: { ...defaultAnswers },
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),
  reset: () => set({ currentStep: 0, answers: { ...defaultAnswers } }),
}));
