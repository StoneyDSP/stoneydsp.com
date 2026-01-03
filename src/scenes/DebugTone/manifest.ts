import type { SceneManifest } from "../types";
import { createDebugToneSceneJuce } from "./DebugTone.juce";
import { createDebugToneSceneWeb } from "./DebugTone.web";

export const DebugToneManifest: SceneManifest = {
  id: "debugTone",
  title: "Debug Tone",
  description:
    "A simple oscillator you can mute/unmute and adjust master level.",
  viewKind: "genericControls",
  controls: [
    {
      id: "osc_a_mute",
      kind: "toggle",
      label: "OSC A",
      address: {
        namespace: "osc_a",
        key: "mute",
      },
      // address: "global:mute",
      default: true,
    },
    {
      id: "osc_b_mute",
      kind: "toggle",
      label: "OSC B",
      address: {
        namespace: "osc_b",
        key: "mute",
      },
      // address: "global:mute",
      default: true,
    },
    {
      id: "master",
      kind: "slider",
      label: "Master",
      address: "global:master",
      default: 0.6,
      step: 0.01,
    },
    // {
    //   id: "oscA",
    //   kind: "toggle",
    //   label: "OSC A",
    //   address: "osc_a:mute",
    //   default: true,
    // },
    // {
    //   id: "oscB",
    //   kind: "toggle",
    //   label: "OSC B",
    //   address: "osc_b:mute",
    //   default: true,
    // },
  ],
  createWeb: createDebugToneSceneWeb,
  createJuce: createDebugToneSceneJuce,
};
