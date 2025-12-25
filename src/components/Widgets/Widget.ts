import { BaseWidgetComponent } from "@stoneydsp/lightning-ui-components";
import { Log } from "../../lib/Log/Log";

class Widget<
  Spec extends Widget.TemplateSpec = Widget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig
>
  extends BaseWidgetComponent<Spec, Config>
  implements BaseWidgetComponent.ImplementTemplateSpec<Widget.TemplateSpec>
{

  static override _template(): Widget.Template<Widget.TemplateSpec> {
    return {
      ...super._template(),
    }
  }

  /// -------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<BaseWidgetComponent['_construct']> {
    Log.event("widget:construct", this.constructor.name);
    return super._construct();
  }

  override _build(): ReturnType<BaseWidgetComponent['_build']> {
    Log.event("widget:build",this.constructor.name);
    return super._build();
  }

  override _setup(): ReturnType<BaseWidgetComponent['_setup']> {
    Log.event("widget:setup", this.constructor.name);
    return super._setup();
  }

  override _init(): ReturnType<BaseWidgetComponent['_init']> {
    Log.event("widget:init", this.constructor.name);
    return super._init();
  }

  override _attach(): ReturnType<BaseWidgetComponent['_attach']> {
    Log.event("widget:attach", this.constructor.name);
    return super._attach();
  }

  override _firstEnable(): ReturnType<BaseWidgetComponent['_firstEnable']> {
    Log.event("widget:firstEnable", this.constructor.name);
    return super._firstEnable();
  }

  override _enable(): ReturnType<BaseWidgetComponent['_enable']> {
    Log.event("widget:enable", this.constructor.name);
    return super._enable();
  }

  override _firstActive(): ReturnType<BaseWidgetComponent['_firstActive']> {
    Log.event("widget:firstActive", this.constructor.name);
    return super._firstActive();
  }

  override _active(): ReturnType<BaseWidgetComponent['_active']> {
    Log.event("widget:active", this.constructor.name);
    return super._active();
  }

  override _detach(): ReturnType<BaseWidgetComponent['_detach']> {
    Log.event("widget:detach", this.constructor.name);
    return super._detach();
  }

  override _disable(): ReturnType<BaseWidgetComponent['_disable']> {
    Log.event("widget:disable", this.constructor.name);
    return super._disable();
  }

  override _inactive(): ReturnType<BaseWidgetComponent['_inactive']> {
    Log.event("widget:inactive", this.constructor.name);
    return super._inactive();
  }

}

namespace Widget {
  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TemplateSpec extends BaseWidgetComponent.TemplateSpec {}
  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends BaseWidgetComponent.TypeConfig {}
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> = BaseWidgetComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> = BaseWidgetComponent.Template<Spec>;
  export type Constructor<C extends Widget = Widget> = BaseWidgetComponent.Constructor<C>
}

export { Widget };
