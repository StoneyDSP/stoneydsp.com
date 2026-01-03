import { Router } from "@lightningjs/sdk";
import type { BaseComponent } from "../BaseComponent/BaseComponent";

abstract class BaseApp<
  Spec extends BaseApp.TemplateSpec = BaseApp.TemplateSpec,
  Config extends BaseApp.TypeConfig = BaseApp.TypeConfig,
>
  extends Router.App<Spec, Config>
  implements BaseApp.ImplementTemplateSpec<BaseApp.TemplateSpec>
{
  static override _template(): BaseApp.Template<BaseApp.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      w: width,
      h: height,
      Pages: {
        w: (w) => w,
        h: (h) => h,
        forceZIndexContext: true,
        // BootPage: {},
        // ErrorPage: {},
        // NotFoundPage: {}
      },
      Loading: {
        w: (w) => w,
        h: (h) => h,
        Label: {},
      },
      Widgets: {
        w: (w) => w,
        h: (h) => h,
      },
    };
  }

  public static get width(): number {
    throw new Error();
  }

  public static get height(): number {
    throw new Error();
  }

  protected _dbg: boolean;

  public get dbg() {
    return this._dbg;
  }

  public set dbg(dbg) {
    this._dbg = dbg;
  }

  protected _routerConfig: Router.Config;

  public get routerConfig() {
    return this._routerConfig;
  }

  public getRouterConfig(): Router.Config {
    return this.routerConfig;
  }

  /**
   * We MUST return Router.activePage() so the new Page
   * can listen to the remote-control.
   */
  override _getFocused(): ReturnType<Router.App["_getFocused"]> {
    return Router.getActivePage() as ReturnType<Router.App["_getFocused"]>;
  }

  override _construct() {
    return super._construct();
  }

  override _build() {
    return super._build();
  }

  override _setup() {
    return super._setup();
  }

  override _init() {
    return super._init();
  }

  override _attach() {
    return super._attach();
  }

  override _firstEnable() {
    return super._firstEnable();
  }

  override _enable() {
    return super._enable();
  }

  override _firstActive() {
    return super._firstActive();
  }

  override _active() {
    return super._active();
  }

  override _detach() {
    return super._detach();
  }

  override _disable() {
    return super._disable();
  }

  override _inactive() {
    return super._inactive();
  }

  protected _startRouter(
    routerConfig: Router.Config = this.routerConfig
  ): void {
    // @ts-expect-error wierd this
    return Router.startRouter(routerConfig, this);
  }

  /// --------------------------------------------------------------------- DATA

  protected _data: BaseApp.Data;

  public get data() {
    return this._data;
  }

  //   public set data(data) {
  //     this._data = data;
  //   }
}

declare namespace BaseApp {
  export interface TemplateSpec extends Router.App.TemplateSpec {
    data: Data;
    /**
     * Sets the {@link Signals} for this Component.
     *
     * @remarks
     * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
     * information.
     */
    signals: Signals;
    /**
     * Gets/sets the {@link PassSignals} for this Component.
     *
     * @remarks
     * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
     * for more information.
     */
    passSignals: PassSignals;
    Pages: {
      forceZindexContext: true; // force this literal on the impl...
    };
    Loading: {
      Label: Record<string | symbol, unknown>;
    };
    Widgets: Record<string | symbol, unknown>;
  }
  /**
   * The {@link Signals} type.
   *
   * @remarks
   * See [LightningJS Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=signal) for more
   * information.
   */
  export type Signals<Config extends TypeConfig = TypeConfig> =
    BaseComponent.Signals<Config>;

  /**
   * The {@lnk PassSignals} type.
   *
   * @remarks
   * See [LightningJS Pass Signals docs](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal?id=pass-signals)
   * for more information.
   */
  export type PassSignals<Config extends TypeConfig = TypeConfig> =
    BaseComponent.PassSignals<Config>;
  export interface TypeConfig extends Router.App.TypeConfig {
    IsPage: false;
    EventMapType: EventMap;
    SignalMapType: SignalMap;
  }
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface EventMap extends Router.App.EventMap {}
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface SignalMap extends Router.App.SignalMap {}

  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.ImplementTemplateSpec<Spec>;

  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    BaseComponent.Template<Spec>;

  export type Constructor<C extends BaseApp = BaseApp> =
    import("@lightningjs/sdk").Lightning.Component.Constructor<C>;

  ///

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends BaseComponent.Data {}
}

export { BaseApp };
