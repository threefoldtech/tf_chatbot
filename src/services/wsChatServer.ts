import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { Questions } from "../types/questions";
import type { IChatServer } from "../types/types";

export default class WsChatServer implements IChatServer {
  socket: WebSocket;

  constructor() {
    this.socket = get(chatStore).socket;
  }

  askForQuestion(event: string) {
    return this.socket.send(
      JSON.stringify({
        event,
      })
    );
  }

  replyOnQuestion(event: string, reply: string) {
    let data = assign(reply);
    return this.socket.send(
      JSON.stringify({
        event,
        data,
      })
    );
  }

  listServices(question: Questions, answer: any) {
    // chatStore.answerQuestion(question, answer);
    return this.socket.send(
      JSON.stringify({ event: "deploy_vm_form", data: `{ "id": 12 }` })
    );
  }

  askForService(question: Questions, answer: any) {
    let data = {};
    for (let query of Object.values(answer)) {
      Object.assign(data, query);
    }
    console.log({ data });

    this.socket.send(
      JSON.stringify({ event: "deploy_vm", data: JSON.stringify(data) })
    );
  }
}

function assign(indexedObject: Object) {
  let data = {};
  for (let query of Object.values(indexedObject)) {
    Object.assign(data, query);
  }
  return data;
}
