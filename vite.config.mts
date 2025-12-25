/// <reference types="vitest/config" />
import { name, version } from "#package.json";
import { defineConfig, loadEnv, UserConfig } from "vite";
import { freezeObject } from "./lib/utils";
// import { resolveJuceJsDir } from './scripts/vite/resolveJuceJsDir.mjs';
import { config as testConfig } from "./test/config";

const config = defineConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ command, mode, isSsrBuild, isPreview }) => {
    if(isSsrBuild) throw new Error("SSR builds not supported on device");

    const env = loadEnv(mode, process.cwd(), "");

    // const juceJsDir = await resolveJuceJsDir(); // throws with a helpful message if not found

    const define = {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
      __NODE_ENV__: JSON.stringify(env['NODE_ENV'])
    }

    const sharedOptions = freezeObject<UserConfig>({
      root: process.cwd(),
      base: "/",
      publicDir: "public",
      appType: "spa",
      define: define,
      test: testConfig,
      resolve: {
        alias: {
          // 'juce-framework-frontend': juceJsDir
        },
      },
      build: {
        rollupOptions: {
          onwarn: (warning, warn) => {
            // suppress eval warnings (juce-framework-frontend/check_native_interop.js)
            const is_check_native_interop = warning.message.includes("check_native_interop.js");
            const is_juce_gui_extra = warning.message.includes("juce_gui_extra");
            const is_eval = warning.code === 'EVAL';
            if(is_juce_gui_extra && is_check_native_interop && is_eval) return;
            warn(warning);
          }
        }
      }
    });

    const options = {
      development: freezeObject<UserConfig>({}),
      production: freezeObject<UserConfig>({})
    }

    switch (command) {
      case "serve": {
        return {
          mode: "development",
          ...sharedOptions,
          ...options.development,
        } satisfies UserConfig;
      }
      case "build":
      default: {
        return {
          mode: "production",
          ...sharedOptions,
          ...options.production,
        } satisfies UserConfig;
      }
    }
  }
);

export default config;
