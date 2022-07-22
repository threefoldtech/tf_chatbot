<svelte:options tag="tf-chatbot" />

<script lang="ts">
  import Chat from "./components/Chat.svelte";
  import OpenChat from "./components/OpenChat.svelte";
</script>

<section
  style:font-family={'BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif'}
  style:color="#4a4a4a"
  style:font-size="1em"
  style:font-weight="400"
  style:line-height="1.5"
  >
  <!-- Start global css style for all components -->
  <style>
    [nice-scroll]::-webkit-scrollbar {
      width: 10px;
    }

    [nice-scroll]::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.05);
    }

    [nice-scroll]::-webkit-scrollbar-thumb {
      background-color: #999;
    }

    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 20.8px;
    }
    h4 {
      font-size: 16px;
    }
    h5 {
      font-size: 12.8px;
    }
    h6 {
      font-size: 11.2px;
    }
  </style>
  <!-- End global css style for all components -->

  <Chat />
  <OpenChat />
</section>

<style lang="scss" scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
