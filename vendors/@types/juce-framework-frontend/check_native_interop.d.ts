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

// declare type JUCEPostMessage = () => void;

declare interface JUCE {
  getAndroidUserScripts?: (() => void) | undefined;
  initialisationData: {
    __juce__platform: never[];
    __juce__functions: never[];
    __juce__registeredGlobalEventIds: never[];
    __juce__sliders: never[];
    __juce__toggles: never[];
    __juce__comboBoxes: never[];
  };
  backend: Backend;
}

declare global {
  interface Window {
    __JUCE__: JUCE;
    inAndroidUserScriptEval?: boolean | undefined;
  }
}

declare type Payload = Record<string|symbol|number, unknown>;
declare type Callback = (args?: any) => any;

declare class ListenerList {
  constructor();
  listeners: Map<number, Callback>;
  listenerId : number;
  addListener<T extends Callback>(fn: T): number;
  removeListener(id: number): void;
  callListeners(payload: Payload): void;
}

declare class EventListenerList {
  constructor();
  eventListeners: Map<string, ListenerList>;
  addEventListener(eventId: string, fn: Callback): Map<string, number>;
  removeEventListener([eventId, id]: Map<string, number>): void;
  emitEvent(eventId: string, payload: Payload): void;
}

declare class Backend {
  constructor();
  listeners: EventListenerList;
  addEventListener(eventId: string, fn: Callback): (string | number)[];
  removeEventListener([eventId, id]: Map<string, number>): void;
  emitEvent(eventId: string, payload: Payload): void;
  emitByBackend(eventId: string, payload: Payload): void;
}

export type { EventListenerList, JUCE, ListenerList };

/* eslint-enable @typescript-eslint/no-explicit-any */
