import { AppData } from "@lightningjs/sdk";
import { Container } from "../../container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { RouterActions, type RouterData } from "../types";

/**
 * @constant
 *
 * @param {RouterActions} action
 * @param {RouterData} data
 */
export const sendRouterEvent = (action: RouterActions, data: RouterData) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendRouterEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.RouterEvent,
        data: {
          type: EventType.RouterEvent,
          action,
          data,
        },
      },
    });
};
