import { Vector } from "@stoneydsp/lib";
import { PressableComponent } from "@stoneydsp/lightning-ui-components";
import { Log } from "../../../../lib/Log";

class ButtonComponent<
  Spec extends ButtonComponent.TemplateSpec =
    ButtonComponent.TemplateSpec,
  Config extends ButtonComponent.TypeConfig = ButtonComponent.TypeConfig,
>
  extends PressableComponent<Spec, Config>
  implements
    ButtonComponent.ImplementTemplateSpec<ButtonComponent.TemplateSpec>
{
  static override _template(): ButtonComponent.Template<ButtonComponent.TemplateSpec> {
    return {
      ...super._template(),
      rect: true,
      color: 0x00000000,
      w: this.width,
      h: this.height,
      collision: true,
      cursor: 'auto',
      Label: {}
    };
  }

  static override get width() {
    return 0
  }

  static override get height() {
    return 0
  }

  override _handleEnter(
    evt: KeyboardEvent
  ) {
    Log.event(this.ref ?? this.constructor.name, '_handleEnter()', { evt });
    this._onClick()
    return super._handleEnter(evt);
  }

  override _handleClick(
    target: Parameters<NonNullable<PressableComponent['_handleClick']>>[0],
    localCoords: Parameters<NonNullable<PressableComponent['_handleClick']>>[1],
  ) {
    Log.event(this.ref ?? this.constructor.name, '_handleCick()', { target, localCoords })
    this._onClick()
    return super._handleClick(target, localCoords);
  }

  override _handleHover(target: Parameters<NonNullable<PressableComponent['_handleHover']>>[0]) {
    Log.event(this.ref ?? this.constructor.name, '_handleHover()', { target })
    return super._handleHover(target)
  }

  override _handleUnhover(target: Parameters<NonNullable<PressableComponent['_handleUnhover']>>[0]) {
    Log.event(this.ref ?? this.constructor.name, '_handleUnhover()', { target })
    return super._handleUnhover(target)
  }

  _handleTouchStart(event: globalThis.MouseEvent | globalThis.TouchEvent) {
    this._onDragStart(event)
    Log.event(this.ref ?? this.constructor.name, '_handleTouchStart()', { event })
  }

  _handleTouchEnd(delta: Vector) {
    this._onDragEnd()
    Log.event(this.ref ?? this.constructor.name, '_handleTouchEnd()', { delta })
  }

  _handleTouchMove(localCoords: {start: Vector, current: Vector, delta: Vector}) {
    this._onDrag(localCoords);
    Log.event(this.ref ?? this.constructor.name, '_handleTouchMove()', { localCoords })
  }

  _handleTouchHover(current: Vector) {
    Log.event(this.ref ?? this.constructor.name, '_handleTouchHover()', { current })
  }

  private _onClick() {
    (this as ButtonComponent).signal("onPress")
  }

  private _onDrag(localCoords: {start: Vector, current: Vector, delta: Vector}) {
    (this as ButtonComponent).signal("onDrag", localCoords)
  }

  private _onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent) {
    (this as ButtonComponent).signal("onDragStart", event)
  }

  private _onDragEnd() {
    (this as ButtonComponent).signal("onDragEnd")
  }
}


declare namespace ButtonComponent {

  export interface TemplateSpec extends PressableComponent.TemplateSpec {
    Label: Record<string|symbol, unknown>;
  }
  export interface TypeConfig extends PressableComponent.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends PressableComponent.EventMap {}

  /**
   *
   */
  export interface SignalMap extends PressableComponent.SignalMap {
    onDrag(localCoords: {start: Vector, current: Vector, delta: Vector}): void;
    onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent): void;
    onDragEnd(): void;
  }

  export type Template<
    Spec extends TemplateSpec = TemplateSpec
  > = PressableComponent.Template<Spec>;
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    PressableComponent.ImplementTemplateSpec<Spec>
}

export { ButtonComponent };
