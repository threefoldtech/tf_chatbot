import type { IQuestions } from "./questions";

export interface IChatServer {
  /*
   @TODO: implement interface for chatserver
  */
  // listServices(question: Questions, answer: any): any;
  // askForService(question: Questions, answer: any): any;
}

export type IChatEventType = "services_list" | "deploy_vm_form" | "deploy_vm";