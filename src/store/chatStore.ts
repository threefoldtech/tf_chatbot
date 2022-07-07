import { writable } from "svelte/store";
import type { Questions } from "../types/questions";

interface ChatStore {
  open: boolean;
  questions: Questions[];
  logs: string[];
}

function createChatStore() {
  const store = writable<ChatStore>({
    open: true,
    questions: [],
    logs: [],
  });

  const { subscribe, set, update } = store;

  return {
    subscribe,
    set,
    addQuestion(question: Questions) {
      return update((store) => {
        store.questions.push(question);
        return store;
      });
    },
    answerQuestion(question: Questions, answer: any) {
      return update((store) => {
        store.questions = store.questions.map((q) => {
          if (q !== question) return q;
          q.answer = answer;
          return q;
        });
        return store;
      });
    },
  };
}

/* inject on window for testing */
const store = createChatStore();
(window as any).chat = { store };
export default store;
