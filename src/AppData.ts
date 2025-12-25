import type { AppData } from "@lightningjs/sdk";
import { bootstrapContainer } from "./container";

export const appData = {
  container: bootstrapContainer()
} satisfies AppData;

export function getAppData(): AppData {
  return appData;
}
