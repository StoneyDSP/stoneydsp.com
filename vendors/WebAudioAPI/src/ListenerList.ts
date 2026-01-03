export type ControlValue = boolean | number | string;

export declare type ListenerFn<V extends ControlValue = ControlValue> =
  (payload?: {
    eventType: string;
    value: V;
    name?: string;
    parameterIndex?: number;
  }) => void;

export declare type ListenerFnParams<V extends ControlValue = ControlValue> =
  Parameters<ListenerFn<V>>[0];

export class ListenerList {
  constructor() {
    this.listeners = new Map();
    this.listenerId = 0;
  }

  addListener(fn: ListenerFn) {
    const newListenerId = this.listenerId++;
    this.listeners.set(newListenerId, fn);
    return newListenerId;
  }

  removeListener(id: number) {
    if (this.listeners.has(id)) {
      this.listeners.delete(id);
    }
  }

  callListeners(payload?: ListenerFnParams) {
    for (const [, value] of this.listeners) {
      value(payload);
    }
  }

  public listeners: Map<number, ListenerFn>;
  public listenerId: number;
}
