import { get, writable } from "svelte/store";
import type { Questions } from "../types/questions";

import {
  GridClient,
  NetworkEnv,
  BackendStorageType,
  KeypairType,
} from "grid3_client";
import { HTTPMessageBusClient } from "ts-rmb-http-client";

const RMB = new HTTPMessageBusClient(0, "", "", "");

function getGrid(mnemonic: string, secret: string) {
  const grid = new GridClient(
    NetworkEnv.dev,
    mnemonic,
    secret,
    RMB,
    undefined,
    BackendStorageType.auto,
    KeypairType.sr25519
  );

  return grid.connect().then(() => grid);
}

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
        choices: [["task", "Do Something!"]],
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

  socket.onopen = __updateConnected(true);
  socket.onclose = __onCloseSocket;

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

  console.log(get(store));

  socket.onmessage = async (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.event == "invoke") {
      const req = JSON.parse(data.data);
      const grid = await getGrid("mom picnic deliver again rug night rabbit music motion hole lion where", "secret")
      const result = await grid.invoke(req.function, JSON.parse(req.args));
      console.log(result)
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

      console.log(get(fullStore));
    }
  };

  return fullStore;
}

/* inject on window for testing */
const store = createChatStore();
(window as any).chat = { store };
export default store;
