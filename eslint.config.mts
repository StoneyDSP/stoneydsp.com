import { default as css } from "@eslint/css";
import { default as js } from "@eslint/js";
import { default as json } from "@eslint/json";
import { default as markdown } from "@eslint/markdown";
// import { default as html } from "@html-eslint/eslint-plugin";
import { default as prettier } from "eslint-config-prettier/flat";
// import { default as yaml } from "eslint-plugin-yaml";
import { defineConfig, globalIgnores } from "eslint/config";
import { default as globals } from "globals";
import { default as tseslint } from "typescript-eslint";

const project = defineConfig([
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

const config = defineConfig([
  {
    files: [
      "**/*.{js,mjs,cjs}",
      "**/*.d.{js,mjs,cjs}",
      "**/*.{ts,mts,cts}",
      "**/*.d.{ts,mts,cts}",
    ],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  // {
  //     files: ["**/*.html"],
  //     plugins: {
  //         html,
  //     },
  //     language: "html/html",
  //     rules: {
  //         "html/no-duplicate-class": "error",
  //     }
  // },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  // yaml.configs.recommended,
  project,
  prettier,
  globalIgnores([
    ".bak",
    ".tmp",
    ".vscode",
    "node_modules",
    "build",
    "dist",
    "out",
    "vcpkg_installed",
    "packages",
    "native",
    "vendors",
  ]),
]);

export default config;
