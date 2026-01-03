import { Backend } from "./Backend";
import { ComboBoxState } from "./ComboBoxState";
import { SliderState } from "./SliderState";
import { ToggleState } from "./ToggleState";
import { WebAudioService } from "./WebAudioService";

const toggleStates: Map<string, ToggleState> = new Map<string, ToggleState>();

/**
 * Returns a ToggleState object that is connected to the backend WebToggleButtonRelay object that was
 * created with the same name argument.
 *
 * To register a WebToggleButtonRelay object create one with the right name and add it to the
 * WebBrowserComponent::Options struct using withOptionsFrom.
 *
 * @param {string} name
 */
export function getToggleState(name: string) {
  if (!toggleStates.has(name)) toggleStates.set(name, new ToggleState(name));

  return toggleStates.get(name);
}

/**
 * @type {Map<string, SliderState>}
 */
const sliderStates: Map<string, SliderState> = new Map<string, SliderState>();

/**
 * Returns a SliderState object that is connected to the backend WebSliderRelay
 * object that was created with the same name argument.
 *
 * To register a WebSliderRelay object create one with the right name and add it
 * to the WebBrowserComponent::Optaions struct using withOptionsFrom.
 *
 * @param {string} name
 */
export function getSliderState(name: string) {
  if (!sliderStates.has(name)) sliderStates.set(name, new SliderState(name));

  return sliderStates.get(name);
}

const comboBoxStates: Map<string, ComboBoxState> = new Map<
  string,
  ComboBoxState
>();

/**
 * Returns a ComboBoxState object that is connected to the backend WebComboBoxRelay object that was
 * created with the same name argument.
 *
 * To register a WebComboBoxRelay object create one with the right name and add it to the
 * WebBrowserComponent::Options struct using withOptionsFrom.
 *
 * @param {string} name
 */
export function getComboBoxState(name: string) {
  if (!comboBoxStates.has(name))
    comboBoxStates.set(name, new ComboBoxState(name));

  return comboBoxStates.get(name);
}

export function bootstrapWebAudioBackend() {
  const w = window as any;

  if (!w.__WEBAUDIO__) w.__WEBAUDIO__ = {};
  if (!w.__WEBAUDIO__.initialisationData) {
    w.__WEBAUDIO__.initialisationData = {
      __webaudio__platform: [],
      __webaudio__functions: [],
      __webaudio__registeredGlobalEventIds: [],
      __webaudio__sliders: [],
      __webaudio__toggles: [],
      __webaudio__comboBoxes: [],
    };
  }
  if (!w.__WEBAUDIO__.backend) w.__WEBAUDIO__.backend = new Backend();
  if (!w.__WEBAUDIO__.postMessage)
    w.__WEBAUDIO__.postMessage = (_msg: string) => {};

  for (const name of (window.__WEBAUDIO__ as WebAudioService).initialisationData
    .__webaudio__toggles)
    toggleStates.set(name, new ToggleState(name));

  for (const sliderName of (window.__WEBAUDIO__ as WebAudioService)
    .initialisationData.__webaudio__sliders)
    sliderStates.set(sliderName, new SliderState(sliderName));

  for (const name of (window.__WEBAUDIO__ as WebAudioService).initialisationData
    .__webaudio__comboBoxes)
    comboBoxStates.set(name, new ComboBoxState(name));
}
