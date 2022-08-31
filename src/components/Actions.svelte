<svelte:options tag="tf-actions" />

<script lang="ts">
  import chatStore from "../store/chatStore";
  import type { IQuestions } from "../types/questions";
  import { onSubmit } from "../utils/actions";

  export let question: IQuestions;

  const remove = () => {
    chatStore.update((store) => {
      store.questions = store.questions.filter(
        (storeQuestion) => storeQuestion.id !== question.id
      );
      return store;
    });
  };

  const onDelete = () => {
    console.log(`Deleting question with Id: ${question.id}`);
    remove();
  };

</script>

{#if question}
  <div class="card">
    <footer class="card-footer">
      <button
        on:click={onDelete}
        class="button is-danger is-light card-footer-item">Delete</button
      >
      <button
        on:click={() => onSubmit(question)}
        class="button is-primary is-light card-footer-item">Next</button
      >
    </footer>
  </div>
{/if}
