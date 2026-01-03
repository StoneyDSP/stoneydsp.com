# Graphs - WebAudio

Given the desired WebAudio graph:

```ts
export type DebugToneGraph = {
  master: GainNode;
  osc: OscillatorNode;
  oscGain: GainNode;
  dispose(): void;
};
```

Create a hook which:

- generates a WebAudio context (with our helper functions)
- spawns WebAudio Nodes of the desired types and configs (oscillators, filters, gain, etc)
- returns the desired parameters to be controlled externally by the GUI
- props may be passed in for default values to be used on graph creation

```ts
import { ensureRunning } from "../WebAudioContext";

export async function createDebugToneGraph(
  opts?: {
    wave?: OscillatorType;
    freqHz?: number;
    startMuted?: boolean;
    startGain?: number; // 0..1
  }
): Promise<DebugToneGraph> {

  /// Set up the WebAdio context to be used!
  const ctx = await ensureRunning();

  /// use `ctx.*` to create WebAudio "Nodes"...

  /// Oscillator:
  const osc: OscillatorNode = ctx.createOscillator();

  osc.type = opts?.wave ?? "triangle";
  osc.frequency.value = opts?.freqHz ?? 220;

  /// Master volume:
  const master: GainNode; = ctx.createGain();

  const gain = opts?.startGain ?? 0.6;
  const muted = opts?.startMuted ?? true;
  master.gain.value = muted ? 0 : gain;

  /// Gain:
  const master: GainNode; = ctx.createGain();
  oscGain.gain.value = 1;


  /// Connect the nodes
  osc.connect(oscGain);
  oscGain.connect(master);
  master.connect(ctx.destination);

  /// Start the sound
  osc.start();

  /// Expose your desired parameters to the WebAudio controller endpoints here
  return {

    master,
    osc,
    oscGain,

    dispose() {
      try {
        osc.stop();
      } catch (e) {
        Log.error(e);
      } finally {
        osc.disconnect();
        oscAgain.disconnect();
        master.disconnect();
      }
    },
  } satisfies DebugToneGraph;
}

```
