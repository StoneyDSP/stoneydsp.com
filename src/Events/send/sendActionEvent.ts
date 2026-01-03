import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import type { ActionEventData } from "../types";

/**
 * @constant
 *
 * @param {string} action
 * @param {ActionEventData} [data={is_background:false}]
 *
 * @see https://bbc.github.io/echo-docs/pages/getting-started.html#user-action-events
 */
export const sendActionEvent = (
  action: string,
  data: ActionEventData = { is_background: false }
) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendActionEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.ActionEvent,
        data: {
          type: EventType.ActionEvent,
          action,
          data,
        },
      },
    });
};
/**
 * Used internally by {@link sendClickEvent} and {@link sendImpressionEvent},
 * which already have their `is_background` props set by default.
 */
type ActionEventType = Omit<ActionEventData, "is_background">;

/**
 * @constant
 *
 * @param {string} action
 * @param {ActionEventType} [data={}]
 *
 * @see https://bbc.github.io/echo-docs/pages/getting-started.html#user-action-events
 */
export const sendClickEvent = (action: string, data: ActionEventType = {}) =>
  sendActionEvent(action, { ...data, is_background: false });

/**
 * @constant
 *
 * @param {string} action
 * @param {ActionEvent} [data={}]
 *
 * @see https://bbc.github.io/echo-docs/pages/getting-started.html#user-action-events
 */
export const sendImpressionEvent = (
  action: string,
  data: ActionEventType = {}
) => sendActionEvent(action, { ...data, is_background: true });

/**
 * @method
 *
 * @param {string} action
 * @param {ActionEvent} [data={}]
 *
 * @see https://bbc.github.io/echo-docs/pages/getting-started.html#user-action-events
 */
sendActionEvent.click = (action: string, data: ActionEventType = {}) =>
  sendClickEvent(action, data);

/**
 * @method
 *
 * @param {string} action
 * @param {ActionEventType} [data={}]
 *
 * @see https://bbc.github.io/echo-docs/pages/getting-started.html#user-action-events
 */
sendActionEvent.impression = (action: string, data: ActionEventType = {}) =>
  sendImpressionEvent(action, data);
