import { type ActionEvent, ActionEventActions } from "./ActionEvent";
import { AppActions, type AppEvent } from "./AppEvent";
import { type NetworkActions, type NetworkEvent } from "./NetworkEvent";
import { PageActions, type PageEvent } from "./PageEvent";
import { PlayerActions, type PlayerEvent } from "./PlayerEvent";
import { RouterActions, type RouterEvent } from "./RouterEvents";
import { type StartUpEvent, StartUpEventActions } from "./StartUpEvent";
import { UserActions, type UserEvent } from "./UserEvent";

export {
  ActionEventActions,
  type ActionEvent,
  type ActionEventData,
  type ActionEventType,
} from "./ActionEvent";
export {
  AppActions,
  type AppEvent,
  type AppState,
  type AppStateData,
} from "./AppEvent";
export {
  type NetworkActions,
  type NetworkData,
  type NetworkEvent,
} from "./NetworkEvent";
export { PageActions, type PageData, type PageEvent } from "./PageEvent";
export {
  PlayerActions,
  type PlayerData,
  type PlayerEvent,
  type PlayerInitData,
} from "./PlayerEvent";
export {
  RouterActions,
  type RouterData,
  type RouterEvent,
} from "./RouterEvents";
export {
  StartUpEventActions,
  type StartUpEvent,
  type StartUpEventData,
} from "./StartUpEvent";
export {
  UserActions,
  type UserAddress,
  type UserData,
  type UserEvent,
} from "./UserEvent";
export {
  WidgetActions,
  type WidgetData,
  type WidgetEvent,
} from "./WidgetEvent";

export type Events =
  | ActionEvent
  | AppEvent
  | NetworkEvent
  | PageEvent
  | PlayerEvent
  | RouterEvent
  | StartUpEvent
  | UserEvent;

export type Actions =
  | ActionEventActions
  | AppActions
  | NetworkActions
  | PageActions
  | PlayerActions
  | RouterActions
  | StartUpEventActions
  | UserActions;
