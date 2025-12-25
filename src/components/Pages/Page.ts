import type { Router } from "@lightningjs/sdk";
import { BasePageComponent } from "@stoneydsp/lightning-ui-components";
import { getConsts } from "../../CONSTS";
import { theme } from "../../lib";
import { Log } from "../../lib/Log/Log";

class Page<
  Spec extends Page.TemplateSpec = Page.TemplateSpec,
  Config extends Page.TypeConfig = Page.TypeConfig
>
  extends BasePageComponent<Spec, Config>
  implements BasePageComponent.ImplementTemplateSpec<Page.TemplateSpec>
{
  public static route: Router.RouteDefinition;

  static override _template(): Page.Template<Page.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      color: theme.surface.background,
      rect: true,
      mw: width,
      mh: height,
      w: width,
      h: height,
      clipping: true,
      clipbox: true
    }
  }

  private static _width = getConsts().PAGE_WIDTH;

  static override get width() {
    return this._width;
  }

  private static _height = getConsts().PAGE_HEIGHT;

  static override get height() {
    return this._height;
  }


  /// -------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<BasePageComponent['_construct']> {
    Log.event("page:construct",this.constructor.name);
    return super._construct();
  }

  override _build(): ReturnType<BasePageComponent['_build']> {
    Log.event( "page:build", this.constructor.name);
    return super._build();
  }

  override _setup(): ReturnType<BasePageComponent['_setup']> {
    Log.event("page:setup", this.constructor.name);
    return super._setup();
  }

  override _init(): ReturnType<BasePageComponent['_init']> {
    Log.event("page:init", this.constructor.name);
    return super._init();
  }

  override _attach(): ReturnType<BasePageComponent['_attach']> {
    Log.event("page:attach", this.constructor.name);
    return super._attach();
  }

  override _firstEnable(): ReturnType<BasePageComponent['_firstEnable']> {
    Log.event("page:firstEnable", this.constructor.name);
    return super._firstEnable();
  }

  override _enable(): ReturnType<BasePageComponent['_enable']> {
    Log.event("page:enable", this.constructor.name);
    return super._enable();
  }

  override _firstActive(): ReturnType<BasePageComponent['_firstActive']> {
    Log.event("page:firstActive", this.constructor.name);
    return super._firstActive();
  }

  override _active(): ReturnType<BasePageComponent['_active']> {
    Log.event("page:active", this.constructor.name);
    return super._active();
  }

  override _detach(): ReturnType<BasePageComponent['_detach']> {
    Log.event("page:detach", this.constructor.name);
    return super._detach();
  }

  override _disable(): ReturnType<BasePageComponent['_disable']> {
    Log.event("page:disable", this.constructor.name);
    return super._disable();
  }

  override _inactive(): ReturnType<BasePageComponent['_inactive']> {
    Log.event("page:inactive", this.constructor.name);
    return super._inactive();
  }
}

namespace Page {
  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TemplateSpec extends BasePageComponent.TemplateSpec {}
  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends BasePageComponent.TypeConfig {}
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> = BasePageComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> = BasePageComponent.Template<Spec>;
  export type Constructor<C extends Page = Page> = BasePageComponent.Constructor<C>
}

export { Page };
