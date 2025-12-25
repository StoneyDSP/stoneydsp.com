import { name } from "#package.json";
import { getConsts } from "../../../CONSTS";
import { theme } from "../../../lib";
import { Widget } from "./../Widget";

class HeaderWidget<
  Spec extends HeaderWidget.TemplateSpec = HeaderWidget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig
>
  extends Widget<Spec, Config>
  implements Widget.ImplementTemplateSpec<HeaderWidget.TemplateSpec>
{
  static override _template(): Widget.Template<HeaderWidget.TemplateSpec> {
    const {width, height} = this;
    return {
      ...super._template(),
      rect: true,
      w: width,
      h: height,
      color: theme.surface.header,
      Title: {
        x: this.height,
        y: 30,
        mountY: 0.5,
        text: { text: name },
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


declare namespace HeaderWidget {
  export interface TemplateSpec extends Widget.TemplateSpec {
    Title: Record<string | symbol, unknown>
  }
}

export { HeaderWidget };
