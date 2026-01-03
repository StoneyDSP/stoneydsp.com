import { Router } from "@lightningjs/sdk";
import { getConsts } from "../../../CONSTS";
import { theme } from "../../../lib";
import { Widget } from "../Widget";
// import { ErrorNavButton } from "./Buttons/ErrorNavButton/ErrorNavButton";
// import { HomeNavButton } from "./Buttons/HomeNavButton/HomeNavButton";
// import { NotFoundNavButton } from "./Buttons/NotFoundNavButton/NotFoundNavButton";
import { getAppData } from "../../../AppData";
import { Container } from "../../../Container";
import { SliderComponent } from "../../Controllers/Slider/SliderComponent/SliderComponent";
import { ControlsPanelComponent } from "../../ControlsPanelComponent";
import { FooterWidget } from "../FooterWidget";
import { HeaderWidget } from "../HeaderWidget";

class SideBarWidget<
  Spec extends SideBarWidget.TemplateSpec = SideBarWidget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig,
  Data extends Widget.Data = Widget.Data,
>
  extends Widget<Spec, Config, Data>
  implements Widget.ImplementTemplateSpec<SideBarWidget.TemplateSpec>
{
  static override _template(): Widget.Template<SideBarWidget.TemplateSpec> {
    const { width, height } = this;
    const headerH = HeaderWidget.height; // whatever yours is
    const footerH = FooterWidget.height;
    const wrappedH = height - headerH - footerH;
    return {
      ...super._template(),
      rect: true,
      collision: true,
      cursor: "pointer",
      color: theme.surface.panel,
      x: 0,
      y: headerH,
      w: width,
      h: wrappedH,
      Master: {
        type: SliderComponent,
        x: 0,
        y: 0,
        w: width * 0.5,
        h: wrappedH,
        collision: true,
      },
      Inspector: {
        type: ControlsPanelComponent,
        x: width * 0.5,
        y: 0,
        // w: width * 0.5,
        // h: wrappedH,
        collision: true,
      },
    };
  }

  static override get width() {
    return 200;
  }

  static override get height() {
    return getConsts().PAGE_HEIGHT;
  }

  override _active() {
    const audio = getAppData().container.get({
      token: Container.Token.AudioSM,
    });

    const globalMaster = "global:master";

    // master lives here, always visible
    (this as SideBarWidget).tag("Master")!.patch({
      data: {
        label: "Master",
        control: {
          kind: "slider",
          label: "Master",
          address: globalMaster,
          flags: { enabled: true, readOnly: false },
          state: { value: 0.6 },
          spec: { range: { min: 0, max: 1 }, step: 0.01 },
        },
      },
      signals: {
        onControlChange: (payload) => {
          void audio.set(globalMaster, payload.value);
        },
      },
    });

    (this as SideBarWidget).tag("Inspector")!.patch({
      data: {
        panel: {
          audio,
          controls: audio.activeSceneControls ?? [],
          dbg: {
            forceScrollbar: true,
            forceContentHeight: 2000,
            logWheel: true,
          },
        },
        label: "inspector",
      },
    });

    return super._active();
  }

  protected _goNotFound() {
    Router.navigate("*");
  }

  protected _goError() {
    Router.navigate("!");
  }

  protected _goBoot() {
    Router.navigate("$");
  }

  protected _goHome() {
    Router.navigate("home");
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
    return Router.focusWidget("SideBarWidget");
  }
}

declare namespace SideBarWidget {
  export interface TemplateSpec extends Widget.TemplateSpec {
    Master: typeof SliderComponent;
    Inspector: typeof ControlsPanelComponent;
    // SideBarContainer: {
    //   NotFoundNavButton: typeof NotFoundNavButton;
    //   ErrorNavButton: typeof ErrorNavButton;
    //   HomeNavButton: typeof HomeNavButton;
    // };
  }
}

export { SideBarWidget };
