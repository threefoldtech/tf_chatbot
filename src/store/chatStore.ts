import { writable } from "svelte/store";
import type { Questions } from "../types/questions";

interface ChatStore {
  open: boolean;
  initQuestions: Questions[];
  questions: Questions[];
  logs: Log[];
  socket: WebSocket;
  connected: boolean;
  currentAnswer: {};
}

interface Log {
  id: number;
  data: string;
}

function createChatStore() {
  let socket = new WebSocket("ws://localhost:8081");

  const store = writable<ChatStore>({
    open: false,
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
        type: 'question_choice',
        question: '### *Which Services are you looking for?*',
        id: 0,
        descr: '### *Which Services are you looking for?*',
        choices: [
          ['task', 'Do Something!'],
        ],
        multi: false,
        sorted: false,
        sign: false,
  
        answer: '',
      },
    ],
    logs: [],
    currentAnswer: {},
  });

  function __updateConnected(connected: boolean) {
    return () => {
      store.update((store) => {
        store.connected = connected;
        return store;
      });
    };
  }

  function __onCloseSocket() {
    __updateConnected(false)();

    socket = new WebSocket("ws://localhost:8081");
    socket.onopen = __updateConnected(true);
    socket.onclose = __onCloseSocket;

    store.update((store) => {
      store.socket = socket;
      return store;
    });
  }

  socket.onopen = __updateConnected(true);
  socket.onclose = __onCloseSocket;
  
  socket.onmessage = (res) => {
    // this.answerQuestion(question, answer);
    // this.pushLogs(question.id, logs);
    // this.addQuestion(services);

    // console.log(res)
    const data = JSON.parse(res.data)
    console.log(data)

    store.update((store)=>{
      store.questions.push(data.question)
      return store
    })

    
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
