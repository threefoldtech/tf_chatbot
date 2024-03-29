import type { IMessage, IQuestionForm } from "../types/questions";
import { getId } from "./utils";

export const load_profile_question: IQuestionForm = {
  q_type: "form",
  question: "# Load your Profile",
  chat_id: getId(),
  id: getId(),
  description: "VM Deployment Spces",
  form: [
    {
      q_type: "input",
      id: getId(),
      question: "### Network",
      descr: "",
      returntype: "string",
      regex: ".*",
      regex_errormsg: "",
      min: 0,
      max: 0,
      sign: false,
      symbol: "net",
      answer: "dev",
    },
    {
      q_type: "input",
      id: getId(),
      question: "### Mnemonics",
      descr: "",
      returntype: "string",
      regex: ".*",
      regex_errormsg: "",
      min: 0,
      max: 0,
      sign: false,
      symbol: "mne",
      answer: "mnr",
    }
  ],
  sign: false,
  symbol: "load_profile",
  answer: "",
};

export const init_welcome_msg: IMessage = {
  q_type: "message",
  id: getId(),
  message: "Your profile has been loaded from server.",
  symbol: "loaded_profile",
  answer: undefined,
};
