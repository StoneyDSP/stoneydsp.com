import { Registry, Router } from "@lightningjs/sdk";
import { RouterActions, sendRouterEvent } from "../../../Events";
import { theme } from "../../../lib";
import { RouterError } from "../../../Router/RouterError";
import { Page } from "../Page";

class BootPage<
  Spec extends BootPage.TemplateSpec = BootPage.TemplateSpec,
  Config extends BootPage.TypeConfig = BootPage.TypeConfig,
  Data extends BootPage.Data = BootPage.Data,
>
  extends Page<Spec, Config, Data>
  implements Page.ImplementTemplateSpec<BootPage.TemplateSpec>
{
  static {
    this._route = {
      ...this.route,
      path: "$",
      component: BootPage,
      widgets: [],
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
    };
  }

  static override _template(): Page.Template<BootPage.TemplateSpec> {
    const { width, height } = this;
    return {
      ...super._template(),
      rect: true,
      w: width,
      h: height,
      mw: width,
      mh: height,
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
    };
  }

  public override getPageEventData(): Page.Data["events"]["page"] {
    return {
      ...this.getData()?.events?.page,
      component: this.ref ?? this.constructor.name,
      active: this.active,
      attached: this.attached,
      visible: this.visible,
      path: BootPage.route.path,
      title: "Boot",
    };
  }

  override _firstActive() {
    this._timeout = Registry.setTimeout(() => {
      Router.resume();
    }, 1000);
    this._timeout = undefined;
    return super._firstActive();
  }

  override _inactive(): ReturnType<Page["_inactive"]> {
    (this as BootPage).patch({
      zIndex: 0,
    });
    if (typeof this._timeout !== "undefined")
      Registry.clearTimeout(this._timeout);
    return super._inactive();
  }

  private _timeout: ReturnType<typeof setTimeout> | undefined = undefined;
}

namespace BootPage {
  export interface TemplateSpec extends Page.TemplateSpec {
    Label: Record<string | symbol, unknown>;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeConfig extends Page.TypeConfig {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Data extends Page.Data {}
}

export { BootPage, BootPage as default };
