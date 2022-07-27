import WsClient from "./wsClient";
import type { Questions, Protocols } from "../types/questions";

export class ChatServer {
  static answerQuestion(over: Protocols, question: Questions, answer: any) {
    if (over == "ws") {
      const ws = new WsClient(question, answer);

      return question.id === -1 ? ws.listServices() : ws.askForService();
    } else if (over == "http") {
      // do some fetch calls.
    }
  }
}
