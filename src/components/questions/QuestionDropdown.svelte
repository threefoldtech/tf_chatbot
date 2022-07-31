<svelte:options tag="tf-question-dropdown" />

<script lang="ts">
  import type { IQuestionDropdown } from "../../types/questions";
  import snarkdown from "snarkdown";
  import chatStore from "../../store/chatStore";

  export let question: IQuestionDropdown;
  let answer: any = undefined;

  // $: {
  //   if (question) {
  //     if (answer !== "") {
  //       updateAnswer();
  //     }
  //   }
  //   console.log(question);
  // }

  // const updateAnswer = () => {
  //   chatStore.update((oldStore) => {
  //     oldStore.currentAnswer = answer;
  //     return oldStore;
  //   });
  // };

  $: {
    if (answer !== undefined) updateAnswer();
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {
      oldStore.currentAnswer = answer;
      return oldStore;
    });
  };

  // const onSubmit = () => {
  //   console.log(selected);
  //   const chatserver = new ChatServer();
  //   chatserver.answerQuestion(question, selected);
  // };
</script>

{#if question}
  <div>{@html snarkdown(question.question)}</div>
  <div class="is-flex is-justify-content-space-between">
    <select bind:value={answer}>
      <option disabled selected value={undefined}>{question.descr}...</option>
      {#each question.choices as country}
        <option value={country[1]}>{country[1]}</option>
      {/each}
    </select>
    <!-- <button
      type="submit"
      class="button is-primary is-light"
      disabled={selected === ""}
      on:click={onSubmit}
    >
      Next
    </button> -->
  </div>
{/if}
