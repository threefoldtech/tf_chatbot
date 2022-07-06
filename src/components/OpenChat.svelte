<svelte:options tag="tf-openchat" />

<script lang="ts">
  import chatStore from "../store/chatStore";

  function openChat() {
    $chatStore.open = true;
  }
</script>

<button
  on:click={openChat}
  style:width="60px"
  style:height="60px"
  style:position="fixed"
  style:bottom="15px"
  style:right="15px"
  style:border-radius="50%"
  style:background-color="#1972F5"
  style:color="white"
  style:border="none"
  style:display="flex"
  style:justify-content="center"
  style:align-items="center"
  style:cursor="pointer"
  style:z-index="999"
>
  <i class="fa-solid fa-message" style:font-size="28px" />
</button>
