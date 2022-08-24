import { load_profile_question } from "./../utils/questions";
import { get, writable } from "svelte/store";
import type { Questions } from "../types/questions";
import type { GridClient } from "grid3_client";
import { events } from "grid3_client";
import { escape_object } from "svelte/internal";

interface IProfileConfig {
  net: string;
  mne: string;
  sec: string;
}
interface ChatStore {
  open: boolean;
  grid: GridClient;
  profileConfig: IProfileConfig;
  initQuestions: Questions[];
  questions: Questions[];
  logs: any[];
  socket: WebSocket;
  connected: boolean;
  currentAnswer: {};
}

// interface Log {
//   id: number;
//   data: string;
// }

function createChatStore() {
  let socket = new WebSocket("ws://localhost:8081");

  const store = writable<ChatStore>({
    open: false,
    grid: undefined,
    profileConfig: undefined,
    socket,
    connected: false,
    initQuestions: [],
    questions: [],
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
    console.log({ comming_data: data });

    if (data.event == "invoke") {
      const req = JSON.parse(data.data);

      let gridClient = get(store).grid;
      const result = await gridClient
        .invoke(req.function, JSON.parse(req.args))
        .catch((err) => {
          fullStore.pushLogs(err);
        });
      // console.log(result);
      fullStore.pushLogs(result);
      socket.send(
        JSON.stringify({
          id: data.id,
          event: "invoke_result",
          data: JSON.stringify(result),
        })
      );
      // console.log("result sent: ", result);
    } else if (data.event == "echo") {
      fullStore.pushLogs(data.log);
    } else if (data.event == "question") {
      fullStore.addQuestion(data.question);
    } else {
      console.log(data);
    }
  }

  events.addListener("logs", (log) => {
    fullStore.pushLogs(log);
  });

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
        store.logs = store.logs.filter((log) => log !== deletedLog);
        return store;
      });
    },

    answerQuestion(question: Questions, answer: any) {
      return update((store) => {
        store.questions = store.questions.map((q) => {
          if (q !== question) return q;
          return q;
        });
        return store;
      });
    },

    pushLogs(data: any) {
      return update((store) => {
        store.logs.push(data);
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
