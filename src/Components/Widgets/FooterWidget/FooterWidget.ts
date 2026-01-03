import { version } from "#package.json";
import { Router } from "@lightningjs/sdk";
import { getConsts } from "../../../CONSTS";
import { theme } from "../../../lib";
import { Widget } from "../Widget";

class FooterWidget<
  Spec extends FooterWidget.TemplateSpec = FooterWidget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig,
  Data extends Widget.Data = Widget.Data,
>
  extends Widget<Spec, Config, Data>
  implements Widget.ImplementTemplateSpec<FooterWidget.TemplateSpec>
{
  static override _template(): Widget.Template<FooterWidget.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      rect: true,
      w: width,
      h: height,
      y: getConsts().PAGE_HEIGHT - height,
      color: theme.surface.footer,
      collision: true,
      Version: {
        x: height,
        y: 30,
        mountY: 0.5,
        text: {
          text: "v" + version,
          textAlign: "right",
          textColor: theme.text.light.default,
        },
      },
    };
  }

  static override get width() {
    return getConsts().PAGE_WIDTH;
  }

  static override get height() {
    return 50;
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
    return Router.focusWidget("FooterWidget");
  }

  override _getFocused(): ReturnType<Widget["_getFocused"]> {
    return this as FooterWidget;
  }
}

declare namespace FooterWidget {
  export interface TemplateSpec extends Widget.TemplateSpec {
    Version: Record<string | symbol, unknown>;
  }
}

export { FooterWidget };
