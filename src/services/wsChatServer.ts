import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { Questions } from "../types/questions";
import type { IChatServer } from "../types/types";

export default class WsChatServer implements IChatServer {
  socket: WebSocket;

  constructor() {
    this.socket = get(chatStore).socket;
  }

  listServices(question: Questions, answer: any) {
    chatStore.answerQuestion(question, answer);

    // return this.socket.emit("services", (data: Questions) => {
    //   chatStore.answerQuestion(question, answer);
    //   chatStore.addQuestion(data);
    // });
  }

  askForService(question: Questions, answer: any) {
    chatStore.answerQuestion(question, answer);

    // return this.socket.emit(
    //   "askForService",
    //   answer,
    //   ({ logs, services }: any) => {
    //     chatStore.answerQuestion(question, answer);
    //     chatStore.pushLogs(question.id, logs);
    //     chatStore.addQuestion(services);
    //   }
    // );
  }
}
