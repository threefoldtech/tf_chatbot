export type Q_type =
  | "message"
  | "input"
  | "yn"
  | "choices"
  | "menu"
  | "date"
  | "form";

export interface IMessage {
  q_type: Q_type;
  id: string;
  message: string;
  symbol: string;
  valid?: boolean;
  answer: undefined;
}

export interface IQuestion {
  q_type: Q_type;
  id: string;
  question: string;
  descr: string;
  returntype: "string" | "bool" | "uint" | "int";
  regex: string;
  regex_errormsg: string;
  min: number;
  max: number;
  sign: boolean;
  symbol: string;
  valid?: boolean;
  answer: any;
}

export interface IQuestionYn {
  q_type: Q_type;
  chat_id: string;
  question: string;
  id: string;
  symbol: string;
  valid?: boolean;
  answer: any;
}

export interface IQuestionChoice {
  q_type: Q_type;
  question: string;
  id: string;
  descr: string;
  sorted: boolean;
  choices: { value; title }[];
  multi: boolean;
  sign: boolean;
  symbol: string;
  valid?: boolean;
  answer: any | any[];
}

export interface IQuestionDropdown {
  q_type: Q_type;
  question: string;
  id: string;
  descr: string;
  sorted: boolean;
  choices: [any, string][];
  multi: boolean;
  sign: boolean;
  valid?: boolean;
  symbol: string;
  answer: any;
}

export interface IQuestionDate {
  q_type: Q_type;
  id: string;
  question: string;
  symbol: string;
  valid?: boolean;
  answer: any;
}

export interface IQuestionForm {
  q_type: Q_type;
  question: string;
  chat_id: string;
  id: string;
  description: string;
  form: IQuestions[];
  sign: false;
  symbol: string;
  valid?: boolean;
  answer: any;
}

export type IQuestions =
  | IQuestion
  | IQuestionYn
  | IQuestionChoice
  | IQuestionDropdown
  | IQuestionDate
  | IQuestionForm
  | IMessage;
