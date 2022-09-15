<svelte:options tag="tf-question-input" />

<script lang="ts">
  import type { IQuestion } from "../../types/questions";
  import snarkdown from "snarkdown";
  import { isBool } from "../../utils/validators";

  export let question: IQuestion;
  export let form: boolean = false;

  let answered = false;

  function invalid(answer: any) {
    /* not touched yet! */
    if (answer == "") return true;

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
</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
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
                bind:value={question.answer}
                readonly={answered}
              />
            {:else if question.returntype === "bool"}
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  value={true}
                  bind:group={question.answer}
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
                  bind:group={question.answer}
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
                bind:value={question.answer}
                readonly={answered}
              />
            {/if}
          </div>

          {#if invalid(question.answer)}
            <p class="help is-danger">{getErrorMsg()}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
