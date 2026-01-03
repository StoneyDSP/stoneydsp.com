export const Controls = {
  // Gate: "global:gate",
  Freq: "osc:freq", // 0..1
  Gain: "osc:gain", // 0..1 (performance gain)
  Wave: "osc:wavetype", // "sine" | "triangle" | "square" | "sawtooth"
} as const;

export type WaveType = "sine" | "triangle" | "square" | "sawtooth";
