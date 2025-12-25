import { AppData } from "@lightningjs/sdk";
import { filter } from "rxjs";
import { Container } from "../../container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { WidgetActions, type WidgetData } from "../types";

/**
 * @constant
 *
 * @param {WidgetActions} action
 * @param {WidgetData} data
 */
export const sendWidgetEvent = (action: WidgetActions, data: WidgetData) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendWidgetEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.WidgetEvent,
        data: {
          type: EventType.WidgetEvent,
          action,
          data,
        },
      },
    });
};

export const getWidgetEvent = <T extends WidgetActions = WidgetActions>(
  action: T
) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendWidgetEvent()", {
      action,
    });
  return AppData.container
    .get({ token: Container.Token.EventBus })
    .getByType$({ type: EventType.WidgetEvent })
    .pipe(filter((event) => event.data.action === action));
};
