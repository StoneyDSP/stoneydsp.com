import { Lightning } from "@lightningjs/sdk";
import { getApp } from "./App";
import { getAppData } from "./AppData";
import { getAppSettings } from "./AppSettings";
import { Launch } from "./Launch";
import { getPlatformSettings } from "./PlatformSettings";

const app: Lightning.Application | null = Launch(
  getApp(),
  getAppSettings(),
  getPlatformSettings(),
  getAppData()
);

export { app };
