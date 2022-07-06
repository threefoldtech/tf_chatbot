<svelte:options tag="tf-chatlogs" />

<script lang="ts">
  import chatStore from "../../store/chatStore";

  function closeChat() {
    $chatStore.open = false;
  }
</script>

<section
  style:height="100%"
  style:width="50%"
  style:border-left="1px solid rgba(0, 74, 181, 0.175)"
>
  <div
    style:background="linear-gradient(125deg, #1972F5 -10%, #004AB5 100%)"
    style:font-size="12px"
    style:color="white"
    style:padding="15px"
    style:display="flex"
    style:justify-content="space-between"
    style:align-items="center"
  >
    <h2 style:margin="0">Logs!</h2>
    <i
      on:click={closeChat}
      class="fa-solid fa-xmark"
      style:font-size="15px"
      style:cursor="pointer"
    />
  </div>
</section>
