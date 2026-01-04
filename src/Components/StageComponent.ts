import { BaseComponent } from "stoneydsp";
import { Draggable } from "./base/Draggable/Draggable";
import { GridBgComponent } from "./GridBgComponent";

class StageComponent<
  Spec extends StageComponent.TemplateSpec = StageComponent.TemplateSpec,
  Config extends StageComponent.TypeConfig = StageComponent.TypeConfig,
  Data extends StageComponent.Data = BaseComponent.Data,
>
  extends BaseComponent<Spec, Config, Data>
  implements BaseComponent.ImplementTemplateSpec<StageComponent.TemplateSpec>
{
  private _camX = 0;
  private _camY = 0;

  static override _template(): StageComponent.Template<StageComponent.TemplateSpec> {
    return {
      ...super._template(),

      // Full-size drag catcher behind everything else
      PanSurface: {
        type: Draggable,
        x: 0,
        y: 0,
        w: (w: number) => w,
        h: (h: number) => h,
        zIndex: 0,
        collision: true,
        // make it visually invisible
        rect: true,
        color: 0x00000000,

        // signals: {
        //   onDragStart: (evt: MouseEvent | TouchEvent) => {
        //     // Optional: only allow if user started on empty area.
        //     // In practice, if your modules are above and collision=true, they’ll eat events first.
        //     // So PanSurface will only get drag when empty is hit.
        //   },
        //   onDrag: (localCoords: { delta: { x: number; y: number } }) => {
        //     // invert if you prefer “grab the world”
        //     (this as StageComponent)._panBy(
        //       localCoords.delta.x,
        //       localCoords.delta.y
        //     );
        //   },
        // },
      },

      // World container that actually moves
      World: {
        x: 0,
        y: 0,
        zIndex: 1,
        collision: false,

        // Grid moves with world (orientation cue)
        Grid: {
          type: GridBgComponent,
          x: 0,
          y: 0,
          w: (w: number) => w,
          h: (h: number) => h,
          collision: false,
          zIndex: 0,
        },

        // Your existing stuff goes here
        // e.g. OscModule_1, etc.
        Modules: {
          collision: false,
          zIndex: 1,
        },
      },
    };
  }

  override _firstActive(): ReturnType<BaseComponent["_firstActive"]> {
    (this as StageComponent).patch({
      signals: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onDragStart: (_evt: MouseEvent | TouchEvent) => {
          // Optional: only allow if user started on empty area.
          // In practice, if your modules are above and collision=true, they’ll eat events first.
          // So PanSurface will only get drag when empty is hit.
        },
        onDrag: (localCoords: { delta: { x: number; y: number } }) => {
          // invert if you prefer “grab the world”
          (this as StageComponent)._panBy(
            localCoords.delta.x,
            localCoords.delta.y
          );
        },
      },
    });
    return super._firstActive();
  }

  private _panBy(dx: number, dy: number) {
    this._camX += dx;
    this._camY += dy;

    // Optional clamps if you have world bounds later:
    // this._camX = clamp(this._camX, minX, maxX);
    // this._camY = clamp(this._camY, minY, maxY);

    (this as StageComponent).tag("World")!.patch({
      x: this._camX,
      y: this._camY,
    });
  }
}

declare namespace StageComponent {
  export interface TemplateSpec extends BaseComponent.TemplateSpec {
    PanSurface: typeof Draggable;
    World: {
      Grid: typeof GridBgComponent;
      Modules: Record<string | symbol, unknown>;
    };
  }
  export interface TypeConfig extends BaseComponent.TypeConfig {
    IsPage: false;
  }
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.Template<Spec>;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends BaseComponent.Data {}
}

export { StageComponent };
