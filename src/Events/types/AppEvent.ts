import { EventType } from "../EventType";

/**
 * - _construct note that whatever code gets written in this method body actually gets moved into the class's actual constructor somehow, I guess Lightning does it... (check the components' JS code output in the browser)*
 * - _build
 * - _setup
 * - _init
 * - _attach
 * - _firstEnable / _enable
 * - _firstActive / _active
 * - _detach
 * - _disable
 * - _inactive
 */

export enum AppActions {
  /// Lifecycle hooks (chronological order)
  /// up
  CONSTRUCT = "app:construct",
  BUILD = "app:build",
  SETUP = "app:setup",
  INIT = "app:init",
  ATTACH = "app:attach",
  FIRST_ENABLE = "app:first_enable",
  ENABLE = "app:enable",
  FIRST_ACTIVE = "app:first_active",
  ACTIVE = "app:active",
  /// down
  DETACH = "app:detach",
  DISABLE = "app:disable",
  INACTIVE = "app:inactive",
  /// custom hooks
  EXIT = "app:exit",
  FOREGROUND = "app:foreground",
  BACKGROUND = "app:background",
  HANDLE_CLOSE = "app:handle_close",
}

/**
 * @see {@link https://rdkcentral.github.io/firebolt/apis/latest/manage/Lifecycle/schemas LifecycleState} from firebolt sdk
 */
export type AppState =
  | "initializing"
  | "inactive"
  | "foreground"
  | "background"
  | "unloading"
  | "suspended";

export type AppStateData = {
  state?: {
    curr: AppState;
    prev: AppState;
  };
};

/**
 * ---
 *
 * The {@link AppEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.AppEvent,
 *     data: {
 *       type: EventType.AppEvent,
 *       action: AppActions.INIT,
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type AppEvent = {
  type: EventType.AppEvent;
  action: AppActions;
  data?: AppStateData;
};
