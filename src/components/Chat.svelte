<svelte:options tag="tf-chat" />

<script lang="ts">
  import chatStore from "../store/chatStore";
  import ChatLogs from "./chat/Logs.svelte";
  import ChatQuestions from "./chat/Questions.svelte";
</script>

<section
  style:width="100vw"
  style:position="fixed"
  style:top="0"
  style:left="0"
  style:background-color="#f5f8fb"
  style:z-index="9999"
  style:height="100vh"
  style:display="flex"
  style:transition="opacity 0.4s, visibility 0.4s, transform 0.4s"
  style:opacity={$chatStore.open ? 1 : 0}
  style:visibility={$chatStore.open ? "visible" : "hidden"}
  style:pointer-events={$chatStore.open ? "all" : "none"}
  style:transform="translateY({$chatStore.open ? 0 : "15px"})"
>
  <ChatQuestions />
  <ChatLogs />
</section>
