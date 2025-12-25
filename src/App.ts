import { Router } from "@lightningjs/sdk";
import { Vector } from "@stoneydsp/lib";
import { BaseApp } from "@stoneydsp/lightning-ui-components";
// import * as JUCE from 'juce-framework-frontend';
import { getConsts } from "./CONSTS";
import { routerConfig } from "./Router";
import { FooterWidget, HeaderWidget } from "./components/Widgets";
import { Log } from "./lib/Log/Log";
import { Touch } from "./lib/Touch/Touch";
import { sequence } from "./lib/sequence";

class App<
  Spec extends App.TemplateSpec = App.TemplateSpec,
  Config extends App.TypeConfig = App.TypeConfig,
>
  extends BaseApp<Spec, Config>
  implements BaseApp.ImplementTemplateSpec<App.TemplateSpec>
{
  /// ----------------------------------------------------------------- TEMPLATE

  static override _template(): App.Template<App.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      zIndex: 0.0,
      rect: true,
      color: 0x00000000,
      w: width,
      h: height,
      mw: width,
      mh: height,
      clipping: true,
      clipbox: true,
      collision: true,
      cursor: "auto",
      Widgets: {
        w: (w) => w,
        h: (h) => h,
        HeaderWidget: { type: HeaderWidget },
        FooterWidget: { type: FooterWidget }
      }
    };
  }

  private static _width: ReturnType<typeof getConsts>["APP_WIDTH"] = getConsts().APP_WIDTH;

  static override get width(): Readonly<number> {
    return this._width;
  }

  private static _height: ReturnType<typeof getConsts>["APP_HEIGHT"] = getConsts().APP_HEIGHT

  static override get height(): Readonly<number> {
    return this._height;
  }

  /// --------------------------------------------------------------- LIFECYCLES

  override _construct() {
    sequence([
      // () => Log.warn("JUCE", { JUCE: JUCE }),
    ])
    return super._construct()
  }

  override _setup() {
    sequence([
      () => Touch.enable(this.stage),
      () => Router.startRouter(routerConfig, this as App)
    ])
    return super._setup();
  }

  /**
   * We MUST return Router.activePage() so the new Page
   * can listen to the remote-control.
   */
  override _getFocused(): ReturnType<BaseApp['_getFocused']> {
    return Router.getActivePage() as ReturnType<BaseApp['_getFocused']>
  }

  override _handleHover(...args: unknown[]) {
    Log.event(this.constructor.name, '_handleHover()', { ...args })
    // if (super._handleHover) return super._handleHover(...args);
  }

  override _handleUnhover(...args: unknown[]) {
    Log.event(this.constructor.name, '_handleUnhover()', { ...args })
    // if (super._handleUnhover) return super._handleUnhover(target);
  }

  _handleTouchStart(...args: unknown[]) {
    Log.event(this.constructor.name, '_handleTouchStart()', { ...args })
  }

  _handleTouchEnd(delta: Vector) {
    Log.event(this.constructor.name, '_handleTouchEnd()', { delta })
  }

  _handleTouchMove(...args: unknown[]) {
    Log.event(this.constructor.name, '_handleTouchMove()', { ...args })
  }

  _handleTouchHover(current: Vector) {
    Log.event(this.constructor.name, '_handleTouchHover()', { current })
  }

  // override _handleClick(
  //   _target: Parameters<NonNullable<BaseApp['_handleClick']>>[0],
  //   _localCoords: Parameters<NonNullable<BaseApp['_handleClick']>>[1],
  // ) {
  //   if(this.dbg) Log.debug(`${this.constructor.name}:handleClick`, ...arguments);
  //   return false;
  // }

  // override _handleClickRelease(
  //   _target: Parameters<NonNullable<BaseApp['_handleClickRelease']>>[0],
  //   _localCoords: Parameters<NonNullable<BaseApp['_handleClickRelease']>>[1],
  // ) {
  //   Log.debug(`${this.constructor.name}:handleClickRelease`, ...arguments);
  //   return true;
  // }

  // override _captureClick(
  //   _target: Parameters<NonNullable<BaseApp['_captureClick']>>[0],
  //   _localCoords: Parameters<NonNullable<BaseApp['_captureClick']>>[1],
  // ) {
  //   Log.debug(`${this.constructor.name}:captureClick`, ...arguments);
  //   return true;
  // }

  // override _captureClickRelease(
  //   _target: Parameters<NonNullable<BaseApp['_captureClickRelease']>>[0],
  //   _localCoords: Parameters<NonNullable<BaseApp['_captureClickRelease']>>[1],
  // ) {
  //   Log.debug(`${this.constructor.name}:captureClickRelease`, ...arguments);
  //   return true;
  // }



}

declare namespace App {

  export interface TemplateSpec extends BaseApp.TemplateSpec {
    Widgets: {
      HeaderWidget: typeof HeaderWidget,
      /// BODY
      FooterWidget: typeof FooterWidget
    }
  }
  export interface TypeConfig extends BaseApp.TypeConfig {
    IsPage: false;
  }
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseApp.ImplementTemplateSpec<Spec>;
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseApp.Template<Spec>;
}

export function getApp() {
  return App;
}

export { App };
