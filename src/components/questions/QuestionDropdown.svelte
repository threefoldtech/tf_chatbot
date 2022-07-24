<svelte:options tag="tf-question-dropdown" />

<script lang="ts">
  import type { IQuestionDropdown } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";

  export let question: IQuestionDropdown;

  let selected = "";

  const onSubmit = () => {
    console.log(selected);
    ChatServer.answerQuestion(question, selected);
  };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <select class="menu" name="menu" id="menu" bind:value={selected}>
      <option disabled selected value="">{question.descr}...</option>
      {#each question.choices as country}
        <option value={country[1]}>{country[1]}</option>
      {/each}
    </select>
    <button
      type="submit"
      class="button is-primary is-light"
      disabled={selected === ""}
      on:click={onSubmit}
    >
    Next
    </button>
  </div>
{/if}
