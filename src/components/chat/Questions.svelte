<svelte:options tag="tf-chatquestions" />

<script lang="ts">
  const questions = [
    "Deploy Virtual Machine",
    "Deploy K8s",
    "Deploy Caprover",
    "Deploy Validator",
  ];

  let answered = false;
  let answer: string;
  function onPickAnswer(_answer: string) {
    return () => {
      answered = true;
      answer = _answer;
    };
  }
</script>

<section
  style:height="100%"
  style:width="50%"
  style:display="flex"
  style:flex-direction="column"
>
  <div
    style:background="linear-gradient(125deg, #1972F5 -10%, #004AB5 100%)"
    style:font-size="12px"
    style:color="white"
    style:padding="15px"
  >
    <h2 style:margin="0" style:font-size="1.6rem">Questions?</h2>
  </div>

  <div nice-scroll style:padding="1rem " style:overflow-y="scroll">
    {#each questions as question}
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
    {/if}
  </div>
</section>
