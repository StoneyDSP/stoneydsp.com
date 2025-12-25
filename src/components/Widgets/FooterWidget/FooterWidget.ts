import { version } from "#package.json";
import { getConsts } from "../../../CONSTS";
import { theme } from "../../../lib";
import { Widget } from "../Widget";

class FooterWidget<
  Spec extends FooterWidget.TemplateSpec = FooterWidget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig
>
  extends Widget<Spec, Config>
  implements Widget.ImplementTemplateSpec<FooterWidget.TemplateSpec>
{
  static override _template(): Widget.Template<FooterWidget.TemplateSpec> {
    const {width, height} = this;
    return {
      ...super._template(),
      rect: true,
      w: width,
      h: height,
      y: getConsts().PAGE_HEIGHT - this.height,
      color: theme.surface.footer,
      Version: {
        x: this.height,
        y: 30,
        mountY: 0.5,
        text: {
          text: 'v' + version,
          textAlign: 'right'
        },
      },
    };
  }

  static override get width() {
    return getConsts().PAGE_WIDTH
  }

  static override get height() {
    return 50
  }
}


declare namespace FooterWidget {
  export interface TemplateSpec extends Widget.TemplateSpec {
    Version: Record<string | symbol, unknown>
  }
}

export { FooterWidget };
