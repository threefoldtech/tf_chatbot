import { assign } from "./utils";
import { getGrid } from "./getGrid";
import chatStore from "../store/chatStore";

export async function load_profile(options: any) {
  let data = assign(options);
  console.log({ profile_data: data });

  let gridClient = await getGrid(data["net"], data["mne"], data["secret"]);

  chatStore.update((store) => {
    store.grid = gridClient;
    return store;
  });
}
