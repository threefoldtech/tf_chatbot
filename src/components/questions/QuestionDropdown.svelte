<svelte:options tag="tf-question-dropdown" />

<script lang="ts">
  import type { IQuestionDropdown } from "../../types/questions";
  import snarkdown from "snarkdown";

  export let question: IQuestionDropdown;
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

        <div class="select">
          <select bind:value={question.answer}>
            <option disabled value={undefined}>{question.descr}...</option>
            {#each question.choices as choice}
              <option value={choice[1]}>{choice[1]}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
{/if}
