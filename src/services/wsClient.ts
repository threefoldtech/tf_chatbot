import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { Questions } from "../types/questions";

export default class WsClient {
  question: Questions;
  answer: any;
  socket: any;

  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.socket = get(chatStore).socket;
  }

  listServices() {
    return this.socket.emit("services", (data: Questions) => {
      chatStore.answerQuestion(this.question, this.answer);
      chatStore.addQuestion(data);
    });
  }

  askForService() {
    return this.socket.emit(
      "askForService",
      this.answer,
      ({ logs, services }: any) => {
        chatStore.answerQuestion(this.question, this.answer);
        chatStore.pushLogs(logs);
        chatStore.addQuestion(services);
      }
    );
  }
}
