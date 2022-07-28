import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { Questions } from "../types/questions";

/*
export class ChatServer {
  static answerQuestion(question: Questions, answer: any) {
    const socket = get(chatStore).socket;

    if (question.id === -1) {
      return socket.emit("services", (data: Questions) => {
        chatStore.answerQuestion(question, answer);
        chatStore.addQuestion(data);
      });
    }

    socket.emit("askForService", answer, ({ logs, services }: any) => {
      chatStore.answerQuestion(question, answer);
      chatStore.pushLogs(logs);
      chatStore.addQuestion(services);
    });
  }
}

*/