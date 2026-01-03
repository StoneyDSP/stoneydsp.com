import { bootstrapWebAudioBackend } from "web-audio-api";
import { isJuceBackendAvailable } from "../lib/isJuceBackendAvailable";
import type { SceneManifest } from "./types";

export function pickSceneFactory(manifest: SceneManifest) {
  const juce = isJuceBackendAvailable();
  if (juce) return manifest.createJuce;
  bootstrapWebAudioBackend();
  return manifest.createWeb;
}

export function pickEngineLabel() {
  return isJuceBackendAvailable() ? "juce" : "web";
}
