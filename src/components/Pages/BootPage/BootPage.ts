import { Registry, Router } from "@lightningjs/sdk";
import { Page } from "../Page";

class BootPage extends Page {
  public static override route: Router.RouteDefinition = {
    path: "$",
    component: BootPage,
    widgets: []
  };

  static override _template(): Page.Template<Page.TemplateSpec> {
    return {
      ...super._template(),
    }
  }

  override _firstActive() {
    this._timeout = Registry.setTimeout(() => {
      Router.resume();
    }, 1000)
    this._timeout = undefined;

    return super._firstActive()
  }

  override _inactive(): ReturnType<Page["_inactive"]> {
    if(typeof this._timeout !== 'undefined') Registry.clearTimeout(this._timeout)
    return super._inactive()
  }

  private _timeout: ReturnType<typeof setTimeout> | undefined = undefined;
}

export { BootPage };
