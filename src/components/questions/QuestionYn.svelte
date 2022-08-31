<svelte:options tag="tf-question-yn" />

<script lang="ts">
  import type { IQuestionYn } from "../../types/questions";
  import snarkdown from "snarkdown";

  export let question: IQuestionYn;
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

        <div>
          <label>
            <input
              type="radio"
              bind:group={question.answer}
              name={question.id}
              value={true}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              bind:group={question.answer}
              name={question.id}
              value={false}
            />
            No
          </label>
        </div>
      </div>
    </div>
  </div>
{/if}
