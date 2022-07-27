export interface IQuestion {
  type: "question";
  id: number;
  question: string;
  descr: string;
  returntype: "string" | "bool" | "uint" | "int";
  regex: string;
  regex_errormsg: string;
  min: number;
  max: number;
  sign: boolean;

  answer: any;
}

export interface IQuestionYn {
  type: "yn";
  chat_id: number;
  question: string;
  id: number;

  answer: boolean;
}

export interface IQuestionChoice {
  type: "question_choice";
  id: number;
  descr: string;
  sorted: boolean;
  choices: [any, string][];
  multi: boolean;
  sign: boolean;

  answer: any;
}

export interface IQuestionDropdown {
  type: "question_dropdown";
  question: string;
  id: number;
  descr: string;
  sorted: boolean;
  choices: [any, string][];
  multi: boolean;
  sign: boolean;

  answer: any;
}

export interface IQuestionDate {
  type: "q-date";
  id: number;
  question: string;
  answer: any;
}

export type Protocols = "ws" | "http";

export type Questions =
  | IQuestion
  | IQuestionYn
  | IQuestionChoice
  | IQuestionDropdown
  | IQuestionDate;
