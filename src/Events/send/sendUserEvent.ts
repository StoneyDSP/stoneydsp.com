import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { UserActions, type UserData } from "../types";

/**
 *
 * @param action
 * @param data
 * @returns
 */
export const sendUserEvent = (
  action: UserActions,
  data: UserData = {
    subscriptionCode: undefined,
    userId: undefined,
    address: {},
  }
): void => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendUserEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.UserEvent,
        data: {
          type: EventType.UserEvent,
          action,
          data,
        },
      },
    });
};
