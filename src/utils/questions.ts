import type { Questions } from "../types/questions";

let id = 1;

export const load_profile_question: Questions = {
  q_type: "form",
  question: "# Load your Profile",
  chat_id: "0",
  id: id++,
  description: "VM Deployment Spces",
  form: [
    {
      q_type: "input",
      id: id++,
      question: "### Network",
      descr: "",
      returntype: "string",
      regex: ".*",
      regex_errormsg: "",
      min: 0,
      max: 0,
      sign: false,
      symbol: "net",
      answer: "",
    },
    {
      q_type: "input",
      id: id++,
      question: "### Mnemonics",
      descr: "",
      returntype: "string",
      regex: ".*",
      regex_errormsg: "",
      min: 0,
      max: 0,
      sign: false,
      symbol: "mne",
      answer: "",
    },
    {
      q_type: "input",
      id: id++,
      question: "### Store Secret",
      descr: "",
      returntype: "string",
      regex: ".*",
      regex_errormsg: "",
      min: 0,
      max: 0,
      sign: false,
      symbol: "secret",
      answer: "",
    },
  ],
  sign: false,
  symbol: "load_profile"
};
