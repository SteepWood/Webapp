import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { QuoteFormData } from "@/lib/validations/quote";

const STORAGE_KEY = "steepwood-quote-form";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

type QuoteStep = 1 | 2 | 3;

type QuoteFormState = {
  step: QuoteStep;
  data: Partial<QuoteFormData>;
  draftId: string | null;
  savedAt: number;
  setStep: (step: QuoteStep) => void;
  updateData: (partial: Partial<QuoteFormData>) => void;
  ensureDraftId: () => string;
  resetForm: () => void;
};

const initialState = {
  step: 1 as QuoteStep,
  data: {} as Partial<QuoteFormData>,
  draftId: null as string | null,
  savedAt: Date.now(),
};

export const useQuoteFormStore = create<QuoteFormState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStep: (step) => set({ step, savedAt: Date.now() }),
      updateData: (partial) =>
        set((state) => ({
          data: { ...state.data, ...partial },
          savedAt: Date.now(),
        })),
      ensureDraftId: () => {
        const existing = get().draftId;

        if (existing) {
          return existing;
        }

        const draftId = crypto.randomUUID();
        set({ draftId, savedAt: Date.now() });
        return draftId;
      },
      resetForm: () => set({ ...initialState, savedAt: Date.now() }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        data: state.data,
        draftId: state.draftId,
        savedAt: state.savedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        if (Date.now() - state.savedAt > EXPIRY_MS) {
          state.resetForm();
        }
      },
    },
  ),
);
