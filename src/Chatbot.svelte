<svelte:options tag="tf-chatbot" />

<script lang="ts">
  import { onMount } from "svelte";
  import store from "./store/chatStore";

  import Chat from "./components/Chat.svelte";
  import OpenChat from "./components/OpenChat.svelte";
  import { load_profile_from_config } from "./utils/handlers";
  import { init_welcome_msg, load_profile_question } from "./utils/questions";
  import {
    input_question_example,
    yn_question_example,
    choices_question_example,
  } from "./utils/questions_examples";

  onMount(async () => {
    fetch("http://localhost:5001/profile_config")
      .then((res) => res.json())
      .then((res) => {
        const config = JSON.parse(res);
        console.log("Configs are loaded.");
        load_profile_from_config(config);
        store.update((store) => {
          store.questions = [init_welcome_msg];
          store.initQuestions = [init_welcome_msg];

          return store;
        });
      })
      .catch(() => {
        console.log("Couldn't find configs.");
        store.update((store) => {
          store.questions = [load_profile_question];
          store.initQuestions = [load_profile_question];
          return store;
        });
      });
  });
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
