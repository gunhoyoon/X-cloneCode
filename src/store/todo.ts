import { create } from "zustand";

interface TodoState {
  text: string;
  done: boolean;
  setText: (text: string) => void;
  setDone: (done: boolean) => void;
  reset: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  text: "",
  done: false,
  setText(text) {
    set({ text });
  },

  setDone(done) {
    set({ done });
  },

  reset() {
    set({
      text: "",
      done: false,
    });
  },
}));

// 조각조각 스토어의 개념이 있지만, 각각 스토어 생성이 가능
