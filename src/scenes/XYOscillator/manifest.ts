import type { SceneManifest } from "../types";
import { createDebugToneSceneJuce } from "./XYOscillator.juce";

export const DebugToneManifest: SceneManifest = {
  id: "xyOscillator",
  title: "XY Oscillator",
  description: "A simple oscillator you can control using X/Y controls.",
  viewKind: "genericControls",
  controls: [
    {
      id: "freq",
      label: "Freq",
      kind: "slider",
      address: {
        namespace: "osc",
        key: "freq",
      },
      default: 0.5,
      step: 0.01,
    },
    {
      id: "gain",
      label: "Gain",
      kind: "slider",
      address: {
        namespace: "osc",
        key: "gain",
      },
      default: 1.0,
      step: 0.1,
    },
    {
      id: "wave",
      label: "Wave",
      kind: "combo",
      address: {
        namespace: "osc",
        key: "wave",
      },
      choices: [
        {
          id: "sin",
          label: "Sin",
        },
        {
          id: "tri",
          label: "Tri",
        },
        {
          id: "pls",
          label: "Pls",
        },
        {
          id: "saw",
          label: "Saw",
        },
      ],
    },
  ],
  // createWeb: createDebugToneSceneWeb,
  createJuce: createDebugToneSceneJuce,
};
