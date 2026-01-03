import { Router } from "@lightningjs/sdk";
import { BaseApp, Vector } from "fx-audio-dev";
import { getAppData } from "./AppData";
import { BootPage } from "./Components/Pages/BootPage";
import { ErrorPage } from "./Components/Pages/ErrorPage";
import { HomePage } from "./Components/Pages/HomePage";
import { NotFoundPage } from "./Components/Pages/NotFoundPage";
import {
  FooterWidget,
  HeaderWidget,
  SideBarWidget,
} from "./Components/Widgets";
import { getConsts } from "./CONSTS";
import { Container } from "./Container";
import { AppActions, EventBus, sendAppEvent } from "./Events";
import { theme } from "./lib";
import { Log } from "./lib/Log/Log";
import { bootstrapTouch } from "./lib/Touch/bootstrapTouch";
import { getRouterConfig } from "./Router";
import { bootstrapRouter } from "./Router/bootstrapRouter";
import type { BaseSM } from "./Services";
import type { AudioSM } from "./Services/AudioSM/AudioSM";

/// --------------------------------------------------------------------- CLASS

class App<
  Spec extends App.TemplateSpec = App.TemplateSpec,
  Config extends App.TypeConfig = App.TypeConfig,
>
  extends BaseApp<Spec, Config>
  implements BaseApp.ImplementTemplateSpec<App.TemplateSpec>
{
  /// ------------------------------------------------------------------ ROUTER

  protected override _routerConfig = getRouterConfig();

  /// ---------------------------------------------------------------- SERVICES

  protected _services!: App.Services;

  public get services(): Readonly<App.Services> {
    return this._services;
  }

  /// ---------------------------------------------------------------- TEMPLATE

  static override _template(): App.Template<App.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      zIndex: 0.0,
      rect: true,
      color: theme.surface.background,
      w: width,
      h: height,
      mw: width,
      mh: height,
      clipping: true,
      clipbox: true,
      collision: true,
      cursor: "auto",
      Pages: {
        forceZIndexContext: true,
      },
      Widgets: {
        w: (w) => w,
        h: (h) => h,
        SideBarWidget: { type: SideBarWidget },
        FooterWidget: { type: FooterWidget },
        HeaderWidget: { type: HeaderWidget },
      },
      Loading: {
        rect: true,
        w: 1920,
        h: 1080,
        color: theme.surface.sunken,
        visible: false,
        zIndex: 99,
        Label: {
          mount: 0.5,
          x: width * 0.5,
          y: height * 0.5,
          text: {
            text: "Loading...",
            textColor: theme.text.light.default,
          },
        },
      },
    };
  }

  private static _width: ReturnType<typeof getConsts>["APP_WIDTH"] =
    getConsts().APP_WIDTH;

  static override get width(): Readonly<number> {
    return this._width;
  }

  private static _height: ReturnType<typeof getConsts>["APP_HEIGHT"] =
    getConsts().APP_HEIGHT;

  static override get height(): Readonly<number> {
    return this._height;
  }

  /// -------------------------------------------------------------- LIFECYCLES

  override _construct() {
    const { container } = getAppData();
    this._services = {
      audio: container.get({ token: Container.Token.AudioSM }),
      eventBus: container.get({ token: Container.Token.EventBus }),
    } as const;
    sendAppEvent(AppActions.CONSTRUCT);
    return super._construct();
  }

  override _build() {
    sendAppEvent(AppActions.BUILD);
    return super._build();
  }

  override _setup() {
    sendAppEvent(AppActions.SETUP);
    bootstrapTouch(this.stage);
    bootstrapRouter(this.getRouterConfig(), this as App);
    return super._setup();
  }

  override _init() {
    sendAppEvent(AppActions.INIT);
    return super._init();
  }

  override _attach() {
    sendAppEvent(AppActions.ATTACH);
    return super._attach();
  }

  override _firstEnable() {
    sendAppEvent(AppActions.FIRST_ENABLE);
    return super._firstEnable();
  }

  override _enable() {
    sendAppEvent(AppActions.ENABLE);
    return super._enable();
  }

  override _firstActive() {
    sendAppEvent(AppActions.FIRST_ACTIVE);
    return super._firstActive();
  }

  override _active() {
    sendAppEvent(AppActions.ACTIVE);
    return super._active();
  }

  override _detach() {
    sendAppEvent(AppActions.DETACH);
    return super._detach();
  }

  override _disable() {
    sendAppEvent(AppActions.DISABLE);
    return super._disable();
  }

  override _inactive() {
    sendAppEvent(AppActions.INACTIVE);
    return super._inactive();
  }

  /**
   * We MUST return Router.activePage() so the new Page
   * can listen to the remote-control.
   */
  override _getFocused(): ReturnType<BaseApp["_getFocused"]> {
    return Router.getActivePage() as ReturnType<BaseApp["_getFocused"]>;
  }

  override _handleHover(...args: unknown[]) {
    Log.event(this.constructor.name, "_handleHover()", { ...args });
    // if (super._handleHover) return super._handleHover(...args);
  }

  override _handleUnhover(...args: unknown[]) {
    Log.event(this.constructor.name, "_handleUnhover()", { ...args });
    // if (super._handleUnhover) return super._handleUnhover(target);
  }

  _handleTouchStart(...args: unknown[]) {
    Log.event(this.constructor.name, "_handleTouchStart()", { ...args });
  }

  _handleTouchEnd(delta: Vector) {
    Log.event(this.constructor.name, "_handleTouchEnd()", { delta });
  }

  _handleTouchMove(...args: unknown[]) {
    Log.event(this.constructor.name, "_handleTouchMove()", { ...args });
  }

  _handleTouchHover(current: Vector) {
    Log.event(this.constructor.name, "_handleTouchHover()", { current });
  }

  override _handleClick(
    _target: Parameters<NonNullable<BaseApp["_handleClick"]>>[0],

    _localCoords: Parameters<NonNullable<BaseApp["_handleClick"]>>[1]
  ) {
    Log.event(this.constructor.name, "_handleClick()", {
      _target,
      _localCoords,
    });
    Router.focusPage();
    return false;
  }
}

/// ----------------------------------------------------------------- NAMESPACE

namespace App {
  export interface Services extends Record<string | symbol, BaseSM> {
    readonly audio: AudioSM;
    readonly eventBus: EventBus;
  }
  export interface TemplateSpec extends BaseApp.TemplateSpec {
    Pages: {
      forceZindexContext: true;
      ErrorPage: typeof ErrorPage;
      NotFoundPage: typeof NotFoundPage;
      BootPage: typeof BootPage;
      HomePage: typeof HomePage;
    };
    Loading: {
      Label: Record<string | symbol, unknown>;
    };
    Widgets: {
      SideBarWidget: typeof SideBarWidget;
      FooterWidget: typeof FooterWidget;
      HeaderWidget: typeof HeaderWidget;
    };
    Num: Record<string | symbol, unknown>;
  }
  export interface TypeConfig extends BaseApp.TypeConfig {
    IsPage: false;
  }
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseApp.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseApp.Template<Spec>;
  export type Constructor<C extends App = App> = BaseApp.Constructor<C>;
}

/// -------------------------------------------------------------------- GETTER

export function getApp(): typeof App {
  return App;
}

/// -------------------------------------------------------------------- EXPORT

export { App };

/// ---------------------------------------------------------------------------
