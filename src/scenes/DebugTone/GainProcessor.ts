export class GainProcessor extends AudioWorkletProcessor {
  #value = 0.0;

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
  }

  /**
   *
   * @param {Array<Float32Array[]>} _inputs
   * @param {Array<Float32Array[]>} outputs
   * @param {Record<string, Float32Array>} _parameters
   * @returns
   */
  process(
    _inputs: Array<Float32Array[]>,

    outputs: Array<Float32Array[]>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parameters: Record<string, Float32Array>
  ) {
    const output = outputs[0]!;
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i]! *= this.value;
      }
    });
    return true;
  }
}
