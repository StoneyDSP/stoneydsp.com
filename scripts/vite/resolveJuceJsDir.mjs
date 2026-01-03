import { glob } from "glob";
import fs from "node:fs/promises";
import path from "node:path";

export async function resolveJuceJsDir() {
  if (process.env.JUCE_JS_DIR) {
    const p = path.resolve(process.env.JUCE_JS_DIR);
    await fs.access(p);
    return p;
  }

  const pattern =
    "vcpkg_installed/*/include/JUCE-*/modules/juce_gui_extra/native/javascript";
  const matches = await glob(pattern, { nodir: false });

  if (!matches.length) {
    throw new Error(
      "Could not find JUCE frontend JS.\n" +
        "Expected under vcpkg_installed/*/include/JUCE-*/modules/juce_gui_extra/native/javascript\n" +
        "Make sure vcpkg has run before the Vite build, or set JUCE_JS_DIR=/absolute/path."
    );
  }

  // Deterministic pick (latest-ish by path)
  matches.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return path.resolve(matches.at(-1));
}
