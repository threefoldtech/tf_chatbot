<svelte:options tag="tf-message" />

<script lang="ts">
  import type { IMessage } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";
  import { createEventDispatcher } from 'svelte';

  export let question: IMessage;
  export let form: boolean = false;

  let answer: any;

  const onDelete = () => {
    // just update the store to remove the question from UI.
    chatStore.update((store) => {
      store.questions = store.questions.filter(
        (storeQuestion) => storeQuestion.id !== question.id
      );
      return store;
    });
  };

  const onSubmit = () => {
    const chatserver = new ChatServer();
    chatserver.answerQuestion(question, answer);
  };
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        {question.id}
        <div>{@html snarkdown(question.message)}</div>
      </div>
    </div>

    {#if !form}
      <footer class="card-footer">
        {#if question.id !== 0}
          <button
            on:click={onDelete}
            class="button is-danger is-light card-footer-item">Delete</button
          >
        {/if}

        <button
          on:click={onSubmit}
          class="button is-primary is-light card-footer-item">Next</button
        >
      </footer>
    {/if}
  </div>
{/if}
