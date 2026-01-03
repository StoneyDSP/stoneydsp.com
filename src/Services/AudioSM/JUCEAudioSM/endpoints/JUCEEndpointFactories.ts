import * as JUCE from "juce-framework-frontend";
import { clamp01 } from "../../../../lib/clamp01";
import { controlAddressToName } from "../../../../lib/controlAddressToName";
import type { ControlEndpoint, ControlSpec } from "../../../../scenes/types";

export function createJuceEndpointFactories(
  emit: (
    address: ControlSpec["address"],
    value: boolean | number | string
  ) => void
) {
  return {
    toggle: (
      spec: Extract<ControlSpec, { kind: "toggle" }>
    ): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const t = JUCE.getToggleState(name);

      const token = t.valueChangedEvent.addListener(() => {
        emit(spec.address, Boolean(t.getValue()));
      });

      return {
        get: () => Boolean(t.getValue()),
        set: (v) => t.setValue(Boolean(v)),
        dispose: () => t.valueChangedEvent.removeListener(token),
      };
    },

    slider: (
      spec: Extract<ControlSpec, { kind: "slider" }>
    ): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const s = JUCE.getSliderState(name);

      const token = s.valueChangedEvent.addListener(() => {
        emit(spec.address, clamp01(Number(s.getNormalisedValue())));
      });

      return {
        get: () => clamp01(Number(s.getNormalisedValue())),
        set: (v) =>
          s.setNormalisedValue(clamp01(typeof v === "number" ? v : Number(v))),
        dispose: () => s.valueChangedEvent.removeListener(token),
      };
    },

    combo: (spec: Extract<ControlSpec, { kind: "combo" }>): ControlEndpoint => {
      const name = controlAddressToName(spec.address);
      const c = JUCE.getComboBoxState(name);

      const toId = (idx: number): string => spec.choices[idx]?.id ?? "";
      const toIndex = (id: string): number =>
        Math.max(
          0,
          spec.choices.findIndex((x) => x.id === id)
        );

      const token = c.valueChangedEvent.addListener(() => {
        emit(spec.address, toId(c.getChoiceIndex()));
      });

      return {
        get: () => toId(c.getChoiceIndex()),
        set: (v) => {
          const id = String(v);
          const idx = toIndex(id);
          if (idx >= 0) c.setChoiceIndex(idx);
        },
        dispose: () => c.valueChangedEvent.removeListener(token),
      };
    },
  };
}
