import { DraggableComponent, Vector } from "stoneydsp";
import { Log } from "../../../lib/Log";

class Draggable<
  Spec extends Draggable.TemplateSpec = Draggable.TemplateSpec,
  Config extends Draggable.TypeConfig = Draggable.TypeConfig,
  Data extends Draggable.Data = Draggable.Data,
>
  extends DraggableComponent<Spec, Config, Data>
  implements DraggableComponent.ImplementTemplateSpec<Draggable.TemplateSpec>
{
  static override _template(): Draggable.Template<Draggable.TemplateSpec> {
    return {
      ...super._template(),
      rect: true,
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
    Log.event(this.ref ?? this.constructor.name, "_handleEnter()", { evt });
    this._onClick();
    return super._handleEnter(evt);
  }

  override _handleEnterRelease(evt: KeyboardEvent) {
    Log.event(this.ref ?? this.constructor.name, "_handleEnterRelease()", {
      evt,
    });
    return super._handleEnterRelease(evt);
  }

  override _handleClick(
    target: Parameters<NonNullable<DraggableComponent["_handleClick"]>>[0],
    localCoords: Parameters<NonNullable<DraggableComponent["_handleClick"]>>[1]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleCick()", {
      target,
      localCoords,
    });
    this._onClick();
    return super._handleClick(target, localCoords);
  }

  override _handleHover(
    target: Parameters<NonNullable<DraggableComponent["_handleHover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleHover()", { target });
    return super._handleHover(target);
  }

  override _handleUnhover(
    target: Parameters<NonNullable<DraggableComponent["_handleUnhover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleUnhover()", {
      target,
    });
    return super._handleUnhover(target);
  }

  override _handleTouchStart(
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) {
    this._onDragStart(event);
    Log.event(this.ref ?? this.constructor.name, "_handleTouchStart()", {
      event,
    });
  }

  override _handleTouchEnd(delta: Vector) {
    this._onDragEnd();
    Log.event(this.ref ?? this.constructor.name, "_handleTouchEnd()", {
      delta,
    });
  }

  override _handleTouchMove(localCoords: {
    start: Vector;
    current: Vector;
    delta: Vector;
  }) {
    this._onDrag(localCoords);
    Log.event(this.ref ?? this.constructor.name, "_handleTouchMove()", {
      localCoords,
    });
  }

  override _handleTouchHover(current: Vector) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchHover()", {
      current,
    });
  }

  private _onClick() {
    (this as Draggable).signal("onPress");
  }

  private _onDrag(localCoords: {
    start: Vector;
    current: Vector;
    delta: Vector;
  }) {
    (this as Draggable).signal("onDrag", localCoords);
  }

  private _onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent) {
    (this as Draggable).patch({ cursor: "grabbing" });
    (this as Draggable).signal("onDragStart", event);
  }

  private _onDragEnd() {
    (this as Draggable).patch({ cursor: "grab" });
    (this as Draggable).signal("onDragEnd");
  }
}

declare namespace Draggable {
  export interface TemplateSpec extends DraggableComponent.TemplateSpec {
    Label: Record<string | symbol, unknown>;
  }
  export interface TypeConfig extends DraggableComponent.TypeConfig {
    signals: Signals;
    passSignals: PassSignals;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends DraggableComponent.EventMap {}

  /**
   *
   */
  export interface SignalMap extends DraggableComponent.SignalMap {
    onDrag(localCoords: {
      start: Vector;
      current: Vector;
      delta: Vector;
    }): void;
    onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent): void;
    onDragEnd(): void;
  }
  /**
   * Patch object for new Components (requires 'type' key because object hasn't been created yet)
   *
   * @remarks
   * Aliased here in `Component` for convenience
   */
  export type NewPatchTemplate<T extends Constructor> =
    DraggableComponent.NewPatchTemplate<T>;

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    DraggableComponent.Template<Spec>;
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    DraggableComponent.ImplementTemplateSpec<Spec>;

  export type Signals<Config extends TypeConfig = TypeConfig> =
    DraggableComponent.Signals<Config>;

  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    DraggableComponent.PassSignals<Config>;

  export type Constructor<C extends Draggable = Draggable> =
    DraggableComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends DraggableComponent.Data {}
}

export { Draggable };
