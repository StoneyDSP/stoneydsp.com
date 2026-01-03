import { AppData } from "@lightningjs/sdk";
import { Container } from "../../Container";
import { EventBusError } from "../EventBusError";
import { EventType } from "../EventType";
import { PlayerActions, type PlayerData } from "../types";

/**
 * @constant
 *
 * @param {PlayerActions} action
 * @param {PlayerData} data
 */
export const sendPlayerEvent = (action: PlayerActions, data: PlayerData) => {
  if (!AppData)
    throw new EventBusError("ERR_CONTEXT_NOT_FOUND", "sendPlayerEvent()", {
      action,
      data,
    });
  return AppData.container
    .get({
      token: Container.Token.EventBus,
    })
    .produce({
      event: {
        type: EventType.PlayerEvent,
        data: {
          type: EventType.PlayerEvent,
          action,
          data,
        },
      },
    });
};
