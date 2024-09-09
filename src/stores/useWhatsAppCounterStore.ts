import { create } from 'zustand';

interface ResultType {
  name: string;
  count: number;
}

interface CounterState {
  file: File | null;
  results: {
    account1: ResultType | null;
    account2: ResultType | null;
  };
  setFile: (file: File | null) => void;
  setResults: (results: {
    account1: ResultType | null;
    account2: ResultType | null;
  }) => void;
}

export const useWhatsAppCounterStore = create<CounterState>((set) => ({
  file: null,
  results: { account1: null, account2: null },
  setFile: (file) => set({ file }),
  setResults: (results) => set({ results }),
}));
