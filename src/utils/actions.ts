import { ChatServer } from "./../services/chatServer";
import { load_profile } from "./handlers";

/*
    Separated the submission code to be accessible from questionchoice/actions components
 */

const submit = (question, answer: any) => {
  const chatserver = new ChatServer();

  console.log(`Answering question with symbol: ${question.symbol}`);

  if (question.symbol == "load_profile") {
    load_profile(answer);
    chatserver.answerQuestion("services_list", question, answer);
    
  } else if (question.symbol == "loaded_profile") {
    chatserver.answerQuestion("services_list", question, answer);

  } else if (question.symbol == "service") {
    chatserver.answerQuestion(question.answer, question, answer);

  } else if (question.symbol == "vm_specs") {
    chatserver.answerQuestion("deploy_vm", question, answer);

  } else if (question.symbol == "acc_address") {
    chatserver.answerQuestion("get_balance", question, answer);

  } else if (question.symbol == "twin_id") {
    chatserver.answerQuestion("get_twin", question, answer);

  } else if (question.symbol == "k8s_specs") {
    chatserver.answerQuestion("deploy_k8s", question, answer);

  } else {
    chatserver.answerQuestion(undefined, question, answer);
  }
};

export const onSubmit = (question: any) => {
  let answer: any = {};

  if (question.q_type !== "form") {
    answer[question.symbol] = question.answer;
  } else {
    for (let q of question.form) {
      answer[q.symbol] = q.answer;
    }
  }

  console.log(`Submitting Answer: ${JSON.stringify(answer)}`);
  submit(question, answer);
};
