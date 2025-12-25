import { Router } from "@lightningjs/sdk";
import { Vector } from "@stoneydsp/lib";
import { theme } from "../../../lib";
import { ButtonComponent } from "../../base/PressableComponent/ButtonComponent";
import { Page } from "../Page";

class HomePage<
  Spec extends HomePage.TemplateSpec = HomePage.TemplateSpec,
  Config extends HomePage.TypeConfig = HomePage.TypeConfig,
>
  extends Page<Spec, Config>
  implements Page.ImplementTemplateSpec<HomePage.TemplateSpec>
{
  /**
   *
   */
  public static override route: Router.RouteDefinition = {
    path: "home",
    component: () => {
      return Promise.resolve({
        default: HomePage,
      });
    },
    widgets: ["headerwidget", "footerwidget"],
    // before: HomePage.fetchData<typeof PackageJson>,
  };


  static override _template(): HomePage.Template<HomePage.TemplateSpec> {
    return {
      ...super._template(),
      FaderContainer: {
        w: (w) => w,
        h: (h) => h,
        Fader: {
          type: ButtonComponent,
          color: theme.action.primary,
          w: (w) => w * 0.125,
          h: (h) => h * 0.125,
          x: this.width * 0.5 - (this.width * 0.125 * 0.5),
          y: this.height * 0.5 - (this.height * 0.125 * 0.5),
          signals: {
            'onDrag': "_onDrag",
            'onDragStart': "_onDragStart",
            'onDragEnd': "_onDragEnd"
          },
          Label: {
            w: (w: number) => w,
            h: (h: number) => h,
            flex: {
              alignItems: 'center',
              justifyContent: 'center'
            },
            Text: {
              text: {
                text: "Drag me!"
              }
            }
          }
        }
      }
    };
  }

  private _dragStartPos : Vector | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _onDragStart(_event: globalThis.MouseEvent | globalThis.TouchEvent) {
    const fader = (this as HomePage).tag("FaderContainer.Fader")!;
    this._dragStartPos = new Vector(fader.x as number, fader.y as number);
  }

  protected _onDrag(localCoords: {start: Vector, current: Vector, delta: Vector}) {
    if(!this._dragStartPos) return;
    (this as HomePage).tag("FaderContainer.Fader")!.patch({
      x: this._dragStartPos.x + localCoords.delta.x,
      y: this._dragStartPos.y + localCoords.delta.y,
    });
  }

  protected _onDragEnd() {
    this._dragStartPos = null;
  }
}

namespace HomePage {
  export interface TemplateSpec extends Page.TemplateSpec {
    FaderContainer: {
      Fader: typeof ButtonComponent
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

export { HomePage };
