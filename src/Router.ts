import { Router } from "@lightningjs/sdk";
import { BootPage } from "./components/Pages/BootPage/BootPage";
import { ErrorPage } from "./components/Pages/ErrorPage";
import { HomePage } from "./components/Pages/HomePage/HomePage";
import { NotFoundPage } from "./components/Pages/NotFoundPage/NotFoundPage";
import { createObject } from "./lib/utils/object/createObject";

export const routerConfig = createObject<Router.Config>({
  root: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<string>((resolve, _reject) => {
      switch (true) {
        default: {
          resolve("home");
          break;
        }
      }
    });
  },
  routes: [
    BootPage.route,
    NotFoundPage.route,
    ErrorPage.route,
    HomePage.route,
  ],
});

export function getRouterConfig(): Router.Config {
  return routerConfig;
}
