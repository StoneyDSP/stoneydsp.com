import {
  getComboBoxState,
  getSliderState,
  getToggleState,
  SliderState,
  type ComboBoxState,
} from "web-audio-api";
import type { ControlValue } from "../../../../Components/Controllers/types";
import { clamp01 } from "../../../../lib/clamp01";
import type { ControlEndpoint } from "../../../../scenes/types";

/**
 * Toggle endpoint backed by Web API
 */
export function webToggleEndpoint(
  name: string,
  emit: (v: boolean) => void
): ControlEndpoint {
  const t = getToggleState(name)!;

  // subscribe to backend updates (automation, reopen, etc.)
  const token = t.valueChangedEvent.addListener(() => emit(t.getValue()));

  return {
    get: () => t.getValue(),
    set: (v) => {
      const b = Boolean(v);
      t.setValue(b);
      // no emit here; let backend callback be authoritative
    },
    dispose: () => {
      t.valueChangedEvent.removeListener(token);
    },
  };
}

/**
 * Slider endpoint backed by Web API
 */
export function webSliderEndpoint(
  name: string,
  emit: (v01: number) => void
): ControlEndpoint {
  const s: SliderState = getSliderState(name)!;

  const token = s.valueChangedEvent.addListener(() =>
    emit(s.getNormalisedValue())
  );

  return {
    get: () => s.getNormalisedValue(),
    set: (v) => {
      const n = typeof v === "number" ? v : 0;
      s.setNormalisedValue(clamp01(n));
    },
    dispose: () => {
      s.valueChangedEvent.removeListener(token);
    },
  };
}

/**
 * Combo endpoint backed by Web API.
 * Value is the selected choice *string* (we map to/from choice index).
 */
export function webComboEndpoint(
  name: string,
  emit: (choice: string) => void
): ControlEndpoint {
  const c: ComboBoxState = getComboBoxState(name);

  const readChoice = () => {
    const idx = c.getChoiceIndex();
    const choices: string[] =
      (c.properties?.choices as Array<string> | undefined) ?? [];
    return choices[idx] ?? "";
  };

  const token = c.valueChangedEvent.addListener(() => emit(readChoice()));

  return {
    get: () => readChoice(),
    set: (v: ControlValue) => {
      const choice = typeof v === "string" ? v : "";
      const choices: string[] =
        (c.properties?.choices as Array<string> | undefined) ?? [];
      const idx = choices.indexOf(choice);
      if (idx >= 0) c.setChoiceIndex(idx);
      // again: let backend callback emit
    },
    dispose: () => {
      c.valueChangedEvent.removeListener(token);
    },
  };
}
