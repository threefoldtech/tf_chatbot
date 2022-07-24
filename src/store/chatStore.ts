import { writable } from "svelte/store";
import type { Questions } from "../types/questions";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  open: boolean;
  initQuestions: Questions[];
  questions: Questions[];
  logs: string[];
  socket: Socket;
  connected: boolean;
}

function createChatStore() {
  const socket = io("ws://localhost:8081");

  const store = writable<ChatStore>({
    open: true,
    socket,
    connected: false,
    initQuestions: [
      {
        id: -1,
        type: "question_choice",
        descr: "Welcome in threefold chatbot",
        choices: [[true, "Next!"]],
        multi: false,
        sorted: false,
        sign: false,
        answer: null,
      },
    ],
    questions: [
      {
        id: -1,
        type: "question_choice",
        descr: "Welcome in threefold chatbot",
        choices: [[true, "Next!"]],
        multi: false,
        sorted: false,
        sign: false,
        answer: null,
      },
    ],
    logs: [],
  });

  socket.on("connect", __updateConnected(true));
  socket.on("disconnect", __updateConnected(false));
  function __updateConnected(connected: boolean) {
    return () => {
      store.update((store) => {
        store.connected = connected;
        return store;
      });
    };
  }

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
    cleanStore() {
      return update((store) => {
        store.questions = store.initQuestions;
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
    pushLogs(data: any) {
      return update((store) => {
        store.logs.push(JSON.stringify(data));
        return store;
      });
    },
  };
}

/* inject on window for testing */
const store = createChatStore();
(window as any).chat = { store };
export default store;
