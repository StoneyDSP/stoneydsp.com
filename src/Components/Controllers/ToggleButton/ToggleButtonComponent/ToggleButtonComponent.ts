import { Lightning } from "@lightningjs/sdk";
import { FocusableComponent } from "fx-audio-dev";
import { theme } from "../../../../lib";
import { ControlComponent } from "../../../base/ControlComponent/ControlComponent";
import { type ControlDelegate } from "../../ControlDelegate";
import { DefaultControlDelegate } from "../../DefaultControlDelegate";
import type { ToggleControl } from "../../types";

class ToggleButtonComponent<
  Spec extends ToggleButtonComponent.TemplateSpec =
    ToggleButtonComponent.TemplateSpec,
  Config extends ToggleButtonComponent.TypeConfig =
    ToggleButtonComponent.TypeConfig,
  Data extends ToggleButtonComponent.Data = ToggleButtonComponent.Data,
>
  extends ControlComponent<Spec, Config, Data>
  implements
    ControlComponent.ImplementTemplateSpec<ToggleButtonComponent.TemplateSpec>
{
  private readonly _control: ControlDelegate<
    ToggleButtonComponent,
    ToggleControl
  > = new DefaultControlDelegate(this as ToggleButtonComponent);

  static override _template(): ToggleButtonComponent.Template<ToggleButtonComponent.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      // data: undefined,
      collision: true,
      rect: true,
      w: width,
      h: height,
      mw: width,
      mh: height,
      // color: theme.action.primary,
      // Optional: rounded background if you like
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 12,
        fillColor: theme.action.primary,
      },

      // Label
      Label: {
        // w: (w) => w,
        // h: (h) => h,
        x: (x) => x * 0.5,
        y: (y) => y * 0.5,
        mount: 0.5,
        text: {
          text: "", // set in _active()
          fontSize: 28,
          textColor: theme.text.dark.default,
        },
      },

      // State indicator "pill" on right (optional but nice)
      State: {
        w: (w) => w * 0.125,
        h: (h) => h * 0.125,
        mount: -0.75,
        rect: true,
        color: 0xff555555,
        shader: {
          // gets overwritten in _syncVisuals
          type: Lightning.shaders.RoundedRectangle,
          radius: 8,
          fillColor: 0xff555555,
        },
      },
    };
  }

  override _getFocused(): ReturnType<ControlComponent["_getFocused"]> {
    return this as ToggleButtonComponent;
  }

  static override get width() {
    return 400;
  }

  static override get height() {
    return 400;
  }

  override _syncFromControlValue() {
    const label = this.data.label ?? this.data.control?.label ?? "Toggle";
    const on = Boolean(this.getControlValue());

    (this as ToggleButtonComponent)
      .tag("Label")!
      .patch({ text: { text: label } });

    // simple on/off color
    (this as ToggleButtonComponent).tag("State")?.patch({
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 8,
        fillColor: on ? theme.state.success : theme.state.danger,
      },
    });

    // // optional: make whole row brighter when on
    // (this as ToggleButtonComponent).patch({
    //   shader: {
    //     type: Lightning.shaders.RoundedRectangle,
    //     radius: 12,
    //     fillColor: on ? theme.control.thumbActive : theme.control.thumb,
    //   },
    // });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override _handleEnter(_evt: KeyboardEvent): boolean | void {
    return (this as ToggleButtonComponent)._handleToggle();
  }

  override _handleClick(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _target: Parameters<NonNullable<FocusableComponent["_handleClick"]>>[0],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _localCoords: Parameters<NonNullable<FocusableComponent["_handleClick"]>>[1]
  ): ReturnType<NonNullable<FocusableComponent["_handleClick"]>> {
    return (this as ToggleButtonComponent)._handleToggle();
  }

  protected _handleToggle(this: this): boolean | void {
    if (!(this as ToggleButtonComponent)._control.canInteract()) {
      return false;
    }

    const current = this.getControlValue(); /// <--- pull from backend
    const next = !current;

    this._control.begin();
    this._control.change(next);
    this._control.commit(next); /// <--- send to backend

    // DO NOT set local state here; backend subscription will update all instances.

    return true;
  }
}

// Example: ToggleButton
namespace ToggleButtonComponent {
  export interface TemplateSpec extends ControlComponent.TemplateSpec {
    data: Data;
    /**
     * Sets the {@link Signals} for this Component.
     *
     * @remarks
     * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
     * information.
     */
    signals: Signals;

    /**
     * Gets/sets the {@link PassSignals} for this Component.
     *
     * @remarks
     * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
     * for more information.
     */
    passSignals: PassSignals;
    Label: Record<string | symbol, undefined>;
    State: Record<string | symbol, undefined>;
  }

  /**
   * The {@link Signals} type.
   *
   * @remarks
   * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
   * information.
   */
  export type Signals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.PassSignals<Config>;

  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    ControlComponent.NewPatchTemplate<T>;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends ControlComponent.TypeConfig {}
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.Template<Spec>;
  export type Constructor<
    C extends ToggleButtonComponent = ToggleButtonComponent,
  > = ControlComponent.Constructor<C>;
  export interface Data extends ControlComponent.Data {
    readonly label: string;
    control: ToggleControl;
  }
}

export { ToggleButtonComponent as default, ToggleButtonComponent };
