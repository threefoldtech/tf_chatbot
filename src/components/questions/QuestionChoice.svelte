<svelte:options tag="tf-question-choice" />

<script lang="ts">
  import type { IQuestionChoice } from "../../types/questions";
  import { isEmpty } from "../../utils/isEmpty";
  import AnswerBtn from "../AnswerBtn.svelte";
  import { ChatServer } from "../../services/chatServer";

  export let question: IQuestionChoice;

  import snarkdown from "snarkdown";

  let selectedChoices: any[] = [];
  function onToggleAnswer(answer: any) {
    return () => {
      if (!question.multi) {
        selectedChoices = [answer];
        return onSubmitAnswer(answer);
      }

      const index = selectedChoices.findIndex((a) => a === answer);
      if (index === -1) selectedChoices = [...selectedChoices, answer];
      else selectedChoices = selectedChoices.filter((a) => a !== answer);
    };
  }

  function onSubmitAnswer(answer: any) {
    ChatServer.answerQuestion("ws", question, answer);
  }
</script>

{#if question}
  <div>
    <div>{@html snarkdown(question.descr)}</div>

    {#each question.choices as [value, label] (label)}
      <AnswerBtn
        text={label}
        disabled={!isEmpty(question.answer) && !selectedChoices.includes(value)}
        readonly={!isEmpty(question.answer) && selectedChoices.includes(value)}
        outlined={!selectedChoices.includes(value)}
        on:click={!isEmpty(question.answer) ? undefined : onToggleAnswer(value)}
      />
    {/each}

    {#if question.multi && isEmpty(question.answer)}
      <div class="is-flex is-justify-content-flex-end">
        <button
          class="button is-primary is-light"
          disabled={selectedChoices.length === 0}
          on:click={!isEmpty(question.answer)
            ? undefined
            : () => onSubmitAnswer(selectedChoices)}
        >
          Next
        </button>
      </div>
    {/if}
  </div>
{/if}
