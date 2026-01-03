import type { App } from "./App";
import { RouterError } from "./Router/RouterError";
import { Log } from "./lib/Log";

let appInstance: App | null = null;

function getAppInstance(): App<App.TemplateSpec, App.TypeConfig> {
  if (appInstance == null)
    throw new Error("'getAppInstance()' was called before 'bootstrap()'");
  return appInstance;
}

/**
 *
 * @param qs
 * @returns
 */
function bootstrap(app: App): Promise<void> {
  Log.event("bootstrap:bootstrap", { app });
  return new Promise<void>((resolve, reject) => {
    appInstance = app;
    switch (true) {
      case true: {
        resolve();
        break;
      }
      default: {
        reject(new RouterError("ERR_BOOT_HOOK", "Promise rejected", { app }));
        break;
      }
    }
  });
}

export { bootstrap, getAppInstance };
