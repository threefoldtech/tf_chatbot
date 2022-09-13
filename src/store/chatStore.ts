import { get, writable } from "svelte/store";
import type { IQuestions } from "../types/questions";
import type { GridClient } from "grid3_client";
import { events } from "grid3_client";

interface IProfileConfig {
  net: string;
  mne: string;
  sec: string;
}
interface ChatStore {
  open: boolean;
  grid: GridClient;
  profileConfig: IProfileConfig;
  initQuestions: IQuestions[];
  questions: IQuestions[];
  logs: any[];
  socket: WebSocket;
  connected: boolean;
}

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
          // error logs after gridclient finished
          fullStore.pushLogs({ type: "error", content: err });
        });

      // the final response from gridClient, but it is duplicated because it's already pushed
      // fullStore.pushLogs({ type: "success", content: result });
      socket.send(
        JSON.stringify({
          id: data.id,
          event: "invoke_result",
          data: JSON.stringify(result),
        })
      );
    } else if (data.event == "echo") {
      // logs comming from the server
      fullStore.pushLogs({ type: "info", content: data.log });
    } else if (data.event == "question") {
      fullStore.addQuestion(data.question);
    } else if (data.event == "echo_and_question") {
      fullStore.pushLogs({ type: "info", content: data.log });
      fullStore.addQuestion(data.question);
    } else {
      console.log(data);
    }
  }

  events.addListener("logs", (log) => {
    // logs comming from gridclient while executing functions
    fullStore.pushLogs({ type: "info", content: log });
  });

  socket.onopen = __updateConnected(true);
  socket.onclose = __onCloseSocket;
  socket.onmessage = __handleMessage;

  const { subscribe, set, update } = store;

  const fullStore = {
    subscribe,
    set,
    update,

    addQuestion(question: IQuestions) {
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

    // answerQuestion(question: IQuestions, answer: any) {
    //   return update((store) => {
    //     store.questions = store.questions.map((q) => {
    //       if (q !== question) return q;
    //       return q;
    //     });
    //     return store;
    //   });
    // },

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
