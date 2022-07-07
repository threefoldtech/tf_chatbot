<svelte:options tag="tf-question-choice" />

<script lang="ts">
  import type { IQuestionChoice } from "../../types/questions";

  export let question: IQuestionChoice;

  //   const questions = [
  //     "Deploy Virtual Machine",
  //     "Deploy K8s",
  //     "Deploy Caprover",
  //     "Deploy Validator",
  //   ];

  //   let answered = false;
  //   let answer: string;
  //   function onPickAnswer(_answer: string) {
  //     return () => {
  //       answered = true;
  //       answer = _answer;
  //     };
  //   }
</script>

<!-- {#each questions as question}
  <button
    class="button is-link mt-1 mb-1 mr-1"
    class:is-outlined={question !== answer}
    style:white-space="initial"
    style:height="auto"
    style:text-align="left"
    disabled={answered && question !== answer}
    readonly={question === answer}
    on:click={answered ? undefined : onPickAnswer(question)}
  >
    {question}
  </button>
{/each}

{#if answer}
  <p>Answer: {answer}</p>
{/if} -->
