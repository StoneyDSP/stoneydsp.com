import { Lightning } from "@lightningjs/sdk";
import { PressableComponent, Vector } from "fx-audio-dev";
import { Log } from "../../../../lib/Log";

class ButtonComponent<
  Spec extends ButtonComponent.TemplateSpec = ButtonComponent.TemplateSpec,
  Config extends ButtonComponent.TypeConfig = ButtonComponent.TypeConfig,
  Data extends ButtonComponent.Data = ButtonComponent.Data,
>
  extends PressableComponent<Spec, Config, Data>
  implements
    PressableComponent.ImplementTemplateSpec<ButtonComponent.TemplateSpec>
{
  static override _template(): ButtonComponent.Template<ButtonComponent.TemplateSpec> {
    return {
      ...super._template(),
      rect: true,
      color: 0x00000000,
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 20,
        fillColor: 0xffffffff,
      },
      w: this.width,
      h: this.height,
      collision: true,
      cursor: "pointer",
      Label: {
        text: {
          text: "",
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    };
  }

  static override get width() {
    return 0;
  }

  static override get height() {
    return 0;
  }

  override _construct(): ReturnType<PressableComponent["_construct"]> {
    // const getString = JUCE.getNativeFunction("getString");
    // /// @ts-expect-error oops
    // getString().then((result) => {
    //   // console.log(result);
    //   (this as ButtonComponent).patch({
    //     Label: {
    //       text: {
    //         text: `${result}`,
    //       },
    //     },
    //   });
    //   return result;
    // });
    return super._construct();
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
    target: Parameters<NonNullable<PressableComponent["_handleClick"]>>[0],
    localCoords: Parameters<NonNullable<PressableComponent["_handleClick"]>>[1]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleCick()", {
      target,
      localCoords,
    });
    this._onClick();
    return super._handleClick(target, localCoords);
  }

  override _handleHover(
    target: Parameters<NonNullable<PressableComponent["_handleHover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleHover()", { target });
    return super._handleHover(target);
  }

  override _handleUnhover(
    target: Parameters<NonNullable<PressableComponent["_handleUnhover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleUnhover()", {
      target,
    });
    return super._handleUnhover(target);
  }

  protected _handleTouchStart(
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchStart()", {
      event,
    });
  }

  protected _handleTouchEnd(delta: Vector) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchEnd()", {
      delta,
    });
  }

  protected _handleTouchHover(current: Vector) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchHover()", {
      current,
    });
  }

  protected _onClick() {
    (this as ButtonComponent).signal("onPress");
  }
}

declare namespace ButtonComponent {
  export interface TemplateSpec extends PressableComponent.TemplateSpec {
    Label: Record<string | symbol, unknown>;
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

  export type Constructor<C extends ButtonComponent = ButtonComponent> =
    PressableComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends PressableComponent.Data {}
}

export { ButtonComponent };
