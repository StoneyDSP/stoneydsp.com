import { EventType } from "../EventType";

export enum WidgetActions {
  /// Lifecycle hooks (chronological order)
  /// up
  CONSTRUCT = "widget:construct",
  BUILD = "widget:build",
  SETUP = "widget:setup",
  INIT = "widget:init",
  ATTACH = "widget:attach",
  FIRST_ENABLE = "widget:first_enable",
  ENABLE = "widget:enable",
  FIRST_ACTIVE = "widget:first_active",
  ACTIVE = "widget:active",
  /// down
  DETACH = "widget:detach",
  DISABLE = "widget:disable",
  INACTIVE = "widget:inactive",
  /// Lightning Widget component hooks:
  /// https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/events?id=page-events
  ACTIVATED = "widget:activated",
  /// custom hooks
  VISIBLE = "widget:visible",
}

export type WidgetData = {
  active: boolean;
  visible: boolean;
  attached: boolean;
  component: string;
};

/**
 * ---
 *
 * The {@link WidgetEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.WidgetEvent,
 *     data: {
 *       action: WidgetActions.ACTIVATED,
 *       type: EventType.WidgetEvent,
 *       data: {},
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type WidgetEvent = {
  type: EventType.WidgetEvent;
  action: WidgetActions;
  data: Partial<WidgetData>;
};
