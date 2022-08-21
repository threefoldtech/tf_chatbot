import WsChatServer from "./wsChatServer";
import type { Questions } from "../types/questions";

export class ChatServer extends WsChatServer {
  answerQuestion(question: Questions, answer: any) {
    if (question.id === 0) return super.listServices(question, answer);
    super.askForService(question, answer);
  }
}
