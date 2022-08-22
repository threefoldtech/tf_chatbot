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
    chatStore.answerQuestion(question, answer); // ???
    return this.socket.send(JSON.stringify({ event: "task", data: `{ "id": 12 }` }))
  }

  askForService(question: Questions, answer: any) {
    let data = {}

    for (let query of Object.values(answer)) {
      Object.assign(data, query)
    }

    this.socket.send(JSON.stringify({ event: 'echo', data: JSON.stringify(data)}))
  }
}
