<svelte:options tag="tf-chat" />

<script lang="ts">
  import chatStore from "../store/chatStore";
</script>

{#if $chatStore.open}
  <button on:click={() => ($chatStore.open = false)}>close</button>
{/if}
