<svelte:options tag="tf-question-yn" />

<script lang="ts">
  import type { IQuestionYn } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  export let question: IQuestionYn;

  const onSubmit = () => {
    console.log(question.answer);
    const chatserver = new ChatServer();
    chatserver.answerQuestion(question, question.answer);
  };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <div>
      <label>
        <input
          type="radio"
          bind:group={question.answer}
          name="scoops"
          value={true}
        />
        Yes
      </label>

      <label>
        <input
          type="radio"
          bind:group={question.answer}
          name="scoops"
          value={false}
        />
        No
      </label>
    </div>
    <button
      type="submit"
      class="button is-primary is-light"
      disabled={question.answer === undefined}
      on:click={onSubmit}
    >
      Next
    </button>
  </div>
{/if}
