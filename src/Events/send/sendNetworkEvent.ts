import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { type NetworkActions, type NetworkData } from "../types";

/**
 * @constant
 *
 * @param {NetworkActions} action
 * @param {NetworkData} data
 */
export const sendNetworkEvent = (action: NetworkActions, data: NetworkData) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendNetworkEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.NetworkEvent,
        data: {
          type: EventType.NetworkEvent,
          action,
          data,
        },
      },
    });
};
