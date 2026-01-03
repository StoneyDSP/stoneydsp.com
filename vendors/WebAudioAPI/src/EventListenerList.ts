import { ListenerList, type ListenerFn } from "./ListenerList";

export class EventListenerList {
  constructor() {
    this.eventListeners = new Map<string, ListenerList>();
  }

  addEventListener(eventId: string, fn: ListenerFn) {
    if (!this.eventListeners.has(eventId))
      this.eventListeners.set(eventId, new ListenerList());

    const id = this.eventListeners.get(eventId)?.addListener(fn);

    return [eventId, id];
  }

  removeEventListener([eventId, id]: [string, number]) {
    if (this.eventListeners.has(eventId)) {
      this.eventListeners.get(eventId)?.removeListener(id);
    }
  }

  emitEvent(
    eventId: string,
    object: Parameters<ListenerList["callListeners"]>[0]
  ) {
    if (this.eventListeners.has(eventId))
      this.eventListeners.get(eventId)?.callListeners(object);
  }

  public eventListeners: Map<string, ListenerList>;
}
