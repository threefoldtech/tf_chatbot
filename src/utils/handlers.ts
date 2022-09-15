import { assign } from "./utils";
import { getGrid } from "./getGrid";
import chatStore from "../store/chatStore";

export async function load_profile(options: any) {
  // let data = assign(options);
  console.log({ profile_data: options });

  let gridClient = await getGrid(options["net"], options["mne"], options["mne"]);

  chatStore.update((store) => {
    store.grid = gridClient;
    return store;
  });
}

export async function load_profile_from_config(config: any) {
  let gridClient = await getGrid(
    config["net"],
    config["mne"],
    config["mne"]
  );

  chatStore.update((store) => {
    store.grid = gridClient;
    return store;
  });
}
