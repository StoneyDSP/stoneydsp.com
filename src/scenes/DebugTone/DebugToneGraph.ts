import { Log } from "../../lib/Log";
import { ensureRunning } from "../../Services/AudioSM/WebAudioSM/WebAudioContext";

export type DebugToneGraph = {
  master: GainNode;
  oscA: OscillatorNode;
  oscB: OscillatorNode;
  oscAGain: GainNode;
  oscBGain: GainNode;
  dispose(): void;
};

export async function createDebugToneGraph(opts?: {
  wave?: OscillatorType;
  freqHz?: number;
  startMuted?: boolean;
  startGain?: number; // 0..1
}): Promise<DebugToneGraph> {
  /// ctx
  const ctx = await ensureRunning({
    sampleRate: 44100,
  });
  // ctx.destination.channelInterpretation = "speakers";

  /// master
  const master: GainNode = new GainNode(ctx, {
    gain: 0,
  });

  // master.channelInterpretation = "speakers";

  /// muted
  master.gain.value = opts?.startGain ?? 0.6;

  /// mixer
  // const mixer: ChannelMergerNode = ctx.createChannelMerger(2);
  const mixer = new ChannelMergerNode(ctx, {
    numberOfInputs: 3,
  });
  // mixer.channelInterpretation = "speakers";

  /// oscA
  const oscA = new OscillatorNode(ctx, {
    type: opts?.wave ?? "triangle",
    frequency: opts?.freqHz ?? 220,
  });

  /// oscB
  const oscB: OscillatorNode = new OscillatorNode(ctx, {
    type: opts?.wave ?? "triangle",
    frequency: 277.183,
  });

  /// oscC
  const oscC: OscillatorNode = new OscillatorNode(ctx, {
    type: opts?.wave ?? "triangle",
    frequency: 329.628,
  });

  /// oscAGain
  const oscAGain: GainNode = new GainNode(ctx, {
    gain: 0,
  });

  /// oscBGain
  const oscBGain: GainNode = new GainNode(ctx, {
    gain: 0,
  });

  /// oscCGain
  const oscCGain: GainNode = new GainNode(ctx, {
    gain: 0,
  });

  oscA.connect(oscAGain);
  oscB.connect(oscBGain);
  oscC.connect(oscCGain);

  oscAGain.connect(mixer, 0, 0);
  oscBGain.connect(mixer, 0, 1);
  oscBGain.connect(mixer, 0, 2);

  oscA.start();
  oscB.start();
  oscC.start();

  mixer.connect(master);
  master.connect(ctx.destination);

  return {
    master,
    oscA,
    oscB,
    oscAGain,
    oscBGain,
    dispose() {
      try {
        oscA.stop();
        oscB.stop();
      } catch (e) {
        Log.error(e);
      } finally {
        oscA.disconnect();
        oscB.disconnect();
        oscAGain.disconnect();
        oscBGain.disconnect();
        master.disconnect();
      }
    },
  };
}
