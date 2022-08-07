<svelte:options tag="tf-answer-btn" />

<script lang="ts">
  export let text: string;
  export let disabled: boolean;
  export let readonly: boolean;
  export let selected: boolean;
</script>

<button
  class="button is-link mt-1 mb-1 mr-1"
  class:is-outlined={!selected}
  style:white-space="initial"
  style:height="auto"
  style:text-align="left"
  {disabled}
  {readonly}
  on:click
>
  {text}
</button>
