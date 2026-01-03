import { Lightning, Router } from "@lightningjs/sdk";
import { RouterActions, sendRouterEvent } from "../../../Events";
import { theme } from "../../../lib";
import { Log } from "../../../lib/Log/Log";
import { RouterError } from "../../../Router/RouterError";
import { ButtonComponent } from "../../base/PressableComponent/ButtonComponent";
import { Page } from "../Page";

class ErrorPage<
  Spec extends ErrorPage.TemplateSpec = ErrorPage.TemplateSpec,
  Config extends ErrorPage.TypeConfig = ErrorPage.TypeConfig,
  Data extends ErrorPage.Data = ErrorPage.Data,
>
  extends Page<Spec, Config, Data>
  implements Page.ImplementTemplateSpec<ErrorPage.TemplateSpec>
{
  static {
    this._route = {
      ...this.route,
      path: "!",
      component: () => {
        return Promise.resolve({
          default: ErrorPage,
        });
      },
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

  static override _template(): ErrorPage.Template<ErrorPage.TemplateSpec> {
    const fontSize = 40;
    return {
      ...super._template(),
      flex: {
        justifyContent: "center",
        alignItems: "center",
      },
      FlexContainer: {
        rect: true,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 20,
        },
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
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: "center",
            margin: fontSize * 0.5,
          },
          ContainerTopTextBox: {
            rect: true,
            shader: {
              type: Lightning.shaders.RoundedRectangle,
              radius: 20,
            },
            color: theme.state.warning,
            w: (w) => w,
            h: (h) => h,
            ContainerTopText: {
              w: (w) => w,
              h: (h) => h,
              text: {
                text: "Error...",
                textColor: theme.text.light.default,
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: fontSize * 2.0 * 1.5,
                fontSize: fontSize * 2.0,
              },
            },
          },
        },
        ContainerMiddle: {
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
            rect: true,
            shader: {
              type: Lightning.shaders.RoundedRectangle,
              radius: 20,
            },
            color: theme.menu.separator,
            w: (w) => w,
            h: (h) => h,
            ContainerMiddleText: {
              w: (w) => w,
              h: (h) => h,
              y: (y) => y * 0.25,
              text: {
                text: "...How would you like to proceed?",
                textColor: theme.text.light.default,
                textAlign: "center",
                fontStyle: "italic",
                verticalAlign: "middle",
                lineHeight: fontSize * 1.5,
                fontSize: fontSize,
              },
            },
          },
        },
        ContainerBottom: {
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: "center",
            margin: fontSize * 0.5,
          },
          ContainerBottomButtonRow: {
            rect: true,
            color: theme.menu.separator,
            shader: {
              type: Lightning.shaders.RoundedRectangle,
              radius: 20,
            },
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
              // rect: true,
              color: theme.action.primary,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                onPress: () => {
                  // const history = Router.getHistory();
                  // if(history.length <= 0) Router.navigate("home");
                  // Router.go(-1);
                  Router.navigate("home");
                },
              },
            },
            HomeButton: {
              type: ButtonComponent,
              // rect: true,
              color: theme.action.secondary,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                onPress: () => {
                  Router.navigate("home");
                },
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
      path: ErrorPage.route.path,
      title: "Error",
    };
  }

  private _index: number = 0;

  public get index() {
    return this._index;
  }

  override _getFocused(): ReturnType<Page["_getFocused"]> {
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
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
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
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
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag(
      "ContainerBottomButtonRow"
    )!;
    const numChildren = ContainerBottomButtonRow.childList.length - 1;
    if (this._index >= numChildren) this._index -= 1;
    return true;
  }
}

namespace ErrorPage {
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

export { ErrorPage as default, ErrorPage };
