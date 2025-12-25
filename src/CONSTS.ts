import { freezeObject } from "./lib/utils/object/freezeObject";

export const __APP_WIDTH__ = window.innerWidth ?? 1920;
export const __APP_HEIGHT__ = window.innerHeight ?? 1080;
export const __APP_PRECISION__ = 1.0;
export const __APP_CLEAR_COLOUR__ = 0x00000000;
export const __APP_CANVAS_2D__ = true;
export const __PAGE_WIDTH__ = window.innerWidth ?? 1920;
export const __PAGE_HEIGHT__ = window.innerHeight ?? 1080;
export const __DEV__ = true; // process.env['NODE_ENV'] === "development";
export const __DBG__ = __DEV__ && true; // (typeof process.env['DEBUG'] !== 'undefined');

export function getConsts() {
  return freezeObject({
    APP_VERSION: __APP_VERSION__,
    APP_WIDTH: __APP_WIDTH__,
    APP_HEIGHT: __APP_HEIGHT__,
    APP_CLEAR_COLOUR: __APP_CLEAR_COLOUR__,
    APP_PRECISION: __APP_PRECISION__,
    APP_CANVAS_2D: __APP_CANVAS_2D__,
    PAGE_WIDTH: __PAGE_WIDTH__,
    PAGE_HEIGHT: __PAGE_HEIGHT__,
    DEV: __DEV__,
    DBG: __DBG__
  })!;
}
