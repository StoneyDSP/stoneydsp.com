import { pickSceneFactory } from "../../../scenes/selectEngine";
import type { SceneManifest } from "../../../scenes/types";
import { AudioSM } from "../AudioSM";
import { registerEndpointsFromControls } from "../registerEndpointsFromControls";
import { createJuceEndpointFactories } from "./endpoints/JUCEEndpointFactories";

const DEFAULTS = {
  params: {
    dbg: false,
  },
};

class JUCEAudioSM<Params extends JUCEAudioSM.Params = JUCEAudioSM.Params>
  extends AudioSM<Params>
  implements AudioSM<JUCEAudioSM.Params>
{
  constructor(params: Params) {
    super({ ...DEFAULTS.params, ...params });
    this.loadGlobals(this.params.defaultGlobals);
    this.loadManifest(
      this.params.defaultSceneManifest,
      pickSceneFactory(this.params.defaultSceneManifest)
    );
  }

  protected override registerManifestControls(manifest: SceneManifest): void {
    registerEndpointsFromControls(
      manifest.controls ?? [],
      (addr, ep) => this.register(addr, ep),
      createJuceEndpointFactories((addr, v) => this.emit(addr, v))
    );
  }
}

namespace JUCEAudioSM {
  export type Params = AudioSM.Params;
}

export { JUCEAudioSM as default, JUCEAudioSM };
