<svelte:options tag="tft-question-dropdown" />

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

  <section class="dropdown">
    <select class="menu" name="menu" id="menu" bind:value={selected}>
      <option disabled selected value=""
        >{question.descr}...</option
      >
      {#each question.choices as country}
        <option value={country[1]}>{country[1]}</option>
      {/each}
    </select>
    <div class="is-flex is-justify-content-end">
      <button
        type="submit"
        class="button is-primary is-light"
        disabled={selected === ""}
        on:click={onSubmit}
      >
        Submit
      </button>
    </div>
  </section>
{/if}
