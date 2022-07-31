<svelte:options tag="tf-question-yn" />

<script lang="ts">
  import type { IQuestionYn } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionYn;
  let answer: any;
  export let form: boolean = false;

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

  // const onSubmit = () => {
  //   console.log(question.answer);
  //   const chatserver = new ChatServer();
  //   chatserver.answerQuestion(question, question.answer);
  // };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <div>
      <label>
        <input type="radio" bind:group={answer} name="scoops" value={true} />
        Yes
      </label>

      <label>
        <input type="radio" bind:group={answer} name="scoops" value={false} />
        No
      </label>
    </div>
    <!-- <button
      type="submit"
      class="button is-primary is-light"
      disabled={question.answer === undefined}
      on:click={onSubmit}
    >
      Next
    </button> -->
  </div>
{/if}
