import { Router } from "@lightningjs/sdk";
import { Log } from "../lib/Log";
import { RouterError } from "./RouterError";

/**
 *
 * @param qs
 * @returns
 */
function bootstrapRouter(
  config: Router.Config,
  app?: Router.App | undefined
): Promise<void> {
  Log.event("bootstrap:router", { config, app });
  return new Promise<void>((resolve, reject) => {
    Router.startRouter(config, app);
    switch (true) {
      case true: {
        resolve();
        break;
      }
      default: {
        reject(new RouterError("ERR_UNKNOWN", "Promise rejected"));
        break;
      }
    }
  });
}

export { bootstrapRouter };
