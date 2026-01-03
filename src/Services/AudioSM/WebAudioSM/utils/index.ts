export function rampGain(node: GainNode, target: number, seconds = 0.01) {
  const t = node.context.currentTime;
  node.gain.cancelScheduledValues(t);
  node.gain.setValueAtTime(node.gain.value, t);
  node.gain.linearRampToValueAtTime(target, t + seconds);
}
