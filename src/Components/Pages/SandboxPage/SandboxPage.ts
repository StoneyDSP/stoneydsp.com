import { Vector } from "stoneydsp";
import { RouterActions, sendRouterEvent } from "../../../Events";
import { theme } from "../../../lib";
import { RouterError } from "../../../Router/RouterError";
import { Draggable } from "../../base/Draggable/Draggable";
import { Page } from "../Page";

class SandboxPage<
  Spec extends SandboxPage.TemplateSpec = SandboxPage.TemplateSpec,
  Config extends SandboxPage.TypeConfig = SandboxPage.TypeConfig,
  Data extends SandboxPage.Data = SandboxPage.Data,
>
  extends Page<Spec, Config, Data>
  implements Page.ImplementTemplateSpec<SandboxPage.TemplateSpec>
{
  /// -------------------------------------------------------------------- ROUTE

  static {
    this._route = {
      ...this.route,
      path: "sandbox",
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

  static override _template(): SandboxPage.Template<SandboxPage.TemplateSpec> {
    return {
      ...super._template(),
      FaderContainer: {
        w: (w) => w,
        h: (h) => h,
        Fader: {
          type: Draggable,
          color: theme.action.primary,
          w: (w) => w * 0.125,
          h: (h) => h * 0.125,
          x: this.width * 0.5 - this.width * 0.125 * 0.5,
          y: this.height * 0.5 - this.height * 0.125 * 0.5,
          signals: {
            onDrag: "_onDrag",
            onDragStart: "_onDragStart",
            onDragEnd: "_onDragEnd",
          },
          Label: {
            w: (w: number) => w,
            h: (h: number) => h,
            flex: {
              alignItems: "center",
              justifyContent: "center",
            },
            Text: {
              text: {
                text: "Drag me!",
                textColor: theme.text.light.default,
              },
            },
          },
        },
      },
    };
  }

  public override getPageEventData(): Page.Data["events"]["page"] {
    return {
      ...this.data?.events?.page,
      component: this.ref ?? this.constructor.name,
      active: this.active,
      attached: this.attached,
      visible: this.visible,
      path: SandboxPage.route.path,
      title: "Home",
    };
  }

  private _dragStartPos: Vector | null = null;

  protected _onDragStart(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _event: globalThis.MouseEvent | globalThis.TouchEvent
  ) {
    const fader = (this as SandboxPage).tag("FaderContainer.Fader")!;
    this._dragStartPos = new Vector(fader.x as number, fader.y as number);
  }

  protected _onDrag(localCoords: {
    start: Vector;
    current: Vector;
    delta: Vector;
  }) {
    if (!this._dragStartPos) return;
    (this as SandboxPage).tag("FaderContainer.Fader")!.patch({
      x: this._dragStartPos.x + localCoords.delta.x,
      y: this._dragStartPos.y + localCoords.delta.y,
    });
  }

  protected _onDragEnd() {
    this._dragStartPos = null;
  }
}

namespace SandboxPage {
  export interface TemplateSpec extends Page.TemplateSpec {
    FaderContainer: {
      Fader: typeof Draggable;
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

export { SandboxPage as default, SandboxPage };
