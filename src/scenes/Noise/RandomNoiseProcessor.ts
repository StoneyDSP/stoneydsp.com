/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode
 */
class RandomNoiseProcessor
  extends AudioWorkletProcessor
  implements AudioWorkletProcessor
{
  process(
    _inputs: Array<Float32Array[]>,
    outputs: Array<Float32Array[]>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parameters: Record<string, Float32Array>
  ): boolean {
    const output = outputs[0]!;
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;
      }
    });
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);
