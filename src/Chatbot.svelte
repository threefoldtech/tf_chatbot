<svelte:options tag="tf-chatbot" />

<script lang="ts">
  import Chat from "./components/Chat.svelte";
  import OpenChat from "./components/OpenChat.svelte";
</script>

<section style:font-family="sans-serif">
  <Chat />
  <OpenChat />
</section>

<style lang="scss" scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
</style>
