import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { PageActions, type PageData } from "../types";

/**
 * @constant
 *
 * @param {PageActions} action
 * @param {Partial<PageData>} data
 */
export const sendPageEvent = (
  action: PageActions,
  data?: Partial<PageData>
) => {
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
            active: data?.active,
            attached: data?.attached,
            visible: data?.visible,
          },
        },
      },
    });
};
