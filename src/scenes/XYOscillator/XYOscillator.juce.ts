import {
  juceSliderEndpoint,
  juceToggleEndpoint,
} from "../../Services/AudioSM/JUCEAudioSM/endpoints/juceEndpoints";
import type { SceneFactory } from "../types";
import { Controls } from "./Controls";

export const createDebugToneSceneJuce: SceneFactory = (ctx) => {
  ctx.register(
    Controls.Freq,
    juceSliderEndpoint(ctx.keyOf(Controls.Freq), (v) =>
      ctx.emit(Controls.Freq, v)
    )
  );
  ctx.register(
    Controls.Gain,
    juceSliderEndpoint(ctx.keyOf(Controls.Gain), (v) =>
      ctx.emit(Controls.Gain, v)
    )
  );
  ctx.register(
    Controls.Wave,
    juceToggleEndpoint(ctx.keyOf(Controls.Wave), (v) =>
      ctx.emit(Controls.Wave, v)
    )
  );

  return {
    dispose() {
      // endpoints dispose via AudioSM.dispose() clearing endpoints,
      // but if we ever add explicit unregister later, it will go here.
    },
  };
};
