import { Lightning, Router } from "@lightningjs/sdk";
import { Vector } from "stoneydsp";
import { Log } from "../../../../../lib/Log";
import { ButtonComponent } from "../../../../base/PressableComponent/ButtonComponent";

class HomeNavButton<
  Spec extends HomeNavButton.TemplateSpec = HomeNavButton.TemplateSpec,
  Config extends HomeNavButton.TypeConfig = HomeNavButton.TypeConfig,
>
  extends ButtonComponent<Spec, Config>
  implements ButtonComponent.ImplementTemplateSpec<HomeNavButton.TemplateSpec>
{
  static override _template(): HomeNavButton.Template<HomeNavButton.TemplateSpec> {
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
      cursor: "grab",
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
    target: Parameters<NonNullable<ButtonComponent["_handleClick"]>>[0],
    localCoords: Parameters<NonNullable<ButtonComponent["_handleClick"]>>[1]
  ) {
    this._onClick();
    Log.event(this.ref ?? this.constructor.name, "_handleCick()", {
      target,
      localCoords,
    });

    return super._handleClick(target, localCoords);
  }

  override _handleHover(
    target: Parameters<NonNullable<ButtonComponent["_handleHover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleHover()", { target });
    return super._handleHover(target);
  }

  override _handleUnhover(
    target: Parameters<NonNullable<ButtonComponent["_handleUnhover"]>>[0]
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleUnhover()", {
      target,
    });
    return super._handleUnhover(target);
  }

  override _handleTouchStart(
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchStart()", {
      event,
    });
  }

  override _handleTouchEnd(delta: Vector) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchEnd()", {
      delta,
    });
  }

  override _handleTouchHover(current: Vector) {
    Log.event(this.ref ?? this.constructor.name, "_handleTouchHover()", {
      current,
    });
  }

  protected override _onClick() {
    (this as HomeNavButton).signal("onPress");
    Router.navigate("home");
  }
}

declare namespace HomeNavButton {
  export interface TemplateSpec extends ButtonComponent.TemplateSpec {
    Label: Record<string | symbol, unknown>;
  }
  export interface TypeConfig extends ButtonComponent.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends ButtonComponent.EventMap {}

  /**
   *
   */
  export interface SignalMap extends ButtonComponent.SignalMap {
    onDrag(localCoords: {
      start: Vector;
      current: Vector;
      delta: Vector;
    }): void;
    onDragStart(event: globalThis.MouseEvent | globalThis.TouchEvent): void;
    onDragEnd(): void;
  }

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    ButtonComponent.Template<Spec>;
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    ButtonComponent.ImplementTemplateSpec<Spec>;
}

export { HomeNavButton };
