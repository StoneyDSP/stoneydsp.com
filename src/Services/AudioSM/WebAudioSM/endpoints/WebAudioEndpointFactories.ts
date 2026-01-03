import {
  ComboBoxState,
  getComboBoxState,
  getSliderState,
  getToggleState,
  SliderState,
  ToggleState,
} from "web-audio-api";
import type { ControlValue } from "../../../../Components/Controllers/types";
import { clamp01 } from "../../../../lib/clamp01";
import { controlAddressToName } from "../../../../lib/controlAddressToName";
import type { ControlEndpoint, ControlSpec } from "../../../../scenes/types";

/**
 * Vendor factories for WebAudio. These bind ControlSpec → ControlEndpoint,
 * using your WebAudio Backend + *State classes.
 */
export function createWebEndpointFactories(
  emit: (address: ControlSpec["address"], value: ControlValue) => void
) {
  return {
    toggle: (
      spec: Extract<ControlSpec, { kind: "toggle" }>
    ): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const t: ToggleState = getToggleState(name);

      const token = t.valueChangedEvent.addListener(() => {
        emit(spec.address, Boolean(t.getValue()));
      });

      return {
        get: () => Boolean(t.getValue()),
        set: (v) => {
          t.setValue(Boolean(v));
          // IMPORTANT: don't emit here; let the valueChangedEvent be authoritative
        },
        dispose: () => t.valueChangedEvent.removeListener(token),
      };
    },

    slider: (
      spec: Extract<ControlSpec, { kind: "slider" }>
    ): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const s: SliderState = getSliderState(name);

      const read = () => {
        // Prefer normalised if available
        if (typeof s.getNormalisedValue === "function")
          return clamp01(Number(s.getNormalisedValue()));
        if (typeof s.getScaledValue === "function")
          return Number(s.getScaledValue());
        return 0;
      };

      const write = (n: number) => {
        // Prefer normalised writes if supported
        if (typeof s.setNormalisedValue === "function") {
          s.setNormalisedValue(clamp01(n));
          return;
        }
        // if (typeof s.setScaledValue === "function") {
        //   s.setScaledValue(n);
        //   return;
        // }
      };

      const token = s.valueChangedEvent.addListener(() => {
        emit(spec.address, read());
      });

      return {
        get: () => read(),
        set: (v) => {
          const n = typeof v === "number" ? v : Number(v);
          if (!Number.isFinite(n)) return;
          write(n);
          // no emit; authoritative path is valueChangedEvent
        },
        dispose: () => s.valueChangedEvent.removeListener(token),
      };
    },

    combo: (spec: Extract<ControlSpec, { kind: "combo" }>): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const c: ComboBoxState = getComboBoxState(name);

      const token = c.valueChangedEvent.addListener(() => {
        emit(spec.address, String(c.getChoiceIndex()));
      });

      return {
        get: () => String(c.getChoiceIndex()),
        set: (v) => {
          const idx = typeof v === "number" ? v : Number(v);
          if (!Number.isFinite(idx)) return;
          c.setChoiceIndex(idx);
        },
        dispose: () => c.valueChangedEvent.removeListener(token),
      };
    },
  };
}
