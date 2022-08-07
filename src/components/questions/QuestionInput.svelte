<svelte:options tag="tf-question-input" />

<script lang="ts">
  import type { IQuestion } from "../../types/questions";
  import { isBool } from "../../utils/isBool";
  import { ChatServer } from "../../services/chatServer";
  import snarkdown from "snarkdown";

  import chatStore from "../../store/chatStore";

  export let question: IQuestion;
  export let form: boolean = false;

  let answer: any = undefined;
  let answered = false;

  function isValid(answer: any) {
    /* not touched yet! */
    if (answer === null) return true;

    if (question.returntype === "string") {
      const r = new RegExp(question.regex);
      return typeof answer === "string" && r.test(answer);
    }

    if (question.returntype === "bool") {
      return isBool(answer);
    }

    const _answer = +answer;
    return (
      typeof _answer === "number" &&
      !isNaN(_answer) &&
      _answer >= question.min &&
      _answer <= question.max
    );
  }

  function getErrorMsg() {
    if (question.returntype === "string") return question.regex_errormsg;
    return "Invalid input value";
  }

  $: {
    if (form && answer !== undefined) {
      updateAnswer();
    }
  }

  const updateAnswer = () => {
    chatStore.update((oldStore) => {
      oldStore.currentAnswer[question.id] = answer;
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

        <div class="field">
          <div class="control">
            {#if question.returntype === "string"}
              <input
                class="input"
                type="text"
                placeholder={question.descr}
                bind:value={answer}
                readonly={answered}
              />
            {:else if question.returntype === "bool"}
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  value={true}
                  bind:group={answer}
                  readonly={answered}
                  disabled={answered}
                />
                Yes
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  value={false}
                  bind:group={answer}
                  readonly={answered}
                  disabled={answered}
                />
                No
              </label>
            {:else}
              <input
                class="input"
                type="number"
                placeholder={question.descr}
                bind:value={answer}
                readonly={answered}
              />
            {/if}
          </div>

          {#if !isValid(answer)}
            <p class="help is-danger">{getErrorMsg()}</p>
          {/if}
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
