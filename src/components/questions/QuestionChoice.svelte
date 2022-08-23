<svelte:options tag="tf-question-choice" />

<script lang="ts">
  import type { IQuestionChoice } from "../../types/questions";
  import { isEmpty } from "../../utils/isEmpty";
  import { ChatServer } from "../../services/chatServer";
  import AnswerBtn from "../AnswerBtn.svelte";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionChoice;
  export let form: boolean;

  let answer: any;

  let selectedChoices: any[] = [];

  function onToggleAnswer(answer: any) {
    return () => {
      if (!question.multi) {
        selectedChoices = answer;
        return onSubmitAnswer();
      }

      const index = selectedChoices.findIndex((a) => a === answer);

      if (index === -1) {
        selectedChoices.push(answer);

      } else {
        selectedChoices = selectedChoices.filter((a) => a !== answer);

      }
    };
  }

  function onSubmitAnswer() {
    const chatserver = new ChatServer();
    chatserver.answerQuestion(selectedChoices as any, question, selectedChoices);
  }

  const onDelete = () => {
    // just update the store to remove the question from UI.
    chatStore.update((store) => {
      store.questions = store.questions.filter(
        (storeQuestion) => storeQuestion.id !== question.id
      );
      return store;
    });
  };
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
            disabled={!isEmpty(answer) && !selectedChoices.includes(choice.value)}
            readonly={!isEmpty(question.answer) &&
              selectedChoices.includes(choice.value)}
            selected={selectedChoices.includes(choice.value)}
            on:click={!isEmpty(answer) ? undefined : onToggleAnswer(choice.value)}
          />
        {/each}
      </div>
    </div>

    {#if !form}
      <footer class="card-footer">
        <button
          on:click={onDelete}
          class="button is-danger is-light card-footer-item">Delete</button
        >
        {#if question.multi}
          <button
            disabled={selectedChoices === []}
            on:click={onSubmitAnswer}
            class="button is-primary is-light card-footer-item">Next</button
          >
        {/if}
      </footer>
    {/if}
  </div>
{/if}
