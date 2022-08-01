<svelte:options tag="tf-question-actions" />

<script lang="ts">
  import { get } from "svelte/store";
  import chatStore from "../store/chatStore";

  import { ChatServer } from "../services/chatServer";
  import type { Questions } from "../types/questions";

  export let question: Questions;
  let answer: any;

  const onDelete = () => {
    console.log({ question });
    // just update the store to remove the question from UI.
    chatStore.update((store) => {
      store.questions = store.questions.filter(
        (storeQuestion) => storeQuestion.id !== question.id
      );

      return store;
    });
  };
  const onSubmit = () => {
    // get the value from the store.
    chatStore.subscribe((store) => {
      answer = store.currentAnswer;
    });

    console.log({ answer });
    // then answer to the server.
    const chatserver = new ChatServer();
    chatserver.answerQuestion(question, answer);
  };
</script>

<!-- Avoid rendering if no question -->
{#if question}
  <!-- <div class="actions"> -->
  <!-- Avoid delete if the first question -->
  {#if question.id !== 0}
    <a href="#" on:click={onDelete} class="card-footer-item">Delete</a>

    <!-- <button
        type="reset"
        class="delete-button button is-danger is-light"
        on:click={onDelete}
      >
        Delete
      </button> -->
  {/if}

  <!-- Avoid Nexting if multi choices question and not first q-->
  {#if question.type !== "question_choice" || question.id === 0}
    <a href="#" on:click={onSubmit} class="card-footer-item">Next</a>

    <!-- <button
        type="submit"
        class="submit-button button is-primary is-light"
        on:click={onSubmit}
      >
        Next
      </button> -->
  {/if}
  <!-- </div> -->
{/if}

<!-- <style>
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style> -->
