import type { PlatformSettings } from "@lightningjs/sdk";
import { __DEV__ } from "./CONSTS";

export const platformSettings = {
  // esEnv: "es5",
  path: "./static",
  // showFps: __DEV__,
  // showVersion: __DEV__,
  log: __DEV__,
  // inspector: __DEV__,
} satisfies PlatformSettings;

export function getPlatformSettings(): PlatformSettings {
  return platformSettings;
}
