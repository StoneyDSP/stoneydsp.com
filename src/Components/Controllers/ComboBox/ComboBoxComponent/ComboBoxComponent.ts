import { Lightning } from "@lightningjs/sdk";
import type { FocusableComponent } from "fx-audio-dev";
import { theme } from "../../../../lib";
import { ControlComponent } from "../../../base/ControlComponent/ControlComponent";
import type { ControlDelegate } from "../../ControlDelegate";
import { DefaultControlDelegate } from "../../DefaultControlDelegate";
import type { ChoiceControl } from "../../types";

/**
 * Minimal, solid ComboBox:
 * - cycles options on click/enter
 * - left/right changes selection
 * - renders label + selected value
 *
 * No dropdown UI yet: perfect for validating backend contracts first.
 */
class ComboBoxComponent<
  Spec extends ComboBoxComponent.TemplateSpec = ComboBoxComponent.TemplateSpec,
  Config extends ComboBoxComponent.TypeConfig = ComboBoxComponent.TypeConfig,
  Data extends ComboBoxComponent.Data = ComboBoxComponent.Data,
>
  extends ControlComponent<Spec, Config, Data>
  implements
    ControlComponent.ImplementTemplateSpec<ComboBoxComponent.TemplateSpec>
{
  private readonly _control: ControlDelegate<ComboBoxComponent, ChoiceControl> =
    new DefaultControlDelegate(this as ComboBoxComponent);

  static override _template(): ComboBoxComponent.Template<ComboBoxComponent.TemplateSpec> {
    return {
      ...super._template(),
      collision: true,
      rect: true,
      color: 0x00000000,

      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 12,
        fillColor: theme.surface.panel, // tweak as desired
      },

      Label: {
        x: 16,
        y: 10,
        text: {
          text: "",
          fontSize: 20,
          textColor: theme.text.light.default,
        },
      },

      Value: {
        x: 16,
        y: 42,
        text: {
          text: "",
          fontSize: 26,
          textColor: theme.text.light.default,
        },
      },

      Chevron: {
        x: (w: number) => w - 18,
        y: 48,
        mountX: 1,
        text: {
          text: "▾",
          fontSize: 28,
          textColor: theme.text.light.default,
        },
      },
    };
  }

  override _getFocused(): ReturnType<ControlComponent["_getFocused"]> {
    return this as ComboBoxComponent;
  }

  override _active() {
    this._syncFromControlValue();
    return super._active();
  }

  /**
   * Called by your ControlsPanel when backend emits new state.
   * (Or any other parent that patches data.control.state.value)
   */
  protected override _syncFromControlValue() {
    const label = this.data.label ?? this.data.control.label ?? "Choice";
    (this as ComboBoxComponent).tag("Label")!.patch({ text: { text: label } });

    const { valueText } = this._getCurrentValuePresentation();
    (this as ComboBoxComponent)
      .tag("Value")!
      .patch({ text: { text: valueText } });

    this._syncFocusVisuals();
  }

  // ------------------ Interaction ------------------

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override _handleEnter(_evt: KeyboardEvent): boolean | void {
    return this._commitRelative(+1);
  }

  override _handleClick(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _target: Parameters<NonNullable<FocusableComponent["_handleClick"]>>[0],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _localCoords: Parameters<NonNullable<FocusableComponent["_handleClick"]>>[1]
  ): ReturnType<NonNullable<FocusableComponent["_handleClick"]>> {
    return this._commitRelative(+1);
  }

  override _handleRight(): boolean | void {
    return this._commitRelative(+1);
  }

  override _handleLeft(): boolean | void {
    return this._commitRelative(-1);
  }

  // Optional: mirror up/down to keep it friendly on remotes
  override _handleUp(): boolean | void {
    return this._commitRelative(-1);
  }

  override _handleDown(): boolean | void {
    return this._commitRelative(+1);
  }

  private _commitRelative(dir: 1 | -1): boolean | void {
    const flags = this.data.control.flags;
    if (!flags?.enabled || flags?.readOnly) return false;
    if (!this._control.canInteract()) return false;

    const nextId = this._nextEnabledId(dir);
    if (!nextId) return false;

    // optimistic UI, backend will confirm via subscribe
    this._control.begin();
    this._control.change(nextId);
    this._control.commit(nextId);

    this.setControlValue(nextId);
    this._syncFromControlValue();

    return true;
  }

  // ------------------ Helpers ------------------

  private _getOptions() {
    const opts = this.data.control.spec?.options ?? [];
    return Array.isArray(opts) ? opts : [];
  }

  private _getCurrentValuePresentation(): {
    valueId: string;
    valueText: string;
  } {
    const valueIdRaw = this.getControlValue();
    const valueId =
      typeof valueIdRaw === "string" ? valueIdRaw : String(valueIdRaw ?? "");

    const opts = this._getOptions();
    const match = opts.find((o) => o.id === valueId);
    const valueText = match?.label ?? (valueId ? valueId : "—");

    return { valueId, valueText };
  }

  private _nextEnabledId(dir: 1 | -1): string | null {
    const opts = this._getOptions();
    if (opts.length === 0) return null;

    const { valueId } = this._getCurrentValuePresentation();

    let idx = opts.findIndex((o) => o.id === valueId);
    if (idx < 0) idx = 0;

    // loop until we find an enabled option (or give up)
    for (let i = 0; i < opts.length; i++) {
      idx = (idx + dir + opts.length) % opts.length;
      const candidate = opts[idx];
      if (!candidate.disabled) return candidate.id;
    }

    return null;
  }

  private _syncFocusVisuals() {
    // Subtle focus tint; optional.
    const focused = this.hasFocus?.() ?? false;
    const flags = this.data.control.flags;
    const disabled = !flags.enabled || flags.readOnly;

    (this as ComboBoxComponent).patch({
      // e.g. tint background and/or lower alpha:
      alpha: disabled ? 0.5 : 1,
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 12,
        fillColor: focused ? theme.action.primary : theme.surface.panel,
      },
    });

    // Keep text legible if your theme has light/dark differences
    const textColor = focused ? theme.text.dark.default : theme.text.dark.muted;

    (this as ComboBoxComponent).tag("Label")?.patch({
      text: { textColor },
    });
    (this as ComboBoxComponent).tag("Value")?.patch({
      text: { textColor },
    });
    (this as ComboBoxComponent).tag("Chevron")?.patch({
      text: { textColor },
    });
  }

  // Focus callbacks (optional)
  override _focus(
    newFocusedComponent: Parameters<ControlComponent["_focus"]>[0],
    prevFocusedComponent: Parameters<ControlComponent["_focus"]>[1]
  ) {
    this._syncFromControlValue();
    return super._focus(newFocusedComponent, prevFocusedComponent);
  }

  override _unfocus(
    newFocusedComponent: Parameters<ControlComponent["_unfocus"]>[0],
    prevFocusedComponent: Parameters<ControlComponent["_unfocus"]>[1]
  ) {
    this._syncFromControlValue();
    return super._unfocus(newFocusedComponent, prevFocusedComponent);
  }
}

declare namespace ComboBoxComponent {
  export interface TemplateSpec extends ControlComponent.TemplateSpec {
    data: Data;
    signals: Signals;
    passSignals: PassSignals;
    Label: Record<string | symbol, undefined>;
    Value: Record<string | symbol, undefined>;
    Chevron: Record<string | symbol, undefined>;
  }

  export type Signals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.Signals<Config>;

  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.PassSignals<Config>;

  export type NewPatchTemplate<T extends Constructor> =
    ControlComponent.NewPatchTemplate<T>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends ControlComponent.TypeConfig {}

  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.ImplementTemplateSpec<Spec>;

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.Template<Spec>;

  export type Constructor<C extends ComboBoxComponent = ComboBoxComponent> =
    ControlComponent.Constructor<C>;

  export interface Data extends ControlComponent.Data {
    readonly label: string;
    control: ChoiceControl;
  }
}

export { ComboBoxComponent };
