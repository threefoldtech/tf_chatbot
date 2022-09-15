import { v4 } from "uuid";

export function assign(indexedObject: Object) {
  let data = {};
  for (let query of Object.values(indexedObject)) {
    Object.assign(data, query);
  }
  return data;
}

export const getId = () => v4().split("-")[0];
