import { Lightning } from "@lightningjs/sdk";
import { Vector } from "../Vector/Vector";

type InputEvent = globalThis.MouseEvent | globalThis.TouchEvent;

let enabled: true | false = false;
let listeners: {
  start: () => void;
  end: () => void;
  move: () => void;
};
let stage: Lightning.Stage;

/**
 * Is user pressing `select / ok` button
 * @type {boolean}
 */
// @ts-expect-error unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let touchStarted: boolean = false;
let startCoord: Vector;
let endCoord: Vector;
let delta: Vector;

/**
 * Element that initialized touchstart
 * @type {null}
 */
let touchedElement: Lightning.Element | null = null;

type TranslateCb = (x: number, y: number, event: InputEvent) => unknown;

type TranslateFn = (event: InputEvent, cb: TranslateCb) => TranslateCb;

/**
 * Simple event to position translation
 * platform can provide own translator
 * @param event
 * @param cb
 */
let translate: TranslateFn = (event: InputEvent, cb: TranslateCb) => {
  let clientX = 0;
  let clientY = 0;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    const { touches, changedTouches } = event;
    let touch = touches;

    if (changedTouches.length) {
      touch = changedTouches;
    }

    if (touch.length) {
      clientX = touch[0]!.clientX;
      clientY = touch[0]!.clientY;
    }
  }

  if (typeof cb === "function") {
    cb.call(null, ~~clientX, ~~clientY, event);
  }

  return cb;
};

const start = (x: number, y: number, event: InputEvent) => {
  const child = getAt(x, y);
  touchStarted = true;
  startCoord = new Vector(x, y);

  if (child) {
    touchedElement = child;
    emit(child, "_handleTouchStart", event);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const move = (x: number, y: number, _event?: InputEvent) => {
  const current = new Vector(x, y);
  if (touchedElement) {
    emit(touchedElement, "_handleTouchMove", {
      start: startCoord,
      current,
      delta: current.subtract(startCoord),
    });
  } else {
    const child = getAt(x, y);
    if (child) {
      emit(child, "_handleTouchHover", { current });
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const end = (x: number, y: number, _event?: InputEvent) => {
  const child = getAt(x, y);

  endCoord = new Vector(x, y);
  delta = endCoord.subtract(startCoord);

  if (child) {
    emit(child, "_handleTouchEnd", { delta });
  } else if (touchedElement) {
    emit(touchedElement, "_handleTouchEnd", { delta });
  }

  touchedElement = null;
};

/**
 * Get child at coords
 * @param x
 * @param y
 */
const getAt = (x: number, y: number) => {
  const children = collect(x, y);
  if (children.length > 0) {
    const core = children.pop()!;
    return core.element;
  }
  return null;
};

/**
 * Collect all children at coords
 * @param {number} x
 * @param {number} y
 * @returns {Lightning.ElementCore[]}
 */
const collect = (x: number, y: number): Lightning.ElementCore[] => {
  return stage.getChildrenByPosition(x, y);
};

// interface TouchTarget {
//   _handleTouchStart?(event: InputEvent): void;
//   _handleTouchMove?(data: {
//     start: Vector;
//     current: Vector;
//     delta: Vector;
//   }): void;
//   _handleTouchEnd?(data: { delta: Vector }): void;
// }

/**
 * Call touchHandlers events on instance
 * @param instance
 * @param event
 * @param args
 */
const emit = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: Record<string, any>,
  event: string,
  args: unknown
) => {
  if (instance[event]) {
    instance[event](args);
  }
};

export const initTouch = ({
  translate: translateOverride,
  listeners: listenersOverride,
}: {
  translate?: TranslateFn;
  listeners?: typeof listeners;
}) => {
  if (listenersOverride) {
    listeners = listenersOverride;
  }
  if (translateOverride) {
    translate = translateOverride;
  }
};

/**
 * Lightning app must enable touch support
 * @param {Lightning.Stage} stageInstance
 */
const enable = (stageInstance: Lightning.Stage) => {
  if (enabled) {
    return;
  }

  stage = stageInstance;

  // provide default listeners if not provided via platform
  if (!listeners) {
    listeners = {
      start: () => {
        const evt = (event: InputEvent) => {
          return translate.call(null, event, start);
        };

        document.addEventListener("touchstart", evt);
        document.addEventListener("mousedown", evt);
      },
      end: () => {
        const evt = (event: InputEvent) => {
          return translate.call(null, event, end);
        };

        document.addEventListener("touchend", evt);
        document.addEventListener("mouseup", evt);
      },
      move: () => {
        const evt = (event: InputEvent) => {
          translate.call(null, event, move);
          event.preventDefault();
        };

        document.addEventListener("touchmove", evt, { passive: false });
        document.addEventListener("mousemove", evt);
      },
    };
  }

  listeners.start();
  listeners.end();
  listeners.move();

  enabled = true;
};

class Touch {
  static enable = enable;
}

export { Touch };
