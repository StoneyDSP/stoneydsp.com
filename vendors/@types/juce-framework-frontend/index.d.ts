/* eslint-disable @typescript-eslint/no-explicit-any */

/*
  ==============================================================================

   This file is part of the JUCE framework.
   Copyright (c) Raw Material Software Limited

   JUCE is an open source framework subject to commercial or open source
   licensing.

   By downloading, installing, or using the JUCE framework, or combining the
   JUCE framework with any other source code, object code, content or any other
   copyrightable work, you agree to the terms of the JUCE End User Licence
   Agreement, and all incorporated terms including the JUCE Privacy Policy and
   the JUCE Website Terms of Service, as applicable, which will bind you. If you
   do not agree to the terms of these agreements, we will not license the JUCE
   framework to you, and you must discontinue the installation or download
   process and cease use of the JUCE framework.

   JUCE End User Licence Agreement: https://juce.com/legal/juce-8-licence/
   JUCE Privacy Policy: https://juce.com/juce-privacy-policy
   JUCE Website Terms of Service: https://juce.com/juce-website-terms-of-service/

   Or:

   You may also use this code under the terms of the AGPLv3:
   https://www.gnu.org/licenses/agpl-3.0.en.html

   THE JUCE FRAMEWORK IS PROVIDED "AS IS" WITHOUT ANY WARRANTY, AND ALL
   WARRANTIES, WHETHER EXPRESSED OR IMPLIED, INCLUDING WARRANTY OF
   MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED.

  ==============================================================================
*/
import type { ListenerList } from "./check_native_interop";

// declare type PromiseResolveFn<T = any> = (value: any) => T;
// declare type PromiseRejectFn<E = any> = (reason?: E) => void;
// declare type PromiseHandlers = {
//     resolve: PromiseResolveFn<any>;
//     reject: PromiseRejectFn;
// }
// declare class PromiseHandler {
//   createPromise<T>(): NativeFunctionReturn<T>[];
//   lastPromiseId: number;
//   promises: Map<number, PromiseHandlers>
// }
// declare const toggleStates: Map<any, any>;
// declare const sliderStates: Map<any, any>;
declare type NativeFunctionReturn<T = any> = number | Promise<T>;
declare type NativeFunction<T = any> = (...args: any[]) => NativeFunctionReturn<T>;
/**
 * Returns a function object that calls a function registered on the JUCE
 * backend and forwards all parameters to it.
 *
 * The provided name should be the same as the name argument passed to
 * `WebBrowserComponent::Options.withNativeFunction()` on the backend.
 *
 * @param {string} name
 */
export declare function getNativeFunction<
  Params = any,
  ReturnType extends NativeFunction<Params> = NativeFunction<Params>
>(name: string): (args: Params) => NativeFunctionReturn<ReturnType>;

// declare const BasicControl_valueChangedEventId: string; // "valueChanged";
// declare const BasicControl_propertiesChangedId: string; // "propertiesChanged";
// declare const SliderControl_sliderDragStartedEventId: string; // "sliderDragStarted";
// declare const SliderControl_sliderDragEndedEventId: string; // "sliderDragEnded";

/**
 * SliderState encapsulates data and callbacks that are synchronised with a
 * `WebSliderRelay` object on the backend.
 *
 * Use `getSliderState()` to create a `SliderState` object. This object will be
 * synchronised with the `WebSliderRelay` backend object that was created using
 * the same unique name.
 */
declare class SliderState {
  constructor(name: string);
  name: string;
  identifier: string;
  scaledValue: number;
  properties: {
      start: number,
      end: number,
      skew: number,
      name: string,
      label: string,
      numSteps: number
      interval: number
      parameterIndex: number
    };
  valueChangedEvent: ListenerList;
  propertiesChangedEvent: ListenerList;
  /**
   * Sets the normalised value of the corresponding backend parameter. This
   * value is always in the `[0, 1]` range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * `AudioProcessorParameter::getValue()` (C++).
   */
  setNormalisedValue(newValue: number): void;

  /**
   * This function should be called first thing when the user starts interacting
   * with the slider.
   */
  sliderDragStarted(): void;

  /** Internal. */
  // handleEvent(event): void;

  /**
   * Returns the scaled value of the parameter. This corresponds to the return
   * value of `NormalisableRange::convertFrom0to1()` (C++). This value will
   * differ from a linear `[0, 1]` range if a non-default NormalisableRange was
   * set for the parameter.
   */
  getScaledValue(): number;

  /**
   * Returns the normalised value of the corresponding backend parameter. This
   * value is always in the `[0, 1]` range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * `AudioProcessorParameter::getValue()` (C++).
   */
  getNormalisedValue(): number;

  // /** Internal. */
  // normalisedToScaledValue(normalisedValue: number): number;

  // /** Internal. */
  // snapToLegalValue(value: number): number;
}
/**
 * Returns a {@link SliderState} object that is connected to the backend
 * `WebSliderRelay` object that was created with the same name argument.
 *
 * To register a `WebSliderRelay` object create one with the right name and add
 * it to the `WebBrowserComponent::Options` struct using `withOptionsFrom`.
 */
export declare function getSliderState(name: string): SliderState;
/**
 * {@link ToggleState} encapsulates data and callbacks that are synchronised
 * with a `WebToggleRelay` object on the backend.
 *
 * Use `getToggleState()` to create a {@link ToggleState} object. This object
 * will be synchronised with the `WebToggleRelay` backend object that was
 * created using the same unique name.
 */
declare class ToggleState {
  constructor(name: string);
  name: string;
  identifier: string;
  value: boolean;
  properties: {
    name: string,
    parameterIndex: number,
  };
  valueChangedEvent: ListenerList;
  propertiesChangedEvent: ListenerList;
}
/**
 * Returns a {@link ToggleState} object that is connected to the backend
 * `WebToggleButtonRelay` object that was created with the same name argument.
 *
 * To register a `WebToggleButtonRelay` object create one with the right name
 * and add it to the `WebBrowserComponent::Options` struct using
 * `withOptionsFrom`.
 */
export declare function getToggleState(name: string): ToggleState;
/**
 * `ComboBoxState` encapsulates data and callbacks that are synchronised with a
 * `WebComboBoxRelay` object on the backend.
 *
 * Use `getComboBoxState()` to create a `ComboBoxState` object. This object will
 * be synchronised with the `WebComboBoxRelay` backend object that was created
 * using the same unique name.
 */
declare class ComboBoxState {
  constructor(name: string);
  name: string;
  identifier: string;
  value: number;
  properties: {
    name: string,
    parameterIndex: number,
    choices: unknown[],
  };
  valueChangedEvent: ListenerList;
  propertiesChangedEvent: ListenerList;
  /**
   * Returns the value corresponding to the associated `WebComboBoxRelay`'s
   * (C++) state.
   *
   * This is an index identifying which element of the `properties.choices`
   * array is currently selected.
   */
  getChoiceIndex(): number;
  /**
   * Informs the backend to change the associated `WebComboBoxRelay`'s (C++)
   * state.
   *
   * This should be called with the index identifying the selected element from
   * the `properties.choices` array.
   */
  setChoiceIndex(index: number): void;
  // /** Internal. */
  // handleEvent(event): void;
}
/**
 * Returns a {@link ComboBoxState} object that is connected to the backend
 * `WebComboBoxRelay` object that was created with the same name argument.
 *
 * To register a `WebComboBoxRelay` object create one with the right name and
 * add it to the `WebBrowserComponent::Options` struct using `withOptionsFrom`.
 */
export declare function getComboBoxState(name: string): ComboBoxState;
/**
 * Appends a platform-specific prefix to the path to ensure that a request sent
 * to this address will be received by the backend's `ResourceProvider`.
 */
export declare function getBackendResourceAddress(path: string): string;
/**
 * This helper class is intended to aid the implementation of
 * `AudioProcessorEditor::getControlParameterIndex()` for editors using a
 * WebView interface.
 *
 * Create an instance of this class and call its' `handleMouseMove()` method in
 * each mousemove event.
 *
 * This class can be used to continuously report the
 * `controlParameterIndexAnnotation` attribute's value related to the DOM
 * element that is currently under the mouse pointer.
 *
 * This value is defined at all times as follows
 * * the annotation attribute's value for the DOM element directly under the
 *   mouse, if it has it,
 * * the annotation attribute's value for the first parent element, that has it,
 * * -1 otherwise.
 *
 * Whenever there is a change in this value, an event is emitted to the frontend
 * with the new value.
 *
 * You can use a `ControlParameterIndexReceiver` object on the backend to listen
 * to these events.
 */
export declare class ControlParameterIndexUpdater {
    constructor(controlParameterIndexAnnotation: string);
    controlParameterIndexAnnotation: string;
    lastElement: Element | null;
    lastControlParameterIndex: number | null;
    handleMouseMove(event: MouseEvent): void;
}

export type { ComboBoxState, SliderState, ToggleState };

/* eslint-enable @typescript-eslint/no-explicit-any */
