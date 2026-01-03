import {
  juceSliderEndpoint,
  juceToggleEndpoint,
} from "../../Services/AudioSM/JUCEAudioSM/endpoints/juceEndpoints";
import type { SceneFactory } from "../types";
import { Controls } from "./Controls";

export const createDebugToneSceneJuce: SceneFactory = (ctx) => {
  ctx.register(
    Controls.Mute,
    juceToggleEndpoint(ctx.keyOf(Controls.Mute), (v) =>
      ctx.emit(Controls.Mute, v)
    )
  );
  ctx.register(
    Controls.Master,
    juceSliderEndpoint(ctx.keyOf(Controls.Master), (v) =>
      ctx.emit(Controls.Master, v)
    )
  );

  return {
    dispose() {
      // endpoints dispose via AudioSM.dispose() clearing endpoints,
      // but if we ever add explicit unregister later, it will go here.
    },
  };
};
