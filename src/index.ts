import { Lightning } from "@lightningjs/sdk";
import { getApp } from "./App";
import { getAppData } from "./AppData";
import { getAppSettings } from "./AppSettings";
import { Launch } from "./Launch";
import { getPlatformSettings } from "./PlatformSettings";

export default Launch(
  // App
  getApp(),
  // AppSettings
  getAppSettings(),
  // PlatformSettings
  getPlatformSettings(),
  // AppData
  getAppData()
) satisfies Lightning.Application<
  Lightning.Application.TemplateSpec,
  Lightning.Application.TypeConfig
>;
