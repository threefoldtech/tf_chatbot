export interface IMessage {
  q_type: "message";
  id: number;
  message: string;
}

export interface IQuestion {
  q_type: "input";
  id: number;
  question: string;
  descr: string;
  returntype: "string" | "bool" | "uint" | "int";
  regex: string;
  regex_errormsg: string;
  min: number;
  max: number;
  sign: boolean;
  symbol: string,

  answer: any;
}

export interface IQuestionYn {
  q_type: "yn";
  chat_id: string;
  question: string;
  id: number;
  symbol: string,

  answer: any;
}

export interface IQuestionChoice {
  q_type: "choices";
  question: string;
  id: number;
  descr: string;
  sorted: boolean;
  choices: any[];
  multi: boolean;
  sign: boolean;
  symbol: string,

  answer: any;
}

export interface IQuestionDropdown {
  q_type: "menu";
  question: string;
  id: number;
  descr: string;
  sorted: boolean;
  choices: [any, string][];
  multi: boolean;
  sign: boolean;
  symbol: string,
  answer: any;
}

export interface IQuestionDate {
  q_type: "date";
  id: number;
  question: string;
  symbol: string,

  answer: any;
}

export interface IQuestionForm {
  q_type: "form";
  question: string;
  chat_id: string;
  id: number;
  description: string;
  form: Questions[];
  sign: false;
  symbol: string;
}

export type Questions =
  | IQuestion
  | IQuestionYn
  | IQuestionChoice
  | IQuestionDropdown
  | IQuestionDate
  | IQuestionForm
  | IMessage;
