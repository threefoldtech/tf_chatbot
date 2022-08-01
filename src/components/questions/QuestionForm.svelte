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

  // const onSubmit = () => {
  //   const chatserver = new ChatServer();
  //   chatserver.answerQuestion(question, answer);
  // };
</script>

{#if question}
  <div style="margin-right: 30px">{@html snarkdown(question.description)}</div>
  <hr />

  <form>
    {#each question.form as question}
      <svelte:component this={__getCmp(question)} {question} form={true} />
    {/each}
  </form>
{/if}
