import { create } from "zustand";

type Message = {
    id: number;
    text: string;
    sender: "me" | "ai";
};

type ChatStore = {
    messages: Message[];
    addMessage: (msg: Message) => void;
    resetMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    resetMessages: () => set({ messages: [] }),
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));
