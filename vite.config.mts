/// <reference types="vitest/config" />
import { name, version } from "#package.json";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, UserConfig } from "vite";
import { freezeObject } from "./lib/utils";
import { resolveJuceJsDir } from "./scripts/vite/resolveJuceJsDir.mjs";
import { config as testConfig } from "./test/config";

const isWebBuild =
  process.env.BUILD_TARGET === "web" || process.env.GITLAB_PAGES === "true"; // GitLab sets this for Pages jobs

const config = defineConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ command, mode, isSsrBuild, isPreview }) => {
    if (isSsrBuild) throw new Error("SSR builds not supported on device");

    const env = loadEnv(mode, process.cwd(), "");

    let juceAlias: string;

    if (isWebBuild) {
      juceAlias = path.resolve("vendors/@types/juce-framework-frontend");
    } else {
      // native build: require JUCE to exist
      juceAlias = await resolveJuceJsDir();
      if (!fs.existsSync(juceAlias)) {
        throw new Error(`JUCE JS dir not found: ${juceAlias}`);
      }
    }

    const define = {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
      __NODE_ENV__: JSON.stringify(env["NODE_ENV"]),
    };

    const sharedOptions = freezeObject<UserConfig>({
      root: process.cwd(),
      base: "/",

      publicDir: "public",
      appType: "spa",
      define: define,
      test: testConfig,
      resolve: {
        alias: {
          "juce-framework-frontend": juceAlias,
        },
      },
      build: {
        rollupOptions: {
          output: {
            // stable names (no hashes)
            entryFileNames: "assets/[name].js",
            chunkFileNames: "assets/[name].js",
            assetFileNames: "assets/[name][extname]",
          },
          onwarn: (warning, warn) => {
            // suppress eval warnings (juce-framework-frontend/check_native_interop.js)
            const is_check_native_interop = warning.message.includes(
              "check_native_interop.js"
            );
            const is_juce_gui_extra =
              warning.message.includes("juce_gui_extra");
            const is_eval = warning.code === "EVAL";
            if (is_juce_gui_extra && is_check_native_interop && is_eval) return;
            warn(warning);
          },
        },
      },
    });

    const options = {
      development: freezeObject<UserConfig>({}),
      production: freezeObject<UserConfig>({}),
    };

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
