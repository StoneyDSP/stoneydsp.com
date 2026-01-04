import { Router } from "@lightningjs/sdk";
import { BasePageComponent } from "stoneydsp";
import { getAppData } from "../../AppData";
import { getConsts } from "../../CONSTS";
import { Container } from "../../Container";
import {
  PageActions,
  sendPageEvent,
  type EventBus,
  type PageData,
} from "../../Events";
import { theme } from "../../lib";
import { Log } from "../../lib/Log";
import type { BaseSM } from "../../Services";

/// --------------------------------------------------------------------- CLASS

class Page<
  Spec extends Page.TemplateSpec = Page.TemplateSpec,
  Config extends Page.TypeConfig = Page.TypeConfig,
  Data extends Page.Data = Page.Data,
>
  extends BasePageComponent<Spec, Config, Data>
  implements BasePageComponent.ImplementTemplateSpec<Page.TemplateSpec>
{
  protected static _route: Router.RouteDefinition;

  public static get route(): Readonly<Router.RouteDefinition> {
    return this._route;
  }

  static {
    this._route = {
      ...this.route,
      path: "",
      component: () => {
        throw new Error();
      },
      widgets: [],
      hook: () => {
        throw new Error();
      },
    };
  }

  protected _services!: Page.Services;

  public get services(): Readonly<Page.Services> {
    return this._services;
  }

  protected override _data: Data = {
    label: this.constructor.name,
    events: {
      enabled: true,
      label: this.constructor.name,
      page: {
        component: this.constructor.name,
        active: this.active,
        attached: this.attached,
        visible: this.visible,
      },
    },
  } as Data;

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
      clipbox: true,
    };
  }

  private static _width = getConsts().PAGE_WIDTH;

  static override get width() {
    return this._width;
  }

  private static _height = getConsts().PAGE_HEIGHT;

  static override get height() {
    return this._height;
  }

  public getPageEventData(): Page.Data["events"]["page"] {
    return {
      ...this.getData()?.events?.page,
      component: this.ref ?? this.constructor.name,
      active: this.active,
      attached: this.attached,
      visible: this.visible,
    };
  }

  public setPageEventData(data?: Page.Data["events"]["page"] | undefined) {
    this.data.events.page = {
      ...this.getData()?.events?.page,
      ...data,
    };
  }

  protected _constructServices(): void {
    this._services = {
      eventBus: getAppData().container.get({
        token: Container.Token.EventBus,
      }),
    };
  }

  protected _sendPageEvent<T extends PageActions = PageActions>(
    action: T,
    data?: Partial<Page.Data["events"]["page"]>
  ) {
    return sendPageEvent(action, { ...this.getPageEventData(), ...data });
  }

  /// -------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<BasePageComponent["_construct"]> {
    this._constructServices();
    this._sendPageEvent(PageActions.CONSTRUCT);
    return super._construct();
  }

  override _build(): ReturnType<BasePageComponent["_build"]> {
    this._sendPageEvent(PageActions.BUILD);
    return super._build();
  }

  override _setup(): ReturnType<BasePageComponent["_setup"]> {
    this._sendPageEvent(PageActions.SETUP);
    return super._setup();
  }

  override _init(): ReturnType<BasePageComponent["_init"]> {
    this._sendPageEvent(PageActions.INIT);
    return super._init();
  }

  override _attach(): ReturnType<BasePageComponent["_attach"]> {
    this._sendPageEvent(PageActions.ATTACH);
    return super._attach();
  }

  override _firstEnable(): ReturnType<BasePageComponent["_firstEnable"]> {
    this._sendPageEvent(PageActions.FIRST_ENABLE);
    return super._firstEnable();
  }

  override _enable(): ReturnType<BasePageComponent["_enable"]> {
    this._sendPageEvent(PageActions.ENABLE);
    return super._enable();
  }

  override _firstActive(): ReturnType<BasePageComponent["_firstActive"]> {
    this._sendPageEvent(PageActions.FIRST_ACTIVE);
    return super._firstActive();
  }

  override _active(): ReturnType<BasePageComponent["_active"]> {
    this._sendPageEvent(PageActions.ACTIVE);
    return super._active();
  }

  override _detach(): ReturnType<BasePageComponent["_detach"]> {
    this._sendPageEvent(PageActions.DETACH);
    return super._detach();
  }

  override _disable(): ReturnType<BasePageComponent["_disable"]> {
    this._sendPageEvent(PageActions.DISABLE);
    return super._disable();
  }

  override _inactive(): ReturnType<BasePageComponent["_inactive"]> {
    this._sendPageEvent(PageActions.INACTIVE);
    return super._inactive();
  }

  /// --------------------------------------------------------------- PAGE HOOKS

  override _onDataProvided(): ReturnType<BasePageComponent["_onDataProvided"]> {
    this._sendPageEvent(PageActions.DATA_PROVIDED);
    return super._onDataProvided();
  }

  override _onMounted(): ReturnType<BasePageComponent["_onMounted"]> {
    this._sendPageEvent(PageActions.MOUNTED);
    return super._onMounted();
  }

  override _onChanged(): ReturnType<BasePageComponent["_onChanged"]> {
    this._sendPageEvent(PageActions.CHANGED);
    return super._onChanged();
  }

  override _onUrlParams(
    params: Page.PageParams
  ): ReturnType<BasePageComponent["_onUrlParams"]> {
    // this._params = params;
    this._sendPageEvent(PageActions.URL_PARAMS);
    return super._onUrlParams(params);
  }

  /// ---------------------------------------------------------- ERROR HANDLERS

  protected _handleError(e: unknown) {
    Log.error(e);
  }

  protected _handleFatalError(e: unknown) {
    Log.error(e);
    Router.navigate({
      to: "!",
    });
  }
}

/// ----------------------------------------------------------------- NAMESPACE

namespace Page {
  export interface Services extends Record<symbol, BaseSM> {
    readonly eventBus: EventBus;
  }

  /// ----------------------------------------------------------- TEMPLATE SPEC

  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export interface TemplateSpec extends BasePageComponent.TemplateSpec {
    data: Data;
    signals: Signals;
    passSignals: PassSignals;
  }

  export type Signals<Config extends TypeConfig = TypeConfig> =
    BasePageComponent.Signals<Config>;

  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    BasePageComponent.PassSignals<Config>;

  export interface TypeConfig extends BasePageComponent.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
    HistoryStateType: Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends BasePageComponent.EventMap {}

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends BasePageComponent.SignalMap {}

  export type HistoryState<Config extends TypeConfig = TypeConfig> =
    BasePageComponent.HistoryState<Config>;

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BasePageComponent.ImplementTemplateSpec<Spec>;

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BasePageComponent.Template<Spec>;

  export type Constructor<C extends Page = Page> =
    BasePageComponent.Constructor<C>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PageParams extends BasePageComponent.PageParams {}

  export interface Data extends BasePageComponent.Data {
    events: {
      page: Partial<PageData>;
      enabled: true;
      label: string;
    };
  }
}

/// -------------------------------------------------------------------- EXPORT

export { Page as default, Page };

/// ---------------------------------------------------------------------------
