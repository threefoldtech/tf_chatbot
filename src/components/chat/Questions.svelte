<svelte:options tag="tf-chat-questions" />

<script lang="ts">
  import chatStore from "../../store/chatStore";
  import type { Questions } from "../../types/questions";

  import QuestionChoice from "../questions/QuestionChoice.svelte";
  import QuestionYn from "../questions/QuestionYn.svelte";
  import QuestionInput from "../questions/QuestionInput.svelte";
  import QuestionDropdown from "../questions/QuestionDropdown.svelte";
  import QuestionDate from "../questions/QuestionDate.svelte";
  import QuestionForm from "../questions/QuestionForm.svelte";
  import Actions from "../Actions.svelte";

  import snarkdown from "snarkdown";

  function __getCmp({ type }: Questions) {
    if (type === "yn") return QuestionYn;
    if (type === "question_choice") return QuestionChoice;
    if (type === "question") return QuestionInput;
    if (type === "question_dropdown") return QuestionDropdown;
    if (type === "q-date") return QuestionDate;
    if (type === "question_form") return QuestionForm;
  }

  const deleteAllQs = () => {
    chatStore.cleanStore();
  };

  const deleteSelected = (questionId) => {
    chatStore.deleteQuestion(questionId);
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
      <div class="card">
        <div class="card-content">
          <div class="content">
            {question.id}
            <svelte:component this={__getCmp(question)} {question} />
          </div>
        </div>

        <footer class="card-footer">
          <!-- <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a> -->
          <Actions {question} />
        </footer>
      </div>
      <br />
    {/each}
  </div>
</section>
