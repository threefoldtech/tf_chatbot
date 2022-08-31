<svelte:options tag="tf-answer-btn" />

<script lang="ts">
  export let text: string;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let selected: boolean = false;
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
