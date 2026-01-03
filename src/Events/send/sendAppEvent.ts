import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { AppActions } from "../types";

/**
 * @constant
 *
 * @param {AppActions} action
 */
export const sendAppEvent = (action: AppActions) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendAppEvent()", {
      action,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.AppEvent,
        data: {
          type: EventType.AppEvent,
          action,
        },
      },
    });
};
