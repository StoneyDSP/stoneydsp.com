import { BaseComponent } from "fx-audio-dev";
import { getConsts } from "../CONSTS";
import { theme } from "../lib";
import type { ControlSpec } from "../scenes/types";
import type { AudioSM } from "../Services/AudioSM/AudioSM";
import { ControlComponent } from "./base/ControlComponent/ControlComponent";
import { Draggable } from "./base/Draggable/Draggable";
import { ToggleButtonComponent } from "./Controllers/ToggleButton/ToggleButtonComponent/ToggleButtonComponent";

class ControlsPanelComponent<
  Spec extends ControlsPanelComponent.TemplateSpec =
    ControlsPanelComponent.TemplateSpec,
  Config extends ControlsPanelComponent.TypeConfig =
    ControlsPanelComponent.TypeConfig,
  Data extends ControlsPanelComponent.Data = ControlsPanelComponent.Data,
>
  extends BaseComponent<Spec, Config, Data>
  implements
    BaseComponent.ImplementTemplateSpec<ControlsPanelComponent.TemplateSpec>
{
  private _unsubs: Array<() => void> = [];
  private _scrollY = 0;
  private _contentH = 0;
  private _thumbH = 40;

  static override _template(): BaseComponent.Template<ControlsPanelComponent.TemplateSpec> {
    const { width, height } = this;
    const scrollbar = {
      width: 10,
    };
    return {
      ...super._template(),
      rect: true,
      color: theme.surface.panel, // subtle, can theme this later
      collision: true, // IMPORTANT: wheel handler won’t run otherwise in many cases
      w: width,
      h: height,
      Items: {
        x: 0,
        y: 0,
        w: this.width,
        h: this.height,
        clipping: true,
        collision: true, // so we can pan-drag on empty area if we want
      },
      Scrollbar: {
        x: this.width - scrollbar.width,
        y: 0,
        w: scrollbar.width,
        h: this.height,
        rect: true,
        color: 0x33000000, // track
        collision: true,
        Thumb: {
          type: Draggable,
          collision: true,
          x: 0,
          y: 0,
          w: 10,
          h: 40,
          rect: true,
          color: 0x99ffffff,
        },
      },
      Pan: {
        type: Draggable,
        x: 0,
        y: 0,
        w: this.width - 10,
        h: this.height,
        color: 0x00000000,
        collision: true,
      },
    };
  }

  static get width() {
    return 200; // sidebar inner width; tweak
  }

  static get height() {
    return getConsts().PAGE_HEIGHT; // will be constrained by parent anyway
  }

  override _active(): void {
    this._create();
    (this as ControlsPanelComponent).tag("Scrollbar.Thumb")!.patch({
      signals: {
        onDrag: (localCoords: { delta: { x: number; y: number } }) => {
          const dy = localCoords.delta.y;
          const trackH = this.h;
          const max = Math.max(0, this._contentH - trackH);
          const travel = Math.max(1, trackH - this._thumbH);

          // convert thumb movement to scroll movement
          const scrollDelta = (dy / travel) * max;
          this._setScroll(this._scrollY + scrollDelta);
        },
      },
    });
    (this as ControlsPanelComponent).tag("Pan")!.patch({
      signals: {
        onDrag: (localCoords: { delta: { y: number } }) => {
          // drag down -> scroll up feels natural; invert if desired
          this._setScroll(this._scrollY - localCoords.delta.y);
        },
      },
    });
    return super._active();
  }

  override _inactive(): void {
    for (const fn of this._unsubs) fn();
    this._unsubs.length = 0;
    return super._inactive();
  }

  private _create(): void {
    // cleanup old subscriptions
    for (const fn of this._unsubs) fn();
    this._unsubs.length = 0;

    const { audio, controls } = this.data.panel;

    const rowH = 96;
    const pad = 16;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children: any[] = [];
    let y = pad;

    for (const spec of controls) {
      if (spec.kind !== "toggle") continue;

      children.push({
        type: ToggleButtonComponent,
        ref: `Control_${spec.id}`,
        x: pad,
        y,
        w: this.w - pad * 2,
        h: rowH,
        // color: 0x88ffffff, // DEBUG force visible
        collision: true,
        cursor: "pointer",
        data: {
          label: spec.label,
          control: {
            label: spec.label,
            address: spec.address,
            flags: { enabled: true, readOnly: false },
            state: { value: Boolean(spec.default ?? true) },
          },
        },
        signals: {
          onControlCommit: (payload: { value: unknown }) => {
            void audio.set(spec.address, Boolean(payload.value));
          },
        },
      });

      // Patch Items children in one go
      (this as ControlsPanelComponent).tag("Items")!.patch({ children });

      // backend -> UI
      this._unsubs.push(
        audio.subscribe(spec.address, (v) => {
          // coerce based on spec.kind
          const next = Boolean(v);
          // spec.kind === "toggle"
          //   ? Boolean(v)
          //   : spec.kind === "slider"
          //     ? Number(v) // optionally clamp 0..1 here
          //     : String(v); // combo

          const tag = (this as ControlsPanelComponent).tag(
            // @ts-expect-error template mismatch
            `Control_${spec.id}`
          )! as ControlComponent;
          if (!tag) return;

          // Use the component's own safe setter instead of patching nested data here
          tag.setControlValue(next);
        })
      );

      y += rowH + pad;
    }

    this._contentH = y; // y is the next write position after last row
    const dbg = this.data.panel.dbg;

    if (dbg?.forceContentHeight && dbg.forceContentHeight > this._contentH) {
      this._contentH = dbg.forceContentHeight;
    }

    // apply scroll position
    // clamp scroll in case content shrank
    this._setScroll(this._scrollY);
  }

  override _handleScroll(coords: { x: number; y: number }): boolean | void {
    // Typical feel: wheel down scrolls down (positive deltaY)
    this._setScroll(this._scrollY + coords.y);

    return true;
  }

  private _setScroll(next: number) {
    this._scrollY = this._clampScroll(next);
    (this as ControlsPanelComponent).tag("Items")!.patch({ y: -this._scrollY });
    this._updateScrollbar();
  }

  private _clampScroll(v: number) {
    const viewH = this.h;
    const max = Math.max(0, this._contentH - viewH);
    return Math.max(0, Math.min(max, v));
  }

  private _updateScrollbar() {
    const track = (this as ControlsPanelComponent).tag("Scrollbar")!;
    const thumb = track?.tag("Thumb");
    if (!thumb) return; // if hidden, return...

    const viewH = this.h;
    const contentH = Math.max(viewH, this._contentH);
    const maxScroll = Math.max(0, contentH - viewH);

    // Uncomment to hide if no scrolling needed
    // track.patch({ alpha: maxScroll > 0 ? 1 : 0 });
    const dbg = this.data.panel.dbg;
    const forceVisible = !!dbg?.forceScrollbar;

    track.patch({ alpha: forceVisible || maxScroll > 0 ? 1 : 0 });

    const thumbH = Math.max(32, Math.round((viewH / contentH) * viewH));
    const t = maxScroll === 0 ? 0 : this._scrollY / maxScroll;
    const thumbY = Math.round(t * (viewH - thumbH));

    thumb.patch({ h: thumbH, y: thumbY });
  }
}

declare namespace ControlsPanelComponent {
  export interface Data extends BaseComponent.Data {
    panel: {
      audio: AudioSM;
      controls: readonly ControlSpec[];
      dbg?: {
        forceScrollbar?: boolean;
        forceContentHeight?: number; // e.g. 2000
        logWheel?: boolean;
      };
    };
  }

  export interface TemplateSpec extends BaseComponent.TemplateSpec {
    data: Data;
    Items: Record<string, unknown>;
    Scrollbar: {
      Thumb: typeof Draggable;
    };
    Pan: typeof Draggable;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends BaseComponent.TypeConfig {}
}

export { ControlsPanelComponent };
