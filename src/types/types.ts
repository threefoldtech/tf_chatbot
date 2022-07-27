import type { Questions } from "./questions";

export interface IChatServer {
  listServices(question: Questions, answer: any): any;
  askForService(question: Questions, answer: any): any;
}
