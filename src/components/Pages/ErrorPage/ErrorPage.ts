import { Router } from "@lightningjs/sdk";
import { theme } from "../../../lib";
import { Log } from "../../../lib/Log/Log";
import { ButtonComponent } from "../../base/PressableComponent/ButtonComponent";
import { Page } from "../Page";

class ErrorPage<
  Spec extends ErrorPage.TemplateSpec = ErrorPage.TemplateSpec,
  Config extends ErrorPage.TypeConfig = ErrorPage.TypeConfig,
>
  extends Page<Spec, Config>
  implements Page.ImplementTemplateSpec<ErrorPage.TemplateSpec>
{
  /**
   *
   */
  public static override route: Router.RouteDefinition = {
    path: "!",
    component: () => {
      return Promise.resolve({
        default: ErrorPage,
      });
    },
    widgets: [],
  };

  static override _template(): ErrorPage.Template<ErrorPage.TemplateSpec> {
    const fontSize = 40;
    return {
      ...super._template(),
      flex: {
          justifyContent: 'center',
          alignItems: 'center'
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
          justifyContent: 'space-evenly',
          alignItems: 'center',
          direction: 'column',
          alignContent: 'space-between'
        },
        ContainerTop: {
          rect: true,
          color: theme.state.warning,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: 'center',
            margin: fontSize * 0.5
          },
          ContainerTopTextBox: {
              w: (w) => w,
              h: (h) => h,
            ContainerTopText: {
              w: (w) => w,
              h: (h) => h,
              text: {
                text: "Error...",
                textColor: theme.text.inverse,
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: fontSize * 2.0 * 1.5,
                fontSize: fontSize * 2.0,
              }
            }
          },
        },
        ContainerMiddle: {
          rect: true,
          color: theme.menu.separator,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: 'center',
            margin: fontSize * 0.5
          },
          flex: {
            justifyContent: 'space-evenly',
            alignItems: 'center',
            direction: 'column',
            alignContent: 'space-between'
          },
          ContainerMiddleTextBox: {
            flexItem: {
              alignSelf: 'center',
            },
            w: (w) => w,
            h: (h) => h,
            ContainerMiddleText: {
              w: (w) => w,
              h: (h) => h,
              text: {
                text: "...How would you like to proceed?",
                textColor: theme.text.inverse,
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: fontSize * 1.5,
                fontSize: fontSize,
              }
            }
          }
        },
        ContainerBottom: {
          rect: true,
          color: theme.menu.separator,
          w: (w) => w * 0.75,
          h: (h) => h * 0.25 * 0.75,
          flexItem: {
            alignSelf: 'center',
            margin: fontSize * 0.5,
          },
          ContainerBottomButtonRow: {
            w: (w) => w,
            h: (h) => h,
            flex: {
              justifyContent: 'space-evenly',
              alignItems: 'center',
              direction: 'row',
              alignContent: 'space-between'
            },
            BackButton: {
              type: ButtonComponent,
              // rect: true,
              color: theme.action.primary,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                "onPress": () => {
                  // const history = Router.getHistory();
                  // if(history.length <= 0) Router.navigate("home");
                  // Router.go(-1);
                  Router.navigate("home");
                }
              }
            },
            HomeButton: {
              type: ButtonComponent,
              // rect: true,
              color: theme.action.onSecondary,
              w: (w) => w * 0.25,
              h: (h) => h * 0.75,
              signals: {
                "onPress": () => {
                  Router.navigate("home")
                }
              }
            }
          }
        }
      }
    };
  }

  private _index: number = 0;

  public get index() {
    return this._index;
  }

  override _getFocused(): ReturnType<Page["_getFocused"]> {
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag("ContainerBottomButtonRow")!;
    return ContainerBottomButtonRow.childList.getAt(this.index) as ReturnType<Page["_getFocused"]>
  }

  override _handleRight(evt: KeyboardEvent): ReturnType<NonNullable<Page['_handleRight']>> {
    Log.debug(this.constructor.name, '_handleRight()', { this: this, evt })
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag("ContainerBottomButtonRow")!;
    const numChildren = ContainerBottomButtonRow.childList.length - 1;
    if(this._index < numChildren) this._index += 1;
    return true;
  }

  override _handleLeft(evt: KeyboardEvent): ReturnType<NonNullable<Page['_handleLeft']>> {
    Log.debug(this.constructor.name, '_handleLeft()', { this: this, evt })
    const FlexContainer = (this as ErrorPage).tag("FlexContainer")!;
    const ContainerBotton = FlexContainer.tag("ContainerBottom")!;
    const ContainerBottomButtonRow = ContainerBotton.tag("ContainerBottomButtonRow")!;
    const numChildren = ContainerBottomButtonRow.childList.length - 1;
    if(this._index >= numChildren) this._index -= 1;
    return true;
  }
}

namespace ErrorPage {

  export interface TemplateSpec extends Page.TemplateSpec {
    FlexContainer: {
      ContainerTop: {
        ContainerTopTextBox: {
          ContainerTopText: Record<string|symbol, unknown>
        }
      },
      ContainerMiddle: {
        ContainerMiddleTextBox: {
          ContainerMiddleText: Record<string|symbol, unknown>
        }
      },
      ContainerBottom: {
        ContainerBottomButtonRow: {
          BackButton: typeof ButtonComponent;
          HomeButton: typeof ButtonComponent;
        }
      },
    }
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
}

export { ErrorPage };
