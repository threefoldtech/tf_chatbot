import { writable } from "svelte/store";
import type { Questions } from "../types/questions";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  open: boolean;
  initQuestions: Questions[];
  questions: Questions[];
  logs: Log[];
  socket: Socket;
  connected: boolean;
  currentAnswer: {};
}

interface Log {
  id: number;
  data: string;
}

function createChatStore() {
  const socket = io("ws://localhost:8081");

  const store = writable<ChatStore>({
    open: true,
    socket,
    connected: false,
    initQuestions: [
      {
        id: 0,
        type: "message",
        message: "Welcome in threefold chatbot",
      },
    ],
    questions: [
      {
        id: 0,
        type: "message",
        message: "Welcome in threefold chatbot",
      },
    ],
    logs: [],
    currentAnswer: {},
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
    update,
    addQuestion(question: Questions) {
      return update((store) => {
        store.questions.push(question);
        return store;
      });
    },
    cleanStore() {
      return update((store) => {
        store.questions = store.initQuestions;
        store.logs = [];
        return store;
      });
    },
    deleteQuestion(questionId) {
      return update((store) => {
        store.questions = store.questions.filter(
          (question) => question.id !== questionId
        );

        return store;
      });
    },
    deleteLog(deletedLog) {
      return update((store) => {
        store.logs = store.logs.filter((log) => log.id !== deletedLog.id);
        return store;
      });
    },
    answerQuestion(question: Questions, answer: any) {
      return update((store) => {
        store.questions = store.questions.map((q) => {
          if (q !== question) return q;
          // keep all the questions unanswered to enable edit/delete
          // q.answer = answer;
          // store.currentAnswer = answer;
          return q;
        });
        return store;
      });
    },
    pushLogs(id: number, data: any) {
      return update((store) => {
        store.logs.push({ id, data: JSON.stringify(data) });
        return store;
      });
    },
  };
}

/* inject on window for testing */
const store = createChatStore();
(window as any).chat = { store };
export default store;
