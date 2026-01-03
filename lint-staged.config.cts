import type { Configuration } from "lint-staged";

module.exports = {
  "**/*.{js,mjs,cjs}": ["eslint"],
  "**/*.{ts,mts,cts}": ["eslint"],
  "**/*.d.{js,mjs,cjs}": ["eslint"],
  "**/*.d.{ts,mts,cts}": ["eslint"],
  "**/*.{json,jsonc,json5}": ["eslint"],
  "**/*.html": ["eslint"],
  "**/*.md": ["eslint"],
} satisfies Configuration;
