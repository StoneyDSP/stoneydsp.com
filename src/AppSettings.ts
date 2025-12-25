import type { Lightning } from "@lightningjs/sdk";
import { getConsts } from "./CONSTS";
import { createObject } from "./lib/utils/object/createObject";

export const defaultSettings = createObject<Lightning.Application.Options>({
  stage: {
    w: 1920,
    h: 1080,
    precision: 1,
    clearColor: 0x00000000,
    canvas2d: false,
  },
  enablePointer: true,
  debug: false,
  keys: {
    8: "Back",
    13: "Enter",
    27: "Menu",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    174: "ChannelDown",
    175: "ChannelUp",
    178: "Stop",
    250: "PlayPause",
    191: "Search", // Use "/" for keyboard
    409: "Search",
  },
  // @ts-expect-error untyped
  defaultFontFace: "RobotoRegular",
});

export const appSettings = {
  // @ts-expect-error untyped
  version: getConsts().APP_VERSION,
  debug: getConsts().DEV,
  enablePointer: true,
  keys: {
    38: "Up",
    40: "Down",
    37: "Left",
    39: "Right",
    13: "Enter",
    8: "Back",
    27: "Exit",
  } satisfies Lightning.Application.KeyMap,
  stage: {
    w: getConsts().APP_WIDTH,
    h: getConsts().APP_HEIGHT,
    precision: 1.0,
    clearColor: [4, 44, 57, 1],
    canvas2d: false,
  } satisfies Partial<Lightning.Stage.Options>,
} satisfies Lightning.Application.Options;

export function getAppSettings() {
  return appSettings;
}
