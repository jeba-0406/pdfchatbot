import { create } from "zustand";

type FileStore = {
  file: File | null;
  lastProcessedFile: File | null;
  processed: boolean;
  setFile: (file: File) => void;
  setProcessed: (value: boolean) => void;
  setLastProcessedFile: (file: File | null) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  lastProcessedFile: null,
  processed: false,
  setFile: (file) => set({ file, processed: false }), // reset processed when selecting a new file
  setProcessed: (value) => set({ processed: value }),
  setLastProcessedFile: (file) => set({ lastProcessedFile: file }),
}));
