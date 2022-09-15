<svelte:options tag="tf-chatlogs" />

<script lang="ts">
  import chatStore from "../../store/chatStore";
  import snarkdown from "snarkdown";

  function closeChat() {
    $chatStore.open = false;
    document.querySelector("html").style.overflow = null;
  }

  function deleteLog(log) {
    chatStore.deleteLog(log);
  }

  const getLog = (log) => {
    if (typeof log.content === "string") return log.content
    if (log.type == "error") return log.content

    /*
      @TODO: pretty print json object
    */
    if (typeof log.content === "object") return JSON.stringify(log.content, null, 4);

    return log
  };
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
      <div class="container" style="word-wrap: break-word;">
        {#if log.type == "error"}
          <div class="notification is-danger is-light">
            {getLog(log)}
          </div>
        {:else if log.type == "success"}
          <div class="notification is-primary is-light">
            {getLog(log)}
          </div>
        {:else}
          <div class="notification is-info is-light ">
            {getLog(log)}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
