import { Lightning } from "@lightningjs/sdk";
import type { Vector } from "fx-audio-dev";
import { theme } from "../../../../lib";
import { ControlComponent } from "../../../base/ControlComponent/ControlComponent";
import { Draggable } from "../../../base/Draggable/Draggable";
import { type ControlDelegate } from "../../ControlDelegate";
import { DefaultControlDelegate } from "../../DefaultControlDelegate";
import type { SliderControl } from "../../types";

class SliderComponent<
  Spec extends SliderComponent.TemplateSpec = SliderComponent.TemplateSpec,
  Config extends SliderComponent.TypeConfig = SliderComponent.TypeConfig,
  Data extends SliderComponent.Data = SliderComponent.Data,
>
  extends ControlComponent<Spec, Config, Data>
  implements
    ControlComponent.ImplementTemplateSpec<SliderComponent.TemplateSpec>
{
  private readonly _control: ControlDelegate<SliderComponent, SliderControl> =
    new DefaultControlDelegate(this as SliderComponent);

  static override _template(): SliderComponent.Template<SliderComponent.TemplateSpec> {
    return {
      ...super._template(),
      collision: true,
      rect: true,
      color: 0x00000000,

      Label: {
        x: 16,
        y: 12,
        text: { text: "", fontSize: 22, textColor: theme.text.dark.default },
      },

      Track: {
        // w: (w) => w * 0.2,
        // h: (h) => h * 0.8,
        // x: (w) => w * 0.5,
        // y: (h) => h * 0.5,
        // mount: 0.5,
        x: 24,
        y: 56,
        w: (w: number) => w - 48,
        h: (h: number) => h - 80,
        rect: true,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 10,
          fillColor: 0x22ffffff,
        },
      },

      Thumb: {
        // w: (w) => w * 0.6,
        // h: 24,
        // x: (w) => w * 0.5,
        // y: (h) => h * 0.5,
        // mount: 0.5,
        x: 24,
        y: 56,
        w: (w: number) => w - 48,
        h: 18,
        rect: true,
        collision: false,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 9,
          fillColor: theme.action.primary,
        },
      },

      // input overlay (captures drag)
      Drag: {
        type: Draggable,
        x: 24,
        y: 56,
        w: (w: number) => w - 48,
        h: (h: number) => h - 80, // match Track area (or whole component)
        // w: (w) => w * 0.2,
        // h: (h) => h * 0.8,
        // x: (w) => w * 0.5,
        // y: (h) => h * 0.5,
        // mount: 0.5,
        collision: true,
        color: 0x00000000,
        rect: true,
      },
    };
  }

  protected override _syncFromControlValue() {
    const label = this.data.label ?? this.data.control.label ?? "Slider";
    (this as SliderComponent).tag("Label")!.patch({ text: { text: label } });

    const v = Number(this.getControlValue());
    const n = Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;

    const track = (this as SliderComponent).tag("Track")!;
    const thumb = (this as SliderComponent).tag("Thumb")!;

    const trackY = track.finalY;
    const trackH = track.finalH;
    const thumbH = thumb.finalH;

    // top = 1.0, bottom = 0.0
    const y = trackY + (1 - n) * (trackH - thumbH);

    thumb.patch({ y });
  }

  override _active() {
    const drag = (this as SliderComponent).tag("Drag")!;

    drag.patch({
      signals: {
        onDragStart: (evt) => this.onDragStart(evt),
        onDrag: (coords) => this.onDrag(coords),
        onDragEnd: () => this.onDragEnd(),
      },
    });

    this._syncVisualsFromValue(this._read01());

    // // Wait one tick so w/h functions have been applied
    // this.stage.once("frameStart", () => {
    //   this._syncVisualsFromValue(this._read01());
    // });
    return super._active();
  }

  override _inactive() {
    const drag = (this as SliderComponent).tag("Drag");
    drag?.patch({ signals: {} });
    return super._inactive();
  }

  private _dragStartValue = 0;
  private _dragValue = 0;

  /** Called by parent or by your Draggable wiring on drag start */

  private _isFine = false;

  public onDragStart(evt: globalThis.MouseEvent | globalThis.TouchEvent) {
    if (!this._control.canInteract()) return;

    // Touch events don’t have modifier keys; mouse does.
    this._isFine = evt instanceof MouseEvent ? evt.shiftKey : false;

    const start = this._read01();
    this._dragStartValue = start;
    this._dragValue = start;

    this._control.begin();
  }

  /** Called repeatedly by drag updates */
  public onDrag(localCoords: {
    start: Vector;
    current: Vector;
    delta: Vector;
  }) {
    if (!this._control.canInteract()) return;

    const disp = {
      x: localCoords.current.x - localCoords.start.x,
      y: localCoords.current.y - localCoords.start.y,
    };

    const next = this._mapDeltaToValue(disp as Vector); // reuse function, but feed displacement
    this._dragValue = next;

    this.setControlValue(next);
    this._syncVisualsFromValue(next);
    this._control.change(next);
  }

  /** Called once at end of drag */
  public onDragEnd() {
    if (!this._control.canInteract()) return;

    // final commit
    this._control.commit(this._dragValue);
  }

  private _clamp01(n: number): number {
    // handle NaN too
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  }

  private _read01(): number {
    const raw = this.getControlValue();
    const n = typeof raw === "number" ? raw : Number(raw);
    return this._clamp01(Number.isFinite(n) ? n : 0);
  }

  private _syncVisualsFromValue(v01: number) {
    // Example: vertical track fill by moving thumb along Y.
    // Don’t use static class width/height; use tag dimensions.
    const track = (this as SliderComponent).tag("Track")!;
    const thumb = (this as SliderComponent).tag("Thumb")!;

    const trackH = track.finalH;
    const thumbH = thumb.finalH;

    if (!trackH || trackH <= thumbH) return; // can't place yet

    const travel = Math.max(0, trackH - thumbH);

    // v=0 at bottom, v=1 at top (common fader behaviour)
    const y = track.y + travel * (1 - v01);

    thumb.patch({ y });
  }

  private _mapDeltaToValue(delta: Vector): number {
    const spec = this.data.control.spec ?? ({} as SliderControl["spec"]);
    const axis: "x" | "y" = spec.axis ?? "y";
    const polarity: 1 | -1 = spec.polarity ?? -1;

    const track = (this as SliderComponent).tag("Track")!;
    const thumb = (this as SliderComponent).tag("Thumb")!;

    const travelPx =
      axis === "y"
        ? Math.max(1, track.finalH - thumb.finalH)
        : Math.max(1, track.finalW - thumb.finalW);

    // Base sensitivity
    let pixelsPerUnit =
      spec.sensitivity === "track" || spec.sensitivity == null
        ? travelPx
        : spec.sensitivity.pixelsPerUnit;

    // Fine adjust
    if (this._isFine) {
      const fine = spec.fineMultiplier ?? 6;
      pixelsPerUnit *= fine;
    }

    const d = axis === "x" ? delta.x : delta.y;
    const dv = (d * polarity) / Math.max(1, pixelsPerUnit);

    return this._clamp01(this._dragStartValue + dv);
  }
}

declare namespace SliderComponent {
  export interface TemplateSpec extends ControlComponent.TemplateSpec {
    data: Data;
    signals: Signals;
    passSignals: PassSignals;
    Track: Record<string | symbol, undefined>;
    Thumb: Record<string | symbol, undefined>;
    Drag: typeof Draggable;
  }

  export type Signals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.Signals<Config>;

  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    ControlComponent.PassSignals<Config>;

  export type NewPatchTemplate<T extends Constructor> =
    ControlComponent.NewPatchTemplate<T>;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends ControlComponent.TypeConfig {}
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    ControlComponent.Template<Spec>;
  export type Constructor<C extends SliderComponent = SliderComponent> =
    ControlComponent.Constructor<C>;
  export interface Data extends ControlComponent.Data {
    readonly label: string;
    control: SliderControl;
  }
}

export { SliderComponent };
