<svelte:options tag="tf-question-form" />

<script lang="ts">
  import type { IQuestionForm } from "../../types/questions";
  import snarkdown from "snarkdown";

  import type { IQuestions } from "../../types/questions";
  import QuestionChoice from "../questions/QuestionChoice.svelte";
  import QuestionYn from "../questions/QuestionYn.svelte";
  import QuestionInput from "../questions/QuestionInput.svelte";
  import QuestionDropdown from "../questions/QuestionDropdown.svelte";
  import QuestionDate from "../questions/QuestionDate.svelte";
  import chatStore from "../../store/chatStore";
  import { onMount } from "svelte";

  function __getCmp({ q_type }: IQuestions) {
    if (q_type === "yn") return QuestionYn;
    if (q_type === "choices") return QuestionChoice;
    if (q_type === "input") return QuestionInput;
    if (q_type === "menu") return QuestionDropdown;
    if (q_type === "date") return QuestionDate;
  }

  export let question: IQuestionForm;

  // onMount(() => {
  //   chatStore.setCurrentQuestion(question);
  // });
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.question)}</div>
        <hr />

        <form>
          {#each question.form as question, idx}
            <svelte:component
              this={__getCmp(question)}
              {question}
              form={true}
            />
          {/each}
        </form>
      </div>
    </div>
  </div>
{/if}
