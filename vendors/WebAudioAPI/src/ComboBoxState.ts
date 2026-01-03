import {
  BasicControl_propertiesChangedId,
  BasicControl_valueChangedEventId,
} from "./ControlIDs";
import { ListenerList, type ListenerFnParams } from "./ListenerList";
import type { WebAudioService } from "./WebAudioService";

// bootstrapWebAudioBackend(); /// TODO: Initialization order

/**
 * ComboBoxState encapsulates data and callbacks that are synchronised with a WebComboBoxRelay object
 * on the backend.
 *
 * Use getComboBoxState() to create a ComboBoxState object. This object will be synchronised with the
 * WebComboBoxRelay backend object that was created using the same unique name.
 *
 */
export class ComboBoxState {
  public name: string;
  public identifier: string;
  public value: number;
  public properties: {
    name?: string;
    parameterIndex?: number;
    choices?: Array<string>;
  };
  public valueChangedEvent: ListenerList;
  public propertiesChangedEvent: ListenerList;

  constructor(name: string) {
    if (
      !(
        window.__WEBAUDIO__ as WebAudioService
      ).initialisationData.__webaudio__comboBoxes.includes(name)
    )
      console.warn(
        "Creating ComboBoxState for '" +
          name +
          "', which is unknown to the backend"
      );

    this.name = name;
    this.identifier = "__webaudio__comboBox" + this.name;
    this.value = 0.0;
    this.properties = {
      name: "",
      parameterIndex: -1,
      choices: [],
    };
    this.valueChangedEvent = new ListenerList();
    this.propertiesChangedEvent = new ListenerList();

    (window.__WEBAUDIO__ as WebAudioService).backend.addEventListener(
      this.identifier,
      (event) => {
        if (event)
          this.handleEvent({
            eventType: event.eventType,
            name: event.name,
            parameterIndex: event.parameterIndex,
            value: event.value as number,
          });
      }
    );

    (window.__WEBAUDIO__ as WebAudioService).backend.emitEvent(
      this.identifier,
      {
        eventType: "requestInitialUpdate",
      } as ListenerFnParams
    );
  }

  /**
   * Returns the value corresponding to the associated WebComboBoxRelay's (C++) state.
   *
   * This is an index identifying which element of the properties.choices array is currently
   * selected.
   */
  getChoiceIndex() {
    return Math.round(
      this.value * ((this.properties.choices?.length ?? 0) - 1)
    );
  }

  /**
   * Informs the backend to change the associated WebComboBoxRelay's (C++) state.
   *
   * This should be called with the index identifying the selected element from the
   * properties.choices array.
   */
  setChoiceIndex(index: number) {
    const numItems = this.properties.choices?.length ?? 0;
    this.value = numItems > 1 ? index / (numItems - 1) : 0.0;

    window.__WEBAUDIO__.backend.emitEvent(this.identifier, {
      eventType: BasicControl_valueChangedEventId,
      value: this.value,
    });
  }

  /** Internal. */
  handleEvent(event: {
    eventType: string;
    value: number;
    name?: string;
    parameterIndex?: number;
  }) {
    if (event.eventType == BasicControl_valueChangedEventId) {
      this.value = event.value;
      this.valueChangedEvent.callListeners();
    }
    if (event.eventType == BasicControl_propertiesChangedId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { eventType: _, ...rest } = event;
      this.properties = rest;
      this.propertiesChangedEvent.callListeners();
    }
  }
}
