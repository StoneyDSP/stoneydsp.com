// import type {
//   NetworkInfo,
//   NetworkState,
// } from "../../plugins/comcast/networkStatus";
import { EventType } from "../EventType";

export enum NetworkActions {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
};

export enum NetworkType {
  WIFI = "wifi",
  ETHERNET = "ethernet",
  HYBRID = "hybrid",
}

export type NetworkData = {
  type: NetworkType;
  state: NetworkActions;
};

/**
 * ---
 *
 * The {@link NetworkEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.NetworkEvent,
 *     data: {
 *       type: EventType.NetworkEvent,
 *       action: NetworkState.DISCONNECTED,
 *       data: {
 *         type: NetworkType.WIFI,
 *         state: NetworkState.DISCONNECTED,
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type NetworkEvent = {
  type: EventType.NetworkEvent;
  action: NetworkActions;
  data: NetworkData;
};
