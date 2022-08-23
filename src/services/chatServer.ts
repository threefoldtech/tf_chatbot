import type { IChatEventType } from "./../types/types";
import WsChatServer from "./wsChatServer";
import type { Questions } from "../types/questions";

export class ChatServer extends WsChatServer {
  answerQuestion(event: IChatEventType, question: Questions, answer: any) {
    console.log(`calling event: ${event}`)

    if (event == "services_list") return super.askForQuestion(event);
    if (event == "deploy_vm_form") return super.askForQuestion(event)
    if (event == "deploy_vm") return super.replyOnForm(event, answer)

    console.error('unknown event')

    // if (question.id === 0) return super.listServices(question, answer);
    // super.askForService(question, answer);
  }
}
