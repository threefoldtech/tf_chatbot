<svelte:options tag="tf-chatquestions" />

<script lang="ts">
  import chatStore from "../../store/chatStore";
  import type { Questions } from "../../types/questions";

  import QuestionChoice from "../questions/QuestionChoice.svelte";
  import QuestionYn from "../questions/QuestionYn.svelte";
  import QuestionInput from "../questions/QuestionInput.svelte";
  import QuestionDropdown from "../questions/QuestionDropdown.svelte";

  function __getCmp({ type }: Questions) {
    if (type === "yn") return QuestionYn;
    if (type === "question_choice") return QuestionChoice;
    if (type === "question") return QuestionInput;
    if (type === "question_dropdown") return QuestionDropdown;
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

  <div nice-scroll style:padding="1rem " style:overflow-y="auto">
    <!-- 
      are we need it to be keyed each? this prevent requesting the same service again.
    {#each $chatStore.questions as question (question.id)}

     -->
    {#each $chatStore.questions as question}
      <svelte:component this={__getCmp(question)} {question} />
    {/each}
  </div>
</section>
