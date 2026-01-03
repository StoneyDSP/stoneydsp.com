// import type { PlayerDelegate } from "../../analytics";
import { EventType } from "../EventType";

/**
 * see `VideoPlayerEvents` in our Lightning declarations file(s)...
 */
export enum PlayerActions {
  /// hooks
  ABORT = "player:abort",
  AD_START = "player:ad_start",
  AD_END = "player:ad_end",
  CAN_PLAY = "player:can_play",
  CAN_PLAY_THROUGH = "player:can_play_through",
  CLEAR = "player:clear",
  DURATION_CHANGE = "player:duration_change",
  EMPTIED = "player:emptied",
  ERROR = "player:error",
  ENCRYPTED = "player:encrypted",
  INTERRUPT_BEGIN = "player:interrupt_begin",
  INTERRUPT_END = "player:interrupt_end",
  LOADED = "player:loaded",
  LOADED_DATA = "player:loaded_data",
  LOADED_METADATA = "player:loaded_metadata",
  LOAD_START = "player:load_start",
  PLAYING = "player:playing",
  PROGRAM_DATE_TIME = "player:progam_date_time",
  PROGRESS = "player:progress",
  RATECHANGE = "player:ratechange",
  SEEKED = "player:seeked",
  SEEKING = "player:seeking",
  STALLED = "player:stalled",
  TIME_AS_UTC = "player:time_as_utc",
  TIME_UPDATE = "player:time_update",
  VOLUME_CHANGE = "player:volume_change",
  WAITING = "player:waiting",

  /// custom
  INIT = "player:init",
  MEDIA_START = "player:media_start",
  PAUSE = "player:pause",
  PLAY = "player:play",
  BUFFER = "player:buffer",
  FAST_FORWARD = "player:ff",
  REWIND = "player:rw",
  SEEK_START = "player:seek_start",
  STOP = "player:stop",
  ENDED = "player:ended",
}

export type PlayerData = {
  // callbacks?: PlayerDelegate;
  currentTime?: number;
  speed?: number;
  assetId?: string;
  finished?: boolean;
  progress?: number;
  asset?: {
    duration: number | undefined;
    id: string;
    isLive: boolean;
    title: string;
  };
};

export type PlayerInitData = {
  asset: {
    duration: number;
    id: string;
    isLive: boolean;
    title: string;
    vpid?: string;
  };
};

/**
 * ---
 *
 * The {@link PlayerEvent} type.
 *
 * ---
 *
 * @example
 * ```ts
 * container.get({ token: DependencyToken.EventBus }).produce({
 *   event: {
 *     type: EventType.PlayerEvent,
 *     data: {
 *       type: EventType.PlayerEvent,
 *       action: PlayerActions.INIT,
 *       data: {
 *         currentTime: 3.14159,
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * ---
 *
 */
export type PlayerEvent = {
  type: EventType.PlayerEvent;
  action: PlayerActions;
  data: PlayerData | PlayerInitData;
};
