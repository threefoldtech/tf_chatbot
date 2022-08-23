import chatStore from "../store/chatStore";
import { get } from "svelte/store";
import type { IChatServer, IChatEventType } from "../types/types";
import { assign } from "../utils/utils";

export default class WsChatServer implements IChatServer {
  socket: WebSocket;

  constructor() {
    this.socket = get(chatStore).socket;
  }

  askForQuestion(event: IChatEventType) {
    return this.socket.send(
      JSON.stringify({
        event,
      })
    );
  }

  /*
    make it a one reply function and check on the type of the reply
  */

  replyOnForm(event: IChatEventType, reply: string) {
    let data = assign(reply);
    return this.socket.send(
      JSON.stringify({
        event,
        data: JSON.stringify(data),
      })
    );
  }

  replyOnQuestion(event: IChatEventType, reply: string) {
    return this.socket.send(
      JSON.stringify({
        event,
        reply,
      })
    );
  }
}
