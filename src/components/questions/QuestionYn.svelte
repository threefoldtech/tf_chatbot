<svelte:options tag="tf-question-yn" />

<script lang="ts">
  import type { IQuestionYn } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionYn;
  export let form: boolean = false;

  let answer: any;

  $: {
    if (form && answer !== undefined) {
      updateAnswer();
    }
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {
      oldStore.currentAnswer[question.id] = { [question.symbol]: answer };
      return oldStore;
    });
  };

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
    chatserver.answerQuestion(undefined, question, answer);
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

        <div>
          <label>
            <input
              type="radio"
              bind:group={answer}
              name={`${question.id}`}
              value={true}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              bind:group={answer}
              name={`${question.id}`}
              value={false}
            />
            No
          </label>
        </div>
      </div>
    </div>

    {#if !form}
      <footer class="card-footer">
        <button
          on:click={onDelete}
          class="button is-danger is-light card-footer-item">Delete</button
        >
        <button
          disabled={answer === undefined}
          on:click={onSubmit}
          class="button is-primary is-light card-footer-item">Next</button
        >
      </footer>
    {/if}
  </div>
{/if}
