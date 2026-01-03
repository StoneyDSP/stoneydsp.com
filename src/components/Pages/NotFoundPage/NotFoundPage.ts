import { Router } from "@lightningjs/sdk";
import { RouterActions, sendRouterEvent } from "../../../Events";
import { theme } from "../../../lib";
import { Log } from "../../../lib/Log/Log";
import { RouterError } from "../../../Router/RouterError";
import { ButtonComponent } from "../../base/PressableComponent/ButtonComponent";
import { Page } from "../Page";

class NotFoundPage<
  Spec extends NotFoundPage.TemplateSpec = NotFoundPage.TemplateSpec,
  Config extends NotFoundPage.TypeConfig = NotFoundPage.TypeConfig,
  Data extends NotFoundPage.Data = NotFoundPage.Data,
>
  extends Page<Spec, Config, Data>
  implements Page.ImplementTemplateSpec<NotFoundPage.TemplateSpec>
{
  /**
   *
   */
  static {
    this._route = {
      ...this.route,
      path: "*",
      component: NotFoundPage,
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

  static override _template(): NotFoundPage.Template<NotFoundPage.TemplateSpec> {
    const fontSize = 40;
    return {
      ...super._template(),
      flex: {
        justifyContent: "center",
        alignItems: "center",
      },
      FlexContainer: {
        rect: true,
        color: theme.menu.background,
        clipping: true,
        clipbox: true,
        mw: this.width,
        mh: this.height,
        w: (w) => w * 0.75,
        h: (h) => h * 0.75,
        flex: {
          justifyContent: "space-evenly",
          alignItems: "center",
          direction: "column",
          alignContent: "space-between",
        },
        ContainerTop: {
          rect: true,
          color: theme.state.warning,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: "center",
            margin: fontSize * 0.5,
          },
          ContainerTopTextBox: {
            w: (w) => w,
            h: (h) => h,
            ContainerTopText: {
              w: (w) => w,
              h: (h) => h,
              text: {
                text: "Not found...",
                textColor: theme.text.light.inverse,
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: fontSize * 2.0 * 1.5,
                fontSize: fontSize * 2.0,
              },
            },
          },
        },
        ContainerMiddle: {
          rect: true,
          color: theme.menu.separator,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: "center",
            margin: fontSize * 0.5,
          },
          flex: {
            justifyContent: "space-evenly",
            alignItems: "center",
            direction: "column",
            alignContent: "space-between",
          },
          ContainerMiddleTextBox: {
            flexItem: {
              alignSelf: "center",
            },
            w: (w) => w,
            h: (h) => h,
            ContainerMiddleText: {
              w: (w) => w,
              h: (h) => h,
              text: {
                text: "...How would you like to proceed?",
                textColor: theme.text.light.inverse,
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: fontSize * 1.5,
                fontSize: fontSize,
              },
            },
          },
        },
        ContainerBottom: {
          rect: true,
          color: theme.menu.separator,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          // flexItem: {
          //   alignSelf: "center",
          //   margin: fontSize * 0.5,
          // },
          ContainerBottomButtonRow: {
            w: (w) => w,
            h: (h) => h,
            flex: {
              justifyContent: "space-evenly",
              alignItems: "center",
              direction: "row",
              alignContent: "space-between",
            },
            BackButton: {
              type: ButtonComponent,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                // onPress: () => {
                //   // const history = Router.getHistory();
                //   // if(history.length <= 0) Router.navigate("home");
                //   // Router.go(-1);
                //   Router.navigate("home");
                // },
                onPress: "_goHome",
              },
            },
            HomeButton: {
              type: ButtonComponent,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                // onPress: () => {
                //   Router.navigate("home");
                // },
                onPress: "_goHome",
              },
            },
          },
        },
      },
    };
  }

  protected _goHome() {
    Router.navigate("home");
  }

  private _index: number = 0;

  public get index() {
    return this._index;
  }

  override _getFocused(): ReturnType<Page["_getFocused"]> {
    const FlexContainer = (this as NotFoundPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag(
      "ContainerBottomButtonRow"
    )!;
    return ContainerBottomButtonRow.childList.getAt(this.index) as ReturnType<
      Page["_getFocused"]
    >;
  }

  override _handleRight(
    evt: KeyboardEvent
  ): ReturnType<NonNullable<Page["_handleRight"]>> {
    Log.debug(this.constructor.name, "_handleRight()", { this: this, evt });
    const FlexContainer = (this as NotFoundPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag(
      "ContainerBottomButtonRow"
    )!;
    const numChildren = ContainerBottomButtonRow.childList.length - 1;
    if (this._index < numChildren) this._index += 1;
    return true;
  }

  override _handleLeft(
    evt: KeyboardEvent
  ): ReturnType<NonNullable<Page["_handleLeft"]>> {
    Log.debug(this.constructor.name, "_handleLeft()", { this: this, evt });
    const FlexContainer = (this as NotFoundPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag(
      "ContainerBottomButtonRow"
    )!;
    const numChildren = ContainerBottomButtonRow.childList.length - 1;
    if (this._index >= numChildren) this._index -= 1;
    return true;
  }
}

namespace NotFoundPage {
  export interface TemplateSpec extends Page.TemplateSpec {
    FlexContainer: {
      ContainerTop: {
        ContainerTopTextBox: {
          ContainerTopText: Record<string | symbol, unknown>;
        };
      };
      ContainerMiddle: {
        ContainerMiddleTextBox: {
          ContainerMiddleText: Record<string | symbol, unknown>;
        };
      };
      ContainerBottom: {
        ContainerBottomButtonRow: {
          BackButton: typeof ButtonComponent;
          HomeButton: typeof ButtonComponent;
        };
      };
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

export { NotFoundPage as default, NotFoundPage };
