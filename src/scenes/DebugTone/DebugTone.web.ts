import { Log } from "@lightningjs/sdk";
import type { WebAudioService } from "web-audio-api";
import { getSliderState, getToggleState } from "web-audio-api";
import type { SceneFactory } from "../types";
import { Controls } from "./Controls";
import { createDebugToneGraph } from "./DebugToneGraph";

export const createDebugToneSceneWeb: SceneFactory = (ctx) => {
  (window.__WEBAUDIO__ as WebAudioService).initialisationData = {
    __webaudio__toggles: [Controls.Mute, Controls.OscA.Mute],
    __webaudio__comboBoxes: [],
    __webaudio__sliders: [Controls.Master],
    __webaudio__functions: [],
    __webaudio__platform: [],
    __webaudio__registeredGlobalEventIds: [],
  };

  let disposed = false;

  const master = getSliderState(Controls.Master)!;

  const oscA = {
    mute: getToggleState(Controls.OscA.Mute)!,
  };

  const oscB = {
    mute: getToggleState(Controls.OscB.Mute)!,
  };

  // Optional: seed initial values once (or do this via manifest default application)
  master.setNormalisedValue(0.6);

  oscA.mute.setValue(true); // only if you want to force a default here
  oscB.mute.setValue(true); // only if you want to force a default here

  let graphP: ReturnType<typeof createDebugToneGraph> | null = null;

  async function ensureGraph() {
    if (!graphP) graphP = createDebugToneGraph();
    return graphP;
  }

  async function applyToGraph() {
    const graph = await ensureGraph();
    const vol = Number(master.getNormalisedValue());

    graph.master.gain.value = vol;
  }

  ctx.register(Controls.OscA.Mute, {
    get: () => oscA.mute.getValue(),
    set: async (v) => {
      const graph = await ensureGraph();
      const muteOn = Boolean(v);

      oscA.mute.setValue(muteOn);
      graph.oscAGain.gain.value = oscA.mute.getValue()
        ? 0
        : master.getNormalisedValue();
      ctx.emit(Controls.OscA.Mute, oscA.mute.getValue());
      Log.warn("OscA.Mute", v);
    },
  });

  ctx.register(Controls.OscB.Mute, {
    get: () => oscB.mute.getValue(),
    set: async (v) => {
      const graph = await ensureGraph();
      const muteOn = Boolean(v);

      oscB.mute.setValue(muteOn);
      graph.oscBGain.gain.value = oscB.mute.getValue()
        ? 0
        : master.getNormalisedValue();
      ctx.emit(Controls.OscB.Mute, oscB.mute.getValue());
      Log.warn("OscB.Mute", v);
    },
  });

  ctx.register(Controls.Master, {
    get: () => master.getNormalisedValue(),
    set: async (v) => {
      const graph = await ensureGraph();
      const volume =
        typeof v === "number"
          ? Math.max(0, Math.min(1, v))
          : master.getNormalisedValue();
      graph.master.gain.value = volume;
      master.setNormalisedValue(volume);
      ctx.emit(Controls.Master, master.getNormalisedValue());
      Log.warn("Master", v);
    },
  });

  // Apply once on load (covers initial state)
  void applyToGraph();

  // If we want it to start silent-by-default in browser:
  ctx.emit(Controls.Master, master.getNormalisedValue());
  ctx.emit(Controls.OscA.Mute, oscA.mute.getValue());
  ctx.emit(Controls.OscB.Mute, oscB.mute.getValue());

  return {
    dispose() {
      disposed = true;
      void disposed; // just to keep TS quiet if linting `unused`
      if (!graphP) return;

      // Best-effort cleanup
      graphP.then((g) => g.dispose?.()).catch(() => {});
      graphP = null;
    },
  };
};
