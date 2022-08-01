<svelte:options tag="tf-question-dropdown" />

<script lang="ts">
  import type { IQuestionDropdown } from "../../types/questions";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let form: boolean = false;
  export let question: IQuestionDropdown;
  let answer: any = undefined;

  // use on:change instead
  // $: {
  //   if (answer !== undefined) updateAnswer();
  // }

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

  <div class="select">
    <select bind:value={answer} on:change={updateAnswer}>
      <option disabled value="">{question.descr}...</option>
      {#each question.choices as choice}
        <option value={choice[1]}>{choice[1]}</option>
      {/each}
    </select>
  </div>
{/if}
