import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { Questions } from "../types/questions";

export class ChatServer {
  static answerQuestion(question: Questions, answer: any) {

    const socket = get(chatStore).socket;

    if (question.id === -1) {
        return socket.send(JSON.stringify("services", (data: Questions) => {
        console.log(data, answer)
        chatStore.answerQuestion(question, answer);
        chatStore.addQuestion(data);
      }));
    }

    /*
    socket.send(JSON.stringify("askForService", answer, ({ logs, services }: any) => {
      chatStore.answerQuestion(question, answer);
      chatStore.pushLogs(logs);
      chatStore.addQuestion(services);
    }));
    */
  }
}
