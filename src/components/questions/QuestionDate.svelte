<svelte:options tag="tf-question-date" />

<script lang="ts">
  import type { IQuestionDate } from "../../types/questions";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionDate;
  export let form: boolean = false;

  let answer: any = undefined;

  $: {
    if (form && answer !== undefined) {
      updateAnswer();
    }
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {

      // {
      //   qid: question.id,
      //   answer: {
      //     symbol: question.symbol,
      //     value:
      //   }
      // }
      oldStore.currentAnswer[question.id] = { [question.symbol]: answer };
      // console.log(oldStore.currentAnswer)
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
    chatserver.answerQuestion(question, answer);
  };
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        {question.id}
        <div>{@html snarkdown(question.question)}</div>

        {#if !form}
          <hr />
        {/if}
        <input type="date" bind:value={answer} />
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
