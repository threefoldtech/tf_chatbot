<svelte:options tag="tf-question-input" />

<script lang="ts">
  import type { IQuestion } from "../../types/questions";
  import { isBool } from "../../utils/isBool";
  import { ChatServer } from "../../services/chatServer";

  export let question: IQuestion;
  let answer: any = null;
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

  function onAnswer() {
    ChatServer.answerQuestion(question, answer);
    answered = true;
  }
</script>

{#if question}
  <div>
    <p>{question.descr}</p>

    <form on:submit|preventDefault={onAnswer}>
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

      {#if !answered}
        <div class="is-flex is-justify-content-end">
          <button
            type="submit"
            class="button is-primary is-light"
            disabled={answer === null || !isValid(answer)}
          >
            Submit
          </button>
        </div>
      {/if}
    </form>
  </div>
{/if}
