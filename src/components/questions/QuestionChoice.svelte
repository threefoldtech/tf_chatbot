<svelte:options tag="tf-question-choice" />

<script lang="ts">
  import type { IQuestionChoice } from "../../types/questions";
  import AnswerBtn from "../AnswerBtn.svelte";
  import snarkdown from "snarkdown";

  import { onSubmit } from "../../utils/actions";

  export let question: IQuestionChoice;
  export let form: boolean;

  function onToggleAnswer(answer: any) {
    return () => {
      if (!question.multi) {
        question.answer = answer;
        onSubmit(question);
      } else {
        const index = question.answer.findIndex((a) => a === answer);

        if (index === -1) {
          question.answer.push(answer);
        } else {
          question.answer = question.answer.filter((a) => a !== answer);
        }
      }
    };
  }
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.question)}</div>

        {#if !form}
          <hr />
        {/if}

        {#each question.choices as choice}
          <AnswerBtn
            text={choice.title}
            on:click={onToggleAnswer(choice.value)}
          />
          <!-- disabled={!isEmpty(answer) && !selectedChoices.includes(choice.value)}
            readonly={!isEmpty(question.answer) &&
              selectedChoices.includes(choice.value)}
            selected={selectedChoices.includes(choice.value)} -->
        {/each}
      </div>
    </div>
  </div>
{/if}
