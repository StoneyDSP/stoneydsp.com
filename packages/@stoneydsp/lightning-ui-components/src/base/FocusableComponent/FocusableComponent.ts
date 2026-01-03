/// -------------------------------------------------------------------- IMPORTS

import { BaseComponent } from "../BaseComponent/BaseComponent";

/// ---------------------------------------------------------------------- CLASS

/**
 * ---
 * The {@link FocusableComponent} abstract class; extend from this class to make
 * a new {@link FocusableComponent} sub-class.
 *
 * ---
 * @abstract
 * @class
 * @template {FocusableComponent.TemplateSpec} [Spec=FocusableComponent.TemplateSpec]
 * @template {FocusableComponent.TypeConfig} [Config=FocusableComponent.TypeConfig]
 * @extends {BaseComponent<Spec, Config>}
 * @implements {BaseComponent.ImplementTemplateSpec<FocusableComponent.TemplateSpec>}
 */
abstract class FocusableComponent<
  Spec extends FocusableComponent.TemplateSpec =
    FocusableComponent.TemplateSpec,
  Config extends FocusableComponent.TypeConfig = FocusableComponent.TypeConfig,
  Data extends FocusableComponent.Data = FocusableComponent.Data,
>
  extends BaseComponent<Spec, Config, Data>
  implements
    BaseComponent.ImplementTemplateSpec<FocusableComponent.TemplateSpec>
{
  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): FocusableComponent.Template<FocusableComponent.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      w: width,
      h: height,
      collision: true,
      cursor: "auto",
      // cursor: "auto",
      zIndex: 0.5, // <-- pressables are *always* at the top!
    };
  }

  public static get width(): number {
    throw new Error(
      `${this.prototype.constructor.name}.width was called but not implemented`
    );
  }

  public static get height(): number {
    throw new Error(
      `${this.prototype.constructor.name}.height was called but not implemented`
    );
  }

  /// ------------------------------------------------------------------- STATES

  // static override _states(): FocusableComponent.Constructor[] {
  //   // return [...super._states()]; // doesn't work well with OOP...
  //   return new Array<FocusableComponent.Constructor>();
  // }

  /// -------------------------------------------------------------------- FOCUS

  override _getFocused(): ReturnType<BaseComponent["_getFocused"]> {
    return this as ReturnType<BaseComponent["_getFocused"]>;
  }

  override _focus(
    newFocusedComponent: Parameters<BaseComponent["_focus"]>[0],
    prevFocusedComponent: Parameters<BaseComponent["_focus"]>[1]
  ) {
    (this as FocusableComponent).signal("focus");
    return super._focus(newFocusedComponent, prevFocusedComponent);
  }

  override _unfocus(
    newFocusedComponent: Parameters<BaseComponent["_unfocus"]>[0],
    prevFocusedComponent: Parameters<BaseComponent["_unfocus"]>[1]
  ) {
    (this as FocusableComponent).signal("unfocus");
    return super._unfocus(newFocusedComponent, prevFocusedComponent);
  }

  override _handleHover(
    target: Parameters<NonNullable<BaseComponent["_handleHover"]>>[0]
  ) {
    if (super._handleHover) return super._handleHover(target);
  }

  override _handleUnhover(
    target: Parameters<NonNullable<BaseComponent["_handleUnhover"]>>[0]
  ) {
    if (super._handleUnhover) return super._handleUnhover(target);
  }
}

/// ------------------------------------------------------------------ NAMESPACE

/**
 * The {@link FocusableComponent} namespace contains utility types for working with
 * strongly-typed {@link FocusableComponent} sub-classes.
 *
 * ---
 *
 * See the {@link https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/SubclassableComponents?id=subclassable-components Lightning docs on sub-classable components}
 * for more information.
 *
 * ---
 *
 * @namespace {@link FocusableComponent}
 */
declare namespace FocusableComponent {
  /// ------------------------------------------------------------ TEMPLATE SPEC

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   * Base strongly-typed TemplateSpec for a {@link FocusableComponent}
   *
   * @example
   * If you inherit from this, follow this example closely:
   * ```ts
   * namespace MyComponent {
   *   export interface TemplateSpec extends FocusableComponent.TemplateSpec {
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
  export interface TemplateSpec extends BaseComponent.TemplateSpec {
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

  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    BaseComponent.NewPatchTemplate<T>;

  /// -------------------------------------------------------------- TYPE CONFIG

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [s: string]: any;
  }

  /**
   *
   */
  export interface TypeConfig extends BaseComponent.TypeConfig {
    IsPage: true | false; /// <-- Pages are focusable with Router.focusPage()...
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends BaseComponent.EventMap {}

  /**
   *
   */
  export interface SignalMap extends BaseComponent.SignalMap {
    focus(): void;
    unfocus(): void;
  }

  /// -------------------------------------------------------------------- TYPES

  /**
   * Converts a {@link TemplateSpec} into an interface that is implemented by a
   * {@link FocusableComponent} class (or sub-class).
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
   *   export interface TemplateSpec extends FocusableComponent.TemplateSpec {
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
    BaseComponent.ImplementTemplateSpec<Spec>;

  /**
   * Type used for the return result of {@link FocusableComponent._template()}.
   *
   * All {@link TemplateSpec} properties are made optional. Nested
   * {@link TemplateSpec} properties are also made optional, except for the
   * `type` propety which is made required.
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.Template<Spec>;

  /**
   * Constructor type for a {@link FocusableComponent}
   */
  export type Constructor<C extends FocusableComponent = FocusableComponent> =
    BaseComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends BaseComponent.Data {}
}

/// --------------------------------------------------------------------- EXPORT

export { FocusableComponent };

/// ----------------------------------------------------------------------------
