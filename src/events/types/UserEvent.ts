// import { Entitlement } from "../../RocketSDK";
import { EventType } from "../EventType";

export enum UserActions {
  DETAILS = "user:details",
  LOGIN = "user:login",
  LOGOUT = "user:logout",
}

export interface UserAddress {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postcode?: string;
  state?: string;
}

export type UserData = {
  subscriptionCode?: string;
  userId?: string;
  // entitlements?: Entitlement[];
  address?: UserAddress;
};

/**
 * The {@link UserEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.UserEvent,
 *     data: {
 *       type: EventType.UserEvent,
 *       action: UserActions.LOGIN,
 *       data: {
 *         address: {
 *           addressLine1: "London",
 *         },
 *         userId: "X000FOOBARBAZ123",
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * ---
 */
export type UserEvent = {
  type: EventType.UserEvent;
  action: UserActions;
  data: UserData;
};
