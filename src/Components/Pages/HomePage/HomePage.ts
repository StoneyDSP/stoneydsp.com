import { RouterActions, sendRouterEvent } from "../../../Events";
import { RouterError } from "../../../Router/RouterError";
import { DebugTonePanel } from "../../../scenes/DebugTone/Panel";
import { FooterWidget, HeaderWidget, SideBarWidget } from "../../Widgets";
import { Page } from "../Page";

class HomePage<
  Spec extends HomePage.TemplateSpec = HomePage.TemplateSpec,
  Config extends HomePage.TypeConfig = HomePage.TypeConfig,
  Data extends HomePage.Data = HomePage.Data,
>
  extends Page<Spec, Config, Data>
  implements Page.ImplementTemplateSpec<HomePage.TemplateSpec>
{
  /// -------------------------------------------------------------------- ROUTE
  static {
    this._route = {
      ...this.route,
      path: "home",
      component: () => {
        return Promise.resolve({
          default: this,
        });
      },
      widgets: ["headerwidget", "footerwidget", "sidebarwidget"],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hook: (_app, _params) => {
        sendRouterEvent(RouterActions.HOOK, {
          path: this.route.path,
          data: this.bindProp("data.events.page"),
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      on: (_page, _params) => {
        return new Promise<void>((resolve, reject) => {
          sendRouterEvent(RouterActions.ON, {
            path: this.route.path,
            data: this.bindProp("data.events.page"),
          });
          switch (true) {
            case true: {
              resolve();
              break;
            }
            default: {
              reject(new RouterError("ERR_PROVIDER_HOOK", "Promise rejected"));
              break;
            }
          }
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      beforeNavigate: (_fromHash, _toRequest) => {
        return new Promise<boolean>((resolve, reject) => {
          sendRouterEvent(RouterActions.BEFORE_NAVIGATE, {
            path: this.route.path,
            data: this.bindProp("data.events.page"),
          });
          switch (true) {
            case true: {
              resolve(true);
              break;
            }
            default: {
              reject(
                new RouterError("ERR_BEFORE_NAVIGATE_HOOK", "Promise rejected")
              );
              break;
            }
          }
        });
      },
      // before: HomePage.fetchData<typeof PackageJson>,
    };
  }

  /// ------------------------------------------------------------------ WIDGETS

  static override _template(): HomePage.Template<HomePage.TemplateSpec> {
    const sidebarW = SideBarWidget.width;
    const headerH = HeaderWidget.height;
    const footerH = FooterWidget.height;
    return {
      ...super._template(),
      flex: {
        alignItems: "center",
        justifyContent: "center",
      },

      Scene: {
        x: sidebarW,
        y: headerH,
        w: this.width - sidebarW,
        h: this.height - headerH - footerH,
        rect: true,
        color: 0x00000000,

        Default: {
          type: DebugTonePanel,
          w: (w) => w,
          h: (h) => h,
        },
      },
    };
  }

  public override getPageEventData(): Page.Data["events"]["page"] {
    return {
      ...this.getData()?.events?.page,
      component: this.ref ?? this.constructor.name,
      active: this.active,
      attached: this.attached,
      visible: this.visible,
      path: HomePage.route.path,
      title: "Home",
    };
  }
}

namespace HomePage {
  export interface TemplateSpec extends Page.TemplateSpec {
    data: Data;
    Scene: {
      // Grid: typeof GridBgComponent;
      Default: typeof DebugTonePanel;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends Page.TypeConfig {
    // EventMapType: EventMap;
    // SignalMapType: SignalMap;
    // HistoryStateType: HistoryState;
  }
  /**
   *
   */
  export type ImplementTemplateSpec<Spec extends TemplateSpec = TemplateSpec> =
    Page.ImplementTemplateSpec<Spec>;
  /**
   *
   */
  export type Template<Spec extends TemplateSpec = TemplateSpec> =
    Page.Template<Spec>;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends Page.Data {}
}

export { HomePage as default, HomePage };
