<svelte:options tag="tf-question-date" />

<script lang="ts">
  import type { IQuestionDate } from "../../types/questions";
  import snarkdown from "snarkdown";

  export let question: IQuestionDate;
  export let form: boolean = false;
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.question)}</div>

        {#if !form}
          <hr />
        {/if}
        <input type="date" bind:value={question.answer} />
      </div>
    </div>
  </div>
{/if}
