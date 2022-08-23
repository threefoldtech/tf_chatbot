import { get, writable } from "svelte/store";
import type { Questions } from "../types/questions";
import type { GridClient } from "grid3_client";
import { getGrid } from "../utils/getGrid";

interface ChatStore {
  open: boolean;
  grid: GridClient;
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

  let gridClient;
  getGrid(
    "dev",
    "mom picnic deliver again rug night rabbit music motion hole lion where",
    "secret"
  ).then((grid) => (gridClient = grid));

  const store = writable<ChatStore>({
    open: false,
    grid: gridClient,
    socket,
    connected: false,
    initQuestions: [
      {
        id: 0,
        q_type: "message",
        message: "Welcome in threefold chatbot",
      },
    ],
    questions: [
      {
        q_type: "choices",
        question: "### *Which Services are you looking for?*",
        id: 0,
        descr: "### *Which Services are you looking for?*",
        choices: [["deploy_vm_form", "Deploy VM!"]],
        multi: false,
        sorted: false,
        sign: false,
        symbol: "init",

        answer: "",
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

  async function __handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.event == "invoke") {
      const req = JSON.parse(data.data);
      const result = await gridClient.invoke(
        req.function,
        JSON.parse(req.args)
      );
      console.log(result);
      socket.send(
        JSON.stringify({
          id: data.id,
          event: "invoke_result",
          data: JSON.stringify(result),
        })
      );
      console.log("result sent: ", result);
    } else {
      fullStore.addQuestion(data.question);
    }
  }

  socket.onopen = __updateConnected(true);
  socket.onclose = __onCloseSocket;
  socket.onmessage = __handleMessage;

  const { subscribe, set, update } = store;

  const fullStore = {
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

  return fullStore;
}

/* inject on window for testing */
const store = createChatStore();
(window as any).chat = { store };
export default store;
