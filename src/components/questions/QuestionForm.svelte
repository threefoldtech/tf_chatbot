<svelte:options tag="tf-question-form" />

<script lang="ts">
  import type { IQuestionForm } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  import type { Questions } from "../../types/questions";

  import QuestionChoice from "../questions/QuestionChoice.svelte";
  import QuestionYn from "../questions/QuestionYn.svelte";
  import QuestionInput from "../questions/QuestionInput.svelte";
  import QuestionDropdown from "../questions/QuestionDropdown.svelte";
  import QuestionDate from "../questions/QuestionDate.svelte";
  import { load_profile } from "../../utils/handlers";

  function __getCmp({ q_type }: Questions) {
    if (q_type === "yn") return QuestionYn;
    if (q_type === "choices") return QuestionChoice;
    if (q_type === "input") return QuestionInput;
    if (q_type === "menu") return QuestionDropdown;
    if (q_type === "date") return QuestionDate;
  }

  export let question: IQuestionForm;

  const onDelete = () => {
    // just update the store to remove the question from UI.
    chatStore.update((store) => {
      store.questions = store.questions.filter(
        (storeQuestion) => storeQuestion.id !== question.id
      );
      return store;
    });
  };

  const onSubmit = () => {
    let answer: any;

    chatStore.subscribe((store) => {
      answer = store.currentAnswer;
    });

    const chatserver = new ChatServer();

    console.log(`got symbol: ${question.symbol}`);
    if (question.symbol == "load_profile") {
      load_profile(answer);
      chatserver.answerQuestion("services_list", question, answer);
    } else if (question.symbol == "vm_specs") {
      chatserver.answerQuestion("deploy_vm", question, answer);
    } else {
      chatserver.answerQuestion(undefined, question, answer);
    }
  };
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.question)}</div>
        <hr />

        <form>
          {#each question.form as question}
            <svelte:component
              this={__getCmp(question)}
              {question}
              form={true}
            />
          {/each}
        </form>
      </div>
    </div>

    <footer class="card-footer">
      {#if question.id !== "0"}
        <button
          on:click={onDelete}
          class="button is-danger is-light card-footer-item">Delete</button
        >
      {/if}

      <button
        on:click={onSubmit}
        class="button is-primary is-light card-footer-item">Next</button
      >
    </footer>
  </div>
{/if}
