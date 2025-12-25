import { version } from "#package.json";
import { defineConfig, loadEnv, UserConfig } from "vite";
import { config as testConfig } from "./test/config";

export function loadEnvWithDefaults(
  mode: string = "development",
  envDir: string | false,
  prefixes?: string | string[] | undefined
) {
  return loadEnv(mode, envDir ?? process.cwd(), prefixes ?? "");
}

export function getEnv() {
  return defineConfig(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ command, mode }) => {

      const env = loadEnvWithDefaults(mode, process.cwd(), "");

      return Object.freeze<UserConfig>({
        root: process.cwd(),
        base: "/",
        publicDir: "public",
        appType: "spa",
        define: {
          __APP_VERSION__: JSON.stringify(version),
          __NODE_ENV__: JSON.stringify(env['NODE_ENV'])
        },
        test: testConfig
      });
  })
}
