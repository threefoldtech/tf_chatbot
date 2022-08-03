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
  import QuestionForm from "../questions/QuestionForm.svelte";

  function __getCmp({ type }: Questions) {
    if (type === "yn") return QuestionYn;
    if (type === "question_choice") return QuestionChoice;
    if (type === "question") return QuestionInput;
    if (type === "question_dropdown") return QuestionDropdown;
    if (type === "q-date") return QuestionDate;
    if (type === "question_form") return QuestionForm;
  }

  export let question: IQuestionForm;

  let answer: any = undefined;

  $: {
    if (answer !== undefined) updateAnswer();
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {
      oldStore.currentAnswer = answer;
      return oldStore;
    });
  };

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
    // get the value from the store.
    chatStore.subscribe((store) => {
      answer = store.currentAnswer;
    });

    console.log({ answer });
    // then answer to the server.
    const chatserver = new ChatServer();
    chatserver.answerQuestion(question, answer);
  };
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.description)}</div>
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
      {#if question.id !== 0}
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
