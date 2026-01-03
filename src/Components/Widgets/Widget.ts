import { Router } from "@lightningjs/sdk";
import { BaseWidgetComponent } from "fx-audio-dev";
import { getAppData } from "../../AppData";
import { Container } from "../../Container";
import type { EventBus } from "../../Events/EventBus";
import { sendWidgetEvent } from "../../Events/send/sendWidgetEvent";
import { WidgetActions, type WidgetData } from "../../Events/types/WidgetEvent";
import { theme } from "../../lib";
import { Log } from "../../lib/Log/Log";
import type { BaseSM } from "../../Services/BaseSM";
import type { Page } from "../Pages/Page";

class Widget<
  Spec extends Widget.TemplateSpec = Widget.TemplateSpec,
  Config extends Widget.TypeConfig = Widget.TypeConfig,
  Data extends Widget.Data = Widget.Data,
>
  extends BaseWidgetComponent<Spec, Config, Data>
  implements BaseWidgetComponent.ImplementTemplateSpec<Widget.TemplateSpec>
{
  protected _services!: Widget.Services;

  public get services(): Readonly<Widget.Services> {
    return this._services;
  }

  protected override _data: Data = {
    label: this.constructor.name,
    events: {
      enabled: true,
      label: this.constructor.name,
      widget: {},
    },
  } as Data;

  static override _template(): Widget.Template<Widget.TemplateSpec> {
    return {
      ...super._template(),
      color: theme.surface.panel,
      rect: true,
    };
  }

  static override get width() {
    return super.width;
  }

  static override get height() {
    return super.height;
  }

  public getWidgetEventData(): Widget.Data["events"]["widget"] {
    return {
      ...(this as Widget).getData()?.events?.widget,
      component: this.ref ?? this.constructor.name,
      active: this.active,
      attached: this.attached,
      visible: this.visible,
    };
  }

  public setWidgetEventData(
    data?: Widget.Data["events"]["widget"] | undefined
  ) {
    this.data.events.widget = {
      ...(this as Widget).getData()?.events?.widget,
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

  protected _sendWidgetEvent<T extends WidgetActions = WidgetActions>(
    action: T,
    data?: Partial<Widget.Data["events"]["widget"]>
  ) {
    return sendWidgetEvent(action, {
      ...this.getWidgetEventData(),
      ...data,
    });
  }

  /// -------------------------------------------------------------- LIFECYCLES

  override _construct(): ReturnType<BaseWidgetComponent["_construct"]> {
    this._constructServices();
    this._sendWidgetEvent(WidgetActions.CONSTRUCT);
    return super._construct();
  }

  override _build(): ReturnType<BaseWidgetComponent["_build"]> {
    this._sendWidgetEvent(WidgetActions.BUILD);
    return super._build();
  }

  override _setup(): ReturnType<BaseWidgetComponent["_setup"]> {
    this._sendWidgetEvent(WidgetActions.SETUP);
    return super._setup();
  }

  override _init(): ReturnType<BaseWidgetComponent["_init"]> {
    this._sendWidgetEvent(WidgetActions.INIT);
    return super._init();
  }

  override _attach(): ReturnType<BaseWidgetComponent["_attach"]> {
    this._sendWidgetEvent(WidgetActions.ATTACH);
    return super._attach();
  }

  override _firstEnable(): ReturnType<BaseWidgetComponent["_firstEnable"]> {
    this._sendWidgetEvent(WidgetActions.FIRST_ENABLE);
    return super._firstEnable();
  }

  override _enable(): ReturnType<BaseWidgetComponent["_enable"]> {
    this._sendWidgetEvent(WidgetActions.ENABLE);
    return super._enable();
  }

  override _firstActive(): ReturnType<BaseWidgetComponent["_firstActive"]> {
    this._sendWidgetEvent(WidgetActions.FIRST_ACTIVE);
    return super._firstActive();
  }

  override _active(): ReturnType<BaseWidgetComponent["_active"]> {
    this._sendWidgetEvent(WidgetActions.ACTIVE);
    return super._active();
  }

  override _detach(): ReturnType<BaseWidgetComponent["_detach"]> {
    this._sendWidgetEvent(WidgetActions.DETACH);
    return super._detach();
  }

  override _disable(): ReturnType<BaseWidgetComponent["_disable"]> {
    this._sendWidgetEvent(WidgetActions.DISABLE);
    return super._disable();
  }

  override _inactive(): ReturnType<BaseWidgetComponent["_inactive"]> {
    this._sendWidgetEvent(WidgetActions.INACTIVE);
    return super._inactive();
  }

  /// ------------------------------------------------------------ WIDGET HOOKS

  override _onActivated(
    page: Page
  ): ReturnType<BaseWidgetComponent["_onActivated"]> {
    this._sendWidgetEvent(WidgetActions.ACTIVATED);
    return super._onActivated(page);
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

namespace Widget {
  export interface Services extends Record<symbol, BaseSM> {
    readonly eventBus: EventBus;
  }
  export interface TemplateSpecLoose extends TemplateSpec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export interface TemplateSpec extends BaseWidgetComponent.TemplateSpec {
    data: Data;
    signals: Signals;
    passSignals: PassSignals;
  }

  export type Signals<Config extends TypeConfig = TypeConfig> =
    BaseWidgetComponent.Signals<Config>;

  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    BaseWidgetComponent.PassSignals<Config>;

  export interface TypeConfigLoose extends TypeConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  export interface TypeConfig extends BaseWidgetComponent.TypeConfig {
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends BaseWidgetComponent.EventMap {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends BaseWidgetComponent.SignalMap {}
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseWidgetComponent.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseWidgetComponent.Template<Spec>;
  export type Constructor<C extends Widget = Widget> =
    BaseWidgetComponent.Constructor<C>;

  export interface Data extends BaseWidgetComponent.Data {
    events: {
      widget: Partial<WidgetData>;
      enabled: true;
      label: string;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Actions extends Record<keyof WidgetActions, WidgetActions> {}
}

export { Widget };
