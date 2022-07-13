<svelte:options tag="tf-chatlogs" />

<script lang="ts">
  import chatStore from "../../store/chatStore";

  function closeChat() {
    $chatStore.open = false;
    document.querySelector("html").style.overflow = null;
  }
</script>

<section
  style:height="100%"
  style:width="50%"
  style:border-left="1px solid rgba(0, 74, 181, 0.175)"
  style:display="flex"
  style:flex-direction="column"
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
    <h2 style:margin="0" style:font-size="1.6rem">Logs!</h2>
    <div>
      {#if $chatStore.connected}
        <span class="tag is-success is-normal">Connected</span>
      {:else}
        <span class="tag is-danger is-normal">
          Connecting <i class="ml-1 fas fa-spinner fa-pulse" />
        </span>
      {/if}
      <i
        on:click={closeChat}
        class="ml-2 fa-solid fa-xmark"
        style:font-size="15px"
        style:cursor="pointer"
      />
    </div>
  </div>

  <div nice-scroll style:padding="1rem " style:overflow-y="auto">
    {#each $chatStore.logs as log}
      <p>{log}</p>
    {/each}
    <p style:white-space="pre-wrap">
      Questions {JSON.stringify($chatStore.questions, undefined, 4)}
    </p>
  </div>
</section>
