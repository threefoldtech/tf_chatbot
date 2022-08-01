<svelte:options tag="tf-question-date" />

<script lang="ts">
  import type { IQuestionDate } from "../../types/questions";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionDate;
  let answer: any = undefined;
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
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  {#if !form}
    <hr />
  {/if}

  <input type="date" bind:value={answer} />
{/if}
