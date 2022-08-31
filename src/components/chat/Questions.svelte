<svelte:options tag="tf-chat-questions" />

<script lang="ts">
  import QuestionForm from "../questions/QuestionForm.svelte";
  import QuestionInput from "../questions/QuestionInput.svelte";
  import QuestionYn from "../questions/QuestionYn.svelte";
  import QuestionChoice from "../questions/QuestionChoice.svelte";
  import QuestionDropdown from "../questions/QuestionDropdown.svelte";
  import QuestionDate from "../questions/QuestionDate.svelte";
  import Message from "../questions/Message.svelte";

  import Actions from "../Actions.svelte";

  import chatStore from "../../store/chatStore";
  import type { IQuestions } from "../../types/questions";

  function __getCmp({ q_type }: IQuestions) {
    if (q_type === "yn") return QuestionYn;
    if (q_type === "choices") return QuestionChoice;
    if (q_type === "input") return QuestionInput;
    if (q_type === "menu") return QuestionDropdown;
    if (q_type === "date") return QuestionDate;
    if (q_type === "form") return QuestionForm;
    if (q_type === "message") return Message;
  }

  const deleteAllQs = () => {
    chatStore.cleanStore();
  };
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
    <div
      class="is-flex is-justify-content-space-between"
      style="align-items: center"
    >
      <h2 style:margin="0" style:font-size="1.6rem">Questions?</h2>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={deleteAllQs}>
        <i
          class="fa fa-trash fa-2xl"
          style="color: white;"
          aria-hidden="true"
        />
      </a>
    </div>
  </div>

  <div nice-scroll style:padding="1rem " style:overflow-y="auto">
    {#each $chatStore.questions as question}
      <svelte:component
        this={__getCmp(question)}
        {question}
        form={false}
      />
      <Actions {question} />
      <br />
    {/each}
  </div>
</section>
