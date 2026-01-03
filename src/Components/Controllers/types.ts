/// ------------------------------------------------------------------- CONTROL

export type ControlValue = boolean | number | string;

// A structured address that supports iteration patterns like multi-band EQ.
// Keep it implementation-agnostic: it's just an address.
export declare type ControlAddress =
  | string
  | {
      namespace: string; // e.g. "track.1.eq"
      key: string; // e.g. "band.3.enabled" or "band.3.gain"
      // Optional extra segmentation if you want it later:
      // parts?: readonly string[];
    };

/// -----------------

export declare interface ControlFlags {
  enabled: boolean;
  readOnly: boolean;
  // future: visible?: boolean;
}

export declare interface ControlBase {
  address: ControlAddress;
  flags: ControlFlags;
  state: { value: ControlValue };
  /**
   * Optional override label; otherwise use data.label as the semantic label.
   */
  label?: string;
}

/// *CONTROL

export declare type ToggleControl = ControlBase & {
  kind: "toggle";
  state: { value: boolean };
  spec?: {
    // optional UI hints only
    onLabel?: string;
    offLabel?: string;
  };
};

export declare type SliderControl = ControlBase & {
  kind: "slider";
  state: { value: number };
  spec: {
    range: { min: number; max: number }; // optional, default 0..1
    step?: number;
    /**
     * UI intent for how to interpret/display the range.
     * Backends can map however they like.
     */
    scale?: "linear" | "log" | "exp";
    unit?: string; // "dB", "Hz", "%", etc.
    display?: { decimals?: number };

    /**
     * UI mapping hints
     */
    axis?: "x" | "y"; // default "y"
    polarity?: 1 | -1; // default -1 (up increases)
    /**
     * Sensitivity:
     * - "track" => drag full travel == 1.0
     * - { pixelsPerUnit } => explicit pixel mapping
     */
    sensitivity?: "track" | { pixelsPerUnit: number };

    /**
     * Fine adjust:
     * Multiply pixelsPerUnit by this when modifier is held.
     * Example: 6 => 6x finer.
     */
    fineMultiplier?: number; // default 6
    // pixelsPerUnit?: number; // default 200 (full sweep)
    // sensitivity?: "track" | { pixelsPerUnit: number };
  };
};

export declare type ChoiceOption = {
  id: string; // stable ID
  label: string; // display label
  disabled?: boolean;
};

export declare type ChoiceControl = ControlBase & {
  kind: "choice";
  state: { value: string }; // selected option id
  spec: {
    options: readonly ChoiceOption[];
    // future: allowCustom?: boolean;
  };
};

export declare type Control = ToggleControl | SliderControl | ChoiceControl;

// // Example: ToggleButton
// namespace ToggleButtonComponent {
//   export interface Data extends ButtonComponent.Data {
//     control: ToggleControl;
//   }
// }

// // Example: Slider (base for Fader/Knob)
// namespace SliderComponent {
//   export interface Data extends ButtonComponent.Data {
//     control: SliderControl;
//   }
// }

// // Example: ComboBox
// namespace ComboBoxComponent {
//   export interface Data extends ButtonComponent.Data {
//     control: ChoiceControl;
//   }
// }
