export interface IQuestion {
  type: "question";
  id: number;
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

export type Questions = IQuestion | IQuestionYn | IQuestionChoice;
