import { writable } from "svelte/store";

interface ChatStore {
  open: boolean;
}

function createChatStore() {
  const store = writable<ChatStore>({
    open: true,
  });

  return store;
}

export default createChatStore();
