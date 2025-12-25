import type { Event, EventBus, EventType } from "../events";
import type { DeviceInfo, DeviceType } from "./types";

class Container {
  private implementations: {
    [key in Container.Token]?: Container.Implementation<key>;
  } = {};

  /**
   * Set a value within the dependency container, which can be overridden
   * later.
   * @param implementation
   */
  bind<T extends Container.Token>(implementation: {
    token: T;
    method: Container.Implementation<T>;
  }): void {
    this.implementations[implementation.token] = implementation.method;
  }

  /**
   * Retrieve a value from within the dependency injection container.
   * @param token
   * @returns
   */
  get<T extends Container.Token>(data: {
    token: T;
  }): Container.Implementation<T> {
    const v = this.implementations[data.token];

    if (undefined === v) {
      throw new Error(
        `${data.token} was undefined in the DI container when retrieved.`
      );
    }

    return v;
  }
}


namespace Container {
  /**
   *
   */
  export type Implementation<T extends Token> = Type[T];

  /**
   * Enum for storing the different DI implementations that could exist.
   */
  export enum Token {
    // ConfigurationSM = "ConfigurationSM",
    // DRMSM = "DRMSM",
    DeviceInfo = "DeviceInfo",
    EventBus = "EventBus",
    EventProducer = "EventProducer",
    // GeolocationSM = "GeolocationSM",
    // LocalisationSM = "LocalisationSM",
    // LoggingSM = "LoggingSM",
    // PlaybackSM = "PlaybackSM",
    // SubscriptionSM = "SubscriptionSM",
    // UserAuthSM = "UserAuthSM",
    DeviceType = "DeviceType",
    // ContentCatalogueSM = "ContentCatalogueSM",
    // UserProfileSM = "UserProfileSM",
  }

  /**
   * Type containing the types of each item which can be placed in the DI
   * Container.
   */
  export type Type = {
    // [DependencyToken.ConfigurationSM]: ConfigurationSM;
    // [DependencyToken.DRMSM]: DRMSM;
    [Token.DeviceInfo]: () => Promise<DeviceInfo>;
    [Token.EventBus]: EventBus;
    [Token.EventProducer]: <T extends EventType>(data: {
      event: Event<T>;
    }) => void;
    // [DependencyToken.GeolocationSM]: GeolocationSM;
    // [DependencyToken.LocalisationSM]: LocalisationSM;
    // [DependencyToken.LoggingSM]: LoggingSM;
    // [DependencyToken.PlaybackSM]: PlaybackSM;
    [Token.DeviceType]: DeviceType;
    // [DependencyToken.SubscriptionSM]: SubscriptionSM;
    // [DependencyToken.UserAuthSM]: UserAuthSM;
    // [DependencyToken.ContentCatalogueSM]: ContentCatalogueSM;
    // [DependencyToken.UserProfileSM]: UserProfileSM;
    // Closed caption settings stream
    // Deeplinking stream
    // IAP module
  };
}

let container: Container | null = null;

function bootstrapContainer(setupFn?: (c: Container) => void): Container {
  if (container) return container;

  const c = new Container();
  setupFn?.(c); // <-- bind implementations here, explicitly
  container = c;

  return c;
}

function getContainer(): Container {
  if (!container) {
    throw new Error("Container accessed before initContainer() was called.");
  }
  return container;
}

// // Optional: for tests only
// export function _resetContainerForTests(): void {
//   container = null;
// }


export { bootstrapContainer, Container, getContainer };
