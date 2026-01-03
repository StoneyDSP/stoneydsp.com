import { getAppData } from "../../../AppData";
import { Container } from "../../../Container";
import type {
  Control,
  ControlAddress,
  ControlValue,
} from "../../Controllers/types";
import { Draggable } from "../Draggable/Draggable";

abstract class ControlComponent<
  Spec extends ControlComponent.TemplateSpec = ControlComponent.TemplateSpec,
  Config extends ControlComponent.TypeConfig = ControlComponent.TypeConfig,
  Data extends ControlComponent.Data = ControlComponent.Data,
>
  extends Draggable<Spec, Config, Data>
  implements Draggable.ImplementTemplateSpec<ControlComponent.TemplateSpec>
{
  static override get width() {
    return 400;
  }

  static override get height() {
    return 400;
  }

  /**
   * Used internally to clear `_subscriptions`
   */
  protected _unsubscribeFn?: () => void;

  override _active(): void {
    const audio = getAppData().container.get({
      token: Container.Token.AudioSM,
    });

    const address = this.data.control.address;

    // ensure no duplicate subscription if Lightning re-activates
    this._unsubscribeFn?.();
    this._unsubscribeFn = audio.subscribe(address, (v) => {
      // backend is source of truth
      this.setControlValue(v);
      this._syncFromControlValue();
    });

    // update visuals — whatever we ToggleButton currently does
    // e.g. patch a tag/shader, or call our existing internal method:
    this._syncFromControlValue?.(); // if we have one

    return super._active();
  }

  override _inactive() {
    this._unsubscribeFn?.();
    this._unsubscribeFn = undefined;
    return super._inactive();
  }

  /**
   * ---
   * For control-based components only.
   *
   * Immutable update so Lightning notices changes!
   */
  public setControlValue(nextValue: ControlValue) {
    const d = this.data;
    if (!d?.control?.state) return;

    this.setData({
      ...d,
      control: {
        ...d.control,
        state: {
          ...d.control.state,
          value: nextValue,
        },
      },
    });
  }

  public getControlValue(): ControlValue {
    return this.data?.control?.state?.value;
  }

  /**
   * Subclasses implement this to patch shaders/text/thumb position etc
   * based on current this.data.control.state.value
   */
  protected abstract _syncFromControlValue(): void;
}

declare namespace ControlComponent {
  export interface TemplateSpec extends Draggable.TemplateSpec {
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
  }

  /**
   * The {@link Signals} type.
   *
   * @remarks
   * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
   * information.
   */
  export type Signals<Config extends TypeConfig = TypeConfig> =
    Draggable.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    Draggable.PassSignals<Config>;

  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    Draggable.NewPatchTemplate<T>;

  export interface TypeConfig extends Draggable.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends Draggable.EventMap {}

  /**
   *
   */

  export interface SignalMap extends Draggable.SignalMap {
    onControlBegin(payload: { address: ControlAddress; label: string }): void;
    onControlChange(payload: {
      address: ControlAddress;
      label: string;
      value: ControlValue;
    }): void;
    onControlCommit(payload: {
      address: ControlAddress;
      label: string;
      value: ControlValue;
    }): void;
  }

  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    Draggable.ImplementTemplateSpec<Spec>;

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    Draggable.Template<Spec>;
  export type Constructor<C extends ControlComponent = ControlComponent> =
    Draggable.Constructor<C>;

  export interface Data extends Draggable.Data {
    /**
     *
     */
    control: Control;
  }
}

export { ControlComponent };
