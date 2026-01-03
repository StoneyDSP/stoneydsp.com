import type { AppData } from "@lightningjs/sdk";
import { bootstrapContainer, Container } from "./Container";
import { EventBus } from "./Events";
import { JUCEAudioSM } from "./Services/AudioSM/JUCEAudioSM/JUCEAudioSM";
import { WebAudioSM } from "./Services/AudioSM/WebAudioSM/WebAudioSM";
import { isJuceBackendAvailable } from "./lib/isJuceBackendAvailable";
import { DebugToneManifest } from "./scenes/DebugTone/manifest";

const defaultSceneManifest = DebugToneManifest;

export const appData: AppData = {
  container: bootstrapContainer((c) => {
    /// -------------------------------------------------------------- EventBus
    c.bind({
      token: Container.Token.EventBus,
      method: new EventBus({
        dbg: true,
      }),
    });
    /// --------------------------------------------------------------- AudioSM
    c.bind({
      token: Container.Token.AudioSM,
      method: isJuceBackendAvailable()
        ? new JUCEAudioSM({
            defaultSceneManifest: defaultSceneManifest,
            dbg: true,
          })
        : new WebAudioSM({
            defaultSceneManifest: defaultSceneManifest,
            startMuted: true,
            dbg: true,
          }),
    });
  }),
} satisfies AppData;

export function getAppData(): AppData {
  return appData;
}
