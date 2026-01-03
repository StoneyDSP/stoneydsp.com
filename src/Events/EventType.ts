import type {
  ActionEvent,
  AppEvent,
  NetworkEvent,
  PageEvent,
  PlayerEvent,
  RouterEvent,
  StartUpEvent,
  UserEvent,
  WidgetEvent,
} from "./types";

export enum EventType {
  ActionEvent = "",
  AppEvent = "app",
  NetworkEvent = "network",
  PageEvent = "page",
  PlayerEvent = "player",
  RouterEvent = "router",
  StartUpEvent = "startup",
  UserEvent = "user",
  WidgetEvent = "widget",
}

export type EventPayload = {
  [EventType.ActionEvent]: ActionEvent;
  [EventType.AppEvent]: AppEvent;
  [EventType.NetworkEvent]: NetworkEvent;
  [EventType.PageEvent]: PageEvent;
  [EventType.PlayerEvent]: PlayerEvent;
  [EventType.RouterEvent]: RouterEvent;
  [EventType.StartUpEvent]: StartUpEvent;
  [EventType.UserEvent]: UserEvent;
  [EventType.WidgetEvent]: WidgetEvent;
};
