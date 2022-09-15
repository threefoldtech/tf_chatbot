<svelte:options tag="tf-message" />

<script lang="ts">
  import type { IMessage } from "../../types/questions";
  import snarkdown from "snarkdown";

  export let question: IMessage;

</script>

{#if question}
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div>{@html snarkdown(question.message)}</div>
      </div>
    </div>
  </div>
{/if}
