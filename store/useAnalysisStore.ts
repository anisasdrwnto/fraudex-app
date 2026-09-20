import { create } from 'zustand';

interface AnalysisResult {
  riskLevel: string;
  message: string;
  analyzedText: string;
}

interface AnalysisStore {
  result: AnalysisResult | null;
  setResult: (data: AnalysisResult | null) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
}));