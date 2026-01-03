import { BaseComponent, Vector } from "fx-audio-dev";
import { getAppData } from "../../AppData";
import { ToggleButtonComponent } from "../../Components/Controllers/ToggleButton";
import type { ControlAddress } from "../../Components/Controllers/types";
import { Container } from "../../Container";

class DebugTonePanel<
  Spec extends DebugTonePanel.TemplateSpec = DebugTonePanel.TemplateSpec,
  Config extends DebugTonePanel.TypeConfig = DebugTonePanel.TypeConfig,
  Data extends DebugTonePanel.Data = DebugTonePanel.Data,
>
  extends BaseComponent<Spec, Config, Data>
  implements BaseComponent.ImplementTemplateSpec<DebugTonePanel.TemplateSpec>
{
  static override _template(): DebugTonePanel.Template<DebugTonePanel.TemplateSpec> {
    return {
      ...super._template(),

      OscA: {
        type: ToggleButtonComponent,
        w: (w) => w * 0.25,
        h: (h) => h * 0.25,
        collision: true,
        x: 50,
        data: {
          label: "OSC A",

          events: {
            enabled: true,
            action: { label: "toggle", data: {} },
          },

          control: {
            kind: "toggle",
            address: { namespace: "osc_a", key: "mute" },
            flags: { enabled: true, readOnly: false },
            state: { value: false },
            label: "OSC A",
          },
        } as ToggleButtonComponent.Data,
      },
      OscB: {
        type: ToggleButtonComponent,
        w: (w) => w * 0.25,
        h: (h) => h * 0.25,
        x: 50,
        y: 400,
        data: {
          label: "OSC B",

          events: {
            enabled: true,
            action: { label: "toggle", data: {} },
          },

          control: {
            kind: "toggle",
            address: { namespace: "osc_b", key: "mute" },
            flags: { enabled: true, readOnly: false },
            state: { value: false },
            label: "OSC B",
          },
        } as ToggleButtonComponent.Data,
      },
    };
  }

  private _dragStartPos: Vector | null = null;

  protected _onDragStart(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _event: globalThis.MouseEvent | globalThis.TouchEvent
  ) {
    const fader = (this as DebugTonePanel).tag("OscA")!;
    this._dragStartPos = new Vector(fader.x as number, fader.y as number);
  }

  protected _onDrag(localCoords: {
    start: Vector;
    current: Vector;
    delta: Vector;
  }) {
    if (!this._dragStartPos) return;
    (this as DebugTonePanel).tag("OscA")!.patch({
      x: this._dragStartPos.x + localCoords.delta.x,
      y: this._dragStartPos.y + localCoords.delta.y,
    });
  }

  protected _onDragEnd() {
    this._dragStartPos = null;
  }

  override _firstActive(): ReturnType<BaseComponent["_firstActive"]> {
    //
    const oscA = (this as DebugTonePanel).tag("OscA")!;
    const oscB = (this as DebugTonePanel).tag("OscB")!;
    //
    const audio = getAppData().container.get({
      token: Container.Token.AudioSM,
    });
    //
    // Wire the control intents to the audio service:
    oscA.patch({
      signals: {
        // onDrag: "_onDrag",
        // onDragStart: "_onDragStart",
        // onDragEnd: "_onDragEnd",
        onControlCommit: async (payload: {
          address: ControlAddress;
          label: string;
          value: unknown;
        }) => {
          await audio.set(payload.address, payload.value as boolean);
        },
      },
    });
    oscB.patch({
      signals: {
        onControlCommit: async (payload: {
          address: ControlAddress;
          label: string;
          value: unknown;
        }) => {
          await audio.set(payload.address, payload.value as boolean);
        },
      },
    });
    //
    const unsubOscA = audio.subscribe?.(oscA.data.control.address, (v) => {
      oscA.setControlValue(v as boolean);
    });
    const unsubOscB = audio.subscribe?.(oscB.data.control.address, (v) => {
      oscB.setControlValue(v as boolean);
    });
    //
    this._unsubs.push(unsubOscA ?? (() => {}));
    this._unsubs.push(unsubOscB ?? (() => {}));
    //
    return super._firstActive();
  }

  override _inactive() {
    this._unsubs.forEach((fn) => fn());
    this._unsubs.length = 0;
    return super._inactive();
  }

  private _unsubs: Array<() => void> = [];
}

namespace DebugTonePanel {
  export interface TemplateSpec extends BaseComponent.TemplateSpec {
    data: Data;
    // Grid: typeof GridBgComponent;
    OscA: typeof ToggleButtonComponent;
    OscB: typeof ToggleButtonComponent;
    OscC: typeof ToggleButtonComponent;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends BaseComponent.TypeConfig {
    // EventMapType: EventMap;
    // SignalMapType: SignalMap;
  }
  /**
   *
   */
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.ImplementTemplateSpec<Spec>;
  /**
   *
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.Template<Spec>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends BaseComponent.Data {}
}

export { DebugTonePanel, DebugTonePanel as default };
