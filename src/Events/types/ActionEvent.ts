import { EventType } from "../EventType";

export enum ActionEventActions {
  CLICK = "action:click",
  IMPRESSION = "action:impression",
}

export type ActionEventData = {
  campaignId?: string;
  creation?: string;
  url?: string;
  format?:
    | string
    | {
        row: number;
        column: number;
      };
  is_background: boolean;
};

/**
 * Used internally by {@link sendClickEvent} and {@link sendImpressionEvent},
 * which already have their `is_background` props set by default.
 */
export type ActionEventType = Omit<ActionEventData, "is_background">;

/**
 * ---
 *
 * The {@link ActionEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.ActionEvent,
 *     data: {
 *       type: EventType.ActionEvent,
 *       action: ActionEventActions.IMPRESSION, // | "action:click"
 *       data: {
 *         is_background: true, // use 'false' for "action:click",
 *         format: "1:2", // 1st rail, 2nd element
 *         url: "/test",
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type ActionEvent = {
  type: EventType.ActionEvent;
  action: string; // ActionEventActions;
  data: ActionEventData;
};
