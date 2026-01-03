import type { Router } from "@lightningjs/sdk";
import { EventType } from "../EventType";

export enum PageActions {
  /// Lifecycle hooks (chronological order)
  /// up
  CONSTRUCT = "page:construct",
  BUILD = "page:build",
  SETUP = "page:setup",
  INIT = "page:init",
  ATTACH = "page:attach",
  FIRST_ENABLE = "page:first_enable",
  ENABLE = "page:enable",
  FIRST_ACTIVE = "page:first_active",
  ACTIVE = "page:active",
  /// down
  DETACH = "page:detach",
  DISABLE = "page:disable",
  INACTIVE = "page:inactive",
  /// Lightning Page component hooks:
  /// https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/events?id=page-events
  DATA_PROVIDED = "page:data_provided",
  MOUNTED = "page:mounted",
  CHANGED = "page:changed",
  URL_PARAMS = "page:url_params",
  /// custom hooks
  LOADED = "page:loaded",
}

export type PageData = {
  path: string;
  title: string;
  component: string;
  active: boolean;
  attached: boolean;
  visible: boolean;
  historyState: Router.HistoryState;
  params: Router.QueryParams;
};

/**
 * ---
 *
 * The {@link PageEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.PageEvent,
 *     data: {
 *       action: PageActions.LOADED,
 *       type: EventType.PageEvent,
 *       data: {
 *         path: "/test",
 *         title: "TEST",
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type PageEvent = {
  type: EventType.PageEvent;
  action: PageActions;
  data: Partial<PageData>;
};
