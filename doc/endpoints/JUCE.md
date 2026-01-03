# Endpoints - JUCE

Given the desired controller manifest:

```ts
export const Controls = {
  Mute: "channel:mute",     /// <-- ToggleButton
  Volume: "channel:volume", /// <-- Slider
  Pan: "channel:pan",       /// <-- Slider
  PanLaw: "channel:panlaw", /// <-- ComboBox
  // etc...
} as const;
```

We create a hook to set up the "scene"; use the function body to register the `Controls` addresses using the desired endpoint "type" for each address in the manifest:

```ts
import { Controls } from "./Controls";
import {
  juceComboBoxEndpoint,
  juceToggleEndpoint,
  juceSliderEndpoint
} from "../Services/AudioSM/JuceAudioSM";

export const createDebugToneSceneJuce: SceneFactory = (ctx) => {
  /// Mute --> ToggleButton
  ctx.register(
    Controls.Mute,
    juceToggleEndpoint(ctx.keyOf(Controls.Mute), (v) =>
      ctx.emit(Controls.Mute, v)
    )
  );
  /// Volume --> Slider
  ctx.register(
    Controls.Volume,
    juceSliderEndpoint(ctx.keyOf(Controls.Volume), (v) =>
      ctx.emit(Controls.Volume, v)
    )
  );
  /// Pan --> Slider
  ctx.register(
    Controls.Pan,
    juceSliderEndpoint(ctx.keyOf(Controls.Pan), (v) =>
      ctx.emit(Controls.Pan, v)
    )
  );
  /// PanLaw --> ComboBox
  ctx.register(
    Controls.PanLaw,
    juceComboBoxEndpoint(ctx.keyOf(Controls.PanLaw), (v) =>
      ctx.emit(Controls.PanLaw, v)
    )
  );
  // etc...
  return {
    dispose() {
      // endpoints dispose via AudioSM.dispose() clearing endpoints (for now),
      // but if we ever add explicit unregister later, it will go here.
    },
  };
};
```

Supply your hook to a `SceneManifest` object; these "scene" objects are (dynamically) loadable by the `AudioSM` engine!

The manifest dictates your scene to _all_ `AudioSM` engines generically; for your scene to be supported by a given platform, you just need to create a "scene" hook - _see the previous step_ - using that engine's controller endpoints; for JUCE (native) support, that is `juceToggleButtonEndpoint()`, `juceSliderEndpoint()`, and `juceComboBoxEndpoint()`.

In your `SceneManifest` obect, register your "scene" hook for each platform, to enable support:

```ts
import type { SceneManifest } from "../types";
import { createDebugToneSceneJuce } from "./DebugTone.juce";

export const DebugToneManifest: SceneManifest = {
  id: "debugTone",
  title: "Debug Tone",
  description:
    "A simple oscillator you can mute/unmute and adjust master level.",
  viewKind: "custom",              // <-- use "custom" for your scene's custom parameters (for now)
  controls: [
    {
      id: "mute",
      kind: "toggle",              // <-- choose from "toggle", "slider", "combobox"
      label: "Mute",               // <-- will be rendered on the UI
      address: "channel:mute",     // <-- address to use (must be unique)
      default: true,               // <-- default value to use when scene is loaded
    },
    {
      id: "volume",
      kind: "slider",
      label: "Volume",
      address: "channel:volume",
      default: 1.0,                // <-- use [0..1] mapping (for now)
      step: 0.01,
    },
    {
      id: "pan",
      kind: "slider",
      label: "Pan",
      address: "channel:pane",
      default: 0.5,
      step: 0.01,
    },
    {
      id: "law",
      kind: "combobox",
      label: "Pan",
      address: "channel:panlaw",
      default: 0.5,
      choices: [                   // <-- create array entries with 'id' and 'label' each
        {
          id: "lin",
          label: "0db"
        },
        {
          id: "log",
          label: "-6.02db"
        },
        {
          id: "bal",
          label: "-4.5db"
        }
      ]
    },
  ],
  createJuce: createDebugToneSceneJuce,
  // createWebManifest: createDebugToneSceneWeb, // etc...
};
```

As mentioned, the `SceneManifest` object describes your scene for _all_ engines: native, web, and beyond.

Therefore, it can be loaded by _any_ `*AudioSM` engine, so long as you provided a "scene" hook for that platform in your manifest.

To do so; simply bind the `SceneManifest` to the `AudioSM`:

```ts
import { DebugToneManifest } from "./scenes/DebugTone/manifest";

const defaultSceneManifest = DebugToneManifest;            // <-- default scene to be loaded

export const appData: AppData = {
  container: bootstrapContainer((c) => {
    ///-------------------------------------------------- Audio Service Manager
    c.bind({
      token: Container.Token.AudioSM,
      method: isJuceBackendAvailable()                     // <-- toggle engines/platforms however preferred...
        ?
          new JUCEAudioSM({                                // <-- "native" engine
            defaultSceneManifest: defaultSceneManifest,    // <-- your manifest
            dbg: true,                                     // <-- engine-specific options...
          })
        :
          new WebAudioSM({                                 // <-- "browser" engine
            defaultSceneManifest: defaultSceneManifest,    // <-- your manifest
            startMuted: true,                              // <-- engine-specific options...
            dbg: true,
          }),
    });
    ///---------------------------------------------- Other Service Managers...
  }),
} satisfies AppData;

export function getAppData(): AppData {
  return appData;
}
```

_NOTE_ that only _one_ manifest object was used; all engines should share the _same `SceneManifest` for a scene, to ensure consistent support across all platforms.

To target more platforms, new `*AudioSM` sub-classes can be created which wrap the required bindings (details will vary greatly by platform; use the `*AudioSM` class as the place to normalize the bindings interface).

To drop support for any platform, you may simply remove the relevant `*AudioSM` constructor from the `AppData.container` object, and scene hooks from the manifest.

Start the app to load the scene!

---
