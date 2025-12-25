import { AppData } from "@lightningjs/sdk";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { PageActions, type PageData } from "../types";
import { Container } from "../../container";

/**
 * @constant
 *
 * @param {PageActions} action
 * @param {PageData} data
 */
export const sendPageEvent = (action: PageActions, data?: PageData) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendPageEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.PageEvent,
        data: {
          type: EventType.PageEvent,
          action,
          data: {
            path: data?.path ?? "undefined",
            title: data?.title ?? "undefined",
            component: data?.component,
            template: data?.template,
          },
        },
      },
    });
};
