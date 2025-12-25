/// -------------------------------------------------------------------- IMPORTS

/* eslint-disable @typescript-eslint/no-unused-vars */

import { FocusableComponent } from "../FocusableComponent/FocusableComponent";

/// ---------------------------------------------------------------------- CLASS

/**
 * ---
 * The {@link PressableComponent} abstract class; extend from this class to make a
 * new {@link PressableComponent} sub-class.
 *
 * ---
 * @abstract
 * @class {@link PressableComponent}
 * @template {PressableComponent.TemplateSpec} [Spec=PressableComponent.TemplateSpec]
 * @template {PressableComponent.TypeConfig} [Config=PressableComponent.TypeConfig]
 * @extends {FocusableComponent<Spec, Config>}
 * @implements {Focusable.ImplementTemplateSpec<PressableComponent.TemplateSpec>}
 */
abstract class PressableComponent<
  Spec extends PressableComponent.TemplateSpec =
    PressableComponent.TemplateSpec,
  Config extends PressableComponent.TypeConfig =
    PressableComponent.TypeConfig,
>
  extends FocusableComponent<Spec, Config>
  implements
    FocusableComponent.ImplementTemplateSpec<PressableComponent.TemplateSpec>
{
  /// --------------------------------------------------------------------- DATA

  protected override _data: PressableComponent.Data;

  public override get data() {
    return this._data;
  }

  public override set data(data) {
    this._data = data;
  }

  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): PressableComponent.Template<PressableComponent.TemplateSpec> {
    const { width, height } = this
    return {
      ...super._template(),
      w: width,
      h: height,
      data: undefined,
      collision: true,
      // cursor: "auto",
      zIndex: 1 // <-- pressables are *always* at the top!
      /// NOTE: you might not fire the events if the pressable does not have the highest zIndex!
    };
  }

  public static override get width(): number {
    throw new Error(
      `${this.prototype.constructor.name}.width was called but not implemented`
    )
  }

  public static override get height(): number {
    throw new Error(
      `${this.prototype.constructor.name}.height was called but not implemented`
    )
  }

  /// ------------------------------------------------------------------- STATES

  // static override _states(): PressableComponent.Constructor[] {
  //   // return [...super._states()]; // doesn't work well with OOP...
  //   return new Array<PressableComponent.Constructor>();
  // }

  /// ------------------------------------------------------------------- EVENTS

  override _handleEnter(
    evt: Parameters<NonNullable<FocusableComponent['_handleEnter']>>[0],
  ): ReturnType<NonNullable<FocusableComponent['_handleEnter']>> {
    return true; // TODO: perhaps return a `this.shouldPropagate`?
  }

  override _handleClick(
    target: Parameters<NonNullable<FocusableComponent['_handleClick']>>[0],
    localCoords: Parameters<NonNullable<FocusableComponent['_handleClick']>>[1],
  ): ReturnType<NonNullable<FocusableComponent['_handleClick']>> {
    return true; // TODO: perhaps return a `this.shouldPropagate`?
  }
}

/**
 * The {@link PressableComponent} namespace contains utility types for working with
 * strongly-typed {@link PressableComponent} sub-classes.
 *
 * ---
 *
 * See the {@link https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/SubclassableComponents?id=subclassable-components Lightning docs on sub-classable components}
 * for more information.
 *
 * ---
 *
 * @namespace {@link PressableComponent}
 */
declare namespace PressableComponent {

  /// ------------------------------------------------------------ TEMPLATE SPEC

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any
  }

  /**
   * Base strongly-typed TemplateSpec for a {@link PressableComponent}
   *
   * @example
   * If you inherit from this, follow this example closely:
   * ```ts
   * namespace MyComponent {
   *   export interface TemplateSpec extends PressableComponent.TemplateSpec {
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
  export interface TemplateSpec extends FocusableComponent.TemplateSpec {
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
    FocusableComponent.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    FocusableComponent.PassSignals<Config>;

    /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    FocusableComponent.NewPatchTemplate<T>;

  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any
  }

  /**
   *
   */
  export interface TypeConfig extends FocusableComponent.TypeConfig {
    IsPage: true | false;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends FocusableComponent.EventMap {}

  /**
   *
   */
  export interface SignalMap extends FocusableComponent.SignalMap {
    onPress(): void;
  }

  /// -------------------------------------------------------------------- TYPES

  /**
   * Converts a {@link TemplateSpec} into an interface that is implemented by a
   * {@link PressableComponent} class (or sub-class).
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
   *   export interface TemplateSpec extends PressableComponent.TemplateSpec {
   *     prop1: number;
   *     prop2: string;
   *     ChildElement: {};
   *     ChildComponent: typeof MyComponent;
   *   }
   * }
   *
   * class Container
   *   extends FocusableComponent<Container.TemplateSpec>
   *   implements FocusableComponent.ImplementTemplateSpec<Container.TemplateSpec>
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
    FocusableComponent.ImplementTemplateSpec<Spec>;

  /**
   * Type used for the return result of {@link FocusableComponent._template()}.
   *
   * All {@link TemplateSpec} properties are made optional. Nested
   * {@link TemplateSpec} properties are also made optional, except for the
   * `type` propety which is made required.
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    FocusableComponent.Template<Spec>;

  /**
   * Constructor type for a {@link FocusableComponent}
   */
  export type Constructor<C extends FocusableComponent = FocusableComponent> =
    FocusableComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends FocusableComponent.Data {}
}

/// --------------------------------------------------------------------- EXPORT

export { PressableComponent };

/* eslint-enable @typescript-eslint/no-unused-vars */

/// ----------------------------------------------------------------------------
