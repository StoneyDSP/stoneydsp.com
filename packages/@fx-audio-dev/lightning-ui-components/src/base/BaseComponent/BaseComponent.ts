/// -------------------------------------------------------------------- IMPORTS

import { Lightning } from "@lightningjs/sdk";

/// ---------------------------------------------------------------------- CLASS

/**
 * ---
 * The {@link BaseComponent} abstract class; extend from this class to make a
 * new {@link BaseComponent} sub-class.
 *
 * ---
 * @abstract
 * @class {@link BaseComponent}
 * @template {BaseComponent.TemplateSpec} [Spec=BaseComponent.TemplateSpec]
 * @template {BaseComponent.TypeConfig} [Config=BaseComponent.TypeConfig]
 * @extends {Lightning.Component<Spec, Config>}
 * @implements {Lightning.Component.ImplementTemplateSpec<BaseComponent.TemplateSpec>}
 */
abstract class BaseComponent<
  Spec extends BaseComponent.TemplateSpec = BaseComponent.TemplateSpec,
  Config extends BaseComponent.TypeConfig = BaseComponent.TypeConfig,
  Data extends BaseComponent.Data = BaseComponent.Data,
>
  extends Lightning.Component<Spec, Config>
  implements
    Lightning.Component.ImplementTemplateSpec<BaseComponent.TemplateSpec>
{
  /// ---------------------------------------------------------------------- DBG

  /**
   * ---
   * Set to `true` to enable additional debugging.
   *
   * ---
   * @protected
   * @type {true | false}
   */
  protected _dbg: true | false = false;

  /**
   * ---
   *
   * Additional debugging is enabled on this component when this readonly
   * boolean member returns `true`.
   *
   * ---
   * @public
   * @readonly
   * @type {true | false}
   */
  public get dbg(): Readonly<typeof this._dbg> {
    return this._dbg;
  }

  /// --------------------------------------------------------------------- DATA

  /**
   * @type {Data}
   */
  protected _data: Data;

  public get data() {
    return this._data;
  }

  public set data(data) {
    this._data = data;
  }

  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): BaseComponent.Template<BaseComponent.TemplateSpec> {
    return {
      ...super._template(),
      // collision: true,
      // cursor: "auto"
    };
  }

  /// ------------------------------------------------------------------- STATES

  // static override _states(): BaseComponent.Constructor[] {
  //   // return [...super._states()]; // doesn't work well with OOP...
  //   return new Array<BaseComponent.Constructor>();
  // }

  /// --------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<Lightning.Component["_construct"]> {
    return super._construct();
  }

  override _build(): ReturnType<Lightning.Component["_build"]> {
    return super._build();
  }

  override _setup(): ReturnType<Lightning.Component["_setup"]> {
    return super._setup();
  }

  override _init(): ReturnType<Lightning.Component["_init"]> {
    return super._init();
  }

  override _attach(): ReturnType<Lightning.Component["_attach"]> {
    return super._attach();
  }

  override _firstEnable(): ReturnType<Lightning.Component["_firstEnable"]> {
    return super._firstEnable();
  }

  override _enable(): ReturnType<Lightning.Component["_enable"]> {
    return super._enable();
  }

  override _firstActive(): ReturnType<Lightning.Component["_firstActive"]> {
    return super._firstActive();
  }

  override _active(): ReturnType<Lightning.Component["_active"]> {
    return super._active();
  }

  override _detach(): ReturnType<Lightning.Component["_detach"]> {
    return super._detach();
  }

  override _disable(): ReturnType<Lightning.Component["_disable"]> {
    return super._disable();
  }

  override _inactive(): ReturnType<Lightning.Component["_inactive"]> {
    return super._inactive();
  }

  /// -------------------------------------------------------------------- FOCUS

  override _getFocused(): ReturnType<Lightning.Component["_getFocused"]> {
    return null; /// <-- delegate only to FocusableComponents
  }

  override _focus(...parameters: Parameters<Lightning.Component["_focus"]>) {
    return super._focus(...parameters);
  }

  override _unfocus(...parameters: Parameters<Lightning.Component["_focus"]>) {
    return super._unfocus(...parameters);
  }

  // override _handleHover?: ((
  //   target: Parameters<Lightning.Component['_handleHover']>[0],
  // ) => ReturnType<Lightning.Component['_handleHover']>) | null | undefined;

  // override _handleUnhover?: ((
  //   target: Parameters<NonNullable<Lightning.Component['_handleUnhover']>>[0],
  // ) => ReturnType<NonNullable<Lightning.Component['_handleUnhover']>>) | null | undefined;

  /// ------------------------------------------------------------------- EVENTS

  // override _handleClick(
  //   _target: Parameters<NonNullable<Lightning.Component['_handleClick']>>[0],
  //   _localCoords: Parameters<NonNullable<Lightning.Component['_handleClick']>>[1],
  // ): ReturnType<NonNullable<Lightning.Component['_handleClick']>> {
  //   return false;
  // }

  /// --------------------------------------------------------------------- DATA

  /**
   * ---
   * @returns {Data}
   */
  public getData(): Data {
    const data = { ...this.data } as Data;
    return data;
  }

  /**
   * ---
   * @param {Data} data
   */
  public setData(data: Data) {
    // if (typeof data !== typeof this.data) throw new TypeError();
    (this as BaseComponent).patch({ data });
  }

  /**
   * ---
   * Sets the canonical semantic label (identity) for this _instance_ of this
   * {@link BaseComponent} sub-class.
   *
   * Should be a unique identifier; doing lookup for this value across the
   * whole application at runtime should produce only _one_ live
   * {@link BaseComponent} sub-class instance.
   *
   * ---
   * @example
   * ```ts
   * class HomeButton extends Button {
   *
   *   override _construct() {
   *     this.setDataLabel("SidebarHomeButton");
   *     Log.debug(this.getDataLabel()); // "Debug: SidebarHomeButton"
   *   }
   * }
   * ```
   *
   * ---
   *
   * @param {Data['label']} label
   * @returns {void}
   *
   * @see {@link getDataLabel()}
   */
  public setDataLabel(label: Data["label"]): void {
    if (typeof label !== typeof this.getDataLabel()) throw new TypeError();
    (this as BaseComponent).patch({
      data: { ...this.data, label },
    });
  }

  /**
   * ---
   * Gets the canonical semantic label (identity) for this _instance_ of this
   * {@link BaseComponent} sub-class.
   *
   * Should be a unique identifier; doing lookup for this value across the
   * whole application at runtime should produce only _one_ live
   * {@link BaseComponent} sub-class instance.
   *
   * ---
   * @example
   * ```ts
   * class HomeButton extends Button {
   *
   *   override _construct() {
   *     this.setDataLabel("SidebarHomeButton");
   *     Log.debug(this.getDataLabel()); // "Debug: SidebarHomeButton"
   *   }
   * }
   * ```
   *
   * ---
   * @returns {Data['label']}
   *
   * @see {@link setDataLabel()}
   */
  public getDataLabel(): Data["label"] {
    const label = `${this.getDataLabel()}`;
    return label;
  }
}

/// ------------------------------------------------------------------ NAMESPACE

/**
 * The {@link BaseComponent} namespace contains utility types for working with
 * strongly-typed {@link BaseComponent} sub-classes.
 *
 * ---
 *
 * See the {@link https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/SubclassableComponents?id=subclassable-components Lightning docs on sub-classable components}
 * for more information.
 *
 * ---
 *
 * @namespace {@link BaseComponent}
 */
declare namespace BaseComponent {
  /// ------------------------------------------------------------ TEMPLATE SPEC

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   * Base strongly-typed TemplateSpec for a {@link BaseComponent}
   *
   * @example
   * If you inherit from this, follow this example closely:
   * ```ts
   * namespace MyComponent {
   *   export interface TemplateSpec extends BaseComponent.TemplateSpec {
   *     // Your properties should not be optional (so TS can enforce that they
   *     // are implemented in your Component)
   *     myProperty1: number;
   *     myProperty2: string;
   *
   *     // Child components should be typed by their `typeof` types
   *     MyChildComponent: typeof MyChildComponent
   *
   *     // Child elements, which contain no children, should inserted with
   *     // Record<string | symbol, unknown>
   *     MyChildElement: Record<string | symbol, unknown>;
   *
   *     // Child elements, which have children of their own, are inserted with
   *     // an inline-object type
   *     MyChildInlineElementType: {
   *       ElementChild1: Record<string | symbol, unknown>;
   *       ElementChild2: typeof MyCoolComponent;
   *     };
   *
   *     // If your Component has a property that when set, patches the value
   *     // into itself, use `PatchTemplate<ComponentTemplateSpecType>`
   *     content: Lightning.Element.PatchTemplate<Lightning.Element.TemplateSpecLoose>;
   *   }
   * }
   * ```
   */
  export interface TemplateSpec extends Lightning.Component.TemplateSpec {
    /**
     *
     */
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
    Lightning.Component.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    Lightning.Component.PassSignals<Config>;

  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    Lightning.Element.NewPatchTemplate<T>;

  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   *
   */
  export interface TypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true | false;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends Lightning.Component.EventMap {}

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends Lightning.Component.SignalMap {}

  /// -------------------------------------------------------------------- TYPES

  /**
   * Converts a {@link TemplateSpec} into an interface that is implemented by a
   * {@link BaseComponent} class (or sub-class).
   *
   * @remarks
   * This transforms the {@link TemplateSpec} type leaving only the properties
   * of your Component.
   *
   * These are the properties with the lowercase keys, such as `prop1` and
   * `prop2` in the example below.
   *
   * This ensures your Component has the properties required by the
   * {@link TemplateSpec}.
   *
   * @example
   * ```ts
   * // namespaces should come *after* the class declaration; provided here for
   * // clarity...
   * namespace Container {
   *   export interface TemplateSpec extends BaseComponent.TemplateSpec {
   *     prop1: number;
   *     prop2: string;
   *     ChildElement: {};
   *     ChildComponent: typeof MyComponent;
   *   }
   * }
   *
   * class Container
   *   extends BaseComponent<Container.TemplateSpec>
   *   implements BaseComponent.ImplementTemplateSpec<Container.TemplateSpec>
   * {
   *
   *   // The interface requires that prop1 exist as a `number`
   *   // and that `prop2` exists as a string.
   *   // These can be implemented as either getter/setter pairs or
   *   // instance properties.
   *   get prop1(): number {
   *     // Getter implementation
   *   }
   *
   *   set prop1(v: number) {
   *     // Setter implementation
   *   }
   *
   *   prop2: string;
   * }
   * ```
   */
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    Lightning.Component.ImplementTemplateSpec<Spec>;

  /**
   * Type used for the return result of {@link BaseComponent._template()}.
   *
   * All {@link TemplateSpec} properties are made optional. Nested
   * {@link TemplateSpec} properties are also made optional, except for the
   * `type` propety which is made required.
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    Lightning.Component.Template<Spec>;

  /**
   * Constructor type for a {@link BaseComponent}
   */
  export type Constructor<C extends BaseComponent = BaseComponent> =
    Lightning.Component.Constructor<C>;

  namespace Hooks {
    export interface Up extends Readonly<Record<symbol, string>> {
      readonly construct: "construct";
      readonly build: "build";
      readonly setup: "setup";
      readonly init: "init";
      readonly attach: "attach";
      readonly firstEnable: "firstEnable";
      readonly enable: "enable";
      readonly firstActive: "firstActive";
      readonly active: "active";
    }
    export interface Dn extends Readonly<Record<symbol, string>> {
      readonly detach: "detach";
      readonly disable: "disable";
      readonly inactive: "inactive";
    }
    export const Up: Readonly<
      [
        Up["construct"],
        Up["build"],
        Up["setup"],
        Up["init"],
        Up["attach"],
        Up["firstEnable"],
        Up["enable"],
        Up["firstActive"],
        Up["active"],
      ]
    >;
    export const Dn: Readonly<[Dn["detach"], Dn["disable"], Dn["inactive"]]>;
  }

  export type Hooks<Direction extends Hooks.Up | Hooks.Dn> = Direction;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends Record<string | symbol | number, unknown> {
    /**
     * ---
     * The canonical semantic label (identity) for this _instance_ of this
     * {@link BaseComponent} sub-class. Use the `set`/`getDataLabel()` class
     * methods to manage this prop.
     *
     * Should be a unique identifier; doing lookup for this value across the
     * whole application at runtime should produce only _one_ live
     * {@link BaseComponent} sub-class instance.
     *
     * This top-level prop is used by other members of {@link Data}, for example
     * when sending/receiving messages and events, unless a specific override is
     * required; in those cases, a `label` override should _usually_ be
     * available at the same depth.
     *
     * For example, if you implemement a `this.data.analytics` in your sub-class
     * then your analytics client _might_ expect an identifier which doesn't
     * cleanly match the top-level `label`; in such a case, you can provide
     * `this.analytics.label` as an `analytics`-scoped override of this
     * top-level prop.
     *
     * ---
     * @example
     * ```ts
     * class HomeButton extends Button {
     *
     *   override _construct() {
     *     this.setDataLabel("SidebarHomeButton");
     *     Log.debug(this.getDataLabel()); // "Debug: SidebarHomeButton"
     *   }
     * }
     * ```
     */
    readonly label?: string;

    // /**
    //  *
    //  */
    // control?: {
    //   /**
    //    *
    //    */
    //   state: {
    //     /**
    //      *
    //      */
    //     value: unknown;
    //   };
    // };
  }

  /// -------------------------------------------------------------------- ERROR

  // export class Error<
  //   Code extends BaseComponentError.Code = BaseComponentError.Code,
  //   Details extends BaseComponentError.Details = BaseComponentError.Details
  // > extends BaseComponentError<
  //   Code, Details
  // > implements BaseComponentError<
  //   Code, Details
  // > {
  //   constructor(code: keyof Code, message: string, details: Details)
  // }
}

/// --------------------------------------------------------------------- EXPORT

export { BaseComponent };

/// ----------------------------------------------------------------------------
