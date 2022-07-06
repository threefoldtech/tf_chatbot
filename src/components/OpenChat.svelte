<svelte:options tag="tf-openchat" />

<script lang="ts">
  import chatStore from "../store/chatStore";
</script>

<button on:click={() => ($chatStore.open = true)}> open </button>
