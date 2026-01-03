import {
  BasicControl_propertiesChangedId,
  BasicControl_valueChangedEventId,
} from "./ControlIDs";
import { ListenerList, type ListenerFnParams } from "./ListenerList";
import type { WebAudioService } from "./WebAudioService";

// bootstrapWebAudioBackend(); /// TODO: Initialization order

/**
 * {@link ToggleState} encapsulates data and callbacks that are synchronised
 * with a {@link WebToggleRelay} object on the backend.
 *
 * Use {@link getToggleState()} to create a {@link ToggleState} object. This
 * object will be synchronised with the {@link WebToggleRelay} backend object
 * that was created using the same unique name.
 *
 */
export class ToggleState {
  public name: string;
  public identifier: string;
  public value: boolean;
  public properties: {
    name?: string;
    parameterIndex?: number;
  };
  public valueChangedEvent: ListenerList;
  public propertiesChangedEvent: ListenerList;

  constructor(name: string) {
    if (
      !(
        window.__WEBAUDIO__ as WebAudioService
      ).initialisationData.__webaudio__toggles.includes(name)
    )
      console.warn(
        "Creating ToggleState for '" +
          name +
          "', which is unknown to the backend"
      );

    this.name = name;
    this.identifier = "__webaudio__toggle" + this.name;
    this.value = false;
    this.properties = {
      name: "",
      parameterIndex: -1,
    };
    this.valueChangedEvent = new ListenerList();
    this.propertiesChangedEvent = new ListenerList();

    window.__WEBAUDIO__.backend!.addEventListener(this.identifier, (event) => {
      if (event)
        this.handleEvent({
          eventType: event.eventType,
          name: event.eventType,
          parameterIndex: event.parameterIndex,
          value: event.value as boolean,
        });
    });

    window.__WEBAUDIO__.backend!.emitEvent(this.identifier, {
      eventType: "requestInitialUpdate",
    } as ListenerFnParams);
  }

  /** Returns the value corresponding to the associated WebToggleRelay's (C++) state. */
  getValue() {
    return this.value;
  }

  /** Informs the backend to change the associated WebToggleRelay's (C++) state. */
  setValue(newValue: typeof this.value) {
    this.value = newValue;

    window.__WEBAUDIO__.backend!.emitEvent(this.identifier, {
      eventType: BasicControl_valueChangedEventId,
      value: this.value,
    });
  }

  /** Internal. */
  handleEvent(event: {
    eventType: string;
    value: boolean;
    name?: string;
    parameterIndex?: number;
  }) {
    if (event.eventType == BasicControl_valueChangedEventId) {
      this.value = event.value;
      this.valueChangedEvent.callListeners(event);
    }
    if (event.eventType == BasicControl_propertiesChangedId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { eventType: _, ...rest } = event;
      this.properties = rest;
      this.propertiesChangedEvent.callListeners(event);
    }
  }
}
