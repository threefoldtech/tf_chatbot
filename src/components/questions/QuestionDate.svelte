<svelte:options tag="tf-question-date" />

<script lang="ts">
  import type { IQuestionDate } from "../../types/questions";
  import snarkdown from "snarkdown";
  import { ChatServer } from "../../services/chatServer";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionDate;
  let answer: any = undefined;
  export let form: boolean = false;

  // const onSubmit = () => {
  //   console.log(question.answer);
  //   const chatserver = new ChatServer();
  //   chatserver.answerQuestion(question, question.answer);
  // };

  $: {
    if (answer !== undefined) updateAnswer();
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {
      // if is single question. empty the answer store.
      if (!form) oldStore.currentAnswer = {};
      oldStore.currentAnswer[question.id] = answer;
      return oldStore;
    });
  };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <input type="date" bind:value={answer} />
    <!-- <button
      type="submit"
      class="button is-primary is-light"
      disabled={question.answer === ""}
      on:click={onSubmit}
    >
      Next
    </button> -->
  </div>
{/if}
