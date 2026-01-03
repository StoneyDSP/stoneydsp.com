/// -------------------------------------------------------------------- IMPORTS

import { BasePageComponent } from "../BasePageComponent/BasePageComponent";
import { PressableComponent } from "../PressableComponent/PressableComponent";

/// ---------------------------------------------------------------------- CLASS

/**
 * ---
 * The {@link BaseWidgetComponent} abstract class; extend from this class to make
 * a new {@link BaseWidgetComponent} sub-class.
 *
 * ---
 * @abstract
 * @class
 * @template {BaseWidgetComponent.TemplateSpec} [Spec=BaseWidgetComponent.TemplateSpec]
 * @template {BaseWidgetComponent.TypeConfig} [Config=BaseWidgetComponent.TypeConfig]
 * @extends {PressableComponent<Spec, Config>}
 * @implements {BaseWidgetComponent.ImplementTemplateSpec<BaseWidgetComponent.TemplateSpec>}
 */
abstract class BaseWidgetComponent<
  Spec extends BaseWidgetComponent.TemplateSpec =
    BaseWidgetComponent.TemplateSpec,
  Config extends BaseWidgetComponent.TypeConfig =
    BaseWidgetComponent.TypeConfig,
  Data extends BaseWidgetComponent.Data = BaseWidgetComponent.Data,
>
  extends PressableComponent<Spec, Config, Data>
  implements
    PressableComponent.ImplementTemplateSpec<BaseWidgetComponent.TemplateSpec>
{
  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): BaseWidgetComponent.Template<BaseWidgetComponent.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      w: width,
      h: height,
      zIndex: 1.0,
      collision: true,
      cursor: "auto",
    };
  }

  /**
   * @static
   * @type {number}
   */
  public static override get width(): number {
    throw new Error(
      `${this.prototype.constructor.name}.width was called but not implemented`
    );
  }

  /**
   * @static
   * @type {number}
   */
  public static override get height(): number {
    throw new Error(
      `${this.prototype.constructor.name}.height was called but not implemented`
    );
  }

  /// ------------------------------------------------------------------- STATES

  // static override _states(): BaseWidgetComponent.Constructor[] {
  //   // return [...super._states()]; // doesn't work well with OOP...
  //   return new Array<BaseWidgetComponent.Constructor>();
  // }

  /// --------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<PressableComponent["_construct"]> {
    return super._construct();
  }

  override _build(): ReturnType<PressableComponent["_build"]> {
    return super._build();
  }

  override _setup(): ReturnType<PressableComponent["_setup"]> {
    return super._setup();
  }

  override _init(): ReturnType<PressableComponent["_init"]> {
    return super._init();
  }

  override _attach(): ReturnType<PressableComponent["_attach"]> {
    return super._attach();
  }

  override _firstEnable(): ReturnType<PressableComponent["_firstEnable"]> {
    return super._firstEnable();
  }

  override _enable(): ReturnType<PressableComponent["_enable"]> {
    return super._enable();
  }

  override _firstActive(): ReturnType<PressableComponent["_firstActive"]> {
    return super._firstActive();
  }

  override _active(): ReturnType<PressableComponent["_active"]> {
    return super._active();
  }

  override _detach(): ReturnType<PressableComponent["_detach"]> {
    return super._detach();
  }

  override _disable(): ReturnType<PressableComponent["_disable"]> {
    return super._disable();
  }

  override _inactive(): ReturnType<PressableComponent["_inactive"]> {
    return super._inactive();
  }

  /// ------------------------------------------------------------- WIDGET HOOKS

  override _onActivated(page: BasePageComponent): void {
    if (super._onActivated) return super._onActivated(page);
  }

  /// -------------------------------------------------------------------- FOCUS

  override _getFocused(): ReturnType<PressableComponent["_getFocused"]> {
    return this as BaseWidgetComponent; /// <-- delegate only to FocusableComponents
  }
}

/// ------------------------------------------------------------------ NAMESPACE

/**
 * The {@link BaseWidgetComponent} namespace contains utility types for working with
 * strongly-typed {@link BaseWidgetComponent} sub-classes.
 *
 * ---
 *
 * See the {@link https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/SubclassableComponents?id=subclassable-components Lightning docs on sub-classable components}
 * for more information.
 *
 * ---
 *
 * @namespace {@link BaseWidgetComponent}
 */
declare namespace BaseWidgetComponent {
  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  export interface TemplateSpec extends PressableComponent.TemplateSpec {
    /**
     *
     */
    data: Data;

    /**
     * Sets the {@link Signals} for this PressableComponent.
     *
     * @remarks
     * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
     * information.
     */
    signals: Signals;

    /**
     * Gets/sets the {@link PassSignals} for this PressableComponent.
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
    PressableComponent.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    PressableComponent.PassSignals<Config>;

  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   * This is the main template for widgets, you can create more depending on
   * your application needs.
   * In here most of the functionality will be handled for navigation, setting
   * items, etc.
   * Your pages should extend from these templates most of the time unless it is
   * an edge case.
   */
  export interface TypeConfig extends PressableComponent.TypeConfig {
    IsPage: false;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends PressableComponent.EventMap {}

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends PressableComponent.SignalMap {}

  /// -------------------------------------------------------------------- TYPES

  /**
   *
   */
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    PressableComponent.ImplementTemplateSpec<Spec>;

  /**
   *
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    PressableComponent.Template<Spec>;

  /**
   *
   */
  export type Constructor<C extends BaseWidgetComponent = BaseWidgetComponent> =
    PressableComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends PressableComponent.Data {}
}

/// --------------------------------------------------------------------- EXPORT

export { BaseWidgetComponent };

/// ----------------------------------------------------------------------------
