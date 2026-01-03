import { name } from "#package.json";
import { Router } from "@lightningjs/sdk";
import { getAppData } from "../../../AppData";
import { getConsts } from "../../../CONSTS";
import { Container } from "../../../Container";
import { theme } from "../../../lib";
import { ComboBoxComponent } from "../../Controllers/ComboBox/ComboBoxComponent/ComboBoxComponent";
import { Widget } from "../Widget";

class HeaderWidget<
  Spec extends HeaderWidget.TemplateSpec = HeaderWidget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig,
  Data extends Widget.Data = Widget.Data,
>
  extends Widget<Spec, Config, Data>
  implements Widget.ImplementTemplateSpec<HeaderWidget.TemplateSpec>
{
  static override _template(): Widget.Template<HeaderWidget.TemplateSpec> {
    const { width, height } = this;
    const modeSelect = {
      width: 150,
    };
    return {
      ...super._template(),
      rect: true,
      w: width,
      h: height,
      color: theme.surface.header,
      collision: true,
      Title: {
        x: this.height,
        y: 30,
        mountY: 0.5,
        text: {
          text: name,
          textColor: theme.text.light.default,
        },
      },
      ModeSelect: {
        type: ComboBoxComponent,
        rect: true,
        color: theme.menu.background,
        x: getConsts().PAGE_WIDTH - modeSelect.width - 8,
        y: 8,
        w: modeSelect.width,
        h: 100,
        collision: true,
      },
    };
  }

  static override get width() {
    return getConsts().PAGE_WIDTH;
  }

  static override get height() {
    return 50;
  }

  override _active() {
    const audio = getAppData().container.get({
      token: Container.Token.AudioSM,
    });

    (this as HeaderWidget).tag("ModeSelect")!.patch({
      data: {
        label: "Engine Mode",
        control: {
          kind: "choice",
          address: "global:engineMode",
          flags: { enabled: true, readOnly: false },
          state: { value: "eco" },
          spec: {
            options: [
              { id: "eco", label: "Eco" },
              { id: "hq", label: "HQ" },
            ],
          },
        },
      },
      signals: {
        onControlCommit: (payload: { value: unknown }) => {
          void audio.set(
            (this as HeaderWidget).tag("ModeSelect")!.data.control.address,
            String(payload.value)
          );
        },
      },
    });
    return super._active();
  }

  override _handleClick(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _target: Parameters<NonNullable<Widget["_handleClick"]>>[0],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _localCoords: Parameters<NonNullable<Widget["_handleClick"]>>[1]
  ): ReturnType<NonNullable<Widget["_handleClick"]>> {
    this.focusWidget();
    return true;
  }

  _handleTouchStart() {
    this.focusWidget();
  }

  public focusWidget() {
    return Router.focusWidget("HeaderWidget");
  }
}

declare namespace HeaderWidget {
  export interface TemplateSpec extends Widget.TemplateSpec {
    Title: Record<string | symbol, unknown>;
    ModeSelect: typeof ComboBoxComponent;
  }
}

export { HeaderWidget };
