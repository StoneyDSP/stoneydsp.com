/// -------------------------------------------------------------------- IMPORTS

import { Router } from "@lightningjs/sdk";
import { BaseComponent } from "../BaseComponent";

/// ---------------------------------------------------------------------- CLASS

/**
 * ---
 * The {@link BasePageComponent} abstract class; extend from this class to make
 * a new {@link BasePageComponent} sub-class.
 *
 * ---
 * @abstract
 * @class
 * @template {BasePageComponent.TemplateSpec} [Spec=BasePageComponent.TemplateSpec]
 * @template {BasePageComponent.TypeConfig} [Config=BasePageComponent.TypeConfig]
 * @extends {BaseComponent<Spec, Config>}
 * @implements {BaseComponent.ImplementTemplateSpec<BasePageComponent.TemplateSpec>}
 */
abstract class BasePageComponent<
  Spec extends BasePageComponent.TemplateSpec = BasePageComponent.TemplateSpec,
  Config extends BasePageComponent.TypeConfig = BasePageComponent.TypeConfig,
  Data extends BasePageComponent.Data = BasePageComponent.Data,
>
  extends BaseComponent<Spec, Config, Data>
  implements BaseComponent.ImplementTemplateSpec<BasePageComponent.TemplateSpec>
{
  /// ------------------------------------------------------------------ WIDGETS

  /**
   * @type {Router.WidgetContainer}
   */
  override widgets: Router.WidgetContainer;

  /// ------------------------------------------------------------------- PARAMS

  /**
   * @type {BasePageComponent.PageParams}
   */
  override params: BasePageComponent.PageParams;

  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): BasePageComponent.Template<BasePageComponent.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      w: width,
      h: height,
      // collision: true,
      // cursor: "auto"
    };
  }

  /**
   * @static
   * @type {number}
   */
  public static get width(): number {
    throw new Error(
      `${this.prototype.constructor.name}.width was called but not implemented`
    );
  }

  /**
   * @static
   * @type {number}
   */
  public static get height(): number {
    throw new Error(
      `${this.prototype.constructor.name}.height was called but not implemented`
    );
  }

  /// ------------------------------------------------------------------- STATES

  // static override _states(): BasePageComponent.Constructor[] {
  //   // return [...super._states()]; // doesn't work well with OOP...
  //   return new Array<BasePageComponent.Constructor>();
  // }

  /// --------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<BaseComponent["_construct"]> {
    return super._construct();
  }

  override _build(): ReturnType<BaseComponent["_build"]> {
    return super._build();
  }

  override _setup(): ReturnType<BaseComponent["_setup"]> {
    return super._setup();
  }

  override _init(): ReturnType<BaseComponent["_init"]> {
    return super._init();
  }

  override _attach(): ReturnType<BaseComponent["_attach"]> {
    return super._attach();
  }

  override _firstEnable(): ReturnType<BaseComponent["_firstEnable"]> {
    return super._firstEnable();
  }

  override _enable(): ReturnType<BaseComponent["_enable"]> {
    return super._enable();
  }

  override _firstActive(): ReturnType<BaseComponent["_firstActive"]> {
    return super._firstActive();
  }

  override _active(): ReturnType<BaseComponent["_active"]> {
    return super._active();
  }

  override _detach(): ReturnType<BaseComponent["_detach"]> {
    return super._detach();
  }

  override _disable(): ReturnType<BaseComponent["_disable"]> {
    return super._disable();
  }

  override _inactive(): ReturnType<BaseComponent["_inactive"]> {
    return super._inactive();
  }

  /// --------------------------------------------------------------- PAGE HOOKS

  override _onDataProvided() {
    if (super._onDataProvided) return super._onDataProvided();
  }

  override _onMounted() {
    if (super._onMounted) return super._onMounted();
  }

  override _onChanged() {
    if (super._onChanged) return super._onChanged();
  }

  override _onUrlParams(params: BasePageComponent.PageParams) {
    // this._params = params;
    if (super._onUrlParams) return super._onUrlParams(params);
  }

  /// -------------------------------------------------------------------- FOCUS

  override _getFocused(): ReturnType<BaseComponent["_getFocused"]> {
    return this as BasePageComponent; /// <-- delegate only to FocusableComponents
  }

  /// -------------------------------------------------------------- TRANSITIONS

  /**
   * ---
   * Overridable method used to control how this Page transitions (Lightning SDK Router Pages only)
   *
   * ---
   *
   * @remarks
   * - If this method returns a default {@link PageTransition} string value, that default transition behavior will be
   *   used:
   *   - `"left"`
   *     - Put the new page on x:1920 and perform a transition to x:0. For the old page, perform a transition
   *       to x:-1920.
   *   - `"right"`
   *     - Put the new page on x:-1920 and perform a transition to x:0. For the old page, perform a transition
   *       to x:1920.
   *   - `"up"`
   *     - Put the new page on y:1080 and perform a transition to y:0. For the old page, perform a transition
   *       to y:-1080.
   *   - `"down"`
   *     - Put the new page on y:-1080 and perform a transition to y:0. For the old page, perform a transition
   *       to y:1080.
   *   - `"fade"`
   *     - For the new page, perform a transition from alpha:0 to alpha:1.
   *   - `"crossFade"`
   *     - For the new page, perform a transition from alpha:0 to alpha:1. For the old page, perform a transition from alpha:1 to alpha:0.
   * - If this method returns `Promise<void>`:
   *   - Executes a [Custom Page Transition](https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/pagetransitions?id=custom-page-transitions)
   *
   * See [Page Transitions](https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/pagetransitions)
   * for more information
   *
   * Added by [Lightning SDK Router](https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/index)
   *
   * ---
   * @param {Parameters<NonNullable<BaseComponent['pageTransition']>>[0]} pageIn Page being transitioned in
   * @param {Parameters<NonNullable<BaseComponent['pageTransition']>>[1]} pageOut Page being transitioned out (may be null)
   * @returns {ReturnType<NonNullable<BaseComponent['pageTransition']>>}
   */
  override pageTransition(
    pageIn: Parameters<NonNullable<BaseComponent["pageTransition"]>>[0],
    pageOut: Parameters<NonNullable<BaseComponent["pageTransition"]>>[1]
  ): ReturnType<NonNullable<BaseComponent["pageTransition"]>> {
    return pageIn !== pageOut ? (pageOut ? "crossFade" : "fade") : "down";
  }

  /// ------------------------------------------------------------ HISTORY STATE

  override historyState(
    params: BasePageComponent.HistoryState<Config>
  ): BasePageComponent.HistoryState<Config> {
    if (params) {
      //
      return params;
    } else {
      //
    }
  }
}

/// ------------------------------------------------------------------ NAMESPACE

/**
 * The {@link BasePageComponent} namespace contains utility types for working with
 * strongly-typed {@link BasePageComponent} sub-classes.
 *
 * ---
 *
 * See the {@link https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/SubclassableComponents?id=subclassable-components Lightning docs on sub-classable components}
 * for more information.
 *
 * ---
 *
 * @namespace {@link BasePageComponent}
 */
declare namespace BasePageComponent {
  /// ------------------------------------------------------------ TEMPLATE SPEC

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  export interface TemplateSpec extends BaseComponent.TemplateSpec {
    /**
     *
     */
    data: Data;

    /**
     *
     */
    params: PageParams;

    /**
     * Sets the {@link Signals} for this BaseComponent.
     *
     * @remarks
     * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
     * information.
     */
    signals: Signals;

    /**
     * Gets/sets the {@link PassSignals} for this BaseComponent.
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
    BaseComponent.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    BaseComponent.PassSignals<Config>;

  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   * This is the main template for pages, you can create more depending on your
   * application needs.
   * In here most of the functionality will be handled for navigation, setting
   * items, etc.
   * Your pages should extend from these templates most of the time unless it is
   * an edge case.
   */
  export interface TypeConfig extends BaseComponent.TypeConfig {
    IsPage: true;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
    HistoryStateType: Record<string, unknown>;
  }

  export type HistoryState<Config extends TypeConfig = TypeConfig> =
    Router.HistoryState<Config>;

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends BaseComponent.EventMap {}

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends BaseComponent.SignalMap {}

  /// -------------------------------------------------------------------- TYPES

  /**
   *
   */
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.ImplementTemplateSpec<Spec>;

  /**
   *
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.Template<Spec>;

  export type Constructor<C extends BaseComponent = BaseComponent> =
    BaseComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends BaseComponent.Data {}

  /**
   * Sets component state and focus state when navigating from the home page or via deep linking
   *
   * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/navigation?id=params
   *
   * @param {PageParams} args - Navigation parameters
   */
  export interface PageParams extends Router.PageParams {
    /**
     * Query parameters (after the route hash path)
     */
    [Router.symbols.queryParams]?: Router.QueryParams;
    [Router.symbols.store]?: Record<string, unknown>;
  }

  // export class Error<
  //   Code extends BasePageComponentError.Code = BasePageComponentError.Code,
  //   Details extends BasePageComponentError.Details = BasePageComponentError.Details
  // > extends BasePageComponentError<
  //   Code, Details
  // > implements BasePageComponentError<
  //   Code, Details
  // > {}
}

/// --------------------------------------------------------------------- EXPORT

export { BasePageComponent };

/// ----------------------------------------------------------------------------
