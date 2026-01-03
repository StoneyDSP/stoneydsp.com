import type { AudioSM } from "../Services/AudioSM/AudioSM";

/**
 * ---
 *
 * This is *crucial* for the whole mapping thing to work.
 *
 * Ideally, any concrete {@link AudioSM} implementation should use _this_ exact
 * function definition internally (see example).
 *
 * ---
 *
 * @example
 * ```ts
 * class JUCEAudioSM extends AudioSM {
 *
 *   override subscribe(
 *     address: AudioSM.ControlAddress,
 *     cb: (v: AudioSM.ControlValue) => void
 *   ) {
 *     // extract name from control address global helper function:
 *     const name = controlAddressToName(address);
 *
 *     // Decide which state object to subscribe to based on what you *expect*
 *     // that address to be.
 *     // For this example: mute is a toggle.
 *     const t = JUCE.getToggleState(name);
 *
 *     // Immediately emit current (helps first render even before
 *     // requestInitialUpdate returns)
 *     cb(t.getValue());
 *
 *     const token = t.valueChangedEvent.addListener(() => {
 *       cb(t.getValue());
 *     });
 *
 *     return () => t.valueChangedEvent.removeListener(token);
 *   }
 * }
 * ```
 *
 * ---
 *
 * @param {AudioSM.ControlAddress} address
 * @returns {string}
 */
export function controlAddressToName(address: AudioSM.ControlAddress): string {
  return typeof address === "string"
    ? address
    : `${address.namespace}:${address.key}`;
}
