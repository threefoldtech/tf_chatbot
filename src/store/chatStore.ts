import { writable } from "svelte/store";
import type { Questions } from "../types/questions";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  open: boolean;
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
    questions: [
      {
        id: -1,
        type: "question_choice",
        descr: "Welcome in threefold chatbot",
        choices: [[true, "Show More!"]],
        multi: false,
        sorted: false,
        sign: false,
        answer: null,
      },
      // {
      //   type: "question",
      //   id: 10,
      //   descr: "aname",
      //   returntype: "string", //can be bool, string, int, uint
      //   regex: "\\w+", //only relevant when string
      //   regex_errormsg: "can only be a name with a...z, and A...Z", //shown when regex does not match, if not specified show regex
      //   min: 0, //only relevant when (u)int
      //   max: 0, //only relevant when (u)int
      //   sign: false, //if sign then the result will also return a signed field
      //   answer: null,
      // },
      // {
      //   type: "question",
      //   id: 12,
      //   descr: "aname",
      //   returntype: "int", //can be bool, string, int, uint
      //   regex: "\\w+", //only relevant when string
      //   regex_errormsg: "can only be a name with a...z, and A...Z", //shown when regex does not match, if not specified show regex
      //   min: 1, //only relevant when (u)int
      //   max: 10, //only relevant when (u)int
      //   sign: false, //if sign then the result will also return a signed field
      //   answer: null,
      // },
      // {
      //   type: "question",
      //   id: 11,
      //   descr: "aname",
      //   returntype: "bool", //can be bool, string, int, uint
      //   regex: "", //only relevant when string
      //   regex_errormsg: "", //shown when regex does not match, if not specified show regex
      //   min: 0, //only relevant when (u)int
      //   max: 0, //only relevant when (u)int
      //   sign: false, //if sign then the result will also return a signed field
      //   answer: null,
      // },
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
