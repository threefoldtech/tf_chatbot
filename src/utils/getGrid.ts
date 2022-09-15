import { HTTPMessageBusClient } from "ts-rmb-http-client";
import {
  GridClient,
  NetworkEnv,
  BackendStorageType,
  KeypairType,
} from "grid3_client";



export async function getGrid(net: string, mnemonic: string, secret: string) {
  const RMB = new HTTPMessageBusClient(0, "", "", "");
  const grid = new GridClient(
    NetworkEnv[net],
    mnemonic,
    secret,
    RMB,
    undefined,
    BackendStorageType.auto,
    KeypairType.sr25519
  );

  return grid.connect().then(() => grid);
}