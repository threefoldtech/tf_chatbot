import { writable } from "svelte/store";

interface ChatStore {
  open: boolean;
}

function createChatStore() {
  const store = writable<ChatStore>({
    open: false,
  });

  return store;
}

export default createChatStore();
