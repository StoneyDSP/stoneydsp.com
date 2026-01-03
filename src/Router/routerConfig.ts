import { Router } from "@lightningjs/sdk";
import type { App } from "../App";
import { bootstrap } from "../bootstrap";
import { BootPage } from "../Components/Pages/BootPage/BootPage";
import { ErrorPage } from "../Components/Pages/ErrorPage";
import { HomePage } from "../Components/Pages/HomePage/HomePage";
import { NotFoundPage } from "../Components/Pages/NotFoundPage/NotFoundPage";
import { SandboxPage } from "../Components/Pages/SandboxPage/SandboxPage";
import { RouterActions, sendRouterEvent } from "../Events";
import { createObject } from "../lib/utils/object/createObject";
import { RouterError } from "./RouterError";

export function getRouterConfig(): Router.Config {
  return createObject<Router.Config>({
    updateHash: true,
    routes: [
      NotFoundPage.route,
      ErrorPage.route,
      BootPage.route,
      HomePage.route,
      SandboxPage.route,
    ],
    /// qs => { deviceId: '1801', partnerId: '145' }
    boot: (app) => bootstrap(app as unknown as App),
    root: () => {
      return new Promise<string>((resolve, reject) => {
        switch (true) {
          case true: {
            resolve("home");
            break;
          }
          default: {
            reject(new RouterError("ERR_BOOT_HOOK", "Promise rejected"));
            break;
          }
        }
      });
    },
    beforeEachRoute: (_fromHash, toRequest) => {
      sendRouterEvent(RouterActions.BEFORE_EACH, {
        path: toRequest.url,
        data: {
          url: toRequest.url,
          register: toRequest.register,
          cancelled: toRequest.isCancelled,
          copiedHistoryState: toRequest.copiedHistoryState,
          hash: toRequest.hash,
          isCreated: toRequest.isCreated,
          isSharedInstance: toRequest.isSharedInstance,
        },
      });
      return new Promise<boolean>((resolve, reject) => {
        switch (true) {
          case true: {
            resolve(true);
            break;
          }
          default: {
            reject(
              new RouterError("ERR_BEFORE_EACH_ROUTE_HOOK", "Promise rejected")
            );
            break;
          }
        }
      });
    },
    afterEachRoute: (request) => {
      sendRouterEvent(RouterActions.AFTER_EACH, {
        path: request.url,
        data: {
          url: request.url,
          register: request.register,
          cancelled: request.isCancelled,
          copiedHistoryState: request.copiedHistoryState,
          hash: request.hash,
          isCreated: request.isCreated,
          isSharedInstance: request.isSharedInstance,
        },
      });
      return new Promise<boolean>((resolve, reject) => {
        switch (true) {
          case true: {
            resolve(true);
            break;
          }
          default: {
            reject(
              new RouterError("ERR_AFTER_EACH_ROUTE_HOOK", "Promise rejected")
            );
            break;
          }
        }
      });
    },
  });
}
