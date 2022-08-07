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

  // const getLog = (log) => {
  //   const data = JSON.parse(log.data);
  //   console.log(data);
  //   if (typeof data === "string") {
  //     console.log("isStirng");
  //     return data;
  //   } else {
  //     console.log("else");
  //     let logs = "";
  //     for (let query of data) {
  //       logs += `${Object.keys(query)} ${Object.values(query)}\n`;
  //     }
  //     return logs;
  //   }
  // };

  const getLog = (log) => {
    console.log(typeof log[1]);
    console.log(log[1]);
    if (typeof log[1] === "string") return snarkdown(`${log[1]}`);
    return JSON.stringify(log[1]);
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
      <div
        style="align-items: center"
        class="is-flex is-justify-content-space-between	"
      >
        <!-- comment for now. todo better parsing. -->
        <!-- {@html snarkdown(JSON.parse(JSON.parse(log.data)))} -->
        <!-- {console.log(Object.values(JSON.parse(log.data)))} -->

        <!-- {@html snarkdown(`${Object.values(JSON.parse(log.data))}`)} -->
        {#each Object.entries(JSON.parse(log.data)) as data}
          <div class="is-flex is-justify-content-flex-start	">
            <br />
            {@html getLog(data)}
          </div>
        {/each}

        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => deleteLog(log)}>
          <i
            class="fa fa-trash fa-2xl"
            style="color: black;"
            aria-hidden="true"
          />
        </a>
      </div>
      <br />
    {/each}
  </div>
</section>
