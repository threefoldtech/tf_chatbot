export interface IMessage {
  q_type: "message";
  id: string;
  message: string;
  symbol: string;
}

export interface IQuestion {
  q_type: "input";
  id: string;
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
  id: string;
  symbol: string,

  answer: any;
}

export interface IQuestionChoice {
  q_type: "choices";
  question: string;
  id: string;
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
  id: string;
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
  id: string;
  question: string;
  symbol: string,

  answer: any;
}

export interface IQuestionForm {
  q_type: "form";
  question: string;
  chat_id: string;
  id: string;
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
