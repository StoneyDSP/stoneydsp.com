import {
  BasicControl_propertiesChangedId,
  BasicControl_valueChangedEventId,
  SliderControl_sliderDragEndedEventId,
  SliderControl_sliderDragStartedEventId,
} from "./ControlIDs";
import { ListenerList, type ListenerFnParams } from "./ListenerList";
import type { WebAudioService } from "./WebAudioService";

// bootstrapWebAudioBackend(); /// TODO: Initialization order

/**
 * {@link SliderState} encapsulates data and callbacks that are synchronised
 * with a WebSliderRelay object on the backend.
 *
 * Use {@link getSliderState()} to create a {@link SliderState} object. This
 * object will be synchronised with the WebSliderRelay backend object that was
 * created using the same unique name.
 *
 */
export class SliderState {
  public name: string;
  public identifier: string;
  public scaledValue: number;
  public properties: {
    start?: number;
    end?: number;
    skew?: number;
    name?: string;
    label?: string;
    numSteps?: number;
    interval?: number;
    parameterIndex?: number;
  };
  public valueChangedEvent: ListenerList;
  public propertiesChangedEvent: ListenerList;

  constructor(name: string) {
    if (
      !(
        window.__WEBAUDIO__ as WebAudioService
      ).initialisationData.__webaudio__sliders.includes(name)
    )
      console.warn(
        "Creating SliderState for '" +
          name +
          "', which is unknown to the backend"
      );

    this.name = name;
    this.identifier = "__webaudio__slider" + this.name;
    this.scaledValue = 0;
    this.properties = {
      start: 0,
      end: 1,
      skew: 1,
      name: "",
      label: "",
      numSteps: 100,
      interval: 0,
      parameterIndex: -1,
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
   * Sets the normalised value of the corresponding backend parameter.
   *
   * This value is always in the [0, 1] range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * AudioProcessorParameter::getValue() (C++).
   *
   */
  setNormalisedValue(newValue: typeof this.scaledValue) {
    this.scaledValue = this.snapToLegalValue(
      this.normalisedToScaledValue(newValue)
    );

    (window.__WEBAUDIO__ as WebAudioService).backend.emitEvent(
      this.identifier,
      {
        eventType: BasicControl_valueChangedEventId,
        value: this.scaledValue,
      }
    );
  }

  /**
   * This function should be called first thing when the user starts interacting
   * with the slider.
   */
  sliderDragStarted() {
    (window.__WEBAUDIO__ as WebAudioService).backend.emitEvent(
      this.identifier,
      {
        eventType: SliderControl_sliderDragStartedEventId,
      } as ListenerFnParams
    );
  }

  /**
   * This function should be called when the user finished the interaction with
   * the slider.
   */
  sliderDragEnded() {
    (window.__WEBAUDIO__ as WebAudioService).backend.emitEvent(
      this.identifier,
      {
        eventType: SliderControl_sliderDragEndedEventId,
      } as ListenerFnParams
    );
  }

  /** Internal. */
  handleEvent(event: {
    eventType: string;
    value: number;
    name?: string;
    parameterIndex?: number;
  }) {
    if (event.eventType == BasicControl_valueChangedEventId) {
      this.scaledValue = event.value;
      this.valueChangedEvent.callListeners();
    }
    if (event.eventType == BasicControl_propertiesChangedId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { eventType: _, ...rest } = event;
      this.properties = rest;
      this.propertiesChangedEvent.callListeners();
    }
  }

  /**
   * Returns the scaled value of the parameter. This corresponds to the return
   * value of NormalisableRange::convertFrom0to1() (C++).
   *
   * This value will differ from a linear [0, 1] range if a non-default
   * NormalisableRange was set for the parameter.
   */
  getScaledValue(): number {
    return this.scaledValue;
  }

  /**
   * Returns the normalised value of the corresponding backend parameter. This
   * value is always in the [0, 1] range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * AudioProcessorParameter::getValue() (C++).
   *
   */
  getNormalisedValue(): number {
    return Math.pow(
      (this.scaledValue - this.properties.start!) /
        (this.properties.end! - this.properties.start!),
      this.properties.skew!
    );
  }

  /** Internal. */
  normalisedToScaledValue(normalisedValue: number) {
    return (
      Math.pow(normalisedValue, 1 / this.properties.skew!) *
        (this.properties.end! - this.properties.start!) +
      this.properties.start!
    );
  }

  /** Internal. */
  snapToLegalValue(value: number) {
    const interval = this.properties.interval!;

    if (interval == 0) return value;

    const start = this.properties.start!;
    const clamp = (val: number, min = 0, max = 1) =>
      Math.max(min, Math.min(max, val));

    return clamp(
      start + interval * Math.floor((value - start) / interval + 0.5),
      this.properties.start,
      this.properties.end
    );
  }
}
