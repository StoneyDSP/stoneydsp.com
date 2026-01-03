import { bootstrapWebAudioBackend } from "web-audio-api";
import { pickSceneFactory } from "../../../scenes/selectEngine";
import type { SceneManifest } from "../../../scenes/types";
import { AudioSM } from "../AudioSM";
import { registerEndpointsFromControls } from "../registerEndpointsFromControls";
import { createWebEndpointFactories } from "./endpoints/WebAudioEndpointFactories";

const DEFAULTS = {
  params: {
    dbg: false,
  },
};

class WebAudioSM<Params extends WebAudioSM.Params = WebAudioSM.Params>
  extends AudioSM<Params>
  implements AudioSM<WebAudioSM.Params>
{
  constructor(params: Params) {
    super({ ...DEFAULTS.params, ...params });
    bootstrapWebAudioBackend(); // ensure window.__WEBAUDIO__ + backend exists
    // this.loadGlobals(this.params.defaultGlobals);
    this.loadManifest(
      this.params.defaultSceneManifest,
      pickSceneFactory(this.params.defaultSceneManifest)
    );
  }

  protected override registerManifestControls(manifest: SceneManifest): void {
    registerEndpointsFromControls(
      manifest.controls ?? [],
      (addr, ep) => this.register(addr, ep),
      createWebEndpointFactories((addr, v) => this.emit(addr, v))
    );
  }
}

namespace WebAudioSM {
  export type Params = AudioSM.Params & {
    startMuted?: boolean;
  };
}

export { WebAudioSM as default, WebAudioSM };
