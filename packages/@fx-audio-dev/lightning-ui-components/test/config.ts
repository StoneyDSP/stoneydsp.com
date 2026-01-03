// /// <reference types="vitest/config" />
import { UserConfig } from "vite";
import { configDefaults, defaultExclude, defaultInclude } from "vitest/config";
import { SnapshotResolver } from "./SnapshotResolver";

export const config = Object.freeze<UserConfig["test"]>({
  ...configDefaults,
  // projects: [
  //   // you can use a list of glob patterns to define your projects
  //   // Vitest expects a list of config files
  //   // or directories where there is a config file
  //   'packages/*',
  //   'tests/*/vitest.config.{e2e,unit}.ts',
  // ],
  typecheck: {
    enabled: true,
  },
  deps: {
    interopDefault: true,
    moduleDirectories: ["node_modules"],
    optimizer: {
      client: {
        enabled: true,
        needsInterop: ["@jest/globals"],
        include: ["@fx-audio-dev/ui-components-vitest-utils"],
        exclude: ["@jest/globals"],
      },
    },
  },
  globals: true,
  setupFiles: [
    // 'test/canvas.ts',
    // "test/dom.ts",
    "vitest-webgl-canvas-mock",
  ],
  resolveSnapshotPath: SnapshotResolver.resolveSnapshotPath,
  environment: "jsdom",
  passWithNoTests: true,
  // ui: true,
  // reporters: ['default', 'html', "junit", "json"],
  include: [...defaultInclude],
  exclude: [
    "**/.{idea,git,cache,output,temp}/**",
    "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    //
    "**/.git/**",
    "**/.bak/**",
    "**/.tmp/**",
    "**/.vscode/**",
    "**/cypress/**",
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "**/out/**",
    ...defaultExclude,
  ],
  // outputFile: "junit",
  coverage: {
    include: ["src/**/*.{ts,cts,mts,tsx}"],
    exclude: ["lib/**/*.{ts,cts,mts,tsx}"],
    reportsDirectory: "coverage",
    enabled: true,
  },
});
