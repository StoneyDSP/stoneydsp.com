import { EventListenerList } from "./EventListenerList";
import type { ListenerFn, ListenerList } from "./ListenerList";

export class Backend {
  constructor() {
    this.listeners = new EventListenerList();
  }

  addEventListener(eventId: string, fn: ListenerFn) {
    return this.listeners.addEventListener(eventId, fn);
  }

  removeEventListener([eventId, id]: [string, number]) {
    this.listeners.removeEventListener([eventId, id]);
  }

  emitEvent(
    eventId: string,
    object: Parameters<ListenerList["callListeners"]>[0]
  ) {
    window.__WEBAUDIO__.postMessage(
      JSON.stringify({ eventId: eventId, payload: object })
    );
  }

  emitByBackend(eventId: string, object: string) {
    this.listeners.emitEvent(eventId, JSON.parse(object));
  }

  public listeners: EventListenerList;
}
