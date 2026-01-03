import { Vector } from "@fx-audio-dev/lib";
import { PressableComponent } from "../PressableComponent";

export type DragCoords = {
  start: Vector;
  current: Vector;
  delta: Vector;
};

export type DragPayload = {
  evt: globalThis.MouseEvent | globalThis.TouchEvent;
  coords: DragCoords;
};

class DraggableComponent<
  Spec extends DraggableComponent.TemplateSpec =
    DraggableComponent.TemplateSpec,
  Config extends DraggableComponent.TypeConfig = DraggableComponent.TypeConfig,
  Data extends DraggableComponent.Data = DraggableComponent.Data,
>
  extends PressableComponent<Spec, Config, Data>
  implements
    PressableComponent.ImplementTemplateSpec<DraggableComponent.TemplateSpec>
{
  static override _template(): DraggableComponent.Template<DraggableComponent.TemplateSpec> {
    return {
      ...super._template(),
      w: this.width,
      h: this.height,
      collision: true,
      cursor: "grab",
      Label: {},
    };
  }

  static override get width() {
    return 0;
  }

  static override get height() {
    return 0;
  }

  override _handleEnter(evt: KeyboardEvent) {
    // Log.event(this.ref ?? this.constructor.name, "_handleEnter()", { evt });
    return super._handleEnter(evt);
  }

  override _handleEnterRelease(evt: KeyboardEvent) {
    return super._handleEnterRelease(evt);
  }

  override _handleClick(
    target: Parameters<NonNullable<PressableComponent["_handleClick"]>>[0],
    localCoords: Parameters<NonNullable<PressableComponent["_handleClick"]>>[1]
  ) {
    return super._handleClick(target, localCoords);
  }

  override _handleHover(
    target: Parameters<NonNullable<PressableComponent["_handleHover"]>>[0]
  ) {
    return super._handleHover(target);
  }

  override _handleUnhover(
    target: Parameters<NonNullable<PressableComponent["_handleUnhover"]>>[0]
  ) {
    return super._handleUnhover(target);
  }

  _handleTouchStart(
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ): boolean | void {}

  _handleTouchEnd(delta: Vector): boolean | void {}

  _handleTouchMove(localCoords: DragCoords): boolean | void {}

  _handleTouchHover(current: Vector): boolean | void {}
}

declare namespace DraggableComponent {
  export interface TemplateSpec extends PressableComponent.TemplateSpec {
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

    Label: Record<string | symbol, unknown>;
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

  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    PressableComponent.NewPatchTemplate<T>;
  export interface TypeConfig extends PressableComponent.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends PressableComponent.EventMap {}

  export interface SignalMap extends PressableComponent.SignalMap {
    onDrag(localCoords: {
      start: Vector;
      current: Vector;
      delta: Vector;
    }): void;
    onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent): void;
    onDragEnd(): void;
  }

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    PressableComponent.Template<Spec>;
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    PressableComponent.ImplementTemplateSpec<Spec>;

  export type Constructor<C extends DraggableComponent = DraggableComponent> =
    PressableComponent.Constructor<C>;

  export interface Data extends PressableComponent.Data {}
}

export { DraggableComponent };
