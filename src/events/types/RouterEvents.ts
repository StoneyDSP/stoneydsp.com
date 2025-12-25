import { EventType } from "../EventType";

/**
 * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/configuration?id=router-configuration
 * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/dataproviding?id=data-providing
 */
export enum RouterActions {
  BEFORE_EACH = "router:before_each",
  AFTER_EACH = "router:after_each",
}

export type RouterData = {
  path: string;
  data?: {
    cancelled: boolean;
    copiedHistoryState: Record<string, unknown> | null | undefined;
    hash: string;
    isCreated: boolean;
    isSharedInstance: boolean;
    register: Map<string, unknown>;
    url: string;
  };
  /// ???
};

/**
 * ---
 *
 * The {@link RouterEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.RouterEvent,
 *     data: {
 *       action: RouterActions.BEFORE,
 *       type: EventType.RouterEvent,
 *       data: {},
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type RouterEvent = {
  type: EventType.RouterEvent;
  action: RouterActions;
  data: RouterData;
};
