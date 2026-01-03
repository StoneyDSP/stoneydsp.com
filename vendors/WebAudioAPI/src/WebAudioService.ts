import type { Backend } from "./Backend";

export declare interface WebAudioService {
  getAndroidUserScripts?: (() => void) | undefined;
  initialisationData: {
    __webaudio__platform: Array<unknown>;
    __webaudio__functions: Array<unknown>;
    __webaudio__registeredGlobalEventIds: Array<unknown>;
    __webaudio__sliders: Array<string>;
    __webaudio__toggles: Array<string>;
    __webaudio__comboBoxes: Array<string>;
  };
  backend: Backend;
  postMessage: (msg: string) => void;
}
