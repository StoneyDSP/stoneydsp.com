import type { Backend } from "./Backend";
import type { WebAudioService } from "./WebAudioService";

declare global {
  interface Window {
    __WEBAUDIO__:
      | WebAudioService
      | { postMessage: () => void; backend?: Backend };
  }
}
