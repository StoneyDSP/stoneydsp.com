import type { Router } from "@lightningjs/sdk";
import { EventType } from "../EventType";

export enum StartUpEventActions {
  INIT = "init",
  SETUP = "setup",
}

export type StartUpEventData = {
  app: Router.App;
  lngHook: StartUpEventActions;
};

export type StartUpEvent = {
  type: EventType.StartUpEvent;
  action: StartUpEventActions;
  data: StartUpEventData;
};
