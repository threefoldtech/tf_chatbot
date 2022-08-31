import type {
  IQuestionChoice,
  IQuestionYn,
  IQuestion,
} from "../types/questions";

import { getId } from "./utils";

export const input_question_example: IQuestion = {
  q_type: "input",
  id: getId(),
  question: "### Enter a name",
  descr: "",
  returntype: "string",
  regex: "^[a-z]$",
  regex_errormsg: "don't match the regex",
  min: 0,
  max: 0,
  valid: false,
  sign: false,
  symbol: "name",
  answer: "js",
};

export const yn_question_example: IQuestionYn = {
  q_type: "yn",
  chat_id: getId(),
  id: getId(),
  question: "### Public Ip",
  symbol: "public_ip",
  answer: true,
};

export const choices_question_example: IQuestionChoice = {
  q_type: "choices",
  question: "choose of the following",
  id: getId(),
  descr: "lo",
  sorted: false,
  choices: [
    {
      value: "1",
      title: "first",
    },
    {
      value: "2",
      title: "secend",
    },
  ],
  multi: false,
  sign: false,
  symbol: "choice",
  valid: true,

  answer: [],
};
