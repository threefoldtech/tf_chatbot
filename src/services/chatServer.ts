import type { IChatEventType } from "./../types/types";
import WsChatServer from "./wsChatServer";
import type { IQuestions } from "../types/questions";

export class ChatServer extends WsChatServer {
  answerQuestion(event: IChatEventType, question: IQuestions, answer: any) {
    console.log(`calling event: ${event}`)

    if (event == "services_list") return super.askForQuestion(event);
    if (event == "deploy_vm_form") return super.askForQuestion(event)
    if (event == "deploy_vm") return super.replyOnForm(event, answer)
    if (event == "get_balance_form") return super.askForQuestion(event)
    if (event == "get_balance") return super.replyOnForm(event, answer)
    if (event == "get_twin_question") return super.askForQuestion(event)
    if (event == "get_twin") return super.replyOnForm(event, answer)
    if (event == "deploy_k8s_question") return super.askForQuestion(event)
    if (event == "deploy_k8s") return super.replyOnForm(event, answer)

    console.error('unknown event')
  }
}
