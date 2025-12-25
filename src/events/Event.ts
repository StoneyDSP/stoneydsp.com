import type { EventPayload, EventType } from "./EventType";

export type Event<T extends EventType = EventType> = {
  type: T;
  data: EventPayload[T];
};
