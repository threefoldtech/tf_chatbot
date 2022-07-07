<svelte:options tag="tf-question-yn" />

<script lang="ts">
  import type { IQuestionYn } from "../../types/questions";
  import { isBool } from "../../utils/isBool";
  import AnswerBtn from "../AnswerBtn.svelte";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionYn;

  const answers = [
    [true, "Yes"],
    [false, "No"],
  ] as const;

  function onPickAnswer(value: boolean) {
    return () => {
      chatStore.answerQuestion(question, value);
    };
  }
</script>

{#if question}
  <div>
    <p>{question.question}</p>

    {#each answers as [value, label] (label)}
      <AnswerBtn
        text={label}
        disabled={isBool(question.answer) && question.answer !== value}
        readonly={question.answer === value}
        outlined={question.answer !== value}
        on:click={isBool(question.answer) ? undefined : onPickAnswer(value)}
      />
    {/each}
  </div>
{/if}
