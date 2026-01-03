import { filter, Observable, Subject, Subscription } from "rxjs";
import { Log } from "../lib/Log";
import { BaseSM } from "../Services";
import type { Event } from "./Event";
import { EventType } from "./EventType";
import { ActionEventActions, type Actions, type PlayerData } from "./types";

const DEFAULTS = {
  params: {
    dbg: false,
  } satisfies EventBus.Params,
} as const;

/**
 * The {@link EventBus} class.
 */
class EventBus<Params extends EventBus.Params = EventBus.Params>
  extends BaseSM<Params>
  implements BaseSM<EventBus.Params>
{
  constructor(params?: Partial<Params>) {
    super({ ...DEFAULTS.params, ...params } as Params);
    /// log subscribed events on this event bus
    this._logSubscribedEvents(this.bus);
  }

  /**
   * Over-arching event bus uses a {@link Subject} of type {@link Event}.
   */
  private readonly bus = new Subject<Event>();

  /**
   * Add an {@link Event} to the {@link EventBus} so consumers can subscribe to
   * it.
   *
   * @template {EventType} [T=EventType]
   * @param {EventBus.Payload<T>} payload
   */
  produce<T extends EventType = EventType>(payload: EventBus.Payload<T>): void {
    return this.bus.next(payload.event);
  }

  /**
   * ---
   *
   * Retrieve events in a stream with a certain event type.
   *
   * ---
   *
   * @template {EventType} [T=EventType]
   * @param {T} data
   * @returns {Observable<Event<T>>}
   *
   * ---
   *
   * @example
   * ```ts
   * const pageEvents$ = eventBus.getByType$(EventType.PageEvent);
   *
   * pageEvents$.subscribe(() => {
   *   // ...
   * })
   * ```
   *
   * ---
   *
   */
  getByType$<T extends EventType = EventType>({
    type,
  }: {
    type: T;
  }): Observable<Event<T>> {
    return this.bus.pipe(
      filter((event): event is Event<T> => event.type === type)
    );
  }

  /**
   * ---
   *
   * Retrieve events in a stream with a certain event type.
   *
   * ---
   *
   * @template {Actions} [T=Actions]
   * @param {T} action
   * @returns {Observable<Event>}
   *
   * ---
   *
   * @example
   * ```ts
   * const pageLoaded$ = eventBus.getByAction(PageActions.LOADED);
   *
   * pageLoaded$.subscribe(() => {
   *   // ...
   * });
   * ```
   *
   * ---
   */
  getByAction$<T extends Actions = Actions>(action: T): Observable<Event> {
    return this.bus.pipe(filter((event) => event.data.action === action));
  }

  /// ------------------------------------------------------------------ HELPERS

  /**
   * @template {EventType} [T=EventType]
   * @param {Subject<T>} bus$
   */
  protected _logSubscribedEvents<T extends Event = Event>(
    bus$: Subject<T>
  ): Subscription {
    return bus$.subscribe((event) => {
      const { data } = event;
      return Log.event(...EventBus._parseEventMessage(event), { ...data });
    });
  }

  /**
   * A bit of a hack to get consistent messages from the various {@link Event}
   * types.
   *
   * @template {Event<EventType>} [T=Event<EventType>]
   * @param {T} event
   * @returns {string[]}
   */
  private static readonly _parseEventMessage = <
    T extends Event<EventType> = Event<EventType>,
  >(
    event: T
  ): string[] => {
    switch (true) {
      case this.isEventOfType(event, EventType.ActionEvent):
        return [
          /// impression | click
          event.data.data.is_background
            ? ActionEventActions.IMPRESSION
            : ActionEventActions.CLICK,
          /// campainID
          event.data.action,
          /// format
          typeof event.data.data.format === "object"
            ? `${event.data.data.format.row}:${event.data.data.format.column}`
            : `${event.data.data.format}`,
        ];
      case this.isEventOfType(event, EventType.PageEvent):
        return [
          event.data.action,
          ...[
            event.data.data.component ??
              event.data.data.title ??
              event.data.data.path ??
              "undefined",
          ],
        ];
      case this.isEventOfType(event, EventType.RouterEvent):
        return [event.data.action, ...[event.data.data?.path]];
      case this.isEventOfType(event, EventType.PlayerEvent):
        return [
          event.data.action,
          `${(event.data.data as PlayerData).currentTime}`,
        ];
      case this.isEventOfType(event, EventType.WidgetEvent):
        return [event.data.action, `${event.data.data.component}`];
      case this.isEventOfType(event, EventType.StartUpEvent):
        return [`startup:${event.data.action}`];
      case this.isEventOfType(event, EventType.AppEvent):
      case this.isEventOfType(event, EventType.NetworkEvent):
      case this.isEventOfType(event, EventType.UserEvent):
        return [event.data.action];
      default:
        return [event.constructor.name, event.type];
    }
  };

  /**
   *
   * @param event
   * @param type
   * @returns
   */
  private static isEventOfType<T extends EventType>(
    event: Event<EventType>,
    type: T
  ): event is Event<T> {
    return event.type === type;
  }
}

namespace EventBus {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Params extends BaseSM.Params {}
  export type Payload<T extends EventType = EventType> = { event: Event<T> };
}

export { EventBus };
