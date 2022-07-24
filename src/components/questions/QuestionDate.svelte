<svelte:options tag="tf-question-date" />

<script lang="ts">
  import type { IQuestionDate } from "../../types/questions";
  import snarkdown from "snarkdown";
  import { ChatServer } from "../../services/chatServer";

  export let question: IQuestionDate;

  const onSubmit = () => {
    console.log(question.answer)
    ChatServer.answerQuestion(question, question.answer);
  };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <input type="date" bind:value={question.answer}/>
    <button
      type="submit"
      class="button is-primary is-light"
      disabled={question.answer === ""}
      on:click={onSubmit}
    >
    Next
    </button>
  </div>
{/if}
